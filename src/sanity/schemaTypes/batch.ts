import { defineType, defineField } from "sanity";

export const batchSchema = defineType({
  name: "batch",
  title: "Batch",
  type: "document",
  fields: [
    defineField({
      name: "courseName",
      title: "Course Name",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "course",
      title: "Course (link)",
      type: "reference",
      to: [{ type: "course" }],
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
    }),
    defineField({
      name: "timing",
      title: "Batch Timing",
      type: "string",
      description: "e.g. 7:00 AM – 9:00 AM (Morning batch)",
    }),
    defineField({
      name: "mode",
      title: "Mode",
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
      name: "totalSeats",
      title: "Total Seats",
      type: "number",
      initialValue: 30,
    }),
    defineField({
      name: "seatsFilled",
      title: "Seats Filled",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Open", value: "open" },
          { title: "Filling Fast", value: "filling" },
          { title: "Full", value: "full" },
          { title: "Completed", value: "completed" },
        ],
        layout: "radio",
      },
      initialValue: "open",
    }),
    defineField({
      name: "isActive",
      title: "Show on Website",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "string",
      description: "Any extra info — e.g. Tamil medium available",
    }),
  ],
  preview: {
    select: {
      title: "courseName",
      subtitle: "timing",
      status: "status",
    },
    prepare({ title, subtitle, status }) {
      const emoji =
        status === "open" ? "🟢" :
        status === "filling" ? "🟡" :
        status === "full" ? "🔴" : "⚫";
      return {
        title: `${emoji} ${title}`,
        subtitle,
      };
    },
  },
  orderings: [
    {
      title: "Start Date",
      name: "startDateAsc",
      by: [{ field: "startDate", direction: "asc" }],
    },
  ],
});
