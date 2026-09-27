import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function getImageUrl(
  source: SanityImageSource,
  width: number,
  height?: number
): string {
  if (height) {
    return builder
      .image(source)
      .width(width)
      .height(height)
      .fit("crop")
      .auto("format")
      .url();
  }
  return builder
    .image(source)
    .width(width)
    .fit("max")
    .auto("format")
    .url();
}

export const urlForImage = urlFor;
