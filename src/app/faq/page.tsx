import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | The Halal Explorer",
  description: "Common questions about halal travel, Muslim-friendly destinations, prayer facilities, and how we verify halal food. The Halal Explorer FAQ.",
  keywords: ["FAQ", "halal travel", "Muslim travel", "prayer rooms", "halal food", "travel tips"],
  openGraph: {
    title: "FAQ | The Halal Explorer",
    description: "Frequently asked questions about Muslim-friendly travel and our guides.",
  },
};

const faqs = [
  {
    q: "How do you verify that food is halal?",
    a: "We verify halal food information through a combination of official certifications (e.g. JAKIM, MUIS, Halal Control), owner confirmations, and community reviews. We prioritize restaurants with official halal certification but also include Muslim-owned establishments and those with clearly stated halal menu options. We recommend always double-checking with staff when in doubt.",
  },
  {
    q: "Can I contribute a destination guide or review?",
    a: "Yes! We welcome contributions from our community. You can submit reviews, photos, and information about destinations you've visited. Contact us through the contact form to learn more about becoming a contributor or suggesting a new destination.",
  },
  {
    q: "Do you offer travel planning or booking services?",
    a: "Currently we focus on providing information and guides rather than direct travel planning or booking. Our detailed destination guides, blog posts, and resources are designed to help you plan your own Muslim-friendly trips with confidence. We do not sell flights, hotels, or packages.",
  },
  {
    q: "How often is the information on the site updated?",
    a: "We strive to keep our information as up-to-date as possible. Our team regularly reviews and updates destination guides, and we rely on community feedback to alert us to any changes. If you notice outdated information, please contact us.",
  },
  {
    q: "What does 'Muslim-friendly' mean for a destination?",
    a: "For us, Muslim-friendly means a place where Muslim travelers can reasonably expect to find halal food options, prayer facilities (mosques or prayer rooms), and a welcoming or respectful atmosphere. This can range from Muslim-majority countries to cities with a significant Muslim community or established halal infrastructure.",
  },
  {
    q: "Do you list prayer times for destinations?",
    a: "On destination pages we often include a prayer times widget or reference. Prayer times change daily and by location, so we recommend using a reliable prayer times app (e.g. Muslim Pro, Islamic Finder) with your current location for accurate salah times when traveling.",
  },
  {
    q: "Is The Halal Explorer free to use?",
    a: "Yes. Our destination guides, blog, and travel tips are free to access. We may display advertisements to support the site. We do not charge for reading our content or using our destination lists.",
  },
  {
    q: "How can I get my business listed (restaurant, hotel)?",
    a: "If you run a halal restaurant, Muslim-friendly hotel, or related business and would like to be considered for inclusion in our guides, please reach out via our contact form with details and, where applicable, your halal certification information.",
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Common questions about Muslim-friendly travel, halal food, prayer facilities, and how we work.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left font-semibold text-slate-900 dark:text-white hover:text-primary">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 dark:text-slate-400">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
