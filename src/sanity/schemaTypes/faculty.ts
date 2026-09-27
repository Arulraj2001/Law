import { defineType, defineField } from "sanity";

export const facultySchema = defineType({
  name: "faculty",
  title: "Faculty",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "designation",
      title: "Designation",
      type: "string",
      description: "e.g. Founder & Chief Faculty, Senior Faculty",
    }),
    defineField({
      name: "qualification",
      title: "Qualification",
      type: "string",
      description: "e.g. BA.BL, LLM, Ph.D",
    }),
    defineField({
      name: "specialization",
      title: "Specialization",
      type: "string",
      description: "e.g. Civil Law, Criminal Law, IP Law",
    }),
    defineField({
      name: "experienceYears",
      title: "Years of Experience",
      type: "number",
    }),
    defineField({
      name: "photo",
      title: "Profile Photo",
      type: "image",
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "shortBio",
      title: "Short Bio",
      type: "text",
      rows: 3,
      description: "2-3 lines shown on homepage faculty section",
      validation: (R) => R.max(300),
    }),
    defineField({
      name: "fullBio",
      title: "Full Bio",
      type: "array",
      of: [{ type: "block" }],
      description: "Shown on Faculty page",
    }),
    defineField({
      name: "credentials",
      title: "Credential Badges",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g. Practicing Advocate, BA.BL, 10+ Years Mentoring",
    }),
    defineField({
      name: "isFounder",
      title: "Is this the Founder / Chief Faculty?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isActive",
      title: "Active (show on site)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "designation",
      media: "photo",
      isFounder: "isFounder",
    },
    prepare({ title, subtitle, media, isFounder }) {
      return {
        title: isFounder ? `⭐ ${title}` : title,
        subtitle,
        media,
      };
    },
  },
});
