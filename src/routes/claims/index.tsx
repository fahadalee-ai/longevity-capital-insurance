import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthGate } from "@/components/Gate";
import { StatusChip } from "@/components/StatusChip";
import { Empty, Header, LinkButton, Screen } from "@/components/kit";
import { formatDateShort, getProduct } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/claims/")({
  component: ClaimsScreen,
});

function ClaimsScreen() {
  return (
    <AuthGate>
      <ClaimList />
    </AuthGate>
  );
}

function ClaimList() {
  const { claims } = useApp();
  return (
    <Screen padded={false}>
      <Header title="My Claims" right={<LinkButton to="/claims/new" variant="cta" className="h-9 px-3 py-2 text-xs">File a Claim</LinkButton>} />
      <div className="space-y-3 px-4 pb-8">
        {claims.length === 0 ? (
          <Empty title="No claims" body="If something happens, we’ll act as your advocate from first notice through resolution." action={<LinkButton to="/claims/new" variant="cta">File a Claim</LinkButton>} />
        ) : (
          claims.map((c) => (
            <Link key={c.id} to="/claims/$id" params={{ id: c.id }} className="block rounded-lg bg-surface p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display font-semibold">{c.reference}</p>
                  <p className="text-xs text-dim">
                    {getProduct(c.product)?.name} · {formatDateShort(c.submittedAt)}
                  </p>
                </div>
                <StatusChip status={c.status} />
              </div>
            </Link>
          ))
        )}
      </div>
    </Screen>
  );
}
