import { BlogPost } from "@/app/Types";
import { NextRequest, NextResponse } from "next/server";

// In-memory store — replace with MongoDB when ready
// Example MongoDB integration is commented below
let posts: BlogPost[] = [
  {
    _id: "1",
    title: "Building a Production REST API with Node.js and Express",
    slug: "building-production-rest-api-nodejs-express",
    excerpt:
      "A comprehensive guide to structuring a Node.js/Express API for production — authentication, error handling, validation, and deployment.",
    content: "",
    tags: ["Node.js", "Express", "API", "Backend"],
    published: true,
    publishedAt: "2024-12-01",
    readTime: 8,
  },
  {
    _id: "2",
    title: "Next.js App Router: What Changed and Why It Matters",
    slug: "nextjs-app-router-guide",
    excerpt:
      "Deep diving into the Next.js App Router — server components, layouts, loading states, and how it changes the way we think about React apps.",
    content: "",
    tags: ["Next.js", "React", "Frontend"],
    published: true,
    publishedAt: "2024-11-15",
    readTime: 6,
  },
];

// ─── GET /api/posts ───────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get("tag");
  const slug = searchParams.get("slug");

  /* MongoDB example:
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  const db = client.db();
  const collection = db.collection<BlogPost>("posts");
  const query: Filter<BlogPost> = { published: true };
  if (tag) query.tags = tag;
  if (slug) query.slug = slug;
  const results = await collection.find(query).sort({ publishedAt: -1 }).toArray();
  await client.close();
  return NextResponse.json(results);
  */

  let results = posts.filter((p) => p.published);
  if (tag) results = results.filter((p) => p.tags.includes(tag));
  if (slug) {
    const post = results.find((p) => p.slug === slug);
    return post
      ? NextResponse.json(post)
      : NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(results);
}

// ─── POST /api/posts ──────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Simple API key guard — set ADMIN_API_KEY in .env
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: Partial<BlogPost> = await req.json();
  if (!body.title || !body.slug || !body.content) {
    return NextResponse.json(
      { error: "title, slug, and content are required" },
      { status: 400 },
    );
  }

  const now = new Date().toISOString();
  const post: BlogPost = {
    _id: Date.now().toString(),
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt || body.content.slice(0, 160) + "...",
    content: body.content,
    coverImage: body.coverImage,
    tags: body.tags || [],
    published: body.published ?? false,
    publishedAt: body.published ? now : undefined,
    createdAt: now,
    updatedAt: now,
    readTime: Math.ceil(body.content.split(" ").length / 200),
  };

  posts.push(post);
  return NextResponse.json(post, { status: 201 });
}

// ─── PATCH /api/posts?slug=xxx ────────────────────────────────────
export async function PATCH(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = new URL(req.url).searchParams.get("slug");
  if (!slug)
    return NextResponse.json({ error: "slug required" }, { status: 400 });

  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1)
    return NextResponse.json({ error: "Post not found" }, { status: 404 });

  const updates: Partial<BlogPost> = await req.json();
  posts[idx] = {
    ...posts[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return NextResponse.json(posts[idx]);
}

// ─── DELETE /api/posts?slug=xxx ───────────────────────────────────
export async function DELETE(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = new URL(req.url).searchParams.get("slug");
  if (!slug)
    return NextResponse.json({ error: "slug required" }, { status: 400 });

  posts = posts.filter((p) => p.slug !== slug);
  return NextResponse.json({ success: true });
}
