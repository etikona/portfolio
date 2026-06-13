import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Shared/Navbar";
import Footer from "./Components/Shared/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: {
    default: "Eti — Full-Stack Developer",
    template: "%s | Eti",
  },
  description:
    "Full-Stack Developer specializing in Node.js, Next.js, and building scalable web applications. Based in Dhaka, Bangladesh.",
  keywords: [
    "Full-Stack Developer",
    "Next.js",
    "Node.js",
    "React",
    "Bangladesh",
    "Web Developer",
    "MongoDB",
    "TypeScript",
  ],
  authors: [{ name: "Eti", url: "https://yourdomain.com" }],
  creator: "Eti",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    siteName: "Eti — Full-Stack Developer",
    title: "Eti — Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in Node.js, Next.js, and building scalable web applications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Eti — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eti — Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in Node.js, Next.js, and building scalable web applications.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
