import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About — Brightwood Energy",
  description:
    "Brightwood Energy builds, owns, and operates dedicated solar + battery power stations for AI data centres in regional Australia. Meet the team and learn our story.",
};

export default function AboutPage() {
  return <AboutContent />;
}
