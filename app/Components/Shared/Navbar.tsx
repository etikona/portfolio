"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/logo.png";

// ─── Nav data ────────────────────────────────────────────────────────────────

const services = [
  {
    label: "Website Design & Development",
    desc: "Custom, high-performance sites built to convert",
    href: "/services/website-design-development",
  },
  {
    label: "Website Redesign",
    desc: "Modernize an outdated site without losing rankings",
    href: "/services/website-redesign",
  },
  {
    label: "SEO Foundation",
    desc: "Technical SEO and on-page optimization that ranks",
    href: "/services/seo-foundation",
  },
  {
    label: "Custom Web Applications",
    desc: "Bespoke tools and platforms built around your workflow",
    href: "/services/custom-web-applications",
  },
  {
    label: "Lead Generation & Conversion",
    desc: "Landing pages and funnels engineered to convert",
    href: "/services/lead-generation-conversion",
  },
  {
    label: "CRM & Automation",
    desc: "Custom dashboards and automated workflows",
    href: "/services/crm-automation",
  },
];

const industries = [
  {
    label: "Real Estate",
    desc: "Property platforms, listings & lead generation",
    href: "/industries/real-estate",
  },
  {
    label: "Construction & Contractors",
    desc: "Project portfolios & tender-ready sites",
    href: "/industries/construction-contractors",
  },
  {
    label: "Law Firms",
    desc: "Authority-building sites that convert enquiries",
    href: "/industries/law-firms",
  },
  {
    label: "Professional Services",
    desc: "Consultancies, finance & advisory firms",
    href: "/industries/professional-services",
  },
];

const simpleLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

// ─── Dropdown panel ───────────────────────────────────────────────────────────

interface DropdownProps {
  items: { label: string; desc: string; href: string }[];
  viewAllHref: string;
  viewAllLabel: string;
  isOpen: boolean;
}

