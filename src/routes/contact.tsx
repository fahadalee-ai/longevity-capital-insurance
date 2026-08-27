import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Button, Card, Header, LinkButton, Screen } from "@/components/kit";
import { AGENCY, IMAGES } from "@/lib/mock-data";

export const Route = createFileRoute("/contact")({
  component: ContactScreen,
});

function ContactScreen() {
  return (
    <Screen padded={false}>
      <Header title="Contact Us" />
      <div className="space-y-4 px-4 pb-10">
        <Card>
          <Logo size={52} className="mx-auto mb-3" />
          <p className="font-display text-lg font-semibold">{AGENCY.name}</p>
          <p className="mt-2 text-sm leading-relaxed">{AGENCY.address}</p>
          <a href={AGENCY.mapUrl} target="_blank" rel="noreferrer">
            <img src={IMAGES.office} alt="Map thumbnail of the Abercorn Street office" className="mt-3 h-36 w-full rounded-md object-cover" />
          </a>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-3"><dt className="text-dim">Phone</dt><dd>{AGENCY.phone}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-dim">Mobile</dt><dd>{AGENCY.mobile}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-dim">Email</dt><dd className="text-right">{AGENCY.email}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-dim">Hours</dt><dd className="text-right">{AGENCY.hoursWeekday}<br />{AGENCY.hoursWeekend}</dd></div>
          </dl>
        </Card>
        <div className="grid grid-cols-2 gap-2">
          <a href={`tel:${AGENCY.phoneTel}`}><Button variant="cta" full>Call</Button></a>
          <a href={`mailto:${AGENCY.email}`}><Button full>Email</Button></a>
          <a href={AGENCY.mapUrl} target="_blank" rel="noreferrer"><Button variant="outline" full>Get Directions</Button></a>
          <LinkButton to="/appointments/book" variant="outline" full>Book Consultation</LinkButton>
        </div>
        <div className="flex justify-center gap-6 pt-2">
          <a href={AGENCY.facebook} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary">Facebook</a>
          <a href={AGENCY.instagram} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary">Instagram</a>
        </div>
      </div>
    </Screen>
  );
}
