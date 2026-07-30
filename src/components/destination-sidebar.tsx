import Link from "next/link";
import { buildBookingUrl, AFFILIATE_LINK_PROPS } from "@/lib/affiliate";
import type { NearbyDestinationRef } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BookingComCard({
  destinationName,
  bookingComUrl,
}: {
  destinationName: string;
  bookingComUrl?: string;
}) {
  if (!bookingComUrl) return null;
  const url = buildBookingUrl(destinationName, bookingComUrl);

  return (
    <Card className="border-0 bg-[#0F1923] text-center shadow-soft">
      <CardContent className="p-5">
        <p className="text-[#F59E0B] text-[10px] uppercase tracking-widest font-semibold mb-2">
          Book Your Stay
        </p>
        <h3 className="text-white font-semibold text-base">Hotels in {destinationName}</h3>
        <p className="text-white/50 text-xs leading-relaxed mt-1">
          Muslim-friendly hotels with prayer mats and halal breakfast.
        </p>
        <a
          href={url}
          {...AFFILIATE_LINK_PROPS}
          className="block w-full mt-4 bg-[#1D6A5B] hover:bg-[#16574A] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          Browse Hotels on Booking.com →
        </a>
      </CardContent>
    </Card>
  );
}

export function NearbyDestinationsCard({
  destinations,
}: {
  destinations: NearbyDestinationRef[];
}) {
  if (!destinations?.length) return null;

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader>
        <CardTitle className="text-xl">Nearby Destinations</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ul>
          {destinations.map((dest) => (
            <li key={dest._id} className="border-b border-gray-100 last:border-b-0">
              <Link
                href={`/destinations/${dest.slug.current}`}
                className="flex items-center gap-3 py-2.5 hover:text-[#1D6A5B] transition-colors group"
              >
                <span className="bg-[#E8F5F1] text-[#1D6A5B] text-[10px] rounded px-1.5 py-0.5 flex-shrink-0">
                  {dest.country}
                </span>
                <span className="text-gray-900 text-sm font-medium flex-1 group-hover:text-[#1D6A5B]">
                  {dest.name}
                </span>
                <span className="text-gray-400 text-xs">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
