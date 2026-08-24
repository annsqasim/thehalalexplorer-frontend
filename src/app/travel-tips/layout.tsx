import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Travel Tips for Muslim Travelers | The Halal Explorer",
  description:
    "Essential travel tips for Muslim travelers. Advice on finding halal food, prayer rooms, packing, travel insurance, and navigating new destinations with confidence.",
  keywords: [
    "Muslim travel tips",
    "halal travel advice",
    "prayer while traveling",
    "halal food abroad",
    "Islamic travel",
  ],
  alternates: { canonical: `${SITE_URL}/travel-tips` },
  openGraph: {
    title: "Travel Tips for Muslim Travelers | The Halal Explorer",
    description:
      "Essential travel tips for Muslim travelers. Advice on finding halal food, prayer rooms, and navigating new destinations.",
    url: `${SITE_URL}/travel-tips`,
  },
};

export default function TravelTipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
