import type { StructureResolver } from "sanity/structure";
import React from "react";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("XYZ Law Coaching Admin")
    .items([
      S.listItem()
        .title("Dashboard")
        .icon(() => "📊")
        .child(
          S.component()
            .title("Dashboard")
            .id("dashboard-shortcut")
            .component(() => {
              if (typeof window !== "undefined") {
                window.location.href = "/studio/dashboard";
              }
              return React.createElement(
                "div",
                { style: { padding: "32px", fontFamily: "system-ui" } },
                React.createElement(
                  "h3",
                  { style: { color: "#042C53", margin: "0 0 8px 0" } },
                  "📊 Opening Studio Dashboard..."
                ),
                React.createElement(
                  "p",
                  null,
                  React.createElement(
                    "a",
                    {
                      href: "/studio/dashboard",
                      style: { color: "#1D9E75", fontWeight: "600" },
                    },
                    "Click here to open Dashboard immediately →"
                  )
                )
              );
            })
        ),

      S.listItem()
        .title("Leads & Enquiries")
        .icon(() => "🎯")
        .child(
          S.component()
            .title("All Leads")
            .id("leads-shortcut")
            .component(() => {
              if (typeof window !== "undefined") {
                window.location.href = "/studio/leads";
              }
              return React.createElement(
                "div",
                { style: { padding: "32px", fontFamily: "system-ui" } },
                React.createElement(
                  "h3",
                  { style: { color: "#042C53", margin: "0 0 8px 0" } },
                  "🎯 Opening Leads Manager..."
                ),
                React.createElement(
                  "p",
                  null,
                  React.createElement(
                    "a",
                    {
                      href: "/studio/leads",
                      style: { color: "#1D9E75", fontWeight: "600" },
                    },
                    "Click here to open Leads Manager immediately →"
                  )
                )
              );
            })
        ),

      S.divider(),

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
