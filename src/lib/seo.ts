import { SITE_URL } from '@/lib/constants/site';
import { urlFor } from '@/lib/imageBuilder';
import type { Metadata } from 'next';

interface SeoImageSource {
  asset?: { url?: string };
}

interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string | string[];
  canonicalUrl?: string;
  seoImage?: SeoImageSource;
  image?: SeoImageSource;
  mainImage?: SeoImageSource;
}

export function buildPageMetadata({
  data,
  path,
  fallbackTitle,
  fallbackDescription,
  type = 'website',
}: {
  data: SeoFields;
  path: string;
  fallbackTitle: string;
  fallbackDescription: string;
  type?: 'website' | 'article';
}): Metadata {
  const title = data.metaTitle || fallbackTitle;
  const description = data.metaDescription || fallbackDescription;
  const canonical = data.canonicalUrl || `${SITE_URL}${path}`;
  const ogImageSource = data.seoImage || data.mainImage || data.image;

  let ogImageUrl: string | undefined;
  if (ogImageSource?.asset?.url) {
    ogImageUrl = ogImageSource.asset.url;
  } else if (ogImageSource && 'asset' in ogImageSource) {
    try {
      ogImageUrl = urlFor(ogImageSource as object).width(1200).height(630).url();
    } catch {
      ogImageUrl = undefined;
    }
  }

  const keywords = Array.isArray(data.metaKeywords)
    ? data.metaKeywords
    : data.metaKeywords?.split(',').map((k) => k.trim()).filter(Boolean);

  return {
    title,
    description,
    keywords: keywords?.length ? keywords : undefined,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'The Halal Explorer',
      type,
      images: ogImageUrl
        ? [{ url: ogImageUrl, width: 1200, height: 630, alt: title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}
