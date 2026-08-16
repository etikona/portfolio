import type { Metadata } from "next";
import Navbar from "@/app/Components/Shared/Navbar";
import IndustryLandingTemplate from "@/app/Components/UI/Industrylandingtemplate";

export const metadata: Metadata = {
  title:
    "Web Development for Professional Services | Consultancies & Advisory Firms",
  description:
    "Websites for consultancies, finance, and advisory firms that build authority and generate qualified inbound enquiries — not just a digital business card.",
  keywords: [
    "consultancy website design",
    "financial advisor website",
    "advisory firm website",
    "professional services web development",
  ],
};

const data = {
  eyebrow: "Industry",
  title: "Professional",
  titleAccent: "Services",
  description:
    "Websites for consultancies, financial advisors, and advisory firms — built to demonstrate expertise and turn visitors into qualified enquiries.",
  overview:
    "Prospects evaluating a consultancy or advisory firm are doing real due diligence — comparing your site against competitors, looking for evidence you understand their specific problem. A vague homepage with stock photography and generic claims does nothing to move that decision forward. I build professional services websites that speak directly to a specific client problem, back it up with real proof, and make the next step — a call, a consultation — the obvious action.",
  challenges: [
    {
      title: "Generic Positioning",
      description:
        "Most firms describe themselves as 'strategic', 'client-focused', and 'results-driven' — language so common it differentiates nothing.",
    },
    {
      title: "No Lead Capture Strategy",
      description:
        "The site gets traffic, but there's no systematic way to convert a visitor into a discovery call or consultation request.",
    },
    {
      title: "Thin or Broad Content",
      description:
        "Service pages are either too generic to rank or too broad to convert — not matching the specific language prospects actually search.",
    },
    {
      title: "Weak Proof of Expertise",
      description:
        "Case studies, credentials, and results are missing or buried — exactly the evidence a prospect needs before reaching out.",
    },
    {
      title: "Slow, Text-Heavy Sites",
      description:
        "Professional sites should be fast by nature, but outdated platforms and page bloat routinely slow them down.",
    },
    {
      title: "Not Built for Referrals",
      description:
        "Most advisory firms get work through referrals, but the site does nothing to reinforce that referral once a prospect arrives.",
    },
  ],
  whatWeBuild: [
    {
      title: "Specific Positioning",
      description:
        "Messaging built around the specific client problems you solve and the outcomes you deliver — not interchangeable claims.",
    },
    {
      title: "Consultation Funnel",
      description:
        "Clear, low-friction paths to a discovery call or consultation on every page that matters.",
    },
    {
      title: "Keyword-Targeted Service Pages",
      description:
        "Each service page built around the specific language your prospects use when searching for help with their problem.",
    },
    {
      title: "Authority Architecture",
      description:
        "Case studies, credentials, and results displayed with the prominence that validates expertise at every stage of evaluation.",
    },
    {
      title: "Performance-First Build",
      description:
        "A fast, clean site that reflects the caliber of advice you provide — important when prospects are comparing firms.",
    },
    {
      title: "Referral-Ready Design",
      description:
        "A site that reinforces trust for referred prospects and reflects well on whoever sent them your way.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Discovery",
      description:
        "We map your service lines, ideal client profile, and the specific proof points that build confidence in your market.",
    },
    {
      step: "02",
      title: "Design",
      description:
        "A design that projects the level of expertise and professionalism your advice commands.",
    },
    {
      step: "03",
      title: "Development",
      description:
        "Built on Next.js with consultation booking and content management built in from the start.",
    },
    {
      step: "04",
      title: "Content & SEO",
      description:
        "Service pages, case studies, and credentials structured and optimized for the searches your prospects actually run.",
    },
    {
      step: "05",
      title: "Launch",
      description:
        "Final QA and a live site ready to generate qualified enquiries from day one.",
    },
  ],
  outcomes: [
    "More qualified inbound consultation requests",
    "Clear differentiation from competing firms",
    "Stronger authority positioning in your niche",
    "Higher conversion from referral traffic",
    "Faster load times and improved search visibility",
    "A site that reflects the caliber of your advice",
  ],
  relatedServices: [
    {
      label: "Website Design & Development",
      href: "/services/website-design-development",
    },
    { label: "SEO Foundation", href: "/services/seo-foundation" },
    {
      label: "Lead Generation & Conversion",
      href: "/services/lead-generation-conversion",
    },
    { label: "CRM & Automation", href: "/services/crm-automation" },
  ],
  faqs: [
    {
      question: "We're a small advisory firm — is this overkill for us?",
      answer:
        "Not at all. The same principles apply whether you're a solo consultant or a multi-partner firm — the site just needs to reflect your actual scale and positioning accurately.",
    },
    {
      question: "Can you help with case study content?",
      answer:
        "You provide the client outcomes and results; I handle the structure and copy so each case study makes the strongest possible case for your expertise.",
    },
    {
      question: "Do you integrate with scheduling tools like Calendly?",
      answer:
        "Yes — consultation and discovery call booking can be integrated directly into the site using your preferred scheduling tool.",
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
            serviceType: "Professional Services Web Development",
            name: "Professional Services Website Design & Development",
            description: metadata.description,
            provider: { "@type": "Organization", name: "Eti Studio" },
            areaServed: "Worldwide",
          }),
        }}
      />
    </>
  );
}
