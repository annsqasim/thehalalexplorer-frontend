// Renders the Travelpayouts White Label flight search widget
// The global WL script (loaded in layout.tsx) detects these container divs
// and mounts the search form + results into them automatically.
// Only ONE instance of this widget should exist per page (IDs are fixed).

export function FlightSearchWidget() {
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
      <div className="p-3">
        <div id="tpwl-search" />
        <div id="tpwl-tickets" />
      </div>
      <div className="px-4 pb-3">
        <p className="text-gray-400 text-[10px]">
          Powered by Aviasales via Travelpayouts
        </p>
      </div>
    </div>
  )
}
