"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Briefcase,
  FileCheck,
  ShieldCheck,
  GraduationCap,
  Award,
  Phone,
} from "lucide-react";
import { COURSES } from "@/lib/constants";
import { SITE_CONFIG_FALLBACK, type SiteConfig } from "@/lib/site-config.shared";
import { TopAlertBar } from "@/components/layout/TopAlertBar";

interface NavbarProps {
  config?: SiteConfig;
}

// Helper for course icon mapping
function getCourseIcon(slug: string) {
  switch (slug) {
    case "civil-judge":
      return <Scale className="w-4 h-4 text-navy-mid" />;
    case "app-exam":
      return <Briefcase className="w-4 h-4 text-navy-mid" />;
    case "patent-agent":
      return <FileCheck className="w-4 h-4 text-emerald" />;
    case "trademark-agent":
      return <ShieldCheck className="w-4 h-4 text-emerald" />;
    case "ugc-net-law":
      return <GraduationCap className="w-4 h-4 text-amber-600" />;
    case "set-law":
      return <Award className="w-4 h-4 text-amber-600" />;
    default:
      return <Scale className="w-4 h-4 text-navy-mid" />;
  }
}

// Helper for course badge styling
function getBadgeClasses(color?: string) {
  switch (color) {
    case "emerald":
      return "bg-emerald/10 text-emerald border-emerald/20";
    case "gold":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "navy":
    default:
      return "bg-navy-tint text-navy-mid border-navy-mid/20";
  }
}

