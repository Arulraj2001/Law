"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  // Clean non-numeric characters from the WhatsApp number
  const cleanPhone = (SITE_CONFIG.whatsapp || "919876543210").replace(/\D/g, "");
  const defaultMessage = encodeURIComponent(
    "Hi, I'm interested in your coaching programmes. Please share details."
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${defaultMessage}`;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center justify-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip on hover (desktop only) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="hidden md:flex items-center gap-1.5 absolute bottom-full mb-3 right-0 whitespace-nowrap bg-navy-dark text-white text-xs font-medium py-1.5 px-3 rounded-lg shadow-xl border border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            We reply in minutes
            <span className="absolute top-full right-5 -mt-1 border-4 border-transparent border-t-navy-dark" />
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="relative flex items-center shadow-lg hover:shadow-2xl transition-shadow rounded-full"
      >
        {/* Pulse ring animation every 3s (1s pulse + 2s delay) */}
        <motion.span
          className="absolute inset-0 rounded-full bg-[#25D366] pointer-events-none -z-10"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.8, 0, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            times: [0, 0.33, 1],
            ease: "easeOut",
          }}
        />

        {/* Floating action button with hover expansion */}
        <motion.div
          className="flex items-center justify-center bg-[#25D366] text-white rounded-full h-12 md:h-14 px-3 md:px-3.5 overflow-hidden cursor-pointer"
          animate={{
            width: isHovered ? "auto" : undefined,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* WhatsApp SVG Icon (28px desktop, 24px mobile) */}
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 md:w-7 md:h-7 shrink-0 fill-white"
            aria-hidden="true"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.828z" />
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.179L2 22l4.957-1.399C8.423 21.493 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.697 0-3.272-.512-4.588-1.39l-.329-.222-2.943.83.829-2.883-.238-.344C3.805 14.802 3.273 13.442 3.273 12c0-4.811 3.916-8.727 8.727-8.727 4.812 0 8.727 3.916 8.727 8.727 0 4.811-3.915 8.727-8.727 8.727z" />
          </svg>

          {/* Expanded text on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                animate={{ opacity: 1, width: "auto", marginLeft: 8 }}
                exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                transition={{ duration: 0.25 }}
                className="hidden md:inline-block font-sans text-sm font-semibold tracking-wide whitespace-nowrap pr-2"
              >
                Chat with us
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </a>
    </div>
  );
}

export default WhatsAppButton;
