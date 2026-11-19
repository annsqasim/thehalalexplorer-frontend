// components/booking/BookingCtaCard.tsx
// Server component. Links come from the active travel provider; the card
// renders nothing when the provider has no link for this product.

import { bookingLink, bookingLinkProps, type BookingProduct } from '@/lib/travel-data'

interface Props {
  type: BookingProduct
  destinationName?: string  // city name e.g. "Istanbul"
  destinationIATA?: string  // IATA code e.g. "IST"
}

const CONFIG: Record<BookingProduct, {
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

export function BookingCtaCard({ type, destinationName, destinationIATA }: Props) {
  const href = bookingLink(type, { destinationName, destinationIATA })
  if (!href) return null
  const config = CONFIG[type]

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 flex flex-col gap-3 h-full">
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
        {...bookingLinkProps}
        className="mt-auto block w-full text-center bg-[#1D6A5B] hover:bg-[#16574A] text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
      >
        {config.btnText}
      </a>
    </div>
  )
}
