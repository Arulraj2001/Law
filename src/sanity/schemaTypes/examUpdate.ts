import { defineType, defineField } from "sanity";

export const examUpdateSchema = defineType({
  name: "examUpdate",
  title: "Exam Update",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Notification Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "examName",
      title: "Exam Name",
      type: "string",
      description: "e.g. TNPSC Civil Judge 2026",
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Notification / Vacancy", value: "notification" },
          { title: "Result", value: "result" },
          { title: "Admit Card", value: "admit_card" },
          { title: "Syllabus Update", value: "syllabus" },
          { title: "News", value: "news" },
        ],
        layout: "radio",
      },
      initialValue: "notification",
    }),
    defineField({
      name: "content",
      title: "Details",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "notificationDate",
      title: "Notification Release Date",
      type: "date",
    }),
    defineField({
      name: "lastDate",
      title: "Last Date to Apply",
      type: "date",
    }),
    defineField({
      name: "officialLink",
      title: "Official Notification Link",
      type: "url",
    }),
    defineField({
      name: "isFeatured",
      title: "Show as Featured Alert",
      type: "boolean",
      initialValue: false,
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
      title: "title",
      subtitle: "examName",
      type: "type",
    },
    prepare({ title, subtitle, type }) {
      const emoji =
        type === "notification" ? "🔔" :
        type === "result" ? "📊" :
        type === "admit_card" ? "🪪" :
        type === "syllabus" ? "📋" : "📰";
      return {
        title: `${emoji} ${title}`,
        subtitle,
      };
    },
  },
  orderings: [
    {
      title: "Latest First",
      name: "createdAtDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
});
