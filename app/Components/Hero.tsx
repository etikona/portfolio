"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowDown, GitFork, Globe, FileText } from "lucide-react";

const roles = [
  "Full-Stack Developer",
  "Next.js Engineer",
  "Node.js Developer",
  "API Architect",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursor, setCursor] = useState(true);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedRole.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));
      }, 80);
    } else if (!isDeleting && displayedRole.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayedRole.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedRole(displayedRole.slice(0, -1));
      }, 45);
    } else if (isDeleting && displayedRole.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, roleIndex]);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      )
        .fromTo(
          ".hero-name",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".hero-role-line",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.2",
        );

      // Floating terminal card
      if (terminalRef.current) {
        gsap.fromTo(
          terminalRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 1, ease: "power2.out", delay: 0.8 },
        );
        gsap.to(terminalRef.current, {
          y: -10,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.5,
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "0 2rem",
        paddingTop: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: 0.35,
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
        className="hero-grid"
      >
        {/* Left Column */}
        <div>
          <span
            className="hero-eyebrow tag"
            style={{ marginBottom: "1.5rem", display: "inline-flex" }}
          >
            Available for work
          </span>

          <h1
            className="hero-name"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "var(--fg)",
              marginBottom: "1rem",
            }}
          >
            Hi, I&apos;m Eti.
          </h1>

          <div
            className="hero-role-line"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.5rem",
              height: "2rem",
            }}
          >
            <span
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                color: "var(--accent)",
                fontWeight: 500,
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
              }}
            >
              {displayedRole}
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "1.2em",
                  background: "var(--accent)",
                  marginLeft: "2px",
                  verticalAlign: "middle",
                  opacity: cursor ? 1 : 0,
                  transition: "opacity 0.1s",
                }}
              />
            </span>
          </div>

          <p
            className="hero-description"
            style={{
              fontSize: "1rem",
              color: "var(--muted)",
              lineHeight: 1.8,
              maxWidth: "480px",
              marginBottom: "2.5rem",
            }}
          >
            I build high-performance web applications with clean architecture
            and pixel-perfect interfaces. Focused on Node.js backends, Next.js
            frontends, and real-world products.
          </p>

          <div
            className="hero-cta"
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <a
              href="#projects"
              style={{
                padding: "0.75rem 1.75rem",
                background: "var(--fg)",
                color: "var(--bg)",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                transition: "background 0.2s ease",
                borderRadius: "2px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--fg)")
              }
            >
              View Projects
            </a>
            <a
              href="#contact"
              style={{
                padding: "0.75rem 1.75rem",
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--fg)",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                transition: "border-color 0.2s ease, background 0.2s ease",
                borderRadius: "2px",
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
              Get in Touch
            </a>

            {/* Social Icons */}
            <div
              style={{ display: "flex", gap: "0.75rem", marginLeft: "0.5rem" }}
            >
              {[
                { href: "https://github.com/yourusername", icon: GitFork },
                { href: "https://linkedin.com/in/yourusername", icon: Globe },
                { href: "/resume.pdf", icon: FileText },
              ].map(({ href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "38px",
                    height: "38px",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--muted)",
                    borderRadius: "2px",
                    transition: "color 0.2s ease, border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--fg)";
                    e.currentTarget.style.borderColor = "var(--fg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--muted)";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column — Terminal Card */}
        <div
          ref={terminalRef}
          style={{
            background: "var(--dark-bg)",
            border: "1px solid var(--dark-border)",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 40px 80px rgba(0,0,0,0.15)",
          }}
          className="hero-terminal"
        >
          {/* Terminal header */}
          <div
            style={{
              padding: "0.75rem 1rem",
              borderBottom: "1px solid var(--dark-border)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#FF5F57",
                display: "block",
              }}
            />
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#FEBC2E",
                display: "block",
              }}
            />
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#28C840",
                display: "block",
              }}
            />
            <span
              style={{
                marginLeft: "auto",
                fontSize: "0.75rem",
                color: "#555",
                fontFamily: "monospace",
              }}
            >
              about-me.ts
            </span>
          </div>

          {/* Terminal body */}
          <div
            style={{
              padding: "1.5rem",
              fontFamily: "monospace",
              fontSize: "0.82rem",
              lineHeight: 1.9,
            }}
          >
            <div style={{ color: "#6B7280" }}>{"// Developer info"}</div>
            <div>
              <span style={{ color: "#C8B89A" }}>const</span>{" "}
              <span style={{ color: "#E5E7EB" }}>developer</span>{" "}
              <span style={{ color: "#C8B89A" }}>=</span>{" "}
              <span style={{ color: "#9CA3AF" }}>{"{"}</span>
            </div>
            <div style={{ paddingLeft: "1.5rem" }}>
              <span style={{ color: "#6EE7B7" }}>name</span>
              <span style={{ color: "#9CA3AF" }}>:</span>{" "}
              <span style={{ color: "#FCA5A5" }}>&quot;Eti&quot;</span>
              <span style={{ color: "#9CA3AF" }}>,</span>
            </div>
            <div style={{ paddingLeft: "1.5rem" }}>
              <span style={{ color: "#6EE7B7" }}>location</span>
              <span style={{ color: "#9CA3AF" }}>:</span>{" "}
              <span style={{ color: "#FCA5A5" }}>
                &quot;Dhaka, Bangladesh&quot;
              </span>
              <span style={{ color: "#9CA3AF" }}>,</span>
            </div>
            <div style={{ paddingLeft: "1.5rem" }}>
              <span style={{ color: "#6EE7B7" }}>stack</span>
              <span style={{ color: "#9CA3AF" }}>:</span>{" "}
              <span style={{ color: "#9CA3AF" }}>[</span>
              <span style={{ color: "#FCA5A5" }}>&quot;Next.js&quot;</span>
              <span style={{ color: "#9CA3AF" }}>,</span>{" "}
              <span style={{ color: "#FCA5A5" }}>&quot;Node.js&quot;</span>
              <span style={{ color: "#9CA3AF" }}>,</span>{" "}
              <span style={{ color: "#FCA5A5" }}>&quot;MongoDB&quot;</span>
              <span style={{ color: "#9CA3AF" }}>]</span>
              <span style={{ color: "#9CA3AF" }}>,</span>
            </div>
            <div style={{ paddingLeft: "1.5rem" }}>
              <span style={{ color: "#6EE7B7" }}>available</span>
              <span style={{ color: "#9CA3AF" }}>:</span>{" "}
              <span style={{ color: "#C8B89A" }}>true</span>
              <span style={{ color: "#9CA3AF" }}>,</span>
            </div>
            <div style={{ paddingLeft: "1.5rem" }}>
              <span style={{ color: "#6EE7B7" }}>passion</span>
              <span style={{ color: "#9CA3AF" }}>:</span>{" "}
              <span style={{ color: "#FCA5A5" }}>
                &quot;Building great products&quot;
              </span>
            </div>
            <div style={{ color: "#9CA3AF" }}>{"};"}</div>
            <br />
            <div style={{ color: "#6B7280" }}>{"// Let's work together"}</div>
            <div>
              <span style={{ color: "#6EE7B7" }}>console</span>
              <span style={{ color: "#9CA3AF" }}>.</span>
              <span style={{ color: "#6EE7B7" }}>log</span>
              <span style={{ color: "#9CA3AF" }}>(</span>
              <span style={{ color: "#FCA5A5" }}>
                &quot;Ready to build something great?&quot;
              </span>
              <span style={{ color: "#9CA3AF" }}>)</span>
              <span style={{ color: "#9CA3AF" }}>;</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-scroll"
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--muted)",
          cursor: "pointer",
        }}
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <ArrowDown size={14} style={{ animation: "bounce 2s infinite" }} />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .hero-terminal { display: none; }
        }
      `}</style>
    </section>
  );
}
