import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { TabBar, shouldShowTabBar } from "@/components/TabBar";
import { useApp } from "@/lib/store";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { toasts, dismissToast } = useApp();
  const showTabs = shouldShowTabBar(pathname);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-background">
      <main className="flex-1">{children}</main>
      {showTabs && <TabBar />}
      <div className="pointer-events-none fixed inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-50 flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => dismissToast(t.id)}
            className="pointer-events-auto w-full max-w-[398px] rounded-lg bg-surface-elevated px-4 py-3 text-left shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
          >
            <p className="font-display text-sm font-semibold text-white">{t.title}</p>
            {t.body && <p className="text-xs text-muted-foreground">{t.body}</p>}
          </button>
        ))}
      </div>
    </div>
  );
}
