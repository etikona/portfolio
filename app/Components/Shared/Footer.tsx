"use client";

import Link from "next/link";
import { GitFork, X, Mail, Globe } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/yourusername", icon: GitFork, label: "GitHub" },
  {
    href: "https://linkedin.com/in/yourusername",
    icon: Globe,
    label: "LinkedIn",
  },
  { href: "https://x.com/yourusername", icon: X, label: "X / Twitter" },
  { href: "mailto:your@email.com", icon: Mail, label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "3rem 2rem",
        background: "var(--bg)",
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
          gap: "1.5rem",
        }}
      >
        <div>
          <Link
            href="/"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--fg)",
              textDecoration: "none",
            }}
          >
            eti.
          </Link>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--muted)",
              marginTop: "0.4rem",
            }}
          >
            &copy; {year} All rights reserved.
          </p>
        </div>

        <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                color: "var(--muted)",
                transition: "color 0.2s ease",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted)")
              }
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
