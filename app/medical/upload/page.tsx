import { UploadCloud } from "lucide-react";
import { MedicalUploadForm } from "@/components/medical/medical-upload-form";

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
      <MedicalUploadForm />
    </main>
  );
}
