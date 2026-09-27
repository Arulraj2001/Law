import { defineType, defineField } from "sanity";

export const blogPostSchema = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Post Title",
      type: "string",
      validation: (R) => R.required(),
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
      group: "settings",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      group: "settings",
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      group: "settings",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Exam Guide", value: "exam-guide" },
          { title: "Study Material", value: "study-material" },
          { title: "Legal Update", value: "legal-update" },
          { title: "Success Story", value: "success-story" },
          { title: "Exam Update", value: "exam-update" },
          { title: "Career Advice", value: "career-advice" },
        ],
      },
      group: "settings",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      group: "settings",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      group: "content",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on blog listing page",
      validation: (R) => R.max(200),
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Blog Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
        {
          type: "object",
          name: "callout",
          title: "Callout Box",
          fields: [
            defineField({
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Info", value: "info" },
                  { title: "Warning", value: "warning" },
                  { title: "Tip", value: "tip" },
                ],
              },
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
            }),
          ],
          preview: {
            select: { title: "type", subtitle: "text" },
          },
        },
      ],
      group: "content",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "faculty" }],
      group: "settings",
    }),
    defineField({
      name: "relatedCourse",
      title: "Related Course",
      type: "reference",
      to: [{ type: "course" }],
      group: "settings",
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
      group: "settings",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Leave blank to use post title",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "150-155 characters recommended",
      validation: (R) => R.max(160),
      group: "seo",
    }),
    defineField({
      name: "focusKeyword",
      title: "Focus Keyword",
      type: "string",
      description: "Primary keyword this post targets",
      group: "seo",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Only set if this content is republished from elsewhere",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status",
      media: "coverImage",
      publishedAt: "publishedAt",
    },
    prepare({ title, subtitle, media, publishedAt }) {
      const emoji =
        subtitle === "published" ? "🟢" :
        subtitle === "draft" ? "🟡" : "⚫";
      return {
        title: `${emoji} ${title}`,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString("en-IN")
          : "No date set",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Published Date (Newest)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
