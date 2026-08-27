import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AuthGate } from "@/components/Gate";
import { Button, Field, Header, Select, Textarea, Screen } from "@/components/kit";
import { CONSULT_REASONS, TIME_SLOTS, isWeekend, todayIso, type AppointmentType } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/appointments/book")({
  component: BookScreen,
});

function BookScreen() {
  return (
    <AuthGate title="Sign in to book">
      <BookForm />
    </AuthGate>
  );
}

function monthDays(base: Date) {
  const y = base.getFullYear();
  const m = base.getMonth();
  const first = new Date(y, m, 1).getDay();
  const count = new Date(y, m + 1, 0).getDate();
  const cells: (string | null)[] = Array.from({ length: first }, () => null);
  for (let d = 1; d <= count; d++) {
    const mm = String(m + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    cells.push(`${y}-${mm}-${dd}`);
  }
  return cells;
}

function BookForm() {
  const navigate = useNavigate();
  const { bookAppointment } = useApp();
  const [type, setType] = useState<AppointmentType>("Phone Call");
  const [cursor, setCursor] = useState(() => new Date());
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState<string>(CONSULT_REASONS[0]);
  const [notes, setNotes] = useState("");
  const days = useMemo(() => monthDays(cursor), [cursor]);
  const today = todayIso();
  const valid = date && time && reason;

  return (
    <Screen padded={false}>
      <Header title="Book a Consultation" />
      <div className="px-4 pb-10">
        <p className="mb-3 text-sm text-muted-foreground">We’ll set up an appointment time, either in-person or over-the-phone.</p>
        <div className="mb-4 grid grid-cols-2 gap-2">
          {(["In-Person", "Phone Call"] as const).map((t) => (
            <button key={t} type="button" onClick={() => setType(t)} className={cn("rounded-lg border py-3 text-sm font-semibold", type === t ? "border-primary bg-primary/20" : "border-border bg-surface")}>
              {t}
            </button>
          ))}
        </div>

        <div className="mb-2 flex items-center justify-between">
          <button type="button" className="text-sm text-primary" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>Prev</button>
          <p className="font-display font-semibold">{cursor.toLocaleString("en-US", { month: "long", year: "numeric" })}</p>
          <button type="button" className="text-sm text-primary" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>Next</button>
        </div>
        <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[10px] uppercase text-dim">
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => <span key={d}>{d}</span>)}
        </div>
        <div className="mb-4 grid grid-cols-7 gap-1">
          {days.map((iso, i) => {
            if (!iso) return <span key={`e${i}`} />;
            const weekend = isWeekend(iso);
            const past = iso < today;
            return (
              <button
                key={iso}
                type="button"
                disabled={past}
                onClick={() => setDate(iso)}
                className={cn(
                  "h-10 rounded-md text-xs",
                  past && "text-dim/40",
                  !past && weekend && "text-warning",
                  date === iso && "bg-primary text-white",
                  !past && date !== iso && !weekend && "bg-surface",
                )}
              >
                {Number(iso.slice(-2))}
              </button>
            );
          })}
        </div>
        {date && isWeekend(date) && <p className="mb-3 text-xs text-warning">Sat–Sun: By Appointment Only</p>}

        <p className="mb-2 text-xs font-medium text-muted-foreground">Time · Mon–Fri 10:00 AM–5:00 PM</p>
        <div className="mb-4 grid grid-cols-3 gap-2">
          {TIME_SLOTS.map((t) => (
            <button key={t} type="button" onClick={() => setTime(t)} className={cn("rounded-md py-2 text-xs font-semibold", time === t ? "bg-primary text-white" : "bg-surface text-muted-foreground")}>
              {t}
            </button>
          ))}
        </div>

        <Field label="Reason for consultation">
          <Select value={reason} onChange={(e) => setReason(e.target.value)}>
            {CONSULT_REASONS.map((r) => <option key={r}>{r}</option>)}
          </Select>
        </Field>
        <Field label="Notes (optional)">
          <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </Field>
        <Button
          full
          disabled={!valid}
          onClick={() => {
            const appt = bookAppointment({ type, date, time, reason, notes });
            navigate({ to: "/appointments/confirm", search: { id: appt.id } });
          }}
        >
          Confirm Appointment
        </Button>
      </div>
    </Screen>
  );
}
