import type { StructureResolver } from "sanity/structure";
import React from "react";

const EmojiIcon = (emoji: string) => () =>
  React.createElement("span", { style: { fontSize: "1.1em" } }, emoji);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("XYZ Law Coaching Admin")
    .items([
      // SETTINGS
      S.listItem()
        .title("Site Settings")
        .icon(EmojiIcon("⚙️"))
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings")
        ),

      S.listItem()
        .title("Batches & Schedule")
        .icon(EmojiIcon("📅"))
        .child(
          S.documentTypeList("batch")
            .title("Batches & Schedule")
            .defaultOrdering([{ field: "startDate", direction: "asc" }])
        ),

      S.listItem()
        .title("Courses")
        .icon(EmojiIcon("📚"))
        .child(
          S.documentTypeList("course")
            .title("All Courses")
            .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
        ),

      S.listItem()
        .title("Course FAQs")
        .icon(EmojiIcon("❓"))
        .child(
          S.documentTypeList("courseFaq")
            .title("Course FAQs")
            .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
        ),

      S.listItem()
        .title("General FAQs")
        .icon(EmojiIcon("❓"))
        .child(
          S.documentTypeList("faq")
            .title("General FAQs")
            .defaultOrdering([
              { field: "category", direction: "asc" },
              { field: "sortOrder", direction: "asc" },
            ])
        ),

      S.divider(),

      // SOCIAL PROOF
      S.listItem()
        .title("Faculty")
        .icon(EmojiIcon("👨‍🏫"))
        .child(
          S.documentTypeList("faculty")
            .title("Faculty Members")
            .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
        ),

      S.listItem()
        .title("Toppers & Results")
        .icon(EmojiIcon("🏆"))
        .child(
          S.documentTypeList("topper")
            .title("Toppers & Results")
            .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
        ),

      S.listItem()
        .title("Testimonials")
        .icon(EmojiIcon("💬"))
        .child(
          S.documentTypeList("testimonial")
            .title("Student Testimonials")
            .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
        ),

      S.divider(),

      // BLOG & UPDATES
      S.listItem()
        .title("Blog Posts")
        .icon(EmojiIcon("✍️"))
        .child(
          S.list()
            .title("Blog")
            .items([
              S.listItem()
                .title("All Posts")
                .child(
                  S.documentTypeList("blogPost")
                    .title("All Blog Posts")
                    .defaultOrdering([
                      { field: "publishedAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .title("Published")
                .child(
                  S.documentTypeList("blogPost")
                    .title("Published Posts")
                    .filter('_type == "blogPost" && status == "published"')
                    .defaultOrdering([
                      { field: "publishedAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .title("Drafts")
                .child(
                  S.documentTypeList("blogPost")
                    .title("Draft Posts")
                    .filter('_type == "blogPost" && status == "draft"')
                ),
            ])
        ),

      S.listItem()
        .title("Exam Updates")
        .icon(EmojiIcon("🔔"))
        .child(
          S.documentTypeList("examUpdate")
            .title("Exam Notifications")
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
        ),
    ]);
