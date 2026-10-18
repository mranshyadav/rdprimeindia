import Link from "next/link";
import { company } from "@/data/company";

/**
 * Wordmark. The mark is a sectioned ring — a direct reference to the O-ring
 * and gasket cross-sections that make up most of the catalogue.
 */
export function Logo({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label={`${company.shortName} — home`}
    >
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="size-9 shrink-0"
        fill="none"
      >
        <rect
          width="40"
          height="40"
          rx="3"
          fill={light ? "#ffffff" : "#14283d"}
        />
        <circle
          cx="20"
          cy="20"
          r="12.5"
          stroke={light ? "#14283d" : "#ffffff"}
          strokeOpacity="0.22"
          strokeWidth="1"
        />
        <circle
          cx="20"
          cy="20"
          r="9"
          stroke={light ? "#14283d" : "#ffffff"}
          strokeWidth="3.25"
        />
        <path
          d="M20 11v4.5M20 24.5V29"
          stroke={light ? "#ffffff" : "#14283d"}
          strokeWidth="3.25"
        />
        <circle cx="20" cy="20" r="2.25" fill="#c66b3d" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-[family-name:var(--font-display)] text-[1.0625rem] font-extrabold tracking-[-0.015em] whitespace-nowrap ${
            light ? "text-white" : "text-navy"
          }`}
        >
          RD Prime India
        </span>
        <span
          // Hidden on the narrowest phones: with the wordmark set nowrap, the
          // descriptor is what pushes the header past the viewport at 390px.
          className={`label-technical mt-1 hidden text-[0.5625rem] whitespace-nowrap sm:block ${
            light ? "text-navy-200" : "text-slate"
          }`}
        >
          Rubber &amp; Plastic Components
        </span>
      </span>
    </Link>
  );
}
