import { company } from "@/data/company";
import { ArrowRight, ButtonLink } from "./Button";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function CtaSection({
  eyebrow = "Next Step",
  title = "Let’s discuss your industrial requirements.",
  description = "Connect with our team to enquire about products, specifications, availability and pricing.",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-navy-700 bg-navy text-white">
      <div aria-hidden="true" className="bg-blueprint absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(85%_130%_at_12%_100%,rgba(66,118,161,0.20),transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(70%_110%_at_92%_0%,rgba(198,107,61,0.14),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper/50 to-transparent"
      />
      <Container>
        <Reveal className="relative py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-7">
              <p className="label-technical mb-5 flex items-center gap-3 text-copper-light">
                <span aria-hidden="true" className="h-px w-7 bg-copper/60" />
                {eyebrow}
              </p>
              <h2 className="text-[1.875rem] leading-[1.12] font-semibold tracking-[-0.022em] text-white sm:text-[2.375rem] lg:text-[2.75rem]">
                {title}
              </h2>
              <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.65] text-navy-200">
                {description}
              </p>
            </div>

            <div className="lg:col-span-5 lg:pb-2">
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <ButtonLink href="/request-a-quote" variant="accent" size="lg">
                  Request a Quote
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href="/contact" variant="onDark" size="lg">
                  Contact Our Team
                </ButtonLink>
              </div>
              <p className="mt-6 text-[0.8125rem] text-navy-200 lg:text-right">
                Or speak to us directly —{" "}
                <a
                  href={company.phoneHref}
                  className="tabular font-semibold text-white underline decoration-copper decoration-2 underline-offset-4 hover:text-copper-light"
                >
                  {company.phone}
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
