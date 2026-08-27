import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AuthGate } from "@/components/Gate";
import { PolicyCard } from "@/components/PolicyCard";
import { Empty, LinkButton, Screen } from "@/components/kit";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { PolicyStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/policies/")({
  component: PoliciesScreen,
});

const TABS: PolicyStatus[] = ["Active", "Pending", "Expired"];

function PoliciesScreen() {
  return (
    <AuthGate title="Sign in to view policies" body="Your active, pending, and expired policies live here.">
      <PolicyList />
    </AuthGate>
  );
}

function PolicyList() {
  const { policies } = useApp();
  const [tab, setTab] = useState<PolicyStatus>("Active");
  const list = policies.filter((p) => p.status === tab);

  return (
    <Screen padded={false} className="pt-[max(1rem,env(safe-area-inset-top))]">
      <div className="px-4">
        <h1 className="font-display text-[22px] font-semibold">My Policies</h1>
        <div className="mt-4 flex rounded-lg bg-surface p-1">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 rounded-md py-2 text-xs font-semibold transition-colors duration-200",
                tab === t ? "bg-primary text-white" : "text-dim",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 space-y-3 px-4 pb-8">
        {list.length === 0 ? (
          <Empty
            title={`No ${tab.toLowerCase()} policies`}
            body="When coverage is bound, it will appear here."
            action={<LinkButton to="/quote">Get a Quote</LinkButton>}
          />
        ) : (
          list.map((p) => <PolicyCard key={p.id} policy={p} />)
        )}
      </div>
    </Screen>
  );
}
