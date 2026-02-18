import { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | The Halal Explorer - Muslim-Friendly Travel",
  description: "Get in touch with The Halal Explorer. Questions about halal travel, destinations, or partnerships? We're here to help.",
  keywords: ["contact", "halal travel", "Muslim travel", "The Halal Explorer", "travel inquiry"],
  openGraph: {
    title: "Contact Us | The Halal Explorer",
    description: "Get in touch with The Halal Explorer for halal travel questions and support.",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
