"use client";

import Link from "next/link";
import { GitFork, X, Mail, Globe } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/logo.png";

const socialLinks = [
  { href: "https://github.com/etikona", icon: GitFork, label: "GitHub" },
  {
    href: "https://linkedin.com/in/eti-kona-paul",
    icon: Globe,
    label: "LinkedIn",
  },
  { href: "https://x.com/etikona", icon: X, label: "X / Twitter" },
  { href: "mailto:etikonapaul@gmail.com", icon: Mail, label: "Email" },
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
            <Image
              src={logo}
              alt="Eti logo"
              height={36}
              style={{
                width: "auto",
                height: "36px",
                objectFit: "contain",
                display: "block",
              }}
              priority
            />
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
