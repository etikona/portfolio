"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  PenLine,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  LogOut,
  Calendar,
  Clock,
  FileText,
  TrendingUp,
  BarChart2,
} from "lucide-react";
import { BlogPost } from "@/app/Types";

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionSlug, setActionSlug] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");

  const logout = useCallback(() => {
    sessionStorage.removeItem("admin_key");
    router.replace("/admin");
  }, [router]);

  const fetchPosts = useCallback(
    async (key: string) => {
      setLoading(true);
      try {
        const res = await fetch("/api/posts?all=true", {
          headers: { "x-api-key": key },
        });
        if (res.status === 401) {
          logout();
          return;
        }
        const data = await res.json();
        setPosts(data);
      } catch {
        console.error("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    },
    [logout],
  );

  useEffect(() => {
    const key = sessionStorage.getItem("admin_key");
    if (!key) {
      router.replace("/admin");
      return;
    }
    setApiKey(key);
    fetchPosts(key);
  }, [router, fetchPosts]);

  async function togglePublish(post: BlogPost) {
    setActionSlug(post.slug);
    try {
      await fetch(`/api/posts?slug=${post.slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ published: !post.published }),
      });
      await fetchPosts(apiKey);
    } catch {
      console.error("Toggle publish failed");
    } finally {
      setActionSlug(null);
    }
  }

  async function deletePost(slug: string) {
    setActionSlug(slug);
    try {
      await fetch(`/api/posts?slug=${slug}`, {
        method: "DELETE",
        headers: { "x-api-key": apiKey },
      });
      await fetchPosts(apiKey);
    } catch {
      console.error("Delete failed");
    } finally {
      setActionSlug(null);
      setDeleteConfirm(null);
    }
  }

  const published = posts.filter((p) => p.published);
  const drafts = posts.filter((p) => !p.published);
  const totalReads = posts.reduce((acc, p) => acc + (p.readTime || 0), 0);

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
        <div
          style={{
            width: "28px",
            height: "28px",
            border: "2px solid var(--border)",
            borderTopColor: "var(--accent)",
            borderRadius: "50%",
            animation: "spin 0.7s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        paddingBottom: "5rem",
      }}
    >
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
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--fg)",
              }}
            >
              Eti Studio
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent)",
                border: "1px solid var(--accent)",
                padding: "0.15rem 0.5rem",
                borderRadius: "2px",
              }}
            >
              Admin
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link
              href="/blog"
              target="_blank"
              style={{
                fontSize: "0.78rem",
                color: "var(--muted)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted)")
              }
            >
              View blog &rarr;
            </Link>
            <button
              onClick={logout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 0.85rem",
                border: "1px solid var(--border)",
                background: "none",
                borderRadius: "3px",
                fontSize: "0.78rem",
                color: "var(--muted)",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--fg)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "var(--fg)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--muted)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "var(--border)";
              }}
            >
              <LogOut size={13} /> Log out
            </button>
          </div>
        </div>
      </header>

      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "3rem 2rem" }}
      >
        {/* Page title + new post */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2rem",
                fontWeight: 600,
                color: "var(--fg)",
                letterSpacing: "-0.02em",
                marginBottom: "0.25rem",
              }}
            >
              Blog Dashboard
            </h1>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
              Manage your posts, drafts, and published articles.
            </p>
          </div>
          <Link
            href="/admin/dashboard/new"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              background: "var(--fg)",
              color: "var(--bg)",
              textDecoration: "none",
              fontSize: "0.82rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              borderRadius: "4px",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--fg)")
            }
          >
            <Plus size={15} /> New Post
          </Link>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            marginBottom: "3rem",
          }}
          className="stats-grid"
        >
          {[
            {
              icon: FileText,
              label: "Total Posts",
              value: posts.length,
              color: "var(--fg)",
            },
            {
              icon: TrendingUp,
              label: "Published",
              value: published.length,
              color: "#16a34a",
            },
            {
              icon: PenLine,
              label: "Drafts",
              value: drafts.length,
              color: "var(--accent)",
            },
            {
              icon: BarChart2,
              label: "Avg. Read Time",
              value:
                posts.length > 0
                  ? `${Math.round(totalReads / posts.length)} min`
                  : "—",
              color: "var(--muted)",
            },
          ].map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              style={{
                padding: "1.5rem",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                background: "var(--surface)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                <Icon size={15} style={{ color }} />
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  {label}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem",
                  fontWeight: 600,
                  color: "var(--fg)",
                  lineHeight: 1,
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Posts table */}
        {posts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 2rem",
              border: "1px dashed var(--border)",
              borderRadius: "8px",
              color: "var(--muted)",
            }}
          >
            <PenLine size={32} style={{ marginBottom: "1rem", opacity: 0.3 }} />
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.3rem",
                color: "var(--fg)",
                marginBottom: "0.5rem",
              }}
            >
              No posts yet.
            </p>
            <p style={{ fontSize: "0.85rem", marginBottom: "1.5rem" }}>
              Create your first blog post to get started.
            </p>
            <Link
              href="/admin/dashboard/new"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.7rem 1.4rem",
                background: "var(--fg)",
                color: "var(--bg)",
                textDecoration: "none",
                fontSize: "0.82rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                borderRadius: "4px",
              }}
            >
              <Plus size={14} /> Write first post
            </Link>
          </div>
        ) : (
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            {/* Table header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 100px 110px 130px",
                padding: "0.75rem 1.5rem",
                background: "var(--surface)",
                borderBottom: "1px solid var(--border)",
              }}
              className="table-header"
            >
              {["Title", "Status", "Read Time", "Actions"].map((h) => (
                <span
                  key={h}
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {posts.map((post, i) => (
              <div
                key={post._id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 100px 110px 130px",
                  padding: "1.1rem 1.5rem",
                  borderBottom:
                    i < posts.length - 1 ? "1px solid var(--border)" : "none",
                  alignItems: "center",
                  background:
                    actionSlug === post.slug ? "var(--surface)" : "var(--bg)",
                  transition: "background 0.15s ease",
                }}
                className="table-row"
              >
                {/* Title + meta */}
                <div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "var(--fg)",
                      marginBottom: "0.25rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {post.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    {post.publishedAt && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          fontSize: "0.72rem",
                          color: "var(--muted)",
                        }}
                      >
                        <Calendar size={10} />
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "var(--muted)",
                        fontFamily: "monospace",
                      }}
                    >
                      /{post.slug}
                    </span>
                  </div>
                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        gap: "0.3rem",
                        marginTop: "0.4rem",
                        flexWrap: "wrap",
                      }}
                    >
                      {post.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="tag"
                          style={{ fontSize: "0.65rem" }}
                        >
                          {t}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span
                          style={{ fontSize: "0.65rem", color: "var(--muted)" }}
                        >
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Status */}
                <div>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "2px",
                      border: `1px solid ${post.published ? "#bbf7d0" : "var(--border)"}`,
                      background: post.published ? "#f0fdf4" : "var(--surface)",
                      color: post.published ? "#16a34a" : "var(--muted)",
                    }}
                  >
                    {post.published ? "Live" : "Draft"}
                  </span>
                </div>

                {/* Read time */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontSize: "0.8rem",
                    color: "var(--muted)",
                  }}
                >
                  <Clock size={12} />
                  {post.readTime ?? "—"} min
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  {/* Edit */}
                  <Link
                    href={`/admin/dashboard/edit/${post.slug}`}
                    title="Edit post"
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid var(--border)",
                      borderRadius: "3px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--muted)",
                      textDecoration: "none",
                      transition: "color 0.2s ease, border-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--fg)";
                      e.currentTarget.style.borderColor = "var(--fg)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--muted)";
                      e.currentTarget.style.borderColor = "var(--border)";
                    }}
                  >
                    <PenLine size={13} />
                  </Link>

                  {/* Publish / Unpublish */}
                  <button
                    onClick={() => togglePublish(post)}
                    disabled={actionSlug === post.slug}
                    title={post.published ? "Unpublish" : "Publish"}
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid var(--border)",
                      borderRadius: "3px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: post.published ? "#16a34a" : "var(--muted)",
                      background: "none",
                      cursor: "pointer",
                      transition: "color 0.2s ease, border-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color =
                        post.published ? "#15803d" : "var(--fg)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "var(--fg)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color =
                        post.published ? "#16a34a" : "var(--muted)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "var(--border)";
                    }}
                  >
                    {post.published ? <Eye size={13} /> : <EyeOff size={13} />}
                  </button>

                  {/* Delete */}
                  {deleteConfirm === post.slug ? (
                    <button
                      onClick={() => deletePost(post.slug)}
                      disabled={actionSlug === post.slug}
                      title="Confirm delete"
                      style={{
                        padding: "0 0.5rem",
                        height: "30px",
                        border: "1px solid #ef4444",
                        borderRadius: "3px",
                        background: "#ef4444",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Confirm
                    </button>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(post.slug)}
                      title="Delete post"
                      style={{
                        width: "30px",
                        height: "30px",
                        border: "1px solid var(--border)",
                        borderRadius: "3px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--muted)",
                        background: "none",
                        cursor: "pointer",
                        transition: "color 0.2s ease, border-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "#ef4444";
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.borderColor = "#ef4444";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "var(--muted)";
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.borderColor = "var(--border)";
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 700px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .table-header { display: none !important; }
          .table-row { grid-template-columns: 1fr auto !important; gap: 0.75rem !important; }
          .table-row > div:nth-child(2),
          .table-row > div:nth-child(3) { display: none !important; }
        }
      `}</style>
    </main>
  );
}
