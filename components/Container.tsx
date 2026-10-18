import type { ReactNode } from "react";

/**
 * The single content measure used site-wide. Every section goes through this
 * so column edges line up from the header to the footer.
 */
export function Container({
  children,
  className = "",
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "narrow" | "wide";
}) {
  const max =
    width === "narrow"
      ? "max-w-3xl"
      : width === "wide"
        ? "max-w-[1400px]"
        : "max-w-[1200px]";
  return (
    <div className={`mx-auto w-full ${max} px-4 sm:px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
