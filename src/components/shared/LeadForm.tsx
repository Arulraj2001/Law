"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { COURSES, SITE_CONFIG } from "@/lib/constants";

export interface LeadFormProps {
  formType?: "enquiry" | "demo_class" | "counselling" | "contact";
  courseOptions?: string[];
  defaultCourse?: string;
  source?: string;
  onSuccess?: (course?: string) => void;
  className?: string;
  buttonText?: string;
  buttonVariant?: "primary" | "whatsapp";
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  course_interest: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  course_interest?: string;
}

export function LeadForm({
  formType = "enquiry",
  courseOptions,
  defaultCourse,
  source = "website",
  onSuccess,
  className = "",
  buttonText = "Submit Enquiry",
  buttonVariant = "primary",
}: LeadFormProps) {
  const defaultCourses = courseOptions || COURSES.map((c) => c.title);

  const [formData, setFormData] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    course_interest: defaultCourse || defaultCourses[0] || "Civil Judge Exam Coaching",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  // Validate single field
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return undefined;

      case "phone": {
        const clean = value.replace(/\s|-|\+91/g, "");
        if (!clean) return "Mobile number is required";
        if (!/^[6-9]\d{9}$/.test(clean)) {
          return "Enter a valid 10-digit Indian mobile number (e.g. 9876543210)";
        }
        return undefined;
      }

      case "email":
        if (formType === "contact") {
          if (!value.trim()) return "Email address is required";
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return "Please enter a valid email address";
          }
        } else if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Please enter a valid email address";
        }
        return undefined;

      default:
        return undefined;
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const nameErr = validateField("name", formData.name);
    const phoneErr = validateField("phone", formData.phone);
    const emailErr = validateField("email", formData.email);

    const newErrors: FormErrors = {
      name: nameErr,
      phone: phoneErr,
      email: emailErr,
    };

    setErrors(newErrors);
    setTouched({ name: true, phone: true, email: true });

    if (nameErr || phoneErr || emailErr) {
      return;
    }

    setStatus("loading");
    setServerErrorMessage("");

    const cleanPhone = formData.phone.replace(/\s|-|\+91/g, "");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: cleanPhone,
          email: formData.email.trim() || undefined,
          course_interest: formData.course_interest,
          message: formData.message.trim() || undefined,
          form_type: formType,
          source: source || "website",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit enquiry");
      }

      setStatus("success");
      if (onSuccess) onSuccess(formData.course_interest);

      // If WhatsApp variant, open chat with prefilled text
      if (buttonVariant === "whatsapp") {
        const waNumber = (SITE_CONFIG.whatsapp || "919876543210").replace(
          /\D/g,
          ""
        );
        const msg = encodeURIComponent(
          `Hi, I submitted an enquiry on your website.\n*Name:* ${formData.name}\n*Phone:* ${cleanPhone}\n*Course:* ${formData.course_interest}\n${formData.message ? `*Message:* ${formData.message}` : ""}`
        );
        window.open(`https://wa.me/${waNumber}?text=${msg}`, "_blank");
      }

      // Reset form after 2.5s
      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          email: "",
          course_interest: defaultCourses[0] || "",
          message: "",
        });
        setTouched({});
        setErrors({});
        setStatus("idle");
      }, 2500);
    } catch (err: any) {
      setStatus("error");
      setServerErrorMessage(
        err.message || "Something went wrong. Please try again or reach out on WhatsApp."
      );
    }
  };

  const isContactForm = formType === "contact";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4 ${className}`}
    >
      {/* Full Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
        >
          Your Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          onBlur={() => handleBlur("name")}
          placeholder="e.g. Priya Sundaram"
          className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
            touched.name && errors.name
              ? "border-red-400 focus:ring-red-400/20 bg-red-50/20"
              : touched.name && !errors.name
              ? "border-emerald/60 focus:ring-emerald/20"
              : "border-slate-200 focus:border-navy-mid focus:ring-navy-mid/10"
          }`}
        />
        <AnimatePresence>
          {touched.name && errors.name && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.name}</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Phone Number */}
      <div>
        <label
          htmlFor="phone"
          className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
        >
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            onBlur={() => handleBlur("phone")}
            placeholder="10-digit mobile number"
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
              touched.phone && errors.phone
                ? "border-red-400 focus:ring-red-400/20 bg-red-50/20"
                : touched.phone && !errors.phone
                ? "border-emerald/60 focus:ring-emerald/20"
                : "border-slate-200 focus:border-navy-mid focus:ring-navy-mid/10"
            }`}
          />
        </div>
        <AnimatePresence>
          {touched.phone && errors.phone && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.phone}</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Email (Conditional on Contact Form or Optional) */}
      {(isContactForm || formData.email) && (
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
          >
            Email Address {isContactForm && <span className="text-red-500">*</span>}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur("email")}
            placeholder="name@example.com"
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
              touched.email && errors.email
                ? "border-red-400 focus:ring-red-400/20 bg-red-50/20"
                : touched.email && !errors.email
                ? "border-emerald/60 focus:ring-emerald/20"
                : "border-slate-200 focus:border-navy-mid focus:ring-navy-mid/10"
            }`}
          />
          <AnimatePresence>
            {touched.email && errors.email && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="text-xs text-red-500 mt-1 flex items-center gap-1 font-medium"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.email}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Course Selection */}
      <div>
        <label
          htmlFor="course_interest"
          className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
        >
          Course of Interest
        </label>
        <select
          id="course_interest"
          name="course_interest"
          value={formData.course_interest}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-navy-mid focus:ring-2 focus:ring-navy-mid/10 focus:outline-none bg-white text-slate-800"
        >
          {defaultCourses.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
        >
          Message / Specific Goal{" "}
          <span className="text-slate-400 font-normal lowercase">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your target attempt year, language preference, etc."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-navy-mid focus:ring-2 focus:ring-navy-mid/10 focus:outline-none resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`w-full py-3.5 px-6 rounded-xl font-heading font-semibold text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
            buttonVariant === "whatsapp"
              ? "bg-[#25D366] hover:bg-[#20ba59] text-white"
              : status === "success"
              ? "bg-emerald text-white"
              : "bg-emerald hover:bg-emerald-dark text-white"
          } ${status === "loading" ? "opacity-80 cursor-not-allowed" : ""}`}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>Enquiry Submitted!</span>
            </>
          ) : buttonVariant === "whatsapp" ? (
            <>
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-white"
                aria-hidden="true"
              >
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.828z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.179L2 22l4.957-1.399C8.423 21.493 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.697 0-3.272-.512-4.588-1.39l-.329-.222-2.943.83.829-2.883-.238-.344C3.805 14.802 3.273 13.442 3.273 12c0-4.811 3.916-8.727 8.727-8.727 4.812 0 8.727 3.916 8.727 8.727 0 4.811-3.915 8.727-8.727 8.727z" />
              </svg>
              <span>{buttonText || "Enquire via WhatsApp"}</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{buttonText}</span>
            </>
          )}
        </button>
      </div>

      {/* Feedback Messages */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="p-3 rounded-xl bg-emerald-tint border border-emerald/30 text-emerald-dark text-xs text-center font-medium"
          >
            Thank you! Your enquiry has been received. Our senior faculty will call you shortly.
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium"
          >
            {serverErrorMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

export default LeadForm;
