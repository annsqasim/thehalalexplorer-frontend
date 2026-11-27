import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { SITE_URL } from "@/lib/constants/site";
import { DISCLAIMER, formatMonth } from "@/lib/umrah-packages";

// POST /api/inquiry: a traveller asks an agency about a package.
// Spec: docs/umrah-packages-module.md ("Inquiry flow").

export const dynamic = "force-dynamic";

const RATE_LIMIT = 5; // inquiries per sender per hour
const SOURCES = ["package-page", "calculator", "agency-page"] as const;

// Server-side only: SANITY_API_TOKEN must never reach the browser.
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "46z29k3b",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-08-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

interface InquiryInput {
  packageSlug: string;
  name: string;
  phone: string;
  email?: string;
  travellers: number;
  preferredMonth?: string;
  message?: string;
  source: (typeof SOURCES)[number];
  consent: boolean;
  /** Honeypot: real users never fill it. */
  website?: string;
}

type Validated = { ok: true; data: InquiryInput } | { ok: false; error: string };

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validate(body: Record<string, unknown>): Validated {
  const name = str(body.name, 80);
  const phone = str(body.phone, 25);
  const email = str(body.email, 120);
  const preferredMonth = str(body.preferredMonth, 7);
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const travellers = Number(body.travellers);
  const source = SOURCES.includes(body.source as InquiryInput["source"]) ? (body.source as InquiryInput["source"]) : "package-page";

  if (!str(body.packageSlug, 120)) return { ok: false, error: "Missing package." };
  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  const digits = phone.replace(/\D/g, "");
  if (!/^[+\d\s()-]+$/.test(phone) || digits.length < 7 || digits.length > 15) {
    return { ok: false, error: "Please enter a valid phone number, including the country code." };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (!Number.isInteger(travellers) || travellers < 1 || travellers > 20) {
    return { ok: false, error: "Travellers must be between 1 and 20." };
  }
  if (preferredMonth && !/^\d{4}-(0[1-9]|1[0-2])$/.test(preferredMonth)) return { ok: false, error: "Invalid month." };
  if (message.length > 1000) return { ok: false, error: "Please keep your message under 1,000 characters." };
  if (body.consent !== true) return { ok: false, error: "Please agree to share your details with the agency." };

  return {
    ok: true,
    data: {
      packageSlug: str(body.packageSlug, 120),
      name,
      phone,
      email: email || undefined,
      travellers,
      preferredMonth: preferredMonth || undefined,
      message: message || undefined,
      source,
      consent: true,
      website: str(body.website, 200),
    },
  };
}

function senderHash(request: Request): string {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const salt = process.env.INQUIRY_HASH_SALT || process.env.SANITY_API_TOKEN?.slice(-16) || "the-halal-explorer";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

interface InquiryTarget {
  _id: string;
  title: string;
  slug: string;
  agency: { _id: string; name: string; email?: string };
}

async function sendAgencyEmail(target: InquiryTarget, input: InquiryInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  if (!apiKey || !from || !target.agency.email) {
    console.warn("[inquiry] Email not sent: RESEND_API_KEY, INQUIRY_FROM_EMAIL or the agency email is missing.");
    return false;
  }
  const url = `${SITE_URL}/umrah/packages/${target.slug}`;
  const rows: [string, string | undefined][] = [
    ["Name", input.name],
    ["Phone", input.phone],
    ["Email", input.email],
    ["Travellers", String(input.travellers)],
    ["Preferred month", input.preferredMonth ? formatMonth(input.preferredMonth) : undefined],
    ["Message", input.message],
  ];
  const filled = rows.filter((r): r is [string, string] => Boolean(r[1]));
  const html = `
    <p>Assalamu alaikum ${escapeHtml(target.agency.name)},</p>
    <p>You have a new inquiry about <a href="${url}">${escapeHtml(target.title)}</a> from The Halal Explorer.</p>
    <table cellpadding="6" style="border-collapse:collapse">
      ${filled.map(([k, v]) => `<tr><td style="color:#555"><strong>${k}</strong></td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`).join("")}
    </table>
    <p>Please contact the traveller directly${input.email ? " (reply to this email to reach them)" : ""}.</p>
    <hr><p style="color:#777;font-size:12px">${escapeHtml(DISCLAIMER)}</p>`;
  const text = `New inquiry about "${target.title}" (${url})\n\n${filled.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${DISCLAIMER}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [target.agency.email],
        reply_to: input.email,
        subject: `New Umrah inquiry: ${target.title}`,
        html,
        text,
      }),
    });
    if (!res.ok) console.error("[inquiry] Resend error", res.status, await res.text());
    return res.ok;
  } catch (error) {
    console.error("[inquiry] Resend request failed", error);
    return false;
  }
}

export async function POST(request: Request) {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("[inquiry] SANITY_API_TOKEN is not set");
    return NextResponse.json({ error: "Inquiries are unavailable right now. Please try WhatsApp." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  const input = result.data;

  // Bots fill every field. Pretend success so they don't retry.
  if (input.website) return NextResponse.json({ ok: true });

  const ipHash = senderHash(request);
  const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const recent = await writeClient.fetch<number>(
    `count(*[_type == "inquiry" && ipHash == $ipHash && createdAt > $since])`,
    { ipHash, since: hourAgo }
  );
  if (recent >= RATE_LIMIT) {
    return NextResponse.json({ error: "Too many inquiries. Please try again in an hour, or use WhatsApp." }, { status: 429 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const target = await writeClient.fetch<InquiryTarget | null>(
    `*[_type == "umrahPackage" && slug.current == $slug && !(_id in path("drafts.**"))
      && isActive != false && (!defined(validUntil) || validUntil >= $today)
      && agency->isActive != false && agency->isVerified == true][0]{
      _id, title, "slug": slug.current, "agency": agency->{_id, name, email}
    }`,
    { slug: input.packageSlug, today }
  );
  if (!target) return NextResponse.json({ error: "This package is no longer available." }, { status: 404 });

  const doc = await writeClient.create({
    _type: "inquiry",
    package: { _type: "reference", _ref: target._id },
    agency: { _type: "reference", _ref: target.agency._id },
    name: input.name,
    phone: input.phone,
    email: input.email,
    travellers: input.travellers,
    preferredMonth: input.preferredMonth,
    message: input.message,
    source: input.source,
    status: "new",
    emailSent: false,
    ipHash,
    createdAt: new Date().toISOString(),
  });

  const emailSent = await sendAgencyEmail(target, input);
  if (emailSent) {
    await writeClient.patch(doc._id).set({ emailSent: true, status: "sent" }).commit();
  }

  return NextResponse.json({ ok: true });
}
