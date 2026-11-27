import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, BedDouble, MapPin, Moon } from "lucide-react";
import { formatDistance, formatPrice, type PackageCard as PackageCardData, type PackageHotel } from "@/lib/umrah-packages";

export function Stars({ count }: { count: number }) {
  return (
    <span className="text-[#F59E0B]" aria-label={`${count}-star`}>
      {"★".repeat(count)}
      <span className="text-gray-300">{"★".repeat(Math.max(0, 5 - count))}</span>
    </span>
  );
}

export function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F5F1] px-2 py-0.5 text-xs font-medium text-[#1D6A5B]">
      <BadgeCheck className="h-3.5 w-3.5" aria-hidden /> Verified
    </span>
  );
}

function HotelLine({ city, hotel }: { city: string; hotel: PackageHotel }) {
  const distance = formatDistance(hotel.distanceMeters);
  return (
    <p className="text-sm text-gray-600">
      <span className="font-medium text-gray-900">{city}:</span> <Stars count={hotel.stars} />
      {distance && <span className="text-gray-500"> · {distance}</span>}
    </p>
  );
}

export function PackageCard({ pkg }: { pkg: PackageCardData }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md">
      {pkg.imageUrl && (
        <div className="relative h-40 overflow-hidden">
          <Image
            src={pkg.imageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {pkg.isFeatured && (
            <span className="rounded-full bg-[#F59E0B] px-2 py-0.5 font-semibold text-white">Featured</span>
          )}
          <span className="inline-flex items-center gap-1 text-gray-500">
            <MapPin className="h-3.5 w-3.5" aria-hidden /> From {pkg.departureCity}
          </span>
        </div>
        <h3 className="text-lg font-semibold leading-snug text-gray-900">
          {/* The whole card is clickable through this link's overlay */}
          <Link href={`/umrah/packages/${pkg.slug}`} className="after:absolute after:inset-0 group-hover:text-[#1D6A5B]">
            {pkg.title}
          </Link>
        </h3>
        <p className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
          {pkg.agency.name}
          {pkg.agency.isVerified && <VerifiedBadge />}
        </p>
        <p className="inline-flex items-center gap-1.5 text-sm text-gray-700">
          <Moon className="h-4 w-4 text-[#1D6A5B]" aria-hidden />
          {pkg.totalNights} nights: {pkg.makkahNights} Makkah, {pkg.madinahNights} Madinah
        </p>
        <div className="space-y-1">
          <HotelLine city="Makkah" hotel={pkg.makkahHotel} />
          <HotelLine city="Madinah" hotel={pkg.madinahHotel} />
        </div>
        {pkg.includes.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {pkg.includes.slice(0, 5).map((item) => (
              <li key={item} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs capitalize text-gray-700">
                {item}
              </li>
            ))}
            {pkg.includes.length > 5 && (
              <li className="px-1 text-xs text-gray-500">+{pkg.includes.length - 5} more</li>
            )}
          </ul>
        )}
        <div className="mt-auto flex items-end justify-between border-t border-gray-100 pt-3">
          <p className="text-sm text-gray-500">
            From <span className="block text-xl font-bold text-gray-900">{formatPrice(pkg.priceFrom, pkg.currency)}</span>
          </p>
          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
            <BedDouble className="h-4 w-4" aria-hidden /> per person
          </span>
        </div>
      </div>
    </article>
  );
}
