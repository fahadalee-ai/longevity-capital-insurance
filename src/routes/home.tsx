import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Calendar, Car, FileWarning, Phone, Shield } from "lucide-react";
import { CategoryIcon } from "@/components/CategoryIcon";
import { Logo } from "@/components/Logo";
import { ProductCard } from "@/components/ProductCard";
import { Card, LinkButton, SectionTitle } from "@/components/kit";
import { useRequireAuth } from "@/components/Gate";
import { PRODUCTS, TRUST_BULLETS, daysUntil, formatDateShort, formatTime, greeting, initials } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/home")({
  component: HomeScreen,
});

const ACTIONS = [
  { to: "/quote", label: "Get Quote", icon: FileWarning, cta: true },
  { to: "/claims/new", label: "File a Claim", icon: Shield, gate: true },
  { to: "/appointments/book", label: "Book Consultation", icon: Calendar, gate: true },
  { to: "/agent", label: "Call Agent", icon: Phone },
  { to: "/policies", label: "My Policies", icon: Car, gate: true },
] as const;

function HomeScreen() {
  const { user, policies, appointments, notifications } = useApp();
  const { promptLogin } = useRequireAuth();
  const first = user?.firstName ?? "Guest";
  const unread = notifications.filter((n) => !n.read).length;
  const active = policies.filter((p) => p.status === "Active");
  const upcomingAppt = appointments.find((a) => a.status === "Upcoming");
  const soonRenewal = policies
    .filter((p) => p.status === "Active")
    .map((p) => ({ p, days: daysUntil(p.renewalDate) }))
    .filter((x) => x.days >= 0 && x.days <= 30)
    .sort((a, b) => a.days - b.days)[0];

  return (
    <div className="min-h-dvh bg-background pb-4 pt-[max(1rem,env(safe-area-inset-top))]">
      <div className="mb-3 flex justify-center px-4">
        <Logo size={30} compact />
      </div>
      <header className="flex items-center justify-between px-4">
        <div>
          <p className="font-display text-[22px] font-semibold text-white">
            {greeting()}, {first}
          </p>
          <p className="text-xs text-muted-foreground">Work with Experienced Insurance Experts!</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/notifications" className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-surface">
            <Bell size={18} strokeWidth={2} />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-bold text-white">
                {unread}
              </span>
            )}
          </Link>
          <Link
            to="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary font-display text-xs font-bold"
          >
            {user ? initials(user.firstName, user.lastName) : "G"}
          </Link>
        </div>
      </header>

      <div className="mt-5 px-4">
        <div className="relative overflow-hidden rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80"
            alt="Professionals reviewing coverage options"
            className="h-40 w-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="font-display text-xl font-bold text-white">Get Fast, Accurate Quotes</p>
            <LinkButton to="/quote" variant="cta" className="mt-3 h-10 px-4 py-2">
              Get a Quote
            </LinkButton>
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto px-4">
        {ACTIONS.map((a) => {
          const Icon = a.icon;
          return (
            <Link
              key={a.label}
              to={a.to}
              onClick={(e) => {
                if ("gate" in a && a.gate && !user) {
                  e.preventDefault();
                  promptLogin();
                }
              }}
              className="flex w-[88px] shrink-0 flex-col items-center gap-2 rounded-lg bg-surface px-2 py-3"
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-md ${"cta" in a && a.cta ? "bg-accent" : "bg-primary"} text-white`}>
                <Icon size={18} strokeWidth={2} />
              </span>
              <span className="text-center text-[11px] font-medium leading-tight text-muted-foreground">{a.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="px-4">
        <SectionTitle
          action={
            <Link to="/products" className="text-xs font-semibold text-primary">
              View all
            </Link>
          }
        >
          What We Offer
        </SectionTitle>
      </div>
      <div className="flex gap-3 overflow-x-auto px-4 pb-1">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.slug} product={p} variant="tile" />
        ))}
      </div>

      <div className="px-4">
        <SectionTitle
          action={
            <Link to="/policies" className="text-xs font-semibold text-primary">
              View All
            </Link>
          }
        >
          Active Policies
        </SectionTitle>
        {user ? (
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-2xl font-bold">{active.length}</p>
                <p className="text-sm text-muted-foreground">policies in force</p>
              </div>
              <div className="flex -space-x-2">
                {active.slice(0, 3).map((p) => (
                  <span key={p.id} className="flex h-9 w-9 items-center justify-center rounded-full border border-background bg-primary">
                    <CategoryIcon name={p.product} size={14} />
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ) : (
          <Card>
            <p className="text-sm text-muted-foreground">Sign in to see your policies in force.</p>
            <LinkButton to="/login" className="mt-3" full>
              Log In
            </LinkButton>
          </Card>
        )}

        {(upcomingAppt || soonRenewal) && user && (
          <>
            <SectionTitle>Upcoming</SectionTitle>
            <div className="space-y-3">
              {upcomingAppt && (
                <Link to="/appointments" className="block rounded-lg border border-accent/60 bg-surface p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-accent">Next appointment</p>
                  <p className="mt-1 font-display font-semibold">
                    {upcomingAppt.type} · {formatDateShort(upcomingAppt.date)} at {formatTime(upcomingAppt.time)}
                  </p>
                  <p className="text-sm text-muted-foreground">{upcomingAppt.reason}</p>
                </Link>
              )}
              {soonRenewal && (
                <Link
                  to="/renewal/$id"
                  params={{ id: soonRenewal.p.id }}
                  className="block rounded-lg border border-accent/60 bg-surface p-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-accent">Renewal in {soonRenewal.days} days</p>
                  <p className="mt-1 font-display font-semibold">{soonRenewal.p.name} renews {formatDateShort(soonRenewal.p.renewalDate)}</p>
                </Link>
              )}
            </div>
          </>
        )}

        <SectionTitle>Why Longevity Capital</SectionTitle>
        <div className="space-y-2">
          {TRUST_BULLETS.map((b) => (
            <Card key={b.title}>
              <p className="font-display text-sm font-semibold">{b.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{b.body}</p>
            </Card>
          ))}
        </div>

        <Link to="/referral" className="mt-7 block overflow-hidden rounded-lg bg-primary p-4 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
          <p className="font-display text-lg font-semibold">Refer a Friend, Get Rewarded</p>
          <p className="mt-1 text-sm text-white/80">Give the gift of great coverage.</p>
        </Link>
      </div>
    </div>
  );
}
