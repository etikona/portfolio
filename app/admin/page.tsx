"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [passkey, setPasskey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // If already authenticated in this session, go straight to dashboard
    if (typeof window !== "undefined" && sessionStorage.getItem("admin_key")) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!passkey.trim()) return;

    setLoading(true);
    setError("");

    // Verify the key against the API
    try {
      const res = await fetch("/api/posts?all=true", {
        headers: { "x-api-key": passkey.trim() },
      });

      if (res.ok) {
        // Key is valid — store in sessionStorage (cleared on tab close)
        sessionStorage.setItem("admin_key", passkey.trim());
        router.push("/admin/dashboard");
      } else {
        setError("Incorrect passkey. Try again.");
        setPasskey("");
      }
    } catch {
      setError("Could not connect. Check your network.");
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) return null;

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: 0.3,
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Card */}
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "2.5rem",
            background: "var(--bg)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent)",
              marginBottom: "1.5rem",
            }}
          >
            <Lock size={20} />
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.6rem",
              fontWeight: 600,
              color: "var(--fg)",
              marginBottom: "0.4rem",
              letterSpacing: "-0.02em",
            }}
          >
            Admin Access
          </h1>
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--muted)",
              marginBottom: "2rem",
              lineHeight: 1.6,
            }}
          >
            Enter your admin passkey to access the blog dashboard.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Passkey field */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: "0.5rem",
                }}
              >
                Passkey
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showKey ? "text" : "password"}
                  value={passkey}
                  onChange={(e) => {
                    setPasskey(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your admin passkey"
                  autoComplete="current-password"
                  style={{
                    width: "100%",
                    padding: "0.75rem 2.5rem 0.75rem 0.875rem",
                    background: "var(--surface)",
                    border: `1px solid ${error ? "#ef4444" : "var(--border)"}`,
                    borderRadius: "4px",
                    fontSize: "0.9rem",
                    color: "var(--fg)",
                    fontFamily: "monospace",
                    outline: "none",
                    transition: "border-color 0.2s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor = "var(--fg)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor = error
                      ? "#ef4444"
                      : "var(--border)")
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowKey((s) => !s)}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--muted)",
                    display: "flex",
                    padding: 0,
                  }}
                >
                  {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {error && (
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "#ef4444",
                    marginTop: "0.4rem",
                  }}
                >
                  {error}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !passkey.trim()}
              style={{
                width: "100%",
                padding: "0.8rem",
                background:
                  loading || !passkey.trim() ? "var(--border)" : "var(--fg)",
                color:
                  loading || !passkey.trim() ? "var(--muted)" : "var(--bg)",
                border: "none",
                borderRadius: "4px",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                cursor: loading || !passkey.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                transition: "background 0.2s ease",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      width: "14px",
                      height: "14px",
                      border: "2px solid var(--muted)",
                      borderTopColor: "var(--fg)",
                      borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                      display: "inline-block",
                    }}
                  />
                  Verifying...
                </>
              ) : (
                <>
                  Enter Dashboard <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back link */}
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link
            href="/"
            style={{
              fontSize: "0.8rem",
              color: "var(--muted)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            &larr; Back to site
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}
