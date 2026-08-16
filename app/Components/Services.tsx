"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  RefreshCw,
  TrendingUp,
  Search,
  Target,
  Settings,
  Code2,
} from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    title: "Website Design & Development",
    desc: "Custom-built websites from the ground up — designed around your customer's decision-making process, not a template.",
  },
  {
    icon: RefreshCw,
    title: "Website Redesign",
    desc: "A modern, fast rebuild of your existing site — without losing the search rankings you've already earned.",
  },
  {
    icon: TrendingUp,
    title: "Conversion Optimization",
    desc: "Structured page layouts, clear calls to action, and messaging that moves visitors toward contacting you.",
  },
  {
    icon: Search,
    title: "Technical SEO",
    desc: "The technical foundation that gets you found — site speed, structured data, indexing, and on-page fundamentals.",
  },
  {
    icon: Target,
    title: "Lead Generation Systems",
    desc: "Landing pages, forms, and funnels engineered specifically to turn traffic into qualified enquiries.",
  },
  {
    icon: Settings,
    title: "CRM & Automation",
    desc: "Custom dashboards and automated workflows so leads are captured, tracked, and followed up — automatically.",
  },
  {
    icon: Code2,
    title: "Custom Web Applications",
    desc: "Bespoke tools and internal platforms built around how your business actually operates.",
  },
];

export default function WhatWeDo() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".wwd-header > *",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".wwd-header", start: "top 82%" },
        },
      );
      gsap.fromTo(
        ".wwd-card",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".wwd-grid", start: "top 80%" },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section style={{ padding: "8rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          className="wwd-header"
          style={{ marginBottom: "3.5rem", maxWidth: "640px" }}
        >
          <span
            className="tag"
            style={{ marginBottom: "1.25rem", display: "inline-flex" }}
          >
            What We Do
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
              color: "var(--fg)",
              marginBottom: "1.25rem",
            }}
          >
            Everything your website needs to actually{" "}
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
              work.
            </em>
          </h2>
          <p
            style={{
              color: "var(--muted)",
              lineHeight: 1.8,
              fontSize: "0.95rem",
            }}
          >
            Design, development, SEO, and the systems behind lead generation —
            handled end-to-end by one person who understands how they all fit
            together.
          </p>
        </div>

        <div
          className="wwd-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          {services.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="wwd-card"
              style={{
                padding: "2rem 1.75rem",
                background: "var(--bg)",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background =
                  "var(--surface)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background =
                  "var(--bg)")
              }
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  color: "var(--accent)",
                }}
              >
                <Icon size={18} />
              </div>
              <h3
                style={{
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  color: "var(--fg)",
                  marginBottom: "0.65rem",
                  lineHeight: 1.35,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "var(--muted)",
                  lineHeight: 1.72,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) { .wwd-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .wwd-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
