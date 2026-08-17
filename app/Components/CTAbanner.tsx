"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface Props {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

const proofPoints = [
  "Founder-led, start to finish",
  "Fast turnaround",
  "No long-term lock-in",
];

export default function CTAbanner({
  title = "Ready for a website that actually works?",
  description = "Get a free website audit and see exactly what's costing you leads — no obligation, no sales pressure.",
  primaryLabel = "Get a Free Website Audit",
  primaryHref = "/contact",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-inner > *",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 82%" },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-fg py-32 text-bg w-full"
    >
      {/* Grid background on dark surface */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.18] blur-[110px]"
        style={{ background: "var(--accent)" }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-8">
        <div className="cta-inner mx-auto max-w-lg text-center">
          <div className="mx-auto mb-6 h-0.5 w-10 bg-accent" />
          <h2 className="mb-5 text-balance font-display text-[clamp(1.9rem,4vw,3.1rem)] font-semibold leading-[1.18] tracking-[-0.025em] text-bg">
            {title}
          </h2>
          <p className="mx-auto mb-10 max-w-md text-pretty text-base leading-[1.8] text-bg/60">
            {description}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={primaryHref}
              className="group inline-flex items-center gap-2 rounded-[3px] bg-accent px-7 py-3.5 text-sm font-semibold tracking-wider text-fg shadow-lg shadow-black/20 transition-all duration-300 hover:gap-3 hover:brightness-105"
            >
              {primaryLabel}
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-8">
            {proofPoints.map((point) => (
              <div key={point} className="flex items-center gap-2">
                <CheckCircle2 size={13} className="flex-shrink-0 text-accent" />
                <span className="text-xs text-bg/55">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
