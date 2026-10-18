import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { Container } from "./Container";
import { PageHero } from "./PageHero";

/** Shared shell and prose styling for the two legal pages. */
export function LegalPage({
  eyebrow,
  title,
  description,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <Breadcrumbs trail={[{ label: title }]} />
      <section className="py-14 lg:py-20">
        <Container width="narrow">
          <p className="label-technical border-b border-hairline pb-4 text-slate">
            Last updated · {updated}
          </p>
          <div
            className={[
              "mt-10 space-y-6 text-[0.9375rem] leading-[1.75] text-graphite",
              "[&_h2]:mt-12 [&_h2]:text-[1.1875rem] [&_h2]:font-bold [&_h2]:text-navy",
              "[&_h2:first-child]:mt-0",
              "[&_ul]:space-y-2.5 [&_ul]:pl-5 [&_li]:list-disc [&_li]:marker:text-hairline-strong",
              "[&_a]:font-medium [&_a]:text-navy [&_a]:underline [&_a]:decoration-hairline-strong [&_a]:underline-offset-2 [&_a:hover]:decoration-copper",
              "[&_strong]:font-semibold [&_strong]:text-navy",
            ].join(" ")}
          >
            {children}
          </div>
        </Container>
      </section>
    </>
  );
}
