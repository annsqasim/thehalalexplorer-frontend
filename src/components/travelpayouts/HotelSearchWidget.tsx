'use client'
// Embeds Hotellook hotel search form
// Place in: destination page sidebar, homepage

import { useEffect, useRef } from 'react'

interface Props {
  destination?: string   // City name, pre-fills search
  marker?: string
}

export function HotelSearchWidget({ destination, marker }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const tpMarker = marker || process.env.NEXT_PUBLIC_TP_MARKER || ''
    const script = document.createElement('script')
    script.src = 'https://tp.media/content'
    script.async = true
    script.dataset.tpWidgetLookup = 'hotellook_search_form'
    if (destination) script.dataset.destination = destination
    script.dataset.marker = tpMarker
    script.dataset.host = process.env.NEXT_PUBLIC_TP_HOST || 'www.thehalalexplorer.com'
    script.dataset.locale = 'en'
    container.appendChild(script)

    return () => {
      container.innerHTML = ''
    }
  }, [destination, marker])

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-soft">
      <div className="bg-[#1D6A5B] px-4 py-3">
        <p className="text-white font-semibold text-sm">
          🏨 Find Hotels
        </p>
        <p className="text-white/70 text-xs mt-0.5">
          {destination ? `Hotels in ${destination}` : 'Compare 2M+ hotels worldwide'}
        </p>
      </div>
      <div ref={containerRef} className="p-3 min-h-[120px]" />
      <div className="px-4 pb-3">
        <p className="text-gray-400 text-[10px]">
          Powered by Hotellook via Travelpayouts
        </p>
      </div>
    </div>
  )
}
