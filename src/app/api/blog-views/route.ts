import { NextRequest, NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const slug = body.slug || body.post_slug;

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      null;
    const userAgent = request.headers.get("user-agent") || null;

    try {
      const supabase = createServiceSupabaseClient();
      await supabase.from("blog_views").insert({
        post_slug: slug,
        ip_address: ipAddress,
        user_agent: userAgent,
      });
    } catch (dbError) {
      console.warn("Could not insert blog view to Supabase:", dbError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in blog-views POST:", error);
    return NextResponse.json({ success: true });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Slug query param required" },
        { status: 400 }
      );
    }

    let count = 0;
    try {
      const supabase = createServiceSupabaseClient();
      const { count: viewCount, error } = await supabase
        .from("blog_views")
        .select("*", { count: "exact", head: true })
        .eq("post_slug", slug);

      if (!error && viewCount !== null) {
        count = viewCount;
      }
    } catch {
      // Fallback
      count = 0;
    }

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error in blog-views GET:", error);
    return NextResponse.json({ count: 0 });
  }
}
