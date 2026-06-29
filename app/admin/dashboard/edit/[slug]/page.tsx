"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
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
  Loader2,
} from "lucide-react";
// import RichEditor from "../../RichEditor";
import { BlogPost } from "@/app/Types";
import RichEditor from "@/app/Components/Shared/RichEditor";
import Image from "next/image";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [postSlug, setPostSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [published, setPublished] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [preview, setPreview] = useState(false);

  const loadPost = useCallback(
    async (key: string) => {
      try {
        const res = await fetch(`/api/posts?slug=${slug}`, {
          headers: { "x-api-key": key },
        });
        if (res.status === 404) {
          setNotFound(true);
          return;
        }
        const post: BlogPost = await res.json();
        setTitle(post.title);
        setPostSlug(post.slug);
        setExcerpt(post.excerpt || "");
        setContent(post.content || "");
        setCoverImage(post.coverImage || "");
        setTags(post.tags || []);
        setPublished(post.published);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    },
    [slug],
  );

  useEffect(() => {
    const key = sessionStorage.getItem("admin_key");
    if (!key) {
      router.replace("/admin");
      return;
    }
    setApiKey(key);
    loadPost(key);
  }, [router, loadPost]);

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
      const res = await fetch(`/api/posts?slug=${slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          title: title.trim(),
          slug: postSlug.trim() || generateSlug(title),
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

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
        }}
      >
        <Loader2
          size={24}
          style={{
            color: "var(--muted)",
            animation: "spin 0.7s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (notFound) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
          gap: "1rem",
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.5rem",
            color: "var(--fg)",
          }}
        >
          Post not found
        </p>
        <Link
          href="/admin/dashboard"
          style={{
            fontSize: "0.85rem",
            color: "var(--muted)",
            textDecoration: "none",
          }}
        >
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Top bar */}
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--bg)",
          position: "sticky",
          top: 0,
          zIndex: 50,
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
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted)")
              }
            >
              <ArrowLeft size={14} /> Dashboard
            </Link>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--accent)",
                border: "1px solid var(--accent)",
                padding: "0.15rem 0.5rem",
                borderRadius: "2px",
              }}
            >
              Editing
            </span>
          </div>

          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
              {wordCount} words &middot; {readTime} min read
            </span>

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

            <Link
              href={`/blog/${slug}`}
              target="_blank"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 0.85rem",
                border: "1px solid var(--border)",
                color: "var(--muted)",
                textDecoration: "none",
                borderRadius: "3px",
                fontSize: "0.78rem",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted)")
              }
            >
              View live &rarr;
            </Link>

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
              {saveStatus === "saving" ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={() => handleSave(!published)}
              disabled={saveStatus === "saving"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 1.1rem",
                background: published ? "#ef4444" : "var(--fg)",
                color: "var(--bg)",
                border: "none",
                borderRadius: "3px",
                fontSize: "0.78rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                transition: "background 0.2s ease",
              }}
            >
              {published ? "Unpublish" : "Publish"}
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
          {errorMsg || "Changes saved. Redirecting..."}
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
        {/* Main editor */}
        <div>
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

          {preview ? (
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: content }}
              style={{
                minHeight: "400px",
                color: "var(--fg)",
                lineHeight: 1.9,
                fontSize: "1rem",
              }}
            />
          ) : (
            <RichEditor
              value={content}
              onChange={setContent}
              placeholder="Start writing..."
            />
          )}
        </div>

        {/* Sidebar */}
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
            {/* Status */}
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
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: published ? "#16a34a" : "var(--muted)",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--fg)",
                    fontWeight: 500,
                  }}
                >
                  {published ? "Published (Live)" : "Draft (Private)"}
                </span>
              </div>
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
                value={postSlug}
                onChange={(e) =>
                  setPostSlug(
                    e.target.value
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9-]/g, ""),
                  )
                }
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
                /blog/{postSlug}
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
            </div>

            {/* Actions */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <button
                type="button"
                onClick={() => handleSave(!published)}
                disabled={saveStatus === "saving"}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  background: published ? "#ef4444" : "var(--fg)",
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
              >
                {published ? "Unpublish Post" : "Publish Post"}
              </button>
              <button
                type="button"
                onClick={() => handleSave(published)}
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
                Save Changes
              </button>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        .prose h2 { font-family: 'Playfair Display', serif; font-size: 1.65rem; font-weight: 600; margin: 3rem 0 1rem; color: var(--fg); }
        .prose h3 { font-family: 'Playfair Display', serif; font-size: 1.25rem; font-weight: 600; margin: 2.25rem 0 0.75rem; color: var(--fg); }
        .prose p { margin-bottom: 1.6rem; color: var(--muted); }
        .prose a { color: var(--accent); text-decoration: underline; }
        .prose strong { color: var(--fg); font-weight: 600; }
        .prose code { background: var(--surface); border: 1px solid var(--border); padding: 0.15rem 0.45rem; border-radius: 3px; font-size: 0.86em; font-family: 'Fira Code', monospace; }
        .prose pre { background: var(--dark-bg); color: #E5E7EB; padding: 1.5rem; border-radius: 6px; overflow-x: auto; margin: 1.75rem 0; font-size: 0.86rem; border: 1px solid var(--dark-border); }
        .prose pre code { background: none; border: none; padding: 0; }
        .prose ul, .prose ol { padding-left: 1.5rem; margin-bottom: 1.6rem; color: var(--muted); }
        .prose li { margin-bottom: 0.5rem; }
        .prose blockquote { border-left: 3px solid var(--accent); padding: 0.85rem 1.35rem; margin: 2rem 0; background: var(--surface); border-radius: 0 4px 4px 0; font-style: italic; color: var(--muted); font-family: 'Playfair Display', serif; }
        .prose img { max-width: 100%; border-radius: 6px; border: 1px solid var(--border); margin: 1.5rem 0; }
        .prose hr { border: none; border-top: 1px solid var(--border); margin: 3rem 0; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 800px) { .editor-layout { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  );
}
