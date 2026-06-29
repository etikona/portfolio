"use client";

import Link from "next/link";
import { Globe, X, Mail, ArrowRight } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/logo.png";

const socialLinks = [
  {
    href: "https://linkedin.com/in/eti-kona-paul",
    icon: Globe,
    label: "LinkedIn",
  },
  { href: "https://x.com/etikona", icon: X, label: "X / Twitter" },
  { href: "mailto:etikonapal@gmail.com", icon: Mail, label: "Email" },
];

const footerNav = [
  {
    heading: "Studio",
    links: [
      { href: "/#about", label: "About Us" },
      { href: "/#experience", label: "Track Record" },
      { href: "/#projects", label: "Case Studies" },
      { href: "/#faq", label: "FAQ" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    heading: "Services",
    links: [
      { href: "/#services", label: "Real Estate Website Development" },
      { href: "/#services", label: "Property Lead Generation" },
      { href: "/#services", label: "Real Estate SEO" },
      { href: "/#services", label: "Conversion Optimisation" },
    ],
  },
  {
    heading: "Markets We Serve",
    links: [
      { href: "/#contact", label: "Europe" },
      { href: "/#contact", label: "United Arab Emirates" },
      { href: "/#contact", label: "Australia" },
      { href: "/#contact", label: "New Zealand" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}
    >
      {/* Top CTA strip */}
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "3.5rem 2rem",
          background: "var(--surface)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "0.5rem",
              }}
            >
              Ready to own your leads?
            </p>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 600,
                color: "var(--fg)",
                lineHeight: 1.2,
              }}
            >
              Stop paying portals for leads
              <br />
              that should be yours for free.
            </h3>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 1.75rem",
                background: "var(--fg)",
                color: "var(--bg)",
                textDecoration: "none",
                fontSize: "0.82rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                borderRadius: "2px",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--fg)")
              }
            >
              Get Free Website Audit <ArrowRight size={13} />
            </Link>
            <Link
              href="/#projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.85rem 1.75rem",
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--fg)",
                textDecoration: "none",
                fontSize: "0.82rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
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
              See Our Work
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 2rem 3rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "3.5rem",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                display: "inline-block",
                marginBottom: "1.25rem",
                textDecoration: "none",
              }}
              aria-label="Eti Studio Home"
            >
              <Image
                src={logo}
                alt="Eti Studio logo"
                height={34}
                style={{
                  width: "auto",
                  height: "34px",
                  objectFit: "contain",
                  display: "block",
                }}
                priority
              />
            </Link>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--muted)",
                lineHeight: 1.8,
                marginBottom: "0.75rem",
                maxWidth: "260px",
              }}
            >
              Specialist real estate website development studio. We build custom
              property websites that generate qualified leads for agencies in
              Europe, UAE, Australia, and New Zealand.
            </p>
            <p
              style={{
                fontSize: "0.78rem",
                color: "var(--muted)",
                marginBottom: "1.5rem",
                opacity: 0.7,
              }}
            >
              Based in Dhaka, Bangladesh &mdash; Serving clients worldwide.
            </p>

            <div
              style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
            >
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: "34px",
                    height: "34px",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--muted)",
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

          {/* Nav columns */}
          {footerNav.map(({ heading, links }) => (
            <div key={heading}>
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--fg)",
                  marginBottom: "1.25rem",
                }}
              >
                {heading}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                  padding: 0,
                  margin: 0,
                }}
              >
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--muted)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--fg)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--muted)")
                      }
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
            &copy; {year} Eti Studio. All rights reserved.
          </p>
          <p style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
            Real estate website development &mdash; Europe &middot; UAE &middot;
            Australia &middot; New Zealand
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2.5rem !important; } }
        @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
