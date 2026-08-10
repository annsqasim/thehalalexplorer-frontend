'use client'
// components/travelpayouts/HotelSearchWidget.tsx

interface Props {
  destinationName?: string
}

export function HotelSearchWidget({ destinationName }: Props) {
  const marker = process.env.NEXT_PUBLIC_TP_MARKER || '20736'
  const trs    = process.env.NEXT_PUBLIC_TP_TRS    || '556314'

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form     = e.currentTarget
    const city     = (form.elements.namedItem('city') as HTMLInputElement).value
    const checkin  = (form.elements.namedItem('checkin') as HTMLInputElement).value
    const checkout = (form.elements.namedItem('checkout') as HTMLInputElement).value

    const hotellookUrl = `https://hotellook.com/search?destination=${encodeURIComponent(city)}&checkIn=${checkin}&checkOut=${checkout}&adults=2`
    const redirectUrl  = `https://tp.media/r?marker=${marker}&trs=${trs}&p=101&u=${encodeURIComponent(hotellookUrl)}`
    window.open(redirectUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-[#1D6A5B] px-4 py-3">
        <p className="text-white font-semibold text-sm">
          🏨 {destinationName ? `Hotels in ${destinationName}` : 'Find Hotels'}
        </p>
        <p className="text-white/70 text-xs mt-0.5">
          Compare 2M+ hotels worldwide
        </p>
      </div>
      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Destination</label>
          <input
            name="city"
            defaultValue={destinationName || ''}
            placeholder="e.g. Istanbul"
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1D6A5B]"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Check-in</label>
            <input
              name="checkin"
              type="date"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1D6A5B]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Check-out</label>
            <input
              name="checkout"
              type="date"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#1D6A5B]"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#1D6A5B] hover:bg-[#16574A] text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
        >
          🔍 Browse Hotels →
        </button>
      </form>
      <div className="px-4 pb-3">
        <p className="text-gray-400 text-[10px]">
          Powered by Hotellook via Travelpayouts
        </p>
      </div>
    </div>
  )
}
