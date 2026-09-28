"use client";

import { SITE_CONFIG } from "@/lib/constants";
import { MapPin, Navigation, Video, ExternalLink } from "lucide-react";

interface ContactMapProps {
  mapUrl?: string;
  address?: string;
}

export function ContactMap({ mapUrl, address }: ContactMapProps = {}) {
  const currentMapUrl = mapUrl || SITE_CONFIG.mapUrl;
  const currentAddress = address || SITE_CONFIG.address;

  const isEmbeddable =
    currentMapUrl &&
    currentMapUrl.includes("embed") &&
    !currentMapUrl.includes("your+address");

  return (
    <section className="py-16 sm:py-20 bg-[#F5F5F0]">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald px-3 py-1 rounded-full bg-emerald-tint mb-3">
            Find Us
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy-dark">
            Visit Our Coaching Centre
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Our offline coaching centre is located in Tamil Nadu. Online students can attend classes from anywhere in India.
          </p>
        </div>

        {/* Map Container */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm bg-white">
          {isEmbeddable ? (
            <iframe
              src={currentMapUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Centre Location"
            />
          ) : (
            <div className="relative h-[400px] w-full bg-navy-tint/50 flex flex-col items-center justify-center p-6 text-center">
              {/* Subtle background grid pattern */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(#0D1B2A 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative z-10 max-w-md space-y-4">
                <div className="w-16 h-16 rounded-full bg-navy-dark text-white flex items-center justify-center mx-auto shadow-md shadow-navy-dark/20">
                  <MapPin className="w-8 h-8 text-emerald" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-navy-dark">
                    XYZ Law Coaching Centre
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {currentAddress}, Tamil Nadu, India
                  </p>
                </div>
                <div>
                  <a
                    href={currentMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy-dark hover:bg-navy-mid text-white text-sm font-semibold transition-all shadow-sm"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Directions Strip */}
        <div className="mt-8 p-6 rounded-xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm shrink-0">
            <Navigation className="w-4 h-4 text-emerald" />
            <span>Getting here:</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs sm:text-sm">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-navy-dark">By road:</span>
              <span>Easily accessible via major arterial roads and bus stations in Tamil Nadu.</span>
            </div>
            <div className="flex items-start gap-2">
              <Video className="w-4 h-4 text-navy-mid shrink-0 mt-0.5" />
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-navy-dark">Online:</span>
                <span>Via live video — link sent after enrolment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
