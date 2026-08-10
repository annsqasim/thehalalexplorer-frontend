// lib/travelpayouts.ts

const MARKER = process.env.NEXT_PUBLIC_TP_MARKER || '757826'
const TRS    = process.env.NEXT_PUBLIC_TP_TRS    || '556314'

// ─── BASE REDIRECT ────────────────────────────────────────────────
// All Travelpayouts links go through tp.media/r with these params
function tpLink(programId: string, destinationUrl: string): string {
  const encoded = encodeURIComponent(destinationUrl)
  return `https://tp.media/r?marker=${MARKER}&trs=${TRS}&p=${programId}&u=${encoded}`
}

// ─── FLIGHTS — Aviasales ─────────────────────────────────────────
// programId 6809 = Aviasales
// URL format: aviasales.com/search/ORIGINDESTN1  (IATA codes, no spaces)
export function buildFlightLink(originIATA = 'DXB', destinationIATA = ''): string {
  const dest = destinationIATA
    ? `https://www.aviasales.com/search/${originIATA}${destinationIATA}1`
    : `https://www.aviasales.com`
  return tpLink('6809', dest)
}

// ─── HOTELS — Hotellook ──────────────────────────────────────────
// programId 101 = Hotellook (correct ID — 6890 was wrong)
export function buildHotelLink(cityName = ''): string {
  const dest = cityName
    ? `https://hotellook.com/search?destination=${encodeURIComponent(cityName)}&adults=2`
    : `https://hotellook.com`
  return tpLink('101', dest)
}

// ─── TOURS — Viator ──────────────────────────────────────────────
// programId 4034 = Viator (correct — 4053 was wrong)
export function buildToursLink(destinationName = ''): string {
  const dest = destinationName
    ? `https://www.viator.com/search/${encodeURIComponent(destinationName)}`
    : `https://www.viator.com`
  return tpLink('4034', dest)
}

// ─── INSURANCE — World Nomads ────────────────────────────────────
// programId 1822 = World Nomads
export function buildInsuranceLink(): string {
  return tpLink('1822', 'https://www.worldnomads.com/travel-insurance')
}

// ─── CAR RENTAL — Rentalcars ─────────────────────────────────────
// programId 211 = Rentalcars.com
export function buildCarRentalLink(cityName = ''): string {
  const dest = cityName
    ? `https://www.rentalcars.com/SearchResults.do?pickUpName=${encodeURIComponent(cityName)}`
    : `https://www.rentalcars.com`
  return tpLink('211', dest)
}

// ─── REQUIRED ON ALL AFFILIATE LINKS ─────────────────────────────
export const TP_LINK_PROPS = {
  target: '_blank' as const,
  rel: 'noopener noreferrer sponsored',
}

// ─── IATA CODE MAP ───────────────────────────────────────────────
// Use this when iataCode is not set in Sanity yet
export const IATA_MAP: Record<string, string> = {
  'dubai':          'DXB',
  'kuala-lumpur':   'KUL',
  'istanbul':       'IST',
  'marrakech':      'RAK',
  'bali':           'DPS',
  'jakarta':        'CGK',
  'singapore':      'SIN',
  'tokyo':          'NRT',
  'paris':          'CDG',
  'london':         'LHR',
  'rome':           'FCO',
  'sydney':         'SYD',
  'delhi':          'DEL',
  'bangkok':        'BKK',
  'doha':           'DOH',
  'cairo':          'CAI',
  'muscat':         'MCT',
  'amsterdam':      'AMS',
  'barcelona':      'BCN',
  'berlin':         'BER',
  'vienna':         'VIE',
  'toronto':        'YYZ',
  'new-york-city':  'JFK',
  'los-angeles':    'LAX',
  'chicago':        'ORD',
  'zanzibar':       'ZNZ',
  'nairobi':        'NBO',
  'abu-dhabi':      'AUH',
  'riyadh':         'RUH',
  'makkah':         'JED',
  'madinah':        'MED',
  'sarajevo':       'SJJ',
  'baku':           'GYD',
  'tashkent':       'TAS',
}

// Helper: get IATA from slug or iataCode field
export function getIATA(slug: string, iataCode?: string): string {
  return iataCode || IATA_MAP[slug] || ''
}
