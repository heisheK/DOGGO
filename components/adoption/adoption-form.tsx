"use client";

import { useState } from "react";
import { CheckCircle2, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Animal } from "@/lib/types/database";

export function AdoptionForm({ animals, selectedAnimalId }: { animals: Animal[]; selectedAnimalId?: string }) {
  const [animalId, setAnimalId] = useState(selectedAnimalId ?? animals[0]?.id ?? "");
  const [submitted, setSubmitted] = useState(false);
  const selectedAnimal = animals.find((animal) => animal.id === animalId);

  return (
    <aside className="h-fit rounded-lg border bg-card p-5 shadow-sm lg:sticky lg:top-24">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <HeartHandshake className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-lg font-semibold">Application form</h2>
          <p className="text-sm text-muted-foreground">Usually reviewed within 48 hours.</p>
        </div>
      </div>
      {selectedAnimal && (
        <div className="mt-5 rounded-md border bg-background p-3">
          <p className="text-sm font-medium">Applying for {selectedAnimal.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">{selectedAnimal.ai_description ?? selectedAnimal.story}</p>
        </div>
      )}
      {submitted && (
        <div className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
          Demo submitted. In production this will create a Supabase adoption application.
        </div>
      )}
      <form
        className="mt-5 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="animal_id">Animal</Label>
          <select
            id="animal_id"
            name="animal_id"
            value={animalId}
            onChange={(event) => setAnimalId(event.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            required
          >
            {animals.map((animal) => (
              <option key={animal.id} value={animal.id}>
                {animal.name} - {animal.status.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="applicant_name">Name</Label>
          <Input id="applicant_name" name="applicant_name" required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dorm_or_address">Dorm or address</Label>
            <Input id="dorm_or_address" name="dorm_or_address" required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience">Care experience</Label>
          <Textarea id="experience" name="experience" placeholder="Tell us about routines, roommates, budget, and emergency plan." />
        </div>
        <Button className="w-full">
          <CheckCircle2 className="h-4 w-4" />
          Submit application
        </Button>
      </form>
    </aside>
  );
}
