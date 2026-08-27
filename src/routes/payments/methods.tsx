import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Field, Header, Input, Select, Screen } from "@/components/kit";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/payments/methods")({
  component: MethodsScreen,
});

function MethodsScreen() {
  const { addPaymentMethod } = useApp();
  const navigate = useNavigate();
  const [kind, setKind] = useState<"card" | "bank">("card");
  const [brand, setBrand] = useState("Visa");
  const [last4, setLast4] = useState("");
  const [exp, setExp] = useState("");

  return (
    <Screen padded={false}>
      <Header title="Add Payment Method" />
      <div className="px-4 pb-10">
        <Field label="Type">
          <Select value={kind} onChange={(e) => setKind(e.target.value as "card" | "bank")}>
            <option value="card">Card</option>
            <option value="bank">Bank account</option>
          </Select>
        </Field>
        <Field label={kind === "card" ? "Card brand" : "Bank name"}>
          <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
        </Field>
        <Field label="Last 4 digits">
          <Input maxLength={4} value={last4} onChange={(e) => setLast4(e.target.value.replace(/\D/g, ""))} />
        </Field>
        {kind === "card" && (
          <Field label="Expiration">
            <Input placeholder="08/28" value={exp} onChange={(e) => setExp(e.target.value)} />
          </Field>
        )}
        <Button
          full
          disabled={last4.length !== 4}
          onClick={() => {
            addPaymentMethod({ brand, last4, exp: exp || "—", default: false, kind });
            navigate({ to: "/payments" });
          }}
        >
          Save Method
        </Button>
      </div>
    </Screen>
  );
}
