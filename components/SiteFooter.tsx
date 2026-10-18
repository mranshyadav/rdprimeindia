import Link from "next/link";
import {
  addressOneLine,
  company,
  emailHref,
  whatsappHref,
} from "@/data/company";
import { categories } from "@/data/products";
import { Container } from "./Container";
import { Logo } from "./Logo";

const columns = [
  {
    heading: "Products",
    links: [
      ...categories.map((c) => ({
        href: `/products?category=${c.id}`,
        label: c.name,
      })),
      { href: "/products", label: "Full Catalogue" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/manufacturing", label: "Manufacturing & Quality" },
      { href: "/industries", label: "Industries Served" },
      { href: "/contact", label: "Contact Us" },
      { href: "/request-a-quote", label: "Request a Quote" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-navy-700 bg-navy text-navy-200">
      <Container>
        <div className="grid gap-12 py-14 lg:grid-cols-12 lg:gap-8 lg:py-16">
          {/* Identity */}
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-[0.875rem] leading-[1.7]">
              Manufacturer of moulded rubber and plastic components — O-rings,
              gaskets, bushes, grommets, washers and parts built to buyer
              requirement — from {company.address.city},{" "}
              {company.address.state}.
            </p>
            <dl className="mt-7 space-y-1.5 text-[0.75rem]">
              <div className="flex gap-2">
                <dt className="label-technical w-[5.5rem] shrink-0 pt-px text-navy-200/75">
                  GSTIN
                </dt>
                <dd className="tabular text-white">{company.gstin}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="label-technical w-[5.5rem] shrink-0 pt-px text-navy-200/75">
                  Est.
                </dt>
                <dd className="tabular text-white">
                  {company.establishedYear} · {company.legalStatus}
                </dd>
              </div>
            </dl>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="lg:col-span-2">
              <h2 className="label-technical text-white">{col.heading}</h2>
              {/* py-1 on the link + a smaller gap: same rhythm, 25px targets */}
              <ul className="mt-5 space-y-1">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block py-1 text-[0.875rem] transition-colors hover:text-copper-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div className="lg:col-span-4">
            <h2 className="label-technical text-white">Contact</h2>
            <address className="mt-5 space-y-5 text-[0.875rem] not-italic">
              <div>
                <p className="label-technical mb-2 text-navy-200/75">Works &amp; Office</p>
                <p className="leading-[1.7]">{addressOneLine}</p>
              </div>
              <div>
                <p className="label-technical mb-2 text-navy-200/75">Enquiries</p>
                <a
                  href={company.phoneHref}
                  className="tabular block font-semibold text-white transition-colors hover:text-copper-light"
                >
                  {company.phone}
                </a>
                {emailHref ? (
                  <a
                    href={emailHref}
                    className="mt-1 block transition-colors hover:text-copper-light"
                  >
                    {company.email}
                  </a>
                ) : null}
                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block transition-colors hover:text-copper-light"
                  >
                    WhatsApp
                  </a>
                ) : null}
                <a
                  href={company.indiamartUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block transition-colors hover:text-copper-light"
                >
                  IndiaMART listing
                </a>
              </div>
              <div>
                <p className="label-technical mb-2 text-navy-200/75">Contact Person</p>
                <p className="text-white">
                  {company.owner}
                  <span className="text-navy-200"> · {company.ownerTitle}</span>
                </p>
              </div>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-navy-700 py-7 text-[0.75rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}. All rights
            reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-6">
            <Link
              href="/privacy-policy"
              className="inline-block py-1.5 transition-colors hover:text-copper-light"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="inline-block py-1.5 transition-colors hover:text-copper-light"
            >
              Terms &amp; Conditions
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
