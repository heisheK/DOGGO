import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminEnv } from "@/lib/supabase/env";

const rescueSchema = z.object({
  reporter_name: z.string().min(1),
  location_label: z.string().min(1),
  urgency: z.enum(["low", "medium", "high"]),
  notes: z.string().optional().default("")
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = rescueSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (!hasSupabaseAdminEnv()) {
    return NextResponse.redirect(new URL("/rescue", request.url), { status: 303 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("rescue_cases")
    .insert({ ...parsed.data, status: "reported" })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.redirect(new URL("/rescue", request.url), { status: 303 });
}
