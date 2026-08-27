import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AuthShell } from "@/components/AuthShell";
import { Button } from "@/components/kit";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { maskPhone } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

type Search = { from?: string };

export const Route = createFileRoute("/verify")({
  validateSearch: (s: Record<string, unknown>): Search => ({ from: typeof s.from === "string" ? s.from : "register" }),
  component: VerifyScreen,
});

function VerifyScreen() {
  const { from } = Route.useSearch();
  const { pendingContact, completePendingAuth, user } = useApp();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(30);
  const [error, setError] = useState("");

  useEffect(() => {
    if (seconds <= 0) return;
    const t = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [seconds]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;
    if (code !== "123456") {
      setError("Try 123456 for this demo.");
      return;
    }
    if (from === "reset") {
      navigate({ to: "/reset-password" });
      return;
    }
    completePendingAuth();
    navigate({ to: "/home" });
  };

  const phone = pendingContact || user?.phone || "(912) 555-0148";

  return (
    <AuthShell title="Verify Your Number" subtitle={`Enter the 6-digit code sent to ${maskPhone(phone)}`}>
      <form onSubmit={submit}>
        <div className="mb-6 flex justify-center">
          <InputOTP maxLength={6} value={code} onChange={(v) => { setCode(v); setError(""); }}>
            <InputOTPGroup className="gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="h-12 w-11 rounded-lg border border-border bg-surface-elevated text-lg first:rounded-lg last:rounded-lg"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        {error && <p className="mb-3 text-center text-xs text-accent">{error}</p>}
        <Button type="submit" full disabled={code.length !== 6}>
          Verify
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-muted-foreground">
        {seconds > 0 ? (
          <>Resend Code in 0:{String(seconds).padStart(2, "0")}</>
        ) : (
          <button type="button" className="font-semibold text-white" onClick={() => setSeconds(30)}>
            Resend Code
          </button>
        )}
      </p>
    </AuthShell>
  );
}
