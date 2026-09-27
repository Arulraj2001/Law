import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    const { seats_filled, status } = body;

    const isMockEnv =
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL === "your_supabase_url" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http");

    if (isMockEnv) {
      return NextResponse.json({
        batch: {
          id: resolvedParams.id,
          seats_filled: typeof seats_filled === "number" ? seats_filled : 35,
          status: status || "filling",
          updated_at: new Date().toISOString(),
        },
      });
    }

    const supabase = createServiceSupabaseClient();
    const updateData: Database["public"]["Tables"]["batches"]["Update"] = {
      updated_at: new Date().toISOString(),
    };

    if (typeof seats_filled === "number") {
      updateData.seats_filled = seats_filled;
    }
    if (status) {
      updateData.status = status;
    }

    const { data, error } = await supabase
      .from("batches")
      .update(updateData)
      .eq("id", resolvedParams.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ batch: data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to update batch" },
      { status: 500 }
    );
  }
}
