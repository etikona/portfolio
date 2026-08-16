"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Tag from "./Tag";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function PageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  ctaLabel,
  ctaHref,
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ph-inner > *",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
          delay: 0.1,
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-border pb-24 pt-36 w-full"
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Decorative accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full opacity-[0.15] blur-[100px]"
        style={{ background: "var(--accent)" }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-8">
        <div className="ph-inner max-w-2xl">
          <div className="mb-5 h-0.5 w-10 bg-accent" />
          <Tag className="mb-6">{eyebrow}</Tag>
          <h1 className="mb-6 text-balance font-display text-[clamp(2.3rem,5vw,3.9rem)] font-semibold leading-[1.12] tracking-[-0.03em] text-fg">
            {title}{" "}
            {titleAccent && (
              <em className="italic text-accent">{titleAccent}</em>
            )}
          </h1>
          <p className="text-pretty text-[1.08rem] leading-[1.85] text-muted">
            {description}
          </p>
          {ctaLabel && ctaHref && (
            <Link
              href={ctaHref}
              className="group mt-10 inline-flex items-center gap-2 rounded-[3px] bg-fg px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-bg shadow-lg shadow-black/5 transition-all duration-300 hover:gap-3 hover:bg-neutral-800"
            >
              {ctaLabel}
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
