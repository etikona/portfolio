"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

import {
  ArrowUpRight,
  Building2,
  HardHat,
  Scale,
  Briefcase,
} from "lucide-react";
import CTAbanner from "../Components/CTAbanner";
import Navbar from "../Components/Shared/Navbar";
import PageHero from "../Components/PageHero";
import Tag from "../Components/Tag";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const industries = [
  {
    number: "01",
    icon: Building2,
    title: "Real Estate",
    desc: "Property listing platforms, developer sites, and agency websites built for lead generation.",
    href: "/industries/real-estate",
    tags: ["Property Listings", "Lead Gen", "CMS"],
  },
  {
    number: "02",
    icon: HardHat,
    title: "Construction & Contractors",
    desc: "Project portfolios and tender-ready sites that win developers and contractors work before the first meeting.",
    href: "/industries/construction-contractors",
    tags: ["Project Portfolio", "Tender Enquiries"],
  },
  {
    number: "03",
    icon: Scale,
    title: "Law Firms",
    desc: "Authority-building websites for law firms that build trust and convert visitors into consultation requests.",
    href: "/industries/law-firms",
    tags: ["Authority Building", "Consultations"],
  },
  {
    number: "04",
    icon: Briefcase,
    title: "Professional Services",
    desc: "Websites for consultancies, finance, and advisory firms that generate qualified inbound enquiries.",
    href: "/industries/professional-services",
    tags: ["Lead Capture", "Case Studies"],
  },
];

export default function IndustriesPage() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ind-row",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".ind-list", start: "top 80%" },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main ref={ref} className="pt-[68px]">
        <PageHero
          eyebrow="Industries"
          title="Built for your"
          titleAccent="specific market."
          description="Generic websites don't win in competitive industries. I build for your audience, your credibility requirements, and your specific conversion goals."
          ctaLabel="Get a Free Website Audit"
          ctaHref="/contact"
        />

        <section className="py-32">
          <div className="mx-auto max-w-[1200px] px-8">
            <div className="ind-list flex flex-col gap-6">
              {industries.map(
                ({ number, icon: Icon, title, desc, href, tags }) => (
                  <Link key={href} href={href} className="ind-row group">
                    <div className="grid grid-cols-1 items-center gap-6 rounded-xl border border-border bg-bg p-8 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-xl group-hover:shadow-black/[0.05] sm:grid-cols-[60px_1fr_auto] sm:gap-8 sm:p-10">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-fg text-bg transition-colors duration-300 group-hover:bg-accent">
                        <Icon size={22} />
                      </div>

                      <div>
                        <div className="mb-2 flex items-center gap-3">
                          <span className="font-display text-2xl font-semibold leading-none text-border">
                            {number}
                          </span>
                          <h2 className="font-display text-xl font-semibold text-fg">
                            {title}
                          </h2>
                        </div>
                        <p className="mb-4 max-w-xl text-[0.9rem] leading-[1.7] text-muted">
                          {desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {tags.map((t) => (
                            <Tag key={t}>{t}</Tag>
                          ))}
                        </div>
                      </div>

                      <ArrowUpRight
                        size={20}
                        className="hidden flex-shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent sm:block"
                      />
                    </div>
                  </Link>
                ),
              )}
            </div>
          </div>
        </section>

        <CTAbanner />
      </main>
      {/* <Footer /> */}
    </>
  );
}
