import { cn } from "@/lib/utils";

export function QuoteStepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-start gap-1 overflow-x-auto pb-1">
      {steps.map((label, i) => (
        <div key={label} className="flex min-w-0 flex-1 flex-col items-center">
          <div className="flex w-full items-center">
            <div
              className={cn(
                "mx-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                i <= current ? "bg-primary text-white" : "bg-surface-elevated text-dim",
              )}
            >
              {i + 1}
            </div>
          </div>
          <p className={cn("mt-1 text-center text-[10px] leading-tight", i <= current ? "text-white" : "text-dim")}>
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ProgressLabel({ step, total }: { step: number; total: number }) {
  return (
    <p className="text-xs font-medium uppercase tracking-wider text-dim">
      Step {step} of {total}
    </p>
  );
}
