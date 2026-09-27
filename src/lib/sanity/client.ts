import { createClient } from "next-sanity";

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "xyz-law-coaching";
const projectId = rawProjectId.replace(/_/g, "-");
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
  perspective: "published",
  stega: {
    enabled: false,
  },
});

export const sanityPreviewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: "previewDrafts",
});
