import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Field, Header, Input, Select, Screen } from "@/components/kit";
import type { DocType } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/documents/upload")({
  component: UploadScreen,
});

function UploadScreen() {
  const { policies, claims, addDocument } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState<DocType>("Supporting");
  const [policyId, setPolicyId] = useState("");
  const [claimId, setClaimId] = useState("");
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);

  return (
    <Screen padded={false}>
      <Header title="Upload Documents" />
      <div className="px-4 pb-10">
        <label className="mb-4 block cursor-pointer rounded-lg border border-dashed border-border bg-surface p-8 text-center">
          <p className="font-display font-semibold">Camera or gallery</p>
          <p className="mt-1 text-xs text-dim">Photos and PDFs</p>
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                setName(f.name);
                setProgress(0);
                const t = window.setInterval(() => {
                  setProgress((p) => {
                    if (p >= 100) {
                      window.clearInterval(t);
                      return 100;
                    }
                    return p + 20;
                  });
                }, 120);
              }
            }}
          />
        </label>
        {progress > 0 && (
          <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-surface-elevated">
            <div className="h-full bg-primary transition-all duration-200" style={{ width: `${progress}%` }} />
          </div>
        )}
        <Field label="File name">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Declarations.pdf" />
        </Field>
        <Field label="Document type">
          <Select value={type} onChange={(e) => setType(e.target.value as DocType)}>
            {["Declarations Page", "ID Cards", "Policy Contract", "Endorsements", "Claims Correspondence", "Supporting"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </Field>
        <Field label="Tag to a policy">
          <Select value={policyId} onChange={(e) => setPolicyId(e.target.value)}>
            <option value="">None</option>
            {policies.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </Select>
        </Field>
        <Field label="Or tag to a claim">
          <Select value={claimId} onChange={(e) => setClaimId(e.target.value)}>
            <option value="">None</option>
            {claims.map((c) => <option key={c.id} value={c.id}>{c.reference}</option>)}
          </Select>
        </Field>
        <Field label="Caption">
          <Input value={caption} onChange={(e) => setCaption(e.target.value)} />
        </Field>
        <Button
          full
          disabled={!name}
          onClick={() => {
            addDocument({ name, type, policyId: policyId || undefined, claimId: claimId || undefined, size: "120 KB", caption });
            navigate({ to: "/documents" });
          }}
        >
          Upload
        </Button>
      </div>
    </Screen>
  );
}
