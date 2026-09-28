import { defineType, defineField } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "contact", title: "Contact" },
    { name: "stats", title: "Statistics" },
    { name: "social", title: "Social Media" },
    { name: "content", title: "Content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "Institute Name",
      type: "string",
      description: "Full name of the coaching institute",
      validation: (R) => R.required(),
      group: "general",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short tagline shown below the logo",
      group: "general",
    }),
    defineField({
      name: "founderName",
      title: "Founder / Chief Faculty Name",
      type: "string",
      validation: (R) => R.required(),
      group: "general",
    }),
    defineField({
      name: "establishedYear",
      title: "Established Year",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "phone",
      title: "Primary Phone Number",
      type: "string",
      validation: (R) => R.required(),
      group: "contact",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp Number (with country code, no +)",
      type: "string",
      description: "Example: 919876543210",
      validation: (R) => R.required(),
      group: "contact",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (R) => R.email(),
      group: "contact",
    }),
    defineField({
      name: "address",
      title: "Full Address",
      type: "text",
      rows: 3,
      group: "contact",
    }),
    defineField({
      name: "mapUrl",
      title: "Google Maps URL",
      type: "url",
      group: "contact",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      group: "general",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      group: "general",
    }),
    defineField({
      name: "ogImage",
      title: "Default OG Image (for social sharing)",
      type: "image",
      options: { hotspot: true },
      group: "seo",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      group: "social",
      fields: [
        defineField({
          name: "youtube",
          title: "YouTube Channel URL",
          type: "url",
        }),
        defineField({
          name: "instagram",
          title: "Instagram URL",
          type: "url",
        }),
        defineField({
          name: "facebook",
          title: "Facebook URL",
          type: "url",
        }),
        defineField({
          name: "whatsappChannel",
          title: "WhatsApp Channel URL",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Homepage Statistics",
      type: "object",
      group: "stats",
      fields: [
        defineField({
          name: "studentsCount",
          title: "Students Trained",
          type: "number",
          initialValue: 1000,
        }),
        defineField({
          name: "judgesCount",
          title: "Judges & APPs Selected",
          type: "number",
          initialValue: 25,
        }),
        defineField({
          name: "experienceYears",
          title: "Years of Experience",
          type: "number",
          initialValue: 10,
        }),
        defineField({
          name: "statesCount",
          title: "States Covered",
          type: "number",
          initialValue: 15,
        }),
      ],
    }),
    defineField({
      name: "whyUsFeatures",
      title: "Why Choose Us — 6 Features",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon Name (Lucide)",
              type: "string",
              description: "e.g. user-check, trophy, language, clipboard-check, user-heart, refresh",
            }),
            defineField({
              name: "title",
              title: "Feature Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Feature Description",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
      validation: (R) => R.max(6),
    }),
    defineField({
      name: "processSteps",
      title: "How It Works — 5 Steps",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "step",
              title: "Step Number",
              type: "number",
            }),
            defineField({
              name: "title",
              title: "Step Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Step Description",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "step",
            },
            prepare({ title, subtitle }) {
              return {
                title: `Step ${subtitle}: ${title}`,
              };
            },
          },
        },
      ],
      validation: (R) => R.max(5),
    }),
    defineField({
      name: "mission",
      title: "Our Mission",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "vision",
      title: "Our Vision",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "values",
      title: "Our Values (one per line)",
      type: "text",
      rows: 5,
      description: "Write each value on a new line",
      group: "content",
    }),
    defineField({
      name: "milestones",
      title: "Our Journey — Timeline",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "year",
              title: "Year",
              type: "string",
            }),
            defineField({
              name: "title",
              title: "Milestone Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "color",
              title: "Color",
              type: "string",
              options: {
                list: [
                  { title: "Navy", value: "navy" },
                  { title: "Emerald", value: "emerald" },
                  { title: "Gold", value: "gold" },
                ],
                layout: "radio",
              },
              initialValue: "navy",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "year",
            },
          },
        },
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "Default SEO Title",
      type: "string",
      description: "Used for pages without a specific title",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "Default Meta Description",
      type: "text",
      rows: 3,
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "siteName", subtitle: "tagline" },
  },
});
