// lib/sanity/queries.ts
import { client } from '../sanity';

const destinationFields = `
    _id,
    name,
    country,
    slug,
    description,
    intro,
    about,
    whyMuslimsLoveIt,
    halalFoodInfo,
    halalFoodItems,
    prayerFacilities,
    mosqueItems,
    bestTimeToVisit,
    travelTips,
    quickFacts,
    conclusion,
    muslimFriendlyScore,
    ratings,
    affiliateProducts[]{
      emoji,
      label,
      productName,
      description,
      amazonUrl,
      priceRange,
      image{ asset->{ url } }
    },
    bookingComUrl,
    region,
    metaTitle,
    metaDescription,
    metaKeywords,
    canonicalUrl,
    details,
    isFeatured,
    image{ asset->{ url } },
    seoImage{ asset->{ url } },
    nearbyDestinations[]->{
      _id, name, country, slug
    }
`;

export async function getDestinationBySlug(slug: string) {
  const query = `*[_type == "destination" && slug.current == $slug][0]{${destinationFields}}`;
  return await client.fetch(query, { slug });
}

export async function getAllDestinations() {
  const query = `*[_type == "destination"] | order(name asc){${destinationFields}}`;
  return await client.fetch(query);
}

export async function getFeaturedDestinations() {
  const query = `*[_type == "destination" && isFeatured == true]{
    _id, name, country, slug, description, intro,
    muslimFriendlyScore, region, isFeatured,
    image{ asset->{ url } }
  }`;
  return await client.fetch(query);
}

export async function getHomepageData() {
  const query = `*[_type == "homepage"][0]{
    title, subtitle, description, aboutSection,
    metaTitle, metaDescription, metaKeywords, canonicalUrl,
    statsBar,
    emailCaptureTitle, emailCaptureDescription, emailCapturePerks,
    emailCaptureCta, emailCaptureNote,
    featuredAffiliateProducts[]{
      _type == "reference" => @->{
        _id,
        productName,
        emoji,
        description,
        "amazonUrl": coalesce(amazonUrlAE, amazonUrlUS, amazonUrlUK, "#"),
        "priceRange": priceRangeAE,
        image{ asset->{ url } }
      },
      _type != "reference" => {
        emoji,
        label,
        productName,
        description,
        amazonUrl,
        priceRange,
        image{ asset->{ url } }
      }
    },
    heroImage{ asset->{ _id, url } }
  }`;
  const data = await client.fetch(query);

  if (!data?.featuredAffiliateProducts?.length) {
    const standaloneProducts = await client.fetch(`*[_type == "affiliateProduct" && isFeatured == true]{
      _id,
      productName,
      emoji,
      description,
      "amazonUrl": coalesce(amazonUrlAE, amazonUrlUS, amazonUrlUK, "#"),
      "priceRange": priceRangeAE,
      image{ asset->{ url } }
    }`);
    if (data) {
      data.featuredAffiliateProducts = standaloneProducts;
    }
  }

  return data;
}

export async function getLatestBlogPosts(limit = 3) {
  const query = `*[_type in ["blog","blogPost"]] | order(publishedAt desc)[0...${limit}]{
    _id, title, slug, shortDescription, categories, readTime,
    mainImage{ asset->{ url } }
  }`;
  return await client.fetch(query);
}

export async function getAllBlogPosts() {
  const query = `*[_type == "blog"] | order(publishedAt desc) {
    _id, title, slug { current }, shortDescription,
    mainImage { asset->{ url } }, author, publishedAt,
    categories, isFeatured, metaTitle, metaDescription, canonicalUrl, readTime
  }`;
  return await client.fetch(query);
}

export async function getBlogBySlug(slug: string) {
  const query = `*[_type in ["blog","blogPost"] && slug.current == $slug][0]{
    _id, title, slug { current }, shortDescription,
    mainImage{ asset->{ url } }, seoImage{ asset->{ url } },
    author, publishedAt, categories,
    metaTitle, metaDescription, metaKeywords, canonicalUrl,
    readTime, hasAffiliateLinks, affiliateProducts,
    sidebarCtaTitle, sidebarCtaDescription, body,
    relatedDestinations[]->{ _id, name, country, slug, image{ asset->{ url } }, description, intro }
  }`;
  return await client.fetch(query, { slug });
}

export async function getAllBlogSlugs() {
  const query = `*[_type in ["blog","blogPost"] && defined(slug.current)][].slug.current`;
  return await client.fetch<string[]>(query);
}

export async function getAllDestinationSlugs() {
  const query = `*[_type == "destination" && defined(slug.current)][].slug.current`;
  return await client.fetch<string[]>(query);
}
