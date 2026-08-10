// Simple CTA card with Travelpayouts deep-link
// Use when you want a button rather than a full search form
// Matches existing site card styling exactly

import { TP_LINK_PROPS } from '@/lib/travelpayouts'

type CtaType = 'flights' | 'hotels' | 'tours' | 'insurance' | 'cars'

interface Props {
  type: CtaType
  destinationName?: string   // City name e.g. "Kuala Lumpur"
  href: string               // Pre-built affiliate URL from lib/travelpayouts.ts
}

const CONFIG: Record<CtaType, {
  emoji: string
  title: string
  desc: string
  btnText: string
  btnColor: string
}> = {
  flights: {
    emoji: '✈️',
    title: 'Search Flights',
    desc: 'Compare 100+ airlines. Best prices guaranteed.',
    btnText: 'Find Cheapest Flights →',
    btnColor: 'bg-[#1D6A5B] hover:bg-[#16574A]',
  },
  hotels: {
    emoji: '🏨',
    title: 'Book Hotels',
    desc: 'Muslim-friendly hotels with halal breakfast and prayer facilities.',
    btnText: 'Browse Hotels →',
    btnColor: 'bg-[#1D6A5B] hover:bg-[#16574A]',
  },
  tours: {
    emoji: '🗺️',
    title: 'Halal-Friendly Activities',
    desc: 'Food tours, mosque visits, city walks and more.',
    btnText: 'Browse Activities →',
    btnColor: 'bg-[#1D6A5B] hover:bg-[#16574A]',
  },
  insurance: {
    emoji: '🛡️',
    title: 'Travel Insurance',
    desc: 'Protect your trip. Medical, cancellation, and baggage cover.',
    btnText: 'Get a Quote →',
    btnColor: 'bg-[#F59E0B] hover:bg-[#D97706]',
  },
  cars: {
    emoji: '🚗',
    title: 'Rent a Car',
    desc: 'Compare car rental prices from trusted providers.',
    btnText: 'Compare Car Rentals →',
    btnColor: 'bg-[#1D6A5B] hover:bg-[#16574A]',
  },
}

export function TpCtaCard({ type, destinationName, href }: Props) {
  const config = CONFIG[type]

  return (
    // Matches existing site card style: bg-white border border-gray-200 rounded-xl
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-soft flex flex-col justify-between h-full">
      <div>
        <div className="text-2xl mb-3">{config.emoji}</div>
        <h3 className="font-semibold text-gray-900 text-base mb-1">
          {destinationName ? `${config.title} to ${destinationName}` : config.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {config.desc}
        </p>
      </div>
      <a
        href={href}
        suppressHydrationWarning
        {...TP_LINK_PROPS}
        className={`
          block w-full text-center text-white font-semibold text-sm
          py-2.5 rounded-lg transition-colors mt-auto
          ${config.btnColor}
        `}
      >
        {config.btnText}
      </a>
    </div>
  )
}
