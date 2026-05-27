import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminEnv } from "@/lib/supabase/env";

const medicalSchema = z.object({
  animal_id: z.string().min(1),
  record_type: z.enum(["checkup", "vaccine", "sterilization", "treatment"]),
  hospital: z.string().min(1),
  performed_at: z.string().min(1),
  notes: z.string().optional().default(""),
  attachment_url: z.string().optional().nullable()
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = medicalSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (!hasSupabaseAdminEnv()) {
    return NextResponse.redirect(new URL(`/animals/${parsed.data.animal_id}`, request.url), { status: 303 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("medical_records").insert(parsed.data).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.redirect(new URL(`/animals/${parsed.data.animal_id}`, request.url), { status: 303 });
}
