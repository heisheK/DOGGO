import { Badge } from "@/components/ui/badge";
import type { RescueCase } from "@/lib/types/database";

const lanes = ["reported", "triaged", "rescued", "treating", "released", "adopted"] as const;

export function WorkflowBoard({ cases }: { cases: RescueCase[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
      {lanes.map((lane) => (
        <section key={lane} className="min-h-48 rounded-lg border bg-card p-3">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold capitalize">{lane}</h3>
            <Badge>{cases.filter((item) => item.status === lane).length}</Badge>
          </div>
          <div className="space-y-3">
            {cases
              .filter((item) => item.status === lane)
              .map((item) => (
                <article key={item.id} className="rounded-md border bg-background p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{item.location_label}</p>
                    <Badge className={item.urgency === "high" ? "border-primary text-primary" : ""}>{item.urgency}</Badge>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{item.notes}</p>
                </article>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
