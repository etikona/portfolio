import { NextRequest, NextResponse } from "next/server";

import { ObjectId } from "mongodb";
import { BlogPost } from "@/app/Types";
import { getDb } from "@/app/lib/mongodb";

// ── Auth helper ──────────────────────────────────────────────────
function isAuthorized(req: NextRequest): boolean {
  const apiKey = req.headers.get("x-api-key");
  return apiKey === process.env.ADMIN_API_KEY;
}

// ── Slug generator ───────────────────────────────────────────────
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ── Read time calculator ─────────────────────────────────────────
function calcReadTime(content: string): number {
  // Strip HTML tags before counting words
  const text = content.replace(/<[^>]*>/g, " ");
  return Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 200));
}

// ─── GET /api/posts ──────────────────────────────────────────────
// Public:  GET /api/posts              → all published posts
// Public:  GET /api/posts?slug=xxx     → single post by slug
// Public:  GET /api/posts?tag=xxx      → posts filtered by tag
// Admin:   GET /api/posts?all=true     → all posts including drafts
export async function GET(req: NextRequest) {
  try {
    const db = await getDb();
    const col = db.collection<BlogPost>("posts");
    const { searchParams } = new URL(req.url);

    const slug = searchParams.get("slug");
    const tag = searchParams.get("tag");
    const all = searchParams.get("all"); // admin-only: show drafts

    // ── Single post by slug ──
    if (slug) {
      const post = await col.findOne({ slug });
      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    // ── List posts ──
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};

    // If not admin request, only return published posts
    if (all !== "true") {
      query.published = true;
    }

    if (tag) {
      query.tags = tag;
    }

    const posts = await col
      .find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .toArray();

    return NextResponse.json(posts);
  } catch (err) {
    console.error("[GET /api/posts]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// ─── POST /api/posts ─────────────────────────────────────────────
// Admin only. Creates a new post.
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: Partial<BlogPost> = await req.json();

    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "title and content are required" },
        { status: 400 },
      );
    }

    const now = new Date().toISOString();
    const slug = body.slug?.trim() || generateSlug(body.title);

    const db = await getDb();
    const col = db.collection<BlogPost>("posts");

    // Check slug uniqueness
    const existing = await col.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 },
      );
    }

    // Strip HTML for excerpt if not provided
    const plainText = body.content.replace(/<[^>]*>/g, " ").trim();

    const post: BlogPost = {
      _id: new ObjectId().toString(),
      title: body.title.trim(),
      slug,
      excerpt:
        body.excerpt?.trim() ||
        plainText.slice(0, 160) + (plainText.length > 160 ? "..." : ""),
      content: body.content,
      coverImage: body.coverImage || undefined,
      tags: body.tags || [],
      published: body.published ?? false,
      publishedAt: body.published ? now : undefined,
      createdAt: now,
      updatedAt: now,
      readTime: calcReadTime(body.content),
    };

    await col.insertOne(post as never);

    // Revalidate public blog pages so the new post appears immediately
    if (post.published) {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL ||
          (process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000");
        await fetch(`${baseUrl}/api/revalidate?path=/blog`, { method: "POST" });
      } catch {
        // Non-critical — ISR will revalidate within 60 seconds anyway
      }
    }

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error("[POST /api/posts]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// ─── PATCH /api/posts?slug=xxx ────────────────────────────────────
// Admin only. Updates an existing post.
export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const slug = new URL(req.url).searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    const db = await getDb();
    const col = db.collection<BlogPost>("posts");

    const existing = await col.findOne({ slug });
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const updates: Partial<BlogPost> = await req.json();
    const now = new Date().toISOString();

    // If publishing for the first time, set publishedAt
    if (updates.published && !existing.published && !existing.publishedAt) {
      updates.publishedAt = now;
    }

    // If content changed, recalculate read time
    if (updates.content) {
      updates.readTime = calcReadTime(updates.content);
      // Recalculate excerpt if not explicitly provided
      if (!updates.excerpt) {
        const plainText = updates.content.replace(/<[^>]*>/g, " ").trim();
        updates.excerpt =
          plainText.slice(0, 160) + (plainText.length > 160 ? "..." : "");
      }
    }

    const updated = {
      ...existing,
      ...updates,
      updatedAt: now,
    };

    await col.replaceOne({ slug }, updated);

    // If publish status changed, revalidate blog pages immediately
    if (updates.published !== undefined) {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL ||
          (process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000");
        await fetch(`${baseUrl}/api/revalidate?path=/blog`, { method: "POST" });
        await fetch(`${baseUrl}/api/revalidate?path=/blog/${slug}`, {
          method: "POST",
        });
      } catch {
        // Non-critical
      }
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("[PATCH /api/posts]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// ─── DELETE /api/posts?slug=xxx ───────────────────────────────────
// Admin only. Permanently deletes a post.
export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const slug = new URL(req.url).searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "slug is required" }, { status: 400 });
    }

    const db = await getDb();
    const col = db.collection<BlogPost>("posts");

    const result = await col.deleteOne({ slug });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, slug });
  } catch (err) {
    console.error("[DELETE /api/posts]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
