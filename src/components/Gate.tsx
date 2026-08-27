import { useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LinkButton } from "@/components/kit";
import { useApp } from "@/lib/store";

export function useRequireAuth() {
  const { user } = useApp();
  const router = useRouter();
  return {
    user,
    isAuthed: Boolean(user),
    promptLogin: () => {
      router.navigate({ to: "/login" });
    },
  };
}

export function AuthGate({
  children,
  title = "Sign in to continue",
  body = "Create an account or log in to manage policies, quotes, and messages with your agent.",
}: {
  children: ReactNode;
  title?: string;
  body?: string;
}) {
  const { user } = useApp();
  if (user) return <>{children}</>;
  return (
    <div className="px-4 py-10">
      <div className="rounded-lg bg-surface p-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
        <h2 className="font-display text-xl font-semibold text-white">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
        <div className="mt-5 space-y-2">
          <LinkButton to="/login" full>
            Log In
          </LinkButton>
          <LinkButton to="/register" variant="outline" full>
            Create Account
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
