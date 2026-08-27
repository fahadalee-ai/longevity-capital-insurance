import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/kit";
import { ONBOARDING } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingScreen,
});

function OnboardingScreen() {
  const [i, setI] = useState(0);
  const navigate = useNavigate();
  const { markOnboarded } = useApp();
  const slide = ONBOARDING[i];
  const last = i === ONBOARDING.length - 1;

  const finish = () => {
    markOnboarded();
    navigate({ to: "/welcome" });
  };

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <img src={slide.image} alt={slide.alt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="hero-overlay absolute inset-0" />
      <button
        type="button"
        onClick={finish}
        className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-10 text-sm font-semibold text-white/80"
      >
        Skip
      </button>
      <div className="relative flex min-h-dvh flex-col justify-end px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <h1 className="font-display text-[26px] font-bold text-white">{slide.title}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{slide.body}</p>
        <div className="my-6 flex gap-2">
          {ONBOARDING.map((_, idx) => (
            <span
              key={idx}
              className={cn("h-1.5 flex-1 rounded-full", idx === i ? "bg-accent" : "bg-white/20")}
            />
          ))}
        </div>
        <Button full onClick={last ? finish : () => setI((n) => n + 1)}>
          {last ? "Get Started" : "Next"}
        </Button>
      </div>
    </div>
  );
}
