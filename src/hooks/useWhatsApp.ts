"use client";

import { useCallback } from "react";
import { SITE_CONFIG } from "@/lib/constants";

export function useWhatsApp() {
  const cleanPhone = (SITE_CONFIG.whatsapp || "919876543210").replace(/\D/g, "");

  const getWhatsAppUrl = useCallback(
    (message: string = ""): string => {
      const encoded = encodeURIComponent(message);
      return `https://wa.me/${cleanPhone}${encoded ? `?text=${encoded}` : ""}`;
    },
    [cleanPhone]
  );

  const openChat = useCallback(
    (message?: string): void => {
      const url = getWhatsAppUrl(
        message ||
          "Hi, I'm interested in your coaching programmes. Please share details."
      );
      if (typeof window !== "undefined") {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    },
    [getWhatsAppUrl]
  );

  const openCourseEnquiry = useCallback(
    (courseName: string): void => {
      openChat(
        `Hi, I'm interested in ${courseName} coaching. Please share the batch details and fee structure.`
      );
    },
    [openChat]
  );

  const openDemoClass = useCallback(
    (courseName?: string): void => {
      openChat(
        `Hi, I'd like to book a free demo class${
          courseName ? ` for ${courseName}` : ""
        }. Please let me know the next available slot.`
      );
    },
    [openChat]
  );

  const openGeneralEnquiry = useCallback((): void => {
    openChat(
      "Hi, I'm interested in your coaching programmes. Please share details."
    );
  }, [openChat]);

  return {
    openChat,
    openWhatsApp: openChat, // backward-compatible alias
    openCourseEnquiry,
    openDemoClass,
    openGeneralEnquiry,
    getWhatsAppUrl,
  };
}

export default useWhatsApp;
