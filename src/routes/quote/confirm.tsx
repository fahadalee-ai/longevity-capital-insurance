import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { LinkButton, Screen } from "@/components/kit";

type Search = { id?: string };

export const Route = createFileRoute("/quote/confirm")({
  validateSearch: (s: Record<string, unknown>): Search => ({ id: typeof s.id === "string" ? s.id : undefined }),
  component: ConfirmScreen,
});

function ConfirmScreen() {
  const { id } = Route.useSearch();
  return (
    <Screen className="flex flex-col items-center justify-center px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/15 text-success animate-[check-pop_400ms_ease]">
        <Check size={36} strokeWidth={2.4} />
      </div>
      <h1 className="mt-5 font-display text-2xl font-bold">Quote Request Submitted!</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        An agent will review and respond within 1 business day.
      </p>
      <LinkButton to={id ? "/quotes/$id" : "/quotes"} params={id ? { id } : undefined} className="mt-6" full>
        Track Status
      </LinkButton>
      <LinkButton to="/home" variant="outline" className="mt-2" full>
        Back to Home
      </LinkButton>
    </Screen>
  );
}
