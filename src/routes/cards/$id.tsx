import { createFileRoute } from "@tanstack/react-router";
import { Download, Printer, Share2, Wallet } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Header, Screen } from "@/components/kit";
import { AGENCY, formatDate, getProduct } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/cards/$id")({
  component: CardScreen,
});

function CardScreen() {
  const { id } = Route.useParams();
  const { policies, user, pushToast } = useApp();
  const withCards = policies.filter((p) => p.hasCard && p.status === "Active");
  const start = Math.max(0, withCards.findIndex((p) => p.id === id));
  const list = withCards.length ? withCards : policies.filter((p) => p.id === id);

  return (
    <Screen padded={false}>
      <Header title="Insurance Card" />
      <div className="flex gap-3 overflow-x-auto px-4 pb-6">
        {(list.length ? list : []).map((policy, i) => {
          const product = getProduct(policy.product);
          return (
            <article
              key={policy.id}
              className="w-[min(100%,360px)] shrink-0 rounded-lg bg-primary p-5 text-white shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
              style={{ scrollSnapAlign: "start", marginLeft: i === 0 && start > 0 ? undefined : undefined }}
            >
              <Logo size={36} className="mx-auto mb-3" />
              <p className="font-display text-xl font-bold">{product?.name} ID Card</p>
              <p className="mt-4 text-sm text-white/80">Policy holder</p>
              <p className="font-semibold">{user ? `${user.firstName} ${user.lastName}` : policy.insureds[0]}</p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-white/70">Policy #</p>
                  <p>{policy.number}</p>
                </div>
                <div>
                  <p className="text-white/70">Carrier</p>
                  <p>{policy.carrier}</p>
                </div>
                <div>
                  <p className="text-white/70">Effective</p>
                  <p>{formatDate(policy.effectiveDate)}</p>
                </div>
                <div>
                  <p className="text-white/70">Renewal</p>
                  <p>{formatDate(policy.renewalDate)}</p>
                </div>
              </div>
              <p className="mt-4 text-xs text-white/70">
                Agency · {AGENCY.phone} · {AGENCY.email}
              </p>
            </article>
          );
        })}
      </div>
      <div className="grid grid-cols-4 gap-2 px-4">
        {[
          { icon: Wallet, label: "Wallet" },
          { icon: Share2, label: "Share" },
          { icon: Printer, label: "Print" },
          { icon: Download, label: "Download" },
        ].map((a) => (
          <button
            key={a.label}
            type="button"
            onClick={() => pushToast(`${a.label} is a demo action`)}
            className="flex flex-col items-center gap-2 rounded-lg bg-surface py-3 text-xs text-muted-foreground"
          >
            <a.icon size={18} strokeWidth={2} className="text-white" />
            {a.label}
          </button>
        ))}
      </div>
      <p className="px-4 pt-4 text-center text-xs text-dim">Add to Apple Wallet / Google Wallet</p>
    </Screen>
  );
}
