import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CategoryIcon } from "@/components/CategoryIcon";
import { AuthGate } from "@/components/Gate";
import { ProgressLabel } from "@/components/QuoteStepper";
import { Button, Card, Field, Header, Input, Select, Screen } from "@/components/kit";
import { PRODUCTS, getProduct, type ProductSlug } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

type Search = { product?: string };

export const Route = createFileRoute("/quote/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    product: typeof s.product === "string" ? s.product : undefined,
  }),
  component: QuoteFlow,
});

function QuoteFlow() {
  return (
    <AuthGate title="Log in to request a quote" body="We’ll save your details so an agent can shop multiple carriers for you.">
      <QuoteSteps />
    </AuthGate>
  );
}

function QuoteSteps() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { user, quoteDraft, setQuoteDraft, submitQuote } = useApp();
  const [step, setStep] = useState(search.product ? 2 : 1);
  const product = getProduct(quoteDraft.product);

  useEffect(() => {
    if (search.product && !quoteDraft.product) {
      setQuoteDraft({ product: search.product as ProductSlug });
      setStep(2);
    }
  }, [search.product, quoteDraft.product, setQuoteDraft]);

  useEffect(() => {
    if (user && !quoteDraft.personal.fullName) {
      setQuoteDraft({
        personal: {
          fullName: `${user.firstName} ${user.lastName}`,
          dob: user.dob,
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
      });
    }
  }, [user, quoteDraft.personal.fullName, setQuoteDraft]);

  const personal = quoteDraft.personal;
  const personalValid = Boolean(personal.fullName && personal.email && personal.phone);
  const detailsValid = product ? product.fields.every((f) => (quoteDraft.details[f.id] ?? "").trim()) : false;

  return (
    <Screen padded={false}>
      <Header title="Request a Quote" fallbackTo="/home" />
      <div className="px-4 pb-8">
        <ProgressLabel step={step} total={5} />
        <div className="mt-2 mb-5 h-1 overflow-hidden rounded-full bg-surface-elevated">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(step / 5) * 100}%` }} />
        </div>

        {step === 1 && (
          <>
            <h2 className="mb-3 font-display text-lg font-semibold">Select a product</h2>
            <div className="grid grid-cols-2 gap-2">
              {PRODUCTS.map((p) => {
                const on = quoteDraft.product === p.slug;
                return (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => setQuoteDraft({ product: p.slug })}
                    className={cn(
                      "flex flex-col items-start gap-2 rounded-lg border p-3 text-left transition-colors duration-200",
                      on ? "border-primary bg-primary/20" : "border-border bg-surface",
                    )}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-white">
                      <CategoryIcon name={p.slug} size={16} />
                    </span>
                    <span className="text-sm font-semibold">{p.name}</span>
                  </button>
                );
              })}
            </div>
            <Button className="mt-5" full disabled={!quoteDraft.product} onClick={() => setStep(2)}>
              Continue
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="mb-3 font-display text-lg font-semibold">Personal info</h2>
            {(["fullName", "dob", "email", "phone", "address"] as const).map((key) => (
              <Field key={key} label={{ fullName: "Full Name", dob: "Date of Birth", email: "Email", phone: "Phone", address: "Address" }[key]}>
                <Input
                  type={key === "dob" ? "date" : key === "email" ? "email" : "text"}
                  value={personal[key] ?? ""}
                  onChange={(e) => setQuoteDraft({ personal: { ...personal, [key]: e.target.value } })}
                />
              </Field>
            ))}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button className="flex-1" disabled={!personalValid} onClick={() => setStep(3)}>
                Continue
              </Button>
            </div>
          </>
        )}

        {step === 3 && product && (
          <>
            <h2 className="mb-3 font-display text-lg font-semibold">{product.name} details</h2>
            {product.fields.map((f) => (
              <Field key={f.id} label={f.label}>
                {f.type === "select" ? (
                  <Select
                    value={quoteDraft.details[f.id] ?? ""}
                    onChange={(e) => setQuoteDraft({ details: { ...quoteDraft.details, [f.id]: e.target.value } })}
                  >
                    <option value="">Select</option>
                    {f.options?.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </Select>
                ) : (
                  <Input
                    type={f.type === "number" ? "number" : "text"}
                    placeholder={f.placeholder}
                    value={quoteDraft.details[f.id] ?? ""}
                    onChange={(e) => setQuoteDraft({ details: { ...quoteDraft.details, [f.id]: e.target.value } })}
                  />
                )}
              </Field>
            ))}
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button className="flex-1" disabled={!detailsValid} onClick={() => setStep(4)}>
                Continue
              </Button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="mb-1 font-display text-lg font-semibold">Upload supporting docs</h2>
            <p className="mb-4 text-sm text-muted-foreground">Optional — driver’s license, current declarations page, etc.</p>
            <label className="mb-4 block cursor-pointer rounded-lg border border-dashed border-border bg-surface p-6 text-center">
              <p className="text-sm font-semibold">Tap to add a file</p>
              <p className="mt-1 text-xs text-dim">Photos or PDF</p>
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setQuoteDraft({ docs: [...quoteDraft.docs, file.name] });
                }}
              />
            </label>
            {quoteDraft.docs.map((d) => (
              <p key={d} className="text-sm text-muted-foreground">
                {d}
              </p>
            ))}
            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button className="flex-1" onClick={() => setStep(5)}>
                Continue
              </Button>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h2 className="mb-3 font-display text-lg font-semibold">Review & Submit</h2>
            <Card className="mb-3">
              <div className="mb-2 flex justify-between">
                <p className="text-xs text-dim">Product</p>
                <button type="button" className="text-xs text-primary" onClick={() => setStep(1)}>
                  Edit
                </button>
              </div>
              <p className="font-semibold">{product?.name}</p>
            </Card>
            <Card className="mb-3">
              <div className="mb-2 flex justify-between">
                <p className="text-xs text-dim">Personal</p>
                <button type="button" className="text-xs text-primary" onClick={() => setStep(2)}>
                  Edit
                </button>
              </div>
              {Object.entries(personal).map(([k, v]) => (
                <p key={k} className="text-sm text-muted-foreground">
                  {v}
                </p>
              ))}
            </Card>
            <Card className="mb-4">
              <div className="mb-2 flex justify-between">
                <p className="text-xs text-dim">Details</p>
                <button type="button" className="text-xs text-primary" onClick={() => setStep(3)}>
                  Edit
                </button>
              </div>
              {Object.entries(quoteDraft.details).map(([k, v]) => (
                <p key={k} className="text-sm text-muted-foreground">
                  {k}: {v}
                </p>
              ))}
            </Card>
            <Button
              variant="cta"
              full
              onClick={() => {
                const q = submitQuote();
                navigate({ to: "/quote/confirm", search: { id: q.id } });
              }}
            >
              Submit Quote Request
            </Button>
            <Button variant="outline" full className="mt-2" onClick={() => setStep(4)}>
              Back
            </Button>
          </>
        )}
      </div>
    </Screen>
  );
}
