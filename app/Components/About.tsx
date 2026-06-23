"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Zap, TrendingUp, Globe } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pillars = [
  {
    icon: Code2,
    title: "Web Development",
    items: ["Next.js", "React", "Node.js", "REST APIs", "MongoDB"],
  },
  {
    icon: Zap,
    title: "AI Automation",
    items: [
      "Workflow Automation",
      "AI Integration",
      "Lead Systems",
      "Make / Zapier",
      "Custom Bots",
    ],
  },
  {
    icon: TrendingUp,
    title: "Brand Building",
    items: [
      "Brand Strategy",
      "Visual Identity",
      "Positioning",
      "Content Systems",
      "LinkedIn Growth",
    ],
  },
  {
    icon: Globe,
    title: "Growth & Scale",
    items: [
      "SEO & GEO",
      "Conversion Rate Opt.",
      "Performance",
      "Analytics",
      "Ongoing Support",
    ],
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-text > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-text",
            start: "top 80%",
          },
        },
      );
      gsap.fromTo(
        ".skill-card",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 80%",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About Eti Studio"
      style={{ padding: "8rem 2rem" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section label */}
        <div style={{ marginBottom: "3.5rem" }}>
          <span className="tag">About the Studio</span>
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6rem",
            alignItems: "start",
            marginBottom: "5rem",
          }}
          className="about-cols"
        >
          {/* Left — pain-point copy */}
          <div className="about-text">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 600,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: "1.5rem",
                color: "var(--fg)",
              }}
            >
              Most businesses have a website.{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
                Few have a growth engine.
              </em>
            </h2>

            <p
              style={{
                color: "var(--muted)",
                lineHeight: 1.85,
                marginBottom: "1.25rem",
                fontSize: "0.95rem",
              }}
            >
              Eti Studio is a founder-led digital growth agency based in Dhaka,
              Bangladesh, working with startups and businesses worldwide. We
              don't just build websites — we build systems that attract
              customers, qualify leads, and convert them into revenue.
            </p>
            <p
              style={{
                color: "var(--muted)",
                lineHeight: 1.85,
                fontSize: "0.95rem",
                marginBottom: "2rem",
              }}
            >
              Our three-pillar approach covers everything a growing business
              needs: a high-performance web platform engineered to rank and
              convert, AI automation workflows that eliminate manual
              bottlenecks, and a brand strategy that positions you as the
              obvious choice in your market.
            </p>

            {/* Inline CTA — catch readers mid-scroll */}
            <a
              href="#contact"
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
                borderRadius: "2px",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--fg)")
              }
            >
              See if we're a fit →
            </a>
          </div>

          {/* Right — stats with Acquisition.com-style authority signals */}
          <div className="about-text">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
              }}
            >
              {[
                {
                  number: "3+",
                  label: "Years delivering production-grade digital products",
                },
                {
                  number: "15+",
                  label: "Businesses launched, scaled, or rebuilt",
                },
                { number: "8+", label: "Active clients across 3 continents" },
                {
                  number: "1",
                  label: "Point of contact — no handoffs, no junior work",
                },
              ].map(({ number, label }) => (
                <div
                  key={label}
                  style={{
                    padding: "1.75rem",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    background: "var(--surface)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "2.5rem",
                      fontWeight: 600,
                      color: "var(--fg)",
                      lineHeight: 1,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {number}
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--muted)",
                      letterSpacing: "0.01em",
                      lineHeight: 1.5,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Pain points — Khalid-style honest framing */}
            <div
              style={{
                marginTop: "2rem",
                padding: "1.5rem",
                border: "1px solid var(--border)",
                borderLeft: "3px solid var(--accent)",
                borderRadius: "4px",
                background: "var(--surface)",
              }}
            >
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--muted)",
                  lineHeight: 1.8,
                  fontStyle: "italic",
                }}
              >
                "We don't outsource. We don't disappear after launch. You work
                directly with us — the people who built your system are the same
                people optimising it."
              </p>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--fg)",
                  fontWeight: 600,
                  marginTop: "0.75rem",
                }}
              >
                — Eti, Founder
              </p>
            </div>
          </div>
        </div>

        <hr className="section-rule" style={{ marginBottom: "4rem" }} />

        {/* Service pillars grid */}
        <div style={{ marginBottom: "3rem" }}>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.2rem",
              fontWeight: 600,
              color: "var(--fg)",
              marginBottom: "0.5rem",
            }}
          >
            Everything your business needs to grow online
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
            Web development, AI automation, brand building, and growth — one
            studio, no coordination overhead.
          </p>
        </div>

        <div
          className="skills-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
          }}
        >
          {pillars.map(({ icon: Icon, title, items }) => (
            <div
              key={title}
              className="skill-card"
              style={{
                padding: "1.75rem",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
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
                  width: "36px",
                  height: "36px",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                  color: "var(--accent)",
                }}
              >
                <Icon size={17} />
              </div>
              <h3
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--fg)",
                  marginBottom: "0.85rem",
                }}
              >
                {title}
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                {items.map((item) => (
                  <li
                    key={item}
                    style={{ fontSize: "0.82rem", color: "var(--muted)" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.3rem",
                fontWeight: 600,
                color: "var(--fg)",
                marginBottom: "0.4rem",
              }}
            >
              Not sure which service you need?
            </p>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
              Book a free 30-minute strategy call. We'll diagnose your biggest
              growth bottleneck and tell you exactly what to do about it — no
              pitch, no pressure.
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
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--fg)")
            }
          >
            Book Free Call →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-cols { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
