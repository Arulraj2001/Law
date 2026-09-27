import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";
import { SITE_CONFIG, STATS } from "@/lib/constants";

export const dynamic = "force-dynamic";

// In-memory / global fallback settings for mock or development mode
const INITIAL_SETTINGS: Record<string, string> = {
  phone: SITE_CONFIG.phone || "+91 XXXXX XXXXX",
  whatsapp: SITE_CONFIG.whatsapp || "91XXXXXXXXXX",
  email: SITE_CONFIG.email || "contact@yourdomain.com",
  students_count: String(STATS.find((s) => s.label.includes("Students"))?.value || "1000"),
  judges_count: String(STATS.find((s) => s.label.includes("Judges"))?.value || "25"),
  experience_years: String(STATS.find((s) => s.label.includes("Years"))?.value || "10"),
  states_count: "15",
  youtube_url: SITE_CONFIG.social.youtube || "https://youtube.com/@yourchannel",
  instagram_url: SITE_CONFIG.social.instagram || "https://instagram.com/yourhandle",
  facebook_url: SITE_CONFIG.social.facebook || "https://facebook.com/yourpage",
  whatsapp_channel: SITE_CONFIG.social.whatsappChannel || "https://whatsapp.com/channel/yourlink",
};

const getGlobalSettings = (): Record<string, string> => {
  if (!(globalThis as any).__mockSiteSettings) {
    (globalThis as any).__mockSiteSettings = { ...INITIAL_SETTINGS };
  }
  return (globalThis as any).__mockSiteSettings;
};

export async function GET() {
  try {
    const isMockEnv =
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL === "your_supabase_url" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http");

    if (isMockEnv) {
      return NextResponse.json(getGlobalSettings());
    }

    const supabase = createServiceSupabaseClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value");

    if (error) {
      return NextResponse.json(getGlobalSettings());
    }

    const settingsMap = { ...getGlobalSettings() };
    if (data && Array.isArray(data)) {
      data.forEach((row) => {
        if (row.key && row.value !== null) {
          settingsMap[row.key] = row.value;
        }
      });
    }

    return NextResponse.json(settingsMap);
  } catch {
    return NextResponse.json(getGlobalSettings());
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    let updates: { key: string; value: string }[] = [];

    if (Array.isArray(body)) {
      updates = body.filter((item) => item && typeof item.key === "string");
    } else if (typeof body === "object" && body !== null) {
      if ("key" in body && "value" in body) {
        updates = [{ key: String(body.key), value: String(body.value) }];
      } else {
        updates = Object.entries(body).map(([key, value]) => ({
          key,
          value: String(value),
        }));
      }
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: "No settings provided to update" },
        { status: 400 }
      );
    }

    const isMockEnv =
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL === "your_supabase_url" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http");

    if (isMockEnv) {
      const current = getGlobalSettings();
      updates.forEach(({ key, value }) => {
        current[key] = value;
      });
      return NextResponse.json({ success: true, updated: updates.length });
    }

    const supabase = createServiceSupabaseClient();
    const upsertRows = updates.map(({ key, value }) => ({
      key,
      value,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase
      .from("site_settings")
      .upsert(upsertRows, { onConflict: "key" });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, updated: updates.length });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}
