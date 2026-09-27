import { defineType, defineField } from "sanity";

export const testimonialSchema = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "studentName",
      title: "Student Name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "currentPost",
      title: "Current Post",
      type: "string",
      description: "e.g. Civil Judge, APP Grade II",
    }),
    defineField({
      name: "course",
      title: "Course Completed",
      type: "reference",
      to: [{ type: "course" }],
    }),
    defineField({
      name: "courseName",
      title: "Course Name (manual)",
      type: "string",
    }),
    defineField({
      name: "college",
      title: "College",
      type: "string",
    }),
    defineField({
      name: "batchYear",
      title: "Batch Year",
      type: "string",
    }),
    defineField({
      name: "quote",
      title: "Testimonial Quote",
      type: "text",
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "photo",
      title: "Student Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "type",
      title: "Testimonial Type",
      type: "string",
      options: {
        list: [
          { title: "Text Only", value: "text" },
          { title: "Video Only", value: "video" },
          { title: "Text + Video", value: "both" },
        ],
        layout: "radio",
      },
      initialValue: "text",
    }),
    defineField({
      name: "videoUrl",
      title: "YouTube Video URL",
      type: "url",
      description: "Paste full YouTube URL — used when type is video or both",
      hidden: ({ document }) =>
        document?.type !== "video" && document?.type !== "both",
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      options: {
        list: [1, 2, 3, 4, 5],
        layout: "radio",
      },
      initialValue: 5,
    }),
    defineField({
      name: "isFeatured",
      title: "Show on Homepage",
      type: "boolean",
      initialValue: false,
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
      title: "studentName",
      subtitle: "currentPost",
      media: "photo",
    },
  },
});
