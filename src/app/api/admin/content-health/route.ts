import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";
import { sanityClient } from "@/lib/sanity/client";
import { SITE_CONFIG } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const isMockEnv =
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL === "your_supabase_url" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http");

    let publishedPosts = 3;
    try {
      if (
        process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
        process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "xyz-law-coaching"
      ) {
        const count = await sanityClient.fetch<number>(
          `count(*[_type == "blogPost" && status == "published"])`
        );
        if (typeof count === "number") publishedPosts = count;
      }
    } catch {
      // Fallback
    }

    if (isMockEnv) {
      return NextResponse.json({
        facultyMissingPhotos: 0,
        toppersMissingPhotos: 1,
        publishedPosts,
        settingsComplete:
          !SITE_CONFIG.phone.includes("XXXXX") &&
          !SITE_CONFIG.email.includes("yourdomain.com"),
        activeBatches: 4,
        testimonialsCount: 6,
      });
    }

    const supabase = createServiceSupabaseClient();

    const [
      { count: facultyMissingPhotos },
      { count: toppersMissingPhotos },
      { count: activeBatches },
      { count: testimonialsCount },
      { data: settingsRows },
    ] = await Promise.all([
      supabase
        .from("faculty")
        .select("*", { count: "exact", head: true })
        .is("photo_url", null),
      supabase
        .from("toppers")
        .select("*", { count: "exact", head: true })
        .is("photo_url", null),
      supabase
        .from("batches")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true)
        .neq("status", "completed"),
      supabase
        .from("testimonials")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true),
      supabase.from("site_settings").select("key, value"),
    ]);

    const settingsMap = (settingsRows || []).reduce((acc: any, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {});

    const phone = settingsMap.phone || SITE_CONFIG.phone || "";
    const email = settingsMap.email || SITE_CONFIG.email || "";
    const settingsComplete =
      !phone.includes("XXXXX") && !email.includes("yourdomain.com");

    return NextResponse.json({
      facultyMissingPhotos: facultyMissingPhotos || 0,
      toppersMissingPhotos: toppersMissingPhotos || 0,
      publishedPosts,
      settingsComplete,
      activeBatches: activeBatches || 0,
      testimonialsCount: testimonialsCount || 0,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to load content health" },
      { status: 500 }
    );
  }
}
