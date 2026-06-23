"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowDown, GitFork, Globe, ArrowRight } from "lucide-react";

const roles = [
  "Digital Growth Agency",
  "Web Development Studio",
  "AI Automation Partner",
  "Brand Building Experts",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

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
          ".hero-trust",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.2",
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.2",
        );

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
          {/* Eyebrow — social proof signal */}
          <span
            className="hero-eyebrow tag"
            style={{ marginBottom: "1.5rem", display: "inline-flex" }}
          >
            Now accepting new clients for Q3 2026
          </span>

          {/* H1 — SEO primary keyword in the headline */}
          <h1
            className="hero-name"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "var(--fg)",
              marginBottom: "1rem",
            }}
          >
            We grow businesses
            <br />
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
              online.
            </em>
          </h1>

          {/* Typewriter — signals service breadth */}
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
                fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
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

          {/* Description — pain-point focused, keyword rich */}
          <p
            className="hero-description"
            style={{
              fontSize: "1rem",
              color: "var(--muted)",
              lineHeight: 1.85,
              maxWidth: "480px",
              marginBottom: "2rem",
            }}
          >
            Eti Studio is a founder-led digital growth agency. We build
            high-performance web platforms, deploy AI automation that saves your
            team hours every week, and craft brand strategies that attract
            premium clients — all under one roof, without the agency bloat.
          </p>

          {/* Primary CTAs */}
          <div
            className="hero-cta"
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            {/* Primary CTA — highest intent action */}
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
                transition: "background 0.2s ease",
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--fg)")
              }
            >
              Get a Free Strategy Call
              <ArrowRight size={14} />
            </a>

            {/* Secondary CTA — proof before commitment */}
            <a
              href="#projects"
              style={{
                padding: "0.85rem 1.75rem",
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
              See Our Work
            </a>
          </div>

          {/* Trust signals — Khalid Farhan-style micro-proof */}
          <div
            className="hero-trust"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { number: "15+", label: "Businesses grown" },
              { number: "3+", label: "Years in production" },
              { number: "100%", label: "Remote, worldwide" },
            ].map(({ number, label }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.35rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: "var(--fg)",
                  }}
                >
                  {number}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                  {label}
                </span>
              </div>
            ))}

            {/* Social icons */}
            <div style={{ display: "flex", gap: "0.6rem", marginLeft: "auto" }}>
              {[
                {
                  href: "https://github.com/etikona",
                  icon: GitFork,
                  label: "GitHub",
                },
                {
                  href: "https://linkedin.com/in/eti-kona-paul",
                  icon: Globe,
                  label: "LinkedIn",
                },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: "36px",
                    height: "36px",
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
                  <Icon size={15} />
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
              eti-studio.ts
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
            <div style={{ color: "#6B7280" }}>
              {"// Eti Studio — Digital Growth Agency"}
            </div>
            <div>
              <span style={{ color: "#C8B89A" }}>const</span>{" "}
              <span style={{ color: "#E5E7EB" }}>studio</span>{" "}
              <span style={{ color: "#C8B89A" }}>=</span>{" "}
              <span style={{ color: "#9CA3AF" }}>{"{"}</span>
            </div>
            <div style={{ paddingLeft: "1.5rem" }}>
              <span style={{ color: "#6EE7B7" }}>services</span>
              <span style={{ color: "#9CA3AF" }}>:</span>{" "}
              <span style={{ color: "#9CA3AF" }}>[</span>
              <span style={{ color: "#FCA5A5" }}>&quot;Web Dev&quot;</span>
              <span style={{ color: "#9CA3AF" }}>,</span>{" "}
              <span style={{ color: "#FCA5A5" }}>
                &quot;AI Automation&quot;
              </span>
              <span style={{ color: "#9CA3AF" }}>,</span>{" "}
              <span style={{ color: "#FCA5A5" }}>
                &quot;Brand Building&quot;
              </span>
              <span style={{ color: "#9CA3AF" }}>]</span>
              <span style={{ color: "#9CA3AF" }}>,</span>
            </div>
            <div style={{ paddingLeft: "1.5rem" }}>
              <span style={{ color: "#6EE7B7" }}>clients</span>
              <span style={{ color: "#9CA3AF" }}>:</span>{" "}
              <span style={{ color: "#FCA5A5" }}>
                &quot;Founders &amp; Growing Businesses&quot;
              </span>
              <span style={{ color: "#9CA3AF" }}>,</span>
            </div>
            <div style={{ paddingLeft: "1.5rem" }}>
              <span style={{ color: "#6EE7B7" }}>focus</span>
              <span style={{ color: "#9CA3AF" }}>:</span>{" "}
              <span style={{ color: "#FCA5A5" }}>
                &quot;Revenue, not just deliverables&quot;
              </span>
              <span style={{ color: "#9CA3AF" }}>,</span>
            </div>
            <div style={{ paddingLeft: "1.5rem" }}>
              <span style={{ color: "#6EE7B7" }}>status</span>
              <span style={{ color: "#9CA3AF" }}>:</span>{" "}
              <span style={{ color: "#C8B89A" }}>true</span>
              <span style={{ color: "#9CA3AF" }}>,</span>{" "}
              <span style={{ color: "#6B7280" }}>
                {"// accepting new clients"}
              </span>
            </div>
            <div style={{ color: "#9CA3AF" }}>{"};"}</div>
            <br />
            <div style={{ color: "#6B7280" }}>
              {"// What we help you solve"}
            </div>
            {[
              "❌ Slow website losing you customers",
              "❌ Manual tasks eating your team's hours",
              "❌ No brand that commands premium pricing",
              "✅ Eti Studio fixes all three.",
            ].map((line, i) => (
              <div
                key={i}
                style={{
                  color: line.startsWith("✅") ? "#6EE7B7" : "#9CA3AF",
                  fontSize: "0.78rem",
                }}
              >
                {line}
              </div>
            ))}
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
