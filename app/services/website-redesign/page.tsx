import type { Metadata } from "next";
import Footer from "@/app/Components/Shared/Footer";
import Navbar from "@/app/Components/Shared/Navbar";
import ServiceLandingTemplate from "@/app/Components/UI/ServiceLandingTemplate";

export const metadata: Metadata = {
  title: "Website Redesign",
  description:
    "Modernize an outdated website without losing the search rankings you've already earned — a full rebuild with a rankings-safe migration.",
};

const data = {
  eyebrow: "Service",
  title: "Website",
  titleAccent: "Redesign",
  description:
    "A modern, fast rebuild of your existing website — without losing the search rankings, backlinks, or traffic you've spent years earning.",
  overview:
    "An outdated website is costing you more than it looks like it is — slow load times, a dated design that undercuts your credibility, and a structure that was never built around conversion. A redesign done carelessly can also cost you your search rankings overnight. I handle both problems at once: a completely modern rebuild, backed by a migration process that preserves your SEO equity instead of resetting it.",
  whatYouGet: [
    {
      title: "Full Site Audit",
      description:
        "A complete review of your current site — every URL, every ranking page, every piece of content worth carrying forward.",
    },
    {
      title: "Modern Redesign",
      description:
        "A fresh, custom design that reflects where your business is today — not where it was when the old site launched.",
    },
    {
      title: "Rankings-Safe Migration",
      description:
        "Proper 301 redirects, preserved URL structure where it matters, and a launch plan that protects your existing search visibility.",
    },
    {
      title: "Performance Rebuild",
      description:
        "Rebuilt on Next.js for dramatically faster load times — a common source of lost rankings and lost visitors on old sites.",
    },
    {
      title: "Content Refresh",
      description:
        "Existing copy reviewed and sharpened, with new sections added where the old site had gaps.",
    },
    {
      title: "Post-Launch Monitoring",
      description:
        "Search Console and analytics monitored closely after launch to catch and fix any indexing issues immediately.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Audit",
      description:
        "I map every page, ranking keyword, and backlink on your current site so nothing valuable gets lost in the rebuild.",
    },
    {
      step: "02",
      title: "Redesign",
      description:
        "A new design is built around your current brand and goals — informed by what's working and what isn't on the old site.",
    },
    {
      step: "03",
      title: "Rebuild",
      description:
        "The new site is built on Next.js while the old one stays live, so there's zero downtime during development.",
    },
    {
      step: "04",
      title: "Migration",
      description:
        "Redirects are mapped and tested, metadata is preserved, and the cutover is planned for the lowest-risk moment.",
    },
    {
      step: "05",
      title: "Launch & Monitor",
      description:
        "The new site goes live with close monitoring of rankings and traffic for the first several weeks.",
    },
  ],
  outcomes: [
    "A modern site without losing existing rankings",
    "Significantly faster load times",
    "A design that matches your business today",
    "Zero downtime during the rebuild",
    "Improved conversion structure throughout",
    "Clean redirects — no broken links, no lost traffic",
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
      question: "Will I lose my Google rankings?",
      answer:
        "Not if it's done correctly. I map every ranking page and set up proper redirects before launch specifically to protect the rankings you already have.",
    },
    {
      question: "Does my site need to go offline during the rebuild?",
      answer:
        "No. The new site is built separately and only goes live once it's fully tested — your current site keeps running the whole time.",
    },
    {
      question: "How do you decide what to keep from the old site?",
      answer:
        "Anything ranking well, generating traffic, or driving enquiries gets carried forward and improved. Anything outdated or underperforming gets rebuilt from scratch.",
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
