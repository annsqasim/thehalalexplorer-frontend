import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | The Halal Explorer",
  description: "Privacy policy for The Halal Explorer. How we collect, use, and protect your information.",
  keywords: ["privacy", "The Halal Explorer", "data", "cookies"],
  openGraph: {
    title: "Privacy Policy | The Halal Explorer",
    description: "Privacy policy for The Halal Explorer website.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-8">
        Privacy Policy
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        Last updated: February 2025
      </p>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">1. Introduction</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            The Halal Explorer (&quot;we&quot;, &quot;our&quot;) respects your privacy. This policy describes how we may collect, use, and protect information when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">2. Information We Collect</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We may collect information you provide (e.g. when you contact us or subscribe to a newsletter), and automatically collected information such as IP address, browser type, and usage data. We may use cookies and similar technologies to improve the site and for analytics.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">3. How We Use Information</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We use collected information to operate and improve the site, respond to inquiries, send newsletters if you have opted in, and analyze site usage. We may use third-party services (e.g. analytics, advertising) that have their own privacy practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">4. Sharing and Disclosure</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We do not sell your personal information. We may share data with service providers who assist in operating the site, or when required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">5. Your Rights</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Depending on your location, you may have rights to access, correct, or delete your data, or to opt out of certain processing. Contact us via our <Link href="/contact" className="text-primary hover:underline">Contact</Link> page to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">6. Contact</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            For privacy-related questions, please use our <Link href="/contact" className="text-primary hover:underline">Contact</Link> page.
          </p>
        </section>
      </div>
    </div>
  );
}
