"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Server, Database, Globe } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skills = [
  {
    icon: Code2,
    title: "Frontend",
    items: ["Next.js", "React", "TypeScript", "TailwindCSS", "GSAP"],
  },
  {
    icon: Server,
    title: "Backend",
    items: ["Node.js", "Express.js", "REST API", "JWT Auth", "Nodemailer"],
  },
  {
    icon: Database,
    title: "Database",
    items: ["MongoDB Atlas", "Mongoose", "Redis", "PostgreSQL"],
  },
  {
    icon: Globe,
    title: "DevOps",
    items: ["Render", "Vercel", "Cloudinary", "GitHub Actions", "Docker"],
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
      aria-label="About"
      style={{ padding: "8rem 2rem" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section label */}
        <div style={{ marginBottom: "3.5rem" }}>
          <span className="tag">About</span>
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
              Building software that{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
                actually matters.
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
              I&apos;m a full-stack developer based in Dhaka, Bangladesh, with a
              focus on building scalable, maintainable web applications. I work
              across the entire stack — from designing REST APIs to crafting
              responsive interfaces.
            </p>
            <p
              style={{
                color: "var(--muted)",
                lineHeight: 1.85,
                fontSize: "0.95rem",
              }}
            >
              My current stack revolves around Node.js and Express for backend
              services, Next.js for server-rendered frontends, and MongoDB Atlas
              for data persistence. I care deeply about clean code, good
              architecture, and shipping products that work reliably.
            </p>
          </div>

          {/* Right — stats */}
          <div className="about-text">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
              }}
            >
              {[
                { number: "2+", label: "Years of experience" },
                { number: "15+", label: "Projects shipped" },
                { number: "8+", label: "Happy clients" },
                { number: "100%", label: "Remote-ready" },
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
                      fontSize: "0.8rem",
                      color: "var(--muted)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="section-rule" style={{ marginBottom: "4rem" }} />

        {/* Skills grid */}
        <div
          className="skills-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
          }}
        >
          {skills.map(({ icon: Icon, title, items }) => (
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
