import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | The Halal Explorer",
  description:
    "How The Halal Explorer uses affiliate links including Amazon Associates and Booking.com.",
  alternates: { canonical: "https://www.thehalalexplorer.com/affiliate-disclosure" },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-8">
        Affiliate Disclosure
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Last updated: July 2026</p>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed">
        <p>
          The Halal Explorer participates in the Amazon Associates Program, an affiliate
          advertising program designed to provide a means for sites to earn advertising fees
          by advertising and linking to Amazon.ae, Amazon.co.uk, and Amazon.com.
        </p>
        <p>
          When you click on links to Amazon products on our site and make a purchase, we may
          earn a small commission at no additional cost to you.
        </p>
        <p>
          We also participate in the Booking.com affiliate program. When you book hotels
          through our Booking.com links, we may earn a commission.
        </p>
        <p>
          We only recommend products and services we genuinely believe in and that we think
          will be useful to our readers. Our editorial content is never influenced by our
          affiliate partnerships.
        </p>
        <p>
          For questions about this policy, please{" "}
          <Link href="/contact" className="text-primary hover:underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
