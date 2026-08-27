import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header, LinkButton } from "@/components/kit";
import { TRUST_BULLETS, getProduct } from "@/lib/mock-data";

export const Route = createFileRoute("/products/$slug")({
  component: ProductDetail,
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  if (!product) {
    return (
      <div className="px-4 py-10">
        <Header title="Product" />
        <p className="text-sm text-muted-foreground">We couldn’t find that product.</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background pb-28">
      <div className="relative h-56 overflow-hidden">
        <img src={product.hero} alt={product.heroAlt} className="h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-x-0 top-0">
          <Header title="" />
        </div>
        <h1 className="absolute inset-x-0 bottom-4 px-4 font-display text-2xl font-bold text-white">{product.name}</h1>
      </div>

      <div className="space-y-6 px-4 pt-5">
        <section>
          <h2 className="font-display text-lg font-semibold">About This Coverage</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{product.about}</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold">What’s Covered</h2>
          <ul className="mt-3 space-y-2">
            {product.covered.map((c) => (
              <li key={c} className="flex gap-2 text-sm text-muted-foreground">
                <Check size={16} className="mt-0.5 shrink-0 text-success" strokeWidth={2} />
                {c}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold">Why Choose Longevity Capital</h2>
          <ul className="mt-3 space-y-2">
            {TRUST_BULLETS.map((b) => (
              <li key={b.title} className="rounded-lg bg-surface p-3">
                <p className="text-sm font-semibold">{b.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{b.body}</p>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-1 font-display text-lg font-semibold">FAQ</h2>
          <Accordion type="single" collapsible>
            {product.faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-border">
                <AccordionTrigger className="text-sm text-white">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto flex max-w-[430px] gap-2 border-t border-border bg-background px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <LinkButton to="/quote" search={{ product: product.slug }} variant="cta" className="flex-1">
          Get a Quote
        </LinkButton>
        <Link to="/agent" className="inline-flex flex-1 items-center justify-center rounded-lg border-[1.5px] border-primary font-display text-sm font-semibold">
          Talk to an Agent
        </Link>
      </div>
    </div>
  );
}
