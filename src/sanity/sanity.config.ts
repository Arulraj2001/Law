import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "xyz-law-coaching";
const projectId = rawProjectId.replace(/_/g, "-");
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "xyz-law-coaching",
  title: "XYZ Law Coaching — Admin",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: "2024-01-01" }),
  ],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {},
  },
});
