import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const MOCK_BATCHES = [
  {
    id: "batch-101",
    course_name: "Civil Judge Morning Batch",
    start_date: "2026-10-15",
    mode: "Offline + Online",
    total_seats: 40,
    seats_filled: 34,
    status: "filling",
    is_active: true,
  },
  {
    id: "batch-102",
    course_name: "APP Exam Evening Intensive",
    start_date: "2026-10-20",
    mode: "Online Live",
    total_seats: 50,
    seats_filled: 48,
    status: "full",
    is_active: true,
  },
  {
    id: "batch-103",
    course_name: "Patent Agent Exam Fast-Track",
    start_date: "2026-11-01",
    mode: "Online Live",
    total_seats: 30,
    seats_filled: 12,
    status: "open",
    is_active: true,
  },
  {
    id: "batch-104",
    course_name: "Civil Judge Weekend Batch",
    start_date: "2026-11-10",
    mode: "Offline Centre",
    total_seats: 35,
    seats_filled: 8,
    status: "open",
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
      return NextResponse.json({ batches: MOCK_BATCHES });
    }

    const supabase = createServiceSupabaseClient();
    const { data, error } = await supabase
      .from("batches")
      .select("*")
      .eq("is_active", true)
      .neq("status", "completed")
      .order("start_date", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ batches: MOCK_BATCHES });
    }

    return NextResponse.json({ batches: data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to load batches" },
      { status: 500 }
    );
  }
}
