"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  Clock,
  ArrowRight,
  Tag,
  Search,
  X,
  FileText,
} from "lucide-react";
import { BlogPost } from "../Types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  posts: BlogPost[];
}

export default function BlogClient({ posts }: Props) {
  const mainRef = useRef<HTMLElement>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags))).sort(),
    [posts],
  );

  const filtered = useMemo(() => {
    let result = posts;
    if (activeTag) result = result.filter((p) => p.tags.includes(activeTag));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return result;
  }, [posts, activeTag, searchQuery]);

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-hero-content > *",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
          delay: 0.1,
        },
      );
      gsap.fromTo(
        ".blog-filters",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.4 },
      );
    }, mainRef);
    return () => ctx.revert();
  }, []);

  // Animate articles on filter change
  useEffect(() => {
    gsap.fromTo(
      ".post-article",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" },
    );
  }, [filtered]);

  // Sidebar scroll animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-sidebar-inner > *",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".blog-sidebar-inner",
            start: "top 85%",
          },
        },
      );
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} style={{ minHeight: "100vh", paddingTop: "64px" }}>
      {/* ── Hero header ─────────────────────────────────────────── */}
      <section
        style={{
          padding: "5rem 2rem 4rem",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid background */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),
              linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
            opacity: 0.3,
            zIndex: 0,
          }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="blog-hero-content">
            <span
              className="tag"
              style={{ marginBottom: "1.25rem", display: "inline-flex" }}
            >
              Blog
            </span>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                color: "var(--fg)",
                marginBottom: "1rem",
                lineHeight: 1.1,
              }}
            >
              Writing &amp;{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
                Notes
              </em>
            </h1>

            <p
              style={{
                color: "var(--muted)",
                fontSize: "1rem",
                maxWidth: "520px",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              Thoughts on full-stack development, system architecture, and
              lessons from shipping real products. Written for developers.
            </p>

            {/* Stats row */}
            <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
              {[
                { label: "Posts", value: posts.length },
                { label: "Topics", value: allTags.length },
              ].map(({ label, value }) => (
                <div key={label}>
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
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--muted)",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                      marginTop: "0.25rem",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters bar ─────────────────────────────────────────── */}
      <div
        className="blog-filters"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "var(--bg)",
          position: "sticky",
          top: "64px",
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            overflowX: "auto",
            height: "56px",
          }}
        >
          {/* Search */}
          <div
            style={{
              position: "relative",
              flexShrink: 0,
              width: "200px",
            }}
          >
            <Search
              size={13}
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--muted)",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.45rem 0.75rem 0.45rem 2rem",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "3px",
                fontSize: "0.8rem",
                color: "var(--fg)",
                fontFamily: "'Inter', sans-serif",
                outline: "none",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "0.5rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--muted)",
                  display: "flex",
                  padding: 0,
                }}
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: "20px",
              background: "var(--border)",
              flexShrink: 0,
            }}
          />

          {/* All tag */}
          <button
            onClick={() => setActiveTag(null)}
            style={{
              flexShrink: 0,
              padding: "0.3rem 0.85rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              border: `1px solid ${activeTag === null ? "var(--fg)" : "var(--border)"}`,
              background: activeTag === null ? "var(--fg)" : "transparent",
              color: activeTag === null ? "var(--bg)" : "var(--muted)",
              borderRadius: "3px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            All
          </button>

          {/* Tag buttons */}
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              style={{
                flexShrink: 0,
                padding: "0.3rem 0.85rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                border: `1px solid ${activeTag === tag ? "var(--accent)" : "var(--border)"}`,
                background: activeTag === tag ? "var(--accent)" : "transparent",
                color: activeTag === tag ? "var(--fg)" : "var(--muted)",
                borderRadius: "3px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <section style={{ padding: "3.5rem 2rem 6rem" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 280px",
            gap: "4rem",
            alignItems: "start",
          }}
          className="blog-layout"
        >
          {/* Posts list */}
          <div>
            {/* Results count */}
            <div
              style={{
                fontSize: "0.78rem",
                color: "var(--muted)",
                marginBottom: "1.5rem",
                letterSpacing: "0.03em",
              }}
            >
              {activeTag || searchQuery ? (
                <>
                  <span style={{ color: "var(--fg)", fontWeight: 600 }}>
                    {filtered.length}
                  </span>{" "}
                  {filtered.length === 1 ? "result" : "results"}
                  {activeTag && (
                    <>
                      {" "}
                      for{" "}
                      <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                        #{activeTag}
                      </span>
                    </>
                  )}
                  {searchQuery && (
                    <>
                      {" "}
                      matching{" "}
                      <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                        &ldquo;{searchQuery}&rdquo;
                      </span>
                    </>
                  )}
                </>
              ) : (
                <>
                  <span style={{ color: "var(--fg)", fontWeight: 600 }}>
                    {posts.length}
                  </span>{" "}
                  {posts.length === 1 ? "post" : "posts"} published
                </>
              )}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "5rem 2rem",
                  border: "1px dashed var(--border)",
                  borderRadius: "6px",
                  color: "var(--muted)",
                }}
              >
                <FileText
                  size={32}
                  style={{ marginBottom: "1rem", opacity: 0.3 }}
                />
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.3rem",
                    color: "var(--fg)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {posts.length === 0 ? "No posts yet." : "No results found."}
                </p>
                <p style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>
                  {posts.length === 0
                    ? "Check back soon — posts are coming."
                    : "Try a different search term or tag."}
                </p>
                {(activeTag || searchQuery) && (
                  <button
                    onClick={() => {
                      setActiveTag(null);
                      setSearchQuery("");
                    }}
                    style={{
                      marginTop: "1.25rem",
                      padding: "0.5rem 1.25rem",
                      background: "var(--fg)",
                      color: "var(--bg)",
                      border: "none",
                      borderRadius: "3px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}

            {/* Article list */}
            {filtered.length > 0 && (
              <div>
                {filtered.map((post, i) => (
                  <article
                    key={post._id}
                    className="post-article"
                    style={{
                      padding: "2.5rem 0",
                      borderTop: "1px solid var(--border)",
                      borderBottom:
                        i === filtered.length - 1
                          ? "1px solid var(--border)"
                          : "none",
                    }}
                  >
                    {/* Meta row */}
                    <div
                      style={{
                        display: "flex",
                        gap: "1.25rem",
                        marginBottom: "0.85rem",
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      {post.publishedAt && (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            fontSize: "0.78rem",
                            color: "var(--muted)",
                          }}
                        >
                          <Calendar size={12} />
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </span>
                      )}
                      {post.readTime && (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.35rem",
                            fontSize: "0.78rem",
                            color: "var(--muted)",
                          }}
                        >
                          <Clock size={12} />
                          {post.readTime} min read
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <Link
                      href={`/blog/${post.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <h2
                        className="post-title"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "clamp(1.15rem, 2vw, 1.5rem)",
                          fontWeight: 600,
                          color: "var(--fg)",
                          lineHeight: 1.3,
                          marginBottom: "0.85rem",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {post.title}
                      </h2>
                    </Link>

                    {/* Excerpt */}
                    <p
                      style={{
                        color: "var(--muted)",
                        lineHeight: 1.8,
                        fontSize: "0.92rem",
                        marginBottom: "1.25rem",
                        maxWidth: "620px",
                      }}
                    >
                      {post.excerpt}
                    </p>

                    {/* Footer row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "0.75rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "0.4rem",
                          flexWrap: "wrap",
                        }}
                      >
                        {post.tags.map((t) => (
                          <button
                            key={t}
                            onClick={() =>
                              setActiveTag(activeTag === t ? null : t)
                            }
                            className="tag"
                            style={{
                              cursor: "pointer",
                              border:
                                activeTag === t
                                  ? "1px solid var(--accent)"
                                  : undefined,
                              color: activeTag === t ? "var(--fg)" : undefined,
                              background: "none",
                              fontFamily: "'Inter', sans-serif",
                            }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="read-link"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                          color: "var(--fg)",
                          textDecoration: "none",
                          transition: "gap 0.2s ease",
                        }}
                      >
                        Read article <ArrowRight size={13} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* ── Sidebar ─────────────────────────────────────────── */}
          <aside className="blog-sidebar">
            <div
              className="blog-sidebar-inner"
              style={{
                position: "sticky",
                top: "130px",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Topics */}
              <div
                style={{
                  padding: "1.5rem",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  background: "var(--surface)",
                }}
              >
                <h3
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <Tag size={11} /> Topics
                </h3>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                >
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() =>
                        setActiveTag(activeTag === tag ? null : tag)
                      }
                      className="tag"
                      style={{
                        cursor: "pointer",
                        background: "none",
                        fontFamily: "'Inter', sans-serif",
                        border:
                          activeTag === tag
                            ? "1px solid var(--accent)"
                            : undefined,
                        color: activeTag === tag ? "var(--fg)" : undefined,
                        transition: "border-color 0.2s ease, color 0.2s ease",
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Latest posts */}
              {posts.length > 0 && (
                <div
                  style={{
                    padding: "1.5rem",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    background: "var(--surface)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      marginBottom: "1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <Clock size={11} /> Recent
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0",
                    }}
                  >
                    {posts.slice(0, 4).map((post, i) => (
                      <Link
                        key={post._id}
                        href={`/blog/${post.slug}`}
                        style={{
                          textDecoration: "none",
                          padding: "0.75rem 0",
                          borderBottom:
                            i < Math.min(posts.length, 4) - 1
                              ? "1px solid var(--border)"
                              : "none",
                          display: "block",
                        }}
                      >
                        <div
                          className="sidebar-post-title"
                          style={{
                            fontSize: "0.82rem",
                            fontWeight: 500,
                            color: "var(--fg)",
                            lineHeight: 1.4,
                            marginBottom: "0.3rem",
                            transition: "color 0.2s ease",
                          }}
                        >
                          {post.title}
                        </div>
                        {post.publishedAt && (
                          <div
                            style={{
                              fontSize: "0.72rem",
                              color: "var(--muted)",
                            }}
                          >
                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* About card */}
              <div
                style={{
                  padding: "1.5rem",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  background: "var(--fg)",
                  color: "var(--bg)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    marginBottom: "0.6rem",
                  }}
                >
                  Written by Eti
                </div>
                <p
                  style={{
                    fontSize: "0.8rem",
                    lineHeight: 1.7,
                    opacity: 0.7,
                    marginBottom: "1.1rem",
                  }}
                >
                  Full-stack developer writing about Node.js, Next.js, and
                  building real-world web products.
                </p>
                <Link
                  href="/#about"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    textDecoration: "none",
                  }}
                >
                  About me <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        .post-title:hover { color: var(--accent) !important; }
        .sidebar-post-title:hover { color: var(--accent) !important; }
        .read-link:hover { gap: 0.6rem !important; }

        @media (max-width: 960px) {
          .blog-layout { grid-template-columns: 1fr !important; }
          .blog-sidebar { display: none !important; }
        }

        @media (max-width: 600px) {
          .blog-filters > div { padding: 0 1rem !important; }
        }

        /* Hide scrollbar on filter bar */
        .blog-filters > div::-webkit-scrollbar { display: none; }
        .blog-filters > div { scrollbar-width: none; }
      `}</style>
    </main>
  );
}
