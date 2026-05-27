import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function MedicalUploadPage() {
  return (
    <main className="page-shell grid gap-8 py-8 lg:grid-cols-[.9fr_1.1fr]">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Medical Record Upload</h1>
        <p className="mt-2 text-muted-foreground">
          Keep treatment, vaccination, and sterilization history ready for volunteers and adopters.
        </p>
        <div className="mt-8 rounded-lg border bg-card p-5">
          <UploadCloud className="h-8 w-8 text-primary" />
          <h2 className="mt-4 font-semibold">Storage-ready workflow</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            The API route stores structured metadata in Supabase. Add a Supabase Storage bucket named medical-records for files.
          </p>
        </div>
      </section>
      <form className="rounded-lg border bg-card p-5 shadow-sm" action="/api/medical-records" method="post">
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
        <Button className="mt-5 w-full">Save medical record</Button>
      </form>
    </main>
  );
}
