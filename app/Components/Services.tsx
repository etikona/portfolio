"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Zap, TrendingUp, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    icon: Code2,
    number: "01",
    title: "Custom Web Development",
    tagline: "Your website should win you clients while you sleep.",
    description:
      "Most business websites are digital brochures. We build growth platforms — custom Next.js web applications engineered for speed, SEO, and conversions. From REST API architecture to pixel-perfect frontends, every line of code is built to turn visitors into paying customers.",
    painPoint: "Losing customers to a slow, outdated site?",
    outcomes: [
      "Pages that load in under 2 seconds",
      "Built to rank on Google from day one",
      "Designed to convert — not just look good",
      "Scalable architecture that grows with you",
    ],
    cta: "Start your web project →",
    href: "#contact",
  },
  {
    icon: Zap,
    number: "02",
    title: "AI Automation & Workflows",
    tagline: "Stop doing manually what a system can do for you.",
    description:
      "Your team is wasting hours on tasks that AI can handle in seconds. We map your biggest operational bottlenecks — lead follow-up, onboarding sequences, content workflows, data processing — and replace them with intelligent automation systems that run 24/7 without you.",
    painPoint: "Team buried in repetitive work that doesn't scale?",
    outcomes: [
      "Automated lead capture and follow-up",
      "AI-powered customer onboarding flows",
      "Custom bots and workflow integrations",
      "Hours saved every week, starting day one",
    ],
    cta: "Automate your business →",
    href: "#contact",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Brand Building & Digital Marketing",
    tagline:
      "The right brand attracts premium clients. The wrong one attracts price shoppers.",
    description:
      "We help ambitious businesses build brands that command authority and attract high-value clients. Brand identity, positioning strategy, content systems, and SEO — designed together so every touchpoint tells the same compelling story and drives inbound demand.",
    painPoint: "Competing on price because no one knows who you are?",
    outcomes: [
      "Brand strategy that positions you as the obvious choice",
      "Visual identity that earns trust on first impression",
      "Content and SEO that generates inbound leads",
      "LinkedIn presence that attracts decision-makers",
    ],
    cta: "Build your brand →",
    href: "#contact",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".svc-header",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ".svc-header", start: "top 82%" },
        },
      );
      gsap.fromTo(
        ".svc-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: ".svc-list", start: "top 80%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Services"
      style={{
        padding: "8rem 2rem",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          className="svc-header"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "end",
            marginBottom: "5rem",
          }}
          id="svc-header-grid"
        >
          <div>
            <span
              className="tag"
              style={{ marginBottom: "1.25rem", display: "inline-flex" }}
            >
              Services
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--fg)",
                lineHeight: 1.2,
              }}
            >
              Three ways we grow
              <br />
              your business online.
            </h2>
          </div>
          <div>
            <p
              style={{
                color: "var(--muted)",
                lineHeight: 1.85,
                fontSize: "0.95rem",
                marginBottom: "1.5rem",
              }}
            >
              Most agencies make you hire three vendors — a web developer, an
              automation consultant, and a marketing agency — then hope they
              coordinate. We do all three under one roof, with one point of
              contact, and a strategy that connects them.
            </p>
            {/* CTA in header — catch skimmers */}
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.82rem",
                color: "var(--fg)",
                textDecoration: "none",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg)")}
            >
              See which service fits you <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Service cards — full-width stacked for detail */}
        <div
          className="svc-list"
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {services.map(
            ({
              icon: Icon,
              number,
              title,
              tagline,
              description,
              painPoint,
              outcomes,
              cta,
              href,
            }) => (
              <div
                key={number}
                className="svc-card"
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  overflow: "hidden",
                  background: "var(--bg)",
                  transition: "border-color 0.25s ease",
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
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0",
                  }}
                  className="svc-inner"
                >
                  {/* Left panel */}
                  <div
                    style={{
                      padding: "2.5rem",
                      borderRight: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginBottom: "1.25rem",
                      }}
                    >
                      <div
                        style={{
                          width: "42px",
                          height: "42px",
                          border: "1px solid var(--border)",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--accent)",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <span
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "1.8rem",
                          fontWeight: 600,
                          color: "var(--border)",
                          lineHeight: 1,
                        }}
                      >
                        {number}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.4rem",
                        fontWeight: 600,
                        color: "var(--fg)",
                        marginBottom: "0.6rem",
                        lineHeight: 1.25,
                      }}
                    >
                      {title}
                    </h3>

                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--accent)",
                        fontStyle: "italic",
                        marginBottom: "1rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {tagline}
                    </p>

                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--muted)",
                        lineHeight: 1.8,
                        marginBottom: "2rem",
                      }}
                    >
                      {description}
                    </p>

                    <a
                      href={href}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.75rem 1.5rem",
                        background: "var(--fg)",
                        color: "var(--bg)",
                        textDecoration: "none",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        borderRadius: "2px",
                        transition: "background 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#333")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "var(--fg)")
                      }
                    >
                      {cta}
                    </a>
                  </div>

                  {/* Right panel — pain point + outcomes */}
                  <div
                    style={{ padding: "2.5rem", background: "var(--surface)" }}
                  >
                    <div
                      style={{
                        padding: "1rem 1.25rem",
                        border: "1px solid var(--border)",
                        borderLeft: "3px solid var(--accent)",
                        borderRadius: "4px",
                        marginBottom: "2rem",
                        background: "var(--bg)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--fg)",
                          fontWeight: 600,
                        }}
                      >
                        {painPoint}
                      </p>
                    </div>

                    <p
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        marginBottom: "1rem",
                      }}
                    >
                      What you get
                    </p>

                    <ul
                      style={{
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.85rem",
                      }}
                    >
                      {outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.75rem",
                            fontSize: "0.88rem",
                            color: "var(--muted)",
                            lineHeight: 1.6,
                          }}
                        >
                          <span
                            style={{
                              width: "18px",
                              height: "18px",
                              borderRadius: "50%",
                              background: "var(--accent)",
                              opacity: 0.15,
                              flexShrink: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              position: "relative",
                              marginTop: "2px",
                            }}
                          >
                            <span
                              style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: "var(--accent)",
                                opacity: 6,
                                position: "absolute",
                              }}
                            />
                          </span>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>

        {/* Bottom CTA — Acquisition.com style "are you a fit" */}
        <div
          style={{
            marginTop: "4rem",
            padding: "3rem",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            background: "var(--bg)",
            textAlign: "center",
          }}
        >
          <span
            className="tag"
            style={{ marginBottom: "1rem", display: "inline-flex" }}
          >
            Let's talk
          </span>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 600,
              color: "var(--fg)",
              marginBottom: "0.75rem",
            }}
          >
            Ready to stop leaving revenue on the table?
          </h3>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.92rem",
              lineHeight: 1.75,
              maxWidth: "520px",
              margin: "0 auto 2rem",
            }}
          >
            Book a free 30-minute strategy call. We'll look at your business,
            identify your biggest growth lever, and show you exactly how we'd
            fix it. No fluff. No sales pitch. Just a clear plan.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#contact"
              style={{
                padding: "0.9rem 2.25rem",
                background: "var(--fg)",
                color: "var(--bg)",
                textDecoration: "none",
                fontSize: "0.85rem",
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
              Book Free Strategy Call →
            </a>
            <a
              href="#projects"
              style={{
                padding: "0.9rem 2.25rem",
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--fg)",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                borderRadius: "2px",
                transition: "border-color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "var(--fg)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "var(--border)")
              }
            >
              See Case Studies
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #svc-header-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .svc-inner { grid-template-columns: 1fr !important; }
          .svc-inner > div:first-child { border-right: none !important; border-bottom: 1px solid var(--border); }
        }
      `}</style>
    </section>
  );
}
