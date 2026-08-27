import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { AuthGate } from "@/components/Gate";
import { DocumentRow } from "@/components/DocumentRow";
import { Empty, Header, Input, LinkButton, Select, Screen } from "@/components/kit";
import { getProduct } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

type Search = { policy?: string };

export const Route = createFileRoute("/documents/")({
  validateSearch: (s: Record<string, unknown>): Search => ({ policy: typeof s.policy === "string" ? s.policy : undefined }),
  component: DocumentsScreen,
});

function DocumentsScreen() {
  return (
    <AuthGate>
      <DocList />
    </AuthGate>
  );
}

function DocList() {
  const search = Route.useSearch();
  const { documents, policies, pushToast } = useApp();
  const [q, setQ] = useState("");
  const [policyId, setPolicyId] = useState(search.policy ?? "");
  const [type, setType] = useState("");

  const filtered = useMemo(
    () =>
      documents.filter((d) => {
        if (q && !d.name.toLowerCase().includes(q.toLowerCase())) return false;
        if (policyId && d.policyId !== policyId) return false;
        if (type && d.type !== type) return false;
        return true;
      }),
    [documents, q, policyId, type],
  );

  const groups = policies
    .map((p) => ({ p, docs: filtered.filter((d) => d.policyId === p.id) }))
    .filter((g) => g.docs.length);

  const ungrouped = filtered.filter((d) => !d.policyId);

  return (
    <Screen padded={false}>
      <Header title="Documents" right={<LinkButton to="/documents/upload" className="h-9 px-3 py-2 text-xs">Upload</LinkButton>} />
      <div className="space-y-3 px-4 pb-8">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
          <Input className="pl-9" placeholder="Search documents" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Select value={policyId} onChange={(e) => setPolicyId(e.target.value)}>
            <option value="">All policies</option>
            {policies.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </Select>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All types</option>
            {["Declarations Page", "ID Cards", "Policy Contract", "Endorsements", "Claims Correspondence", "Supporting"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </div>
        {filtered.length === 0 ? (
          <Empty title="No documents" body="Upload a declarations page, ID card, or supporting photo." action={<LinkButton to="/documents/upload">Upload Documents</LinkButton>} />
        ) : (
          <>
            {groups.map(({ p, docs }) => (
              <section key={p.id}>
                <h2 className="mb-1 font-display text-sm font-semibold">{getProduct(p.product)?.name}</h2>
                <div className="rounded-lg bg-surface px-3">
                  {docs.map((d) => (
                    <DocumentRow key={d.id} doc={d} onDownload={() => pushToast("Download started")} onShare={() => pushToast("Share sheet opened")} />
                  ))}
                </div>
              </section>
            ))}
            {ungrouped.length > 0 && (
              <section>
                <h2 className="mb-1 font-display text-sm font-semibold">Other</h2>
                <div className="rounded-lg bg-surface px-3">
                  {ungrouped.map((d) => (
                    <DocumentRow key={d.id} doc={d} onDownload={() => pushToast("Download started")} onShare={() => pushToast("Share sheet opened")} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
        <Link
          to="/documents/upload"
          className="fixed bottom-6 right-[max(1rem,calc(50%-215px+1rem))] flex h-14 w-14 items-center justify-center rounded-lg bg-accent text-white shadow-[0_8px_24px_rgba(237,28,34,0.4)]"
          aria-label="Upload documents and photos"
        >
          <Plus size={24} />
        </Link>
      </div>
    </Screen>
  );
}
