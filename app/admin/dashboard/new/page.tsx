"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  X,
  Plus,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import Image from "next/image";
import RichEditor from "@/app/Components/Shared/RichEditor";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function NewPostPage() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState("");

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [published, setPublished] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const key = sessionStorage.getItem("admin_key");
    if (!key) {
      router.replace("/admin");
      return;
    }
    setApiKey(key);
  }, [router]);

  // Auto-generate slug from title unless manually edited
  useEffect(() => {
    if (!slugEdited && title) {
      setSlug(generateSlug(title));
    }
  }, [title, slugEdited]);

  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/,$/, "");
      if (newTag && !tags.includes(newTag)) {
        setTags((prev) => [...prev, newTag]);
      }
      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  async function handleSave(publish?: boolean) {
    if (!title.trim() || !content.trim()) {
      setErrorMsg("Title and content are required.");
      return;
    }

    setSaveStatus("saving");
    setErrorMsg("");

    const shouldPublish = publish !== undefined ? publish : published;

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim() || generateSlug(title),
          excerpt: excerpt.trim() || undefined,
          content,
          coverImage: coverImage.trim() || undefined,
          tags,
          published: shouldPublish,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      setSaveStatus("saved");
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 800);
    } catch (err) {
      setSaveStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const wordCount = content
    .replace(/<[^>]*>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        paddingTop: "64px",
      }}
    >
      {/* Top bar — sits below the site Navbar (64px) */}
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--bg)",
          position: "sticky",
          top: "64px",
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 2rem",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/admin/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.8rem",
              color: "var(--muted)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            <ArrowLeft size={14} /> Dashboard
          </Link>

          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            {/* Word count */}
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--muted)",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              {wordCount} words &middot; {readTime} min read
            </span>

            {/* Preview toggle */}
            <button
              type="button"
              onClick={() => setPreview((p) => !p)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 0.85rem",
                border: "1px solid var(--border)",
                background: preview ? "var(--fg)" : "none",
                color: preview ? "var(--bg)" : "var(--muted)",
                borderRadius: "3px",
                fontSize: "0.78rem",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                transition: "all 0.2s ease",
              }}
            >
              {preview ? <EyeOff size={13} /> : <Eye size={13} />}
              {preview ? "Edit" : "Preview"}
            </button>

            {/* Save draft */}
            <button
              type="button"
              onClick={() => handleSave(false)}
              disabled={saveStatus === "saving"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 0.85rem",
                border: "1px solid var(--border)",
                background: "none",
                color: "var(--fg)",
                borderRadius: "3px",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: saveStatus === "saving" ? "not-allowed" : "pointer",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              <Save size={13} />
              {saveStatus === "saving" ? "Saving..." : "Save Draft"}
            </button>

            {/* Publish */}
            <button
              type="button"
              onClick={() => handleSave(true)}
              disabled={saveStatus === "saving"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 1.1rem",
                background:
                  saveStatus === "saving" ? "var(--border)" : "var(--fg)",
                color: saveStatus === "saving" ? "var(--muted)" : "var(--bg)",
                border: "none",
                borderRadius: "3px",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: saveStatus === "saving" ? "not-allowed" : "pointer",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (saveStatus !== "saving")
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#333";
              }}
              onMouseLeave={(e) => {
                if (saveStatus !== "saving")
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--fg)";
              }}
            >
              Publish
            </button>
          </div>
        </div>
      </header>

      {/* Status banner */}
      {(saveStatus === "saved" || saveStatus === "error" || errorMsg) && (
        <div
          style={{
            padding: "0.75rem 2rem",
            background:
              saveStatus === "error" || errorMsg ? "#fef2f2" : "#f0fdf4",
            borderBottom: `1px solid ${saveStatus === "error" || errorMsg ? "#fecaca" : "#bbf7d0"}`,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.85rem",
            color: saveStatus === "error" || errorMsg ? "#dc2626" : "#16a34a",
          }}
        >
          {saveStatus === "error" || errorMsg ? (
            <AlertCircle size={15} />
          ) : (
            <CheckCircle2 size={15} />
          )}
          {errorMsg || "Post saved successfully. Redirecting..."}
        </div>
      )}

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "3rem 2rem 5rem",
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          gap: "3rem",
          alignItems: "start",
        }}
        className="editor-layout"
      >
        {/* Main editor area */}
        <div>
          {/* Cover image preview */}
          {coverImage && (
            <div style={{ marginBottom: "1.5rem", position: "relative" }}>
              <Image
                src={coverImage}
                alt="Cover"
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                }}
              />
              <button
                type="button"
                onClick={() => setCoverImage("")}
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  background: "rgba(0,0,0,0.6)",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  padding: "0.2rem",
                  cursor: "pointer",
                  display: "flex",
                }}
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Title */}
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
            rows={2}
            style={{
              width: "100%",
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 600,
              color: "var(--fg)",
              background: "transparent",
              border: "none",
              outline: "none",
              resize: "none",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
              boxSizing: "border-box",
            }}
          />

          {/* Excerpt */}
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short excerpt (shown in post list and SEO meta description)..."
            rows={2}
            style={{
              width: "100%",
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "var(--muted)",
              background: "transparent",
              border: "none",
              outline: "none",
              resize: "none",
              lineHeight: 1.7,
              marginBottom: "2rem",
              borderBottom: "1px solid var(--border)",
              paddingBottom: "1.5rem",
              boxSizing: "border-box",
            }}
          />

          {/* Rich editor */}
          {preview ? (
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: content }}
              style={{
                minHeight: "400px",
                padding: "0",
                color: "var(--fg)",
                lineHeight: 1.9,
                fontSize: "1rem",
              }}
            />
          ) : (
            <RichEditor
              value={content}
              onChange={setContent}
              placeholder="Start writing your post... Use the toolbar above to format."
            />
          )}
        </div>

        {/* Right sidebar — post settings */}
        <aside>
          <div
            style={{
              position: "sticky",
              top: "80px",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {/* Publish status */}
            <div
              style={{
                padding: "1.25rem",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                background: "var(--surface)",
              }}
            >
              <h3
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: "1rem",
                }}
              >
                Status
              </h3>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  color: "var(--fg)",
                }}
              >
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  style={{ width: "16px", height: "16px", cursor: "pointer" }}
                />
                Publish immediately
              </label>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted)",
                  marginTop: "0.5rem",
                  lineHeight: 1.5,
                }}
              >
                {published
                  ? "This post will be visible to everyone."
                  : "Saved as a private draft — only you can see it."}
              </p>
            </div>

            {/* Slug */}
            <div
              style={{
                padding: "1.25rem",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                background: "var(--surface)",
              }}
            >
              <h3
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: "0.75rem",
                }}
              >
                URL Slug
              </h3>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlugEdited(true);
                  setSlug(
                    e.target.value
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9-]/g, ""),
                  );
                }}
                placeholder="url-slug"
                style={{
                  width: "100%",
                  padding: "0.5rem 0.6rem",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "3px",
                  fontSize: "0.8rem",
                  color: "var(--fg)",
                  fontFamily: "monospace",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--fg)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              />
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "var(--muted)",
                  marginTop: "0.4rem",
                }}
              >
                /blog/{slug || "your-post-title"}
              </p>
            </div>

            {/* Cover image */}
            <div
              style={{
                padding: "1.25rem",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                background: "var(--surface)",
              }}
            >
              <h3
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: "0.75rem",
                }}
              >
                Cover Image URL
              </h3>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://..."
                style={{
                  width: "100%",
                  padding: "0.5rem 0.6rem",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "3px",
                  fontSize: "0.8rem",
                  color: "var(--fg)",
                  fontFamily: "'Inter', sans-serif",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--fg)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              />
            </div>

            {/* Tags */}
            <div
              style={{
                padding: "1.25rem",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                background: "var(--surface)",
              }}
            >
              <h3
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: "0.75rem",
                }}
              >
                Tags
              </h3>

              {/* Tag chips */}
              {tags.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "inherit",
                          padding: 0,
                          display: "flex",
                          lineHeight: 1,
                        }}
                      >
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                  placeholder="Type tag, press Enter"
                  style={{
                    width: "100%",
                    padding: "0.5rem 2rem 0.5rem 0.6rem",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                    fontSize: "0.8rem",
                    color: "var(--fg)",
                    fontFamily: "'Inter', sans-serif",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "var(--fg)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border)")
                  }
                />
                <Plus
                  size={12}
                  style={{
                    position: "absolute",
                    right: "0.5rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--muted)",
                    pointerEvents: "none",
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "var(--muted)",
                  marginTop: "0.4rem",
                }}
              >
                Press Enter or comma to add
              </p>
            </div>

            {/* Quick actions */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <button
                type="button"
                onClick={() => handleSave(true)}
                disabled={saveStatus === "saving"}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  background: "var(--fg)",
                  color: "var(--bg)",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#333")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "var(--fg)")
                }
              >
                Publish Post
              </button>
              <button
                type="button"
                onClick={() => handleSave(false)}
                disabled={saveStatus === "saving"}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  background: "none",
                  color: "var(--fg)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "var(--fg)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border)")
                }
              >
                Save as Draft
              </button>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        /* Prose preview */
        .prose h2 { font-family: 'Playfair Display', serif; font-size: 1.65rem; font-weight: 600; margin: 3rem 0 1rem; color: var(--fg); letter-spacing: -0.015em; }
        .prose h3 { font-family: 'Playfair Display', serif; font-size: 1.25rem; font-weight: 600; margin: 2.25rem 0 0.75rem; color: var(--fg); }
        .prose p { margin-bottom: 1.6rem; color: var(--muted); }
        .prose a { color: var(--accent); text-decoration: underline; }
        .prose strong { color: var(--fg); font-weight: 600; }
        .prose code { background: var(--surface); border: 1px solid var(--border); padding: 0.15rem 0.45rem; border-radius: 3px; font-size: 0.86em; font-family: 'Fira Code', monospace; }
        .prose pre { background: var(--dark-bg); color: #E5E7EB; padding: 1.5rem; border-radius: 6px; overflow-x: auto; margin: 1.75rem 0; font-size: 0.86rem; line-height: 1.75; border: 1px solid var(--dark-border); }
        .prose pre code { background: none; border: none; padding: 0; }
        .prose ul, .prose ol { padding-left: 1.5rem; margin-bottom: 1.6rem; color: var(--muted); }
        .prose li { margin-bottom: 0.5rem; }
        .prose blockquote { border-left: 3px solid var(--accent); padding: 0.85rem 1.35rem; margin: 2rem 0; background: var(--surface); border-radius: 0 4px 4px 0; font-style: italic; color: var(--muted); font-family: 'Playfair Display', serif; }
        .prose img { max-width: 100%; border-radius: 6px; border: 1px solid var(--border); margin: 1.5rem 0; }
        .prose hr { border: none; border-top: 1px solid var(--border); margin: 3rem 0; }

        @media (max-width: 800px) {
          .editor-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
