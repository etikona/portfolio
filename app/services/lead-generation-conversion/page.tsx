import type { Metadata } from "next";
import Navbar from "@/app/Components/Shared/Navbar";
import ServiceLandingTemplate from "@/app/Components/UI/ServiceLandingTemplate";

export const metadata: Metadata = {
  title: "Lead Generation & Conversion",
  description:
    "Landing pages and conversion funnels engineered specifically to turn website traffic into qualified enquiries.",
};

const data = {
  eyebrow: "Service",
  title: "Lead Generation",
  titleAccent: "& Conversion",
  description:
    "Landing pages and funnels engineered around a single goal — turning the traffic you already have into qualified enquiries.",
  overview:
    "Traffic without conversion is just a vanity metric. Most businesses spend money getting people to their site and then lose them on a page with no clear next step, a buried contact form, or messaging that speaks to the business instead of the customer. I design and build conversion-focused pages and funnels — grounded in how your specific buyer actually makes a decision.",
  whatYouGet: [
    {
      title: "Conversion Audit",
      description:
        "A review of your current site or funnel identifying exactly where visitors are dropping off and why.",
    },
    {
      title: "Landing Page Design",
      description:
        "Purpose-built pages structured around a single offer — headline, problem, proof, and a clear call to action.",
    },
    {
      title: "Lead Capture Forms",
      description:
        "Forms designed to reduce friction — asking for only what's necessary, styled to build trust rather than suspicion.",
    },
    {
      title: "CRM & Email Integration",
      description:
        "Leads flow directly into your CRM or inbox the moment they're captured, with automated confirmation where useful.",
    },
    {
      title: "Analytics & Tracking",
      description:
        "Conversion events tracked properly in GA4 or your ad platform, so you can see exactly what's working.",
    },
    {
      title: "A/B Testing Ready",
      description:
        "Built with variant testing in mind, so headlines, offers, or layouts can be tested without a rebuild.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Audit & Strategy",
      description:
        "We identify where your current funnel is leaking visitors and define what a successful conversion actually looks like.",
    },
    {
      step: "02",
      title: "Message Mapping",
      description:
        "Before any design work, I map the messaging structure — the order of information a visitor needs to trust and act.",
    },
    {
      step: "03",
      title: "Design & Build",
      description:
        "A fast, focused page is built around that structure — no unnecessary sections, no distractions from the goal.",
    },
    {
      step: "04",
      title: "Tracking Setup",
      description:
        "Every conversion point is instrumented and tested before launch, so the data is trustworthy from day one.",
    },
    {
      step: "05",
      title: "Launch & Optimize",
      description:
        "Live performance is reviewed after the first weeks of traffic, with adjustments made based on real behaviour.",
    },
  ],
  outcomes: [
    "A measurable increase in lead form submissions",
    "Clear visibility into where visitors drop off",
    "Leads landing directly in your CRM or inbox",
    "A page built to be tested and improved over time",
    "Messaging that speaks to your buyer, not your business",
    "A funnel you can point paid traffic at with confidence",
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
      question: "Do you write the copy too?",
      answer:
        "Yes — I handle the messaging structure and copy for the page itself. You provide the substance about your business; I shape it around what converts.",
    },
    {
      question: "Can this work alongside my existing website?",
      answer:
        "Yes. Landing pages are often built as standalone pages specifically for ad campaigns or specific offers, separate from your main site.",
    },
    {
      question: "How do you measure success?",
      answer:
        "Primarily by conversion rate — the percentage of visitors who complete the desired action — tracked through properly configured analytics from day one.",
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
