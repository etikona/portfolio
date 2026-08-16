import type { Metadata } from "next";

import Navbar from "@/app/Components/Shared/Navbar";
import ServiceLandingTemplate from "@/app/Components/UI/ServiceLandingTemplate";

export const metadata: Metadata = {
  title: "Website Design & Development",
  description:
    "Custom websites designed and built around your customer's decision-making process — fast, conversion-focused, and yours to own outright.",
};

const data = {
  eyebrow: "Service",
  title: "Website Design",
  titleAccent: "& Development",
  description:
    "A custom website designed around how your customers actually decide — built fast, built to rank, and engineered to turn visitors into enquiries.",
  overview:
    "Most websites are designed to be admired, not to sell. I build differently: every page starts with a question — what does this visitor need to see, in what order, to trust you enough to reach out? From there, I design and develop the entire site myself, on a modern Next.js stack, so what launches is fast, accessible, and built to last well beyond the first year.",
  whatYouGet: [
    {
      title: "Custom Design",
      description:
        "A bespoke visual identity built around your brand and your audience — no templates, no page builders, no stock layouts.",
    },
    {
      title: "Next.js Development",
      description:
        "Built on Next.js with TypeScript and TailwindCSS — server-rendered, fast by default, and easy to extend as you grow.",
    },
    {
      title: "Conversion-First Structure",
      description:
        "Every page is structured around a clear next step. Visitors always know what to do — and why they should.",
    },
    {
      title: "SEO Foundation Included",
      description:
        "Semantic HTML, structured metadata, sitemap, and technical SEO fundamentals configured from day one.",
    },
    {
      title: "Mobile-First Build",
      description:
        "Designed for the phone screen first, then scaled up — because that's how most of your traffic will actually arrive.",
    },
    {
      title: "Full Ownership & Handoff",
      description:
        "You get the complete codebase, hosting setup, and a walkthrough. No vendor lock-in, no recurring platform fees.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Discovery",
      description:
        "We align on your goals, your audience, and what success looks like. I review your current site (if you have one) and document everything I need.",
    },
    {
      step: "02",
      title: "Design",
      description:
        "Wireframes first, then high-fidelity design in Figma. You review and approve every screen before development starts.",
    },
    {
      step: "03",
      title: "Development",
      description:
        "I build the approved design in Next.js, section by section, with staging previews so you can watch it come together.",
    },
    {
      step: "04",
      title: "Content & SEO",
      description:
        "Content is placed, metadata configured, images optimised, and every SEO fundamental checked before launch.",
    },
    {
      step: "05",
      title: "Launch",
      description:
        "Final QA, domain setup, and go-live — with monitoring through the first 48 hours to catch anything early.",
    },
  ],
  outcomes: [
    "A fast, accessible website built to rank",
    "Sub-2-second load times on mobile",
    "A clear path from visitor to enquiry on every page",
    "Full ownership of your codebase — no lock-in",
    "A site your team can update without a developer",
    "A foundation that scales as your business grows",
  ],
  relatedIndustries: [
    { label: "Real Estate", href: "/industries/real-estate" },
    {
      label: "Construction & Contractors",
      href: "/industries/construction-contractors",
    },
    { label: "Law Firms", href: "/industries/law-firms" },
    {
      label: "Professional Services",
      href: "/industries/professional-services",
    },
  ],
  faqs: [
    {
      question: "How long does a new website take?",
      answer:
        "Most projects launch within 6–10 weeks from kickoff, depending on scope and how quickly content and feedback come back to me.",
    },
    {
      question: "Do I need to provide the content?",
      answer:
        "You provide the substance — service details, project examples, team bios — and I handle the structure, copy refinement, and how it's presented.",
    },
    {
      question: "Will I be able to update the site myself?",
      answer:
        "Yes. Every site includes a CMS or admin area so your team can update text, images, and listings without touching code.",
    },
  ],
};

export default function WebsiteDesignDevelopment() {
  return (
    <>
      <Navbar />
      <main className="pt-17">
        <ServiceLandingTemplate data={data} />
      </main>
    </>
  );
}