function Dropdown({ items, viewAllHref, viewAllLabel, isOpen }: DropdownProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;
    if (isOpen) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" }
      );
      gsap.fromTo(
        panelRef.current.querySelectorAll(".dd-item"),
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.2, stagger: 0.04, ease: "power2.out", delay: 0.05 }
      );
      panelRef.current.style.pointerEvents = "auto";
    } else {
      gsap.to(panelRef.current, {
        opacity: 0, y: -6, duration: 0.15, ease: "power2.in",
        onComplete: () => { if (panelRef.current) panelRef.current.style.pointerEvents = "none"; },
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={panelRef}
      role="menu"
      aria-hidden={!isOpen}
      style={{
        position: "absolute",
        top: "calc(100% + 12px)",
        left: "50%",
        transform: "translateX(-50%)",
        background: "var(--bg)",
        border: "1px solid var(--border)",
        borderRadius: "6px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.06)",
        minWidth: "560px",
        opacity: 0,
        pointerEvents: "none",
        zIndex: 200,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1px",
          background: "var(--border)",
        }}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            role="menuitem"
            className="dd-item"
            style={{
              display: "block",
              padding: "1.1rem 1.35rem",
              textDecoration: "none",
              background: "var(--bg)",
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--surface)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--bg)")}
          >
            <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--fg)", marginBottom: "0.2rem", letterSpacing: "0.01em" }}>
              {item.label}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.4 }}>
              {item.desc}
            </div>
          </Link>
        ))}
      </div>

      <div
        style={{
          padding: "0.85rem 1.35rem",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          background: "var(--surface)",
        }}
      >
        <Link
          href={viewAllHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--fg)",
            textDecoration: "none",
          }}
        >
          {viewAllLabel} <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<"services" | "industries" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<"services" | "industries" | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.15 }
    );
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenMenu(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleMouseEnter = useCallback((menu: "services" | "industries") => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(menu);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          background: scrolled ? "rgba(248,248,246,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.05)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 2rem",
            height: "68px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          {/* Logo */}
          <Link href="/" aria-label="Home" style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}>
            <Image
              src={logo}
              alt="Logo"
              height={36}
              style={{ width: "auto", height: "36px", objectFit: "contain", display: "block" }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <ul className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "0.25rem", listStyle: "none", flex: 1, justifyContent: "center" }}>
            <li>
              <Link
                href="/"
                style={{
                  padding: "0.5rem 0.85rem",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  color: pathname === "/" ? "var(--fg)" : "var(--muted)",
                  textDecoration: "none",
                  borderRadius: "3px",
                  display: "block",
                  transition: "color 0.15s ease, background 0.15s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--fg)"; e.currentTarget.style.background = "var(--surface)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = pathname === "/" ? "var(--fg)" : "var(--muted)"; e.currentTarget.style.background = "transparent"; }}
              >
                Home
              </Link>
            </li>

            {/* Services dropdown */}
            <li style={{ position: "relative" }} onMouseEnter={() => handleMouseEnter("services")} onMouseLeave={handleMouseLeave}>
              <button
                aria-haspopup="true"
                aria-expanded={openMenu === "services"}
                style={{
                  display: "flex", alignItems: "center", gap: "0.3rem",
                  padding: "0.5rem 0.85rem", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.03em",
                  color: isActive("/services") || openMenu === "services" ? "var(--fg)" : "var(--muted)",
                  background: openMenu === "services" ? "var(--surface)" : "transparent",
                  border: "none", borderRadius: "3px", cursor: "pointer", fontFamily: "'Inter', sans-serif",
                  transition: "color 0.15s ease, background 0.15s ease",
                }}
              >
                Services
                <ChevronDown size={13} style={{ transition: "transform 0.2s ease", transform: openMenu === "services" ? "rotate(180deg)" : "rotate(0deg)" }} />
              </button>
              <Dropdown items={services} viewAllHref="/services" viewAllLabel="All Services" isOpen={openMenu === "services"} />
            </li>

            {/* Industries dropdown */}
            <li style={{ position: "relative" }} onMouseEnter={() => handleMouseEnter("industries")} onMouseLeave={handleMouseLeave}>
              <button
                aria-haspopup="true"
                aria-expanded={openMenu === "industries"}
                style={{
                  display: "flex", alignItems: "center", gap: "0.3rem",
                  padding: "0.5rem 0.85rem", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.03em",
                  color: isActive("/industries") || openMenu === "industries" ? "var(--fg)" : "var(--muted)",
                  background: openMenu === "industries" ? "var(--surface)" : "transparent",
                  border: "none", borderRadius: "3px", cursor: "pointer", fontFamily: "'Inter', sans-serif",
                  transition: "color 0.15s ease, background 0.15s ease",
                }}
              >
                Industries
                <ChevronDown size={13} style={{ transition: "transform 0.2s ease", transform: openMenu === "industries" ? "rotate(180deg)" : "rotate(0deg)" }} />
              </button>
              <Dropdown items={industries} viewAllHref="/industries" viewAllLabel="All Industries" isOpen={openMenu === "industries"} />
            </li>

            {simpleLinks.slice(1).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    padding: "0.5rem 0.85rem", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.03em",
                    color: isActive(link.href) ? "var(--fg)" : "var(--muted)",
                    textDecoration: "none", borderRadius: "3px", display: "block",
                    transition: "color 0.15s ease, background 0.15s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--fg)"; e.currentTarget.style.background = "var(--surface)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = isActive(link.href) ? "var(--fg)" : "var(--muted)"; e.currentTarget.style.background = "transparent"; }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="nav-desktop" style={{ flexShrink: 0 }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                padding: "0.55rem 1.1rem", background: "var(--fg)", color: "var(--bg)",
                fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.04em",
                textDecoration: "none", borderRadius: "3px", whiteSpace: "nowrap",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--fg)")}
            >
              Get a Free Website Audit
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="nav-mobile-btn"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "var(--fg)", padding: "0.5rem", flexShrink: 0 }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", overflowY: "auto", maxHeight: "calc(100vh - 68px)" }}>
            <div style={{ padding: "1rem 1.5rem 2rem" }}>
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                style={{ display: "block", padding: "0.75rem 0", fontSize: "0.92rem", fontWeight: 500, color: "var(--fg)", textDecoration: "none", borderBottom: "1px solid var(--border)" }}
              >
                Home
              </Link>

              {/* Services accordion */}
              <div style={{ borderBottom: "1px solid var(--border)" }}>
                <button
                  onClick={() => setMobileExpanded((v) => (v === "services" ? null : "services"))}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "0.75rem 0", background: "none", border: "none", fontSize: "0.92rem", fontWeight: 500, color: "var(--fg)", cursor: "pointer", fontFamily: "'Inter', sans-serif", textAlign: "left" }}
                >
                  Services
                  <ChevronDown size={15} style={{ transition: "transform 0.2s ease", transform: mobileExpanded === "services" ? "rotate(180deg)" : "rotate(0deg)", color: "var(--muted)" }} />
                </button>
                {mobileExpanded === "services" && (
                  <div style={{ paddingBottom: "0.5rem" }}>
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setMobileOpen(false)}
                        style={{ display: "flex", flexDirection: "column", padding: "0.6rem 0 0.6rem 1rem", textDecoration: "none", borderLeft: "2px solid var(--border)", marginLeft: "0.25rem", marginBottom: "0.25rem" }}
                      >
                        <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--fg)" }}>{s.label}</span>
                        <span style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.1rem" }}>{s.desc}</span>
                      </Link>
                    ))}
                    <Link href="/services" onClick={() => setMobileOpen(false)} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", marginLeft: "1.25rem", marginTop: "0.25rem", fontSize: "0.75rem", fontWeight: 600, color: "var(--accent)", textDecoration: "none", letterSpacing: "0.04em" }}>
                      All Services <ArrowRight size={11} />
                    </Link>
                  </div>
                )}
              </div>

              {/* Industries accordion */}
              <div style={{ borderBottom: "1px solid var(--border)" }}>
                <button
                  onClick={() => setMobileExpanded((v) => (v === "industries" ? null : "industries"))}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "0.75rem 0", background: "none", border: "none", fontSize: "0.92rem", fontWeight: 500, color: "var(--fg)", cursor: "pointer", fontFamily: "'Inter', sans-serif", textAlign: "left" }}
                >
                  Industries
                  <ChevronDown size={15} style={{ transition: "transform 0.2s ease", transform: mobileExpanded === "industries" ? "rotate(180deg)" : "rotate(0deg)", color: "var(--muted)" }} />
                </button>
                {mobileExpanded === "industries" && (
                  <div style={{ paddingBottom: "0.5rem" }}>
                    {industries.map((ind) => (
                      <Link
                        key={ind.href}
                        href={ind.href}
                        onClick={() => setMobileOpen(false)}
                        style={{ display: "flex", flexDirection: "column", padding: "0.6rem 0 0.6rem 1rem", textDecoration: "none", borderLeft: "2px solid var(--border)", marginLeft: "0.25rem", marginBottom: "0.25rem" }}
                      >
                        <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--fg)" }}>{ind.label}</span>
                        <span style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.1rem" }}>{ind.desc}</span>
                      </Link>
                    ))}
                    <Link href="/industries" onClick={() => setMobileOpen(false)} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", marginLeft: "1.25rem", marginTop: "0.25rem", fontSize: "0.75rem", fontWeight: 600, color: "var(--accent)", textDecoration: "none", letterSpacing: "0.04em" }}>
                      All Industries <ArrowRight size={11} />
                    </Link>
                  </div>
                )}
              </div>

              {simpleLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ display: "block", padding: "0.75rem 0", fontSize: "0.92rem", fontWeight: 500, color: "var(--fg)", textDecoration: "none", borderBottom: "1px solid var(--border)" }}
                >
                  {link.label}
                </Link>
              ))}

              <div style={{ paddingTop: "1.5rem" }}>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                    padding: "0.85rem 1.5rem", background: "var(--fg)", color: "var(--bg)",
                    fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.04em",
                    textDecoration: "none", borderRadius: "3px", width: "100%",
                  }}
                >
                  Get a Free Website Audit
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
        @media (min-width: 901px) {
          .nav-mobile-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}