import { Link } from "@tanstack/react-router";
import { CategoryIcon } from "@/components/CategoryIcon";
import { StatusChip } from "@/components/StatusChip";
import { formatDateShort, formatMoney, type Policy } from "@/lib/mock-data";

export function PolicyCard({ policy }: { policy: Policy }) {
  return (
    <Link
      to="/policies/$id"
      params={{ id: policy.id }}
      className="block rounded-lg bg-surface p-4 shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-transform duration-200 active:scale-[0.99]"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white">
          <CategoryIcon name={policy.product} size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="font-display text-[15px] font-semibold text-white">{policy.name}</p>
            <StatusChip status={policy.status} />
          </div>
          <p className="mt-0.5 text-xs text-dim">{policy.number}</p>
          <div className="mt-3 flex items-end justify-between">
            <p className="text-sm font-semibold text-white">
              {formatMoney(policy.premium)}
              <span className="ml-1 text-xs font-normal text-dim">/{policy.frequency.toLowerCase()}</span>
            </p>
            <p className="text-xs text-muted-foreground">Renews {formatDateShort(policy.renewalDate)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
