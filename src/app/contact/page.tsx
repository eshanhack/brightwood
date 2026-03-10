import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact — Brightwood Energy",
  description:
    "Contact Brightwood Energy. Raising $5–15M AUD in development capital for solar + battery power stations serving AI data centres in regional Australia.",
};

export default function ContactPage() {
  return <ContactContent />;
}
