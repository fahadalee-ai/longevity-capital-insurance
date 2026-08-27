import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { LinkButton } from "@/components/kit";
import { AGENCY, IMAGES } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/welcome")({
  component: WelcomeScreen,
});

function WelcomeScreen() {
  const { enterGuest } = useApp();

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <img src={IMAGES.auth} alt="Couple at sunset" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,14,26,0.97)] via-[rgba(11,14,26,0.72)] to-[rgba(11,14,26,0.25)]" />
      <div className="relative flex min-h-dvh flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(2.5rem,env(safe-area-inset-top))]">
        <div className="flex flex-1 flex-col items-center justify-end pb-8 text-center">
          <Logo size={72} wordmark className="mx-auto w-full max-w-[300px]" />
          <h1 className="mt-5 font-display text-2xl font-bold text-white">Welcome to Longevity Capital Insurance</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            Your trusted partner for Medicare, Life, Health, Home, Auto & more.
          </p>
        </div>
        <div className="space-y-3">
          <LinkButton to="/login" full>
            Log In
          </LinkButton>
          <LinkButton to="/register" variant="outline" full>
            Create Account
          </LinkButton>
          <Link
            to="/home"
            onClick={() => enterGuest()}
            className="block py-2 text-center text-sm text-muted-foreground"
          >
            Continue as Guest
          </Link>
        </div>
        <p className="mt-5 text-center text-[11px] leading-relaxed text-dim">
          By continuing, you agree to our{" "}
          <Link to="/terms" className="text-muted-foreground underline">
            Terms
          </Link>{" "}
          &{" "}
          <Link to="/privacy" className="text-muted-foreground underline">
            Privacy Policy
          </Link>
        </p>
        <p className="mt-3 text-center text-[11px] uppercase tracking-[1px] text-dim">{AGENCY.veteranOwned}</p>
      </div>
    </div>
  );
}
