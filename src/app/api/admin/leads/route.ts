import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// Sample mock leads for development / demo mode
const MOCK_LEADS = [
  {
    id: "lead-001",
    name: "Kavitha R.",
    phone: "9876543210",
    email: "kavitha.law@gmail.com",
    course_interest: "Civil Judge Exam Coaching",
    form_type: "demo_class",
    status: "new",
    created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    notes: "Interested in weekend batch, needs translation guidance.",
  },
  {
    id: "lead-002",
    name: "M. Dinesh Kumar",
    phone: "9443218765",
    email: "dinesh.advocate@yahoo.com",
    course_interest: "APP Exam Coaching",
    form_type: "enquiry",
    status: "contacted",
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    notes: "Spoke on phone. Sending syllabus PDF on WhatsApp.",
  },
  {
    id: "lead-003",
    name: "S. Ananya",
    phone: "9840112233",
    email: "ananya.sundaram@gmail.com",
    course_interest: "Civil Judge Exam Coaching",
    form_type: "counselling",
    status: "enrolled",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    notes: "Joined October offline batch. Fees paid.",
  },
  {
    id: "lead-004",
    name: "V. Prakash",
    phone: "9789012345",
    email: "prakash.v@gmail.com",
    course_interest: "Patent Agent Exam",
    form_type: "contact",
    status: "follow_up",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    notes: "Requested next batch dates for online IP classes.",
  },
  {
    id: "lead-005",
    name: "J. Selvan",
    phone: "9600123456",
    email: "selvan.law@outlook.com",
    course_interest: "UGC-NET Law",
    form_type: "enquiry",
    status: "not_interested",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    notes: "Decided to wait for next year attempt.",
  },
  {
    id: "lead-006",
    name: "B. Nithya",
    phone: "9500987654",
    email: "nithya.blaw@gmail.com",
    course_interest: "Civil Judge Exam Coaching",
    form_type: "demo_class",
    status: "new",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    notes: "Attending demo on Saturday.",
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const status = searchParams.get("status");
    const course = searchParams.get("course");
    const search = searchParams.get("search");

    const isMockEnv =
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL === "your_supabase_url" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http");

    if (isMockEnv) {
      let filtered = [...MOCK_LEADS];
      if (status && status !== "all") {
        filtered = filtered.filter((l) => l.status === status);
      }
      if (course && course !== "all") {
        filtered = filtered.filter((l) =>
          l.course_interest?.toLowerCase().includes(course.toLowerCase())
        );
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (l) =>
            l.name.toLowerCase().includes(q) ||
            l.phone.includes(q) ||
            (l.email && l.email.toLowerCase().includes(q))
        );
      }
      return NextResponse.json({ leads: filtered.slice(0, limit) });
    }

    const supabase = createServiceSupabaseClient();

    let query = supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (status && status !== "all") {
      query = query.eq("status", status as any);
    }
    if (course && course !== "all") {
      query = query.ilike("course_interest", `%${course}%`);
    }
    if (search) {
      query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ leads: data || [] });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to load leads" },
      { status: 500 }
    );
  }
}
