"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowDown, ArrowRight, CheckCircle2 } from "lucide-react";

const industries = [
  "Real Estate",
  "Professional Services",
  "Law Firms",
  "Contractors",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [industryIndex, setIndustryIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const current = industries[industryIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < current.length) {
      timeout = setTimeout(
        () => setDisplayedText(current.slice(0, displayedText.length + 1)),
        70,
      );
    } else if (!isDeleting && displayedText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(
        () => setDisplayedText(displayedText.slice(0, -1)),
        40,
      );
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setIndustryIndex((i) => (i + 1) % industries.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, industryIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      )
        .fromTo(
          ".hero-headline",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.35",
        )
        .fromTo(
          ".hero-proof",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
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
        paddingTop: "88px",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "4rem",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
        className="hero-grid"
      >
        {/* Left column */}
        <div>
          <span
            className="hero-eyebrow tag"
            style={{ marginBottom: "1.5rem", display: "inline-flex" }}
          >
            Website Design & Development Agency
          </span>

          <h1
            className="hero-headline"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.4rem, 5.2vw, 4.2rem)",
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              color: "var(--fg)",
              marginBottom: "1.5rem",
            }}
          >
            Websites that turn visitors into{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
              customers.
            </em>
          </h1>

          <div className="hero-sub" style={{ marginBottom: "1.75rem" }}>
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--muted)",
                lineHeight: 1.8,
                maxWidth: "520px",
                marginBottom: "0.75rem",
              }}
            >
              Conversion-focused websites built for{" "}
              <span style={{ color: "var(--fg)", fontWeight: 600 }}>
                {displayedText}
                <span
                  style={{
                    display: "inline-block",
                    width: "2px",
                    height: "1em",
                    background: "var(--accent)",
                    marginLeft: "2px",
                    verticalAlign: "middle",
                    opacity: cursor ? 1 : 0,
                  }}
                />
              </span>{" "}
              businesses whose website has to bring in real work, not just look
              nice.
            </p>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--muted)",
                lineHeight: 1.8,
                maxWidth: "500px",
              }}
            >
              I design, build, and optimize websites end-to-end no templates, no
              handoffs, no agency layers. Just a site engineered to convert your
              traffic into enquiries.
            </p>
          </div>

          {/* Proof points */}
          <div
            className="hero-proof"
            style={{
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
              marginBottom: "2.25rem",
            }}
          >
            {[
              "Founder-led, start to finish",
              "Built for lead generation",
              "Fast, SEO-ready & mobile-first",
            ].map((point) => (
              <div
                key={point}
                style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                <CheckCircle2
                  size={14}
                  style={{ color: "var(--accent)", flexShrink: 0 }}
                />
                <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
                  {point}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
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
              href="/contact"
              style={{
                padding: "0.85rem 1.85rem",
                background: "var(--fg)",
                color: "var(--bg)",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                transition: "background 0.2s ease",
                borderRadius: "3px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--fg)")
              }
            >
              Get a Free Website Audit <ArrowRight size={14} />
            </a>
            <a
              href="#case-study"
              style={{
                padding: "0.85rem 1.85rem",
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--fg)",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                transition: "border-color 0.2s ease, background 0.2s ease",
                borderRadius: "3px",
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
              See a Real Result
            </a>
          </div>
        </div>

        {/* Right column — terminal card */}
        <div
          ref={terminalRef}
          className="hero-terminal"
          style={{
            background: "var(--dark-bg)",
            border: "1px solid var(--dark-border)",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 40px 80px rgba(0,0,0,0.15)",
          }}
        >
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
              results.ts
            </span>
          </div>

          <div
            style={{
              padding: "1.5rem",
              fontFamily: "monospace",
              fontSize: "0.82rem",
              lineHeight: 1.9,
            }}
          >
            <div style={{ color: "#6B7280" }}>
              {"// What a converting website does"}
            </div>
            <div>
              <span style={{ color: "#C8B89A" }}>const</span>{" "}
              <span style={{ color: "#E5E7EB" }}>website</span>{" "}
              <span style={{ color: "#C8B89A" }}>=</span>{" "}
              <span style={{ color: "#9CA3AF" }}>{"{"}</span>
            </div>
            <div style={{ paddingLeft: "1.5rem" }}>
              <span style={{ color: "#6EE7B7" }}>loadsIn</span>
              <span style={{ color: "#9CA3AF" }}>:</span>{" "}
              <span style={{ color: "#FCA5A5" }}>&quot;under 2s&quot;</span>
              <span style={{ color: "#9CA3AF" }}>,</span>
            </div>
            <div style={{ paddingLeft: "1.5rem" }}>
              <span style={{ color: "#6EE7B7" }}>rankOnGoogle</span>
              <span style={{ color: "#9CA3AF" }}>:</span>{" "}
              <span style={{ color: "#C8B89A" }}>true</span>
              <span style={{ color: "#9CA3AF" }}>,</span>
            </div>
            <div style={{ paddingLeft: "1.5rem" }}>
              <span style={{ color: "#6EE7B7" }}>capturesLeads</span>
              <span style={{ color: "#9CA3AF" }}>:</span>{" "}
              <span style={{ color: "#C8B89A" }}>true</span>
              <span style={{ color: "#9CA3AF" }}>,</span>
            </div>
            <div style={{ paddingLeft: "1.5rem" }}>
              <span style={{ color: "#6EE7B7" }}>industries</span>
              <span style={{ color: "#9CA3AF" }}>:</span>{" "}
              <span style={{ color: "#9CA3AF" }}>[</span>
              <br />
              <span style={{ paddingLeft: "1.5rem", display: "inline-block" }}>
                <span style={{ color: "#FCA5A5" }}>
                  &quot;Real Estate&quot;
                </span>
                <span style={{ color: "#9CA3AF" }}>,</span>{" "}
                <span style={{ color: "#FCA5A5" }}>&quot;Law Firms&quot;</span>
                <span style={{ color: "#9CA3AF" }}>,</span>
              </span>
              <br />
              <span style={{ paddingLeft: "1.5rem", display: "inline-block" }}>
                <span style={{ color: "#FCA5A5" }}>
                  &quot;Contractors&quot;
                </span>
                <span style={{ color: "#9CA3AF" }}>,</span>{" "}
                <span style={{ color: "#FCA5A5" }}>
                  &quot;Professional Services&quot;
                </span>
              </span>
              <br />
              <span style={{ color: "#9CA3AF" }}>]</span>
              <span style={{ color: "#9CA3AF" }}>,</span>
            </div>
            <div style={{ paddingLeft: "1.5rem" }}>
              <span style={{ color: "#6EE7B7" }}>justLooksGood</span>
              <span style={{ color: "#9CA3AF" }}>:</span>{" "}
              <span style={{ color: "#C8B89A" }}>false</span>
            </div>
            <div style={{ color: "#9CA3AF" }}>{"};"}</div>
            <br />
            <div style={{ color: "#6B7280" }}>{"// Let's build yours"}</div>
            <div>
              <span style={{ color: "#6EE7B7" }}>console</span>
              <span style={{ color: "#9CA3AF" }}>.</span>
              <span style={{ color: "#6EE7B7" }}>log</span>
              <span style={{ color: "#9CA3AF" }}>(</span>
              <span style={{ color: "#FCA5A5" }}>
                &quot;Ready when you are.&quot;
              </span>
              <span style={{ color: "#9CA3AF" }}>)</span>
              <span style={{ color: "#9CA3AF" }}>;</span>
            </div>
          </div>
        </div>
      </div>

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
          document.getElementById("why")?.scrollIntoView({ behavior: "smooth" })
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
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .hero-terminal { display: none; }
        }
      `}</style>
    </section>
  );
}
