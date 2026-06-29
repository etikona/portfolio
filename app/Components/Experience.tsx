"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "Heavenly Real Estate",
    role: "Full Real Estate Platform Build",
    period: "2024 — Present",
    location: "Dhaka, Bangladesh",
    type: "Full Platform Build",
    result: "0 to live platform in 90 days",
    description:
      "A property agency was managing hundreds of leads inside a spreadsheet with no online presence whatsoever. We designed and built their complete digital platform from scratch — property listings with advanced filters, automated lead capture, a blog CMS for SEO content publishing, job board, gallery, and a full admin dashboard so their team manages everything without touching code. Built on Next.js and Node.js with server-side rendering for maximum Google visibility.",
    impact: [
      "Full platform live in under 90 days from first call",
      "Inbound property enquiries generated daily without paid ads",
      "Lead management moved from spreadsheet to automated pipeline",
      "Team now publishes SEO content weekly with zero developer help",
      "Admin dashboard gives full business visibility in one place",
    ],
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB", "Cloudinary", "JWT"],
  },
  {
    company: "Client Builds — Property Sector",
    role: "Real Estate Website Development",
    period: "2023 — 2024",
    location: "Remote — Multiple Markets",
    type: "Agency Projects",
    result: "Multiple agencies, one outcome: more leads",
    description:
      "We delivered custom property websites for real estate clients across multiple markets — covering residential sales agencies, lettings businesses, and independent brokers. Every project started with the same question: where is this site currently losing you enquiries? We fixed the root cause — whether that was crawl speed, broken lead capture, missing local SEO, or a mobile experience that drove buyers away — and built a platform designed to perform.",
    impact: [
      "Average 40% improvement in page load speed after rebuild",
      "Lead capture forms rebuilt to convert rather than just collect",
      "Local SEO implementation targeting city-level property search terms",
      "Mobile experience rebuilt — the majority of property searches are on phone",
      "Zero projects required emergency fixes post-launch",
    ],
    tech: ["Next.js", "React", "Node.js", "MongoDB", "TailwindCSS", "Vercel"],
  },
  {
    company: "R&D — Real Estate Tech",
    role: "Platform Architecture & Tooling",
    period: "2022 — 2023",
    location: "Remote",
    type: "Internal R&D",
    result: "Production systems behind every client build",
    description:
      "Before taking on real estate client work, we invested deeply in understanding what makes property websites actually generate leads — studying market leaders in the UK, UAE, Australian, and European property markets. We built and refined our core property platform architecture, lead capture systems, and SEO frameworks. Every client project runs on this battle-tested foundation, not a fresh experiment.",
    impact: [
      "Core property listing and search engine built and refined",
      "Lead capture and pipeline system tested across multiple builds",
      "SEO architecture validated against real estate market leaders",
      "Deployment infrastructure reducing new site launch time by 60%",
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "GitHub Actions"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-header",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ".exp-header", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".exp-tab",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".exp-tabs", start: "top 80%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".exp-panel",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
    );
  }, [activeIndex]);

  const active = experiences[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-label="Real Estate Project Track Record"
      style={{
        padding: "8rem 2rem",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="exp-header" style={{ marginBottom: "3.5rem" }}>
          <span
            className="tag"
            style={{ marginBottom: "1.25rem", display: "inline-flex" }}
          >
            Track Record
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
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
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.82rem",
                color: "var(--muted)",
                textDecoration: "none",
                fontWeight: 500,
                letterSpacing: "0.04em",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted)")
              }
            >
              Get results like these <ArrowRight size={13} />
            </a>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: "3rem",
          }}
          className="exp-layout"
        >
          {/* Tabs */}
          <div
            className="exp-tabs"
            style={{
              display: "flex",
              flexDirection: "column",
              borderLeft: "1px solid var(--border)",
            }}
          >
            {experiences.map((exp, i) => (
              <button
                key={i}
                className="exp-tab"
                onClick={() => setActiveIndex(i)}
                style={{
                  padding: "1.1rem 1.25rem",
                  background: "none",
                  border: "none",
                  borderLeft: `2px solid ${activeIndex === i ? "var(--accent)" : "transparent"}`,
                  marginLeft: "-1px",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  color: activeIndex === i ? "var(--fg)" : "var(--muted)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: activeIndex === i ? 600 : 400,
                    letterSpacing: "0.02em",
                    marginBottom: "0.25rem",
                  }}
                >
                  {exp.company}
                </div>
                <div style={{ fontSize: "0.7rem", opacity: 0.65 }}>
                  {exp.type}
                </div>
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className="exp-panel">
            <div
              style={{
                marginBottom: "0.5rem",
                display: "flex",
                alignItems: "baseline",
                gap: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  color: "var(--fg)",
                }}
              >
                {active.role}
              </h3>
              <span
                style={{
                  color: "var(--accent)",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                @ {active.company}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                marginBottom: "0.85rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontSize: "0.8rem",
                  color: "var(--muted)",
                }}
              >
                <Calendar size={13} />
                {active.period}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontSize: "0.8rem",
                  color: "var(--muted)",
                }}
              >
                <MapPin size={13} />
                {active.location}
              </span>
            </div>

            <div
              style={{
                display: "inline-flex",
                padding: "0.3rem 0.85rem",
                border: "1px solid var(--accent)",
                borderRadius: "2px",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--accent)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginBottom: "1.5rem",
              }}
            >
              {active.result}
            </div>

            <p
              style={{
                color: "var(--muted)",
                lineHeight: 1.85,
                fontSize: "0.93rem",
                marginBottom: "2rem",
                maxWidth: "640px",
              }}
            >
              {active.description}
            </p>

            <div style={{ marginBottom: "2rem" }}>
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: "0.85rem",
                }}
              >
                Key outcomes
              </p>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {active.impact.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.6rem",
                      fontSize: "0.87rem",
                      color: "var(--muted)",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--accent)",
                        fontWeight: 700,
                        marginTop: "1px",
                        flexShrink: 0,
                      }}
                    >
                      &rarr;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                marginBottom: "2rem",
              }}
            >
              {active.tech.map((t) => (
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
                gap: "0.5rem",
                padding: "0.7rem 1.4rem",
                border: "1px solid var(--border)",
                color: "var(--fg)",
                textDecoration: "none",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                borderRadius: "2px",
                transition: "border-color 0.2s ease, background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--fg)";
                e.currentTarget.style.background = "var(--surface)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Get a similar site for your agency <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .exp-layout { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .exp-tabs { flex-direction: row !important; border-left: none !important; border-bottom: 1px solid var(--border); overflow-x: auto; }
          .exp-tab { border-left: none !important; border-bottom: 2px solid transparent; margin-left: 0 !important; margin-bottom: -1px; white-space: nowrap; }
        }
      `}</style>
    </section>
  );
}
