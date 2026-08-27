import { createFileRoute } from "@tanstack/react-router";
import { Button, Card, Header, LinkButton, Screen } from "@/components/kit";
import { formatDate, formatMoney, getProduct } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/renewal/$id")({
  component: RenewalScreen,
});

function RenewalScreen() {
  const { id } = Route.useParams();
  const { policies, pushToast } = useApp();
  const policy = policies.find((p) => p.id === id);
  const product = policy ? getProduct(policy.product) : undefined;
  if (!policy) {
    return (
      <Screen padded={false}>
        <Header title="Renewal" />
        <p className="px-4 text-sm text-muted-foreground">Policy not found.</p>
      </Screen>
    );
  }
  const next = policy.renewalPremium ?? policy.premium;

  return (
    <Screen padded={false}>
      <Header title="Policy Renewal" />
      <div className="space-y-4 px-4 pb-10">
        <p className="font-display text-xl font-semibold">{product?.name}</p>
        <p className="text-sm text-muted-foreground">Renews {formatDate(policy.renewalDate)}</p>
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <p className="text-xs text-dim">Current premium</p>
            <p className="mt-1 font-display text-xl font-bold">{formatMoney(policy.premium)}</p>
            <p className="text-xs text-dim">{policy.frequency}</p>
          </Card>
          <Card>
            <p className="text-xs text-dim">Renewal premium</p>
            <p className="mt-1 font-display text-xl font-bold">{formatMoney(next)}</p>
            <p className="text-xs text-dim">{next === policy.premium ? "No change" : "Updated rate"}</p>
          </Card>
        </div>
        <Button variant="cta" full onClick={() => pushToast("Renewal confirmed — your agent will bind it.")}>
          Confirm Renewal
        </Button>
        <LinkButton to="/messages" variant="outline" full>
          Request Review Before Renewing
        </LinkButton>
        <LinkButton to="/quote" search={{ product: policy.product }} variant="outline" full>
          Update Coverage
        </LinkButton>
      </div>
    </Screen>
  );
}
