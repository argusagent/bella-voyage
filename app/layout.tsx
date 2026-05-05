import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bella-voyage.vercel.app"),
  title: "Bella's Graduation Voyage — Paris, Beaune & Lake Geneva · June 2026",
  description:
    "Seven nights, three cities — Paris, Beaune & Lake Geneva, June 3–11, 2026.",
  openGraph: {
    title: "Bella's Graduation Voyage — Paris, Beaune & Lake Geneva · June 2026",
    description: "Seven nights, three cities, one long table after another.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bella's Graduation Voyage — Paris, Beaune & Lake Geneva · June 2026",
    description: "Seven nights, three cities, one long table after another.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5efe2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
