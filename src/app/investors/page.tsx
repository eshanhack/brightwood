import type { Metadata } from "next";
import InvestorsContent from "./InvestorsContent";

export const metadata: Metadata = {
  title: "Investors — Brightwood Energy",
  description:
    "Investment information for Brightwood Energy. Path to scale, development phases, and resilience analysis.",
};

export default function InvestorsPage() {
  return <InvestorsContent />;
}
