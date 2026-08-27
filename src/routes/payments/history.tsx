import { createFileRoute } from "@tanstack/react-router";
import { StatusChip } from "@/components/StatusChip";
import { Header, Screen } from "@/components/kit";
import { formatDate, formatMoney, getProduct } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/payments/history")({
  component: HistoryScreen,
});

function HistoryScreen() {
  const { payments, pushToast } = useApp();
  return (
    <Screen padded={false}>
      <Header title="Payment History" />
      <div className="space-y-2 px-4 pb-10">
        {payments.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => pushToast("Receipt downloaded")}
            className="flex w-full items-center justify-between rounded-lg bg-surface px-4 py-3 text-left"
          >
            <div>
              <p className="text-sm font-medium">{getProduct(p.product)?.name}</p>
              <p className="text-xs text-dim">{formatDate(p.date)} · Receipt</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{formatMoney(p.amount)}</p>
              <StatusChip status={p.status} />
            </div>
          </button>
        ))}
      </div>
    </Screen>
  );
}
