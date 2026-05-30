"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function MedicalUploadForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="rounded-lg border bg-card p-5 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      {submitted && (
        <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
          Demo medical record saved. In production this will upload metadata and files to Supabase.
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="animal_id">Animal ID</Label>
          <Input id="animal_id" name="animal_id" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="record_type">Record type</Label>
          <Input id="record_type" name="record_type" placeholder="vaccine" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hospital">Hospital</Label>
          <Input id="hospital" name="hospital" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="performed_at">Date</Label>
          <Input id="performed_at" name="performed_at" type="date" required />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Label htmlFor="attachment_url">Attachment URL</Label>
        <Input id="attachment_url" name="attachment_url" placeholder="Supabase Storage public URL" />
      </div>
      <div className="mt-4 space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" />
      </div>
      <Button className="mt-5 w-full">
        <CheckCircle2 className="h-4 w-4" />
        Save medical record
      </Button>
    </form>
  );
}
