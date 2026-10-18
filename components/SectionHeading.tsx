import type { ReactNode } from "react";

/**
 * The one section header used across every page: uppercase technical eyebrow,
 * a rule, the heading, and optional supporting copy.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  children?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={[
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
      ].join(" ")}
    >
      {eyebrow ? (
        <div
          className={`label-technical mb-4 flex items-center gap-3 ${
            align === "center" ? "justify-center" : ""
          } ${dark ? "text-copper-light" : "text-copper-600"}`}
        >
          <span
            aria-hidden="true"
            className={`h-px w-7 ${dark ? "bg-copper/60" : "bg-copper/50"}`}
          />
          {eyebrow}
        </div>
      ) : null}
      <Tag
        className={`text-balance font-semibold ${
          Tag === "h1"
            ? "text-[2.125rem] leading-[1.1] sm:text-[2.75rem] lg:text-[3.25rem]"
            : "text-[1.75rem] leading-[1.15] sm:text-[2.125rem] lg:text-[2.375rem]"
        } ${dark ? "text-white" : "text-navy"}`}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={`mt-5 text-[1.0625rem] leading-[1.65] ${
            dark ? "text-navy-200" : "text-slate"
          }`}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
