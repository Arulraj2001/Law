export function trackEvent(
  eventName: string,
  parameters?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  if (!window.gtag) return;

  window.gtag("event", eventName, {
    ...parameters,
    timestamp: new Date().toISOString(),
  });
}

// Specific tracking functions
export const track = {
  formSubmit: (formType: string, course?: string) => {
    trackEvent("form_submit", {
      form_type: formType,
      course_name: course,
      event_category: "Lead Generation",
    });
  },

  whatsappClick: (messageType: string) => {
    trackEvent("whatsapp_click", {
      message_type: messageType,
      event_category: "Engagement",
    });
  },

  courseView: (courseName: string) => {
    trackEvent("course_page_view", {
      course_name: courseName,
      event_category: "Content",
    });
  },

  demoClassBook: (course?: string) => {
    trackEvent("demo_class_booking", {
      course_name: course,
      event_category: "Conversion",
      event_label: "High Intent",
    });
  },

  blogRead: (postTitle: string, category: string) => {
    trackEvent("blog_post_read", {
      post_title: postTitle,
      category,
      event_category: "Content",
    });
  },

  phoneCall: () => {
    trackEvent("phone_call_click", {
      event_category: "Engagement",
    });
  },
};

// Type declaration for window.gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
