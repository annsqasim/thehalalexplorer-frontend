// lib/travelpayouts.ts
// Using tpx.gr short links — actual Travelpayouts generated links
// These already contain your marker and tracking

// ─── YOUR DIRECT AFFILIATE LINKS ─────────────────────────────────
// Generated from Travelpayouts → Generate links → Copy short URL
// Add more as you generate them from each program

export const TP_LINKS = {
  // FLIGHTS — Aviasales
  flights: 'https://aviasales.tpx.gr/4Ren7XoF',

  // ACTIVITIES — Klook
  tours: 'https://klook.tpx.gr/Umtvtii4',

  // ACTIVITIES — KKday (alternative to Klook)
  kkday: 'https://kkday.tpx.gr/XAT6cm1e',

  // Add these once you generate them:
  hotels:    '',   // generate from Hotellook in your programs
  insurance: '',   // generate from World Nomads or any insurance program
  cars:      '',   // generate from Kiwitaxi
  yesim:     '',   // generate from Yesim (eSIM — 18% commission!)
}

// ─── DESTINATION-SPECIFIC LINKS ──────────────────────────────────
// For destination pages, append search params to base links
// Klook and Aviasales both support query string destination pre-filling

export function buildFlightLink(destinationIATA = ''): string {
  if (destinationIATA) {
    // Aviasales accepts IATA in the search path
    return `https://aviasales.tpx.gr/4Ren7XoF?origin=DXB&destination=${destinationIATA}`
  }
  return TP_LINKS.flights
}

export function buildToursLink(destinationName = ''): string {
  if (destinationName) {
    const encoded = encodeURIComponent(destinationName)
    return `https://klook.tpx.gr/Umtvtii4?query=${encoded}`
  }
  return TP_LINKS.tours
}

export function buildKKdayLink(destinationName = ''): string {
  if (destinationName) {
    const encoded = encodeURIComponent(destinationName)
    return `https://kkday.tpx.gr/XAT6cm1e?keyword=${encoded}`
  }
  return TP_LINKS.kkday
}

export function buildHotelLink(): string {
  // Replace empty string once you generate the Hotellook link
  return TP_LINKS.hotels || 'https://hotellook.com'
}

export function buildInsuranceLink(): string {
  return TP_LINKS.insurance || 'https://www.worldnomads.com'
}

export function buildCarRentalLink(): string {
  return TP_LINKS.cars || 'https://www.kiwitaxi.com'
}

export function buildYesimLink(): string {
  return TP_LINKS.yesim || 'https://yesim.app'
}

// ─── REQUIRED ON ALL AFFILIATE LINKS ─────────────────────────────
export const TP_LINK_PROPS = {
  target: '_blank' as const,
  rel: 'noopener noreferrer sponsored',
}

// ─── IATA CODE MAP ───────────────────────────────────────────────
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
  'langkawi':       'LGK',
  'penang':         'PEN',
}

export function getIATA(slug: string, iataCode?: string): string {
  return iataCode || IATA_MAP[slug] || ''
}
