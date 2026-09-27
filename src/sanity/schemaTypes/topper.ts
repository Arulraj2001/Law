import { defineType, defineField } from "sanity";

export const topperSchema = defineType({
  name: "topper",
  title: "Topper",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "post",
      title: "Current Post",
      type: "string",
      description: "e.g. Civil Judge, Assistant Public Prosecutor",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "course",
      title: "Course Cleared",
      type: "reference",
      to: [{ type: "course" }],
    }),
    defineField({
      name: "courseName",
      title: "Course Name (manual)",
      type: "string",
      description: "Fill if course reference not set",
    }),
    defineField({
      name: "college",
      title: "College / Law School",
      type: "string",
    }),
    defineField({
      name: "batchYear",
      title: "Batch Year",
      type: "string",
      description: "e.g. 2023, 2024",
    }),
    defineField({
      name: "district",
      title: "Currently Posted at (District)",
      type: "string",
      description: "e.g. Chennai, Coimbatore, Madurai",
    }),
    defineField({
      name: "rank",
      title: "Rank / Merit (if any)",
      type: "string",
      description: "e.g. AIR 5, Rank 12",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "quote",
      title: "Quote from Student",
      type: "text",
      rows: 3,
      description: "Short inspirational quote for the topper card",
    }),
    defineField({
      name: "isFeatured",
      title: "Show on Homepage",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "isActive",
      title: "Active",
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
      subtitle: "post",
      media: "photo",
      batchYear: "batchYear",
    },
    prepare({ title, subtitle, media, batchYear }) {
      return {
        title,
        subtitle: `${subtitle}${batchYear ? ` · ${batchYear}` : ""}`,
        media,
      };
    },
  },
});
