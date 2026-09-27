import { createServerSupabaseClient } from "./server";
import type {
  Course,
  Batch,
  Faculty,
  Topper,
  Testimonial,
  ExamUpdate,
  SiteSetting,
} from "./types";

// ==========================================
// COURSES
// ==========================================
export async function getAllCourses(): Promise<Course[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
  return (data as Course[]) || [];
}

export async function getCourseBySlug(
  slug: string
): Promise<Course | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching course:", error);
    return null;
  }
  return data as Course;
}

export async function getFeaturedCourses(): Promise<Course[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("sort_order", { ascending: true });

  if (error) return [];
  return (data as Course[]) || [];
}

// ==========================================
// BATCHES
// ==========================================
export async function getActiveBatches(): Promise<Batch[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("batches")
    .select("*")
    .eq("is_active", true)
    .neq("status", "completed")
    .order("start_date", { ascending: true });

  if (error) {
    console.error("Error fetching batches:", error);
    return [];
  }
  return (data as Batch[]) || [];
}

export async function getBatchesByCourse(
  courseId: string
): Promise<Batch[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("batches")
    .select("*")
    .eq("course_id", courseId)
    .eq("is_active", true)
    .order("start_date", { ascending: true });

  if (error) return [];
  return (data as Batch[]) || [];
}

// ==========================================
// FACULTY
// ==========================================
export async function getAllFaculty(): Promise<Faculty[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("faculty")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching faculty:", error);
    return [];
  }
  return (data as Faculty[]) || [];
}

export async function getFounder(): Promise<Faculty | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("faculty")
    .select("*")
    .eq("is_founder", true)
    .eq("is_active", true)
    .single();

  if (error) return null;
  return data as Faculty;
}

// ==========================================
// TOPPERS
// ==========================================
export async function getAllToppers(): Promise<Topper[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("toppers")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching toppers:", error);
    return [];
  }
  return (data as Topper[]) || [];
}

export async function getFeaturedToppers(
  limit: number = 8
): Promise<Topper[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("toppers")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("sort_order", { ascending: true })
    .limit(limit);

  if (error) return [];
  return (data as Topper[]) || [];
}

// ==========================================
// TESTIMONIALS
// ==========================================
export async function getAllTestimonials(): Promise<Testimonial[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
  return (data as Testimonial[]) || [];
}

export async function getFeaturedTestimonials(
  limit: number = 4
): Promise<Testimonial[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("sort_order", { ascending: true })
    .limit(limit);

  if (error) return [];
  return (data as Testimonial[]) || [];
}

// ==========================================
// EXAM UPDATES
// ==========================================
export async function getLatestExamUpdates(
  limit: number = 5
): Promise<ExamUpdate[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("exam_updates")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) return [];
  return (data as ExamUpdate[]) || [];
}

// ==========================================
// SITE SETTINGS
// ==========================================
export async function getSiteSettings(): Promise<Record<string, string>> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value");

  if (error) return {};

  return ((data as { key: string; value: string | null }[]) || []).reduce(
    (acc, setting) => {
      if (setting.value) acc[setting.key] = setting.value;
      return acc;
    },
    {} as Record<string, string>
  );
}

export async function getSetting(key: string): Promise<string | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .single();

  if (error) return null;
  return (data as { value: string | null })?.value || null;
}
