import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useState } from "react";
import { AuthInput, AuthShell, PasswordField, SocialAuth } from "@/components/AuthShell";
import { Button, Field } from "@/components/kit";
import { useApp } from "@/lib/store";

const DEFAULT_EMAIL = "jordan@email.com";
const DEFAULT_PASSWORD = "Longevity1";

export const Route = createFileRoute("/login")({
  component: LoginScreen,
});

function LoginScreen() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [loading, setLoading] = useState(false);

  const goHome = () => {
    login(email, password);
    navigate({ to: "/home" });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    goHome();
    setLoading(false);
  };

  return (
    <AuthShell title="Log In" subtitle="Welcome back. Manage your coverage in one place.">
      <form onSubmit={submit}>
        <Field label="Email / Phone">
          <AuthInput
            icon={<Mail size={16} />}
            type="text"
            autoComplete="username"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <PasswordField
          label="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mb-5 flex justify-end">
          <Link to="/forgot-password" className="text-sm font-semibold text-accent">
            Forgot Password?
          </Link>
        </div>
        <Button type="submit" variant="primary" full disabled={loading}>
          {loading ? "Signing in…" : "Log In"}
        </Button>
      </form>
      <SocialAuth onContinue={goHome} />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don’t have an account?{" "}
        <Link to="/register" className="font-semibold text-white">
          Sign Up
        </Link>
      </p>
    </AuthShell>
  );
}
