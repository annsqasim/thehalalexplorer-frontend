'use client'
// components/booking/ProviderWidget.tsx
// Embeds the active travel provider's hotel or tours widget. Renders nothing
// when the provider has no widget of that kind.

import { useEffect, useRef } from 'react'
import { travelProvider, widgetScript, type WidgetKind } from '@/lib/travel-data'

interface Props {
  kind: WidgetKind
  destinationName?: string
}

const COPY: Record<WidgetKind, { emoji: string; title: (dest?: string) => string; subtitle: string }> = {
  hotels: {
    emoji: '🏨',
    title: (dest) => dest ? `Hotels in ${dest}` : 'Find Hotels',
    subtitle: 'Compare 2M+ hotels worldwide',
  },
  tours: {
    emoji: '🗺️',
    title: (dest) => dest ? `Activities in ${dest}` : 'Browse Activities',
    subtitle: 'Tours, city walks & experiences',
  },
}

export function ProviderWidget({ kind, destinationName }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const src = widgetScript(kind, { destinationName })

  useEffect(() => {
    const container = containerRef.current
    if (!container || !src) return

    container.innerHTML = ''
    const script = document.createElement('script')
    script.async = true
    script.charset = 'utf-8'
    script.src = src
    container.appendChild(script)

    return () => {
      container.innerHTML = ''
    }
  }, [src])

  if (!src) return null
  const copy = COPY[kind]

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-soft">
      <div className="bg-[#1D6A5B] px-4 py-3">
        <p className="text-white font-semibold text-sm">
          {copy.emoji} {copy.title(destinationName)}
        </p>
        <p className="text-white/70 text-xs mt-0.5">{copy.subtitle}</p>
      </div>

      <div ref={containerRef} className="p-3 min-h-[160px]" />

      {travelProvider.attribution && (
        <div className="px-4 pb-3">
          <p className="text-gray-400 text-[10px]">{travelProvider.attribution}</p>
        </div>
      )}
    </div>
  )
}
