"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Monitor, Users, ArrowRight, MessageSquare } from "lucide-react";
import type { Batch } from "@/lib/supabase/types";
import { useWhatsApp } from "@/hooks/useWhatsApp";

export interface BatchTableProps {
  batches?: Batch[] | any[];
  showTitle?: boolean;
  limit?: number;
}

const DEFAULT_BATCHES: any[] = [
  {
    id: "batch-1",
    course_id: "civil-judge",
    course_name: "Civil Judge Exam Coaching",
    start_date: "2026-02-15",
    timing: "7:00 AM – 9:00 AM",
    mode: "Online + Offline",
    total_seats: 30,
    seats_filled: 26,
    status: "filling",
    is_active: true,
    notes: "Morning batch",
  },
  {
    id: "batch-2",
    course_id: "app-exam",
    course_name: "APP Exam Coaching",
    start_date: "2026-02-22",
    timing: "6:00 PM – 8:00 PM",
    mode: "Online + Offline",
    total_seats: 30,
    seats_filled: 14,
    status: "open",
    is_active: true,
    notes: "Evening batch",
  },
  {
    id: "batch-3",
    course_id: "patent-agent",
    course_name: "Patent Agent Exam",
    start_date: "2026-03-01",
    timing: "Weekend (Sat & Sun)",
    mode: "Online Only",
    total_seats: 25,
    seats_filled: 25,
    status: "full",
    is_active: true,
    notes: "Weekend batch",
  },
  {
    id: "batch-4",
    course_id: "civil-judge-weekend",
    course_name: "Civil Judge (Weekend Intensive)",
    start_date: "2026-03-08",
    timing: "10:00 AM – 4:00 PM",
    mode: "Online + Offline",
    total_seats: 30,
    seats_filled: 10,
    status: "open",
    is_active: true,
    notes: "Sunday batch",
  },
];

// Format date into "15 Jan 2026"
function formatBatchDate(dateStr?: string | null): string {
  if (!dateStr) return "Announcing Soon";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function BatchTable({
  batches,
  showTitle = true,
  limit,
}: BatchTableProps) {
  const { openCourseEnquiry, openGeneralEnquiry } = useWhatsApp();

  const sourceBatches =
    batches && batches.length > 0 ? batches : DEFAULT_BATCHES;
  const displayBatches = limit ? sourceBatches.slice(0, limit) : sourceBatches;

  // Status Badge Component
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-tint text-emerald-dark border border-emerald/30">
            Open
          </span>
        );
      case "filling":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse mr-1.5" />
            Filling Fast
          </span>
        );
      case "full":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            Full
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  // Seats remaining text and styling
  const renderSeats = (batch: Batch | any) => {
    const total = batch.total_seats ?? 30;
    const filled = batch.seats_filled ?? 0;
    const remaining = Math.max(total - filled, 0);

    if (batch.status === "full" || remaining === 0) {
      return (
        <span className="text-xs font-semibold text-red-600">No seats left</span>
      );
    }

    if (remaining < 5) {
      return (
        <span className="text-xs font-bold text-red-600 animate-pulse">
          Only {remaining} {remaining === 1 ? "seat" : "seats"} left!
        </span>
      );
    }

    return (
      <span className="text-xs font-medium text-emerald">
        {remaining} seats available
      </span>
    );
  };

  // Empty state
  if (!displayBatches || displayBatches.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4">
        <div className="w-12 h-12 rounded-full bg-navy-tint text-navy-mid flex items-center justify-center mx-auto">
          <Calendar className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-heading font-bold text-lg text-navy-dark">
            Upcoming Batches
          </h4>
          <p className="text-sm text-slate-600">
            No upcoming batches announced yet. Contact us directly for the next batch schedule.
          </p>
        </div>
        <button
          type="button"
          onClick={openGeneralEnquiry}
          className="inline-flex items-center gap-2 bg-emerald hover:bg-emerald-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-sm"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Inquire on WhatsApp</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {showTitle && (
        <div className="flex items-center justify-between pb-2">
          <h3 className="font-heading font-bold text-xl text-navy-dark">
            Upcoming Batch Schedule
          </h3>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
            Online &amp; Classroom Batches
          </span>
        </div>
      )}

      {/* Desktop Table View (>= 768px) */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-navy-dark text-white text-xs font-heading font-semibold uppercase tracking-wider">
              <th className="py-4 px-6">Course</th>
              <th className="py-4 px-4">Start Date</th>
              <th className="py-4 px-4">Timing</th>
              <th className="py-4 px-4">Mode</th>
              <th className="py-4 px-4">Seats</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {displayBatches.map((batch, idx) => (
              <motion.tr
                key={batch.id || idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35, delay: idx * 0.05, ease: "easeOut" }}
                className="hover:bg-slate-50/80 transition-colors"
              >
                {/* Course Name */}
                <td className="py-4 px-6 font-heading font-bold text-navy-dark">
                  {batch.course_name}
                </td>

                {/* Start Date */}
                <td className="py-4 px-4 font-medium text-slate-700 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-navy-mid/70" />
                    <span>{formatBatchDate(batch.start_date)}</span>
                  </div>
                </td>

                {/* Timing */}
                <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{batch.timing || "Flexible"}</span>
                  </div>
                </td>

                {/* Mode */}
                <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5 text-slate-400" />
                    <span>{batch.mode || "Online + Offline"}</span>
                  </div>
                </td>

                {/* Seats */}
                <td className="py-4 px-4 whitespace-nowrap">
                  {renderSeats(batch)}
                </td>

                {/* Status Badge */}
                <td className="py-4 px-4 whitespace-nowrap">
                  {renderStatusBadge(batch.status)}
                </td>

                {/* CTA Action */}
                <td className="py-4 px-6 text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => openCourseEnquiry(batch.course_name)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-navy-mid hover:bg-emerald px-4 py-2 rounded-full transition-colors shadow-sm"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Stack Layout (< 768px) */}
      <div className="md:hidden space-y-3.5">
        {displayBatches.map((batch, idx) => (
          <motion.div
            key={batch.id || idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.35, delay: idx * 0.05, ease: "easeOut" }}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3.5"
          >
            {/* Header: Course name + Status */}
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-heading font-bold text-base text-navy-dark">
                {batch.course_name}
              </h4>
              {renderStatusBadge(batch.status)}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-600 pt-1 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald shrink-0" />
                <span className="font-medium text-slate-800">
                  {formatBatchDate(batch.start_date)}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{batch.timing || "Flexible"}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{batch.mode || "Online + Offline"}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {renderSeats(batch)}
              </div>
            </div>

            {/* Mobile CTA Button */}
            <button
              type="button"
              onClick={() => openCourseEnquiry(batch.course_name)}
              className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-navy-mid hover:bg-emerald py-2.5 rounded-xl transition-colors shadow-sm"
            >
              <span>Enquire for this Batch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default BatchTable;
