import { NextRequest, NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";
import type { LeadInsert } from "@/lib/supabase/types";
import { SITE_CONFIG } from "@/lib/constants";

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

    // Send email via Resend if configured
    if (
      process.env.RESEND_API_KEY &&
      process.env.RESEND_API_KEY !== "your_resend_key" &&
      process.env.RESEND_API_KEY.startsWith("re_")
    ) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Lead — XYZ Law Coaching</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f0;">
  <div style="background: #042C53; color: white; padding: 24px; border-radius: 12px 12px 0 0;">
    <h1 style="margin: 0; font-size: 22px;">
      🎯 New Lead — XYZ Law Coaching
    </h1>
    <p style="margin: 8px 0 0; opacity: 0.8; font-size: 14px;">
      ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
    </p>
  </div>
  
  <div style="background: white; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e0e0e0; border-top: none;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="border-bottom: 1px solid #f0f0f0;">
        <td style="padding: 10px 0; color: #666; font-size: 13px; width: 40%;">Name</td>
        <td style="padding: 10px 0; font-weight: 600; color: #042C53;">${name}</td>
      </tr>
      <tr style="border-bottom: 1px solid #f0f0f0;">
        <td style="padding: 10px 0; color: #666; font-size: 13px;">Phone / WhatsApp</td>
        <td style="padding: 10px 0; font-weight: 600; color: #1D9E75;">${phone}</td>
      </tr>
      <tr style="border-bottom: 1px solid #f0f0f0;">
        <td style="padding: 10px 0; color: #666; font-size: 13px;">Email</td>
        <td style="padding: 10px 0; font-weight: 500; color: #444;">${email || "Not provided"}</td>
      </tr>
      <tr style="border-bottom: 1px solid #f0f0f0;">
        <td style="padding: 10px 0; color: #666; font-size: 13px;">Course Interest</td>
        <td style="padding: 10px 0; font-weight: 600;">${course_interest || "Not specified"}</td>
      </tr>
      <tr style="border-bottom: 1px solid #f0f0f0;">
        <td style="padding: 10px 0; color: #666; font-size: 13px;">Form Type</td>
        <td style="padding: 10px 0; text-transform: capitalize;">${form_type}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #666; font-size: 13px;">Message</td>
        <td style="padding: 10px 0; color: #444;">${message || "No message"}</td>
      </tr>
    </table>
    
    <div style="margin-top: 20px; padding: 16px; background: #e1f5ee; border-radius: 8px; border-left: 4px solid #1D9E75;">
      <p style="margin: 0; font-weight: 600; color: #0F6E56; font-size: 14px;">
        ⚡ Quick action
      </p>
      <p style="margin: 6px 0 12px; color: #444; font-size: 13px;">
        Reply on WhatsApp immediately for higher conversion rates.
      </p>
      <a href="https://wa.me/${phone.replace(/\\D/g, "")}?text=${encodeURIComponent(
            "Hi " + name + ", thank you for your enquiry about " + (course_interest || "our courses") + ". How can we help you?"
          )}" 
        style="display: inline-block; background: #25D366; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
        💬 Reply on WhatsApp
      </a>
    </div>
    
    <p style="margin-top: 20px; font-size: 12px; color: #999; text-align: center;">
      XYZ Law Coaching Admin · View all leads at /studio
    </p>
  </div>
</body>
</html>
`;

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: SITE_CONFIG.email,
          subject: `New ${form_type} lead: ${name} — ${course_interest || "General"}`,
          html: emailHtml,
        });
      } catch (emailError) {
        // Log error but don't fail the lead save
        console.error("Email send failed (non-fatal):", emailError);
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
