"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="text-6xl mb-6">⚖️</div>
        <h2 className="text-2xl font-bold text-navy-dark font-heading mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-8">
          We apologise for the inconvenience. Please try again or contact us on
          WhatsApp if the problem persists.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-navy-dark text-white px-6 py-3 rounded-full font-medium hover:bg-navy-mid transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border border-navy-dark text-navy-dark px-6 py-3 rounded-full font-medium hover:bg-navy-tint transition-colors"
          >
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
