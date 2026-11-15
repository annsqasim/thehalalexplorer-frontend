import { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { UmrahPlanner } from "@/components/UmrahPlanner";
import { EmailCaptureCard } from "@/components/affiliate";
import { SITE_URL } from "@/lib/constants/site";
import { buildFlightLink, buildHotelLink } from "@/lib/travelpayouts";
import { LAST_CHECKED, SOURCES, USD_PER_GBP } from "@/lib/umrah-planner";

const PAGE_URL = `${SITE_URL}/umrah/planner`;
const TITLE = "Umrah Cost Calculator and Trip Planner (2026)";
const DESCRIPTION =
  "Estimate what your Umrah will cost in US dollars, per person and for your whole group. Choose your nights, hotel level and season, add your flight price and get a day-by-day outline.";

export const metadata: Metadata = {
  title: `${TITLE} | The Halal Explorer`,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    siteName: "The Halal Explorer",
  },
};

const FAQS = [
  {
    question: "How accurate is this Umrah cost calculator?",
    answer:
      "It gives a realistic range, not a quote. The figures are based on published 2026 price guides, converted to US dollars. Real prices depend on your exact dates, how early you book, which hotel you choose and exchange rates, so always check live prices before you pay.",
  },
  {
    question: "What does the estimate include?",
    answer:
      "Hotels in Makkah and Madinah, the visa with its compulsory insurance, transport inside Saudi Arabia and meals, plus your flights once you enter the fare. You can also add Ziyarat tours and travel insurance. It does not include shopping, gifts or vaccinations.",
  },
  {
    question: "Why are flights not included automatically?",
    answer:
      "Flight prices depend on where you fly from, so a single estimate would be wrong for most people. Check the fare from your city, enter it in US dollars and the calculator adds it to your total. Hotel, visa and transport costs in Saudi Arabia are similar wherever you fly from.",
  },
  {
    question: "How many nights should I spend in Makkah and Madinah?",
    answer:
      "The Umrah rites take a few hours, but most pilgrims stay 7 to 14 nights in total. A common split is 4 or 5 nights in Makkah and 3 or 4 in Madinah.",
  },
  {
    question: "Why is Umrah more expensive in Ramadan?",
    answer:
      "Demand is at its highest, especially in the last ten nights, so flights and hotels near the Haram cost more and sell out early. Published guides put Ramadan and school holiday prices around 15 to 30% above off-peak.",
  },
];

export default function UmrahPlannerPage() {
  return (
    <>
      <JsonLd
        data={{
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Umrah Guide", item: `${SITE_URL}/umrah` },
            { "@type": "ListItem", position: 3, name: "Cost Calculator", item: PAGE_URL },
          ],
        }}
      />
      <JsonLd
        data={{
          "@type": "WebApplication",
          name: TITLE,
          url: PAGE_URL,
          description: DESCRIPTION,
          applicationCategory: "TravelApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
      <JsonLd
        data={{
          "@type": "FAQPage",
          mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />

      <section className="bg-[#0F1923] text-white print:hidden">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/umrah" className="hover:text-white">Umrah Guide</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Cost Calculator</span>
          </nav>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#F59E0B]">Free tool</p>
          <h1 className="mb-4 max-w-3xl font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{TITLE}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-white/85">
            Tell us about your trip and see what it is likely to cost, per person and for your whole group,
            with a day-by-day outline. Prices are in US dollars. Add your own flight price, wherever you fly from.
          </p>
        </div>
      </section>

      <section className="bg-[#F9FAFB] py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <UmrahPlanner flightsHref={buildFlightLink("JED")} hotelsHref={buildHotelLink()} />
          <p className="mt-4 text-xs text-gray-500 print:hidden">
            The flight and hotel buttons are affiliate links. You pay nothing extra, and we may earn a small commission.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16 print:hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:px-8">
          <div>
            <h2 className="mb-4 font-serif text-2xl font-bold text-gray-900 sm:text-3xl">How we estimate your cost</h2>
            <div className="space-y-4 leading-relaxed text-gray-700">
              <p>
                The calculator adds up the main parts of an Umrah budget for one adult sharing a room: hotels,
                the visa, transport inside Saudi Arabia and meals, plus your flights once you enter the fare.
                Each part is a range, because real prices vary, and the total is the sum of the low and high ends.
              </p>
              <p>
                Your hotel is the biggest lever. Moving from a budget hotel to a 5-star near the Haram can
                more than double the hotel cost, while the visa and transport stay about the same. Season is
                the second lever: Ramadan and school holidays raise flight and hotel prices.
              </p>
              <p>
                This is a planning tool, not a booking engine. Visa rules and fees change often, so confirm them
                on the official Nusuk platform before you book. For a full explanation of each cost, read{" "}
                <Link href="/blog/umrah-cost-2026-budget-breakdown" className="font-semibold text-[#1D6A5B] hover:underline">
                  How Much Does Umrah Cost in 2026?
                </Link>{" "}
                and for where to stay, see the{" "}
                <Link href="/blog/best-hotels-near-masjid-al-haram" className="font-semibold text-[#1D6A5B] hover:underline">
                  best hotels near Masjid al-Haram
                </Link>
                .
              </p>
            </div>

            <h2 className="mb-4 mt-10 font-serif text-2xl font-bold text-gray-900 sm:text-3xl">Questions about the calculator</h2>
            <div className="space-y-3">
              {FAQS.map((faq) => (
                <details key={faq.question} className="group rounded-xl border border-gray-200 bg-white p-5">
                  <summary className="cursor-pointer list-none font-semibold text-gray-900">
                    <span className="flex items-center justify-between gap-4">
                      {faq.question}
                      <span className="text-[#1D6A5B] transition-transform group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-gray-200 p-5">
              <h2 className="mb-3 font-semibold text-gray-900">Where the numbers come from</h2>
              <ul className="space-y-2 text-sm">
                {SOURCES.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-[#1D6A5B] hover:underline">
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-gray-500">
                Last checked: {LAST_CHECKED}. Source prices in pounds are converted at £1 = ${USD_PER_GBP.toFixed(2)};
                riyals at the fixed rate of SAR 3.75 to the dollar.
              </p>
            </div>
          </div>

          <aside className="self-start lg:sticky lg:top-24">
            <EmailCaptureCard
              badge="📬 Umrah updates"
              title="Get new Umrah guides by email"
              description="We send each new guide as it is published, plus a note when visa or Nusuk rules change."
              perks={["Cost and hotel guides", "Rule changes, in plain English", "Packing and preparation tips"]}
              ctaText="Send me the guides →"
              note="No spam. Unsubscribe anytime."
            />
          </aside>
        </div>
      </section>
    </>
  );
}
