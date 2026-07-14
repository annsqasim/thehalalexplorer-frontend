export function addAmazonTag(url: string): string {
  const tag = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;
  if (!url || !tag) return url;
  try {
    const parsed = new URL(url);
    parsed.searchParams.set('tag', tag);
    return parsed.toString();
  } catch {
    return url;
  }
}

export function buildBookingUrl(destinationName: string, customUrl?: string): string {
  if (customUrl) return customUrl;
  const aid = process.env.NEXT_PUBLIC_BOOKING_AFFILIATE_AID;
  const encoded = encodeURIComponent(destinationName);
  return `https://www.booking.com/search.html?ss=${encoded}${aid ? `&aid=${aid}` : ''}`;
}

export const AFFILIATE_LINK_PROPS = {
  target: '_blank' as const,
  rel: 'noopener noreferrer sponsored',
};
