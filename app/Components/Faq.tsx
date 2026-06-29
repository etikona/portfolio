"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    category: "About Our Work",
    question: "Do you only build websites for real estate agencies?",
    answer:
      "Yes — entirely. We focus exclusively on real estate website development for property agencies, brokers, and developers. This is not a general web agency that takes any project that comes through the door. Every feature we build, every SEO decision we make, and every lead capture system we design is purpose-built for the property market. That focus is why our clients get results that generalist agencies cannot match.",
  },
  {
    category: "About Our Work",
    question: "Which countries do you work with?",
    answer:
      "We work with real estate agencies in Europe (UK, Germany, France, Netherlands, Spain, Portugal, and more), the UAE (Dubai, Abu Dhabi, and the wider GCC), Australia, and New Zealand. All work is done remotely. We understand the property market dynamics, lead behaviour, and search intent in each of these markets — which directly informs how we build and optimise every site we deliver.",
  },
  {
    category: "About Our Work",
    question:
      "Why do real estate agencies need a custom website rather than a template?",
    answer:
      "Template property websites are built for the average agency — which means they are average at generating leads. They load slowly, rank poorly, use generic lead forms that filter nothing, and look identical to every competitor. A custom-built real estate website is engineered around your specific market, your listings, and the exact search terms your buyers are using in your city. It is the difference between a digital brochure and a lead generation machine.",
  },
  {
    category: "Lead Generation",
    question: "How does a website actually generate real estate leads?",
    answer:
      "Through three connected systems working together. First, SEO — your site ranks on Google for the exact terms buyers and sellers search in your market, so they find you before they find your competitors. Second, conversion design — every page is built with strategic call-to-action placement, smart enquiry forms, and psychological triggers that turn visitors into enquiries. Third, nurturing — automated follow-up sequences keep your agency top of mind for leads that are not ready to act today but will be in 30, 60, or 90 days.",
  },
  {
    category: "Lead Generation",
    question: "How long before the website starts generating leads?",
    answer:
      "Conversion improvements are immediate — from the day your new site goes live, your enquiry rate should increase versus your old site. SEO results take longer: you can expect to see meaningful organic ranking improvements within 60 to 90 days, with compounding growth from there. In markets like Dubai where paid search dominates, we also advise on how to combine your new site with Google Ads for immediate lead volume while organic rankings build.",
  },
  {
    category: "Lead Generation",
    question:
      "Can you integrate the website with our CRM or property management system?",
    answer:
      "Yes. We build direct integrations with major real estate CRMs and can connect your website lead forms to any system that has an API — including HubSpot, Salesforce, Zoho, Rex, AgentBox, and custom pipelines. Every lead captured on your website routes automatically to your team with the right data: property interest, budget range, timeline, and contact details.",
  },
  {
    category: "Investment & Process",
    question: "How much does a real estate website cost?",
    answer:
      "Our real estate websites start from $3,000 USD for a conversion-focused agency site and range upward depending on the number of listings, custom features, integrations, and ongoing SEO scope. The relevant comparison is not what the website costs — it is what a single closed property deal is worth to your agency. In most markets we serve, one additional deal from organic leads pays for the entire website within the first 60 days. Book a free call and we will scope your project within 48 hours.",
  },
  {
    category: "Investment & Process",
    question: "How long does it take to build a real estate website?",
    answer:
      "A standard real estate agency website with property listings, lead capture, and CMS takes 6 to 8 weeks from sign-off to launch. A full platform with advanced search, admin dashboard, CRM integration, and custom features typically takes 10 to 12 weeks. We scope every project with a fixed timeline before you commit. We do not miss deadlines.",
  },
  {
    category: "Investment & Process",
    question: "What does the process look like from first contact to go-live?",
    answer:
      "Week 0: Free 30-minute strategy call where we audit your current site and identify your biggest lead generation gaps. Week 1: If we are a good fit, we send a clear proposal — scope, timeline, investment. No surprises. Weeks 2 to 3: Discovery and architecture — understanding your market, listings, and target buyer. Weeks 4 to 9: Design and development. Weeks 10 to 11: Your review, revisions, and content loading. Week 12: Launch. You then have 30 days of post-launch support included at no additional cost.",
  },
  {
    category: "Investment & Process",
    question: "Do you offer ongoing support after the website launches?",
    answer:
      "Yes. We offer monthly support retainers covering performance monitoring, SEO optimisation, content publishing support, new feature additions, and technical maintenance. Many of our clients stay with us on a retainer because a real estate website is not a one-time project — it is an asset that needs to be actively optimised as your market changes and your listing volume grows.",
  },
  {
    category: "SEO & Rankings",
    question:
      "Can you help our agency rank on Google for property searches in our city?",
    answer:
      "Local SEO for real estate is built into every website we deliver — it is not an add-on. We target the exact search terms buyers and sellers use in your market: city-level property searches, neighbourhood-specific queries, property type searches, and long-tail investment terms. We implement property schema markup so your listings appear in Google rich results, optimise your Google Business Profile, and build location pages for every area you serve.",
  },
  {
    category: "SEO & Rankings",
    question:
      "We already list on Rightmove, REA, or Property Finder. Why do we need our own website?",
    answer:
      "Portal listings are rented visibility — expensive, shared with every competitor, and owned by someone else. Every lead that comes through a portal belongs to the portal, not you. Your own website is an owned asset that generates leads for free, builds your brand, and compounds in value over time. The agencies winning in every market we serve use portals for volume and their own website for brand, quality leads, and long-term independence.",
  },
];

