"use client";

import SourcesPanel from "@/components/SourcesPanel";

const homeSources = [
  { id: 1, text: "AEMO / Oxford Economics, Data Centre Energy Demand Report, July 2025." },
  { id: 2, text: "Moody\u2019s Ratings, \u201CData Centre Power Demand in Australia,\u201D February 2026." },
  { id: 3, text: "Oxford Economics, \u201CPhantom Demand: Separating Signal from Noise,\u201D November 2025." },
  { id: 4, text: "CSIRO GenCost 2025\u201326, battery and solar cost projections." },
  { id: 5, text: "CEFC / Baringa Partners, \u201CData Centre Energy Impact Assessment,\u201D December 2025." },
  { id: 6, text: "Industry Coalition (CEC, ETU, WWF, ACF, Smart Energy Council), February 2026." },
  { id: 7, text: "Corrs Chambers Westgarth, in The Australian, February 2026." },
  { id: 8, text: "M3 Property Data Centre Report, November 2025." },
  { id: 9, text: "Mordor Intelligence, Australia Data Centre Market Report, January 2026." },
  { id: 10, text: "Quinbrook / Supernode public announcements, 2025\u20132026." },
];

export default function HomeSourcesPanel() {
  return <SourcesPanel sources={homeSources} />;
}
