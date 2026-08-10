// components/travelpayouts/TpCtaCard.tsx
// NO 'use client' needed — this is a server component

import {
  buildFlightLink,
  buildHotelLink,
  buildToursLink,
  buildInsuranceLink,
  buildCarRentalLink,
  TP_LINK_PROPS,
} from '@/lib/travelpayouts'

type CtaType = 'flights' | 'hotels' | 'tours' | 'insurance' | 'cars'

interface Props {
  type: CtaType
  destinationName?: string  // city name e.g. "Istanbul"
  destinationSlug?: string  // slug e.g. "istanbul" (used to look up IATA)
  destinationIATA?: string  // IATA code e.g. "IST" (most accurate)
}

const CONFIG: Record<CtaType, {
  emoji: string
  title: (dest?: string) => string
  desc: string
  btnText: string
}> = {
  flights: {
    emoji: '✈️',
    title: (dest) => dest ? `Flights to ${dest}` : 'Search Flights',
    desc: 'Compare 100+ airlines. Find the cheapest fare.',
    btnText: 'Find Cheapest Flights →',
  },
  hotels: {
    emoji: '🏨',
    title: (dest) => dest ? `Hotels in ${dest}` : 'Find Hotels',
    desc: 'Muslim-friendly hotels. Halal breakfast, prayer mats.',
    btnText: 'Browse Hotels →',
  },
  tours: {
    emoji: '🗺️',
    title: (dest) => dest ? `Activities in ${dest}` : 'Browse Activities',
    desc: 'Food tours, mosque visits, city walks and more.',
    btnText: 'Browse Activities →',
  },
  insurance: {
    emoji: '🛡️',
    title: () => 'Travel Insurance',
    desc: 'Medical, cancellation, and baggage cover from $30.',
    btnText: 'Get a Free Quote →',
  },
  cars: {
    emoji: '🚗',
    title: (dest) => dest ? `Car Rental in ${dest}` : 'Rent a Car',
    desc: 'Compare prices from trusted rental companies.',
    btnText: 'Compare Car Rentals →',
  },
}

function buildHref(type: CtaType, destinationName?: string, destinationIATA?: string): string {
  switch (type) {
    case 'flights':   return buildFlightLink('DXB', destinationIATA || '')
    case 'hotels':    return buildHotelLink(destinationName || '')
    case 'tours':     return buildToursLink(destinationName || '')
    case 'insurance': return buildInsuranceLink()
    case 'cars':      return buildCarRentalLink(destinationName || '')
    default:          return '#'
  }
}

export function TpCtaCard({ type, destinationName, destinationIATA }: Props) {
  const config = CONFIG[type]
  const href = buildHref(type, destinationName, destinationIATA)

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
      <div className="text-2xl">{config.emoji}</div>
      <div>
        <h3 className="font-semibold text-gray-900 text-sm mb-1">
          {config.title(destinationName)}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed">
          {config.desc}
        </p>
      </div>
      <a
        href={href}
        {...TP_LINK_PROPS}
        className="mt-auto block w-full text-center bg-[#1D6A5B] hover:bg-[#16574A] text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
      >
        {config.btnText}
      </a>
    </div>
  )
}
