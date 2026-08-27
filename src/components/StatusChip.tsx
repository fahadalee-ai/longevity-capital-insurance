import { cn } from "@/lib/utils";

const TONES: Record<string, string> = {
  pending: "bg-warning/15 text-warning",
  active: "bg-success/15 text-success",
  expiring: "bg-accent/15 text-accent",
  review: "bg-primary/25 text-[#9aa4ff]",
  expired: "bg-white/5 text-dim",
  ready: "bg-success/15 text-success",
  paid: "bg-success/15 text-success",
  failed: "bg-accent/15 text-accent",
  refunded: "bg-white/5 text-dim",
};

export function statusTone(status: string): keyof typeof TONES {
  const s = status.toLowerCase();
  if (["active", "confirmed", "paid", "resolved", "converted"].includes(s)) return "active";
  if (["quote ready", "ready"].includes(s)) return "ready";
  if (["pending", "pending review", "submitted", "upcoming"].includes(s)) return "pending";
  if (["in review", "in progress", "under review", "advocate assigned"].includes(s)) return "review";
  if (["expiring", "expired"].includes(s) && s === "expired") return "expired";
  if (["expiring"].includes(s)) return "expiring";
  if (["failed", "cancelled", "declined"].includes(s)) return "failed";
  if (s === "refunded") return "refunded";
  if (s === "expired") return "expired";
  return "review";
}

export function StatusChip({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide",
        TONES[statusTone(status)],
        className,
      )}
    >
      {status}
    </span>
  );
}
