import { client } from '@/lib/sanity';
import { getDestinationBySlug } from '@/lib/sanity/queries';
import Image from 'next/image';
import { Metadata } from 'next';
import { PortableText } from '@portabletext/react';

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

type Destination = {
  name: string;
  country: string;
  description: string;
  halalFoodInfo: string;
  prayerFacilities: string;
  bestTimeToVisit: string;
  content?: any;
  image?: {
    asset: {
      url: string;
    };
  };
  title?: string;
  mainImage?: string;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const destination = await getDestinationBySlug(slug);

  return {
    title: destination?.title
      ? `${destination.title} | The Halal Explorer`
      : 'Destination | The Halal Explorer',
    description: destination?.description || 'Explore global halal-friendly travel destinations.',
    openGraph: {
      title: destination?.title || 'The Halal Explorer',
      description: destination?.description || '',
      images: destination?.mainImage
        ? [
            {
              url: destination.mainImage,
              width: 800,
              height: 600,
            },
          ]
        : [],
    },
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs: string[] = await client.fetch(
    `*[_type == "destination" && defined(slug.current)][].slug.current`
  );
  return slugs.map((slug) => ({ slug }));
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = params;

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

  const destination: Destination | null = await client.fetch(query, { slug });

  if (!destination) {
    return (
      <div className="p-8 text-center text-red-500">
        Destination not found.
      </div>
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
          <div className="prose prose-lg max-w-none mt-6">
            <PortableText value={destination.content} />
          </div>
        )}
      </div>
    </>
  );
}
