import { AnimalDiscovery } from "@/components/animals/animal-discovery";
import { AdoptionForm } from "@/components/adoption/adoption-form";
import { getAnimals } from "@/lib/data";

export default async function AdoptionPage({ searchParams }: { searchParams: Promise<{ animal?: string }> }) {
  const animals = await getAnimals();
  const { animal } = await searchParams;
  const adoptableAnimals = animals.filter((item) => item.status !== "adopted");

  return (
    <main className="page-shell grid gap-8 py-8 lg:grid-cols-[1fr_380px]">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Adoption</h1>
        <p className="mt-2 text-muted-foreground">
          Search by personality, location, and care status, then send a thoughtful application to the volunteer team.
        </p>
        <div className="mt-6">
          <AnimalDiscovery animals={adoptableAnimals} />
        </div>
      </section>
      <AdoptionForm animals={adoptableAnimals} selectedAnimalId={animal} />
    </main>
  );
}
