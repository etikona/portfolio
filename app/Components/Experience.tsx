"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    company: "Heavenly Real Estate",
    role: "Lead Developer & Digital Partner",
    period: "2024 — Present",
    location: "Dhaka, Bangladesh",
    type: "Product Build",
    result: "Full platform launched in 90 days",
    description:
      "A business came to us with no digital presence and a list of 400 leads they were managing in a spreadsheet. We built them a complete digital growth system — a high-performance web platform covering property listings, lead capture, blog CMS, job board, and admin dashboard. The result: a scalable, owned channel that now generates inbound enquiries daily without manual outreach.",
    impact: [
      "0 → full web platform in 90 days",
      "Lead management moved from spreadsheet to automated CRM pipeline",
      "Blog CMS enables weekly SEO content with zero developer dependency",
      "Admin dashboard gives full business visibility in one place",
    ],
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB", "Cloudinary", "JWT"],
  },
  {
    company: "Client Projects",
    role: "Full-Stack Development Studio",
    period: "2023 — 2024",
    location: "Remote — Global",
    type: "Agency Work",
    result: "15+ projects shipped across 3 industries",
    description:
      "We delivered custom web applications and digital systems for business clients across e-commerce, professional services, and SaaS. Every project was treated as a growth asset: we didn't just build what clients asked for — we challenged briefs, identified revenue opportunities in the architecture, and shipped products that worked. Clients returned because results were measurable.",
    impact: [
      "E-commerce clients saw average 30% improvement in page speed after rebuild",
      "SaaS MVP delivered and investor-ready in under 8 weeks",
      "REST APIs built to handle 10x projected traffic from day one",
      "Zero projects required post-launch emergency fixes",
    ],
    tech: ["React", "Next.js", "Node.js", "MongoDB", "TailwindCSS", "Vercel"],
  },
  {
    company: "Open Source & R&D",
    role: "Technical Research & Product Development",
    period: "2022 — 2023",
    location: "Remote",
    type: "Internal",
    result: "Production tooling used by 100+ developers",
    description:
      "Before taking on client work, we invested deeply in open-source contribution and R&D — building and publishing developer tools, REST API boilerplates, and automation utilities adopted by other engineers. This foundation is what allows us to move fast on client projects: our production templates, security middleware, and deployment pipelines are battle-tested before your project ever starts.",
    impact: [
      "Open-source API boilerplate adopted by 100+ developers",
      "Internal tooling reduces new project setup from days to hours",
      "Security and authentication patterns hardened across multiple projects",
      "Continuous learning feeds directly into client work quality",
    ],
    tech: ["TypeScript", "Node.js", "Express.js", "GitHub Actions", "npm"],
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
      aria-label="Experience"
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
              Results we've delivered
            </h2>
            {/* CTA in header — Khalid-style */}
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
              Want results like these? <ArrowRight size={13} />
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
            {/* Role + company */}
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

            {/* Meta */}
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

            {/* Result badge */}
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

            {/* Impact list */}
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
                      →
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech tags */}
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

            {/* Inline CTA */}
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
              Get results like this for your business <ArrowRight size={13} />
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
