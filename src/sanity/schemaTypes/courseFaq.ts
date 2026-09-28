import { defineType, defineField } from "sanity";

export const courseFaqSchema = defineType({
  name: "courseFaq",
  title: "Course FAQ",
  type: "document",
  fields: [
    defineField({
      name: "course",
      title: "Course",
      type: "reference",
      to: [{ type: "course" }],
      validation: (R) => R.required(),
    }),
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "course.title",
    },
    prepare({ title, subtitle }) {
      return {
        title: title?.slice(0, 60),
        subtitle: subtitle || "No course linked",
      };
    },
  },
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
});
