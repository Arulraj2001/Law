import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const MOCK_EXAM_UPDATES = [
  {
    id: "update-01",
    title: "TNPSC Civil Judge 2026 Notification Released",
    type: "notification",
    last_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    is_active: true,
  },
  {
    id: "update-02",
    title: "APP Exam 2025 Mains Examination Schedule",
    type: "syllabus",
    last_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 18).toISOString(),
    is_active: true,
  },
  {
    id: "update-03",
    title: "Civil Judge Prelims Hall Ticket Available",
    type: "admit_card",
    last_date: null,
    is_active: true,
  },
  {
    id: "update-04",
    title: "Patent Agent Exam 2026 Online Registration Open",
    type: "notification",
    last_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    is_active: true,
  },
  {
    id: "update-05",
    title: "UGC-NET Law Result & Cutoff Scores",
    type: "result",
    last_date: null,
    is_active: true,
  },
];

export async function GET() {
  try {
    const isMockEnv =
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL === "your_supabase_url" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http");

    if (isMockEnv) {
      return NextResponse.json({ updates: MOCK_EXAM_UPDATES });
    }

    const supabase = createServiceSupabaseClient();

    const { data, error } = await supabase
      .from("exam_updates")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ updates: data || [] });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to load exam updates" },
      { status: 500 }
    );
  }
}
