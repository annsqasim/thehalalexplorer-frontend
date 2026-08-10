'use client'

// Native interactive hotel search widget
// Routes directly to Travelpayouts Hotellook search with affiliate marker

import { useState } from 'react'
import { buildHotelSearchUrl, TP_LINK_PROPS } from '@/lib/travelpayouts'
import { Hotel, MapPin, Search } from 'lucide-react'

interface Props {
  destination?: string   // City name, pre-fills search
}

export function HotelSearchWidget({ destination = '' }: Props) {
  const [city, setCity] = useState(destination || '')

  const safeCity = (city || '').trim()
  const searchUrl = buildHotelSearchUrl(safeCity || 'Dubai')

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-soft">
      <div className="bg-[#1D6A5B] px-4 py-3">
        <p className="text-white font-semibold text-sm flex items-center gap-1.5">
          <Hotel className="h-4 w-4" /> Find Hotels
        </p>
        <p className="text-white/70 text-xs mt-0.5">
          {city ? `Hotels in ${city}` : 'Compare 2M+ hotels worldwide'}
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          window.open(searchUrl, '_blank', 'noopener,noreferrer,sponsored')
        }}
        className="p-4 space-y-3"
      >
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Destination City</label>
          <div className="relative">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City (e.g. Istanbul)"
              className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1D6A5B]"
            />
          </div>
        </div>

        <a
          href={searchUrl}
          {...TP_LINK_PROPS}
          className="mt-2 block w-full text-center bg-[#1D6A5B] hover:bg-[#16574A] text-white font-semibold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
        >
          <Search className="h-3.5 w-3.5" /> Browse Hotels →
        </a>

        <p className="text-gray-400 text-[10px] text-center pt-1">
          Powered by Hotellook via Travelpayouts
        </p>
      </form>
    </div>
  )
}
