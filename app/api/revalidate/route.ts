import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// POST /api/revalidate?path=/blog
// Called internally after publish/unpublish to bust ISR cache immediately
export async function POST(req: NextRequest) {
  const path = new URL(req.url).searchParams.get("path");
  if (!path) {
    return NextResponse.json({ error: "path required" }, { status: 400 });
  }

  try {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  } catch (err) {
    console.error("[revalidate]", err);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
