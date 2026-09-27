import { NextRequest, NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";
import type { LeadInsert } from "@/lib/supabase/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, course_interest, message, form_type } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ""))) {
      return NextResponse.json(
        { error: "Please enter a valid Indian mobile number" },
        { status: 400 }
      );
    }

    const leadData: LeadInsert = {
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || null,
      course_interest: course_interest || null,
      message: message?.trim() || null,
      form_type: form_type || "enquiry",
      source: "website",
      status: "new",
      utm_source:
        request.headers.get("referer")?.includes("google")
          ? "google"
          : null,
      ip_address:
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        null,
      user_agent: request.headers.get("user-agent") || null,
    };

    // Check for dummy or missing Supabase credentials
    const isMockEnv =
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL === "your_supabase_url" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http");

    let insertedId = "mock-lead-" + Date.now();

    if (!isMockEnv) {
      try {
        const supabase = createServiceSupabaseClient();
        const { data, error } = await supabase
          .from("leads")
          .insert(leadData)
          .select()
          .single();

        if (error) {
          console.error("Supabase error saving lead:", error);
          if (process.env.NODE_ENV === "development") {
            console.warn("Dev mode fallback: lead simulated successfully");
          } else {
            return NextResponse.json(
              { error: "Failed to save enquiry" },
              { status: 500 }
            );
          }
        } else if (data) {
          insertedId = (data as any)?.id || insertedId;
        }
      } catch (dbErr) {
        console.error("Database connection error:", dbErr);
        if (process.env.NODE_ENV !== "development") {
          return NextResponse.json(
            { error: "Database unavailable" },
            { status: 500 }
          );
        }
      }
    } else {
      console.log("[Dev Mode] Lead received successfully:", leadData);
    }

    // Optional: Send email via Resend if valid key provided
    if (
      process.env.RESEND_API_KEY &&
      process.env.RESEND_API_KEY !== "your_resend_key" &&
      process.env.RESEND_API_KEY.startsWith("re_")
    ) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "leads@yourdomain.com",
          to: "contact@yourdomain.com",
          subject: `New Lead: ${name} — ${course_interest || "General Enquiry"}`,
          html: `
            <h2>New Lead Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email || "Not provided"}</p>
            <p><strong>Course:</strong> ${course_interest || "Not specified"}</p>
            <p><strong>Form Type:</strong> ${form_type}</p>
            <p><strong>Message:</strong> ${message || "None"}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString("en-IN")}</p>
          `,
        });
      } catch (emailError) {
        console.error("Email send failed:", emailError);
      }
    }

    return NextResponse.json(
      { success: true, id: insertedId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
