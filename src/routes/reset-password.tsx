import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, PasswordField } from "@/components/AuthShell";
import { Button } from "@/components/kit";
import { passwordStrength } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reset-password")({
  component: ResetScreen,
});

function ResetScreen() {
  const { pushToast } = useApp();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [done, setDone] = useState(false);
  const strength = passwordStrength(password);
  const valid = strength.score >= 3 && password === confirm;

  if (done) {
    return (
      <AuthShell title="Password Reset" subtitle="You’re all set. Sign in with your new password." showBack={false}>
        <Button
          full
          onClick={() => {
            pushToast("Password updated");
            navigate({ to: "/login" });
          }}
        >
          Back to Log In
        </Button>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Reset Password" subtitle="Choose a strong password you haven’t used before.">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!valid) return;
          setDone(true);
        }}
      >
        <PasswordField label="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="mb-4">
          <div className="mb-1 flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={cn("h-1 flex-1 rounded-full", i < strength.score ? "bg-success" : "bg-surface-elevated")}
              />
            ))}
          </div>
          <p className="text-xs text-dim">{strength.label}</p>
        </div>
        <PasswordField
          label="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={confirm && confirm !== password ? "Passwords do not match" : undefined}
        />
        <Button type="submit" full disabled={!valid}>
          Reset Password
        </Button>
      </form>
    </AuthShell>
  );
}
