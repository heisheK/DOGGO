import { CampusMap } from "@/components/animals/campus-map";
import { WorkflowBoard } from "@/components/rescue/workflow-board";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAnimals } from "@/lib/data";
import { rescueCases } from "@/lib/mock-data";

export default async function RescuePage() {
  const animals = await getAnimals();

  return (
    <main className="page-shell py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Rescue Management</h1>
        <p className="mt-2 text-muted-foreground">Coordinate reports, triage, transport, treatment, release, and adoption.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <aside className="h-fit rounded-lg border bg-card p-5 shadow-sm">
          <h2 className="text-lg font-semibold">New rescue report</h2>
          <form className="mt-5 space-y-4" action="/api/rescue-cases" method="post">
            <div className="space-y-2">
              <Label htmlFor="reporter_name">Reporter</Label>
              <Input id="reporter_name" name="reporter_name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location_label">Campus location</Label>
              <Input id="location_label" name="location_label" placeholder="East gate bicycle shed" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency</Label>
              <Input id="urgency" name="urgency" placeholder="low, medium, high" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" name="notes" />
            </div>
            <Button className="w-full">Create rescue case</Button>
          </form>
        </aside>
        <section className="space-y-6">
          <CampusMap animals={animals} />
          <WorkflowBoard cases={rescueCases} />
        </section>
      </div>
    </main>
  );
}
