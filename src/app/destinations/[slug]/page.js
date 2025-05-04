import { client } from '@/lib/sanity';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const destination = await getDestinationBySlug(params.slug);

  return {
    title: `${destination?.title} | The Halal Explorer`,
    description: destination?.description,
    openGraph: {
      title: destination?.title,
      description: destination?.description,
      images: [
        {
          url: destination?.mainImage || '',
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "destination" && defined(slug.current)][].slug.current`
  );
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
    content,
    image {
      asset->{
        url
      }
    }
  }`;

  const destination = await client.fetch(query, {
    slug: params.slug,
  });

  if (!destination) {
    return (
      <div className="p-8 text-center text-red-500">Destination not found.</div>
    );
  }

  return (
    <>
      {destination.image?.asset?.url && (
        <div className="relative w-full h-96 mb-6">
          <Image
            src={destination.image.asset.url}
            alt={destination.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          {destination.name}, {destination.country}
        </h1>
        <p className="mb-4">
          <strong>Description:</strong> {destination.description}
        </p>
        <p className="mb-2">
          <strong>Halal Food:</strong> {destination.halalFoodInfo}
        </p>
        <p className="mb-2">
          <strong>Prayer Facilities:</strong> {destination.prayerFacilities}
        </p>
        <p className="mb-2">
          <strong>Best Time to Visit:</strong> {destination.bestTimeToVisit}
        </p>
        {destination.content && (
          <div className="prose prose-lg max-w-none">
            <PortableText value={destination.content} />
          </div>
        )}
      </div>
    </>
  );
}

// You need to define getDestinationBySlug if not already
async function getDestinationBySlug(slug) {
  const query = `*[_type == "destination" && slug.current == $slug][0]{
    title,
    description,
    mainImage
  }`;
  return await client.fetch(query, { slug });
}
