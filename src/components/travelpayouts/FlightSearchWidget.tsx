'use client'

// Native interactive flight search widget
// Routes directly to Travelpayouts Aviasales search with affiliate marker

import { useState } from 'react'
import { buildFlightSearchUrl, TP_LINK_PROPS } from '@/lib/travelpayouts'
import { Plane, Calendar, MapPin, Search } from 'lucide-react'

interface Props {
  origin?: string        // IATA code or city, default 'DXB'
  destination?: string   // IATA code or city
}

export function FlightSearchWidget({ origin = 'DXB', destination = '' }: Props) {
  const [from, setFrom] = useState(origin || 'DXB')
  const [to, setTo] = useState(destination || '')
  const [departDate, setDepartDate] = useState('')

  const safeFrom = (from || '').trim().toUpperCase()
  const safeTo = (to || '').trim().toUpperCase()

  const searchUrl = buildFlightSearchUrl({
    origin: safeFrom || 'DXB',
    destination: safeTo || undefined,
    departDate: departDate || undefined,
  })

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-soft">
      <div className="bg-[#1D6A5B] px-4 py-3">
        <p className="text-white font-semibold text-sm flex items-center gap-1.5">
          <Plane className="h-4 w-4" /> Search Flights
        </p>
        <p className="text-white/70 text-xs mt-0.5">
          Compare prices across 100+ airlines
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
          <label className="block text-xs font-semibold text-gray-600 mb-1">From</label>
          <div className="relative">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Origin (e.g. DXB)"
              className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1D6A5B]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">To</label>
          <div className="relative">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Destination (e.g. KUL)"
              className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1D6A5B]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Departure Date</label>
          <div className="relative">
            <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1D6A5B]"
            />
          </div>
        </div>

        <a
          href={searchUrl}
          {...TP_LINK_PROPS}
          className="mt-2 block w-full text-center bg-[#1D6A5B] hover:bg-[#16574A] text-white font-semibold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
        >
          <Search className="h-3.5 w-3.5" /> Find Cheapest Flights →
        </a>

        <p className="text-gray-400 text-[10px] text-center pt-1">
          Powered by Aviasales via Travelpayouts
        </p>
      </form>
    </div>
  )
}
