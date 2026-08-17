"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

import {
  ArrowUpRight,
  Globe,
  RefreshCw,
  Search,
  Code2,
  Target,
  Settings,
} from "lucide-react";
import CTAbanner from "../Components/CTAbanner";
import Navbar from "../Components/Shared/Navbar";
import PageHero from "../Components/PageHero";
import Tag from "../Components/Tag";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    icon: Globe,
    title: "Website Design & Development",
    desc: "Custom-built websites designed around your customer's decision-making process — not a template.",
    href: "/services/website-design-development",
    tags: ["Custom Design", "Next.js Build", "SEO Ready"],
  },
  {
    number: "02",
    icon: RefreshCw,
    title: "Website Redesign",
    desc: "A modern, fast rebuild of your existing site — without losing the search rankings you've already earned.",
    href: "/services/website-redesign",
    tags: ["Rankings-Safe Migration", "Performance Rebuild"],
  },
  {
    number: "03",
    icon: Search,
    title: "SEO Foundation",
    desc: "The technical foundation that gets you found — site speed, structured data, indexing, and on-page SEO.",
    href: "/services/seo-foundation",
    tags: ["Technical SEO", "Core Web Vitals"],
  },
  {
    number: "04",
    icon: Code2,
    title: "Custom Web Applications",
    desc: "Bespoke tools and internal platforms built around how your business actually operates.",
    href: "/services/custom-web-applications",
    tags: ["Custom Dashboards", "API Design"],
  },
  {
    number: "05",
    icon: Target,
    title: "Lead Generation & Conversion",
    desc: "Landing pages and funnels engineered specifically to turn traffic into qualified enquiries.",
    href: "/services/lead-generation-conversion",
    tags: ["Landing Pages", "Conversion Tracking"],
  },
  {
    number: "06",
    icon: Settings,
    title: "CRM & Automation",
    desc: "Custom dashboards and automated workflows so leads are captured, tracked, and followed up automatically.",
    href: "/services/crm-automation",
    tags: ["Lead Pipeline", "Automated Follow-Up"],
  },
];

export default function ServicesPage() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".svc-row",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".svc-list", start: "top 80%" },
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
          eyebrow="Services"
          title="Everything your website needs to"
          titleAccent="generate business."
          description="From first build to ongoing conversion optimization — I design, develop, and grow websites for real estate, construction, law, and professional service businesses."
          ctaLabel="Get a Free Website Audit"
          ctaHref="/contact"
        />

        <section className="py-32">
          <div className="mx-auto max-w-[1200px] px-8">
            <div className="svc-list flex flex-col gap-6">
              {services.map(
                ({ number, icon: Icon, title, desc, href, tags }) => (
                  <Link key={href} href={href} className="svc-row group">
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
