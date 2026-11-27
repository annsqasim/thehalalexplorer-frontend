/** Pure helpers for Umrah packages, safe to import in client components. */

export type PackageCurrency = "PKR" | "USD";

export const DISCLAIMER =
  "Packages are sold by the agency, not by The Halal Explorer. Check the agency's registration and get the final price and terms in writing before you pay.";

export function formatPrice(amount: number, currency: PackageCurrency): string {
  const n = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount);
  return currency === "PKR" ? `Rs ${n}` : `$${n}`;
}

const monthFormat = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
export function formatMonth(month: string): string {
  const date = new Date(`${month}-01T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? month : monthFormat.format(date);
}

export function formatDistance(meters?: number): string | null {
  if (meters === undefined || meters === null) return null;
  return meters < 1000 ? `${Math.round(meters)} m from the Haram` : `${(meters / 1000).toFixed(1)} km from the Haram`;
}

export function whatsappLink(number: string, text: string): string {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}
