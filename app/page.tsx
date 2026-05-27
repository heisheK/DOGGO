import Link from "next/link";
import { ArrowRight, ClipboardCheck, Heart, MapPin, Sparkles } from "lucide-react";
import { AnimalGrid } from "@/components/animals/animal-grid";
import { CampusMap } from "@/components/animals/campus-map";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAnimals } from "@/lib/data";
import type { LucideIcon } from "lucide-react";

const rescueSteps: Array<[LucideIcon, string, string]> = [
  [MapPin, "Report", "Students mark a location and upload field notes."],
  [ClipboardCheck, "Triage", "Volunteers assign urgency, foster needs, and transport."],
  [Heart, "Care", "Medical, sterilization, and adoption steps stay traceable."],
  [Sparkles, "Share", "AI helps create humane profile copy for public adoption posts."]
];

export default async function HomePage() {
  const animals = await getAnimals();

  return (
    <main>
      <section className="soft-band">
        <div className="page-shell grid min-h-[calc(100vh-4rem)] items-center gap-10 py-10 lg:grid-cols-[1.02fr_.98fr]">
          <div className="max-w-2xl">
            <Badge className="mb-5 bg-background/70">Campus rescue, adoption, and care records</Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              A gentler way to protect campus strays.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Public animal profiles, rescue workflow tracking, medical records, and adoption applications in one warm community platform.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="default">
                <Link href="/adopt">
                  Browse animals
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/rescue">
                  <MapPin className="h-4 w-4" />
                  Report a sighting
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="glass-line rounded-lg p-4">
              <AnimalGrid animals={animals.slice(0, 2)} />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                ["42", "rescues"],
                ["18", "adoptions"],
                ["31", "medical files"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border bg-background/75 p-4">
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Recently cared for</h2>
            <p className="mt-2 text-muted-foreground">A Xiaohongshu-style feed for transparent campus care stories.</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link href="/adopt">View all</Link>
          </Button>
        </div>
        <AnimalGrid animals={animals} />
      </section>

      <section className="page-shell grid gap-5 pb-16 lg:grid-cols-[1.2fr_.8fr]">
        <CampusMap animals={animals} />
        <div className="rounded-lg border bg-card p-5 shadow-sm">
          <h2 className="text-lg font-semibold">How rescue flows</h2>
          <div className="mt-5 space-y-4">
            {rescueSteps.map(([Icon, title, body]) => (
              <div key={String(title)} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium">{String(title)}</p>
                  <p className="text-sm text-muted-foreground">{String(body)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
