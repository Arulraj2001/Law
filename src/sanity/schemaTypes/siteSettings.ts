import { defineType, defineField } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Institute Name",
      type: "string",
      description: "Full name of the coaching institute",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short tagline shown below the logo",
    }),
    defineField({
      name: "founderName",
      title: "Founder / Chief Faculty Name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "establishedYear",
      title: "Established Year",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Primary Phone Number",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp Number (with country code, no +)",
      type: "string",
      description: "Example: 919876543210",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (R) => R.email(),
    }),
    defineField({
      name: "address",
      title: "Full Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mapUrl",
      title: "Google Maps URL",
      type: "url",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
    }),
    defineField({
      name: "ogImage",
      title: "Default OG Image (for social sharing)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
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
      name: "seoTitle",
      title: "Default SEO Title",
      type: "string",
      description: "Used for pages without a specific title",
    }),
    defineField({
      name: "seoDescription",
      title: "Default Meta Description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "siteName", subtitle: "tagline" },
  },
});
