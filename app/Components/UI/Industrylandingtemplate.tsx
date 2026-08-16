"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Quote,
  Layers,
  X,
} from "lucide-react";
import CTAbanner from "../CTAbanner";
import PageHero from "../PageHero";
import Tag from "../Tag";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export interface IndustryLandingData {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description: string;
  overview: string;
  challenges: { title: string; description: string }[];
  whatWeBuild: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  outcomes: string[];
  relatedServices: { label: string; href: string }[];
  faqs?: { question: string; answer: string }[];
}

const CONTAINER = "mx-auto max-w-[1200px] px-8";

export default function IndustryLandingTemplate({
  data,
}: {
  data: IndustryLandingData;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ov-left > *",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".ov-left", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".ov-card",
        { opacity: 0, x: 24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ".ov-card", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".challenge-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".challenge-grid", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".build-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".build-grid", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".process-step",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".process-list", start: "top 78%" },
        },
      );
      gsap.fromTo(
        ".outcome-item",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: { trigger: ".outcomes-grid", start: "top 82%" },
        },
      );
      if (data.faqs?.length) {
        gsap.fromTo(
          ".faq-item",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: ".faq-list", start: "top 82%" },
          },
        );
      }
    }, ref);
    return () => ctx.revert();
  }, [data.faqs?.length]);

  return (
    <div ref={ref}>
      <PageHero
        eyebrow={data.eyebrow}
        title={data.title}
        titleAccent={data.titleAccent}
        description={data.description}
        ctaLabel="Get a Free Website Audit"
        ctaHref="/contact"
      />

      {/* Overview */}
      <section className="border-b border-border py-32">
        <div className={CONTAINER}>
          <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-2 md:gap-16">
            <div className="ov-left">
              <Tag className="mb-5">Overview</Tag>
              <h2 className="text-balance mb-6 font-display text-[clamp(1.7rem,3.2vw,2.4rem)] font-semibold leading-[1.22] tracking-[-0.02em] text-fg">
                Why this industry needs a different approach
              </h2>
              <p className="max-w-lg text-pretty text-[1rem] leading-[1.9] text-muted">
                {data.overview}
              </p>
            </div>

            {/* Related services card */}
            <div className="ov-card relative overflow-hidden rounded-xl border border-border bg-surface p-8 shadow-sm">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-[0.12] blur-3xl"
                style={{ background: "var(--accent)" }}
              />
              <div className="relative">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-fg text-bg">
                  <Layers size={18} />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-fg">
                  Recommended services
                </h3>
                <p className="mb-6 text-xs text-muted">
                  Where to start for this industry
                </p>

                <div className="flex flex-col">
                  {data.relatedServices.map((svc, i) => (
                    <Link
                      key={svc.href}
                      href={svc.href}
                      className={`group flex items-center justify-between py-4 text-[0.9rem] font-medium text-fg transition-colors duration-200 hover:text-accent ${
                        i < data.relatedServices.length - 1
                          ? "border-b border-border"
                          : ""
                      }`}
                    >
                      {svc.label}
                      <ArrowUpRight
                        size={14}
                        className="text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="border-b border-border bg-surface py-32">
        <div className={CONTAINER}>
          <div className="mb-14 max-w-xl">
            <Tag className="mb-5">Common Problems</Tag>
            <h2 className="text-balance font-display text-[clamp(1.7rem,3.2vw,2.4rem)] font-semibold leading-[1.22] tracking-[-0.02em] text-fg">
              What most sites in this space get wrong
            </h2>
          </div>
          <div className="challenge-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.challenges.map(({ title, description }) => (
              <div
                key={title}
                className="challenge-card rounded-xl border border-border bg-bg p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-red-500">
                  <X size={17} />
                </div>
                <h3 className="mb-2.5 text-[0.95rem] font-semibold leading-snug text-fg">
                  {title}
                </h3>
                <p className="text-[0.85rem] leading-[1.72] text-muted">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="border-b border-border py-32">
        <div className={CONTAINER}>
          <div className="mb-14 max-w-xl">
            <Tag className="mb-5">The Solution</Tag>
            <h2 className="text-balance font-display text-[clamp(1.7rem,3.2vw,2.4rem)] font-semibold leading-[1.22] tracking-[-0.02em] text-fg">
              What we build instead
            </h2>
          </div>
          <div className="build-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.whatWeBuild.map(({ title, description }) => (
              <div
                key={title}
                className="build-card group rounded-xl border border-border bg-surface p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-xl hover:shadow-black/[0.04]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-fg text-bg transition-colors duration-300 group-hover:bg-accent">
                  <Check size={17} />
                </div>
                <h3 className="mb-2.5 text-[0.95rem] font-semibold leading-snug text-fg">
                  {title}
                </h3>
                <p className="text-[0.85rem] leading-[1.72] text-muted">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process — connected timeline */}
      <section className="border-b border-border bg-surface py-32">
        <div className={CONTAINER}>
          <div className="mb-14 max-w-xl">
            <Tag className="mb-5">Process</Tag>
            <h2 className="text-balance font-display text-[clamp(1.7rem,3.2vw,2.4rem)] font-semibold leading-[1.22] tracking-[-0.02em] text-fg">
              How it works
            </h2>
          </div>

          <div className="process-list relative max-w-2xl">
            <div className="absolute left-[27px] top-2 bottom-2 w-px bg-border" />
            {data.process.map(({ step, title, description }, i) => (
              <div
                key={step}
                className={`process-step relative flex gap-6 sm:gap-7 ${
                  i < data.process.length - 1 ? "pb-12" : ""
                }`}
              >
                <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-fg bg-bg font-display text-base font-semibold text-fg">
                  {step}
                </div>
                <div className="pt-2.5">
                  <h3 className="mb-2 text-[1.02rem] font-semibold text-fg">
                    {title}
                  </h3>
                  <p className="text-[0.9rem] leading-[1.78] text-muted">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reassurance strip */}
      <section className="border-b border-border py-24">
        <div className={CONTAINER}>
          <div className="flex max-w-2xl items-start gap-6 border-l-2 border-accent pl-8">
            <Quote
              size={22}
              className="mt-1 flex-shrink-0 text-accent"
              strokeWidth={1.5}
            />
            <p className="text-pretty font-display text-[clamp(1.2rem,2.2vw,1.5rem)] italic leading-[1.6] text-fg">
              Every project is designed, built, and delivered by me directly —
              no account managers, no outsourced developers, no handoffs along
              the way.
            </p>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-b border-border bg-surface py-32">
        <div className={CONTAINER}>
          <div className="mb-14 max-w-xl">
            <Tag className="mb-5">Results</Tag>
            <h2 className="text-balance font-display text-[clamp(1.7rem,3.2vw,2.4rem)] font-semibold leading-[1.22] tracking-[-0.02em] text-fg">
              What you can expect
            </h2>
          </div>
          <div className="outcomes-grid grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.outcomes.map((outcome) => (
              <div
                key={outcome}
                className="outcome-item group relative flex items-start gap-4 overflow-hidden rounded-lg border border-border bg-bg p-5 shadow-sm transition-colors duration-300 hover:border-accent"
              >
                <div className="absolute left-0 top-0 h-full w-0 bg-accent transition-all duration-300 group-hover:w-1" />
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-fg text-bg transition-colors duration-300 group-hover:bg-accent">
                  <Check size={14} />
                </div>
                <span className="pt-1.5 text-[0.9rem] leading-[1.55] text-fg">
                  {outcome}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — accordion */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="py-32">
          <div className={CONTAINER}>
            <div className="mx-auto max-w-2xl">
              <div className="mb-12 text-center">
                <Tag className="mb-5">FAQ</Tag>
                <h2 className="text-balance font-display text-[clamp(1.7rem,3.2vw,2.4rem)] font-semibold tracking-[-0.02em] text-fg">
                  Common questions
                </h2>
              </div>
              <div className="faq-list flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
                {data.faqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={faq.question}
                      className={`faq-item ${i < data.faqs!.length - 1 ? "border-b border-border" : ""}`}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className={`flex w-full items-center justify-between gap-4 px-7 py-6 text-left transition-colors duration-200 ${
                          isOpen ? "bg-bg" : "hover:bg-bg/60"
                        }`}
                        aria-expanded={isOpen}
                      >
                        <h3 className="text-[0.95rem] font-semibold text-fg">
                          {faq.question}
                        </h3>
                        <ChevronDown
                          size={18}
                          className={`flex-shrink-0 text-muted transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-accent" : ""
                          }`}
                        />
                      </button>
                      <div
                        className="grid transition-all duration-300 ease-in-out"
                        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <p className="px-7 pb-6 text-[0.88rem] leading-[1.78] text-muted">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      <CTAbanner />
    </div>
  );
}
