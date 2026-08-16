import type { Metadata } from "next";
import Navbar from "@/app/Components/Shared/Navbar";
import ServiceLandingTemplate from "@/app/Components/UI/ServiceLandingTemplate";

export const metadata: Metadata = {
  title: "CRM & Automation",
  description:
    "Custom dashboards and automated workflows so every lead is captured, tracked, and followed up — without manual effort.",
};

const data = {
  eyebrow: "Service",
  title: "CRM",
  titleAccent: "& Automation",
  description:
    "Custom dashboards and automated workflows that make sure every lead is captured, tracked, and followed up on — without anyone having to remember to do it.",
  overview:
    "The leads that fall through the cracks are rarely the ones you actively lose — they're the ones that get captured and then forgotten. A form submission that no one follows up on. A property enquiry buried in an inbox. I build custom CRM dashboards and automated workflows that remove that risk entirely, so leads move through a defined process automatically, and nothing depends on someone remembering.",
  whatYouGet: [
    {
      title: "Custom CRM Dashboard",
      description:
        "A purpose-built interface for managing your leads or clients — built around your process, not a generic pipeline.",
    },
    {
      title: "Automated Lead Capture",
      description:
        "Every enquiry from your website, forms, or landing pages flows automatically into one organised system.",
    },
    {
      title: "Status & Pipeline Tracking",
      description:
        "Leads move through clearly defined stages, so your team always knows what's been actioned and what hasn't.",
    },
    {
      title: "Automated Notifications",
      description:
        "Instant alerts when a new lead comes in — by email or your preferred channel — so response times stay fast.",
    },
    {
      title: "Email Automation",
      description:
        "Templated follow-up sequences triggered automatically based on lead status or time since last contact.",
    },
    {
      title: "Role-Based Access",
      description:
        "Team members see exactly what they need to — admin, sales, or support roles, each with appropriate access.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Workflow Mapping",
      description:
        "I document exactly how a lead should move from first contact to closed — the stages, owners, and triggers involved.",
    },
    {
      step: "02",
      title: "System Design",
      description:
        "The dashboard and automation logic are designed around that real workflow, not a generic CRM template.",
    },
    {
      step: "03",
      title: "Build",
      description:
        "Built directly into your existing platform or as a standalone system, with secured, role-based access throughout.",
    },
    {
      step: "04",
      title: "Automation Setup",
      description:
        "Notification and follow-up automations are configured and tested against real scenarios before going live.",
    },
    {
      step: "05",
      title: "Training & Handoff",
      description:
        "A full walkthrough with your team, plus documentation, so everyone knows how to use the system from day one.",
    },
  ],
  outcomes: [
    "No lead falls through the cracks again",
    "Faster response times to new enquiries",
    "A clear, shared view of every lead's status",
    "Less manual admin work for your team",
    "Consistent follow-up without relying on memory",
    "A system that scales as your lead volume grows",
  ],
  relatedIndustries: [
    { label: "Real Estate", href: "/industries/real-estate" },
    {
      label: "Professional Services",
      href: "/industries/professional-services",
    },
    { label: "Law Firms", href: "/industries/law-firms" },
    {
      label: "Construction & Contractors",
      href: "/industries/construction-contractors",
    },
  ],
  faqs: [
    {
      question: "Do I need to replace my existing CRM?",
      answer:
        "Not necessarily. This can be built as a lightweight custom system for your specific workflow, or integrated alongside a CRM you already use.",
    },
    {
      question: "How much of this can be automated?",
      answer:
        "Lead capture, routing, and initial follow-up can almost always be fully automated. More nuanced client communication typically stays human — automation handles the parts that shouldn't require a person.",
    },
    {
      question: "Who can access the dashboard?",
      answer:
        "Access is role-based, so you control exactly what each team member can see and do — from full admin access to a limited, task-specific view.",
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
