import type { Metadata } from "next";
import { BlogPost } from "../Types";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on full-stack development, Node.js, Next.js, system design, and building real-world web products.",
  openGraph: {
    title: "Blog | Eti",
    description:
      "Thoughts on full-stack development, Node.js, Next.js, system design, and building real-world web products.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Eti",
    description:
      "Thoughts on full-stack development, Node.js, Next.js, system design, and building real-world web products.",
  },
};

async function getPosts(): Promise<BlogPost[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    const res = await fetch(`${baseUrl}/api/posts`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <Navbar />
      <BlogClient posts={posts} />
    </>
  );
}
