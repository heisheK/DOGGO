import { NextResponse } from "next/server";
import { getAnimals } from "@/lib/data";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminEnv } from "@/lib/supabase/env";

export async function GET() {
  const animals = await getAnimals();
  return NextResponse.json({ animals });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json({ animal: body, warning: "Supabase env is not configured; returning request body only." }, { status: 202 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase.from("animals").insert(body).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ animal: data }, { status: 201 });
}
