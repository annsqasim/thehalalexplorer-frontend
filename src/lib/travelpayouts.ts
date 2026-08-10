// lib/travelpayouts.ts
// Central utility for all Travelpayouts link building and widget config

const rawMarker = process.env.NEXT_PUBLIC_TP_MARKER
const MARKER = (rawMarker && rawMarker !== 'YOUR_MARKER_ID') ? rawMarker : '20736'

// ─── FLIGHT LINKS ────────────────────────────────────────────────
// Build a deep-link to Aviasales flight search with affiliate marker
export function buildFlightSearchUrl(params: {
  origin?: string       // IATA code e.g. 'DXB'
  destination?: string  // IATA code e.g. 'KUL'
  departDate?: string   // YYYY-MM-DD
  returnDate?: string   // YYYY-MM-DD
  adults?: number
}): string {
  const base = 'https://tp.media/r'
  const query = new URLSearchParams({
    marker: MARKER,
    trs: '233763',       // Aviasales program ID
    p: '6809',
    u: 'https://www.aviasales.com/search/' +
      `${params.origin || 'anywhere'}` +
      `${params.destination || ''}`,
  })
  return `${base}?${query.toString()}`
}

// Simple Aviasales affiliate link for a destination
export function buildAviasalesLink(destinationIATA: string): string {
  return `https://tp.media/r?marker=${MARKER}&trs=233763&p=6809&u=https%3A%2F%2Fwww.aviasales.com%2Fsearch%2FDXB${destinationIATA || ''}1`
}

// ─── HOTEL LINKS ─────────────────────────────────────────────────
// Build Hotellook deep-link for a specific city
export function buildHotelSearchUrl(cityName: string): string {
  const encoded = encodeURIComponent(cityName)
  return `https://tp.media/r?marker=${MARKER}&trs=233763&p=6890&u=https%3A%2F%2Fhotellook.com%2Fsearch%3Fdestination%3D${encoded}`
}

// ─── TOUR / ACTIVITY LINKS ───────────────────────────────────────
// Viator deep-link for activities in a destination
export function buildViatorLink(destinationName: string): string {
  const encoded = encodeURIComponent(destinationName)
  return `https://tp.media/r?marker=${MARKER}&trs=233763&p=4053&u=https%3A%2F%2Fwww.viator.com%2Fsearch%2F${encoded}`
}

// GetYourGuide deep-link
export function buildGYGLink(destinationSlug: string): string {
  return `https://tp.media/r?marker=${MARKER}&trs=233763&p=5526&u=https%3A%2F%2Fwww.getyourguide.com%2F${destinationSlug}-l`
}

// ─── INSURANCE LINKS ─────────────────────────────────────────────
export function buildInsuranceLink(): string {
  return `https://tp.media/r?marker=${MARKER}&trs=233763&p=4363&u=https%3A%2F%2Fwww.worldnomads.com`
}

// ─── CAR RENTAL LINKS ────────────────────────────────────────────
export function buildCarRentalLink(cityName: string): string {
  const encoded = encodeURIComponent(cityName)
  return `https://tp.media/r?marker=${MARKER}&trs=233763&p=211&u=https%3A%2F%2Fwww.rentalcars.com%2FSearchResults.do%3FpickUpName%3D${encoded}`
}

// ─── SHARED LINK PROPS ───────────────────────────────────────────
// Always use these on affiliate links — required by Travelpayouts TOS
export const TP_LINK_PROPS = {
  target: '_blank' as const,
  rel: 'noopener noreferrer sponsored',
}
