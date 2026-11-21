import { Metadata } from "next";
import { Suspense } from "react";
import _get from "lodash/get";
import { getAllDestinations } from "@/lib/destinations";
import { getDestinationExcerpt } from "@/lib/destination-content";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { SearchResults, type SearchItem } from "./SearchResults";

export const revalidate = 3600;

// Result pages vary by query string, so keep them out of the index but let
// crawlers follow the links to destination pages.
export const metadata: Metadata = {
  title: "Search Destinations | The Halal Explorer",
  description: "Search Muslim-friendly destinations by city, country or region.",
  robots: { index: false, follow: true },
};

export default async function SearchPage() {
  const destinations = await getAllDestinations();
  const items: SearchItem[] = destinations
    .filter((d) => d.slug?.current)
    .map((d) => ({
      id: String(d._id ?? d.slug.current),
      name: d.name,
      country: d.country,
      region: d.region,
      slug: d.slug.current,
      description: getDestinationExcerpt(d),
      imageUrl: _get(d, "image.asset.url", PLACEHOLDER_IMAGE),
      score: d.muslimFriendlyScore,
    }));

  // useSearchParams in the client component needs a Suspense boundary
  return (
    <Suspense>
      <SearchResults items={items} />
    </Suspense>
  );
}
