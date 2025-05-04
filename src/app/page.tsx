import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/imageBuilder';
import Image from 'next/image';
import React from 'react';
import { PortableText } from '@portabletext/react'

export default async function HomePage() {
  const query = `*[_type == "homepage"][0]{
    title,
    subtitle,
    description,
    aboutSection,
    metaTitle,
    metaDescription,
    metaKeywords,
    heroImage,
    heroImage {
      asset->{
        _id,
        url
      }
    }
  }`;

  const homepageData = await client.fetch(query);

  return (
    <main>
      <head>
        <title>{homepageData.metaTitle}</title>
        <meta name="description" content={homepageData.metaDescription} />
        <meta name="keywords" content={homepageData.metaKeywords} />
      </head>

      <section className="relative w-full h-screen overflow-hidden">
        {homepageData.backgroundVideo?.asset?.url ? (
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={homepageData.backgroundVideo.asset.url}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          homepageData.heroImage && (
            <Image
              src={urlFor(homepageData.heroImage).url()}
              alt="Hero"
              fill
              className="object-cover"
            />
          )
        )}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold">{homepageData.title}</h1>
          <p className="text-xl md:text-2xl mt-4">{homepageData.subtitle}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto my-12 px-4 text-center">
        <p className="text-lg">{homepageData.description}</p>
      </section>
      <section>
          <h2 className="text-3xl font-semibold mb-4">About</h2>
          <PortableText value={homepageData.aboutSection} />
        </section>
    </main>
  );
}
