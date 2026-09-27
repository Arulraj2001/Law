import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";
import { sanityClient } from "@/lib/sanity/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const isMockEnv =
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL === "your_supabase_url" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http");

    let publishedPosts = 3;
    try {
      if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "xyz-law-coaching") {
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
        totalLeads: 18,
        newLeadsToday: 3,
        leadsThisWeek: 9,
        leadsLastWeek: 6,
        publishedPosts,
        activeBatches: 4,
        totalToppers: 25,
      });
    }

    const supabase = createServiceSupabaseClient();

    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);

    const lastWeekStart = new Date(now);
    lastWeekStart.setDate(now.getDate() - 14);

    const [
      { count: totalLeads },
      { count: newLeadsToday },
      { count: leadsThisWeek },
      { count: leadsLastWeek },
      { count: activeBatches },
      { count: totalToppers },
    ] = await Promise.all([
      supabase.from("leads").select("*", { count: "exact", head: true }),
      supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .gte("created_at", todayStart.toISOString()),
      supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .gte("created_at", weekStart.toISOString()),
      supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .gte("created_at", lastWeekStart.toISOString())
        .lt("created_at", weekStart.toISOString()),
      supabase
        .from("batches")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true)
        .neq("status", "completed"),
      supabase
        .from("toppers")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true),
    ]);

    return NextResponse.json({
      totalLeads: totalLeads || 0,
      newLeadsToday: newLeadsToday || 0,
      leadsThisWeek: leadsThisWeek || 0,
      leadsLastWeek: leadsLastWeek || 0,
      publishedPosts,
      activeBatches: activeBatches || 0,
      totalToppers: totalToppers || 0,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to load admin stats" },
      { status: 500 }
    );
  }
}
