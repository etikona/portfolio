"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Calendar } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    company: "Heavenly Real Estate",
    role: "Full-Stack Developer",
    period: "2024 — Present",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    description:
      "Architected and built a complete real estate platform from scratch — REST API with Node.js/Express, MongoDB Atlas for data, Cloudinary for media, and a Next.js frontend. Covers auth, project listings, blog, leads management, job postings, and a CMS-style admin dashboard.",
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB", "Cloudinary", "JWT"],
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "2023 — 2024",
    location: "Remote",
    type: "Contract",
    description:
      "Delivered full-stack web applications for clients across various industries. Focused on performance-optimized frontends, clean API design, and reliable deployment pipelines. Managed projects end-to-end from requirements gathering to production deployment.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Vercel"],
  },
  {
    company: "Open Source",
    role: "Contributor",
    period: "2022 — 2023",
    location: "Remote",
    type: "Volunteer",
    description:
      "Contributed to several open-source projects in the JavaScript ecosystem — bug fixes, documentation improvements, and new feature implementations. Built and published personal npm utilities used by other developers.",
    tech: ["TypeScript", "JavaScript", "GitHub Actions", "npm"],
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

  // animate panel on tab change
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
            Experience
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
            Where I&apos;ve worked
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "220px 1fr",
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
                  padding: "1rem 1.25rem",
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
                  }}
                >
                  {exp.company}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    marginTop: "0.2rem",
                    opacity: 0.7,
                  }}
                >
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
                marginBottom: "1.5rem",
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

            <p
              style={{
                color: "var(--muted)",
                lineHeight: 1.85,
                fontSize: "0.95rem",
                marginBottom: "2rem",
                maxWidth: "640px",
              }}
            >
              {active.description}
            </p>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {active.tech.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
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
