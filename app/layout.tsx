import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Fonts werden selbst gehostet (DSGVO-konform, keine Anfrage an Google beim
// Seitenaufruf). Die .woff2-Dateien liegen unter app/fonts/ und stammen aus
// den Open-Source-Paketen @fontsource/schibsted-grotesk und
// @fontsource/ibm-plex-mono (Fonts unter der SIL Open Font License).
const schibsted = localFont({
  variable: "--font-schibsted",
  display: "swap",
  src: [
    { path: "./fonts/schibsted-grotesk-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/schibsted-grotesk-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/schibsted-grotesk-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/schibsted-grotesk-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

const plexMono = localFont({
  variable: "--font-plex-mono",
  display: "swap",
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Eisklar - Sicherer Einstieg ins Eisbaden",
  description:
    "Dein 3-Minuten-Guide für einen sicheren Einstieg ins Eisbaden. Eine Initiative von qoob8.",
  applicationName: "Eisklar",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Eisklar",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192" }],
  },
  openGraph: {
    title: "Eisklar - Sicherer Einstieg ins Eisbaden",
    description:
      "3 Minuten. 3 Regeln. Sicherer ins Eis. Eine Initiative von qoob8.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#f3f0eb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${schibsted.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
