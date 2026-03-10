import type { Metadata } from "next";
import LandscapeContent from "./LandscapeContent";

export const metadata: Metadata = {
  title: "Competitive Landscape — Brightwood Energy",
  description:
    "Why hasn't anyone built dedicated behind-the-meter power for Australian data centres? Explore the competitive landscape.",
};

export default function LandscapePage() {
  return <LandscapeContent />;
}
