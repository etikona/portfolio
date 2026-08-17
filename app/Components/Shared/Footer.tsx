"use client";

import Link from "next/link";
import { X, Mail, Globe } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/logo.png";

const footerLinks = {
  Services: [
    {
      label: "Website Design & Development",
      href: "/services/website-design-development",
    },
    { label: "Website Redesign", href: "/services/website-redesign" },
    { label: "SEO Foundation", href: "/services/seo-foundation" },
    {
      label: "Custom Web Applications",
      href: "/services/custom-web-applications",
    },
    {
      label: "Lead Generation & Conversion",
      href: "/services/lead-generation-conversion",
    },
    { label: "CRM & Automation", href: "/services/crm-automation" },
  ],
  Industries: [
    { label: "Real Estate", href: "/industries/real-estate" },
    {
      label: "Construction & Contractors",
      href: "/industries/construction-contractors",
    },
    { label: "Law Firms", href: "/industries/law-firms" },
    {
      label: "Professional Services",
      href: "/industries/professional-services",
    },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

const socialLinks = [
  { href: "https://github.com/yourusername", icon: Globe, label: "GitHub" },
  {
    href: "https://linkedin.com/in/yourusername",
    icon: Globe,
    label: "LinkedIn",
  },
  { href: "https://x.com/yourusername", icon: X, label: "X" },
  { href: "mailto:your@email.com", icon: Mail, label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "4rem 2rem 3rem",
          display: "grid",
          gridTemplateColumns: "1.4fr repeat(3, 1fr)",
          gap: "3rem",
        }}
        className="footer-grid"
      >
        {/* Brand */}
        <div>
          <Link
            href="/"
            aria-label="Home"
            style={{
              display: "inline-flex",
              marginBottom: "1.25rem",
              textDecoration: "none",
            }}
          >
            <Image
              src={logo}
              alt="Logo"
              height={32}
              style={{
                width: "auto",
                height: "32px",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Link>
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--muted)",
              lineHeight: 1.8,
              maxWidth: "280px",
              marginBottom: "1.5rem",
            }}
          >
            Conversion-focused websites for real estate, construction, law, and
            professional services. Based in Dhaka, Bangladesh — working
            worldwide.
          </p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: "34px",
                  height: "34px",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--muted)",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--fg)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "var(--fg)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--muted)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "var(--border)";
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h3
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.09em",
                textTransform: "uppercase",
                color: "var(--fg)",
                marginBottom: "1.25rem",
              }}
            >
              {category}
            </h3>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {links.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      fontSize: "0.83rem",
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

      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "1.25rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <p style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
            &copy; {year} Eti Studio. All rights reserved.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.45rem 1rem",
              background: "var(--fg)",
              color: "var(--bg)",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textDecoration: "none",
              borderRadius: "3px",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--fg)")
            }
          >
            Get a Free Website Audit
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2.5rem !important; } }
        @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
