"use client";

import Link from "next/link";
import Navbar from "./Components/Shared/Navbar";
import Footer from "./Components/Shared/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: "100vh",
          paddingTop: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 2rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "8rem",
              fontWeight: 600,
              color: "var(--border)",
              lineHeight: 1,
              marginBottom: "1.5rem",
            }}
          >
            404
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.6rem",
              fontWeight: 600,
              color: "var(--fg)",
              marginBottom: "0.85rem",
            }}
          >
            Page not found.
          </h1>
          <p
            style={{
              color: "var(--muted)",
              lineHeight: 1.75,
              fontSize: "0.95rem",
              marginBottom: "2.5rem",
            }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.75rem",
              background: "var(--fg)",
              color: "var(--bg)",
              textDecoration: "none",
              fontSize: "0.82rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              borderRadius: "2px",
            }}
          >
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
