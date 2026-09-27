import { siteSettingsSchema } from "./siteSettings";
import { courseSchema } from "./course";
import { batchSchema } from "./batch";
import { facultySchema } from "./faculty";
import { topperSchema } from "./topper";
import { testimonialSchema } from "./testimonial";
import { blogPostSchema } from "./blogPost";
import { examUpdateSchema } from "./examUpdate";

export const schemaTypes = [
  siteSettingsSchema,
  courseSchema,
  batchSchema,
  facultySchema,
  topperSchema,
  testimonialSchema,
  blogPostSchema,
  examUpdateSchema,
];
