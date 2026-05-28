import { AnimalCard } from "@/components/animals/animal-card";
import type { Animal } from "@/lib/types/database";

export function AnimalGrid({ animals }: { animals: Animal[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {animals.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  );
}
