"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  Building2,
  HardHat,
  Briefcase,
  Compass,
  ArrowUpRight,
} from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: Building2,
    title: "Real Estate",
    desc: "Property platforms, developer showcases, and agency sites built to capture and qualify buyer leads.",
    tags: ["Listings", "Lead Capture", "CMS"],
  },
  {
    icon: HardHat,
    title: "Construction",
    desc: "Project portfolios and tender-ready sites that win contractors and developers work before the first call.",
    tags: ["Project Showcase", "Tender Enquiries"],
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    desc: "Authority-building sites for consultancies, finance, and advisory firms that convert visitors into consultations.",
    tags: ["Authority", "Consultations"],
  },
  {
    icon: Compass,
    title: "Architecture & Design",
    desc: "Portfolio-driven sites that let the work speak — fast galleries, considered typography, and a clear enquiry path.",
    tags: ["Portfolio", "Visual Storytelling"],
  },
];

export default function WhoWeBuildFor() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".wbf-header > *",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".wbf-header", start: "top 82%" },
        },
      );

      const cardEls = gsap.utils.toArray<HTMLElement>(".wbf-card");
      cardEls.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, rotateX: -8 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: ".wbf-grid", start: "top 78%" },
          },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        padding: "8rem 2rem",
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          className="wbf-header"
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span
            className="tag"
            style={{ marginBottom: "1.25rem", display: "inline-flex" }}
          >
            Who We Build For
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              color: "var(--fg)",
              marginBottom: "1.25rem",
            }}
          >
            Built for industries where the website{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
              does the selling.
            </em>
          </h2>
          <p
            style={{
              color: "var(--muted)",
              lineHeight: 1.8,
              fontSize: "0.98rem",
              maxWidth: "580px",
              margin: "0 auto",
            }}
          >
            I specialise in industries where trust, presentation, and a clear
            next step directly determine whether a visitor becomes a client.
          </p>
        </div>

        <div
          className="wbf-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
            perspective: "1200px",
          }}
        >
          {cards.map(({ icon: Icon, title, desc, tags }) => (
            <div
              key={title}
              className="wbf-card"
              style={{
                padding: "2rem 1.75rem",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                background: "var(--bg)",
                transition:
                  "transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease",
                transformStyle: "preserve-3d",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-8px) scale(1.02)";
                el.style.boxShadow = "0 20px 50px rgba(0,0,0,0.1)";
                el.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0) scale(1)";
                el.style.boxShadow = "none";
                el.style.borderColor = "var(--border)";
              }}
            >
              <div
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "8px",
                  background: "var(--fg)",
                  color: "var(--bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <Icon size={20} />
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.15rem",
                  fontWeight: 600,
                  color: "var(--fg)",
                  marginBottom: "0.75rem",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--muted)",
                  lineHeight: 1.72,
                  marginBottom: "1.25rem",
                }}
              >
                {desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Fallback CTA for industries not listed */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <p
            style={{
              fontSize: "0.88rem",
              color: "var(--muted)",
              marginBottom: "0.75rem",
            }}
          >
            Don&apos;t see your industry? I still might be a fit.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.82rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--fg)",
              textDecoration: "none",
            }}
          >
            Let&apos;s Talk <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) { .wbf-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .wbf-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
