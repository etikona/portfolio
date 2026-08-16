import type { Metadata } from "next";
import Navbar from "@/app/Components/Shared/Navbar";
import IndustryLandingTemplate from "@/app/Components/UI/Industrylandingtemplate";

export const metadata: Metadata = {
  title:
    "Web Development for Real Estate | Property Platforms & Lead Generation",
  description:
    "Real estate websites built for lead generation — property listing platforms, developer showcase sites, and agency websites that convert buyers.",
  keywords: [
    "real estate website design",
    "property listing platform",
    "real estate lead generation",
    "real estate developer website",
  ],
};

const data = {
  eyebrow: "Industry",
  title: "Real",
  titleAccent: "Estate",
  description:
    "Property platforms, listings, and lead generation systems built for agencies and developers whose website has to work as hard as their sales team.",
  overview:
    "A buyer deciding on a six-figure property makes that decision online first. If your listings load slowly, your search filters are clunky, or there's no clear way to enquire about a property, you've lost that lead before your sales team ever gets the chance to speak with them. I build real estate platforms specifically around how buyers actually search, compare, and decide — with the backend tools your team needs to manage listings without touching code.",
  challenges: [
    {
      title: "Template Agency Sites",
      description:
        "Most agencies run the same off-the-shelf template as 200 competitors in the same market — nothing differentiates the listing or the agency.",
    },
    {
      title: "Slow, Heavy Galleries",
      description:
        "Property sites are image-heavy by nature. Without proper optimization, listing pages load slowly — killing both rankings and buyer patience.",
    },
    {
      title: "No Real Lead Capture",
      description:
        "Traffic arrives, browses a few listings, and leaves. There's no systematic way to capture, qualify, and route enquiries to the right agent.",
    },
    {
      title: "Clunky Search & Filtering",
      description:
        "Buyers abandon listings pages that don't let them filter by the specifics that matter — price, location, bedrooms, property type.",
    },
    {
      title: "Manual Listing Updates",
      description:
        "Every new listing or price change requires a developer, so the site is permanently a step behind the actual inventory.",
    },
    {
      title: "No Local SEO Foundation",
      description:
        "Missing structured data and location-based optimization means the site doesn't appear for the searches buyers actually use.",
    },
  ],
  whatWeBuild: [
    {
      title: "Custom Listing Platform",
      description:
        "A property search and listing engine built around your specific inventory — filters, map view, and gallery designed for how your buyers browse.",
    },
    {
      title: "Fast, Optimized Galleries",
      description:
        "Cloudinary-powered image delivery with automatic compression and lazy loading — full-quality photography without the load-time penalty.",
    },
    {
      title: "Structured Lead Capture",
      description:
        "Enquiry forms on every listing, lead routing to the right agent, and CRM integration so no enquiry is ever missed.",
    },
    {
      title: "Self-Service Admin Dashboard",
      description:
        "Your team adds, edits, and updates listings directly — status changes, price updates, and new inventory, all without a developer.",
    },
    {
      title: "Map-Based Search",
      description:
        "Interactive map search with radius filtering, so buyers can browse by neighborhood the way they naturally think about location.",
    },
    {
      title: "Local SEO Setup",
      description:
        "Property and real estate structured data, plus city and suburb-level SEO targeting, so your listings actually get found.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Discovery",
      description:
        "We map your inventory structure, buyer journey, and the specific filters and search behavior your market needs.",
    },
    {
      step: "02",
      title: "Design",
      description:
        "A custom listing and search experience designed around your brand and how your buyers actually browse properties.",
    },
    {
      step: "03",
      title: "Development",
      description:
        "Built on Next.js with a custom admin dashboard — listings, leads, and content all managed from one place.",
    },
    {
      step: "04",
      title: "Migration & SEO",
      description:
        "Existing listings migrated, structured data configured, and every page set up to rank for local property searches.",
    },
    {
      step: "05",
      title: "Launch",
      description:
        "Final QA, agent training on the admin dashboard, and a live platform ready to capture leads from day one.",
    },
  ],
  outcomes: [
    "A listings platform that matches the scale of your inventory",
    "Faster page loads without sacrificing photo quality",
    "Every enquiry captured and routed automatically",
    "A team that manages listings without developer help",
    "Higher visibility for local property searches",
    "A site that reflects the quality of your properties",
  ],
  relatedServices: [
    {
      label: "Website Design & Development",
      href: "/services/website-design-development",
    },
    {
      label: "Lead Generation & Conversion",
      href: "/services/lead-generation-conversion",
    },
    { label: "CRM & Automation", href: "/services/crm-automation" },
    { label: "SEO Foundation", href: "/services/seo-foundation" },
  ],
  faqs: [
    {
      question: "Can you integrate with our existing MLS or listing feed?",
      answer:
        "Yes — listing feeds and third-party data sources can be integrated directly into the platform so your inventory stays in sync automatically.",
    },
    {
      question: "How many listings can the platform handle?",
      answer:
        "The architecture is built to scale from a handful of properties to thousands of listings without a redesign — the database and search are designed for growth from day one.",
    },
    {
      question: "Can my agents manage their own listings?",
      answer:
        "Yes, the admin dashboard supports role-based access, so individual agents can manage their own listings while admins retain full oversight.",
    },
  ],
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="pt-[68px]">
        <IndustryLandingTemplate data={data} />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Real Estate Web Development",
            name: "Real Estate Website Design & Development",
            description: metadata.description,
            provider: { "@type": "Organization", name: "Eti Studio" },
            areaServed: "Worldwide",
          }),
        }}
      />
    </>
  );
}
