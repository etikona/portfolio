"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    category: "Working With Us",
    question: "Who is Eti Studio for?",
    answer:
      "We work with founders, business owners, and companies that are serious about growing online. Our clients are typically at an inflection point — they've validated their business, they know they need a better digital presence, and they're ready to invest in building the right systems. If you're looking for the cheapest option, we're probably not the right fit. If you want a strategic partner who takes ownership of results, let's talk.",
  },
  {
    category: "Working With Us",
    question: "What makes Eti Studio different from a regular web agency?",
    answer:
      "Most agencies hand you a website and disappear. We build digital growth systems — web platforms engineered to rank and convert, AI automation that removes operational bottlenecks, and brand strategy that attracts premium clients. Everything is connected. We're also founder-led: you work directly with us, not a project manager passing work to junior developers. One point of contact. Full accountability.",
  },
  {
    category: "Working With Us",
    question: "Do you only work with businesses in Bangladesh?",
    answer:
      "No. We're based in Dhaka but work with clients worldwide — primarily in Europe, North America, and the Middle East. All our work is done remotely. Geography has never been a barrier to delivering great results.",
  },
  {
    category: "Services",
    question: "What services does Eti Studio offer?",
    answer:
      "We offer three integrated services: custom web development (Next.js, Node.js, REST APIs), AI automation and workflow systems, and brand building with digital marketing. We deliberately keep our scope focused so we can go deep on what actually drives growth — not spread ourselves thin across every trend.",
  },
  {
    category: "Services",
    question: "I just need a website. Can you help?",
    answer:
      "Yes — but we'll push you to think bigger than 'just a website'. A website without SEO is invisible. A website without conversion design generates no leads. A website without a content strategy has no long-term value. We build web platforms that are engineered to actually work for your business. If you want a brochure site with no strategic thinking, we're not the right partner.",
  },
  {
    category: "Services",
    question: "What is AI automation and how can it help my business?",
    answer:
      "AI automation means replacing manual, repetitive tasks with intelligent systems that run 24/7. Common examples: automated lead follow-up sequences so no enquiry goes cold, AI-assisted content workflows that reduce production time by 80%, customer onboarding systems that activate new clients without your team lifting a finger, and data processing pipelines that eliminate hours of manual reporting. We map your workflow, identify where you're losing time or revenue, and build the system that fixes it.",
  },
  {
    category: "Services",
    question: "When will brand building and marketing services be available?",
    answer:
      "Brand building and digital marketing services are launching within the next three months. If you're interested, reach out now — we're selectively onboarding early clients at a reduced rate in exchange for case study rights. These spots are limited.",
  },
  {
    category: "Process & Timeline",
    question: "What does the process look like from first call to launch?",
    answer:
      "We start with a free 30-minute strategy call to understand your business, goals, and biggest constraints. If we're a fit, we send a clear proposal: scope, timeline, and investment — no surprises. From there: discovery and architecture (1 week), design and development (4–8 weeks depending on scope), review and revision (1 week), and launch. Most projects are live within 6–10 weeks. You have a direct line to us throughout.",
  },
  {
    category: "Process & Timeline",
    question: "How long does a custom web application take to build?",
    answer:
      "A standard business website or landing page takes 2–3 weeks. A full web application with custom backend, admin dashboard, and integrations typically takes 6–12 weeks. We scope every project clearly before we start — you'll know the timeline before you commit. We don't pad timelines and we don't miss them.",
  },
  {
    category: "Investment",
    question: "How much does it cost to work with Eti Studio?",
    answer:
      "Pricing depends on scope, complexity, and the specific services involved. We don't publish fixed prices because every business has different needs — a 5-page marketing site is a very different project from a custom SaaS platform. What we can tell you: our pricing reflects the quality and accountability of the work, not the cheapest possible execution. Book a free call and we'll give you a clear number within 48 hours.",
  },
  {
    category: "Investment",
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes. We offer ongoing support and growth retainers for clients who want a continuous partner — monitoring, performance optimisation, content updates, feature additions, and strategic input as your business evolves. We also offer a 30-day post-launch support window on all projects at no additional cost.",
  },
  {
    category: "Investment",
    question: "Can I start with a small project and grow from there?",
    answer:
      "Absolutely. Many of our best client relationships started with a focused scope — a fast website, a single automation system, or a brand audit — and expanded as we proved results. We'd rather earn your trust on a smaller project than oversell you on a large one. Start where you're ready.",
  },
];

