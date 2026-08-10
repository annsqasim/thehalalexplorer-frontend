'use client'
// components/travelpayouts/HotelSearchWidget.tsx
// Embeds official Travelpayouts Hotellook hotel widget (promo_id=4497, campaign_id=137)

import { useEffect, useRef } from 'react'

interface Props {
  destinationName?: string
}

export function HotelSearchWidget({ destinationName }: Props) {
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
    script.src = `https://tpwgts.com/content?currency=USD&trs=${trs}&shmarker=${marker}.thx&locale=en&city_id=2&category=4&amount=3&powered_by=true&campaign_id=137&promo_id=4497`

    container.appendChild(script)

    return () => {
      container.innerHTML = ''
    }
  }, [marker, trs])

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-soft">
      <div className="bg-[#1D6A5B] px-4 py-3">
        <p className="text-white font-semibold text-sm">
          🏨 {destinationName ? `Hotels in ${destinationName}` : 'Find Hotels'}
        </p>
        <p className="text-white/70 text-xs mt-0.5">
          Compare 2M+ hotels worldwide
        </p>
      </div>

      <div ref={containerRef} className="p-3 min-h-[160px]" />

      <div className="px-4 pb-3">
        <p className="text-gray-400 text-[10px]">
          Powered by Hotellook via Travelpayouts
        </p>
      </div>
    </div>
  )
}
