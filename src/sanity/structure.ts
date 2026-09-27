import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("XYZ Law Coaching Admin")
    .items([
      S.listItem()
        .title("Site Settings")
        .icon(() => "⚙️")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings")
        ),

      S.divider(),

      S.listItem()
        .title("Courses")
        .icon(() => "📚")
        .child(
          S.documentTypeList("course")
            .title("All Courses")
            .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
        ),

      S.listItem()
        .title("Batches & Schedule")
        .icon(() => "📅")
        .child(
          S.documentTypeList("batch")
            .title("Upcoming Batches")
            .defaultOrdering([{ field: "startDate", direction: "asc" }])
        ),

      S.divider(),

      S.listItem()
        .title("Faculty")
        .icon(() => "👨‍🏫")
        .child(
          S.documentTypeList("faculty")
            .title("Faculty Members")
            .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
        ),

      S.listItem()
        .title("Toppers & Results")
        .icon(() => "🏆")
        .child(
          S.documentTypeList("topper")
            .title("All Toppers")
            .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
        ),

      S.listItem()
        .title("Testimonials")
        .icon(() => "💬")
        .child(
          S.documentTypeList("testimonial")
            .title("Student Testimonials")
            .defaultOrdering([{ field: "sortOrder", direction: "asc" }])
        ),

      S.divider(),

      S.listItem()
        .title("Blog Posts")
        .icon(() => "✍️")
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
        .icon(() => "🔔")
        .child(
          S.documentTypeList("examUpdate")
            .title("Exam Notifications")
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
        ),
    ]);
