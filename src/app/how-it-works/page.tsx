import type { Metadata } from "next";
import HowItWorksContent from "./HowItWorksContent";

export const metadata: Metadata = {
  title: "How It Works — Brightwood Energy",
  description:
    "Three proven technologies — solar, battery, and gas backup — delivering guaranteed 24/7 power to AI data centres.",
};

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
