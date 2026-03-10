import type { Metadata } from "next";
import ScaleContent from "./ScaleContent";

export const metadata: Metadata = {
  title: "Scale & Returns — Brightwood Energy",
  description:
    "From 100 MW to multi-gigawatt. Explore Brightwood Energy's path to scale, unit economics, and exit pathway.",
};

export default function ScalePage() {
  return <ScaleContent />;
}
