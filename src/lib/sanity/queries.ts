// lib/sanity/queries.ts
import { client } from '../sanity';

export async function getDestinationBySlug(slug: string) {
  const query = `*[_type == "destination" && slug.current == $slug][0]{
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

  const params = { slug };

  return await client.fetch(query, params);
}

export async function getAllDestinations() {
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

  return await client.fetch(query);
}

export async function getFeaturedDestinations() {
  const query = `*[_type == "destination" && isFeatured == true]{
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

  return await client.fetch(query);
}

export async function getHomepageData() {
  const query = `*[_type == "homepage"][0]{
    title,
    subtitle,
    description,
    aboutSection,
    metaTitle,
    metaDescription,
    metaKeywords,
    heroImage{
      asset->{
        _id,
        url
      }
    }
  }`;

  return await client.fetch(query);
}

export async function getAllBlogPosts() {
  const query = `*[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug { current },
    shortDescription,
    mainImage {
      asset->{
        url
      }
    },
    author,
    publishedAt,
    categories,
    isFeatured,
    metaTitle,
    metaDescription
  }`;

  return await client.fetch(query);
}

export async function getBlogBySlug(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug][0]{
    _id,
    title,
    slug { current },
    shortDescription,
    mainImage{asset->{url}},
    author,
    publishedAt,
    categories,
    metaTitle,
    metaDescription,
    body
  }`;
  return await client.fetch(query, { slug });
}

export async function getAllBlogSlugs() {
  const query = `*[_type == "blog" && defined(slug.current)][].slug.current`;
  return await client.fetch<string[]>(query);
}

export async function getAllDestinationSlugs() {
  const query = `*[_type == "destination" && defined(slug.current)][].slug.current`;
  return await client.fetch<string[]>(query);
}