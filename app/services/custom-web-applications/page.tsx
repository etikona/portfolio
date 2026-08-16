import type { Metadata } from "next";

import Navbar from "@/app/Components/Shared/Navbar";
import ServiceLandingTemplate from "@/app/Components/UI/ServiceLandingTemplate";

export const metadata: Metadata = {
  title: "Custom Web Applications",
  description:
    "Bespoke tools and platforms built around your exact workflow — from property listing engines to internal management systems.",
};

const data = {
  eyebrow: "Service",
  title: "Custom Web",
  titleAccent: "Applications",
  description:
    "Bespoke tools and internal platforms built around how your business actually operates — not how off-the-shelf software assumes you should.",
  overview:
    "Some businesses outgrow what a standard website or a plugin can do. Maybe you need a property listing engine with a specific filtering logic, a client portal, or an internal tool that replaces a messy spreadsheet three people are editing at once. I build custom web applications on Node.js and Next.js — production-grade, secure, and designed specifically around your workflow.",
  whatYouGet: [
    {
      title: "Custom Architecture",
      description:
        "The application is designed around your actual process, not retrofitted from a generic template or SaaS product.",
    },
    {
      title: "Secure Authentication",
      description:
        "Role-based login, permissions, and session management — built correctly from the start, not bolted on later.",
    },
    {
      title: "Database Design",
      description:
        "A data model designed for your specific use case, with the relationships and validation your business actually needs.",
    },
    {
      title: "Custom Dashboards",
      description:
        "Clean, purpose-built interfaces for managing whatever your application needs to manage — no irrelevant clutter.",
    },
    {
      title: "Third-Party Integrations",
      description:
        "Connections to the tools you already use — payment processors, email systems, CRMs, or external APIs.",
    },
    {
      title: "Deployment & Support",
      description:
        "Deployed to production with monitoring in place, plus documentation so your team understands how it works.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Requirements",
      description:
        "We map exactly what the application needs to do, who uses it, and what the current workaround costs you.",
    },
    {
      step: "02",
      title: "Architecture",
      description:
        "Data models, user roles, and system architecture are designed before development starts — this is where a good application is actually won.",
    },
    {
      step: "03",
      title: "Build",
      description:
        "Built in structured phases with regular check-ins, so you see progress and can redirect early if something needs adjusting.",
    },
    {
      step: "04",
      title: "Testing",
      description:
        "Every core flow is tested against real-world scenarios — not just the happy path.",
    },
    {
      step: "05",
      title: "Deploy & Train",
      description:
        "Deployed to production with a full walkthrough so your team can use it confidently from day one.",
    },
  ],
  outcomes: [
    "A tool built around your actual workflow",
    "Eliminated manual processes and spreadsheet chaos",
    "A secure, role-based system your team can trust",
    "Full ownership of the codebase — no vendor lock-in",
    "Integrations with the tools you already rely on",
    "A platform that scales as your business does",
  ],
  relatedIndustries: [
    { label: "Real Estate", href: "/industries/real-estate" },
    {
      label: "Construction & Contractors",
      href: "/industries/construction-contractors",
    },
    {
      label: "Professional Services",
      href: "/industries/professional-services",
    },
    { label: "Law Firms", href: "/industries/law-firms" },
  ],
  faqs: [
    {
      question: "How is this different from using off-the-shelf software?",
      answer:
        "Off-the-shelf tools force your process to fit their structure. A custom application is built around your process instead — and you own it outright, with no monthly per-seat licensing.",
    },
    {
      question: "What kind of applications have you built before?",
      answer:
        "Property listing platforms with admin dashboards, lead management systems, and internal tools for tracking projects and workflows across service businesses.",
    },
    {
      question: "How long does a custom build take?",
      answer:
        "It depends entirely on scope — a focused internal tool might take 4–6 weeks, while a full platform can take several months. We'll scope this precisely during discovery.",
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