const categories = Array.from(new Set(faqs.map((f) => f.category)));

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const allCategories = ["All", ...categories];

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-header",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ".faq-header", start: "top 82%" },
        },
      );
      gsap.fromTo(
        ".faq-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: ".faq-list", start: "top 80%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Re-animate when filter changes
  useEffect(() => {
    setOpenIndex(0);
    gsap.fromTo(
      ".faq-item",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: "power2.out" },
    );
  }, [activeCategory]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-label="Frequently Asked Questions"
      style={{
        padding: "8rem 2rem",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          className="faq-header"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "end",
            marginBottom: "4rem",
          }}
          id="faq-header-grid"
        >
          <div>
            <span
              className="tag"
              style={{ marginBottom: "1.25rem", display: "inline-flex" }}
            >
              FAQ
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
              Questions businesses
              <br />
              ask before they hire us.
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
              We believe in full transparency before any commitment. Below are
              the questions every serious business owner should ask a digital
              agency — and our honest answers. If you don't find what you're
              looking for, reach out directly.
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
              Ask us directly <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Category filter tabs */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
            borderBottom: "1px solid var(--border)",
            paddingBottom: "1.5rem",
          }}
        >
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "0.5rem 1.1rem",
                border: "1px solid",
                borderColor:
                  activeCategory === cat ? "var(--fg)" : "var(--border)",
                background:
                  activeCategory === cat ? "var(--fg)" : "transparent",
                color: activeCategory === cat ? "var(--bg)" : "var(--muted)",
                borderRadius: "2px",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "var(--fg)";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--fg)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "var(--border)";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--muted)";
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ accordion */}
        <div
          className="faq-list"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0",
          }}
          id="faq-grid"
        >
          {/* Left column */}
          <div style={{ borderRight: "1px solid var(--border)" }}>
            {filteredFaqs
              .filter((_, i) => i % 2 === 0)
              .map((faq, colIndex) => {
                const globalIndex = colIndex * 2;
                const isOpen = openIndex === globalIndex;
                return (
                  <div
                    key={globalIndex}
                    className="faq-item"
                    style={{
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <button
                      onClick={() => toggle(globalIndex)}
                      aria-expanded={isOpen}
                      style={{
                        width: "100%",
                        padding: "1.75rem 2rem 1.75rem 0",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "1rem",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: "0.67rem",
                            fontWeight: 700,
                            letterSpacing: "0.09em",
                            textTransform: "uppercase",
                            color: "var(--accent)",
                            display: "block",
                            marginBottom: "0.4rem",
                          }}
                        >
                          {faq.category}
                        </span>
                        <span
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            color: "var(--fg)",
                            lineHeight: 1.45,
                          }}
                        >
                          {faq.question}
                        </span>
                      </div>
                      <span
                        style={{
                          width: "28px",
                          height: "28px",
                          border: "1px solid var(--border)",
                          borderRadius: "2px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: isOpen ? "var(--accent)" : "var(--muted)",
                          flexShrink: 0,
                          marginTop: "2px",
                          transition: "color 0.2s ease, border-color 0.2s ease",
                          borderColor: isOpen
                            ? "var(--accent)"
                            : "var(--border)",
                        }}
                      >
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </span>
                    </button>

                    <div
                      style={{
                        maxHeight: isOpen ? "400px" : "0",
                        overflow: "hidden",
                        transition: "max-height 0.4s ease",
                      }}
                    >
                      <p
                        style={{
                          padding: "0 2rem 1.75rem 0",
                          fontSize: "0.88rem",
                          color: "var(--muted)",
                          lineHeight: 1.85,
                        }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Right column */}
          <div>
            {filteredFaqs
              .filter((_, i) => i % 2 !== 0)
              .map((faq, colIndex) => {
                const globalIndex = colIndex * 2 + 1;
                const isOpen = openIndex === globalIndex;
                return (
                  <div
                    key={globalIndex}
                    className="faq-item"
                    style={{
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <button
                      onClick={() => toggle(globalIndex)}
                      aria-expanded={isOpen}
                      style={{
                        width: "100%",
                        padding: "1.75rem 0 1.75rem 2rem",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "1rem",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: "0.67rem",
                            fontWeight: 700,
                            letterSpacing: "0.09em",
                            textTransform: "uppercase",
                            color: "var(--accent)",
                            display: "block",
                            marginBottom: "0.4rem",
                          }}
                        >
                          {faq.category}
                        </span>
                        <span
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: 600,
                            color: "var(--fg)",
                            lineHeight: 1.45,
                          }}
                        >
                          {faq.question}
                        </span>
                      </div>
                      <span
                        style={{
                          width: "28px",
                          height: "28px",
                          border: "1px solid var(--border)",
                          borderRadius: "2px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: isOpen ? "var(--accent)" : "var(--muted)",
                          flexShrink: 0,
                          marginTop: "2px",
                          transition: "color 0.2s ease, border-color 0.2s ease",
                          borderColor: isOpen
                            ? "var(--accent)"
                            : "var(--border)",
                        }}
                      >
                        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                      </span>
                    </button>

                    <div
                      style={{
                        maxHeight: isOpen ? "400px" : "0",
                        overflow: "hidden",
                        transition: "max-height 0.4s ease",
                      }}
                    >
                      <p
                        style={{
                          padding: "0 0 1.75rem 2rem",
                          fontSize: "0.88rem",
                          color: "var(--muted)",
                          lineHeight: 1.85,
                        }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Bottom CTA — Acquisition.com style close */}
        <div
          style={{
            marginTop: "5rem",
            padding: "3.5rem",
            border: "1px solid var(--border)",
            borderRadius: "6px",
            background: "var(--surface)",
            textAlign: "center",
          }}
        >
          <span
            className="tag"
            style={{ marginBottom: "1.25rem", display: "inline-flex" }}
          >
            Still have questions?
          </span>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 600,
              color: "var(--fg)",
              marginBottom: "0.85rem",
              lineHeight: 1.2,
            }}
          >
            The fastest way to know if we're a fit
            <br />
            is a 30-minute call.
          </h3>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.92rem",
              lineHeight: 1.8,
              maxWidth: "480px",
              margin: "0 auto 2.5rem",
            }}
          >
            No pitch deck. No pressure. We'll look at your business, tell you
            honestly what we think the biggest opportunity is, and show you what
            we'd do about it. You leave with a clear plan — whether you hire us
            or not.
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
                padding: "0.95rem 2.5rem",
                background: "var(--fg)",
                color: "var(--bg)",
                textDecoration: "none",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                borderRadius: "2px",
                transition: "background 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--fg)")
              }
            >
              Book Free Strategy Call <ArrowRight size={14} />
            </a>
            <a
              href="#services"
              style={{
                padding: "0.95rem 2.5rem",
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
              Explore Our Services
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #faq-header-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          #faq-grid { grid-template-columns: 1fr !important; }
          #faq-grid > div:first-child { border-right: none !important; }
          .faq-item button { padding-left: 0 !important; padding-right: 0 !important; }
          .faq-item p { padding-left: 0 !important; padding-right: 0 !important; }
        }
      `}</style>
    </section>
  );
}
