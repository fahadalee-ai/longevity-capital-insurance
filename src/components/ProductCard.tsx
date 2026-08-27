import { Link } from "@tanstack/react-router";
import { CategoryIcon } from "@/components/CategoryIcon";
import type { Product } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  variant = "row",
  className,
}: {
  product: Product;
  variant?: "row" | "grid" | "tile";
  className?: string;
}) {
  if (variant === "tile") {
    return (
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className={cn(
          "relative h-36 w-36 shrink-0 overflow-hidden rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.4)]",
          className,
        )}
      >
        <img src={product.hero} alt={product.heroAlt} className="h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 p-3">
          <span className="mb-1 flex h-7 w-7 items-center justify-center rounded-md bg-primary text-white">
            <CategoryIcon name={product.slug} size={14} />
          </span>
          <p className="font-display text-sm font-semibold leading-tight text-white">{product.name}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className={cn(
        "overflow-hidden rounded-lg bg-surface shadow-[0_8px_24px_rgba(0,0,0,0.4)]",
        className,
      )}
    >
      <div className="relative h-28 overflow-hidden">
        <img src={product.hero} alt={product.heroAlt} className="h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
          <CategoryIcon name={product.slug} size={16} />
        </span>
      </div>
      <div className="p-3">
        <p className="font-display text-sm font-semibold text-white">{product.name}</p>
        <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">{product.short}</p>
        <span className="mt-3 inline-flex rounded-md bg-accent px-2.5 py-1 text-[11px] font-semibold text-white">
          Get Quote
        </span>
      </div>
    </Link>
  );
}
