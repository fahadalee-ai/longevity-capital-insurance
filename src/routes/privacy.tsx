import { createFileRoute } from "@tanstack/react-router";
import { Header, Screen } from "@/components/kit";
import { AGENCY } from "@/lib/mock-data";

export const Route = createFileRoute("/privacy")({
  component: PrivacyScreen,
});

function PrivacyScreen() {
  return (
    <Screen padded={false}>
      <Header title="Privacy Policy" />
      <article className="space-y-4 px-4 pb-10 text-sm leading-relaxed text-muted-foreground">
        <p>
          {AGENCY.name} collects the personal information you submit — name, date of birth, contact details, household
          members, and documents needed to quote or service a policy.
        </p>
        <p>
          We share information with insurance carriers and service partners only as needed to shop coverage, bind
          policies, process claims, and communicate with you. We do not sell your personal information.
        </p>
        <p>
          You may update profile data, notification preferences, and payment methods in the app. To request a copy or
          deletion of your data, email {AGENCY.email}.
        </p>
        <p>Office: {AGENCY.address} · {AGENCY.phone}</p>
      </article>
    </Screen>
  );
}
