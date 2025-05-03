import { client } from '@/lib/sanity';
import Image from 'next/image';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const query = `*[_type == "destination" && slug.current == $slug][0]{
    name,
    country,
    description
  }`;

  const data = await client.fetch(query, { slug: params.slug });

  if (!data) {
    return {
      title: 'Destination not found',
    };
  }

  return {
    title: `${data.name}, ${data.country} | The Halal Explorer`,
    description: data.description,
    openGraph: {
      title: `${data.name}, ${data.country}`,
      description: data.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.name}, ${data.country}`,
      description: data.description,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "destination" && defined(slug.current)][].slug.current`);
  return slugs.map((slug) => ({ slug }));
}

export default async function DestinationPage({ params }) {
  const query = `*[_type == "destination" && slug.current == $slug][0]{
    name,
    country,
    description,
    halalFoodInfo,
    prayerFacilities,
    bestTimeToVisit,
    image {
      asset->{
        url
      }
    }
  }`;

  const destination = await client.fetch(query, { slug: params.slug });

  if (!destination) {
    return <div>Destination not found</div>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{destination.name}, {destination.country}</h1>
      {destination.image?.asset?.url && (
        <Image
          src={destination.image.asset.url}
          alt={destination.name}
          width={800}
          height={500}
          className="w-full h-auto mb-6 rounded"
        />
      )}
      <p className="mb-4"><strong>Description:</strong> {destination.description}</p>
      <p className="mb-2"><strong>Halal Food:</strong> {destination.halalFoodInfo}</p>
      <p className="mb-2"><strong>Prayer Facilities:</strong> {destination.prayerFacilities}</p>
      <p className="mb-2"><strong>Best Time to Visit:</strong> {destination.bestTimeToVisit}</p>
    </div>
  );
}
