import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, Download, MessageCircle, Shield } from "lucide-react";
import { StatusChip } from "@/components/StatusChip";
import { Card, Header, Screen } from "@/components/kit";
import { daysUntil, formatDate, formatMoney, getProduct } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/policies/$id")({
  component: PolicyDetail,
});

function PolicyDetail() {
  const { id } = Route.useParams();
  const { policies, documents, toggleReminder } = useApp();
  const policy = policies.find((p) => p.id === id);
  const product = policy ? getProduct(policy.product) : undefined;
  const docs = documents.filter((d) => d.policyId === id);
  const days = policy ? daysUntil(policy.renewalDate) : 99;

  if (!policy) {
    return (
      <Screen padded={false}>
        <Header title="Policy" />
        <p className="px-4 text-sm text-muted-foreground">Policy not found.</p>
      </Screen>
    );
  }

  return (
    <Screen padded={false}>
      <div className="relative h-40 overflow-hidden">
        <img src={product?.hero} alt="" className="h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-x-0 top-0">
          <Header title="" />
        </div>
        <div className="absolute inset-x-0 bottom-3 flex items-end justify-between px-4">
          <h1 className="font-display text-2xl font-bold">{policy.name}</h1>
          <StatusChip status={policy.status} />
        </div>
      </div>

      <div className="space-y-5 px-4 pb-10 pt-5">
        {days >= 0 && days <= 30 && policy.status === "Active" && (
          <Link to="/renewal/$id" params={{ id: policy.id }} className="block rounded-lg border border-accent/60 bg-surface p-3 text-sm">
            Renewal in {days} days — review premium and coverage.
          </Link>
        )}

        <section>
          <h2 className="mb-2 font-display text-lg font-semibold">Policy Summary</h2>
          <Card className="space-y-2 text-sm">
            <Row label="Policy #" value={policy.number} />
            <Row label="Carrier" value={policy.carrier} />
            <Row label="Effective" value={formatDate(policy.effectiveDate)} />
            <Row label="Renewal" value={formatDate(policy.renewalDate)} />
            <Row label="Premium" value={`${formatMoney(policy.premium)} · ${policy.frequency}`} />
          </Card>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-semibold">Coverage Details</h2>
          <Card className="overflow-hidden p-0">
            <div className="grid grid-cols-3 gap-2 border-b border-border px-4 py-2 text-[11px] uppercase tracking-wide text-dim">
              <span>Type</span>
              <span>Limit</span>
              <span>Deductible</span>
            </div>
            {policy.coverage.map((c) => (
              <div key={c.type} className="grid grid-cols-3 gap-2 border-b border-border px-4 py-2.5 text-xs last:border-0">
                <span>{c.type}</span>
                <span className="text-muted-foreground">{c.limit}</span>
                <span className="text-muted-foreground">{c.deductible}</span>
              </div>
            ))}
          </Card>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-semibold">
            {policy.beneficiaries?.length ? "Named Insureds / Beneficiaries" : "Named Insureds"}
          </h2>
          <Card>
            {policy.insureds.map((n) => (
              <p key={n} className="text-sm">
                {n}
              </p>
            ))}
            {policy.beneficiaries?.map((b) => (
              <p key={b.name} className="mt-1 text-sm text-muted-foreground">
                Beneficiary: {b.name} ({b.relationship})
              </p>
            ))}
          </Card>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-semibold">Documents</h2>
          <Link to="/documents" search={{ policy: policy.id }} className="text-sm text-primary">
            {docs.length} attached document{docs.length === 1 ? "" : "s"} — view all
          </Link>
        </section>

        <div className="grid grid-cols-2 gap-2">
          {policy.hasCard && (
            <Link to="/cards/$id" params={{ id: policy.id }} className="flex items-center gap-2 rounded-lg bg-surface p-3 text-sm">
              <CreditCard size={16} className="text-primary" /> View Insurance Card
            </Link>
          )}
          <Link to="/documents" className="flex items-center gap-2 rounded-lg bg-surface p-3 text-sm">
            <Download size={16} className="text-primary" /> Download Policy PDF
          </Link>
          <Link to="/claims/new" search={{ policy: policy.id }} className="flex items-center gap-2 rounded-lg bg-surface p-3 text-sm">
            <Shield size={16} className="text-accent" /> File a Claim
          </Link>
          <Link to="/messages" className="flex items-center gap-2 rounded-lg bg-surface p-3 text-sm">
            <MessageCircle size={16} className="text-primary" /> Message Agent
          </Link>
        </div>

        <label className="flex items-center justify-between rounded-lg bg-surface p-4">
          <span className="text-sm font-medium">Set Renewal Reminder</span>
          <input type="checkbox" checked={policy.reminder} onChange={() => toggleReminder(policy.id)} className="accent-primary" />
        </label>
      </div>
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-dim">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}
