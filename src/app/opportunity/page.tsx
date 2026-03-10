import type { Metadata } from "next";
import OpportunityContent from "./OpportunityContent";

export const metadata: Metadata = {
  title: "The Opportunity — Brightwood Energy",
  description:
    "Why now is the time to build dedicated power infrastructure for AI data centres in regional Australia.",
};

export default function OpportunityPage() {
  return <OpportunityContent />;
}
