"use client";

import { useState } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { formatMonth, whatsappLink } from "@/lib/umrah-packages-format";

interface Props {
  packageSlug: string;
  packageTitle: string;
  agencyName: string;
  agencyWhatsapp?: string;
  /** Departure months offered, YYYY-MM. */
  months: string[];
  source?: "package-page" | "calculator" | "agency-page";
}

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 focus:border-[#1D6A5B] focus:outline-none focus:ring-2 focus:ring-[#1D6A5B]/20";

export function WhatsappButton({ number, text }: { number: string; text: string }) {
  return (
    <a
      href={whatsappLink(number, text)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ebe5b]"
    >
      <MessageCircle className="h-4 w-4" aria-hidden /> Chat on WhatsApp
    </a>
  );
}

export function InquiryForm({ packageSlug, packageTitle, agencyName, agencyWhatsapp, months, source = "package-page" }: Props) {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const whatsappText = `Assalamu alaikum, I'm interested in "${packageTitle}" (found on The Halal Explorer).`;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageSlug,
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email"),
          travellers: Number(form.get("travellers")),
          preferredMonth: form.get("preferredMonth") || undefined,
          message: form.get("message"),
          consent: form.get("consent") === "on",
          website: form.get("website"),
          source,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setState("sent");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div className="space-y-4 rounded-xl border border-[#1D6A5B]/30 bg-[#E8F5F1] p-5" role="status">
        <p className="flex items-center gap-2 font-semibold text-[#1D6A5B]">
          <CheckCircle2 className="h-5 w-5" aria-hidden /> Inquiry sent
        </p>
        <p className="text-sm text-gray-700">
          {agencyName} will contact you soon. For a faster answer, message them on WhatsApp.
        </p>
        {agencyWhatsapp && <WhatsappButton number={agencyWhatsapp} text={whatsappText} />}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate={false}>
      <div>
        <label htmlFor="inq-name" className="mb-1 block text-xs font-medium text-gray-700">Name</label>
        <input id="inq-name" name="name" required minLength={2} maxLength={80} autoComplete="name" className={inputClass} />
      </div>
      <div>
        <label htmlFor="inq-phone" className="mb-1 block text-xs font-medium text-gray-700">Phone (with country code)</label>
        <input id="inq-phone" name="phone" type="tel" required placeholder="+92 300 1234567" autoComplete="tel" className={inputClass} />
      </div>
      <div>
        <label htmlFor="inq-email" className="mb-1 block text-xs font-medium text-gray-700">Email (optional)</label>
        <input id="inq-email" name="email" type="email" autoComplete="email" className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="inq-travellers" className="mb-1 block text-xs font-medium text-gray-700">Travellers</label>
          <input id="inq-travellers" name="travellers" type="number" min={1} max={20} defaultValue={2} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="inq-month" className="mb-1 block text-xs font-medium text-gray-700">Month</label>
          <select id="inq-month" name="preferredMonth" className={inputClass} defaultValue="">
            <option value="">Flexible</option>
            {months.map((m) => (
              <option key={m} value={m}>{formatMonth(m)}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="inq-message" className="mb-1 block text-xs font-medium text-gray-700">Message (optional)</label>
        <textarea id="inq-message" name="message" rows={3} maxLength={1000} className={inputClass} placeholder="Room sharing, dates, questions…" />
      </div>
      {/* Honeypot: hidden from people, filled by bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="inq-website">Website</label>
        <input id="inq-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="flex items-start gap-2 text-xs text-gray-600">
        <input type="checkbox" name="consent" required className="mt-0.5 accent-[#1D6A5B]" />
        Share my details with {agencyName} so they can contact me about this package.
      </label>
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full rounded-lg bg-[#1D6A5B] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#16574A] disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Send inquiry"}
      </button>
      {agencyWhatsapp && <WhatsappButton number={agencyWhatsapp} text={whatsappText} />}
    </form>
  );
}
