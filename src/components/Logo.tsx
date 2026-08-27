import logoColor from "@/img/logo.png";
import logoOnDark from "@/img/logo-w.png";
import { cn } from "@/lib/utils";

export const LOGO_SRC = logoOnDark;

export function Logo({
  size = 56,
  className,
  wordmark,
  compact,
  variant = "dark",
}: {
  size?: number;
  className?: string;
  wordmark?: boolean;
  compact?: boolean;
  /** `dark` uses logo-w (white lockup). `color` uses the full-color mark. */
  variant?: "dark" | "color";
}) {
  const height = compact ? Math.min(size, 32) : size;

  return (
    <img
      src={variant === "color" ? logoColor : logoOnDark}
      alt="Longevity Capital Insurance, LLC"
      className={cn("h-auto max-w-full object-contain object-center", wordmark && "w-full", className)}
      style={{ height }}
    />
  );
}
