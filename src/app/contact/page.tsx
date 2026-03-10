import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact — Brightwood Energy",
  description:
    "Contact Brightwood Energy. Whether you're a data centre operator, energy professional, or investor — we'd love to hear from you.",
};

export default function ContactPage() {
  return <ContactContent />;
}
