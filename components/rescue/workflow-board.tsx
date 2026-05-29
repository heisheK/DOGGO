"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { RescueCase } from "@/lib/types/database";

const lanes = ["reported", "triaged", "rescued", "treating", "released", "adopted"] as const;

export function WorkflowBoard({ cases }: { cases: RescueCase[] }) {
  const [activeLane, setActiveLane] = useState<(typeof lanes)[number]>("treating");

  return (
    <section className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold">Rescue workflow</h2>
          <p className="text-sm text-muted-foreground">Tap a stage to focus the board and plan the next handoff.</p>
        </div>
        <Badge className="w-fit bg-secondary text-secondary-foreground">{cases.length} active cases</Badge>
      </div>
      <div className="touch-scroll flex gap-2 overflow-x-auto pb-2">
        {lanes.map((lane, index) => (
          <Button
            key={lane}
            type="button"
            variant={activeLane === lane ? "default" : "outline"}
            size="sm"
            className="shrink-0 capitalize"
            onClick={() => setActiveLane(lane)}
          >
            {index + 1}. {lane}
          </Button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        {lanes.map((lane, index) => {
          const laneCases = cases.filter((item) => item.status === lane);

          return (
            <section
              key={lane}
              className={
                activeLane === lane
                  ? "min-h-48 rounded-lg border border-primary bg-primary/5 p-3"
                  : "min-h-48 rounded-lg border bg-background p-3 opacity-80"
              }
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold capitalize">{lane}</h3>
                <Badge>{laneCases.length}</Badge>
              </div>
              <div className="mb-3 h-1.5 rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${((index + 1) / lanes.length) * 100}%` }} />
              </div>
              <div className="space-y-3">
                {laneCases.length === 0 && <p className="rounded-md border border-dashed p-3 text-xs text-muted-foreground">No cases in this stage.</p>}
                {laneCases.map((item) => (
                  <article key={item.id} className="rounded-md border bg-card p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium">{item.location_label}</p>
                      <Badge className={item.urgency === "high" ? "border-primary text-primary" : ""}>{item.urgency}</Badge>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{item.notes}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      {item.urgency === "high" ? <AlertTriangle className="h-3.5 w-3.5 text-primary" /> : <Clock3 className="h-3.5 w-3.5" />}
                      {item.assigned_to ? `Assigned to ${item.assigned_to}` : "Needs assignment"}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-md border bg-background p-3 text-sm text-muted-foreground">
        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        Keep each case moving with one clear owner, next appointment, and public update.
      </div>
    </section>
  );
}
