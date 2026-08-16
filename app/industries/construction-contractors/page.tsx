import type { Metadata } from "next";
import Navbar from "@/app/Components/Shared/Navbar";
import IndustryLandingTemplate from "@/app/Components/UI/Industrylandingtemplate";

export const metadata: Metadata = {
  title: "Web Development for Construction & Contractors | Project Portfolios",
  description:
    "Project portfolio and tender-ready websites for construction companies and contractors — built to win work before the first meeting.",
  keywords: [
    "construction company website",
    "contractor website design",
    "tender-ready website",
    "construction portfolio site",
  ],
};

const data = {
  eyebrow: "Industry",
  title: "Construction &",
  titleAccent: "Contractors",
  description:
    "Project portfolio and tender-ready websites for developers and contractors — built to win the shortlist before the first call.",
  overview:
    "Clients and procurement teams shortlist contractors based on what they see online, long before they issue a tender or request a meeting. A dated site with poor photo presentation and no clear project narrative costs you work — even when your actual builds are excellent. I build construction and contractor websites that showcase completed projects with the same quality they were built to, and structure the enquiry path so tender requests land directly in your inbox.",
  challenges: [
    {
      title: "Weak Portfolio Presentation",
      description:
        "Project galleries on dated platforms don't do justice to high-quality construction work — poor layout undercuts genuinely impressive builds.",
    },
    {
      title: "Slow Image Galleries",
      description:
        "Construction sites are naturally image-heavy. Without proper optimization, project galleries load slowly and lose visitors before they see the work.",
    },
    {
      title: "No Project Narrative",
      description:
        "Sites show before-and-after photos but never explain the scope, the challenge, or the solution — the story that actually wins client confidence.",
    },
    {
      title: "No Clear Tender Path",
      description:
        "There's no structured way for a potential client to submit a project brief or request a quote through the site.",
    },
    {
      title: "Missing Credentials",
      description:
        "Certifications, safety records, and industry memberships aren't displayed — missing the trust signals procurement teams look for.",
    },
    {
      title: "Poor Mobile Experience",
      description:
        "Site managers and clients view your site on-site, on a phone. A poor mobile experience loses exactly the prospects who matter most.",
    },
  ],
  whatWeBuild: [
    {
      title: "Project Showcase System",
      description:
        "A custom portfolio with category filtering and rich imagery — built to present each project the way a case study deserves.",
    },
    {
      title: "Fast, Optimized Galleries",
      description:
        "Large project galleries that load quickly on every device, with automatic image compression that never sacrifices quality.",
    },
    {
      title: "Project Story Pages",
      description:
        "Dedicated pages for each project — scope, challenge, solution, and outcome — giving prospects real evidence of capability.",
    },
    {
      title: "Structured Tender Forms",
      description:
        "Enquiry forms that capture project scope, timeline, and budget upfront — reducing back-and-forth before the first call.",
    },
    {
      title: "Credentials & Accreditations",
      description:
        "Certifications, safety records, and industry memberships displayed prominently, right where evaluating clients look for them.",
    },
    {
      title: "Mobile-First Build",
      description:
        "A site that looks sharp on a phone — ideal for the site manager sharing your URL with a client mid-visit.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Discovery",
      description:
        "We review your existing project portfolio, target client type, and what a qualified enquiry actually looks like for your business.",
    },
    {
      step: "02",
      title: "Design",
      description:
        "A design built around showcasing completed work — the visual hierarchy your portfolio deserves.",
    },
    {
      step: "03",
      title: "Development",
      description:
        "Built on Next.js with a project management dashboard so new projects and photos are easy to add.",
    },
    {
      step: "04",
      title: "Content Build-Out",
      description:
        "Existing projects migrated into story-page format, credentials added, and every page configured for local SEO.",
    },
    {
      step: "05",
      title: "Launch",
      description:
        "Final QA, team walkthrough of the admin dashboard, and a live site ready to receive tender enquiries.",
    },
  ],
  outcomes: [
    "Shortlisted more often based on portfolio quality alone",
    "Faster gallery load times on every device",
    "More qualified tender enquiries, less back-and-forth",
    "A presentation that matches your actual build quality",
    "Credentials visible to every evaluating client",
    "A site you're comfortable sharing on any project",
  ],
  relatedServices: [
    {
      label: "Website Design & Development",
      href: "/services/website-design-development",
    },
    { label: "CRM & Automation", href: "/services/crm-automation" },
    { label: "SEO Foundation", href: "/services/seo-foundation" },
    {
      label: "Custom Web Applications",
      href: "/services/custom-web-applications",
    },
  ],
  faqs: [
    {
      question:
        "Can you build a project management dashboard alongside the site?",
      answer:
        "Yes — many contractor clients pair their portfolio site with a custom dashboard for tracking active projects, documents, or client communication. This falls under Custom Web Applications.",
    },
    {
      question: "How many projects can the portfolio hold?",
      answer:
        "The system is built to scale from a handful of flagship projects to a large, filterable archive — the structure doesn't need to change as your portfolio grows.",
    },
    {
      question: "Do you handle the project photography and copy?",
      answer:
        "You provide the photos and project details; I handle the structure, copywriting refinement, and how each project is presented to make the strongest case.",
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
            serviceType: "Construction & Contractor Web Development",
            name: "Construction & Contractor Website Design",
            description: metadata.description,
            provider: { "@type": "Organization", name: "Eti Studio" },
            areaServed: "Worldwide",
          }),
        }}
      />
    </>
  );
}
