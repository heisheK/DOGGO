import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminEnv } from "@/lib/supabase/env";

const adoptionSchema = z.object({
  animal_id: z.string().min(1),
  applicant_name: z.string().min(1),
  phone: z.string().min(6),
  dorm_or_address: z.string().min(1),
  experience: z.string().optional().default("")
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = adoptionSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (!hasSupabaseAdminEnv()) {
    return NextResponse.redirect(new URL(`/animals/${parsed.data.animal_id}`, request.url), { status: 303 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("adoption_applications")
    .insert({ ...parsed.data, status: "pending" })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.redirect(new URL(`/animals/${parsed.data.animal_id}`, request.url), { status: 303 });
}
