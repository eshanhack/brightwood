import type { Metadata } from "next";
import FAQContent from "./FAQContent";

export const metadata: Metadata = {
  title: "FAQ — Brightwood Energy",
  description:
    "Frequently asked questions about Brightwood Energy, behind-the-meter power, AI data centre energy needs, and renewable infrastructure in Australia.",
};

export default function FAQPage() {
  return <FAQContent />;
}
