import { ArrowRight, ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { company } from "@/data/company";

export default function NotFound() {
  return (
    <section className="py-24 lg:py-36">
      <Container width="narrow">
        <p className="label-technical tabular flex items-center gap-3 text-copper-600">
          <span aria-hidden="true" className="h-px w-7 bg-copper/50" />
          Error 404
        </p>
        <h1 className="mt-5 text-[2rem] leading-[1.1] font-semibold tracking-[-0.024em] text-navy sm:text-[2.5rem]">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mt-5 max-w-lg text-[1.0625rem] leading-[1.7] text-slate">
          The link may be out of date, or the component may have been renamed.
          The full catalogue is the quickest way to find what you were looking
          for — or tell us the specification and we will point you to it.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/products" variant="primary" size="lg">
            Browse the catalogue
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary" size="lg">
            Contact our team
          </ButtonLink>
        </div>
        <p className="mt-8 text-[0.8125rem] text-slate">
          Or call us on{" "}
          <a
            href={company.phoneHref}
            className="tabular font-semibold text-navy hover:text-copper-600"
          >
            {company.phone}
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
