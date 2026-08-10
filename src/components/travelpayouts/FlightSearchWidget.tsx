'use client'
// components/travelpayouts/FlightSearchWidget.tsx
// Uses form embed — reliable and builds correct Travelpayouts redirect URL

interface Props {
  originIATA?: string       // default DXB
  destinationIATA?: string  // pre-fills destination
  destinationName?: string  // shown in header
}

export function FlightSearchWidget({
  originIATA = 'DXB',
  destinationIATA,
  destinationName,
}: Props) {
  const marker = process.env.NEXT_PUBLIC_TP_MARKER || '20736'

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

      {/* Simple form — reliable redirect */}
      <div className="p-4">
        <FlightSearchForm
          originIATA={originIATA}
          destinationIATA={destinationIATA}
          marker={marker}
        />
      </div>

      <div className="px-4 pb-3">
        <p className="text-gray-400 text-[10px]">
          Powered by Aviasales via Travelpayouts
        </p>
      </div>
    </div>
  )
}

// Simple custom form that builds the correct Travelpayouts redirect URL
function FlightSearchForm({
  originIATA,
  destinationIATA,
  marker,
}: {
  originIATA: string
  destinationIATA?: string
  marker: string
}) {
  const trs = process.env.NEXT_PUBLIC_TP_TRS || '556314'

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const origin = (form.elements.namedItem('origin') as HTMLInputElement).value.toUpperCase()
    const dest   = (form.elements.namedItem('dest')   as HTMLInputElement).value.toUpperCase()
    const date   = (form.elements.namedItem('date')   as HTMLInputElement).value.replace(/-/g, '')

    const aviasalesUrl = `https://www.aviasales.com/search/${origin}${date}${dest}1`
    const redirectUrl  = `https://tp.media/r?marker=${marker}&trs=${trs}&p=6809&u=${encodeURIComponent(aviasalesUrl)}`
    window.open(redirectUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">From</label>
        <input
          name="origin"
          defaultValue={originIATA}
          placeholder="e.g. DXB"
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
  )
}
