import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthGate } from "@/components/Gate";
import { ProgressLabel } from "@/components/QuoteStepper";
import { Button, Card, Field, Header, Input, Select, Textarea, Screen } from "@/components/kit";
import { INCIDENT_TYPES, getProduct, type ProductSlug } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

type Search = { policy?: string };

export const Route = createFileRoute("/claims/new")({
  validateSearch: (s: Record<string, unknown>): Search => ({ policy: typeof s.policy === "string" ? s.policy : undefined }),
  component: NewClaim,
});

function NewClaim() {
  return (
    <AuthGate title="Sign in to file a claim">
      <ClaimWizard />
    </AuthGate>
  );
}

function ClaimWizard() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { policies, submitClaim } = useApp();
  const [step, setStep] = useState(1);
  const [policyId, setPolicyId] = useState(search.policy ?? policies[0]?.id ?? "");
  const [incidentDate, setIncidentDate] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState<string>(INCIDENT_TYPES[0]);
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [contactPref, setContactPref] = useState<"call" | "email" | "text">("call");
  const [bestTime, setBestTime] = useState("Afternoons");
  const policy = policies.find((p) => p.id === policyId);

  return (
    <Screen padded={false}>
      <Header title="File a Claim" />
      <div className="px-4 pb-10">
        <ProgressLabel step={step} total={5} />
        <div className="mb-5 mt-2 h-1 overflow-hidden rounded-full bg-surface-elevated">
          <div className="h-full bg-accent transition-all duration-300" style={{ width: `${(step / 5) * 100}%` }} />
        </div>

        {step === 1 && (
          <>
            <h2 className="mb-3 font-display text-lg font-semibold">Select a policy</h2>
            <div className="space-y-2">
              {policies.filter((p) => p.status !== "Expired").map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPolicyId(p.id)}
                  className={`w-full rounded-lg border p-3 text-left ${policyId === p.id ? "border-primary bg-primary/20" : "border-border bg-surface"}`}
                >
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-xs text-dim">{p.number}</p>
                </button>
              ))}
            </div>
            <Button className="mt-5" full disabled={!policyId} onClick={() => setStep(2)}>
              Continue
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Field label="Incident date">
              <Input type="date" value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} />
            </Field>
            <Field label="Location">
              <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, intersection, or address" />
            </Field>
            <Field label="Incident type">
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                {INCIDENT_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </Select>
            </Field>
            <Field label="Description">
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What happened?" />
            </Field>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
              <Button className="flex-1" disabled={!incidentDate || !description} onClick={() => setStep(3)}>Continue</Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <label className="mb-4 block cursor-pointer rounded-lg border border-dashed border-border bg-surface p-6 text-center">
              <p className="text-sm font-semibold">Upload photos or documents</p>
              <p className="mt-1 text-xs text-dim">Damage photos, police report, etc.</p>
              <input type="file" className="hidden" onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setPhotos((p) => [...p, f.name]);
              }} />
            </label>
            {photos.map((p) => <p key={p} className="text-sm text-muted-foreground">{p}</p>)}
            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
              <Button className="flex-1" onClick={() => setStep(4)}>Continue</Button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <Field label="Contact preference">
              <Select value={contactPref} onChange={(e) => setContactPref(e.target.value as typeof contactPref)}>
                <option value="call">Call</option>
                <option value="email">Email</option>
                <option value="text">Text</option>
              </Select>
            </Field>
            <Field label="Best time to reach you">
              <Select value={bestTime} onChange={(e) => setBestTime(e.target.value)}>
                <option>Mornings</option>
                <option>Afternoons</option>
                <option>Evenings</option>
              </Select>
            </Field>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep(3)}>Back</Button>
              <Button className="flex-1" onClick={() => setStep(5)}>Continue</Button>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <Card className="mb-4 space-y-1 text-sm">
              <p>{getProduct(policy?.product ?? "auto")?.name} · {policy?.number}</p>
              <p className="text-muted-foreground">{type} on {incidentDate}</p>
              <p className="text-muted-foreground">{description}</p>
            </Card>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              We act as your advocate to help you achieve the best possible outcome.
            </p>
            <Button
              variant="cta"
              full
              onClick={() => {
                const claim = submitClaim({
                  policyId,
                  product: (policy?.product ?? "auto") as ProductSlug,
                  incidentDate,
                  location,
                  type,
                  description,
                  contactPref,
                  bestTime,
                  photos,
                });
                navigate({ to: "/claims/$id", params: { id: claim.id } });
              }}
            >
              Submit Claim
            </Button>
          </>
        )}
      </div>
    </Screen>
  );
}
