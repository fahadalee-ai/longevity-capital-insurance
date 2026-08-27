import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, Header, Input, Screen } from "@/components/kit";
import { FAQ_CATEGORIES, GLOSSARY } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/faq")({
  component: FaqScreen,
});

function FaqScreen() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("general");
  const current = FAQ_CATEGORIES.find((c) => c.id === cat) ?? FAQ_CATEGORIES[0];
  const items = useMemo(
    () => current.items.filter((i) => i.q.toLowerCase().includes(q.toLowerCase()) || i.a.toLowerCase().includes(q.toLowerCase())),
    [current, q],
  );

  return (
    <Screen padded={false}>
      <Header title="FAQs & Resources" />
      <div className="px-4 pb-10">
        <div className="relative mb-3">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
          <Input className="pl-9" placeholder="Search FAQs" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="mb-4 flex gap-2 overflow-x-auto">
          {FAQ_CATEGORIES.map((c) => (
            <button key={c.id} type="button" onClick={() => setCat(c.id)} className={cn("shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold", cat === c.id ? "bg-primary text-white" : "bg-surface text-dim")}>
              {c.name}
            </button>
          ))}
        </div>
        <Accordion type="single" collapsible>
          {items.map((i) => (
            <AccordionItem key={i.q} value={i.q} className="border-border">
              <AccordionTrigger className="text-sm text-white">{i.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{i.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <h2 className="mb-3 mt-8 font-display text-lg font-semibold">Resources</h2>
        <Card className="mb-3">
          <p className="font-display font-semibold">Professionals Success Center</p>
          <p className="mt-1 text-sm text-muted-foreground">Guides from our blog for families and small-business owners choosing the right coverage.</p>
        </Card>
        <h3 className="mb-2 font-display text-base font-semibold">Insurance 101</h3>
        <div className="space-y-2">
          {GLOSSARY.map((g) => (
            <Card key={g.term}>
              <p className="text-sm font-semibold">{g.term}</p>
              <p className="mt-1 text-sm text-muted-foreground">{g.def}</p>
            </Card>
          ))}
        </div>
      </div>
    </Screen>
  );
}
