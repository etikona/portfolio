"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    phase: "Weeks 1–2",
    title: "Discovery & Architecture",
    desc: "Mapped the full property data model, buyer journey, and admin workflow before any design work began.",
  },
  {
    phase: "Weeks 3–6",
    title: "Design & Build",
    desc: "Custom UI design followed by a full Next.js build — listings engine, lead capture, blog, and job board.",
  },
  {
    phase: "Weeks 7–10",
    title: "Admin & Content",
    desc: "Built the internal dashboard, migrated initial listings, and configured SEO foundations across every page.",
  },
  {
    phase: "Weeks 11–13",
    title: "Launch",
    desc: "QA, performance tuning, domain cutover, and a live platform — fully indexed and accepting enquiries.",
  },
];

const results = [
  "A fully custom real estate platform, built from zero",
  "Live and accepting property enquiries within 90 days",
  "Self-service admin — the team manages listings without a developer",
  "Indexed on Google from launch week with a clean SEO foundation",
];

export default function CaseStudy() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cs-left > *",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".cs-left", start: "top 78%" },
        },
      );
      gsap.fromTo(
        ".cs-timeline-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".cs-timeline", start: "top 78%" },
        },
      );
      gsap.fromTo(
        ".cs-result",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".cs-results", start: "top 82%" },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="case-study"
      ref={ref}
      style={{
        padding: "8rem 2rem",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
            gap: "5rem",
            alignItems: "start",
            marginBottom: "4rem",
          }}
          className="cs-grid"
        >
          {/* Left: intro */}
          <div className="cs-left">
            <span
              className="tag"
              style={{ marginBottom: "1.25rem", display: "inline-flex" }}
            >
              Case Study
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.9rem, 3.6vw, 2.6rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "var(--fg)",
                marginBottom: "1.25rem",
              }}
            >
              Havenly Properties: zero to launch in{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
                90 days.
              </em>
            </h2>
            <p
              style={{
                color: "var(--muted)",
                lineHeight: 1.85,
                fontSize: "0.95rem",
                marginBottom: "1.5rem",
              }}
            >
              Havenly Properties came to me with no existing website — just a
              growing property portfolio, a small team, and a hard deadline to
              launch before their next marketing push. I designed and built
              their entire platform from scratch: property listings, lead
              capture, a blog, job postings, and a self-service admin dashboard
              — architected, built, and launched in under 90 days.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "2rem",
              }}
            >
              {[
                "Next.js",
                "Node.js",
                "MongoDB",
                "Cloudinary",
                "Real Estate",
              ].map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.8rem 1.75rem",
                background: "var(--fg)",
                color: "var(--bg)",
                fontSize: "0.82rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "3px",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--fg)")
              }
            >
              Start Your Project <ArrowRight size={14} />
            </Link>
          </div>

          {/* Right: timeline */}
          <div
            className="cs-timeline"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {timeline.map((item, i) => (
              <div
                key={item.phase}
                className="cs-timeline-item"
                style={{
                  display: "grid",
                  gridTemplateColumns: "110px 1fr",
                  gap: "1.5rem",
                  padding: "1.5rem 0",
                  borderBottom:
                    i < timeline.length - 1
                      ? "1px solid var(--border)"
                      : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--accent)",
                    letterSpacing: "0.03em",
                    paddingTop: "0.15rem",
                  }}
                >
                  {item.phase}
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "var(--fg)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--muted)",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results row */}
        <div
          className="cs-results"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
          }}
        >
          {results.map((r) => (
            <div
              key={r}
              className="cs-result"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.65rem",
                padding: "1.25rem",
                border: "1px solid var(--border)",
                borderRadius: "5px",
                background: "var(--bg)",
              }}
            >
              <CheckCircle2
                size={15}
                style={{
                  color: "var(--accent)",
                  flexShrink: 0,
                  marginTop: "1px",
                }}
              />
              <span
                style={{
                  fontSize: "0.82rem",
                  color: "var(--fg)",
                  lineHeight: 1.55,
                }}
              >
                {r}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .cs-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .cs-results { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .cs-results { grid-template-columns: 1fr !important; }
          .cs-timeline-item { grid-template-columns: 1fr !important; gap: 0.4rem !important; }
        }
      `}</style>
    </section>
  );
}
