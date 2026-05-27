import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, ShieldCheck, Syringe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAnimal } from "@/lib/data";

export default async function AnimalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const animal = await getAnimal(id);
  if (!animal) notFound();

  return (
    <main className="page-shell grid gap-8 py-8 lg:grid-cols-[1.05fr_.95fr]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border">
        <Image src={animal.cover_image_url} alt={animal.name} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" priority />
      </div>
      <section className="space-y-6">
        <div>
          <Badge>{animal.status.replaceAll("_", " ")}</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{animal.name}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{animal.ai_description ?? animal.story}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Info icon={MapPin} label="Location" value={animal.location_label} />
          <Info icon={CalendarDays} label="Age" value={animal.age_estimate} />
          <Info icon={ShieldCheck} label="Sterilized" value={animal.sterilized ? "Completed" : "Pending"} />
          <Info icon={Syringe} label="Vaccinated" value={animal.vaccinated ? "Completed" : "Pending"} />
        </div>
        <div>
          <h2 className="font-semibold">Story</h2>
          <p className="mt-2 leading-7 text-muted-foreground">{animal.story}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {animal.temperament.map((trait) => (
            <Badge key={trait}>{trait}</Badge>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href={`/adopt?animal=${animal.id}`}>Apply to adopt</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/medical/upload">Upload medical record</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

function Info({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <Icon className="h-4 w-4 text-primary" />
      <p className="mt-3 text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
