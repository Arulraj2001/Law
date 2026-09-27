import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { dashboardTool } from "@sanity/dashboard";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";
import {
  welcomeWidget,
  statsWidget,
  siteSettingsWidget,
  quickActionsWidget,
  batchWidget,
  examUpdatesWidget,
  contentHealthWidget,
  leadsWidget,
  studioGuideWidget,
} from "./plugins/dashboard";
import { leadsPlugin } from "./plugins/leads";

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "xyz-law-coaching";
const projectId = rawProjectId.replace(/_/g, "-");
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "xyz-law-coaching",
  title: "XYZ Law Coaching — Admin",
  projectId,
  dataset,
  document: {
    productionUrl: async (prev, context) => {
      const { document } = context;
      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

      if (document._type === "blogPost") {
        const slug = (document.slug as any)?.current;
        if (slug) return `${baseUrl}/blog/${slug}`;
      }

      if (document._type === "course") {
        const slug = (document.slug as any)?.current;
        if (slug) return `${baseUrl}/courses/${slug}`;
      }

      if (document._type === "siteSettings") {
        return baseUrl;
      }

      return prev;
    },
  },
  plugins: [
    dashboardTool({
      title: "Dashboard",
      name: "dashboard",
      widgets: [
        welcomeWidget,
        statsWidget,
        {
          ...siteSettingsWidget,
          layout: { width: "full" },
        },
        quickActionsWidget,
        batchWidget,
        examUpdatesWidget,
        contentHealthWidget,
        leadsWidget,
        studioGuideWidget,
      ],
    }),
    structureTool({ structure }),
    leadsPlugin(),
    visionTool({ defaultApiVersion: "2024-01-01" }),
  ],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {},
  },
});
