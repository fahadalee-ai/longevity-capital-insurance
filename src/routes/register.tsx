import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { AuthInput, AuthShell, PasswordField } from "@/components/AuthShell";
import { Button, Field } from "@/components/kit";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/register")({
  component: RegisterScreen,
});

function RegisterScreen() {
  const { register } = useApp();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const valid =
    fullName.trim().length > 1 &&
    email.includes("@") &&
    phone.replace(/\D/g, "").length >= 10 &&
    password.length >= 8 &&
    password === confirm &&
    agree;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    const res = register({ fullName, email, phone, password });
    if (!res.ok) {
      setError("An account with that email already exists.");
      return;
    }
    navigate({ to: "/verify", search: { from: "register" } });
  };

  return (
    <AuthShell title="Create Account" subtitle="Join Longevity Capital Insurance to track quotes and policies.">
      <form onSubmit={submit}>
        <Field label="Full Name">
          <AuthInput icon={<User size={16} />} placeholder="Jordan Hales" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </Field>
        <Field label="Email" error={error}>
          <AuthInput icon={<Mail size={16} />} type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Phone Number">
          <AuthInput icon={<Phone size={16} />} type="tel" placeholder="(912) 555-0148" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Field>
        <PasswordField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <PasswordField
          label="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={confirm && confirm !== password ? "Passwords do not match" : undefined}
        />
        <label className="mb-5 flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-1 accent-primary"
          />
          <span>
            I agree to the{" "}
            <Link to="/terms" className="text-white underline">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-white underline">
              Privacy Policy
            </Link>
          </span>
        </label>
        <Button type="submit" full disabled={!valid}>
          Create Account
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-white">
          Log In
        </Link>
      </p>
    </AuthShell>
  );
}
