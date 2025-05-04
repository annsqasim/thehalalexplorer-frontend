// lib/sanity/queries.ts
import { client } from '../sanity';

export async function getDestinationBySlug(slug: string) {
  const query = `*[_type == "destination" && slug.current == $slug][0]{
    title,
    description,
    "mainImage": mainImage.asset->url
  }`;

  const params = { slug };

  return await client.fetch(query, params);
}
