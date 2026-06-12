"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, GitFork, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    number: "01",
    title: "Heavenly Real Estate Platform",
    description:
      "A full-stack real estate platform for the Bangladesh market. Features project listings, blog CMS, lead management, job postings, gallery, and a complete admin dashboard. Built with Node.js/Express backend deployed on Render with MongoDB Atlas.",
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB", "Cloudinary", "JWT"],
    liveUrl: "https://yourproject.com",
    githubUrl: "https://github.com/yourusername/heavenly",
    featured: true,
    status: "Live",
  },
  {
    number: "02",
    title: "Developer Portfolio",
    description:
      "This portfolio — built with Next.js App Router, TypeScript, TailwindCSS, and GSAP for scroll animations. Fully SEO-optimized with structured metadata, sitemap, and perfect Core Web Vitals scores.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "GSAP", "Nodemailer"],
    liveUrl: "https://yourdomain.com",
    githubUrl: "https://github.com/yourusername/portfolio",
    featured: false,
    status: "Live",
  },
  {
    number: "03",
    title: "REST API Boilerplate",
    description:
      "Production-ready Node.js/Express REST API boilerplate with JWT authentication, role-based access control, file upload via Cloudinary, email notifications, and comprehensive error handling middleware.",
    tech: ["Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary"],
    liveUrl: undefined,
    githubUrl: "https://github.com/yourusername/api-boilerplate",
    featured: false,
    status: "Open Source",
  },
  {
    number: "04",
    title: "Blog CMS Engine",
    description:
      "A headless CMS for managing blog posts — rich text editing, image uploads, tag filtering, SEO metadata, draft/publish workflow, and a public API consumed by any frontend. Used in the Heavenly platform.",
    tech: ["Next.js", "MongoDB", "Cloudinary", "TypeScript"],
    liveUrl: undefined,
    githubUrl: "https://github.com/yourusername/blog-cms",
    featured: false,
    status: "In progress",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".proj-header",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ".proj-header", start: "top 82%" },
        },
      );
      gsap.fromTo(
        ".proj-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".proj-grid", start: "top 80%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const [featured, ...rest] = projects;

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Projects"
      style={{ padding: "8rem 2rem" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          className="proj-header"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <span
              className="tag"
              style={{ marginBottom: "1.25rem", display: "inline-flex" }}
            >
              Projects
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--fg)",
              }}
            >
              Selected work
            </h2>
          </div>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.82rem",
              color: "var(--muted)",
              textDecoration: "none",
              letterSpacing: "0.04em",
              fontWeight: 500,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            <GitFork size={14} />
            All repos
            <ArrowUpRight size={13} />
          </a>
        </div>

        <div className="proj-grid">
          {/* Featured card */}
          <div
            className="proj-card"
            style={{
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "2.5rem",
              marginBottom: "1.5rem",
              background: "var(--surface)",
              position: "relative",
              overflow: "hidden",
              transition: "border-color 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "var(--accent)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "0 12px 40px rgba(0,0,0,0.07)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "var(--border)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            {/* Featured badge */}
            <span
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent)",
                border: "1px solid var(--accent)",
                padding: "0.2rem 0.6rem",
                borderRadius: "2px",
              }}
            >
              Featured
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "3rem",
                  fontWeight: 600,
                  color: "var(--border)",
                  lineHeight: 1,
                }}
              >
                {featured.number}
              </span>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "var(--fg)",
                  lineHeight: 1.2,
                }}
              >
                {featured.title}
              </h3>
            </div>

            <p
              style={{
                color: "var(--muted)",
                lineHeight: 1.8,
                fontSize: "0.95rem",
                marginBottom: "1.75rem",
                maxWidth: "700px",
              }}
            >
              {featured.description}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {featured.tech.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                {featured.githubUrl && (
                  <a
                    href={featured.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      fontSize: "0.8rem",
                      color: "var(--muted)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--fg)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--muted)")
                    }
                  >
                    <GitFork size={15} /> Code
                  </a>
                )}
                {featured.liveUrl && (
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      fontSize: "0.8rem",
                      color: "var(--muted)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--fg)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--muted)")
                    }
                  >
                    <ExternalLink size={15} /> Live
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Other cards grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
            }}
            className="proj-sub-grid"
          >
            {rest.map((project) => (
              <div
                key={project.number}
                className="proj-card"
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "var(--accent)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 8px 30px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "var(--border)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.8rem",
                      fontWeight: 600,
                      color: "var(--border)",
                      lineHeight: 1,
                    }}
                  >
                    {project.number}
                  </span>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color:
                        project.status === "Live" ? "#16a34a" : "var(--muted)",
                      background:
                        project.status === "Live"
                          ? "#f0fdf4"
                          : "var(--surface)",
                      padding: "0.2rem 0.55rem",
                      borderRadius: "2px",
                      border: `1px solid ${project.status === "Live" ? "#bbf7d0" : "var(--border)"}`,
                    }}
                  >
                    {project.status}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--fg)",
                    marginBottom: "0.75rem",
                    lineHeight: 1.3,
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--muted)",
                    lineHeight: 1.75,
                    flex: 1,
                    marginBottom: "1.25rem",
                  }}
                >
                  {project.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        fontSize: "0.78rem",
                        color: "var(--muted)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--fg)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--muted)")
                      }
                    >
                      <GitFork size={14} /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        fontSize: "0.78rem",
                        color: "var(--muted)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--fg)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--muted)")
                      }
                    >
                      <ExternalLink size={14} /> Live
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .proj-sub-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .proj-sub-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
