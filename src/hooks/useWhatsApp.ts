"use client";

import { SITE_CONFIG } from "@/lib/constants";

interface WhatsAppOptions {
  phone?: string;
  trackEvent?: boolean;
}

export function useWhatsApp(options: WhatsAppOptions = {}) {
  const phone = options.phone || SITE_CONFIG.whatsapp || "919876543210";
  const baseUrl = `https://wa.me/${phone.replace(/\D/g, "")}`;

  function buildUrl(message: string): string {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }

  function open(message: string): void {
    const url = buildUrl(message);
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }

    // Track in Supabase if enabled
    if (options.trackEvent !== false) {
      trackWhatsAppClick(message).catch(console.error);
    }
  }

  // Generic chat
  function openChat(message?: string): void {
    open(
      message ||
        `Hi XYZ Law Coaching,\n\nI am interested in your coaching programmes. Please share details about courses and batches available.\n\nThank you.`
    );
  }

  // Course-specific enquiry
  function openCourseEnquiry(courseName: string): void {
    open(
      `Hi XYZ Law Coaching,\n\nI am interested in the *${courseName}* coaching programme.\n\nCould you please share:\n• Course duration and batch dates\n• Fee details\n• Online/offline options\n\nThank you.`
    );
  }

  // Demo class booking
  function openDemoClass(courseName?: string): void {
    const courseText = courseName ? ` for *${courseName}*` : "";
    open(
      `Hi XYZ Law Coaching,\n\nI would like to book a *Free Demo Class*${courseText}.\n\nPlease confirm the next available slot and whether it will be online or offline.\n\nThank you.`
    );
  }

  // General enquiry
  function openGeneralEnquiry(): void {
    open(
      `Hi XYZ Law Coaching,\n\nI found your website and would like to learn more about your judicial exam coaching programmes in Tamil Nadu.\n\nPlease share details about available courses, batches, and fees.\n\nThank you.`
    );
  }

  // Fee enquiry
  function openFeeEnquiry(courseName: string): void {
    open(
      `Hi XYZ Law Coaching,\n\nI am interested in the *${courseName}* coaching programme.\n\nCould you please share the current fee structure and any available batch timings?\n\nThank you.`
    );
  }

  // Batch timing enquiry
  function openBatchEnquiry(courseName: string): void {
    open(
      `Hi XYZ Law Coaching,\n\nI would like to know about upcoming batches for *${courseName}*.\n\nAre morning and evening batches available? What are the timings?\n\nThank you.`
    );
  }

  // Lead follow-up (for admin use)
  function openFollowUp(name: string, course: string): string {
    return buildUrl(
      `Hi ${name},\n\nThank you for enquiring about *${course}* coaching at XYZ Law Coaching.\n\nWe would love to help you with your preparation. Could we schedule a free counselling call at your convenience?\n\nRegards,\nXYZ Law Coaching Team`
    );
  }

  // Syllabus request
  function openSyllabusRequest(courseName: string): void {
    open(
      `Hi XYZ Law Coaching,\n\nCould you please share the complete syllabus PDF for the *${courseName}*?\n\nThank you.`
    );
  }

  function getWhatsAppUrl(message: string): string {
    return buildUrl(message);
  }

  return {
    openChat,
    openWhatsApp: openChat,
    openCourseEnquiry,
    openDemoClass,
    openGeneralEnquiry,
    openFeeEnquiry,
    openBatchEnquiry,
    openFollowUp,
    openSyllabusRequest,
    getWhatsAppUrl,
    phone,
    baseUrl,
  };
}

// Track WhatsApp clicks in Supabase
async function trackWhatsAppClick(message: string): Promise<void> {
  try {
    await fetch("/api/track/whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message_type: detectMessageType(message),
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // Silently fail — never block UX for analytics
  }
}

function detectMessageType(message: string): string {
  if (message.includes("Demo Class")) return "demo_class";
  if (message.includes("fee")) return "fee_enquiry";
  if (message.includes("batch")) return "batch_enquiry";
  if (message.includes("syllabus")) return "syllabus_request";
  if (message.includes("following up")) return "follow_up";
  if (message.includes("interested in your")) return "general_enquiry";
  return "course_enquiry";
}

export default useWhatsApp;
