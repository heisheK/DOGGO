import Link from "next/link";
import { ArrowRight, ClipboardCheck, Heart, HeartPulse, MapPin, Sparkles, UsersRound } from "lucide-react";
import Image from "next/image";
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

const impactStats: Array<[LucideIcon, string, string]> = [
  [HeartPulse, "42", "rescues"],
  [UsersRound, "18", "adoptions"],
  [ClipboardCheck, "31", "medical files"]
];

export default async function HomePage() {
  const animals = await getAnimals();

  return (
    <main>
      <section className="soft-band overflow-hidden">
        <div className="page-shell grid min-h-[calc(100vh-4rem)] items-center gap-10 py-10 lg:grid-cols-[1.02fr_.98fr]">
          <div className="max-w-2xl">
            <Badge className="mb-5 bg-background/70">Campus rescue, adoption, care records, and AI stories</Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              A warmer rescue system for every campus stray.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              DOGGO turns sightings, treatment, foster care, and adoption into one calm workflow that students and volunteers can trust.
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
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {impactStats.map(([Icon, value, label]) => (
                <div key={String(label)} className="rounded-lg border bg-background/72 p-3 backdrop-blur">
                  <Icon className="h-4 w-4 text-primary" />
                  <p className="mt-2 text-2xl font-semibold">{String(value)}</p>
                  <p className="text-xs text-muted-foreground">{String(label)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="glass-line rounded-lg p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                <Image
                  src={animals[0]?.cover_image_url ?? "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200&auto=format&fit=crop"}
                  alt={animals[0]?.name ?? "Campus rescue animal"}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/55 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/20 bg-white/82 p-4 text-stone-900 backdrop-blur-xl dark:bg-stone-950/78 dark:text-stone-50">
                  <Badge className="border-primary/30 bg-primary/10 text-primary">Today&apos;s profile</Badge>
                  <h2 className="mt-3 text-2xl font-semibold">{animals[0]?.name ?? "Miso"}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-stone-600 dark:text-stone-300">
                    {animals[0]?.ai_description ?? "A gentle campus companion waiting for a safe home."}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -right-3 -top-4 hidden w-56 rounded-lg border bg-background/90 p-4 shadow-soft backdrop-blur lg:block">
              <p className="text-sm font-medium">Next action</p>
              <p className="mt-1 text-xs text-muted-foreground">Review adoption application and schedule home visit.</p>
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
