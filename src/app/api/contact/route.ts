import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const supabase = createServiceSupabaseClient();
    const { data, error } = await supabase.from("leads").insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || "Not provided",
      message: `[Subject: ${subject || "General Inquiry"}] ${message.trim()}`,
      form_type: "contact",
      source: "website-contact",
      status: "new",
    } as any).select();

    if (error) {
      console.error("Supabase contacts error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to submit contact message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
