import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useState } from "react";
import { AuthInput, AuthShell } from "@/components/AuthShell";
import { Button, Field } from "@/components/kit";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotScreen,
});

function ForgotScreen() {
  const { setPendingContact } = useApp();
  const navigate = useNavigate();
  const [contact, setContact] = useState("");
  const valid = contact.includes("@") || contact.replace(/\D/g, "").length >= 10;

  return (
    <AuthShell title="Forgot Password" subtitle="We’ll send a 6-digit reset code to your email or phone.">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!valid) return;
          setPendingContact(contact);
          navigate({ to: "/verify", search: { from: "reset" } });
        }}
      >
        <Field label="Email or Phone">
          <AuthInput
            icon={<Mail size={16} />}
            placeholder="you@email.com or (912) 555-0148"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </Field>
        <Button type="submit" full disabled={!valid}>
          Send Reset Code
        </Button>
      </form>
    </AuthShell>
  );
}
