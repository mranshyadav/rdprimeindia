import Link from "next/link";
import { Container } from "./Container";

export type Crumb = { href?: string; label: string };

export function Breadcrumbs({ trail }: { trail: readonly Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-hairline bg-surface">
      <Container>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 py-3.5 text-[0.75rem]">
          <li>
            <Link href="/" className="text-slate transition-colors hover:text-navy">
              Home
            </Link>
          </li>
          {trail.map((crumb, i) => (
            <li key={crumb.label} className="flex items-center gap-2">
              <svg viewBox="0 0 12 12" aria-hidden="true" className="size-2.5 text-hairline-strong" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 2.5 7.5 6 4 9.5" />
              </svg>
              {crumb.href && i < trail.length - 1 ? (
                <Link href={crumb.href} className="text-slate transition-colors hover:text-navy">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-navy">
                  {crumb.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  );
}
