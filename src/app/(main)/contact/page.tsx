"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE_CONFIG } from "@/lib/constants";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Admissions Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      router.push("/thank-you");
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 sm:px-8">
        <SectionHeading
          badge="Get in Touch"
          title="Contact Our Admissions & Counselling Team"
          subtitle="Have questions about eligibility, upcoming batches, or course fees? Reach out to us directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-navy-tint text-navy-mid flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-slate-900">Phone Support</h3>
                  <p className="text-sm text-slate-600 mt-0.5">{SITE_CONFIG.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-tint text-emerald flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-slate-900">WhatsApp Admissions</h3>
                  <p className="text-sm text-slate-600 mt-0.5">{SITE_CONFIG.whatsapp}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-navy-tint text-navy-mid flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-slate-900">Email</h3>
                  <p className="text-sm text-slate-600 mt-0.5">{SITE_CONFIG.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-navy-tint text-navy-mid flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-slate-900">Institute Address</h3>
                  <p className="text-sm text-slate-600 mt-0.5">{SITE_CONFIG.address}</p>
                  <a
                    href={SITE_CONFIG.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald hover:underline mt-1 inline-block"
                  >
                    Open in Google Maps &rarr;
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-slate-900">Office Timings</h3>
                  <p className="text-sm text-slate-600 mt-0.5">Monday to Saturday: 08:00 AM - 07:30 PM</p>
                  <p className="text-xs text-slate-500">Sunday: 09:00 AM - 04:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="p-8 rounded-xl bg-white border shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-xl text-navy-dark">Send an Inquiry</h3>
              {error && <div className="p-3 text-xs text-red-600 bg-red-50 rounded">{error}</div>}

              <div className="space-y-1.5">
                <Label htmlFor="contact-name" className="text-xs">Your Name *</Label>
                <Input
                  id="contact-name"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-email" className="text-xs">Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-phone" className="text-xs">Phone (WhatsApp)</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-subject" className="text-xs">Subject</Label>
                <Input
                  id="contact-subject"
                  placeholder="Course / Batch / General Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-message" className="text-xs">Your Message *</Label>
                <Textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="How can we help your legal examination preparation?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-navy-mid hover:bg-navy-dark text-white font-medium py-2.5"
              >
                {loading ? "Sending Message..." : "Submit Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
