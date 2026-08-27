import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthGate } from "@/components/Gate";
import { StatusChip } from "@/components/StatusChip";
import { Card, Header, LinkButton, Screen } from "@/components/kit";
import { formatDate, formatMoney, getProduct } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/payments/")({
  component: PaymentsScreen,
});

function PaymentsScreen() {
  return (
    <AuthGate>
      <PaymentsInner />
    </AuthGate>
  );
}

function PaymentsInner() {
  const { paymentMethods, payments, setDefaultMethod, removePaymentMethod, toggleAutopay, policies } = useApp();

  return (
    <Screen padded={false}>
      <Header title="Payments" />
      <div className="space-y-5 px-4 pb-10">
        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Payment methods</h2>
            <Link to="/payments/methods" className="text-xs font-semibold text-primary">Add</Link>
          </div>
          <div className="space-y-2">
            {paymentMethods.map((m) => (
              <Card key={m.id} className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{m.brand} ···· {m.last4}</p>
                  <p className="text-xs text-dim">{m.kind === "card" ? `Exp ${m.exp}` : "Bank account"}{m.default ? " · Default" : ""}</p>
                </div>
                <div className="flex gap-2">
                  {!m.default && (
                    <button type="button" className="text-xs text-primary" onClick={() => setDefaultMethod(m.id)}>Default</button>
                  )}
                  <button type="button" className="text-xs text-accent" onClick={() => removePaymentMethod(m.id)}>Remove</button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-2 font-display text-lg font-semibold">Autopay</h2>
          {policies.filter((p) => p.status === "Active").map((p) => (
            <label key={p.id} className="mb-2 flex items-center justify-between rounded-lg bg-surface p-4">
              <span className="text-sm">{p.name}</span>
              <input type="checkbox" checked={p.autopay} onChange={() => toggleAutopay(p.id)} className="accent-primary" />
            </label>
          ))}
        </section>

        <LinkButton to="/payments/pay" variant="cta" full>Make a Payment</LinkButton>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Recent history</h2>
            <Link to="/payments/history" className="text-xs font-semibold text-primary">See all</Link>
          </div>
          {payments.slice(0, 3).map((p) => (
            <div key={p.id} className="mb-2 flex items-center justify-between rounded-lg bg-surface px-4 py-3">
              <div>
                <p className="text-sm font-medium">{getProduct(p.product)?.name}</p>
                <p className="text-xs text-dim">{formatDate(p.date)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{formatMoney(p.amount)}</p>
                <StatusChip status={p.status} />
              </div>
            </div>
          ))}
        </section>
      </div>
    </Screen>
  );
}
