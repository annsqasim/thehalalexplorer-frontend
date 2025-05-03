import { client } from '../../lib/sanity';
import Link from 'next/link';

export const revalidate = 60; // ISR: revalidate every 60 seconds

export const metadata = {
    title: 'Explore Halal-Friendly Destinations | The Halal Explorer',
    description: 'Browse a curated list of halal-friendly travel destinations with information on food, prayer facilities, and travel tips.',
    openGraph: {
      title: 'Explore Halal-Friendly Destinations',
      description: 'Discover places to travel as a Muslim with halal food, mosques, and more.',
    },
    twitter: {
      card: 'summary',
      title: 'Explore Halal-Friendly Destinations',
      description: 'Discover Muslim-friendly travel spots worldwide.',
    },
  };
  

export default async function DestinationsPage() {
  const query = `*[_type == "destination"]{
    _id,
    name,
    country,
    slug,
    description,
    halalFoodInfo,
    prayerFacilities,
    bestTimeToVisit,
    image{
      asset->{
        url
      }
    }
  }`;

  const destinations = await client.fetch(query);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Destinations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {destinations.map((dest) => (
          <Link href={`/destinations/${dest.slug.current}`}>
          <h2 className="text-xl font-semibold hover:underline">
            {dest.name}, {dest.country}
          </h2>
        </Link>
        ))}
      </div>
    </div>
  );
}
