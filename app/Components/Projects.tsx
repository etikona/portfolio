"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "Heavenly Real Estate — Full Agency Platform",
    category: "Residential Sales & Listings Portal",
    market: "Bangladesh",
    result: "Full platform live in 90 days",
    description:
      "A property agency with zero digital presence and hundreds of leads stuck in a spreadsheet. We built their complete online platform — advanced property search with filters, automated lead capture forms routed directly into a CRM pipeline, a blog CMS for weekly SEO content, job board, gallery, and a full admin dashboard their non-technical team manages independently. Built on Next.js with server-side rendering so every listing page is indexed and rankable on Google.",
    outcomes: [
      "Inbound enquiries generated daily without paid advertising",
      "Complete lead pipeline replacing spreadsheet management",
      "Non-technical team publishes new listings and content without developer",
      "Every property listing page SEO-structured and Google-indexed",
    ],
    tech: ["Next.js", "Node.js", "MongoDB", "Cloudinary", "JWT Auth"],
    featured: true,
    status: "Live",
  },
  {
    number: "02",
    title: "Property Agency Website Rebuild",
    category: "Lettings & Sales Agency",
    market: "Europe",
    result: "40% faster load. 3x more enquiry form submissions",
    description:
      "An established lettings agency with an outdated WordPress site that loaded in 8 seconds on mobile and had no visible call-to-action above the fold. We rebuilt the entire site on Next.js — new property search, mobile-first design, strategic lead capture placement, and local SEO targeting their city-level search terms. The result was immediate: faster pages, higher Google rankings, and a measurable increase in inbound enquiries.",
    outcomes: [
      "Page load time dropped from 8 seconds to under 2 seconds on mobile",
      "Enquiry form submissions tripled within the first 60 days",
      "First page Google rankings for core local property keywords",
      "Mobile bounce rate reduced by over 50%",
    ],
    tech: ["Next.js", "TailwindCSS", "Node.js", "MongoDB"],
    featured: false,
    status: "Live",
  },
  {
    number: "03",
    title: "Real Estate Lead Capture System",
    category: "Lead Generation Infrastructure",
    market: "UAE / Australia",
    result: "Automated lead pipeline from first contact to follow-up",
    description:
      "Built a custom lead generation and nurturing system for a property developer — smart enquiry forms with budget and timeline pre-qualification, automated email and WhatsApp sequences that follow up with leads over 30 days, CRM integration routing high-intent leads directly to the sales team. Designed for markets where the majority of property searches happen on mobile and WhatsApp is the primary communication channel.",
    outcomes: [
      "Lead pre-qualification built into every enquiry form",
      "Automated 30-day follow-up sequence for cold leads",
      "WhatsApp integration for markets where it is the primary channel",
      "Sales team only receives pre-qualified, high-intent leads",
    ],
    tech: ["Next.js", "Node.js", "Nodemailer", "MongoDB", "WhatsApp API"],
    featured: false,
    status: "Live",
  },
  {
    number: "04",
    title: "Property Blog & SEO Content Engine",
    category: "SEO Infrastructure & Content CMS",
    market: "New Zealand / Australia",
    result: "Non-technical team publishing weekly SEO content",
    description:
      "A real estate agency that understood the value of content marketing but had no way to publish without a developer. We built a fully custom headless CMS — rich text editing, image uploads, tag filtering, SEO metadata fields (title, description, OG image), draft and publish workflow, related articles, and a reading progress bar. Integrated into their main property site and delivering consistent organic traffic through long-tail property search terms.",
    outcomes: [
      "Agency team publishing 4 SEO articles per week independently",
      "Organic traffic growing from long-tail property market keyword content",
      "Every post optimised with meta title, description, and schema",
      "Content driving steady inbound enquiries from buyers in research phase",
    ],
    tech: ["Next.js", "MongoDB", "Cloudinary", "TypeScript"],
    featured: false,
    status: "Live",
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
      aria-label="Real Estate Website Case Studies"
      style={{ padding: "8rem 2rem" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
              Real estate websites we have built
            </h2>
          </div>
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
            Want a site like these? <ArrowRight size={13} />
          </a>
        </div>

        <div className="proj-grid">
          {/* Featured */}
          <div
            className="proj-card"
            style={{
              border: "1px solid var(--border)",
              borderRadius: "6px",
              marginBottom: "1.5rem",
              background: "var(--surface)",
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
            <div
              style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr" }}
              className="feat-inner"
            >
              {/* Left */}
              <div
                style={{
                  padding: "2.5rem",
                  borderRight: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1.5rem",
                    flexWrap: "wrap",
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
                  <span className="tag">{featured.market}</span>
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
              {/* Right */}
              <div
                style={{
                  padding: "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
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
                    {featured.outcomes.map((o) => (
                      <li
                        key={o}
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
                          }}
                        >
                          &rarr;
                        </span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
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

          {/* Other cards */}
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
                    marginBottom: "0.75rem",
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
                  <div
                    style={{
                      display: "flex",
                      gap: "0.4rem",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
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
                      {project.status}
                    </span>
                    <span className="tag">{project.market}</span>
                  </div>
                </div>
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

        {/* Bottom CTA */}
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
              Your agency could be our next case study.
            </h3>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--muted)",
                maxWidth: "480px",
                lineHeight: 1.7,
              }}
            >
              We take on a limited number of real estate clients each quarter.
              If you are serious about owning your lead generation and getting
              off the portal treadmill, let us talk.
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
        @media (max-width: 600px) { .proj-sub-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
