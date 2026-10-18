import type { ReactNode } from "react";
import { Container } from "./Container";

/**
 * The shared interior-page header. Keeps every page below the homepage on the
 * same vertical rhythm and the same navy-on-blueprint treatment.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="bg-blueprint absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(90%_120%_at_88%_0%,rgba(66,118,161,0.20),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-copper/40 to-transparent"
      />
      <Container>
        <div className="relative py-14 lg:py-20">
          <p className="label-technical mb-5 flex items-center gap-3 text-copper-light">
            <span aria-hidden="true" className="h-px w-7 bg-copper/60" />
            {eyebrow}
          </p>
          <h1 className="max-w-3xl text-[2rem] leading-[1.1] font-semibold tracking-[-0.024em] sm:text-[2.625rem] lg:text-[3rem]">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.65] text-navy-200">
              {description}
            </p>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  );
}
