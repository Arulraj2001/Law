import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | XYZ Law Coaching",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 pt-20">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-bold text-navy-tint mb-4">404</div>

        <div className="text-6xl mb-6">⚖️</div>

        <h1 className="text-2xl font-bold text-navy-dark font-heading mb-4">
          Page Not Found
        </h1>

        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist or has been moved. Try one
          of the links below.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            href="/"
            className="bg-navy-dark text-white px-6 py-3 rounded-full font-medium hover:bg-navy-mid transition-colors"
          >
            Go to Homepage
          </Link>
          <Link
            href="/courses/civil-judge"
            className="bg-emerald text-white px-6 py-3 rounded-full font-medium hover:bg-emerald-light transition-colors"
          >
            Civil Judge Coaching
          </Link>
        </div>

        <div className="text-sm text-gray-400">
          <p>Looking for something specific?</p>
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            {[
              ["Civil Judge", "/courses/civil-judge"],
              ["APP Exam", "/courses/app-exam"],
              ["Faculty", "/faculty"],
              ["Results", "/results"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-navy-mid underline hover:text-navy-dark"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
