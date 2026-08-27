import { createFileRoute, Link } from "@tanstack/react-router";
import { CategoryIcon } from "@/components/CategoryIcon";
import { AuthGate } from "@/components/Gate";
import { StatusChip } from "@/components/StatusChip";
import { Empty, Header, LinkButton, Screen } from "@/components/kit";
import { formatDateShort, getProduct } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/quotes/")({
  component: QuotesScreen,
});

function QuotesScreen() {
  return (
    <AuthGate>
      <QuoteList />
    </AuthGate>
  );
}

function QuoteList() {
  const { quotes } = useApp();
  return (
    <Screen padded={false}>
      <Header title="Quote Status" />
      <div className="space-y-3 px-4 pb-8">
        {quotes.length === 0 ? (
          <Empty
            title="No quotes yet"
            body="Request a quote and we’ll shop multiple carriers for you."
            action={<LinkButton to="/quote">Get a Quote</LinkButton>}
          />
        ) : (
          quotes.map((q) => {
            const product = getProduct(q.product);
            return (
              <Link key={q.id} to="/quotes/$id" params={{ id: q.id }} className="block rounded-lg bg-surface p-4 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
                    <CategoryIcon name={q.product} size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-display font-semibold">{product?.name}</p>
                      <StatusChip status={q.status} />
                    </div>
                    <p className="text-xs text-dim">Submitted {formatDateShort(q.submittedAt)}</p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </Screen>
  );
}
