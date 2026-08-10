'use client'
// Loads the Travelpayouts widget script once per page
// Usage: place <TravelpayoutsScript /> in the layout or page
// where a widget is needed

import Script from 'next/script'

export function TravelpayoutsScript() {
  return (
    <Script
      src="https://tp.media/content"
      strategy="lazyOnload"
    />
  )
}
