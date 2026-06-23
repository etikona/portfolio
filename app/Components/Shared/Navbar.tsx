"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/logo.png";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#projects", label: "Work" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 },
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.3s ease, border-color 0.3s ease",
        background: scrolled ? "rgba(248,248,246,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            textDecoration: "none",
          }}
          aria-label="Home"
        >
          <Image
            src={logo}
            alt="Eti Studio logo"
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

        {/* Desktop Links + CTA */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}
          className="hidden-mobile"
        >
          <ul
            style={{
              display: "flex",
              gap: "2.5rem",
              listStyle: "none",
              alignItems: "center",
              margin: 0,
              padding: 0,
            }}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color:
                      pathname === link.href ||
                      (link.href === "/blog" && pathname.startsWith("/blog"))
                        ? "var(--fg)"
                        : "var(--muted)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--fg)")
                  }
                  onMouseLeave={(e) => {
                    const active =
                      pathname === link.href ||
                      (link.href === "/blog" && pathname.startsWith("/blog"));
                    e.currentTarget.style.color = active
                      ? "var(--fg)"
                      : "var(--muted)";
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Link
            href="/#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.55rem 1.25rem",
              background: "var(--fg)",
              color: "var(--bg)",
              textDecoration: "none",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              borderRadius: "2px",
              transition: "background 0.2s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--fg)")
            }
          >
            Work With Us
            <ArrowRight size={12} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--fg)",
            padding: "0.5rem",
          }}
          className="show-mobile"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--bg)",
            borderTop: "1px solid var(--border)",
            padding: "1.5rem 2rem 2rem",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              margin: 0,
              padding: 0,
              marginBottom: "1.75rem",
            }}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "var(--fg)",
                    textDecoration: "none",
                    letterSpacing: "0.03em",
                    textTransform: "uppercase",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile CTA */}
          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              background: "var(--fg)",
              color: "var(--bg)",
              textDecoration: "none",
              fontSize: "0.82rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              borderRadius: "2px",
            }}
          >
            Work With Us <ArrowRight size={13} />
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
