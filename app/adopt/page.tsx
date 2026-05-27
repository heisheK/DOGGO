import { AnimalGrid } from "@/components/animals/animal-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAnimals } from "@/lib/data";

export default async function AdoptionPage() {
  const animals = await getAnimals();

  return (
    <main className="page-shell grid gap-8 py-8 lg:grid-cols-[1fr_380px]">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Adoption</h1>
        <p className="mt-2 text-muted-foreground">Find a campus companion and submit an application for volunteer review.</p>
        <div className="mt-6">
          <AnimalGrid animals={animals.filter((animal) => animal.status !== "adopted")} />
        </div>
      </section>
      <aside className="h-fit rounded-lg border bg-card p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Application form</h2>
        <form className="mt-5 space-y-4" action="/api/adoptions" method="post">
          <div className="space-y-2">
            <Label htmlFor="animal_id">Animal ID</Label>
            <Input id="animal_id" name="animal_id" placeholder="miso" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="applicant_name">Name</Label>
            <Input id="applicant_name" name="applicant_name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dorm_or_address">Dorm or address</Label>
            <Input id="dorm_or_address" name="dorm_or_address" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Care experience</Label>
            <Textarea id="experience" name="experience" />
          </div>
          <Button className="w-full">Submit application</Button>
        </form>
      </aside>
    </main>
  );
}
