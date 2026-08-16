import type { Metadata } from "next";

// import PageHero from "@/components/ui/PageHero";
// import CtaBanner from "@/components/ui/CtaBanner";
import { MapPin, Globe2, MessageCircle, Clock, Compass } from "lucide-react";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founder-led web design and development for real estate, construction, law firms, and professional services — based in Dhaka, working worldwide.",
};

const stack = [
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "TailwindCSS", "GSAP"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST API", "JWT Auth", "Nodemailer"],
  },
  {
    category: "Database",
    items: ["MongoDB Atlas", "Mongoose", "Redis", "PostgreSQL"],
  },
  {
    category: "Infrastructure",
    items: ["Vercel", "Render", "Cloudinary", "GitHub Actions"],
  },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    desc: "We talk through your business, your customers, and what a successful website actually needs to do for you — before a single pixel is designed.",
  },
  {
    step: "02",
    title: "Strategy & Architecture",
    desc: "I map the site structure, content plan, and conversion path. This is where a good website is actually won or lost.",
  },
  {
    step: "03",
    title: "Design",
    desc: "Custom visual design built around your brand and your audience — reviewed and approved before development starts.",
  },
  {
    step: "04",
    title: "Development",
    desc: "Built in Next.js with clean, maintainable code. You get staging previews throughout so nothing launches as a surprise.",
  },
  {
    step: "05",
    title: "Launch & Handoff",
    desc: "QA, performance tuning, SEO setup, and a live site — with a walkthrough so you know exactly how everything works.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "68px" }}>
        {/* <PageHero
          eyebrow="About"
          title="I build websites that"
          titleAccent="carry their weight."
          description="I'm Eti — a founder-led web designer and developer working with real estate, construction, law, and professional service businesses that need their website to actually produce clients."
        /> */}

        {/* Who am I / Why I started */}
        <section
          style={{
            padding: "6rem 2rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <div style={{ marginBottom: "3.5rem" }}>
              <span
                className="tag"
                style={{ marginBottom: "1.25rem", display: "inline-flex" }}
              >
                Who I Am
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "var(--fg)",
                  marginBottom: "1.25rem",
                  lineHeight: 1.3,
                }}
              >
                A developer who got tired of watching good businesses lose to
                bad websites.
              </h2>
              <p
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.9,
                  fontSize: "0.98rem",
                  marginBottom: "1.1rem",
                }}
              >
                I&apos;m a full-stack web designer and developer. I design the
                interface, write the code, configure the SEO, and ship the final
                product myself — no account managers, no outsourced developers,
                no game of telephone between you and the person actually
                building your site.
              </p>
              <p
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.9,
                  fontSize: "0.98rem",
                }}
              >
                I work with business owners who are good at what they do —
                closing deals, managing projects, advising clients — but whose
                website has never been treated as seriously as the rest of their
                business.
              </p>
            </div>

            <div>
              <span
                className="tag"
                style={{ marginBottom: "1.25rem", display: "inline-flex" }}
              >
                Why I Started This
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "var(--fg)",
                  marginBottom: "1.25rem",
                  lineHeight: 1.3,
                }}
              >
                I kept seeing the same expensive mistake.
              </h2>
              <p
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.9,
                  fontSize: "0.98rem",
                  marginBottom: "1.1rem",
                }}
              >
                Early in my career, I built websites for agencies that treated
                every project the same way — same template, same generic copy,
                same &ldquo;launch it and move on&rdquo; approach. I watched
                clients pay real money for sites that never generated a single
                enquiry, and nobody seemed to think that was a problem worth
                solving.
              </p>
              <p
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.9,
                  fontSize: "0.98rem",
                }}
              >
                So I started working directly with business owners instead —
                real estate agencies, contractors, law firms, consultancies —
                and building websites the way I always thought they should be
                built: around the customer&apos;s decision, not around what
                looks impressive in a portfolio.
              </p>
            </div>
          </div>
        </section>

        {/* What I specialize in */}
        <section
          style={{
            padding: "6rem 2rem",
            borderBottom: "1px solid var(--border)",
            background: "var(--surface)",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ maxWidth: "640px", marginBottom: "3rem" }}>
              <span
                className="tag"
                style={{ marginBottom: "1.25rem", display: "inline-flex" }}
              >
                What I Specialize In
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "var(--fg)",
                  lineHeight: 1.25,
                }}
              >
                Websites where trust and clarity decide the sale.
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1.25rem",
              }}
              className="specialize-grid"
            >
              {[
                {
                  title: "Real Estate",
                  desc: "Property platforms and agency sites built to generate qualified buyer leads.",
                },
                {
                  title: "Construction & Contractors",
                  desc: "Project portfolios and tender-ready sites that win work before the first meeting.",
                },
                {
                  title: "Law Firms",
                  desc: "Authority-building sites that convert visitors into consultation requests.",
                },
                {
                  title: "Professional Services",
                  desc: "Consultancy and advisory sites built around inbound enquiry generation.",
                },
              ].map(({ title, desc }) => (
                <div
                  key={title}
                  style={{
                    padding: "1.75rem",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    background: "var(--bg)",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--accent)",
                      marginBottom: "1rem",
                    }}
                  />
                  <h3
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "var(--fg)",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--muted)",
                      lineHeight: 1.7,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Development expertise */}
        <section
          style={{
            padding: "6rem 2rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ maxWidth: "640px", marginBottom: "3rem" }}>
              <span
                className="tag"
                style={{ marginBottom: "1.25rem", display: "inline-flex" }}
              >
                Development Expertise
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "var(--fg)",
                  lineHeight: 1.25,
                  marginBottom: "1.1rem",
                }}
              >
                Modern tools. No unnecessary complexity.
              </h2>
              <p
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.85,
                  fontSize: "0.95rem",
                }}
              >
                Every site is built on a modern, maintainable stack — fast by
                default, easy to extend, and yours to own outright. No
                page-builder lock-in, no mystery plugins.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1.25rem",
              }}
              className="stack-grid"
            >
              {stack.map(({ category, items }) => (
                <div
                  key={category}
                  style={{
                    padding: "1.75rem",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      marginBottom: "1rem",
                    }}
                  >
                    {category}
                  </h3>
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.4rem",
                    }}
                  >
                    {items.map((item) => (
                      <li
                        key={item}
                        style={{ fontSize: "0.85rem", color: "var(--fg)" }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section
          style={{
            padding: "6rem 2rem",
            borderBottom: "1px solid var(--border)",
            background: "var(--surface)",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ marginBottom: "3rem" }}>
              <span
                className="tag"
                style={{ marginBottom: "1.25rem", display: "inline-flex" }}
              >
                My Process
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "var(--fg)",
                }}
              >
                Five stages. No surprises.
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {process.map((p, i) => (
                <div
                  key={p.step}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "70px 1fr",
                    gap: "1.75rem",
                    padding: "1.75rem 0",
                    borderBottom:
                      i < process.length - 1
                        ? "1px solid var(--border)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "2.2rem",
                      fontWeight: 600,
                      color: "var(--border)",
                      lineHeight: 1,
                    }}
                  >
                    {p.step}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "var(--fg)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--muted)",
                        lineHeight: 1.75,
                        maxWidth: "560px",
                      }}
                    >
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Where based / Who I work with / International / Communication / Availability */}
        <section
          style={{
            padding: "6rem 2rem",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ maxWidth: "640px", marginBottom: "3rem" }}>
              <span
                className="tag"
                style={{ marginBottom: "1.25rem", display: "inline-flex" }}
              >
                How I Work
              </span>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "var(--fg)",
                }}
              >
                The practical details.
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1.5rem",
              }}
              className="how-grid"
            >
              {[
                {
                  icon: MapPin,
                  title: "Where I'm Based",
                  desc: "I'm based in Dhaka, Bangladesh — but every part of my process is built to work remotely. Design reviews, staging links, and calls all happen without you needing to be in the same room, or timezone, as me.",
                },
                {
                  icon: Compass,
                  title: "Who I Work With",
                  desc: "Independent professionals and small-to-mid-sized businesses in real estate, construction, law, and professional services — usually the owner or a senior decision-maker who wants direct access to the person building their site.",
                },
                {
                  icon: Globe2,
                  title: "International Projects",
                  desc: "Most of my clients are outside Bangladesh — Europe, the UAE, Australia, and New Zealand. Every project runs on async-first communication with scheduled overlap calls, so distance is never a bottleneck.",
                },
                {
                  icon: MessageCircle,
                  title: "Communication",
                  desc: "You'll always know where your project stands. I work in short, regular updates — staging links, brief written progress notes, and a direct line to me, not a support ticket queue.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  style={{
                    padding: "2rem",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    background: "var(--surface)",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <Icon size={17} />
                  </div>
                  <h3
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "var(--fg)",
                      marginBottom: "0.65rem",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.87rem",
                      color: "var(--muted)",
                      lineHeight: 1.78,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Availability strip */}
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1.75rem 2rem",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                background: "var(--fg)",
                color: "var(--bg)",
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent)",
                  flexShrink: 0,
                }}
              >
                <Clock size={17} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    marginBottom: "0.35rem",
                  }}
                >
                  Availability
                </h3>
                <p
                  style={{ fontSize: "0.85rem", opacity: 0.7, lineHeight: 1.7 }}
                >
                  I take on a limited number of projects at a time so every
                  client gets direct access to me — not a rotating team. Current
                  availability and timelines are confirmed on our first call.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section style={{ padding: "6rem 2rem" }}>
          <div
            style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}
          >
            <span
              className="tag"
              style={{ marginBottom: "1.5rem", display: "inline-flex" }}
            >
              My Philosophy
            </span>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontStyle: "italic",
                fontWeight: 500,
                color: "var(--fg)",
                lineHeight: 1.5,
              }}
            >
              &ldquo;A website is not a design exercise. It&apos;s the first
              conversation you have with every future client — and it should be
              treated with exactly that much seriousness.&rdquo;
            </p>
          </div>
        </section>

        {/* <CtaBanner
          title="Let's build yours."
          description="Tell me about your business and what your website should be doing for it. I'll tell you honestly whether I'm the right fit."
          primaryLabel="Get in Touch"
          primaryHref="/contact"
          secondaryLabel="View Services"
          secondaryHref="/services"
        /> */}
      </main>

      <style>{`
        @media (max-width: 900px) {
          .specialize-grid, .stack-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .how-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .specialize-grid, .stack-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
