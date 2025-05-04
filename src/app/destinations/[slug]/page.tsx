import { client } from '@/lib/sanity';
import Image from 'next/image';
import { Metadata } from 'next'
import { getDestinationBySlug } from '@/lib/sanity/queries';
import { PortableText } from '@portabletext/react';

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const destination = await getDestinationBySlug(params.slug)

  return {
    title: `${destination?.title} | The Halal Explorer`,
    description: destination?.description,
    openGraph: {
      title: destination?.title,
      description: destination?.description,
      images: [
        {
          url: destination?.mainImage, // Replace with your image field
          width: 800,
          height: 600,
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "destination" && defined(slug.current)][].slug.current`);
  return slugs.map((slug: string) => ({ slug }));
}

export default async function DestinationPage({params}: Props) {
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
    <>
      {destination.image && (
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
      <h1 className="text-3xl font-bold mb-4">{destination.name}, {destination.country}</h1>
      <p className="mb-4"><strong>Description:</strong> {destination.description}</p>
      <p className="mb-2"><strong>Halal Food:</strong> {destination.halalFoodInfo}</p>
      <p className="mb-2"><strong>Prayer Facilities:</strong> {destination.prayerFacilities}</p>
      <p className="mb-2"><strong>Best Time to Visit:</strong> {destination.bestTimeToVisit}</p>
      <div className="prose prose-lg max-w-none">
        <PortableText value={destination.content} />
      </div>
    </div>
    </>
    
  );
}
