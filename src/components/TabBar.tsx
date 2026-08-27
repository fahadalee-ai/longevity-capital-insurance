import { Link, useRouterState } from "@tanstack/react-router";
import { FileText, House, MessageCircle, Plus, User } from "lucide-react";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/home", label: "Home", icon: House },
  { to: "/policies", label: "Policies", icon: FileText },
  { to: "/quote", label: "Quote", icon: Plus, cta: true },
  { to: "/messages", label: "Messages", icon: MessageCircle, badge: true },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function TabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { notifications, user } = useApp();
  const unread = user ? notifications.filter((n) => !n.read && n.category === "messages").length : 0;

  return (
    <nav className="sticky bottom-0 z-40 border-t border-border bg-background pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5">
      <div className="grid grid-cols-5 items-end">
        {TABS.map((tab) => {
          const active = pathname === tab.to || (tab.to !== "/quote" && pathname.startsWith(`${tab.to}/`));
          const Icon = tab.icon;
          if ("cta" in tab && tab.cta) {
            return (
              <Link key={tab.to} to={tab.to} className="flex flex-col items-center justify-end pb-1">
                <span className="-mt-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_24px_rgba(237,28,34,0.45)] transition-transform duration-200 active:scale-95">
                  <Icon size={26} strokeWidth={2.2} />
                </span>
                <span className="mt-1 text-[10px] font-semibold text-white">Quote</span>
              </Link>
            );
          }
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={cn(
                "relative flex flex-col items-center gap-1 py-1 text-[10px] font-medium transition-colors duration-200",
                active ? "text-primary" : "text-dim",
              )}
            >
              <span className="relative">
                <Icon size={22} strokeWidth={2} />
                {"badge" in tab && tab.badge && unread > 0 && (
                  <span className="absolute -right-1.5 -top-1 h-2 w-2 rounded-full bg-accent" />
                )}
              </span>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function shouldShowTabBar(pathname: string) {
  return ["/home", "/policies", "/quote", "/messages", "/profile"].includes(pathname);
}
