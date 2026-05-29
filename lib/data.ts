import { animals, applications, medicalRecords, rescueCases } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";
import type { Animal } from "@/lib/types/database";

function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function getAnimals(): Promise<Animal[]> {
  if (!hasSupabaseEnv()) return animals;

  const supabase = await createClient();
  const { data, error } = await supabase.from("animals").select("*").order("created_at", { ascending: false });
  if (error || !data) return animals;
  return data as Animal[];
}

export async function getAnimal(id: string): Promise<Animal | undefined> {
  if (!hasSupabaseEnv()) return animals.find((animal) => animal.id === id);

  const supabase = await createClient();
  const { data, error } = await supabase.from("animals").select("*").eq("id", id).single();
  if (error || !data) return animals.find((animal) => animal.id === id);
  return data as Animal;
}

export async function getDashboardData() {
  return {
    animals: await getAnimals(),
    rescueCases,
    medicalRecords,
    applications
  };
}
