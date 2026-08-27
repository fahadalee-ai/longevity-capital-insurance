import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AuthGate } from "@/components/Gate";
import { StatusChip } from "@/components/StatusChip";
import { Button, Empty, Header, LinkButton, Screen } from "@/components/kit";
import { formatDate, formatTime } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/appointments/")({
  component: AppointmentsScreen,
});

function AppointmentsScreen() {
  return (
    <AuthGate>
      <ApptList />
    </AuthGate>
  );
}

function ApptList() {
  const { appointments, updateAppointment, pushToast } = useApp();
  const [tab, setTab] = useState<"Upcoming" | "Past">("Upcoming");
  const list = appointments.filter((a) => (tab === "Upcoming" ? a.status === "Upcoming" : a.status !== "Upcoming"));

  return (
    <Screen padded={false}>
      <Header title="My Appointments" right={<LinkButton to="/appointments/book" className="h-9 px-3 py-2 text-xs">Book</LinkButton>} />
      <div className="px-4">
        <div className="flex rounded-lg bg-surface p-1">
          {(["Upcoming", "Past"] as const).map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)} className={cn("flex-1 rounded-md py-2 text-xs font-semibold", tab === t ? "bg-primary text-white" : "text-dim")}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 space-y-3 px-4 pb-8">
        {list.length === 0 ? (
          <Empty title={`No ${tab.toLowerCase()} appointments`} body="Book a consultation in-person or over the phone." action={<LinkButton to="/appointments/book">Book a Consultation</LinkButton>} />
        ) : (
          list.map((a) => (
            <div key={a.id} className="rounded-lg bg-surface p-4">
              <div className="flex justify-between gap-2">
                <p className="font-display font-semibold">{a.type}</p>
                <StatusChip status={a.status} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {formatDate(a.date)} · {formatTime(a.time)}
              </p>
              <p className="text-sm">{a.reason}</p>
              {a.status === "Upcoming" && (
                <div className="mt-3 flex gap-2">
                  <LinkButton to="/appointments/book" variant="outline" className="h-9 flex-1 py-2 text-xs">Reschedule</LinkButton>
                  <Button variant="danger" className="h-9 flex-1 py-2 text-xs" onClick={() => { updateAppointment(a.id, { status: "Cancelled" }); pushToast("Appointment cancelled"); }}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </Screen>
  );
}
