import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PasswordField } from "@/components/AuthShell";
import { Button, Header, Screen } from "@/components/kit";
import { passwordStrength } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile/password")({
  component: ChangePassword,
});

function ChangePassword() {
  const { user, updateUser, pushToast } = useApp();
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const strength = passwordStrength(next);
  const valid = strength.score >= 3 && next === confirm && current.length > 0;

  return (
    <Screen padded={false}>
      <Header title="Change Password" />
      <form
        className="px-4 pb-10"
        onSubmit={(e) => {
          e.preventDefault();
          if (!user || current !== user.password) {
            setError("Current password is incorrect.");
            return;
          }
          updateUser({ password: next });
          pushToast("Password updated");
          navigate({ to: "/profile" });
        }}
      >
        <PasswordField label="Current password" value={current} onChange={(e) => setCurrent(e.target.value)} error={error} />
        <PasswordField label="New password" value={next} onChange={(e) => setNext(e.target.value)} />
        <div className="mb-4 flex gap-1">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={cn("h-1 flex-1 rounded-full", i < strength.score ? "bg-success" : "bg-surface-elevated")} />
          ))}
        </div>
        <PasswordField
          label="Confirm new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={confirm && confirm !== next ? "Passwords do not match" : undefined}
        />
        <Button type="submit" full disabled={!valid}>Update Password</Button>
      </form>
    </Screen>
  );
}
