import Navbar from "@/app/Components/Shared/Navbar";
import { BlogPost } from "@/app/Types";
import { getDb } from "@/app/lib/mongodb";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const db = await getDb();
    const post = await db
      .collection<BlogPost>("posts")
      .findOne({ slug, published: true });

    if (!post) return null;
    return JSON.parse(JSON.stringify(post));
  } catch {
    return null;
  }
}

async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const db = await getDb();
    const posts = await db
      .collection<BlogPost>("posts")
      .find({ published: true })
      .sort({ publishedAt: -1 })
      .toArray();

    return JSON.parse(JSON.stringify(posts));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: `${post.title} | Eti Studio Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getPost(slug), getAllPosts()]);

  if (!post) notFound();

  const related = allPosts
    .filter((p) => p.slug !== slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <BlogPostClient post={post} related={related} />
    </>
  );
}
