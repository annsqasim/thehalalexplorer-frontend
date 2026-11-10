import type { Destination, DestinationQuickFacts } from "@/types";

/** Card/listing excerpt — prefers intro, falls back to description */
export function getDestinationExcerpt(destination: Destination): string {
  return destination.intro || destination.description || "";
}

/** Intro section with legacy fallback */
export function getDestinationIntro(destination: Destination): string | undefined {
  return destination.intro || destination.description || undefined;
}

/** About section — falls back to legacy details-free description if about missing */
export function getDestinationAbout(destination: Destination): string | undefined {
  if (destination.about) return destination.about;
  if (destination.intro && destination.description && destination.intro !== destination.description) {
    return undefined;
  }
  return undefined;
}

export function getMuslimTravelTips(destination: Destination): string[] {
  return destination.travelTips?.filter(Boolean) ?? [];
}

export function getWhyMuslimsLoveIt(destination: Destination): string[] {
  return destination.whyMuslimsLoveIt?.filter(Boolean) ?? [];
}

export function hasQuickFacts(facts?: DestinationQuickFacts): boolean {
  if (!facts) return false;
  return Object.values(facts).some(Boolean);
}

export function getMetaDescription(destination: Destination): string {
  if (destination.metaDescription) return destination.metaDescription;
  // Search-focused fallback. The raw intro/description usually reads like an
  // encyclopedia entry ("X is the capital of Y"), which gives searchers no
  // reason to click, so it is only used to pad when it is short enough.
  const base = `Halal food, mosques, prayer times and Muslim-friendly travel tips for ${destination.name}, ${destination.country}.`;
  const extra = (destination.intro || destination.description || "").split(/(?<=[.!?])\s/)[0] ?? "";
  return extra && base.length + 1 + extra.length <= 158 ? `${base} ${extra}` : base;
}
