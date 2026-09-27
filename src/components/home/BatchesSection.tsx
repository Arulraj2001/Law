import { getActiveBatchesSanity } from "@/lib/sanity/queries";
import { BatchesSectionClient, BatchItem } from "./BatchesSectionClient";

const placeholderBatches: BatchItem[] = [
  {
    id: "1",
    course_name: "Civil Judge Exam — Full Batch",
    start_date: "2026-02-01",
    timing: "7:00 AM – 9:00 AM (Morning)",
    mode: "Online + Offline",
    total_seats: 30,
    seats_filled: 22,
    status: "filling",
    notes: "Tamil medium available",
    is_active: true,
  },
  {
    id: "2",
    course_name: "APP Exam — Full Batch",
    start_date: "2026-02-15",
    timing: "6:00 PM – 8:00 PM (Evening)",
    mode: "Online + Offline",
    total_seats: 25,
    seats_filled: 10,
    status: "open",
    notes: null,
    is_active: true,
  },
  {
    id: "3",
    course_name: "Civil Judge — Mains Intensive",
    start_date: "2026-03-01",
    timing: "10:00 AM – 12:00 PM (Morning)",
    mode: "Online",
    total_seats: 20,
    seats_filled: 5,
    status: "open",
    notes: "For Prelims-cleared candidates only",
    is_active: true,
  },
  {
    id: "4",
    course_name: "Patent Agent Exam Batch",
    start_date: "2026-03-15",
    timing: "7:00 PM – 9:00 PM (Evening)",
    mode: "Online",
    total_seats: 15,
    seats_filled: 3,
    status: "open",
    notes: null,
    is_active: true,
  },
];

export async function BatchesSection() {
  let batches: BatchItem[] = placeholderBatches;

  try {
    const sanityBatches = await getActiveBatchesSanity();
    if (Array.isArray(sanityBatches) && sanityBatches.length > 0) {
      batches = sanityBatches.map((b: any, index: number) => ({
        id: b._id || String(index + 1),
        course_name: b.course?.title || b.courseName || "Civil Judge Exam Coaching",
        start_date: b.startDate || "2026-02-01",
        timing: b.timing || "7:00 AM – 9:00 AM",
        mode: b.mode || "Online + Offline",
        total_seats: typeof b.totalSeats === "number" ? b.totalSeats : 30,
        seats_filled: typeof b.seatsFilled === "number" ? b.seatsFilled : 15,
        status: b.status || "open",
        notes: b.notes || null,
        is_active: true,
      }));
    }
  } catch {
    batches = placeholderBatches;
  }

  return <BatchesSectionClient batches={batches} />;
}

export default BatchesSection;
