'use client'
// components/travelpayouts/FlightSearchWidget.tsx
// Embeds official Travelpayouts Aviasales flight search widget (promo_id=7879, campaign_id=100)

import { useEffect, useRef } from 'react'

interface Props {
  originIATA?: string
  destinationIATA?: string
  destinationName?: string
}

export function FlightSearchWidget({
  destinationName,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const marker = process.env.NEXT_PUBLIC_TP_MARKER || '757826'
  const trs = process.env.NEXT_PUBLIC_TP_TRS || '556314'

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.innerHTML = ''
    const script = document.createElement('script')
    script.async = true
    script.charset = 'utf-8'
    script.src = `https://tpwgts.com/content?currency=aed&trs=${trs}&shmarker=${marker}&show_hotels=true&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%231D6A5B&color_button=%231D6A5B&color_icons=%231D6A5B&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%231D6A5B&border_radius=8&plain=true&promo_id=7879&campaign_id=100`

    container.appendChild(script)

    return () => {
      container.innerHTML = ''
    }
  }, [marker, trs])

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-soft">
      <div className="bg-[#1D6A5B] px-4 py-3">
        <p className="text-white font-semibold text-sm">
          ✈️ Search Flights {destinationName ? `to ${destinationName}` : ''}
        </p>
        <p className="text-white/70 text-xs mt-0.5">
          Compare 100+ airlines
        </p>
      </div>

      <div ref={containerRef} className="p-3 min-h-[160px]" />

      <div className="px-4 pb-3">
        <p className="text-gray-400 text-[10px]">
          Powered by Aviasales via Travelpayouts
        </p>
      </div>
    </div>
  )
}
