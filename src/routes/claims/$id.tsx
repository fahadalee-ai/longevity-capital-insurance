import { createFileRoute } from "@tanstack/react-router";
import { QuoteStepper } from "@/components/QuoteStepper";
import { StatusChip } from "@/components/StatusChip";
import { Card, Header, Screen } from "@/components/kit";
import { formatDate, getProduct } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/claims/$id")({
  component: ClaimDetail,
});

const STEPS = ["Submitted", "Under Review", "Advocate Assigned", "Resolved"];
const STEP_MAP: Record<string, number> = {
  Submitted: 0,
  "Under Review": 1,
  "Advocate Assigned": 2,
  Resolved: 3,
};

function ClaimDetail() {
  const { id } = Route.useParams();
  const { claims } = useApp();
  const claim = claims.find((c) => c.id === id);
  if (!claim) {
    return (
      <Screen padded={false}>
        <Header title="Claim" />
        <p className="px-4 text-sm text-muted-foreground">Claim not found.</p>
      </Screen>
    );
  }

  return (
    <Screen padded={false}>
      <Header title={claim.reference} />
      <div className="space-y-4 px-4 pb-10">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{getProduct(claim.product)?.name}</p>
          <StatusChip status={claim.status} />
        </div>
        <QuoteStepper steps={STEPS} current={STEP_MAP[claim.status] ?? 0} />
        <Card className="space-y-1 text-sm">
          <p>Incident {formatDate(claim.incidentDate)}</p>
          <p className="text-muted-foreground">{claim.location}</p>
          <p className="text-muted-foreground">{claim.description}</p>
        </Card>
        <p className="text-sm text-muted-foreground">Our team will guide you through every step.</p>
        <section>
          <h2 className="mb-2 font-display text-lg font-semibold">Agent notes</h2>
          {claim.notes.length === 0 ? (
            <p className="text-sm text-dim">No notes yet.</p>
          ) : (
            claim.notes.map((n, i) => (
              <Card key={i} className="mb-2">
                <p className="text-xs text-dim">{n.from === "agent" ? "Agent" : "You"} · {n.time}</p>
                <p className="mt-1 text-sm">{n.text}</p>
              </Card>
            ))
          )}
        </section>
      </div>
    </Screen>
  );
}
