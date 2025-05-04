import { client } from './sanity';
import imageUrlBuilder from '@sanity/image-url';

export const imageClient = client;
const builder = imageUrlBuilder(imageClient);

export function urlFor(source: any) {
  return builder.image(source);
}
