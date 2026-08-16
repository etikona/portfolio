"use client";

import { useState } from "react";

import {
  Send,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import Footer from "../Components/Shared/Footer";
import Navbar from "../Components/Shared/Navbar";

const industryOptions = [
  "Real Estate",
  "Construction & Contractors",
  "Law Firms",
  "Professional Services",
  "Architecture & Design",
  "Other",
];

const budgetOptions = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Not sure yet",
];

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
    industry: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: `New Enquiry — ${form.industry || "General"}`,
          message: `Website: ${form.website || "N/A"}\nIndustry: ${form.industry || "N/A"}\nBudget: ${form.budget || "N/A"}\n\nMessage:\n${form.message}`,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({
        name: "",
        email: "",
        website: "",
        industry: "",
        budget: "",
        message: "",
      });
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.85rem 1rem",
    background: "var(--bg)",
    border: "1px solid var(--border)",
    borderRadius: "4px",
    fontSize: "0.9rem",
    color: "var(--fg)",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: "0.5rem",
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "68px" }}>
        {/* Header */}
        <section
          style={{
            padding: "6rem 2rem 4rem",
            borderBottom: "1px solid var(--border)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              opacity: 0.3,
            }}
          />
          <div
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              textAlign: "center",
              position: "relative",
            }}
          >
            <span
              className="tag"
              style={{ marginBottom: "1.5rem", display: "inline-flex" }}
            >
              Get in Touch
            </span>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 5vw, 3.4rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                color: "var(--fg)",
                lineHeight: 1.15,
                marginBottom: "1.25rem",
              }}
            >
              Let&apos;s talk about your{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
                website.
              </em>
            </h1>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--muted)",
                lineHeight: 1.8,
                maxWidth: "540px",
                margin: "0 auto",
              }}
            >
              Tell me a bit about your business and I&apos;ll come back to you
              with a straight answer — whether that&apos;s a free audit, a
              proposal, or an honest &ldquo;I&apos;m not the right fit for
              this.&rdquo;
            </p>
          </div>
        </section>

        {/* Form + sidebar */}
        <section style={{ padding: "5rem 2rem 6rem" }}>
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: "5rem",
              alignItems: "start",
            }}
            className="contact-layout"
          >
            {/* Form */}
            {status === "success" ? (
              <div
                style={{
                  padding: "4rem 2rem",
                  border: "1px solid #bbf7d0",
                  borderRadius: "6px",
                  background: "#f0fdf4",
                  textAlign: "center",
                }}
              >
                <CheckCircle
                  size={40}
                  style={{ color: "#16a34a", margin: "0 auto 1.25rem" }}
                />
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.6rem",
                    fontWeight: 600,
                    color: "var(--fg)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Message received.
                </h2>
                <p
                  style={{
                    color: "var(--muted)",
                    lineHeight: 1.75,
                    fontSize: "0.92rem",
                  }}
                >
                  I&apos;ll get back to you within 24 hours on business days.
                  Check your inbox — including spam, just in case.
                </p>
              </div>
            ) : (
              <div
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  padding: "2.5rem",
                  background: "var(--surface)",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    color: "var(--fg)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Tell me about your project
                </h2>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--muted)",
                    marginBottom: "2rem",
                    lineHeight: 1.65,
                  }}
                >
                  Takes about two minutes. I read every message myself.
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.25rem",
                    marginBottom: "1.25rem",
                  }}
                  className="form-row"
                >
                  <div>
                    <label style={labelStyle} htmlFor="name">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "var(--accent)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "var(--border)")
                      }
                    />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "var(--accent)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "var(--border)")
                      }
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={labelStyle} htmlFor="website">
                    Current Website (if any)
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={form.website}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "var(--accent)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "var(--border)")
                    }
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.25rem",
                    marginBottom: "1.25rem",
                  }}
                  className="form-row"
                >
                  <div>
                    <label style={labelStyle} htmlFor="industry">
                      Industry
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={form.industry}
                      onChange={handleChange}
                      style={{ ...inputStyle, appearance: "none" }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "var(--accent)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "var(--border)")
                      }
                    >
                      <option value="">Select your industry</option>
                      {industryOptions.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="budget">
                      Estimated Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      style={{ ...inputStyle, appearance: "none" }}
                      onFocus={(e) =>
                        (e.currentTarget.style.borderColor = "var(--accent)")
                      }
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "var(--border)")
                      }
                    >
                      <option value="">Select a range</option>
                      {budgetOptions.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "1.75rem" }}>
                  <label style={labelStyle} htmlFor="message">
                    What do you need? *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your business, your current website situation, and what you're hoping to achieve..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: "140px",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "var(--accent)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "var(--border)")
                    }
                  />
                </div>

                {status === "error" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      padding: "0.85rem 1rem",
                      background: "#fef2f2",
                      border: "1px solid #fecaca",
                      borderRadius: "4px",
                      fontSize: "0.85rem",
                      color: "#dc2626",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <AlertCircle size={16} /> Something went wrong. Please try
                    emailing directly.
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  style={{
                    width: "100%",
                    padding: "0.9rem 1.75rem",
                    background:
                      status === "sending" ? "var(--muted)" : "var(--fg)",
                    color: "var(--bg)",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    fontFamily: "'Inter', sans-serif",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "sending")
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#333";
                  }}
                  onMouseLeave={(e) => {
                    if (status !== "sending")
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "var(--fg)";
                  }}
                >
                  <Send size={15} />
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>

                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--muted)",
                    textAlign: "center",
                    marginTop: "1rem",
                    lineHeight: 1.6,
                  }}
                >
                  No spam, no auto-dialed sales calls. Just a reply from me.
                </p>
              </div>
            )}

            {/* Sidebar */}
            <div
              style={{
                position: "sticky",
                top: "90px",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
              className="contact-sidebar"
            >
              {/* Direct contact */}
              <div
                style={{
                  padding: "1.5rem",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  background: "var(--surface)",
                }}
              >
                <h3
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "1.1rem",
                  }}
                >
                  Direct Contact
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: "etikonapal@gmail.com",
                      href: "mailto:etikonapal@gmail.com",
                    },
                    {
                      icon: MapPin,
                      label: "Based in",
                      value: "Dhaka, Bangladesh",
                      href: undefined,
                    },
                    {
                      icon: Clock,
                      label: "Response time",
                      value: "Within 24 hours",
                      href: undefined,
                    },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <div
                        style={{
                          width: "34px",
                          height: "34px",
                          border: "1px solid var(--border)",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--accent)",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={14} />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.68rem",
                            color: "var(--muted)",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            fontWeight: 600,
                          }}
                        >
                          {label}
                        </div>
                        {href ? (
                          <a
                            href={href}
                            style={{
                              fontSize: "0.86rem",
                              color: "var(--fg)",
                              textDecoration: "none",
                            }}
                          >
                            {value}
                          </a>
                        ) : (
                          <div
                            style={{ fontSize: "0.86rem", color: "var(--fg)" }}
                          >
                            {value}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What happens next */}
              <div
                style={{
                  padding: "1.5rem",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  background: "var(--surface)",
                }}
              >
                <h3
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "1.1rem",
                  }}
                >
                  What Happens Next
                </h3>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "0" }}
                >
                  {[
                    { step: "1", text: "You send your project details" },
                    { step: "2", text: "I review and reply within 24 hours" },
                    { step: "3", text: "We hop on a short call if it's a fit" },
                    { step: "4", text: "You get a clear proposal & timeline" },
                  ].map(({ step, text }, i, arr) => (
                    <div
                      key={step}
                      style={{
                        display: "flex",
                        gap: "0.85rem",
                        paddingBottom: i < arr.length - 1 ? "1rem" : "0",
                        marginBottom: i < arr.length - 1 ? "1rem" : "0",
                        borderBottom:
                          i < arr.length - 1
                            ? "1px solid var(--border)"
                            : "none",
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          background: "var(--fg)",
                          color: "var(--bg)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {step}
                      </span>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--fg)",
                          lineHeight: 1.5,
                        }}
                      >
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div
                style={{
                  padding: "1.5rem",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  background: "var(--fg)",
                  color: "var(--bg)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    marginBottom: "0.6rem",
                  }}
                >
                  <MessageCircle size={16} style={{ color: "var(--accent)" }} />
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                    }}
                  >
                    Not ready to commit?
                  </div>
                </div>
                <p
                  style={{ fontSize: "0.8rem", lineHeight: 1.7, opacity: 0.7 }}
                >
                  Ask for a free website audit instead — I&apos;ll review your
                  current site and send back honest, specific feedback either
                  way.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @media (max-width: 960px) {
          .contact-layout { grid-template-columns: 1fr !important; }
          .contact-sidebar { position: static !important; }
        }
        @media (max-width: 560px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
