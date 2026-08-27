import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Header, Input, Screen } from "@/components/kit";
import { PRODUCTS } from "@/lib/mock-data";

export const Route = createFileRoute("/products/")({
  component: ProductsScreen,
});

function ProductsScreen() {
  const [q, setQ] = useState("");
  const list = PRODUCTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <Screen padded={false}>
      <Header title="Our Insurance Products" />
      <div className="px-4 pb-8">
        <div className="relative mb-4">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
          <Input className="pl-9" placeholder="Search by product name" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} variant="grid" />
          ))}
        </div>
      </div>
    </Screen>
  );
}
