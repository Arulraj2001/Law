import { SITE_CONFIG } from "@/lib/constants";
import type { SiteConfig } from "@/lib/site-config";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { Phone, Mail, MapPin, Globe, ArrowRight } from "lucide-react";

interface ContactInfoProps {
  config?: SiteConfig;
}

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.828z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.179L2 22l4.957-1.399C8.423 21.493 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.697 0-3.272-.512-4.588-1.39l-.329-.222-2.943.83.829-2.883-.238-.344C3.805 14.802 3.273 13.442 3.273 12c0-4.811 3.916-8.727 8.727-8.727 4.812 0 8.727 3.916 8.727 8.727 0 4.811-3.915 8.727-8.727 8.727z" />
    </svg>
  );
}

export function ContactInfo({ config }: ContactInfoProps = {}) {
  const phone = config?.phone || SITE_CONFIG.phone;
  const email = config?.email || SITE_CONFIG.email;
  const address = config?.address || SITE_CONFIG.address;
  const mapUrl = config?.mapUrl || SITE_CONFIG.mapUrl;
  const whatsapp = config?.whatsapp || SITE_CONFIG.whatsapp;
  const { openGeneralEnquiry } = useWhatsApp({ phone: whatsapp });

  return (
    <div className="space-y-6">
      <h3 className="font-heading text-xl sm:text-[22px] font-bold text-navy-dark">
        Contact Information
      </h3>

      {/* 4 Contact Info Blocks */}
      <div className="space-y-4">
        {/* Block 1 — Phone / WhatsApp */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5 hover:border-navy-light/40 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-navy-tint text-navy-dark flex items-center justify-center shrink-0 mt-0.5">
            <Phone className="w-5 h-5 text-navy-dark" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
              Phone / WhatsApp
            </h4>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="text-base font-bold text-navy-dark hover:text-emerald transition-colors"
            >
              {phone}
            </a>
            <p className="text-xs text-slate-500 mt-0.5">Mon–Sat · 9 AM – 7 PM</p>
          </div>
        </div>

        {/* Block 2 — Email */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5 hover:border-navy-light/40 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-navy-tint text-navy-dark flex items-center justify-center shrink-0 mt-0.5">
            <Mail className="w-5 h-5 text-navy-dark" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
              Email
            </h4>
            <a
              href={`mailto:${email}`}
              className="text-base font-bold text-navy-dark hover:text-emerald transition-colors break-all"
            >
              {email}
            </a>
            <p className="text-xs text-slate-500 mt-0.5">We respond within 24 hours</p>
          </div>
        </div>

        {/* Block 3 — Address */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5 hover:border-navy-light/40 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-navy-tint text-navy-dark flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="w-5 h-5 text-navy-dark" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
              Our Centre
            </h4>
            <p className="text-sm font-bold text-navy-dark">
              {address}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Offline coaching available here</p>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald hover:underline mt-1.5"
            >
              <span>View on Google Maps</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Block 4 — Online Students */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5 hover:border-navy-light/40 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-navy-tint text-navy-dark flex items-center justify-center shrink-0 mt-0.5">
            <Globe className="w-5 h-5 text-navy-dark" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
              Online Students
            </h4>
            <p className="text-sm font-semibold text-navy-dark">
              Classes accessible from anywhere in India via live video sessions
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              WhatsApp: {whatsapp}
            </p>
          </div>
        </div>
      </div>

      {/* Large WhatsApp Button */}
      <button
        type="button"
        onClick={openGeneralEnquiry}
        className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-sm transition-all duration-200 shadow-sm shadow-[#25D366]/30 cursor-pointer"
      >
        <WhatsAppIcon className="w-5 h-5 fill-current" />
        <span>Start a WhatsApp Chat →</span>
      </button>

      {/* Business Hours Box */}
      <div className="p-4 rounded-xl bg-navy-tint/70 border border-navy-light/20 text-slate-800">
        <h4 className="font-heading text-sm font-bold text-navy-dark flex items-center gap-2 mb-2">
          <span>📅 Business Hours</span>
        </h4>
        <div className="space-y-1 text-xs text-slate-700">
          <p className="flex justify-between">
            <span className="font-medium">Mon–Fri:</span>
            <span>9:00 AM – 7:00 PM</span>
          </p>
          <p className="flex justify-between">
            <span className="font-medium">Saturday:</span>
            <span>9:00 AM – 5:00 PM</span>
          </p>
          <p className="flex justify-between text-slate-500">
            <span className="font-medium">Sunday:</span>
            <span>Closed</span>
          </p>
        </div>
        <p className="text-xs font-semibold text-emerald mt-2.5 pt-2 border-t border-navy-light/10">
          WhatsApp available 24/7 for queries
        </p>
      </div>
    </div>
  );
}
