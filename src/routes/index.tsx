import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Logo } from "@/components/Logo";
import { AGENCY, IMAGES } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Longevity Capital Insurance" },
      { name: "description", content: AGENCY.tagline },
    ],
  }),
  component: SplashScreen,
});

function SplashScreen() {
  const navigate = useNavigate();
  const { user, guest, onboarded } = useApp();

  useEffect(() => {
    const t = window.setTimeout(() => {
      if (!onboarded) navigate({ to: "/onboarding" });
      else if (user || guest) navigate({ to: "/home" });
      else navigate({ to: "/welcome" });
    }, 2500);
    return () => window.clearTimeout(t);
  }, [guest, navigate, onboarded, user]);

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <img src={IMAGES.splash} alt="Couple enjoying a golden-hour evening together" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,14,26,0.95)] from-[40%] to-transparent" />
      <div className="relative flex min-h-dvh flex-col items-center px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(3rem,env(safe-area-inset-top))]">
        <div className="flex flex-1 flex-col items-center justify-center">
          <Logo size={88} wordmark className="mx-auto w-full max-w-[320px]" />
          <p className="mt-3 text-center text-sm text-muted-foreground">{AGENCY.tagline}</p>
        </div>
        <div className="w-full max-w-[240px]">
          <div className="h-0.5 overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-full origin-left animate-[splash-bar_2.5s_linear_forwards] bg-accent" />
          </div>
        </div>
        <p className="mt-5 text-[11px] uppercase tracking-[1px] text-dim">{AGENCY.veteranOwned}</p>
      </div>
    </div>
  );
}
