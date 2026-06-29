"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Send,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-left > *",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".contact-left", start: "top 82%" },
        },
      );
      gsap.fromTo(
        ".contact-form",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".contact-form", start: "top 82%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
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
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: "0.5rem",
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Contact"
      style={{ padding: "8rem 2rem" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "6rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left */}
          <div className="contact-left">
            <span
              className="tag"
              style={{ marginBottom: "1.25rem", display: "inline-flex" }}
            >
              Contact
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--fg)",
                lineHeight: 1.2,
                marginBottom: "1.25rem",
              }}
            >
              Let&apos;s build something{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
                together.
              </em>
            </h2>
            <p
              style={{
                color: "var(--muted)",
                lineHeight: 1.85,
                fontSize: "0.95rem",
                marginBottom: "2.5rem",
              }}
            >
              Whether you have a project in mind, want to discuss a technical
              challenge, or just want to connect — my inbox is open. I typically
              respond within 24 hours.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "etikonapal@gmail.com",
                  href: "mailto:your@gmail.com",
                },
                {
                  icon: MapPin,
                  label: "Location",
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
                    gap: "0.85rem",
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
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={15} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.72rem",
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
                          fontSize: "0.9rem",
                          color: "var(--fg)",
                          textDecoration: "none",
                          transition: "color 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--accent)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--fg)")
                        }
                      >
                        {value}
                      </a>
                    ) : (
                      <div style={{ fontSize: "0.9rem", color: "var(--fg)" }}>
                        {value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div
            className="contact-form"
            style={{
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "2.5rem",
              background: "var(--surface)",
            }}
          >
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
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
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
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
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
              <label style={labelStyle} htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="What's this about?"
                value={form.subject}
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

            <div style={{ marginBottom: "1.75rem" }}>
              <label style={labelStyle} htmlFor="message">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project or idea..."
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

            {/* Status messages */}
            {status === "success" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.85rem 1rem",
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "4px",
                  fontSize: "0.85rem",
                  color: "#16a34a",
                  marginBottom: "1.25rem",
                }}
              >
                <CheckCircle size={16} />
                Message sent! I&apos;ll be in touch soon.
              </div>
            )}
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
                <AlertCircle size={16} />
                Something went wrong. Please try emailing directly.
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === "sending"}
              style={{
                width: "100%",
                padding: "0.9rem 1.75rem",
                background: status === "sending" ? "var(--muted)" : "var(--fg)",
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
                transition: "background 0.2s ease",
                fontFamily: "'Inter', sans-serif",
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
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
        @media (max-width: 500px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
