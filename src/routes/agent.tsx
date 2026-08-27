import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Button, Card, Header, LinkButton, Screen } from "@/components/kit";
import { AGENCY, IMAGES, seedAgent } from "@/lib/mock-data";

export const Route = createFileRoute("/agent")({
  component: AgentScreen,
});

function AgentScreen() {
  const agent = seedAgent;
  return (
    <Screen padded={false}>
      <Header title="Call / Email Agent" />
      <div className="space-y-4 px-4 pb-10">
        <Card className="text-center">
          <img src={agent.photo} alt="" className="mx-auto h-20 w-20 rounded-lg object-cover" />
          <p className="mt-3 font-display text-xl font-semibold">{agent.name}</p>
          <p className="text-sm text-muted-foreground">{agent.title} · {agent.license}</p>
          <p className="mt-1 text-sm text-dim">{agent.phone}</p>
        </Card>
        <a href={`tel:${agent.phoneTel}`}>
          <Button variant="cta" full>Call Now</Button>
        </a>
        <a href={`mailto:${agent.email}`}>
          <Button variant="outline" full>Email</Button>
        </a>
        <Card>
          <Logo size={40} className="mx-auto mb-3" />
          <p className="text-xs uppercase tracking-wide text-dim">Office</p>
          <p className="mt-2 text-sm">{AGENCY.address}</p>
          <p className="mt-1 text-sm text-muted-foreground">{AGENCY.hoursWeekday}</p>
          <p className="text-sm text-muted-foreground">{AGENCY.hoursWeekend}</p>
          <img src={IMAGES.office} alt="Office" className="mt-3 h-28 w-full rounded-md object-cover" />
          <LinkButton to="/contact" variant="outline" className="mt-3" full>Office details</LinkButton>
        </Card>
      </div>
    </Screen>
  );
}
