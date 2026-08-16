import type { Metadata } from "next";
import Footer from "@/app/Components/Shared/Footer";
import Navbar from "@/app/Components/Shared/Navbar";
import ServiceLandingTemplate from "@/app/Components/UI/ServiceLandingTemplate";

export const metadata: Metadata = {
  title: "SEO Foundation",
  description:
    "Technical SEO and on-page optimization that gets your site found — built by a developer who controls both the code and the outcome.",
};

const data = {
  eyebrow: "Service",
  title: "SEO",
  titleAccent: "Foundation",
  description:
    "The technical groundwork that determines whether Google can find, understand, and rank your site — done by someone who controls the code, not just the recommendations.",
  overview:
    "Most SEO work stops at content and keywords. But before any of that matters, Google has to be able to crawl your site, understand its structure, and trust that it loads fast and works properly. That's the foundation — and it's almost always where underperforming sites are actually failing. I fix the technical layer directly in your codebase, not through a checklist handed to someone else.",
  whatYouGet: [
    {
      title: "Technical SEO Audit",
      description:
        "A full crawl of your site — broken links, duplicate content, missing metadata, indexing issues, and speed bottlenecks, all documented.",
    },
    {
      title: "Core Web Vitals Fix",
      description:
        "LCP, CLS, and INP improvements — image sizing, font loading, and layout stability fixed at the code level.",
    },
    {
      title: "On-Page Optimization",
      description:
        "Title tags, meta descriptions, heading structure, and internal linking configured correctly across every key page.",
    },
    {
      title: "Schema Markup",
      description:
        "Structured data for your business type — helping Google understand your content and potentially feature it in rich results.",
    },
    {
      title: "Sitemap & Indexing",
      description:
        "XML sitemap, robots.txt, and Search Console setup — configured and verified so your pages actually get indexed.",
    },
    {
      title: "Monthly Reporting",
      description:
        "Clear, plain-English reports on ranking movement, traffic trends, and any new technical issues that surface.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Audit",
      description:
        "A full technical crawl using industry-standard tools, cross-referenced against your Search Console data. Every issue is documented and prioritised by impact.",
    },
    {
      step: "02",
      title: "Fix Plan",
      description:
        "A prioritised list — quick wins first, structural fixes second. You see exactly what's being done and why it matters.",
    },
    {
      step: "03",
      title: "Implementation",
      description:
        "Fixes are made directly in your codebase or CMS — no vague recommendations handed off to someone else to implement.",
    },
    {
      step: "04",
      title: "Verification",
      description:
        "Search Console confirms indexing, structured data validity, and passing Core Web Vitals scores.",
    },
    {
      step: "05",
      title: "Ongoing Monitoring",
      description:
        "Monthly check-ins tracking ranking movement and catching new technical issues before they compound.",
    },
  ],
  outcomes: [
    "Higher visibility for the searches that matter",
    "Passing Core Web Vitals on all devices",
    "Faster indexing of new pages and content",
    "Fewer technical errors dragging down rankings",
    "Structured data eligible for rich search results",
    "A clear monthly view of what's actually working",
  ],
  relatedIndustries: [
    { label: "Real Estate", href: "/industries/real-estate" },
    { label: "Law Firms", href: "/industries/law-firms" },
    {
      label: "Professional Services",
      href: "/industries/professional-services",
    },
    {
      label: "Construction & Contractors",
      href: "/industries/construction-contractors",
    },
  ],
  faqs: [
    {
      question: "How is this different from a marketing agency's SEO service?",
      answer:
        "I implement fixes directly in your codebase myself. Most agencies hand you a list of recommendations for your developer to action — I am the developer, so nothing gets lost in translation.",
    },
    {
      question: "How soon will I see results?",
      answer:
        "Technical fixes typically show measurable improvement within 4–8 weeks, though competitive keywords can take longer. I report honestly on what's moving and what isn't.",
    },
    {
      question: "Do I need a full redesign for this to work?",
      answer:
        "No. SEO Foundation work can usually be applied to your existing site without a rebuild, unless the underlying platform itself is the bottleneck.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="pt-[68px]">
        <ServiceLandingTemplate data={data} />
      </main>
    </>
  );
}
