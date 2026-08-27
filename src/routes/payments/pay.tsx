import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Card, Field, Header, Select, Screen } from "@/components/kit";
import { formatMoney } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/payments/pay")({
  component: PayScreen,
});

function PayScreen() {
  const { policies, paymentMethods, makePayment } = useApp();
  const navigate = useNavigate();
  const due = policies.filter((p) => p.status === "Active");
  const [policyId, setPolicyId] = useState(due[0]?.id ?? "");
  const [methodId, setMethodId] = useState(paymentMethods.find((m) => m.default)?.id ?? paymentMethods[0]?.id ?? "");
  const policy = due.find((p) => p.id === policyId);
  const [done, setDone] = useState(false);

  if (done && policy) {
    return (
      <Screen className="flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-2xl font-bold">Payment received</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {formatMoney(policy.premium)} applied to {policy.name}.
        </p>
        <Button className="mt-6" full onClick={() => navigate({ to: "/payments/history" })}>
          View receipt
        </Button>
      </Screen>
    );
  }

  return (
    <Screen padded={false}>
      <Header title="Make a Payment" />
      <div className="px-4 pb-10">
        <Field label="Policy">
          <Select value={policyId} onChange={(e) => setPolicyId(e.target.value)}>
            {due.map((p) => (
              <option key={p.id} value={p.id}>{p.name} · {formatMoney(p.premium)}</option>
            ))}
          </Select>
        </Field>
        <Card className="mb-4">
          <p className="text-xs text-dim">Amount due</p>
          <p className="font-display text-3xl font-bold">{policy ? formatMoney(policy.premium) : "—"}</p>
        </Card>
        <Field label="Payment method">
          <Select value={methodId} onChange={(e) => setMethodId(e.target.value)}>
            {paymentMethods.map((m) => (
              <option key={m.id} value={m.id}>{m.brand} ···· {m.last4}</option>
            ))}
          </Select>
        </Field>
        <Button
          variant="cta"
          full
          disabled={!policy}
          onClick={() => {
            if (!policy) return;
            makePayment(policy.id, policy.premium, policy.product);
            setDone(true);
          }}
        >
          Confirm Payment
        </Button>
      </div>
    </Screen>
  );
}
