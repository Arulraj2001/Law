"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ExternalLink, Scale } from "lucide-react";
import { SITE_CONFIG_FALLBACK, type SiteConfig } from "@/lib/site-config";
import { COURSES } from "@/lib/constants";

interface FooterProps {
  config?: SiteConfig;
}

export function Footer({ config }: FooterProps) {
  const fallback = SITE_CONFIG_FALLBACK;
  const cfg = {
    name: config?.name || fallback.name,
    phone: config?.phone || fallback.phone,
    email: config?.email || fallback.email,
    address: config?.address || fallback.address,
    mapUrl: config?.mapUrl || fallback.mapUrl,
    social: {
      youtube: config?.social?.youtube || fallback.social.youtube,
      instagram: config?.social?.instagram || fallback.social.instagram,
      facebook: config?.social?.facebook || fallback.social.facebook,
      whatsappChannel: config?.social?.whatsappChannel || fallback.social.whatsappChannel,
    },
  };

  const quickLinks = [
    { title: "Home", href: "/" },
    { title: "About Institute", href: "/about" },
    { title: "Results & Toppers", href: "/results" },
    { title: "Our Faculty", href: "/faculty" },
    { title: "Law Blog", href: "/blog" },
    { title: "Book Demo Class", href: "/demo-class" },
    { title: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="bg-navy-dark text-white border-t-2 border-emerald relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-navy-mid/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand & Social */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-heading font-bold text-xl text-white tracking-tight hover:opacity-95 transition-opacity"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald/20 border border-emerald/40 flex items-center justify-center text-emerald-light">
                <Scale className="w-5 h-5 text-emerald" />
              </div>
              <span>{cfg.name}</span>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed">
              Tamil Nadu&apos;s premier coaching institute for TNPSC Civil Judge,
              Assistant Public Prosecutor, and specialized legal certification exams.
            </p>

            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-3">
                Connect With Us
              </span>
              <div className="flex items-center gap-3.5">
                {/* YouTube */}
                <motion.a
                  href={cfg.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 flex items-center justify-center transition-all duration-200 filter drop-shadow-sm hover:drop-shadow-md cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8"
                    aria-hidden="true"
                  >
                    <path
                      fill="#FF0000"
                      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
                    />
                    <path fill="#FFFFFF" d="M9.75 15.02l6.27-3.57-6.27-3.57v7.14z" />
                  </svg>
                </motion.a>

                {/* Instagram */}
                <motion.a
                  href={cfg.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 flex items-center justify-center transition-all duration-200 filter drop-shadow-sm hover:drop-shadow-md cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="footer-ig-grad"
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#bc1888" />
                        <stop offset="30%" stopColor="#cc2366" />
                        <stop offset="50%" stopColor="#dc2743" />
                        <stop offset="70%" stopColor="#e6683c" />
                        <stop offset="100%" stopColor="#f09433" />
                      </linearGradient>
                    </defs>
                    <rect width="24" height="24" rx="6.5" fill="url(#footer-ig-grad)" />
                    <rect
                      x="5.5"
                      y="5.5"
                      width="13"
                      height="13"
                      rx="3.5"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.6"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3.2"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.6"
                    />
                    <circle cx="15.8" cy="8.2" r="0.8" fill="#FFFFFF" />
                  </svg>
                </motion.a>

                {/* Facebook */}
                <motion.a
                  href={cfg.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 flex items-center justify-center transition-all duration-200 filter drop-shadow-sm hover:drop-shadow-md cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="12" fill="#1877F2" />
                    <path
                      fill="#FFFFFF"
                      d="M16.5 12.07h-2.8v8.38h-3.47v-8.38H7.72V9.43h2.51V7.18c0-2.48 1.52-3.84 3.73-3.84 1.06 0 1.97.08 2.24.12v2.6h-1.54c-1.2 0-1.44.57-1.44 1.41v2h2.89l-.61 2.6z"
                    />
                  </svg>
                </motion.a>

                {/* WhatsApp Channel */}
                <motion.a
                  href={cfg.social.whatsappChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Channel"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 flex items-center justify-center transition-all duration-200 filter drop-shadow-sm hover:drop-shadow-md cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="12" fill="#25D366" />
                    <path
                      fill="#FFFFFF"
                      d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.828z"
                    />
                    <path
                      fill="#FFFFFF"
                      d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.179L2 22l4.957-1.399C8.423 21.493 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.697 0-3.272-.512-4.588-1.39l-.329-.222-2.943.83.829-2.883-.238-.344C3.805 14.802 3.273 13.442 3.273 12c0-4.811 3.916-8.727 8.727-8.727 4.812 0 8.727 3.916 8.727 8.727 0 4.811-3.915 8.727-8.727 8.727z"
                    />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>

          {/* Column 2: Courses */}
          <div>
            <h4 className="font-heading font-semibold text-white text-base mb-4 tracking-wide">
              Judiciary Courses
            </h4>
            <ul className="space-y-2.5 text-sm">
              {COURSES.map((course) => (
                <li key={course.id}>
                  <Link
                    href={course.href}
                    className="text-slate-300 hover:text-emerald-light transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald/60 group-hover:bg-emerald-light group-hover:scale-125 transition-all" />
                    <span>{course.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-base mb-4 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-emerald-light transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:bg-emerald-light group-hover:scale-125 transition-all" />
                    <span>{link.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-white text-base mb-4 tracking-wide">
              Contact Information
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <a
                href={`tel:${cfg.phone}`}
                className="flex items-start gap-3 hover:text-emerald-light transition-colors group"
              >
                <Phone className="w-4 h-4 text-emerald shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <span>{cfg.phone}</span>
              </a>

              <a
                href={`mailto:${cfg.email}`}
                className="flex items-start gap-3 hover:text-emerald-light transition-colors group"
              >
                <Mail className="w-4 h-4 text-emerald shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <span>{cfg.email}</span>
              </a>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald shrink-0 mt-1" />
                <div className="space-y-1">
                  <p>{cfg.address}</p>
                  <a
                    href={cfg.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-emerald-light hover:underline pt-0.5"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {cfg.name}. All rights
            reserved.
          </p>

          <p className="flex items-center gap-1">
            <span>Designed &amp; built by</span>
            <a
              href="https://ostrune.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-emerald-light font-medium underline underline-offset-4 transition-colors"
            >
              Ostrune
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
