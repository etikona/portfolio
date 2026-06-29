import type { Metadata } from "next";
import { BlogPost } from "../Types";
import Navbar from "../Components/Shared/Navbar";
import BlogClient from "./BlogClient";
import { getDb } from "../lib/mongodb";

export const dynamic = "force-dynamic"; // never cache this page

export const metadata: Metadata = {
  title: "Blog | Eti Studio",
  description:
    "Insights on real estate website development, property lead generation, and digital marketing for property agencies in Europe, UAE, Australia, and New Zealand.",
  openGraph: {
    title: "Blog | Eti Studio",
    description:
      "Insights on real estate website development, lead generation, and digital marketing for property agencies worldwide.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Eti Studio",
    description:
      "Insights on real estate website development, lead generation, and digital marketing for property agencies worldwide.",
  },
};

async function getPosts(): Promise<BlogPost[]> {
  try {
    const db = await getDb();
    const posts = await db
      .collection<BlogPost>("posts")
      .find({ published: true })
      .sort({ publishedAt: -1 })
      .toArray();

    // MongoDB returns _id as ObjectId — serialize to plain object for client
    return JSON.parse(JSON.stringify(posts));
  } catch (err) {
    console.error("[blog/page] Failed to fetch posts:", err);
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
