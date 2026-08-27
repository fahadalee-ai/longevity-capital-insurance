import { Link, useCanGoBack, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Screen({
  children,
  className,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={cn(
        "min-h-dvh bg-background text-foreground",
        padded && "px-4 py-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Header({
  title,
  subtitle,
  back = true,
  right,
  fallbackTo = "/home",
}: {
  title: string;
  subtitle?: string;
  back?: boolean;
  right?: ReactNode;
  fallbackTo?: string;
}) {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  return (
    <header className="sticky top-0 z-30 bg-background/95 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur">
      <div className="flex items-center gap-3">
        {back && (
          <button
            type="button"
            aria-label="Go back"
            onClick={() => (canGoBack ? router.history.back() : router.navigate({ to: fallbackTo as "/" }))}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-white transition-colors duration-200 hover:bg-surface"
          >
            <ArrowLeft size={18} strokeWidth={2} />
          </button>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-[22px] font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {right}
      </div>
    </header>
  );
}

export function Button({
  children,
  variant = "primary",
  full,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "cta" | "outline" | "dark" | "danger" | "ghost" | "light";
  full?: boolean;
}) {
  const styles = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    cta: "bg-accent text-white hover:bg-accent-dark",
    outline: "border-[1.5px] border-primary bg-transparent text-white hover:bg-primary/15",
    light: "border border-white/40 bg-transparent text-white hover:bg-white/10",
    dark: "bg-surface-elevated text-white hover:bg-primary",
    danger: "border-[1.5px] border-accent bg-transparent text-accent hover:bg-accent/10",
    ghost: "text-primary hover:bg-primary/10",
  }[variant];
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-3 font-display text-sm font-semibold tracking-tight transition-colors duration-200 disabled:opacity-50",
        styles,
        full && "w-full",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  to,
  params,
  search,
  children,
  variant = "primary",
  full,
  className,
}: {
  to: string;
  params?: Record<string, string>;
  search?: Record<string, string>;
  children: ReactNode;
  variant?: "primary" | "cta" | "outline" | "dark" | "danger" | "light";
  full?: boolean;
  className?: string;
}) {
  const styles = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    cta: "bg-accent text-white hover:bg-accent-dark",
    outline: "border-[1.5px] border-primary bg-transparent text-white hover:bg-primary/15",
    light: "border border-white/40 text-white hover:bg-white/10",
    dark: "bg-surface-elevated text-white hover:bg-primary",
    danger: "border-[1.5px] border-accent bg-transparent text-accent hover:bg-accent/10",
  }[variant];
  return (
    <Link
      to={to as "/"}
      params={params}
      search={search as never}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-3 text-center font-display text-sm font-semibold tracking-tight transition-colors duration-200",
        styles,
        full && "w-full",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Card({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-lg bg-surface p-4 shadow-[0_8px_24px_rgba(0,0,0,0.4)]",
        onClick && "cursor-pointer transition-transform duration-200 active:scale-[0.99]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 mt-7 flex items-end justify-between first:mt-0">
      <h2 className="font-display text-lg font-semibold tracking-tight text-white">{children}</h2>
      {action}
    </div>
  );
}

export function Field({
  label,
  error,
  children,
  hint,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="mb-4 block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-dim">{hint}</span>}
      {error && <span className="mt-1 block text-xs font-medium text-accent">{error}</span>}
    </label>
  );
}

export const inputClass =
  "w-full rounded-lg border border-border bg-surface-elevated px-3 py-3 text-sm text-white outline-none placeholder:text-dim transition-shadow duration-200 focus:border-primary focus:shadow-[0_0_0_3px_rgba(36,49,159,0.35)]";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClass, props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputClass, "min-h-28", props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(inputClass, props.className)} />;
}

export function Row({
  icon,
  label,
  value,
  to,
  params,
  onClick,
}: {
  icon?: ReactNode;
  label: string;
  value?: ReactNode;
  to?: string;
  params?: Record<string, string>;
  onClick?: () => void;
}) {
  const inner = (
    <>
      {icon && <span className="text-primary">{icon}</span>}
      <span className="flex-1 text-sm font-medium text-white">{label}</span>
      {value && <span className="text-xs text-muted-foreground">{value}</span>}
      <ChevronRight size={16} className="text-dim" />
    </>
  );
  const cls =
    "flex w-full items-center gap-3 border-b border-border bg-surface px-4 py-4 text-left transition-colors duration-200 hover:bg-surface-elevated";
  return to ? (
    <Link to={to as "/"} params={params} className={cls}>
      {inner}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function BottomSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/70" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[430px] rounded-t-lg border-t border-border bg-surface p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
          <button type="button" aria-label="Close" onClick={onClose} className="p-1 text-dim">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Empty({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="rounded-lg bg-surface p-8 text-center shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
      <div className="mx-auto mb-3 h-12 w-12 rounded-lg bg-surface-elevated" />
      <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{body}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-surface-elevated", className)} />;
}
