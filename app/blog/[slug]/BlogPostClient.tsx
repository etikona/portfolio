"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Tag,
  X,
  Globe,
  Copy,
  CheckCheck,
} from "lucide-react";
import { BlogPost } from "@/app/Types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  post: BlogPost;
  related: BlogPost[];
}

export default function BlogPostClient({ post, related }: Props) {
  const mainRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [readingPercent, setReadingPercent] = useState(0);

  // Reading progress bar
  useEffect(() => {
    const onScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight;
      const scrolled = Math.max(0, -rect.top);
      const pct = Math.min(100, (scrolled / total) * 100);
      setReadingPercent(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(
        ".post-back",
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
      )
        .fromTo(
          ".post-tags-row",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.25",
        )
        .fromTo(
          ".post-headline",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.25",
        )
        .fromTo(
          ".post-meta",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".post-body",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2",
        );

      gsap.fromTo(
        ".post-sidebar > *",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".post-sidebar", start: "top 85%" },
        },
      );

      if (related.length > 0) {
        gsap.fromTo(
          ".related-card",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: ".related-section", start: "top 85%" },
          },
        );
      }
    }, mainRef);
    return () => ctx.revert();
  }, [related.length]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <main ref={mainRef} style={{ minHeight: "100vh", paddingTop: "64px" }}>
      {/* ── Reading progress bar ────────────────────────────────── */}
      <div
        ref={progressRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "64px",
          left: 0,
          height: "2px",
          width: `${readingPercent}%`,
          background: "var(--accent)",
          zIndex: 200,
          transition: "width 0.1s linear",
        }}
      />

      {/* ── Post header ─────────────────────────────────────────── */}
      <section
        style={{
          padding: "3.5rem 2rem 3rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Back */}
          <Link
            href="/blog"
            className="post-back"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: "var(--muted)",
              textDecoration: "none",
              marginBottom: "2.25rem",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            <ArrowLeft size={13} /> Back to Blog
          </Link>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "2rem",
              alignItems: "start",
            }}
            className="post-header-grid"
          >
            <div>
              {/* Tags */}
              <div
                className="post-tags-row"
                style={{
                  display: "flex",
                  gap: "0.4rem",
                  marginBottom: "1.25rem",
                  flexWrap: "wrap",
                }}
              >
                {post.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/blog?tag=${t}`}
                    className="tag"
                    style={{ textDecoration: "none" }}
                  >
                    {t}
                  </Link>
                ))}
              </div>

              {/* Title */}
              <h1
                className="post-headline"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                  color: "var(--fg)",
                  lineHeight: 1.2,
                  marginBottom: "1.5rem",
                  maxWidth: "720px",
                }}
              >
                {post.title}
              </h1>

              {/* Meta */}
              <div
                className="post-meta"
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                {formattedDate && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontSize: "0.82rem",
                      color: "var(--muted)",
                    }}
                  >
                    <Calendar size={13} />
                    {formattedDate}
                  </span>
                )}
                {post.readTime && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontSize: "0.82rem",
                      color: "var(--muted)",
                    }}
                  >
                    <Clock size={13} />
                    {post.readTime} min read
                  </span>
                )}

                {/* Share buttons */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.6rem",
                    marginLeft: "auto",
                  }}
                >
                  <button
                    onClick={handleCopy}
                    title="Copy link"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      padding: "0.35rem 0.75rem",
                      border: "1px solid var(--border)",
                      borderRadius: "3px",
                      background: "none",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                      color: "var(--muted)",
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
                    {copied ? (
                      <>
                        <CheckCheck size={13} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={13} /> Copy link
                      </>
                    )}
                  </button>
                  <a
                    href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      padding: "0.35rem 0.75rem",
                      border: "1px solid var(--border)",
                      borderRadius: "3px",
                      fontSize: "0.75rem",
                      color: "var(--muted)",
                      textDecoration: "none",
                      transition: "color 0.2s ease, border-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "var(--fg)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor =
                        "var(--fg)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "var(--muted)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor =
                        "var(--border)";
                    }}
                  >
                    <X size={13} /> Share
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Post body + sidebar ─────────────────────────────────── */}
      <section style={{ padding: "4rem 2rem 5rem" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 240px",
            gap: "5rem",
            alignItems: "start",
          }}
          className="post-layout"
        >
          {/* Content */}
          <div className="post-body" ref={contentRef}>
            {post.content ? (
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              /* Placeholder when content is empty */
              <div>
                <p
                  style={{
                    color: "var(--muted)",
                    lineHeight: 1.85,
                    fontSize: "1rem",
                    marginBottom: "2rem",
                    fontStyle: "italic",
                    borderLeft: "3px solid var(--accent)",
                    paddingLeft: "1.25rem",
                  }}
                >
                  {post.excerpt}
                </p>
                <div
                  style={{
                    padding: "3rem 2rem",
                    border: "1px dashed var(--border)",
                    borderRadius: "6px",
                    textAlign: "center",
                    color: "var(--muted)",
                  }}
                >
                  <Tag
                    size={24}
                    style={{ marginBottom: "1rem", opacity: 0.3 }}
                  />
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.15rem",
                      color: "var(--fg)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Full article coming soon.
                  </p>
                  <p style={{ fontSize: "0.85rem" }}>
                    This post is being written. Check back shortly.
                  </p>
                </div>
              </div>
            )}

            {/* Post footer */}
            <div
              style={{
                marginTop: "4rem",
                paddingTop: "2.5rem",
                borderTop: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Written by
                </div>
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--fg)",
                  }}
                >
                  Eti
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                  Full-Stack Developer
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {post.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/blog?tag=${t}`}
                    className="tag"
                    style={{ textDecoration: "none" }}
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>

            {/* Nav: prev / next (placeholder) */}
            <div
              style={{
                marginTop: "2rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
              className="post-nav"
            >
              <Link
                href="/blog"
                style={{
                  padding: "1rem 1.25rem",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.8rem",
                  color: "var(--muted)",
                  transition: "border-color 0.2s ease, color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "var(--fg)";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--fg)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "var(--border)";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--muted)";
                }}
              >
                <ArrowLeft size={14} />
                <span>All posts</span>
              </Link>

              <Link
                href="/#contact"
                style={{
                  padding: "1rem 1.25rem",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "0.5rem",
                  fontSize: "0.8rem",
                  color: "var(--muted)",
                  transition: "border-color 0.2s ease, color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "var(--fg)";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--fg)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "var(--border)";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--muted)";
                }}
              >
                <span>Have a question?</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="post-sidebar">
            <div
              style={{
                position: "sticky",
                top: "90px",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Tags */}
              <div
                style={{
                  padding: "1.25rem",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  background: "var(--surface)",
                }}
              >
                <h3
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <Tag size={11} /> In this post
                </h3>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}
                >
                  {post.tags.map((t) => (
                    <Link
                      key={t}
                      href={`/blog?tag=${t}`}
                      className="tag"
                      style={{ textDecoration: "none" }}
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Reading progress */}
              <div
                style={{
                  padding: "1.25rem",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  background: "var(--surface)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                    }}
                  >
                    Progress
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--fg)",
                    }}
                  >
                    {Math.round(readingPercent)}%
                  </span>
                </div>
                <div
                  style={{
                    height: "3px",
                    background: "var(--border)",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${readingPercent}%`,
                      background: "var(--accent)",
                      transition: "width 0.2s ease",
                      borderRadius: "2px",
                    }}
                  />
                </div>
              </div>

              {/* Share */}
              <div
                style={{
                  padding: "1.25rem",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  background: "var(--surface)",
                }}
              >
                <h3
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <Globe size={11} /> Share
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <button
                    onClick={handleCopy}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 0.75rem",
                      background: "none",
                      border: "1px solid var(--border)",
                      borderRadius: "3px",
                      fontSize: "0.78rem",
                      color: "var(--muted)",
                      cursor: "pointer",
                      fontFamily: "'Inter', sans-serif",
                      transition: "color 0.2s ease",
                      width: "100%",
                      textAlign: "left",
                    }}
                  >
                    {copied ? <CheckCheck size={13} /> : <Copy size={13} />}
                    {copied ? "Link copied!" : "Copy link"}
                  </button>
                  <a
                    href={`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 0.75rem",
                      border: "1px solid var(--border)",
                      borderRadius: "3px",
                      fontSize: "0.78rem",
                      color: "var(--muted)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                  >
                    <X size={13} /> Share on X
                  </a>
                </div>
              </div>

              {/* CTA */}
              <div
                style={{
                  padding: "1.25rem",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  background: "var(--fg)",
                  color: "var(--bg)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                  }}
                >
                  Work together?
                </div>
                <p
                  style={{
                    fontSize: "0.78rem",
                    lineHeight: 1.65,
                    opacity: 0.7,
                    marginBottom: "1rem",
                  }}
                >
                  I&apos;m available for freelance and full-time roles.
                </p>
                <Link
                  href="/#contact"
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
                  Get in touch <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Related posts ───────────────────────────────────────── */}
      {related.length > 0 && (
        <section
          className="related-section"
          style={{
            padding: "4rem 2rem 5rem",
            borderTop: "1px solid var(--border)",
            background: "var(--surface)",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "2.5rem" }}>
              <span
                className="tag"
                style={{ marginBottom: "1rem", display: "inline-flex" }}
              >
                Related
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "var(--fg)",
                }}
              >
                More to read
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.5rem",
              }}
              className="related-grid"
            >
              {related.map((rp) => (
                <article
                  key={rp._id}
                  className="related-card"
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    padding: "1.75rem",
                    background: "var(--bg)",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--accent)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--border)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      marginBottom: "0.85rem",
                      flexWrap: "wrap",
                    }}
                  >
                    {rp.publishedAt && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          fontSize: "0.75rem",
                          color: "var(--muted)",
                        }}
                      >
                        <Calendar size={11} />
                        {new Date(rp.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/blog/${rp.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <h3
                      className="related-title"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        color: "var(--fg)",
                        lineHeight: 1.35,
                        marginBottom: "0.75rem",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {rp.title}
                    </h3>
                  </Link>

                  <p
                    style={{
                      fontSize: "0.83rem",
                      color: "var(--muted)",
                      lineHeight: 1.7,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {rp.excerpt.slice(0, 110)}
                    {rp.excerpt.length > 110 ? "..." : ""}
                  </p>

                  <Link
                    href={`/blog/${rp.slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: "var(--fg)",
                      textDecoration: "none",
                    }}
                  >
                    Read <ArrowRight size={12} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        /* ── Prose styles ── */
        .prose { color: var(--fg); line-height: 1.9; font-size: 1rem; }
        .prose h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.65rem; font-weight: 600;
          margin: 3rem 0 1rem; color: var(--fg);
          letter-spacing: -0.015em; line-height: 1.2;
        }
        .prose h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem; font-weight: 600;
          margin: 2.25rem 0 0.75rem; color: var(--fg);
        }
        .prose h4 {
          font-size: 1rem; font-weight: 600;
          margin: 1.75rem 0 0.5rem; color: var(--fg);
          letter-spacing: 0.01em;
        }
        .prose p { margin-bottom: 1.6rem; color: var(--muted); }
        .prose a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
        .prose strong { color: var(--fg); font-weight: 600; }
        .prose em { font-style: italic; }
        .prose code {
          background: var(--surface); border: 1px solid var(--border);
          padding: 0.15rem 0.45rem; border-radius: 3px;
          font-size: 0.86em; font-family: 'Fira Code', monospace;
          color: var(--fg);
        }
        .prose pre {
          background: var(--dark-bg); color: #E5E7EB;
          padding: 1.5rem; border-radius: 6px;
          overflow-x: auto; margin: 1.75rem 0;
          font-size: 0.86rem; line-height: 1.75;
          border: 1px solid var(--dark-border);
        }
        .prose pre code {
          background: none; border: none; padding: 0;
          font-size: inherit; color: inherit;
        }
        .prose ul, .prose ol {
          padding-left: 1.5rem; margin-bottom: 1.6rem; color: var(--muted);
        }
        .prose li { margin-bottom: 0.5rem; line-height: 1.75; }
        .prose blockquote {
          border-left: 3px solid var(--accent);
          padding: 0.85rem 1.35rem; margin: 2rem 0;
          background: var(--surface); border-radius: 0 4px 4px 0;
          font-style: italic; color: var(--muted);
          font-family: 'Playfair Display', serif; font-size: 1.05rem;
        }
        .prose img {
          max-width: 100%; border-radius: 6px;
          border: 1px solid var(--border); margin: 1.5rem 0;
        }
        .prose hr {
          border: none; border-top: 1px solid var(--border); margin: 3rem 0;
        }
        .prose table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }
        .prose th {
          text-align: left; padding: 0.6rem 1rem;
          background: var(--surface); font-size: 0.8rem;
          font-weight: 600; letter-spacing: 0.04em;
          border-bottom: 2px solid var(--border); color: var(--fg);
        }
        .prose td {
          padding: 0.6rem 1rem; border-bottom: 1px solid var(--border);
          font-size: 0.88rem; color: var(--muted);
        }

        .related-title:hover { color: var(--accent) !important; }

        /* ── Layout responsive ── */
        @media (max-width: 960px) {
          .post-layout { grid-template-columns: 1fr !important; }
          .post-sidebar { display: none !important; }
          .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .related-grid { grid-template-columns: 1fr !important; }
          .post-header-grid { grid-template-columns: 1fr !important; }
          .post-nav { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
