import { NextRequest, NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { message_type } = body;

    const isMockEnv =
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL === "your_supabase_url" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http");

    if (isMockEnv) {
      return NextResponse.json({ success: true, mock: true });
    }

    const supabase = createServiceSupabaseClient();

    const { error } = await supabase.from("whatsapp_clicks").insert({
      message_type: message_type || "general_enquiry",
      ip_address:
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        null,
      user_agent: request.headers.get("user-agent") || null,
    });

    if (error) {
      // Return success: true so tracking never blocks or throws in dev/staging
      return NextResponse.json({ success: true, warning: error.message });
    }

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json({
      success: false,
    });
  }
}
