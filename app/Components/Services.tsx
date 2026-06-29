"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, MousePointerClick, Settings, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    number: "01",
    title: "Custom Real Estate Website Development",
    tagline: "Not a template. A lead generation machine built for your agency.",
    description:
      "We build fully custom real estate websites from scratch using Next.js — the fastest framework available. Property search with advanced filters, map integrations, listing management, mortgage calculators, virtual tour embeds, and a content management system your team can actually use without developer help. Every site is structured for Google from the first line of code.",
    painPoint: "Is your current site losing you enquiries every single day?",
    outcomes: [
      "Property search and advanced filter system",
      "Google-structured SEO from day one",
      "Lead capture forms built to convert, not just collect",
      "CMS so your team can manage listings independently",
      "Mobile-first — the majority of your buyers are on phone",
      "Sub-3 second load time, every page",
    ],
    cta: "Start your real estate website",
    href: "#contact",
  },
  {
    icon: MousePointerClick,
    number: "02",
    title: "Lead Generation & Conversion Optimisation",
    tagline: "Traffic without enquiries is just a vanity metric.",
    description:
      "A beautiful website means nothing if visitors leave without contacting you. We engineer every page around conversion — strategic call-to-action placement, smart enquiry forms that pre-qualify leads, WhatsApp and callback integrations, property alert signup systems, and automated follow-up pipelines that nurture cold leads until they are ready to buy. You get more enquiries from the same traffic.",
    painPoint: "Getting visitors but no enquiries from your property website?",
    outcomes: [
      "Strategic CTA placement on every key page",
      "Smart enquiry forms with pre-qualification fields",
      "WhatsApp and direct call integrations",
      "Property alert and email capture systems",
      "Automated lead nurturing sequences",
      "Heatmap and conversion tracking setup",
    ],
    cta: "Fix your lead conversion",
    href: "#contact",
  },
  {
    icon: Settings,
    number: "03",
    title: "Real Estate SEO & Local Search Visibility",
    tagline: "The best real estate website is the one buyers find on Google.",
    description:
      "We optimise your real estate website to rank for the searches your buyers and sellers are actually making in your local market — whether that is London, Dubai, Sydney, or Auckland. Full technical SEO implementation, property schema markup so your listings appear in rich results, Google Business Profile optimisation, location-targeted content, and ongoing performance monitoring.",
    painPoint:
      "Invisible on Google while competitors take all the organic leads?",
    outcomes: [
      "Local SEO targeting your city and market keywords",
      "Property listing schema for Google rich results",
      "Technical SEO audit and full implementation",
      "Google Business Profile optimisation",
      "Location pages for every area you serve",
      "Monthly performance reporting — rankings and traffic",
    ],
    cta: "Rank in your market",
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
      aria-label="Real Estate Website Development Services"
      style={{
        padding: "8rem 2rem",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
              Everything your real estate
              <br />
              agency needs to win online.
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
              We do not build generic websites. We specialise entirely in real
              estate — which means every feature, every decision, and every line
              of code is built around one outcome: more qualified enquiries for
              your agency, without depending on third-party portals.
            </p>
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
              Discuss your project <ArrowRight size={14} />
            </a>
          </div>
        </div>

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
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                  className="svc-inner"
                >
                  {/* Left */}
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
                      {cta} &rarr;
                    </a>
                  </div>

                  {/* Right */}
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
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        marginBottom: "1rem",
                      }}
                    >
                      What is included
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
                              color: "var(--accent)",
                              fontWeight: 700,
                              flexShrink: 0,
                              marginTop: "1px",
                            }}
                          >
                            &rarr;
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

        {/* Bottom CTA */}
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
            Let&apos;s Talk
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
            Stop losing listings to agencies with better websites.
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
            Book a free 30-minute call. We will review your current website,
            show you exactly what is costing you leads, and give you a clear
            plan to fix it — whether you hire us or not.
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
              Book Free Website Review &rarr;
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
              See Real Estate Projects
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
