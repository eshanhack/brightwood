import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact — Brightwood Energy",
  description:
    "Get in touch with Brightwood Energy. We're raising development capital and seeking an energy co-founder.",
};

export default function ContactPage() {
  return <ContactContent />;
}
