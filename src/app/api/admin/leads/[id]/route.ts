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
    const { status, notes } = body;

    const isMockEnv =
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.NEXT_PUBLIC_SUPABASE_URL === "your_supabase_url" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("http");

    if (isMockEnv) {
      return NextResponse.json({
        lead: {
          id: resolvedParams.id,
          status: status || "contacted",
          notes: notes || null,
          updated_at: new Date().toISOString(),
        },
      });
    }

    const supabase = createServiceSupabaseClient();

    const updateData: Database["public"]["Tables"]["leads"]["Update"] = {
      updated_at: new Date().toISOString(),
    };
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const { data, error } = await supabase
      .from("leads")
      .update(updateData)
      .eq("id", resolvedParams.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ lead: data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to update lead status" },
      { status: 500 }
    );
  }
}
