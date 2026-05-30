import { CampusMap } from "@/components/animals/campus-map";
import { RescueReportForm } from "@/components/rescue/rescue-report-form";
import { WorkflowBoard } from "@/components/rescue/workflow-board";
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
        <RescueReportForm />
        <section className="space-y-6">
          <CampusMap animals={animals} />
          <WorkflowBoard cases={rescueCases} />
        </section>
      </div>
    </main>
  );
}
