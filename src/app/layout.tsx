import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brightwood.vercel.app"),
  title: "Brightwood Energy — Dedicated Power for AI Data Centres",
  description:
    "We build, own, and operate solar + battery power stations purpose-built for AI data centres in regional Australia.",
  openGraph: {
    title: "Brightwood Energy — Dedicated Power for AI Data Centres",
    description:
      "We build, own, and operate solar + battery power stations purpose-built for AI data centres in regional Australia.",
    type: "website",
    locale: "en_AU",
    siteName: "Brightwood Energy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brightwood Energy — Dedicated Power for AI Data Centres",
    description:
      "We build, own, and operate solar + battery power stations purpose-built for AI data centres in regional Australia.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-cream text-text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-olive focus:text-white focus:rounded-lg focus:text-sm"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
