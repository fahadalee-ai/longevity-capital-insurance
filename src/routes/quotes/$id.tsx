import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CategoryIcon } from "@/components/CategoryIcon";
import { QuoteStepper } from "@/components/QuoteStepper";
import { StatusChip } from "@/components/StatusChip";
import { Button, Card, Header, LinkButton, Screen } from "@/components/kit";
import { formatMoney, getProduct } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/quotes/$id")({
  component: QuoteDetail,
});

const STEPS = ["Submitted", "Under Review", "Quote Prepared", "Sent to You"];

function QuoteDetail() {
  const { id } = Route.useParams();
  const { quotes, updateQuote, pushToast } = useApp();
  const navigate = useNavigate();
  const quote = quotes.find((q) => q.id === id);
  const product = quote ? getProduct(quote.product) : undefined;

  if (!quote) {
    return (
      <Screen padded={false}>
        <Header title="Quote" />
        <p className="px-4 text-sm text-muted-foreground">Quote not found.</p>
      </Screen>
    );
  }

  return (
    <Screen padded={false}>
      <Header title={product?.name ?? "Quote"} />
      <div className="space-y-4 px-4 pb-10">
        <div className="flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary">
            <CategoryIcon name={quote.product} size={20} />
          </span>
          <StatusChip status={quote.status} />
        </div>
        <QuoteStepper steps={STEPS} current={quote.step} />
        {quote.notes && (
          <Card>
            <p className="text-xs uppercase tracking-wide text-dim">Agent notes</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{quote.notes}</p>
          </Card>
        )}
        {quote.status === "Quote Ready" && quote.premium != null && (
          <Card>
            <p className="text-xs text-dim">Estimated annual premium</p>
            <p className="mt-1 font-display text-3xl font-bold">{formatMoney(quote.premium)}</p>
            <div className="mt-4 space-y-2">
              <Button
                variant="cta"
                full
                onClick={() => {
                  updateQuote(quote.id, { status: "In Progress" });
                  pushToast("We’ll bind this coverage with your agent.");
                  navigate({ to: "/appointments/book" });
                }}
              >
                Accept & Proceed
              </Button>
              <LinkButton to="/messages" variant="outline" full>
                Request Changes
              </LinkButton>
              <Button
                variant="danger"
                full
                onClick={() => {
                  updateQuote(quote.id, { status: "Expired" });
                  pushToast("Quote declined");
                }}
              >
                Decline
              </Button>
            </div>
          </Card>
        )}
      </div>
    </Screen>
  );
}
