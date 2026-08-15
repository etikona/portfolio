"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, Check } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const problems = [
  "A beautiful homepage that no one can find on Google",
  "A contact form nobody fills out because there's no reason to",
  "A site that takes five seconds to load on a phone in the field",
  "A design that impresses other designers but confuses buyers",
];

const pillars = [
  {
    title: "Built to be found",
    desc: "Technical SEO and site structure that gets you ranking for the searches that actually bring in business.",
  },
  {
    title: "Built to convert",
    desc: "Every page has a job  clear messaging, a visible next step, and a path from visitor to enquiry.",
  },
  {
    title: "Built to perform",
    desc: "Fast load times, clean code, and a mobile experience that works as well as your desktop one.",
  },
];

export default function WhyItMatters() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".wim-left > *",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".wim-left", start: "top 78%" },
        },
      );
      gsap.fromTo(
        ".wim-problem",
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".wim-problems", start: "top 82%" },
        },
      );
      gsap.fromTo(
        ".wim-pillar",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.13,
          ease: "power2.out",
          scrollTrigger: { trigger: ".wim-pillars", start: "top 82%" },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why"
      ref={ref}
      style={{
        padding: "8rem 2rem",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header + problems */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
            marginBottom: "5rem",
          }}
          className="wim-grid"
        >
          <div className="wim-left">
            <span
              className="tag"
              style={{ marginBottom: "1.5rem", display: "inline-flex" }}
            >
              The Real Problem
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                fontWeight: 600,
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
                color: "var(--fg)",
                marginBottom: "1.5rem",
              }}
            >
              Your website should generate business —{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
                not just look good.
              </em>
            </h2>
            <p
              style={{
                color: "var(--muted)",
                lineHeight: 1.85,
                fontSize: "0.98rem",
                maxWidth: "480px",
              }}
            >
              I&apos;ve reviewed dozens of business websites across real estate,
              law, construction, and consulting. The pattern is always the same:
              they were designed to be admired, not to sell. A logo, some stock
              photos, a paragraph about &ldquo;excellence&rdquo; and then
              nothing that actually moves a visitor toward becoming a client.
            </p>
          </div>

          {/* Problems list */}
          <div
            className="wim-problems"
            style={{ display: "flex", flexDirection: "column", gap: "0" }}
          >
            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "1.25rem",
              }}
            >
              What most sites get wrong
            </div>
            {problems.map((p, i) => (
              <div
                key={p}
                className="wim-problem"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.85rem",
                  padding: "1.1rem 0",
                  borderBottom:
                    i < problems.length - 1
                      ? "1px solid var(--border)"
                      : "none",
                }}
              >
                <X
                  size={15}
                  style={{ color: "#ef4444", flexShrink: 0, marginTop: "2px" }}
                />
                <span
                  style={{
                    fontSize: "0.92rem",
                    color: "var(--fg)",
                    lineHeight: 1.6,
                  }}
                >
                  {p}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pull quote */}
        <div
          style={{
            padding: "3rem",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            background: "var(--surface)",
            marginBottom: "5rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)",
              fontStyle: "italic",
              color: "var(--fg)",
              lineHeight: 1.5,
              maxWidth: "760px",
              margin: "0 auto",
            }}
          >
            &ldquo;A website that looks good but generates nothing is a very
            expensive brochure. A website engineered around your customer&apos;s
            decision is a growth engine that works while you sleep.&rdquo;
          </p>
        </div>

        {/* Solution pillars */}
        <div>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span
              className="tag"
              style={{ marginBottom: "1.25rem", display: "inline-flex" }}
            >
              The Fix
            </span>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--fg)",
              }}
            >
              Every site I build stands on three pillars
            </h3>
          </div>
          <div
            className="wim-pillars"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
            }}
          >
            {pillars.map(({ title, desc }) => (
              <div
                key={title}
                className="wim-pillar"
                style={{
                  padding: "2rem",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  background: "var(--bg)",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor =
                    "var(--accent)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor =
                    "var(--border)")
                }
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "var(--fg)",
                    color: "var(--bg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <Check size={15} />
                </div>
                <h4
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--fg)",
                    marginBottom: "0.6rem",
                  }}
                >
                  {title}
                </h4>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--muted)",
                    lineHeight: 1.75,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .wim-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .wim-pillars { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
