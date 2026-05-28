import Image from "next/image";
import Link from "next/link";
import { MapPin, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Animal } from "@/lib/types/database";

export function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3]">
        <Image src={animal.cover_image_url} alt={animal.name} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
        <Badge className="absolute left-3 top-3 border-white/60 bg-white/85 text-stone-700 dark:bg-stone-950/80">
          {animal.status.replaceAll("_", " ")}
        </Badge>
      </div>
      <CardContent className="space-y-4 pt-5">
        <div>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold">{animal.name}</h3>
            <span className="text-sm text-muted-foreground">{animal.age_estimate}</span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{animal.ai_description ?? animal.story}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {animal.temperament.slice(0, 3).map((trait) => (
            <Badge key={trait}>{trait}</Badge>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {animal.location_label}
          </span>
          {animal.sterilized && <ShieldCheck className="h-4 w-4 text-emerald-600" />}
        </div>
        <Button asChild className="w-full">
          <Link href={`/animals/${animal.id}`}>Meet {animal.name}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
