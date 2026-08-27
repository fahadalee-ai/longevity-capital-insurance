import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button, LinkButton, Screen } from "@/components/kit";
import { formatDate, formatTime } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

type Search = { id?: string };

export const Route = createFileRoute("/appointments/confirm")({
  validateSearch: (s: Record<string, unknown>): Search => ({ id: typeof s.id === "string" ? s.id : undefined }),
  component: ConfirmAppt,
});

function ConfirmAppt() {
  const { id } = Route.useSearch();
  const { appointments, pushToast } = useApp();
  const appt = appointments.find((a) => a.id === id) ?? appointments[0];

  return (
    <Screen className="flex flex-col items-center justify-center px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/15 text-success animate-[check-pop_400ms_ease]">
        <Check size={36} />
      </div>
      <h1 className="mt-5 font-display text-2xl font-bold">You’re booked</h1>
      {appt && (
        <p className="mt-2 text-sm text-muted-foreground">
          {appt.type} · {formatDate(appt.date)} at {formatTime(appt.time)}
        </p>
      )}
      <Button className="mt-6" full onClick={() => pushToast("Calendar event created (demo)")}>
        Add to Calendar
      </Button>
      <LinkButton to="/appointments" variant="outline" className="mt-2" full>
        View Appointments
      </LinkButton>
    </Screen>
  );
}
