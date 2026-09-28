import { defineType, defineField } from "sanity";

export const faqSchema = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
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
      rows: 5,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "About the Courses", value: "about-courses" },
          { title: "Fees & Batches", value: "fees-batches" },
          { title: "Study & Preparation", value: "study-prep" },
          { title: "Online Classes", value: "online-classes" },
          { title: "Career & Results", value: "career-results" },
        ],
        layout: "radio",
      },
      initialValue: "about-courses",
    }),
    defineField({
      name: "sortOrder",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "isActive",
      title: "Active (show on site)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showOnHomepage",
      title: "Show on Homepage FAQ section",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "category",
    },
    prepare({ title, subtitle }) {
      const categoryLabel: Record<string, string> = {
        "about-courses": "📚",
        "fees-batches": "💰",
        "study-prep": "📝",
        "online-classes": "💻",
        "career-results": "🏆",
      };
      return {
        title: title?.slice(0, 60),
        subtitle: `${categoryLabel[subtitle] || "❓"} ${subtitle}`,
      };
    },
  },
  orderings: [
    {
      title: "Category + Order",
      name: "categoryAndOrder",
      by: [
        { field: "category", direction: "asc" },
        { field: "sortOrder", direction: "asc" },
      ],
    },
  ],
});
