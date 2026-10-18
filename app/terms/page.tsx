import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { addressOneLine, company } from "@/data/company";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms governing use of the RD Prime India website, including how product information, specifications and quotations should be treated.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      description="The basis on which this website and the information on it are provided."
      updated="11 October 2026"
    >
      <h2>These terms</h2>
      <p>
        This website is operated by <strong>{company.legalName}</strong> (
        &ldquo;we&rdquo;, &ldquo;us&rdquo;), {company.legalStatus.toLowerCase()},
        GSTIN {company.gstin}, of {addressOneLine}. By using the site you accept
        these terms.
      </p>

      <h2>Product information and specifications</h2>
      <p>
        The specifications shown against each product listing are the figures we
        publish for that component. They are provided to help you assess
        suitability and are <strong>not a warranty of performance</strong> in
        your particular application. Where a published figure is internally
        inconsistent, we flag it on the product page and ask you to confirm with
        us; please do so before ordering.
      </p>
      <p>
        You are responsible for satisfying yourself that a component suits your
        application, including any temperature, chemical, load or regulatory
        requirement specific to it. We are happy to advise, but advice given
        without full knowledge of your assembly is not a substitute for your own
        validation.
      </p>

      <h2>Pricing and quotations</h2>
      <p>
        No prices are published on this website. Pricing is quotation-based and
        depends on specification, volume and packaging. A quotation we issue is
        valid for the period stated on it, applies to the specification and
        quantity stated on it, and is exclusive of taxes and freight unless it
        says otherwise.
      </p>
      <p>
        Submitting an enquiry or a quote request through this site does not
        create a contract. An order exists only once we have confirmed it in
        writing.
      </p>

      <h2>Minimum order quantities</h2>
      <p>
        Minimum order quantities shown against listings apply per specification.
        Where you need a quantity below the stated minimum, ask — we will tell
        you whether it is possible rather than leave you guessing.
      </p>

      <h2>What we do not claim</h2>
      <p>
        We do not hold any product or quality-system certification, do not
        operate laboratory testing, and do not issue material or test
        certificates. Nothing on this website should be read as a claim to any
        of those. Our{" "}
        <a href="/manufacturing">Manufacturing &amp; Quality</a> page sets this
        out in full.
      </p>

      <h2>Website content and images</h2>
      <p>
        Product photography on this site is our own. The text, layout, design
        and code of the site are ours or licensed to us. You may not reproduce
        them commercially without our written permission.
      </p>

      <h2>Availability</h2>
      <p>
        We aim to keep this site available and accurate but do not guarantee
        uninterrupted access, and we may change or withdraw listings without
        notice. Where a form cannot be delivered for a technical reason, the
        site tells you so and shows our phone number rather than implying your
        message was received.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent permitted by law, we are not liable for indirect or
        consequential loss arising from use of this website or reliance on
        information published on it. Nothing here limits any liability that
        cannot lawfully be limited.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India. The courts at Mathura,
        Uttar Pradesh have jurisdiction over any dispute arising from them.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: call{" "}
        <a href={company.phoneHref}>{company.phone}</a> and ask for{" "}
        {company.owner}.
      </p>
    </LegalPage>
  );
}
