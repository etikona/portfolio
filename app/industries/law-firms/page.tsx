import type { Metadata } from "next";
import Navbar from "@/app/Components/Shared/Navbar";
import IndustryLandingTemplate from "@/app/Components/UI/Industrylandingtemplate";

export const metadata: Metadata = {
  title: "Web Development for Law Firms | Authority-Building Websites",
  description:
    "Authority-building websites for law firms that build trust and convert visitors into consultation requests — not just another directory listing.",
  keywords: [
    "law firm website design",
    "attorney website",
    "legal website development",
    "law firm lead generation",
  ],
};

const data = {
  eyebrow: "Industry",
  title: "Law",
  titleAccent: "Firms",
  description:
    "Authority-building websites for law firms — designed to build trust with a stressed, skeptical prospect and convert that trust into a consultation request.",
  overview:
    "Someone researching a law firm is usually dealing with something serious — a dispute, a transaction, a decision with real consequences. They're comparing firms on the only evidence they have: your website. A generic template with vague language about 'excellence' and 'dedication' does nothing to differentiate you or ease that visitor's uncertainty. I build law firm websites that demonstrate specific expertise, answer the questions a prospect actually has, and make the path to a consultation obvious.",
  challenges: [
    {
      title: "Generic Practice Area Pages",
      description:
        "Most firm sites list practice areas in vague, interchangeable language that could apply to any firm — nothing differentiates real expertise.",
    },
    {
      title: "No Clear Consultation Path",
      description:
        "Visitors land on the site, read a bio, and leave — there's no structured, low-friction way to request a consultation.",
    },
    {
      title: "Missing Trust Signals",
      description:
        "Credentials, case results, bar admissions, and client testimonials are buried or missing — exactly what an anxious prospect looks for.",
    },
    {
      title: "Slow, Dated Design",
      description:
        "A slow, outdated site undermines credibility at the exact moment a prospect is deciding whether to trust you with something serious.",
    },
    {
      title: "Weak Local SEO",
      description:
        "Firms rarely have the technical SEO foundation needed to rank for the specific, high-intent searches prospects actually use.",
    },
    {
      title: "Not Built for Referrals",
      description:
        "Referred prospects land on a site that does nothing to reinforce the referral or make the referring party look good.",
    },
  ],
  whatWeBuild: [
    {
      title: "Specific Practice Area Pages",
      description:
        "Pages built around the specific problems and outcomes clients search for — not generic descriptions any firm could claim.",
    },
    {
      title: "Consultation-First Structure",
      description:
        "Clear, low-friction consultation requests on every relevant page, designed to convert a nervous first-time visitor.",
    },
    {
      title: "Authority Architecture",
      description:
        "Attorney bios, credentials, case results, and publications displayed with the prominence they deserve — building confidence at every stage.",
    },
    {
      title: "Fast, Professional Design",
      description:
        "A fast-loading, polished site that signals competence before a single word is read.",
    },
    {
      title: "Local SEO Foundation",
      description:
        "Structured data and location-based SEO targeting the specific, high-intent searches your prospects actually use.",
    },
    {
      title: "Referral-Ready Presentation",
      description:
        "A site that reinforces trust for referred prospects and makes the referring party look good for the recommendation.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Discovery",
      description:
        "We map your practice areas, target client profile, and the specific questions prospects have before they'll pick up the phone.",
    },
    {
      step: "02",
      title: "Design",
      description:
        "A design built to project competence and calm — the tone a stressed prospect needs to see.",
    },
    {
      step: "03",
      title: "Development",
      description:
        "Built on Next.js with consultation forms and structured content, ready for your team to manage.",
    },
    {
      step: "04",
      title: "Content & SEO",
      description:
        "Practice area pages, attorney bios, and case results are structured and optimized for the searches your prospects use.",
    },
    {
      step: "05",
      title: "Launch",
      description:
        "Final QA and a live site ready to convert visitors into consultation requests from day one.",
    },
  ],
  outcomes: [
    "More qualified consultation requests",
    "Clear differentiation from other firms in your market",
    "Increased trust from first-time website visitors",
    "Higher conversion from referral traffic",
    "Stronger visibility for high-intent local searches",
    "A site your partners are proud to send prospects to",
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
    { label: "Website Redesign", href: "/services/website-redesign" },
  ],
  faqs: [
    {
      question: "Can you write the practice area copy for us?",
      answer:
        "You provide the substance — your practice areas, case types, and results — and I structure and refine it into copy built around what prospects actually search for.",
    },
    {
      question: "Do you handle attorney advertising compliance considerations?",
      answer:
        "I build the site to your specifications, including any required disclaimers or jurisdiction-specific language — you and your bar association's guidelines take precedence, and I'll implement exactly what's required.",
    },
    {
      question: "Can multiple attorneys manage their own bios and content?",
      answer:
        "Yes — the site includes an admin area with role-based access, so individual attorneys can update their own bios and case results.",
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
            serviceType: "Law Firm Web Development",
            name: "Law Firm Website Design & Development",
            description: metadata.description,
            provider: { "@type": "Organization", name: "Eti Studio" },
            areaServed: "Worldwide",
          }),
        }}
      />
    </>
  );
}
