"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Zap, Shield, RefreshCw } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    icon: Layers,
    title: "Full-Stack Development",
    description:
      "End-to-end web application development — from database schema and REST API design through to polished, responsive frontends. I own the full stack.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Diagnosing and resolving performance bottlenecks: Core Web Vitals, bundle analysis, database query optimization, and caching strategies.",
  },
  {
    icon: Shield,
    title: "API Architecture",
    description:
      "Designing and building RESTful APIs with authentication, authorization, rate limiting, validation, and comprehensive error handling built in from day one.",
  },
  {
    icon: RefreshCw,
    title: "Deployment & DevOps",
    description:
      "Setting up production deployments on Render and Vercel, configuring CI/CD pipelines, environment management, and monitoring.",
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
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".svc-grid", start: "top 80%" },
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
        <div
          className="svc-header"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "end",
            marginBottom: "4rem",
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
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--fg)",
              }}
            >
              What I can do for you
            </h2>
          </div>
          <p
            style={{
              color: "var(--muted)",
              lineHeight: 1.8,
              fontSize: "0.95rem",
            }}
          >
            I work with startups and businesses to design, build, and ship web
            products. Whether you need a complete platform or a specific
            technical problem solved, I bring architecture thinking and hands-on
            execution together.
          </p>
        </div>

        <div
          className="svc-grid"
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
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="svc-card"
              style={{
                padding: "2rem",
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
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "var(--fg)",
                  marginBottom: "0.75rem",
                  lineHeight: 1.3,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontSize: "0.83rem",
                  color: "var(--muted)",
                  lineHeight: 1.75,
                }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #svc-header-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .svc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .svc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