export function Navbar({ config }: NavbarProps = {}) {
  const siteName = config?.name || SITE_CONFIG_FALLBACK.name;
  const phone = config?.phone || SITE_CONFIG_FALLBACK.phone;
  const pathname = usePathname();

  // Scroll detection hook
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile drawer state & body scroll lock hook
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
    setMobileCoursesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Desktop courses dropdown state
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);

  // Transparent only on home page when scrollY <= 50
  const isHomePage = pathname === "/";
  const isTransparent = isHomePage && !scrolled;

  const navLinks = [
    { title: "About", href: "/about" },
    { title: "Faculty", href: "/faculty" },
    { title: "Results", href: "/results" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
  ];

  const isCoursesActive = pathname.startsWith("/courses");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
          isTransparent
            ? "bg-transparent text-white"
            : "bg-white/95 backdrop-blur-md text-navy-dark shadow-sm border-b border-navy-mid/10"
        }`}
      >
        <TopAlertBar />
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px] md:h-[72px]">
            {/* Logo Left */}
            <Link
              href="/"
              className="flex items-center gap-2.5 font-heading font-semibold text-lg md:text-xl tracking-tight transition-opacity hover:opacity-90"
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                  isTransparent
                    ? "bg-white/10 text-white border border-white/20"
                    : "bg-navy-tint text-navy-dark border border-navy-mid/15"
                }`}
              >
                <span className="text-lg leading-none">⚖</span>
              </div>
              <span
                className={`transition-colors ${
                  isTransparent ? "text-white" : "text-navy-dark"
                }`}
              >
                {siteName}
              </span>
            </Link>

            {/* Desktop Navigation Links Center */}
            <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
              {/* Courses with Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCoursesDropdownOpen(true)}
                onMouseLeave={() => setCoursesDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setCoursesDropdownOpen((prev) => !prev)}
                  className={`flex items-center gap-1.5 py-2 transition-colors relative cursor-pointer ${
                    isCoursesActive
                      ? "text-emerald font-semibold"
                      : isTransparent
                      ? "text-white/90 hover:text-white"
                      : "text-navy-dark/80 hover:text-emerald"
                  }`}
                  aria-expanded={coursesDropdownOpen}
                >
                  <span>Courses</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      coursesDropdownOpen ? "rotate-180 text-emerald" : ""
                    }`}
                  />
                  {isCoursesActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald rounded-full"
                    />
                  )}
                </button>

                {/* Courses Dropdown Menu */}
                <AnimatePresence>
                  {coursesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full -left-20 pt-2 z-50"
                    >
                      <div className="w-[620px] bg-white rounded-2xl shadow-2xl border border-slate-100 ring-1 ring-black/5 p-4 text-slate-800">
                        <div className="flex items-center justify-between px-3 pb-2 border-b border-slate-100">
                          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                            Coaching Programmes
                          </span>
                          <span className="text-xs text-emerald font-medium">
                            TNPSC &amp; IP Exams
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-3">
                          {COURSES.map((course) => (
                            <Link
                              key={course.id}
                              href={course.href}
                              onClick={() => setCoursesDropdownOpen(false)}
                              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-navy-tint/50 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:shadow-sm transition-all">
                                {getCourseIcon(course.slug)}
                              </div>
                              <div className="min-w-0 flex-1 space-y-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="font-heading font-semibold text-xs text-navy-dark group-hover:text-emerald transition-colors line-clamp-1">
                                    {course.title}
                                  </span>
                                  {course.badge && (
                                    <span
                                      className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${getBadgeClasses(
                                        course.badgeColor
                                      )}`}
                                    >
                                      {course.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 line-clamp-1 leading-snug">
                                  {course.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other Navigation Links */}
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-2 transition-colors ${
                      isActive
                        ? "text-emerald font-semibold"
                        : isTransparent
                        ? "text-white/90 hover:text-white"
                        : "text-navy-dark/80 hover:text-emerald"
                    }`}
                  >
                    <span>{link.title}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA Button Right */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/demo-class">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-5 py-2 text-sm font-medium tracking-wide shadow-md animate-pulseGlow transition-colors cursor-pointer"
                >
                  Book Free Demo
                </motion.button>
              </Link>
            </div>

            {/* Mobile Hamburger Icon Right */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open mobile menu"
                className={`p-2 rounded-lg transition-colors ${
                  isTransparent
                    ? "text-white hover:bg-white/10"
                    : "text-navy-dark hover:bg-slate-100"
                }`}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Framer Motion slide-in from right) */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[310px] sm:w-[350px] max-w-[85vw] h-full bg-navy-dark text-white shadow-2xl flex flex-col justify-between overflow-y-auto md:hidden"
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between p-5 border-b border-white/10">
                  <Link
                    href="/"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-2 font-heading font-semibold text-lg text-white"
                  >
                    <span className="text-xl">⚖</span>
                    <span>{siteName}</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setIsMobileOpen(false)}
                    aria-label="Close mobile menu"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/20 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Nav Links */}
                <div className="p-5 space-y-1">
                  <Link
                    href="/"
                    onClick={() => setIsMobileOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      pathname === "/"
                        ? "text-emerald bg-white/10 font-semibold"
                        : "text-slate-200 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    Home
                  </Link>

                  {/* Courses Accordion in Drawer */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                        isCoursesActive
                          ? "text-emerald bg-white/10 font-semibold"
                          : "text-slate-200 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>Courses</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileCoursesOpen ? "rotate-180 text-emerald" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {mobileCoursesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-4 pr-1 py-1 space-y-1 overflow-hidden"
                        >
                          {COURSES.map((course) => (
                            <Link
                              key={course.id}
                              href={course.href}
                              onClick={() => setIsMobileOpen(false)}
                              className="flex items-center justify-between py-2 px-3 text-xs rounded-lg text-slate-300 hover:text-emerald hover:bg-white/5 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <span>{course.title}</span>
                                {course.badge && (
                                  <span
                                    className={`text-[9px] px-1.5 py-0.5 rounded-full border font-medium ${getBadgeClasses(
                                      course.badgeColor
                                    )}`}
                                  >
                                    {course.badge}
                                  </span>
                                )}
                              </div>
                              <ArrowRight className="w-3 h-3 text-slate-500" />
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                          isActive
                            ? "text-emerald bg-white/10 font-semibold"
                            : "text-slate-200 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {link.title}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer CTA */}
              <div className="p-5 border-t border-white/10 space-y-4">
                <Link
                  href="/demo-class"
                  onClick={() => setIsMobileOpen(false)}
                  className="block w-full"
                >
                  <button
                    type="button"
                    className="w-full bg-emerald hover:bg-emerald-dark text-white rounded-full py-3 text-sm font-semibold tracking-wide text-center shadow-lg transition-colors"
                  >
                    Book Free Demo Class
                  </button>
                </Link>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-emerald" />
                  <span>Call us: {phone}</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
