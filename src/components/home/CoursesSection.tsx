import { getAllCoursesSanity } from "@/lib/sanity/queries";
import { COURSES } from "@/lib/constants";
import { CoursesSectionClient } from "./CoursesSectionClient";

export async function CoursesSection() {
  let courses: any[] = [];

  try {
    const sanityCourses = await getAllCoursesSanity();
    if (Array.isArray(sanityCourses) && sanityCourses.length > 0) {
      courses = sanityCourses.map((c: any) => ({
        id: c._id || c.slug,
        slug: typeof c.slug === "string" ? c.slug : c.slug?.current,
        title: c.title,
        short_description: c.shortDescription,
        description: c.shortDescription,
        badge: c.badge,
        badge_color: c.badgeColor,
        badgeColor: c.badgeColor,
        highlights: c.highlights || [],
        href: `/courses/${typeof c.slug === "string" ? c.slug : c.slug?.current}`,
        mode: c.mode,
        duration: c.duration,
      }));
    } else {
      throw new Error("No courses found in Sanity");
    }
  } catch {
    courses = COURSES.map((c) => ({
      ...c,
      id: c.id,
      slug: c.slug,
      title: c.title,
      short_description: c.description,
      description: c.description,
      badge: c.badge,
      badge_color: c.badgeColor,
      badgeColor: c.badgeColor,
      highlights: c.highlights,
      href: c.href || `/courses/${c.slug}`,
      is_active: true,
      is_featured: true,
      sort_order: c.id === "civil-judge" ? 1 : 2,
    }));
  }

  return <CoursesSectionClient courses={courses} />;
}

export default CoursesSection;
