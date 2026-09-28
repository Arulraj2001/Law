import { defineType, defineField } from "sanity";

export const courseSchema = defineType({
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Course Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "badge",
      title: "Badge Label",
      type: "string",
      description: "e.g. Judiciary, Prosecution, Patent Office, TM Registry, NET · JRF, SET Law",
    }),
    defineField({
      name: "badgeColor",
      title: "Badge Color",
      type: "string",
      options: {
        list: [
          { title: "Navy Blue (Primary)", value: "navy" },
          { title: "Emerald Green", value: "emerald" },
          { title: "Gold", value: "gold" },
        ],
        layout: "radio",
      },
      initialValue: "navy",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 2,
      description: "Shown on course cards (max 120 chars)",
      validation: (R) => R.max(120),
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Shown on the course detail page",
    }),
    defineField({
      name: "duration",
      title: "Course Duration",
      type: "string",
      description: "e.g. 6 months, 8 months",
    }),
    defineField({
      name: "mode",
      title: "Class Mode",
      type: "string",
      options: {
        list: [
          { title: "Online + Offline", value: "Online + Offline" },
          { title: "Online Only", value: "Online" },
          { title: "Offline Only", value: "Offline" },
        ],
        layout: "radio",
      },
      initialValue: "Online + Offline",
    }),
    defineField({
      name: "fee",
      title: "Course Fee",
      type: "string",
      description: "e.g. ₹15,000 or Contact for fee",
    }),
    defineField({
      name: "feeNote",
      title: "Fee Note",
      type: "string",
      description: "e.g. EMI available, Includes all materials",
    }),
    defineField({
      name: "highlights",
      title: "Course Highlights",
      type: "array",
      of: [{ type: "string" }],
      description: "Key features shown as bullet points on course card",
    }),
    defineField({
      name: "subjects",
      title: "Subjects Covered",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "syllabus",
      title: "Syllabus",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "stage", title: "Stage (e.g. Prelims)", type: "string" }),
            defineField({ name: "topics", title: "Topics", type: "array", of: [{ type: "string" }] }),
          ],
          preview: {
            select: { title: "stage" },
          },
        },
      ],
    }),
    defineField({
      name: "coverImage",
      title: "Course Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "isFeatured",
      title: "Show on Homepage",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "isActive",
      title: "Active (visible on site)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Leave blank to use course title",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Meta Description",
      type: "text",
      rows: 3,
      group: "seo",
    }),
  ],
  groups: [
    { name: "seo", title: "SEO" },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "badge",
      media: "coverImage",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
});
