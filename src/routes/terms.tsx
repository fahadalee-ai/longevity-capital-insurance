import { createFileRoute } from "@tanstack/react-router";
import { Header, Screen } from "@/components/kit";
import { AGENCY } from "@/lib/mock-data";

export const Route = createFileRoute("/terms")({
  component: TermsScreen,
});

function TermsScreen() {
  return (
    <Screen padded={false}>
      <Header title="Terms & Conditions" />
      <article className="space-y-4 px-4 pb-10 text-sm leading-relaxed text-muted-foreground">
        <p>
          These Terms govern your use of the {AGENCY.name} customer application. This app is provided for
          policyholders and prospective clients of our licensed professional agency in Savannah, Georgia.
        </p>
        <p>
          Quotes submitted through the app are requests for review — they are not binders of coverage until a licensed
          agent confirms and a carrier issues a policy. Premiums, limits, and eligibility are subject to underwriting.
        </p>
        <p>
          You are responsible for the accuracy of information you provide. Misrepresentation may affect coverage. Claims
          filed in-app notify our agency so we can advocate with the carrier; they do not replace required carrier notice
          when a policy requires it.
        </p>
        <p>
          Contact {AGENCY.email} or {AGENCY.phone} with questions. Office: {AGENCY.address}.
        </p>
      </article>
    </Screen>
  );
}
