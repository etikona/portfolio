"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    number: "01",
    title: "Heavenly Real Estate — Full Digital Growth System",
    category: "Web Development · Lead Generation",
    result: "0 → full platform in 90 days",
    description:
      "A real estate business was managing hundreds of leads in a spreadsheet with no digital presence. We designed and built a complete web platform from scratch — property listings, automated lead capture, blog CMS for SEO content, job board, gallery management, and a full admin dashboard. Built on Node.js, MongoDB Atlas, and Next.js with server-side rendering for search engine visibility.",
    outcomes: [
      "Inbound leads generated daily without paid ads",
      "SEO blog system reducing customer acquisition cost",
      "Admin dashboard giving full business control",
      "Scalable architecture ready for 10× growth",
    ],
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB", "Cloudinary", "JWT"],
    featured: true,
    status: "Live",
  },
  {
    number: "02",
    title: "Eti Studio — Agency Website",
    category: "Web Development · Brand Building",
    result: "Perfect Core Web Vitals · Built to rank",
    description:
      "Our own agency site — the one you're on right now. Built with Next.js App Router, GSAP scroll animations, TypeScript, and TailwindCSS. Server-side rendered for SEO, structured metadata, XML sitemap, and a Nodemailer-powered contact system for lead capture. We build for clients exactly what we've built here.",
    outcomes: [
      "100/100 Core Web Vitals across all metrics",
      "Structured metadata and sitemap for Google indexing",
      "Contact system that captures and routes leads automatically",
      "Deployed and live in under 2 weeks",
    ],
    tech: ["Next.js", "TypeScript", "TailwindCSS", "GSAP", "Nodemailer"],
    featured: false,
    status: "Live",
  },
  {
    number: "03",
    title: "Production REST API Boilerplate",
    category: "API Architecture · Developer Tooling",
    result: "Used by 100+ developers worldwide",
    description:
      "A production-ready Node.js/Express REST API starter kit with JWT authentication, role-based access control, Cloudinary file uploads, Nodemailer email notifications, rate limiting, and comprehensive error handling middleware. The same foundation we deploy on every client project — battle-tested before your build begins.",
    outcomes: [
      "Reduces new project backend setup from days to hours",
      "Security and auth patterns hardened across real projects",
      "Adopted by 100+ developers as a trusted foundation",
      "Open source — full transparency on what we ship",
    ],
    tech: ["Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary"],
    featured: false,
    status: "Open Source",
  },
  {
    number: "04",
    title: "Headless Blog & Content CMS Engine",
    category: "Web Development · SEO Infrastructure",
    result: "Powers SEO content for multiple businesses",
    description:
      "A reusable headless CMS built for business blogs — rich text editing, Cloudinary image management, tag filtering, SEO metadata fields, reading progress, related posts, and a draft/publish workflow. Exposes a public API consumed by any frontend. Built into the Heavenly platform and available as a standalone product for any business that wants to own their content channel.",
    outcomes: [
      "Non-technical teams publish SEO content without developer help",
      "Tag filtering and related posts improve time-on-site",
      "SEO metadata fields built in — title, description, OG image",
      "Headless API works with any frontend framework",
    ],
    tech: ["Next.js", "MongoDB", "Cloudinary", "TypeScript"],
    featured: false,
    status: "In Progress",
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
      aria-label="Case Studies"
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
              Case Studies
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
              Work that delivered results
            </h2>
          </div>

          {/* Header CTA */}
          <a
            href="#contact"
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
            Want results like these?
            <ArrowRight size={13} />
          </a>
        </div>

        <div className="proj-grid">
          {/* Featured card */}
          <div
            className="proj-card"
            style={{
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "0",
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
            {/* Two-column featured layout */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 1fr",
              }}
              className="feat-inner"
            >
              {/* Left — main content */}
              <div
                style={{
                  padding: "2.5rem",
                  borderRight: "1px solid var(--border)",
                }}
              >
                {/* Featured badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    style={{
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
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#16a34a",
                      background: "#f0fdf4",
                      padding: "0.2rem 0.55rem",
                      borderRadius: "2px",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    {featured.status}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "1rem",
                    marginBottom: "0.75rem",
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
                      fontSize: "1.4rem",
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
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "1rem",
                  }}
                >
                  {featured.category}
                </p>

                <p
                  style={{
                    color: "var(--muted)",
                    lineHeight: 1.85,
                    fontSize: "0.93rem",
                    marginBottom: "1.75rem",
                  }}
                >
                  {featured.description}
                </p>

                <div
                  style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                >
                  {featured.tech.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — outcomes + result */}
              <div
                style={{
                  padding: "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                {/* Result badge */}
                <div
                  style={{
                    padding: "1.25rem",
                    border: "1px solid var(--border)",
                    borderLeft: "3px solid var(--accent)",
                    borderRadius: "4px",
                    background: "var(--bg)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Result
                  </p>
                  <p
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "var(--fg)",
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {featured.result}
                  </p>
                </div>

                {/* Outcomes */}
                <div>
                  <p
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      marginBottom: "1rem",
                    }}
                  >
                    Key outcomes
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    {featured.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.6rem",
                          fontSize: "0.85rem",
                          color: "var(--muted)",
                          lineHeight: 1.6,
                        }}
                      >
                        <span
                          style={{
                            color: "var(--accent)",
                            fontWeight: 700,
                            flexShrink: 0,
                            marginTop: "1px",
                          }}
                        >
                          →
                        </span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA inside featured card */}
                <a
                  href="#contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.4rem",
                    background: "var(--fg)",
                    color: "var(--bg)",
                    textDecoration: "none",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    borderRadius: "2px",
                    transition: "background 0.2s ease",
                    marginTop: "auto",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#333")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "var(--fg)")
                  }
                >
                  Build something similar <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* Other project cards */}
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
                {/* Number + status */}
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

                {/* Category */}
                <p
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "0.5rem",
                    opacity: 0.7,
                  }}
                >
                  {project.category}
                </p>

                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "var(--fg)",
                    marginBottom: "0.5rem",
                    lineHeight: 1.3,
                  }}
                >
                  {project.title}
                </h3>

                {/* Result badge */}
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--accent)",
                    fontStyle: "italic",
                    marginBottom: "1rem",
                  }}
                >
                  {project.result}
                </p>

                <p
                  style={{
                    fontSize: "0.84rem",
                    color: "var(--muted)",
                    lineHeight: 1.75,
                    flex: 1,
                    marginBottom: "1.25rem",
                  }}
                >
                  {project.description}
                </p>

                {/* Tech tags */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Per-card CTA */}
                <a
                  href="#contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.78rem",
                    color: "var(--muted)",
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "color 0.2s ease",
                    marginTop: "auto",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--fg)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--muted)")
                  }
                >
                  Build something like this <ArrowRight size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div
          style={{
            marginTop: "4rem",
            padding: "2.5rem",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            background: "var(--surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--fg)",
                marginBottom: "0.4rem",
              }}
            >
              Your business could be the next case study.
            </h3>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--muted)",
                maxWidth: "480px",
                lineHeight: 1.7,
              }}
            >
              We take on a limited number of new clients each quarter to ensure
              every project gets the attention it deserves. If you're ready to
              invest in real growth — let's talk.
            </p>
          </div>
          <a
            href="#contact"
            style={{
              padding: "0.85rem 2rem",
              background: "var(--fg)",
              color: "var(--bg)",
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              borderRadius: "2px",
              whiteSpace: "nowrap",
              transition: "background 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--fg)")
            }
          >
            Start Your Project <ArrowRight size={14} />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .feat-inner { grid-template-columns: 1fr !important; }
          .feat-inner > div:first-child { border-right: none !important; border-bottom: 1px solid var(--border); }
          .proj-sub-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .proj-sub-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
