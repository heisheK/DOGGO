"use client";

import { useState } from "react";
import Link from "next/link";
import { HeartPulse, MapPin, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Animal } from "@/lib/types/database";

export function CampusMap({ animals }: { animals: Animal[] }) {
  const [selectedId, setSelectedId] = useState(animals[0]?.id ?? "");
  const selectedAnimal = animals.find((animal) => animal.id === selectedId) ?? animals[0];

  return (
    <section className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Campus Stray Map</h2>
          <p className="text-sm text-muted-foreground">Live rescue points, feeding spots, and foster handoffs.</p>
        </div>
        <MapPin className="h-5 w-5 text-primary" />
      </div>
      <div className="relative h-72 overflow-hidden rounded-md border bg-[linear-gradient(135deg,rgba(120,113,108,.12)_25%,transparent_25%),linear-gradient(225deg,rgba(120,113,108,.12)_25%,transparent_25%),linear-gradient(45deg,rgba(120,113,108,.12)_25%,transparent_25%),linear-gradient(315deg,rgba(120,113,108,.12)_25%,hsl(var(--muted))_25%)] bg-[length:28px_28px] bg-[position:14px_0,14px_0,0_0,0_0]">
        <div className="absolute left-[10%] top-[48%] h-1 w-[80%] rounded-full bg-stone-400/30" />
        <div className="absolute left-[45%] top-[8%] h-[82%] w-1 rounded-full bg-stone-400/30" />
        {animals.map((animal, index) => (
          <button
            key={animal.id}
            type="button"
            onClick={() => setSelectedId(animal.id)}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border bg-background/90 px-3 py-2 text-xs font-medium shadow-soft backdrop-blur transition hover:-translate-y-[calc(50%+2px)] hover:border-primary hover:text-primary"
            style={{ left: `${24 + index * 24}%`, top: `${34 + (index % 2) * 28}%` }}
          >
            <span className={animal.id === selectedId ? "h-2.5 w-2.5 rounded-full bg-primary" : "h-2.5 w-2.5 rounded-full bg-emerald-500"} />
            {animal.name}
          </button>
        ))}
      </div>
      {selectedAnimal && (
        <div className="mt-4 grid gap-3 rounded-md border bg-background p-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold">{selectedAnimal.name}</p>
              <Badge>{selectedAnimal.status.replaceAll("_", " ")}</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{selectedAnimal.location_label}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Navigation className="h-3.5 w-3.5" />
                {selectedAnimal.latitude.toFixed(4)}, {selectedAnimal.longitude.toFixed(4)}
              </span>
              <span className="flex items-center gap-1">
                <HeartPulse className="h-3.5 w-3.5" />
                {selectedAnimal.vaccinated ? "vaccinated" : "vaccine pending"}
              </span>
            </div>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href={`/animals/${selectedAnimal.id}`}>Open profile</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
