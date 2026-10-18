import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { addressOneLine, company } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How RD Prime India handles the information you submit through enquiry and quote request forms on this website.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="What we collect when you contact us, what we do with it, and what we do not do with it."
      updated="11 October 2026"
    >
      <h2>Who we are</h2>
      <p>
        This website is operated by <strong>{company.legalName}</strong>, a{" "}
        {company.legalStatus.toLowerCase()} established in{" "}
        {company.establishedYear} and registered under GSTIN {company.gstin}, at{" "}
        {addressOneLine}. For any question about this policy, call{" "}
        <a href={company.phoneHref}>{company.phone}</a>.
      </p>

      <h2>What we collect</h2>
      <p>
        We collect only what you type into an enquiry or quote request form on
        this site:
      </p>
      <ul>
        <li>Your name and company name</li>
        <li>Your business email address and phone number</li>
        <li>
          The product, quantity, specifications and any additional requirements
          you describe
        </li>
      </ul>
      <p>
        We do not run advertising trackers, analytics profiling or
        third-party marketing pixels on this site, and we do not set cookies for
        those purposes.
      </p>

      <h2>Why we collect it</h2>
      <p>
        Solely to respond to your enquiry — to prepare a quotation, confirm a
        specification, and coordinate an order if you place one. We do not use
        your details for unrelated marketing, and we do not sell, rent or trade
        them.
      </p>

      <h2>How it reaches us</h2>
      <p>
        Form submissions are transmitted over an encrypted connection to our
        email or enquiry system. Depending on configuration, a transactional
        email provider may process the message in order to deliver it to us.
        That provider acts on our instruction and only for delivery.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry correspondence for as long as needed to deal with your
        enquiry and any resulting order, and thereafter for as long as our
        statutory and tax record-keeping obligations in India require. You can
        ask us to delete correspondence that we are not obliged to retain.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us what enquiry information we hold about you, ask us to
        correct it, or ask us to delete it. Contact us on{" "}
        <a href={company.phoneHref}>{company.phone}</a> and we will deal with
        the request directly.
      </p>

      <h2>Security</h2>
      <p>
        Submissions are rate-limited and screened for automated spam. We take
        reasonable care with the information you send us, but no transmission
        over the internet can be guaranteed completely secure. Please do not
        send us payment card details, passwords or identity documents through
        this website.
      </p>

      <h2>Children</h2>
      <p>
        This is a business-to-business website. It is not directed at children
        and we do not knowingly collect information from them.
      </p>

      <h2>Changes</h2>
      <p>
        If we change how we handle enquiry information, we will update this page
        and the &ldquo;last updated&rdquo; date above.
      </p>
    </LegalPage>
  );
}
