import { MapPin } from "lucide-react";
import type { Animal } from "@/lib/types/database";

export function CampusMap({ animals }: { animals: Animal[] }) {
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
          <div
            key={animal.id}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border bg-background/90 px-3 py-2 text-xs font-medium shadow-soft backdrop-blur"
            style={{ left: `${24 + index * 24}%`, top: `${34 + (index % 2) * 28}%` }}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            {animal.name}
          </div>
        ))}
      </div>
    </section>
  );
}