const categories = Array.from(new Set(faqs.map((f) => f.category)));

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All");

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

  useEffect(() => {
    setOpenIndex(0);
    gsap.fromTo(
      ".faq-item",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: "power2.out" },
    );
  }, [activeCategory]);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const renderColumn = (items: typeof filteredFaqs, indexOffset: number) => (
    <div
      style={{
        borderRight: indexOffset === 0 ? "1px solid var(--border)" : "none",
      }}
    >
      {items.map((faq, colIndex) => {
        const globalIndex = colIndex * 2 + indexOffset;
        const isOpen = openIndex === globalIndex;
        const padStyle =
          indexOffset === 0
            ? { btn: "1.75rem 2rem 1.75rem 0", ans: "0 2rem 1.75rem 0" }
            : { btn: "1.75rem 0 1.75rem 2rem", ans: "0 0 1.75rem 2rem" };
        return (
          <div
            key={globalIndex}
            className="faq-item"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <button
              onClick={() => toggle(globalIndex)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                padding: padStyle.btn,
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
                  border: `1px solid ${isOpen ? "var(--accent)" : "var(--border)"}`,
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isOpen ? "var(--accent)" : "var(--muted)",
                  flexShrink: 0,
                  marginTop: "2px",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                }}
              >
                {isOpen ? <Minus size={14} /> : <Plus size={14} />}
              </span>
            </button>
            <div
              style={{
                maxHeight: isOpen ? "500px" : "0",
                overflow: "hidden",
                transition: "max-height 0.4s ease",
              }}
            >
              <p
                style={{
                  padding: padStyle.ans,
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
  );

  const leftItems = filteredFaqs.filter((_, i) => i % 2 === 0);
  const rightItems = filteredFaqs.filter((_, i) => i % 2 !== 0);

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-label="Real Estate Website Development FAQ"
      style={{
        padding: "8rem 2rem",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
              Questions real estate
              <br />
              agencies ask us first.
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
              Honest answers to the questions every property agency should ask
              before investing in a new website. If you do not find what you are
              looking for, reach out directly — we respond within one business
              day.
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

        {/* Filter tabs */}
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

        {/* Two column accordion */}
        <div
          className="faq-list"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
          id="faq-grid"
        >
          {renderColumn(leftItems, 0)}
          {renderColumn(rightItems, 1)}
        </div>

        {/* Bottom CTA */}
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
            The fastest way to know if we are right
            <br />
            for your agency is a 30-minute call.
          </h3>
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.92rem",
              lineHeight: 1.8,
              maxWidth: "500px",
              margin: "0 auto 2.5rem",
            }}
          >
            We will audit your current website live on the call — speed, SEO,
            lead capture, mobile performance — and show you exactly what is
            costing you enquiries. Free, no obligation, and you leave with a
            clear picture of what to fix.
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
              Book Free Website Audit <ArrowRight size={14} />
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
              See Our Services
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #faq-header-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          #faq-grid { grid-template-columns: 1fr !important; }
          #faq-grid > div:first-child { border-right: none !important; }
          .faq-item button, .faq-item p { padding-left: 0 !important; padding-right: 0 !important; }
        }
      `}</style>
    </section>
  );
}
