import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button, Card, Field, Header, Input, Screen } from "@/components/kit";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/referral")({
  component: ReferralScreen,
});

function ReferralScreen() {
  const { referralCode, referralsSent, referralsConverted, sendReferral, pushToast } = useApp();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const link = `https://lcinsurancenow.com/r/${referralCode}`;

  return (
    <Screen padded={false}>
      <Header title="Refer a Friend" />
      <div className="space-y-4 px-4 pb-10">
        <Logo size={44} className="mx-auto" />
        <h2 className="font-display text-2xl font-bold">Give the Gift of Great Coverage</h2>
        <Card>
          <p className="text-xs uppercase tracking-wide text-dim">Your code</p>
          <p className="mt-1 font-display text-2xl font-bold tracking-wide">{referralCode}</p>
          <p className="mt-2 break-all text-xs text-muted-foreground">{link}</p>
          <Button
            className="mt-4"
            full
            onClick={async () => {
              if (navigator.share) {
                await navigator.share({ title: "Longevity Capital Insurance", text: "Get a quote with my agent.", url: link });
              } else {
                await navigator.clipboard?.writeText(link);
                pushToast("Referral link copied");
              }
            }}
          >
            Share
          </Button>
        </Card>
        <div className="grid grid-cols-3 gap-2">
          <Card className="text-center">
            <p className="font-display text-2xl font-bold">{referralsSent}</p>
            <p className="text-[11px] text-dim">Referrals Sent</p>
          </Card>
          <Card className="text-center">
            <p className="font-display text-2xl font-bold">{referralsConverted}</p>
            <p className="text-[11px] text-dim">Converted</p>
          </Card>
          <Card className="text-center">
            <p className="font-display text-2xl font-bold">{referralsConverted > 0 ? "Active" : "—"}</p>
            <p className="text-[11px] text-dim">Reward</p>
          </Card>
        </div>
        <Card>
          <p className="mb-3 font-display font-semibold">Send a direct invite</p>
          <Field label="Friend’s name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Phone or email">
            <Input value={contact} onChange={(e) => setContact(e.target.value)} />
          </Field>
          <Button
            variant="cta"
            full
            disabled={!name || !contact}
            onClick={() => {
              sendReferral();
              setName("");
              setContact("");
            }}
          >
            Send Invite
          </Button>
        </Card>
      </div>
    </Screen>
  );
}
