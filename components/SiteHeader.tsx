"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { company } from "@/data/company";
import { navigation } from "@/lib/site";
import { ArrowRight, ButtonLink } from "./Button";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    // Deferred so the first read happens in a callback, not synchronously
    // during the effect — it also covers a restored scroll position.
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /**
   * Navigation closes the drawer and the mega menu. Handled on click rather
   * than by reacting to a pathname change, so there is no render cascade and
   * the surface closes on the same frame as the tap.
   */
  const closeSurfaces = () => {
    setDrawerOpen(false);
    setOpenMenu(null);
  };

  // Lock the page behind the mobile drawer, and allow Escape to dismiss.
  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <>
      {/* Utility strip — the fastest route to a human, above everything else */}
      <div className="hidden border-b border-navy-700 bg-navy text-white lg:block">
        <Container>
          <div className="flex h-9 items-center justify-between text-[0.75rem]">
            <p className="text-navy-200">
              Manufacturer of moulded rubber &amp; plastic components ·{" "}
              {company.address.city}, {company.address.state}
            </p>
            <div className="flex items-center gap-5">
              <span className="tabular text-navy-200">
                GSTIN {company.gstin}
              </span>
              <a
                href={company.phoneHref}
                className="flex items-center gap-1.5 font-semibold hover:text-copper-light"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5" fill="currentColor">
                  <path d="M3.3 1.5a1.4 1.4 0 0 1 1.95.33l1.2 1.7a1.4 1.4 0 0 1-.17 1.8l-.63.63a9.3 9.3 0 0 0 3.56 3.56l.63-.63a1.4 1.4 0 0 1 1.8-.17l1.7 1.2a1.4 1.4 0 0 1 .33 1.95l-.9 1.25c-.4.56-1.1.82-1.77.62A14.3 14.3 0 0 1 1.43 4.37c-.2-.67.06-1.37.62-1.77l1.25-.9Z" />
                </svg>
                <span className="tabular">{company.phone}</span>
              </a>
            </div>
          </div>
        </Container>
      </div>

      <header
        className={`sticky top-0 z-50 border-b bg-surface/95 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
          scrolled
            ? "border-hairline-strong shadow-[0_1px_3px_rgb(20_40_61/0.07)]"
            : "border-hairline"
        }`}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-6 lg:h-[72px]">
            <Logo />

            {/* Desktop navigation */}
            <nav
              aria-label="Primary"
              className="hidden items-center gap-0.5 xl:flex"
            >
              {navigation.map((item) =>
                item.children ? (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => {
                      cancelClose();
                      setOpenMenu(item.href);
                    }}
                    onMouseLeave={scheduleClose}
                  >
                    <Link
                      href={item.href}
                      onClick={closeSurfaces}
                      aria-expanded={openMenu === item.href}
                      onFocus={() => {
                        cancelClose();
                        setOpenMenu(item.href);
                      }}
                      className={`flex items-center gap-1.5 rounded-sm px-2.5 py-2 text-[0.875rem] font-medium whitespace-nowrap transition-colors ${
                        isActive(item.href)
                          ? "text-navy"
                          : "text-graphite hover:text-navy"
                      }`}
                    >
                      {item.label}
                      <svg
                        viewBox="0 0 12 12"
                        aria-hidden="true"
                        className={`size-3 transition-transform duration-200 ${
                          openMenu === item.href ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <path d="M2.5 4.5 6 8l3.5-3.5" />
                      </svg>
                    </Link>

                    {openMenu === item.href ? (
                      <div
                        className="absolute top-full left-1/2 w-[640px] -translate-x-1/2 pt-3"
                        onMouseEnter={cancelClose}
                        onMouseLeave={scheduleClose}
                      >
                        <div className="overflow-hidden rounded-md border border-hairline bg-surface shadow-[0_2px_4px_rgb(20_40_61/0.05),0_24px_48px_-16px_rgb(20_40_61/0.22)]">
                          <div className="grid grid-cols-2 gap-1 p-3">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={closeSurfaces}
                                className="group rounded-sm p-3.5 transition-colors hover:bg-canvas"
                              >
                                <span className="flex items-center justify-between gap-2 text-[0.875rem] font-semibold text-navy">
                                  {child.label}
                                  <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                                </span>
                                <span className="mt-1.5 block text-[0.75rem] leading-[1.55] text-slate">
                                  {child.description}
                                </span>
                              </Link>
                            ))}
                          </div>
                          <div className="flex items-center justify-between border-t border-hairline bg-canvas px-5 py-3">
                            <p className="text-[0.75rem] text-slate">
                              Need help identifying the right component?
                            </p>
                            <Link
                              href="/contact"
                              onClick={closeSurfaces}
                              className="text-[0.75rem] font-semibold text-copper-600 hover:underline"
                            >
                              Talk to our team
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeSurfaces}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`rounded-sm px-2.5 py-2 text-[0.875rem] font-medium whitespace-nowrap transition-colors ${
                      isActive(item.href)
                        ? "text-navy"
                        : "text-graphite hover:text-navy"
                    }`}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="flex items-center gap-2.5">
              {/* The show/hide lives on a wrapper, not on the button itself:
                  the button's own base class sets `inline-flex`, and two
                  display utilities on one element resolve by CSS source order
                  rather than by the order written here — so a `hidden` on the
                  button is not reliably applied. */}
              <div className="hidden 2xl:block">
                <ButtonLink href="/contact" variant="ghost" size="sm">
                  Talk to Our Team
                </ButtonLink>
              </div>
              <div className="hidden sm:block">
                <ButtonLink href="/request-a-quote" variant="accent" size="sm">
                  Request a Quote
                </ButtonLink>
              </div>

              <a
                href={company.phoneHref}
                aria-label={`Call ${company.shortName} on ${company.phone}`}
                className="flex size-10 items-center justify-center rounded-sm border border-hairline-strong text-navy transition-colors hover:border-navy hover:bg-navy-50 sm:hidden"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4" fill="currentColor">
                  <path d="M3.3 1.5a1.4 1.4 0 0 1 1.95.33l1.2 1.7a1.4 1.4 0 0 1-.17 1.8l-.63.63a9.3 9.3 0 0 0 3.56 3.56l.63-.63a1.4 1.4 0 0 1 1.8-.17l1.7 1.2a1.4 1.4 0 0 1 .33 1.95l-.9 1.25c-.4.56-1.1.82-1.77.62A14.3 14.3 0 0 1 1.43 4.37c-.2-.67.06-1.37.62-1.77l1.25-.9Z" />
                </svg>
              </a>

              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={drawerOpen}
                className="flex size-10 items-center justify-center rounded-sm border border-hairline-strong text-navy transition-colors hover:border-navy hover:bg-navy-50 xl:hidden"
              >
                <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square">
                  <path d="M3 6h14M3 10h14M3 14h14" />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile drawer */}
      <div
        // overflow-hidden guarantees the off-screen (translate-x-full) drawer
        // can never widen the document.
        className={`fixed inset-0 z-[60] overflow-hidden xl:hidden ${
          drawerOpen ? "" : "pointer-events-none"
        }`}
        aria-hidden={!drawerOpen}
      >
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-navy-900/55 backdrop-blur-sm transition-opacity duration-300 ${
            drawerOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          role="dialog"
          aria-modal={drawerOpen}
          aria-label="Site navigation"
          className={`absolute inset-y-0 right-0 flex w-[min(21rem,88vw)] flex-col bg-surface shadow-[0_0_60px_rgb(13_27_41/0.3)] transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-hairline px-5">
            <Logo />
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation menu"
              className="flex size-10 items-center justify-center rounded-sm text-navy hover:bg-canvas"
            >
              <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square">
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
            <ul className="space-y-0.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeSurfaces}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`flex min-h-12 items-center justify-between rounded-sm px-3 text-[0.9375rem] font-semibold ${
                      isActive(item.href)
                        ? "bg-navy-50 text-navy"
                        : "text-graphite"
                    }`}
                  >
                    {item.label}
                    <ArrowRight className="size-3.5 text-slate" />
                  </Link>
                  {item.children ? (
                    <ul className="mt-1 mb-2 ml-3 space-y-0.5 border-l border-hairline pl-3">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            onClick={closeSurfaces}
                            className="flex min-h-11 items-center text-[0.875rem] text-slate hover:text-navy"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-2.5 border-t border-hairline bg-canvas p-5">
            <ButtonLink
              href="/request-a-quote"
              onClick={closeSurfaces}
              variant="accent"
              size="md"
              className="w-full"
            >
              Request a Quote
            </ButtonLink>
            <ButtonLink href={company.phoneHref} variant="secondary" size="md" className="w-full">
              Call {company.phone}
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
