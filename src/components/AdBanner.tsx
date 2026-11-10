"use client"
import { useEffect, useRef } from "react"

interface Props {
  slot: string
  format?: "auto" | "rectangle" | "banner" | "fluid"
}

const MIN_WIDTH: Record<NonNullable<Props["format"]>, number> = {
  auto: 250,
  fluid: 250,
  banner: 320,
  rectangle: 300,
}

/**
 * AdSense slot. Takes up no space and shows nothing until Google actually
 * fills it: the old grey "Advertisement Space" placeholder was visible to
 * visitors and made pages look unfinished. Unfilled slots are hidden by the
 * `ins.adsbygoogle[data-ad-status="unfilled"]` rule in globals.css.
 */
export function AdBanner({ slot, format = "fluid" }: Props) {
  const adRef = useRef<HTMLDivElement | null>(null)
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-5911518106581623"
  const minWidth = MIN_WIDTH[format]

  useEffect(() => {
    const container = adRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && container.offsetWidth >= minWidth) {
          try {
            // @ts-expect-error adsbygoogle is injected by the AdSense script
            ;(window.adsbygoogle = window.adsbygoogle || []).push({})
          } catch (err) {
            console.error("AdSense error:", err)
          }
          observer.disconnect()
        }
      },
      { threshold: 0 },
    )

    // Small delay so layout is complete before the width check
    const timer = setTimeout(() => observer.observe(container), 100)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [minWidth])

  if (!slot) return null

  return (
    <div ref={adRef} className="ad-slot w-full overflow-hidden text-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
