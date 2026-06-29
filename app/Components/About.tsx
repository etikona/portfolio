"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, MousePointerClick, BarChart3, Smartphone } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Search,
    title: "SEO-First Architecture",
    items: [
      "Google-ready structure",
      "Local SEO for your market",
      "Schema markup for listings",
      "Fast Core Web Vitals",
      "XML sitemap & indexing",
    ],
  },
  {
    icon: MousePointerClick,
    title: "Lead Capture Systems",
    items: [
      "Smart enquiry forms",
      "Property alert signups",
      "WhatsApp integration",
      "CRM pipeline connection",
      "Automated follow-up",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    items: [
      "Responsive on all devices",
      "Sub-3s load time",
      "Touch-optimised search",
      "Click-to-call buttons",
      "Map & location features",
    ],
  },
  {
    icon: BarChart3,
    title: "Built to Scale",
    items: [
      "Unlimited listings",
      "Admin dashboard",
      "Blog & content CMS",
      "Analytics integration",
      "Easy self-management",
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
          scrollTrigger: { trigger: ".about-text", start: "top 80%" },
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
          scrollTrigger: { trigger: ".skills-grid", start: "top 80%" },
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
        <div style={{ marginBottom: "3.5rem" }}>
          <span className="tag">Who We Are</span>
        </div>

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
          {/* Left */}
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
              Your agency deserves a website that works{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
                as hard as you do.
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
              We are Eti Studio — a specialist real estate website development
              studio serving property agencies, brokers, and developers across
              Europe, the UAE, Australia, and New Zealand. We build one type of
              website: custom real estate platforms that rank on Google and
              convert visitors into qualified enquiries.
            </p>
            <p
              style={{
                color: "var(--muted)",
                lineHeight: 1.85,
                fontSize: "0.95rem",
                marginBottom: "2rem",
              }}
            >
              Most real estate agencies are invisible online, relying entirely
              on portals like Rightmove, REA, or Property Finder for leads. That
              means you pay forever and own nothing. We give you an owned
              channel — a high-performance website that generates inbound leads
              daily, independent of any third-party platform.
            </p>

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
              Get a Free Site Audit &rarr;
            </a>
          </div>

          {/* Right — stats + quote */}
          <div className="about-text">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              {[
                {
                  number: "15+",
                  label: "Real estate websites built for agencies worldwide",
                },
                {
                  number: "4",
                  label: "Target markets: Europe, UAE, Australia, New Zealand",
                },
                {
                  number: "90",
                  label: "Days average from first call to live website",
                },
                {
                  number: "0",
                  label: "Templates used — every site is custom built",
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

            <div
              style={{
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
                &quot;Most real estate agencies spend thousands on portal
                listings they will never own. One well-built website pays for
                itself in a single closed deal and keeps generating leads for
                years.&quot;
              </p>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--fg)",
                  fontWeight: 600,
                  marginTop: "0.75rem",
                }}
              >
                — Eti, Founder &amp; Lead Developer
              </p>
            </div>
          </div>
        </div>

        <hr className="section-rule" style={{ marginBottom: "4rem" }} />

        {/* What we build into every site */}
        <div style={{ marginBottom: "2.5rem" }}>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.2rem",
              fontWeight: 600,
              color: "var(--fg)",
              marginBottom: "0.5rem",
            }}
          >
            What we build into every real estate website
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
            Not bolt-ons. Not plugins. Built from the ground up for your market.
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
              Is your current website costing you listings?
            </p>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--muted)",
                maxWidth: "480px",
                lineHeight: 1.7,
              }}
            >
              Send us your URL. We will audit your real estate website for free
              — speed, SEO, lead capture, and mobile performance — and tell you
              exactly what is losing you enquiries.
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
            Get Free Audit &rarr;
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .about-cols { grid-template-columns: 1fr !important; gap: 3rem !important; } }
        @media (max-width: 768px) { .skills-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .skills-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
