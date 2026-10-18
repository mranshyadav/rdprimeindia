import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-semibold " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 " +
  "ease-[cubic-bezier(0.22,0.61,0.36,1)] active:translate-y-px " +
  "disabled:pointer-events-none disabled:opacity-55 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white shadow-[0_1px_2px_rgb(20_40_61/0.18)] hover:bg-navy-700 hover:shadow-[0_4px_14px_-4px_rgb(20_40_61/0.35)]",
  // copper-600 ground, not plain copper: white on #c66b3d is only 3.77:1,
  // which would put every primary CTA on the site below AA.
  accent:
    "bg-copper-600 text-white shadow-[0_1px_2px_rgb(143_74_40/0.22)] hover:bg-copper-700 hover:shadow-[0_4px_14px_-4px_rgb(143_74_40/0.4)]",
  secondary:
    "border border-hairline-strong bg-surface text-navy hover:border-navy hover:bg-navy-50",
  ghost: "text-navy hover:bg-navy-50",
  onDark:
    "border border-white/25 bg-white/0 text-white hover:border-white/60 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.8125rem]",
  md: "h-11 px-5 text-[0.875rem]",
  lg: "h-[52px] px-7 text-[0.9375rem]",
};

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: Common & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  href,
  ...rest
}: Common & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  const external = /^(https?:|tel:|mailto:)/.test(href);
  if (external) {
    return (
      <a
        href={href}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`size-4 shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
    >
      <path d="M2.5 8h11M9.5 4l4 4-4 4" />
    </svg>
  );
}
