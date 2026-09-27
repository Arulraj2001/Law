export const imageConfig = {
  // Standard sizes for different contexts
  faculty: { width: 400, height: 500 },
  topper: { width: 200, height: 200 },
  blog: { width: 800, height: 400 },
  hero: { width: 1200, height: 630 },
  og: { width: 1200, height: 630 },
};

// Blur placeholder shimmer for images
export const shimmerPlaceholder = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#E6F1FB" offset="20%" />
      <stop stop-color="#B5D4F4" offset="50%" />
      <stop stop-color="#E6F1FB" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#E6F1FB" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export function getBlurDataUrl(w: number, h: number): string {
  return `data:image/svg+xml;base64,${toBase64(shimmerPlaceholder(w, h))}`;
}
