import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

interface YearRow {
  year: string;
  civilJudge: number;
  appExam: number;
  total: number;
}

const DEFAULT_STATS = [
  { year: "2021", exam_name: "Civil Judge", count: 2 },
  { year: "2021", exam_name: "APP Exam", count: 0 },
  { year: "2022", exam_name: "Civil Judge", count: 3 },
  { year: "2022", exam_name: "APP Exam", count: 0 },
  { year: "2023", exam_name: "Civil Judge", count: 5 },
  { year: "2023", exam_name: "APP Exam", count: 2 },
  { year: "2024", exam_name: "Civil Judge", count: 8 },
  { year: "2024", exam_name: "APP Exam", count: 5 },
  { year: "2025", exam_name: "Civil Judge", count: 4 },
  { year: "2025", exam_name: "APP Exam", count: 2 },
];

const getGlobalMockStats = () => {
  if (!(globalThis as any).__mockSelectionStats) {
    (globalThis as any).__mockSelectionStats = [...DEFAULT_STATS];
  }
  return (globalThis as any).__mockSelectionStats as typeof DEFAULT_STATS;
};

function formatGroupedStats(rows: { year: string; exam_name: string; count: number }[]): YearRow[] {
  const map: Record<string, { civilJudge: number; appExam: number }> = {};

  for (const r of rows) {
    if (!map[r.year]) {
      map[r.year] = { civilJudge: 0, appExam: 0 };
    }
    if (r.exam_name.toLowerCase().includes("civil")) {
      map[r.year].civilJudge = r.count;
    } else if (r.exam_name.toLowerCase().includes("app")) {
      map[r.year].appExam = r.count;
    }
  }

  const years = Object.keys(map).sort();
  return years.map((yr) => ({
    year: yr,
    civilJudge: map[yr].civilJudge,
    appExam: map[yr].appExam,
    total: map[yr].civilJudge + map[yr].appExam,
  }));
}

export async function GET() {
  try {
    const isMockEnv =
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL === "your_supabase_url" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http");

    if (isMockEnv) {
      return NextResponse.json(formatGroupedStats(getGlobalMockStats()));
    }

    const supabase = createServiceSupabaseClient();
    const { data, error } = await supabase
      .from("selection_stats")
      .select("year, exam_name, count")
      .eq("is_active", true)
      .order("year", { ascending: true });

    if (error || !data || data.length === 0) {
      return NextResponse.json(formatGroupedStats(getGlobalMockStats()));
    }

    return NextResponse.json(formatGroupedStats(data));
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch selection stats" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { year, exam_name, count } = body;

    if (!year || !exam_name || typeof count !== "number") {
      return NextResponse.json(
        { error: "Invalid payload. Required: year (string), exam_name (string), count (number)" },
        { status: 400 }
      );
    }

    const isMockEnv =
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL === "your_supabase_url" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http");

    if (isMockEnv) {
      const mockList = getGlobalMockStats();
      const existing = mockList.find(
        (m) => m.year === year && m.exam_name.toLowerCase() === exam_name.toLowerCase()
      );
      if (existing) {
        existing.count = count;
      } else {
        mockList.push({ year, exam_name, count });
      }
      return NextResponse.json({ success: true, updated: { year, exam_name, count } });
    }

    const supabase = createServiceSupabaseClient();
    // Check if record exists
    const { data: existing } = await supabase
      .from("selection_stats")
      .select("id")
      .eq("year", year)
      .eq("exam_name", exam_name)
      .maybeSingle();

    if (existing?.id) {
      const { error: updateError } = await supabase
        .from("selection_stats")
        .update({ count, updated_at: new Date().toISOString() })
        .eq("id", existing.id);

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }
    } else {
      const { error: insertError } = await supabase
        .from("selection_stats")
        .insert({
          year,
          exam_name,
          count,
          is_active: true,
        });

      if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, updated: { year, exam_name, count } });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to update selection stats" },
      { status: 500 }
    );
  }
}
