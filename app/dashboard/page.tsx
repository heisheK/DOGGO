import { Activity, ClipboardList, HeartHandshake, Syringe } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { getDashboardData } from "@/lib/data";

export default async function DashboardPage() {
  const { animals, rescueCases, medicalRecords, applications } = await getDashboardData();

  return (
    <main className="page-shell py-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Volunteer Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Daily operations for rescue, review, medical, and adoption follow-up.</p>
        </div>
        <Badge className="w-fit bg-secondary text-secondary-foreground">Internal</Badge>
      </div>
      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Animals tracked" value={String(animals.length)} icon={HeartHandshake} />
        <StatCard label="Open rescue cases" value={String(rescueCases.length)} icon={Activity} />
        <StatCard label="Medical records" value={String(medicalRecords.length)} icon={Syringe} />
        <StatCard label="Applications" value={String(applications.length)} icon={ClipboardList} />
      </section>
      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-5">
          <h2 className="font-semibold">Adoption pipeline</h2>
          <div className="mt-4 space-y-3">
            {applications.map((application) => (
              <div key={application.id} className="flex items-center justify-between rounded-md border bg-background p-3">
                <div>
                  <p className="text-sm font-medium">{application.applicant_name}</p>
                  <p className="text-xs text-muted-foreground">{application.dorm_or_address}</p>
                </div>
                <Badge>{application.status}</Badge>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-5">
          <h2 className="font-semibold">Medical queue</h2>
          <div className="mt-4 space-y-3">
            {medicalRecords.map((record) => (
              <div key={record.id} className="rounded-md border bg-background p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">{record.record_type}</p>
                  <Badge>{record.performed_at}</Badge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{record.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
