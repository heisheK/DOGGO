"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function RescueReportForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <aside className="h-fit rounded-lg border bg-card p-5 shadow-sm">
      <h2 className="text-lg font-semibold">New rescue report</h2>
      {submitted && (
        <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
          Demo report saved. In production this will create a Supabase rescue case.
        </div>
      )}
      <form
        className="mt-5 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
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
        <Button className="w-full">
          <CheckCircle2 className="h-4 w-4" />
          Create rescue case
        </Button>
      </form>
    </aside>
  );
}
