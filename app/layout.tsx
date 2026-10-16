import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import { LivePreviewInit } from "@/components/LivePreviewInit";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// Zuora's brand face, self-hosted (its CDN sends no CORS headers).
const foundersGrotesk = localFont({
  variable: "--font-founders-grotesk",
  src: [
    { path: "./fonts/founders-grotesk-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/founders-grotesk-medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/founders-grotesk-bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  fallback: ["helvetica", "sans-serif"],
});

const ibmPlexSerif = localFont({
  variable: "--font-ibm-plex-serif",
  src: [
    { path: "./fonts/ibm-plex-serif-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-serif-medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-serif-bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  fallback: ["helvetica", "sans-serif"],
});

const foundersGroteskMono = localFont({
  variable: "--font-founders-grotesk-mono",
  src: [
    { path: "./fonts/founders-grotesk-mono-medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/founders-grotesk-mono-bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  fallback: ["helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Contentstack Next.js Starter",
  description: "Next.js + Contentstack starter project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${foundersGrotesk.variable} ${foundersGroteskMono.variable} ${ibmPlexSerif.variable} h-full antialiased`}>
      <body className="min-h-full">
        <LivePreviewInit
          apiKey={process.env.CONTENTSTACK_API_KEY ?? ""}
          environment={process.env.CONTENTSTACK_ENVIRONMENT ?? ""}
          branch={process.env.CONTENTSTACK_BRANCH || undefined}
        />
        {/* cacheComponents: route reads params/searchParams + uncached fetches at request time */}
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
