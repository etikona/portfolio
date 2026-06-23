"use client";

import Link from "next/link";
import { Globe, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/logo.png";

const socialLinks = [
  {
    href: "https://linkedin.com/in/eti-kona-paul",
    icon: Globe,
    label: "LinkedIn",
  },
  { href: "https://x.com/etikona", icon: X, label: "X / Twitter" },
];

const footerNav = [
  {
    heading: "Studio",
    links: [
      { href: "/#about", label: "About" },
      { href: "/#experience", label: "Track Record" },
      { href: "/#projects", label: "Case Studies" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    heading: "Services",
    links: [
      { href: "/#services", label: "Web Development" },
      { href: "/#services", label: "AI Automation" },
      { href: "/#services", label: "Brand Building" },
      { href: "/#services", label: "Growth & Performance" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/#contact", label: "Contact" },
      {
        href: "https://linkedin.com/in/eti-kona-paul",
        label: "LinkedIn",
        external: true,
      },
      {
        href: "mailto:etikonapaul@gmail.com",
        label: "Email Us",
        value: "etikonapaul@email.com",
        external: true,
      },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg)",
      }}
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
              Ready to grow?
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
              Let's build something that works
              <br />
              for your business.
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
              Book Free Strategy Call <ArrowRight size={13} />
            </Link>
            <Link
              href="/#services"
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
              Explore Services
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer body */}
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
          {/* Brand column */}
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
                marginBottom: "1.5rem",
                maxWidth: "260px",
              }}
            >
              A founder-led digital growth agency building web platforms, AI
              automation systems, and brands that attract premium clients.
            </p>

            {/* Social icons */}
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
                {links.map(({ href, label, external, value }) => (
                  <li key={label}>
                    {external ? (
                      <a
                        href={href}
                        target={
                          href.startsWith("mailto") ? undefined : "_blank"
                        }
                        rel="noopener noreferrer"
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

                        {/* ✅ SHOW EMAIL VALUE IN UI */}
                        {value && (
                          <div
                            style={{
                              fontSize: "0.75rem",
                              marginTop: "0.25rem",
                              color: "var(--muted)",
                              opacity: 0.8,
                            }}
                          >
                            {value}
                          </div>
                        )}
                      </a>
                    ) : (
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

                        {/* (optional safety for Link-based items) */}
                        {value && (
                          <div
                            style={{
                              fontSize: "0.75rem",
                              marginTop: "0.25rem",
                              color: "var(--muted)",
                              opacity: 0.8,
                            }}
                          >
                            {value}
                          </div>
                        )}
                      </Link>
                    )}
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
            Dhaka, Bangladesh &mdash; Serving clients worldwide.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
