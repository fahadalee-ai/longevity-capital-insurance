import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header, Screen } from "@/components/kit";
import type { NotificationCategory } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  component: NotificationsScreen,
});

const FILTERS: { id: "all" | NotificationCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "quotes", label: "Quotes" },
  { id: "appointments", label: "Appointments" },
  { id: "policies", label: "Policies" },
  { id: "messages", label: "Messages" },
  { id: "documents", label: "Documents" },
  { id: "claims", label: "Claims" },
];

function NotificationsScreen() {
  const { notifications, markNotificationRead, markAllRead } = useApp();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const list = notifications.filter((n) => filter === "all" || n.category === filter);
  const groups = [...new Set(list.map((n) => n.dateGroup))];

  return (
    <Screen padded={false}>
      <Header
        title="Notifications"
        right={
          <button type="button" onClick={markAllRead} className="text-xs font-semibold text-primary">
            Mark all read
          </button>
        }
      />
      <div className="flex gap-2 overflow-x-auto px-4 pb-3">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn("shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold", filter === f.id ? "bg-primary text-white" : "bg-surface text-dim")}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="px-4 pb-10">
        {groups.map((g) => (
          <section key={g} className="mb-4">
            <p className="mb-2 text-[11px] uppercase tracking-wide text-dim">{g}</p>
            {list.filter((n) => n.dateGroup === g).map((n) => (
              <Link
                key={n.id}
                to={n.href as "/"}
                onClick={() => markNotificationRead(n.id)}
                className={cn("mb-2 flex gap-3 rounded-lg bg-surface p-3", !n.read && "border-l-2 border-primary")}
              >
                {!n.read && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                <div>
                  <p className="text-sm font-semibold">{n.title}</p>
                  <p className="text-sm text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-[11px] text-dim">{n.time}</p>
                </div>
              </Link>
            ))}
          </section>
        ))}
      </div>
    </Screen>
  );
}
