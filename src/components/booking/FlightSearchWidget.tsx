'use client'
// components/booking/FlightSearchWidget.tsx
// Small search form that opens the active travel provider's flight search.
// Renders nothing when the provider has no flight link.

import { bookingLink, travelProvider } from '@/lib/travel-data'

interface Props {
  originIATA?: string
  destinationIATA?: string  // pre-fills destination
  destinationName?: string  // shown in header
}

export function FlightSearchWidget({
  originIATA = '',
  destinationIATA,
  destinationName,
}: Props) {
  if (!bookingLink('flights', { destinationName, destinationIATA })) return null

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const value = (name: string) => (form.elements.namedItem(name) as HTMLInputElement).value
    const url = bookingLink('flights', {
      originIATA: value('origin').toUpperCase(),
      destinationIATA: value('dest').toUpperCase(),
      destinationName,
      departDate: value('date'),
    })
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-[#1D6A5B] px-4 py-3">
        <p className="text-white font-semibold text-sm">
          ✈️ Search Flights {destinationName ? `to ${destinationName}` : ''}
        </p>
        <p className="text-white/70 text-xs mt-0.5">
          Compare 100+ airlines
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">From</label>
          <input
            name="origin"
            defaultValue={originIATA}
            placeholder="e.g. LHR"
            maxLength={3}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm uppercase font-mono focus:outline-none focus:border-[#1D6A5B]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">To</label>
          <input
            name="dest"
            defaultValue={destinationIATA || ''}
            placeholder="e.g. KUL"
            maxLength={3}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm uppercase font-mono focus:outline-none focus:border-[#1D6A5B]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Departure Date</label>
          <input
            name="date"
            type="date"
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1D6A5B]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#1D6A5B] hover:bg-[#16574A] text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
        >
          🔍 Find Cheapest Flights →
        </button>
      </form>

      {travelProvider.attribution && (
        <div className="px-4 pb-3">
          <p className="text-gray-400 text-[10px]">{travelProvider.attribution}</p>
        </div>
      )}
    </div>
  )
}
