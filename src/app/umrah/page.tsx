import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllBlogPosts, isUmrahPost } from "@/lib/blog";
import { JsonLd } from "@/components/JsonLd";
import { EmailCaptureCard } from "@/components/affiliate";
import { TpCtaCard } from "@/components/travelpayouts/TpCtaCard";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { SITE_URL } from "@/lib/constants/site";
import type { Blog } from "@/types";

export const revalidate = 300;

const PAGE_URL = `${SITE_URL}/umrah`;
const TITLE = "Umrah Guide 2026: Plan, Book and Perform Umrah Step by Step";
const DESCRIPTION =
  "A practical Umrah guide for first-timers: what it costs, visa and Nusuk rules, hotels near the Haram, and how to perform the rites step by step.";
// Update this date whenever the rules below are re-checked against the official sources.
const LAST_CHECKED = "November 2026";

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

type GroupId = "plan" | "book" | "perform" | "special";

const GROUPS: { id: GroupId; title: string; description: string; match: RegExp }[] = [
  {
    id: "special",
    title: "Special cases",
    description: "Travelling with children, elderly parents or in the busiest seasons.",
    match: /\b(kids?|child|children|toddlers?|baby|elderly|parents|wheelchair|pregnan|disab)/i,
  },
  {
    id: "book",
    title: "Book",
    description: "Hotels, flights, transfers and staying connected.",
    match: /\b(hotels?|flights?|package|diy|train|airport|taxi|transfers?|esim|sim\b|taif|from the (uk|usa)|from (uk|usa|pakistan|india|canada|australia))/i,
  },
  {
    id: "perform",
    title: "Perform",
    description: "The rites themselves, explained simply.",
    match: /\b(step by step|perform|duas?|ihram|tawaf|sa'?i|women|ziyarat|mistakes|packing)/i,
  },
  {
    id: "plan",
    title: "Plan",
    description: "Budget, visas and choosing when to go.",
    match: /./,
  },
];

// Display order differs from match order: specific groups are matched first.
const DISPLAY_ORDER: GroupId[] = ["plan", "book", "perform", "special"];

function groupFor(post: Blog): GroupId {
  const haystack = `${post.title} ${post.slug?.current ?? ""}`;
  return (GROUPS.find((g) => g.match.test(haystack)) ?? GROUPS[GROUPS.length - 1]).id;
}

const STEPS = [
  {
    name: "Enter Ihram",
    text: "Make the intention at or before the Miqat and recite the Talbiyah. Men wear two unstitched white sheets; women wear loose, modest clothing.",
  },
  {
    name: "Tawaf",
    text: "Walk seven circuits anticlockwise around the Kaaba, starting at the Black Stone corner, then pray two rak'ahs.",
  },
  {
    name: "Sa'i",
    text: "Walk seven laps between the hills of Safa and Marwa, starting at Safa and finishing at Marwa.",
  },
  {
    name: "Halq or Taqsir",
    text: "Men shave or trim the hair; women cut a fingertip's length. Your Umrah is then complete.",
  },
];

const FAQS = [
  {
    question: "How much does Umrah cost?",
    answer:
      "It depends mostly on your hotel and when you travel. From the UK, a week outside peak season typically costs roughly £900 to £1,900 per person including flights. Ramadan and school holidays cost noticeably more. See our cost breakdown for each part of the budget.",
  },
  {
    question: "Do I need a special visa for Umrah?",
    answer:
      "You can perform Umrah on a dedicated Umrah visa or, outside the Hajj season, on a Saudi tourist eVisa. Rules and fees change often, so confirm on the official Nusuk platform before you book.",
  },
  {
    question: "What is the Nusuk permit?",
    answer:
      "Nusuk is Saudi Arabia's official platform for pilgrims. You book an Umrah permit in the Nusuk app before entering Masjid al-Haram to perform Umrah, and visa applications are linked to bookings made through it.",
  },
  {
    question: "How long does Umrah take?",
    answer:
      "The rites themselves usually take 3 to 5 hours depending on crowds. Most pilgrims stay 7 to 14 days so they can spend time in both Makkah and Madinah.",
  },
  {
    question: "When is the best time to go for Umrah?",
    answer:
      "Umrah can be performed at any time of year apart from the Hajj period. The months outside Ramadan and school holidays are quieter and cheaper. Ramadan is the most rewarding and also the busiest and most expensive time.",
  },
  {
    question: "Can women perform Umrah without a mahram?",
    answer:
      "Under current Saudi rules, adult women can travel for Umrah without a mahram. Check the latest requirements on the official Nusuk platform, as entry rules can change.",
  },
];

const OFFICIAL_SOURCES = [
  { title: "Nusuk Umrah platform (Saudi Ministry of Hajj and Umrah)", url: "https://umrah.nusuk.sa/" },
  { title: "Saudi Ministry of Hajj and Umrah", url: "https://www.haj.gov.sa/en" },
  { title: "Visit Saudi: tourist eVisa", url: "https://www.visitsaudi.com/en/travel-regulations" },
];

function PostCard({ post }: { post: Blog }) {
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={post.mainImage?.asset?.url || PLACEHOLDER_IMAGE}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-[#1D6A5B]">{post.title}</h3>
        {post.shortDescription && (
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">{post.shortDescription}</p>
        )}
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-[#1D6A5B]">
          Read guide <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export default async function UmrahHubPage() {
  const posts = (await getAllBlogPosts()).filter((p) => p.slug?.current && isUmrahPost(p));
  const grouped = new Map<GroupId, Blog[]>();
  for (const post of posts) {
    const id = groupFor(post);
    grouped.set(id, [...(grouped.get(id) ?? []), post]);
  }
  const groups = DISPLAY_ORDER.map((id) => ({
    ...GROUPS.find((g) => g.id === id)!,
    posts: grouped.get(id) ?? [],
  })).filter((g) => g.posts.length > 0);

  return (
    <>
      <JsonLd
        data={{
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Umrah Guide", item: PAGE_URL },
          ],
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
      {posts.length > 0 && (
        <JsonLd
          data={{
            "@type": "CollectionPage",
            name: TITLE,
            description: DESCRIPTION,
            url: PAGE_URL,
            hasPart: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: `${SITE_URL}/blog/${post.slug.current}`,
            })),
          }}
        />
      )}

      {/* Hero */}
      <section className="bg-[#0F1923] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[1fr_380px] lg:px-8">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/70">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Umrah Guide</span>
            </nav>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#F59E0B]">
              Umrah Guide
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">{TITLE}</h1>
            <p className="max-w-2xl text-lg leading-relaxed text-white/85">
              Everything a first-time pilgrim needs in one place: what Umrah really costs, how the visa and
              Nusuk permit work, where to stay near the Haram, and how to perform each rite. Written for
              travellers, kept practical, and checked against official sources.
            </p>
            <p className="mt-6 text-sm text-white/60">
              Last checked: {LAST_CHECKED}. Rules and fees change often, so always confirm on{" "}
              <a
                href="https://umrah.nusuk.sa/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                the official Nusuk platform
              </a>{" "}
              before you book.
            </p>
          </div>
          <div className="self-start">
            <EmailCaptureCard
              badge="📬 Umrah updates"
              title="Get new Umrah guides by email"
              description="We send each new guide as it is published, plus a note when visa or Nusuk rules change."
              perks={["Cost and hotel guides", "Rule changes, in plain English", "Packing and preparation tips"]}
              ctaText="Send me the guides →"
              note="No spam. Unsubscribe anytime."
            />
          </div>
        </div>
      </section>

      {/* The four rites */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Umrah in four steps</h2>
          <p className="mb-8 max-w-2xl text-gray-600">
            Umrah is short: the rites usually take 3 to 5 hours. This is a travel guide, not a religious
            ruling, so check details with a scholar you trust.
          </p>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <li key={step.name} className="rounded-xl border border-gray-200 p-5">
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F5F1] font-bold text-[#1D6A5B]">
                  {index + 1}
                </span>
                <h3 className="mb-2 font-semibold text-gray-900">{step.name}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Guides, grouped by stage of the journey */}
      {groups.length > 0 && (
        <section className="bg-[#F9FAFB] py-14">
          <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
            {groups.map((group) => (
              <div key={group.id} id={group.id}>
                <h2 className="text-2xl font-bold text-gray-900">{group.title}</h2>
                <p className="mb-6 text-gray-600">{group.description}</p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.posts.map((post) => (
                    <PostCard key={post.slug.current} post={post} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Booking */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#1D6A5B]">Book your trip</p>
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Flights and hotels for Makkah and Madinah</h2>
          <p className="mb-8 max-w-2xl text-sm text-gray-500">
            These are affiliate links. You pay nothing extra, and we earn a small commission that keeps
            this guide free.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <TpCtaCard type="flights" destinationName="Jeddah" destinationIATA="JED" />
            <TpCtaCard type="flights" destinationName="Madinah" destinationIATA="MED" />
            <TpCtaCard type="hotels" destinationName="Makkah" />
            <TpCtaCard type="hotels" destinationName="Madinah" />
          </div>
          <p className="mt-6 text-sm text-gray-600">
            City guides:{" "}
            <Link href="/destinations/makkah" className="font-semibold text-[#1D6A5B] hover:underline">
              Makkah
            </Link>{" "}
            and{" "}
            <Link href="/destinations/madinah" className="font-semibold text-[#1D6A5B] hover:underline">
              Madinah
            </Link>
            , with food, prayer times and getting around.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F9FAFB] py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 md:text-3xl">Umrah questions, answered</h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group rounded-xl border border-gray-200 bg-white p-5">
                <summary className="cursor-pointer list-none font-semibold text-gray-900 marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-[#1D6A5B] transition-transform group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="mb-3 font-semibold text-gray-900">Official sources</h2>
            <ul className="space-y-2 text-sm">
              {OFFICIAL_SOURCES.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1D6A5B] hover:underline"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-gray-500">Last checked: {LAST_CHECKED}.</p>
          </div>
        </div>
      </section>
    </>
  );
}
