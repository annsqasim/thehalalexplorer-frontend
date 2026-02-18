import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions | The Halal Explorer",
  description: "Terms of use and conditions for The Halal Explorer website and services. Please read before using our travel guides and content.",
  keywords: ["terms", "conditions", "The Halal Explorer", "legal", "use of website"],
  openGraph: {
    title: "Terms and Conditions | The Halal Explorer",
    description: "Terms of use for The Halal Explorer website.",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-8">
        Terms and Conditions
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
        Last updated: February 2025
      </p>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            By accessing and using The Halal Explorer website (&quot;the Site&quot;), you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use the Site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">2. Use of the Site</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            The Halal Explorer provides travel information, destination guides, and editorial content for general informational purposes. We do not guarantee the accuracy, completeness, or timeliness of information. Travel conditions, halal certifications, and local practices may change. You are responsible for verifying important details (e.g. halal status, visa requirements) before making travel decisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">3. No Professional Advice</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Our content is not a substitute for professional travel, legal, or religious advice. For specific religious or dietary requirements, consult appropriate scholars or authorities. We are not liable for any decisions you make based on information on the Site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">4. Intellectual Property</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            The Site and its original content (including text, graphics, logos, and layout) are owned by The Halal Explorer or its licensors. You may not copy, modify, distribute, or use our content for commercial purposes without prior written permission. You may share links to our pages for personal, non-commercial use.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">5. Third-Party Links and Content</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            The Site may contain links to third-party websites (e.g. restaurants, booking sites). We are not responsible for the content, privacy practices, or availability of those sites. Use of third-party services is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">6. Limitation of Liability</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            To the fullest extent permitted by law, The Halal Explorer and its operators shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the Site or reliance on its content. This includes but is not limited to travel decisions, dietary choices, or any loss or inconvenience experienced during travel.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">7. Changes to Terms</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We may update these Terms and Conditions from time to time. The &quot;Last updated&quot; date at the top will reflect the latest version. Continued use of the Site after changes constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">8. Contact</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            For questions about these Terms and Conditions, please contact us via our <Link href="/contact" className="text-primary hover:underline">Contact</Link> page.
          </p>
        </section>
      </div>
    </div>
  );
}
