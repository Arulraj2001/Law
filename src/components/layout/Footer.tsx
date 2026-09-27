"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ExternalLink, Scale } from "lucide-react";
import { SITE_CONFIG, COURSES } from "@/lib/constants";

export function Footer() {
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
              <span>{SITE_CONFIG.name}</span>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed">
              Tamil Nadu&apos;s premier coaching institute for TNPSC Civil Judge,
              Assistant Public Prosecutor, and specialized legal certification exams.
            </p>

            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-3">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                {/* YouTube */}
                <motion.a
                  href={SITE_CONFIG.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-emerald hover:border-emerald hover:bg-emerald/10 transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-currentColor"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </motion.a>

                {/* Instagram */}
                <motion.a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-emerald hover:border-emerald hover:bg-emerald/10 transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </motion.a>

                {/* Facebook */}
                <motion.a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-emerald hover:border-emerald hover:bg-emerald/10 transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-currentColor"
                    aria-hidden="true"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </motion.a>

                {/* WhatsApp Channel */}
                <motion.a
                  href={SITE_CONFIG.social.whatsappChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Channel"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-emerald hover:border-emerald hover:bg-emerald/10 transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.828z" />
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.179L2 22l4.957-1.399C8.423 21.493 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.697 0-3.272-.512-4.588-1.39l-.329-.222-2.943.83.829-2.883-.238-.344C3.805 14.802 3.273 13.442 3.273 12c0-4.811 3.916-8.727 8.727-8.727 4.812 0 8.727 3.916 8.727 8.727 0 4.811-3.915 8.727-8.727 8.727z" />
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
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-start gap-3 hover:text-emerald-light transition-colors group"
              >
                <Phone className="w-4 h-4 text-emerald shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <span>{SITE_CONFIG.phone}</span>
              </a>

              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-start gap-3 hover:text-emerald-light transition-colors group"
              >
                <Mail className="w-4 h-4 text-emerald shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <span>{SITE_CONFIG.email}</span>
              </a>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald shrink-0 mt-1" />
                <div className="space-y-1">
                  <p>{SITE_CONFIG.address}</p>
                  <a
                    href={SITE_CONFIG.mapUrl}
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
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
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
