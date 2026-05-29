"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { AnimalGrid } from "@/components/animals/animal-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Animal, AnimalStatus } from "@/lib/types/database";

const filters: Array<{ label: string; value: "all" | AnimalStatus }> = [
  { label: "All", value: "all" },
  { label: "Ready", value: "ready_for_adoption" },
  { label: "Needs care", value: "needs_care" },
  { label: "Trial home", value: "in_trial" }
];

export function AnimalDiscovery({ animals }: { animals: Animal[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | AnimalStatus>("all");

  const filteredAnimals = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return animals.filter((animal) => {
      const matchesStatus = status === "all" || animal.status === status;
      const matchesQuery =
        !normalizedQuery ||
        [animal.name, animal.location_label, animal.species, animal.age_estimate, ...animal.temperament]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [animals, query, status]);

  return (
    <section className="space-y-5">
      <div className="rounded-lg border bg-card p-3 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="pl-9"
              placeholder="Search by name, location, trait..."
            />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
            {filters.map((filter) => (
              <Button
                key={filter.value}
                type="button"
                variant={status === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setStatus(filter.value)}
                className="shrink-0"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            {filteredAnimals.length} profiles match
          </span>
          <Badge className="bg-secondary text-secondary-foreground">mobile-first</Badge>
        </div>
      </div>
      <AnimalGrid animals={filteredAnimals} />
    </section>
  );
}
