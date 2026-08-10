'use client'
// Embeds the Travelpayouts Aviasales flight search form
// Renders as a compact search box on destination pages and homepage
// Props: origin (default 'DXB'), destination (pre-filled for destination pages)

import { useEffect, useRef } from 'react'

interface Props {
  origin?: string        // IATA code, default 'DXB'
  destination?: string   // IATA code, pre-fills destination field
  marker?: string        // from process.env.NEXT_PUBLIC_TP_MARKER
  locale?: string        // default 'en'
}

export function FlightSearchWidget({ origin = 'DXB', destination, marker, locale = 'en' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const tpMarker = marker || process.env.NEXT_PUBLIC_TP_MARKER || ''
    // Travelpayouts search form — injected via their script
    // Full docs: https://support.travelpayouts.com/hc/en-us/articles/203956017
    const script = document.createElement('script')
    script.src = 'https://tp.media/content'
    script.async = true
    script.dataset.tpWidgetLookup = 'search_form'
    script.dataset.origin = origin
    if (destination) script.dataset.destination = destination
    script.dataset.locale = locale
    script.dataset.marker = tpMarker
    script.dataset.host = process.env.NEXT_PUBLIC_TP_HOST || 'www.thehalalexplorer.com'
    container.appendChild(script)

    return () => {
      // Capture ref value before cleanup to avoid stale closure
      container.innerHTML = ''
    }
  }, [origin, destination, marker, locale])

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-soft">
      <div className="bg-[#1D6A5B] px-4 py-3">
        <p className="text-white font-semibold text-sm">
          ✈️ Search Flights
        </p>
        <p className="text-white/70 text-xs mt-0.5">
          Compare prices across 100+ airlines
        </p>
      </div>
      <div ref={containerRef} className="p-3 min-h-[120px]" />
      <div className="px-4 pb-3">
        <p className="text-gray-400 text-[10px]">
          Powered by Aviasales via Travelpayouts
        </p>
      </div>
    </div>
  )
}
