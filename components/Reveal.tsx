"use client";

import { useCallback, useRef, type ElementType, type ReactNode } from "react";

/**
 * Gentle one-shot entrance on scroll.
 *
 * The observer flips a `data-shown` attribute on the element directly rather
 * than going through React state — the reveal is a presentational detail, so
 * there is nothing for React to re-render, and no cascading render on mount.
 *
 * Content is in the DOM and readable from first paint: this only animates
 * opacity and transform, and the `prefers-reduced-motion` rule in globals.css
 * neutralises it entirely.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const observer = useRef<IntersectionObserver | null>(null);

  const attach = useCallback((el: HTMLElement | null) => {
    observer.current?.disconnect();
    observer.current = null;
    if (!el) return;

    const show = () => el.setAttribute("data-shown", "true");

    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      show();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            io.disconnect();
          }
        }
      },
      // Positive bottom margin fires the reveal just BEFORE the element
      // enters the viewport, so a fast scroll never lands on blank space.
      { rootMargin: "0px 0px 15% 0px", threshold: 0 },
    );
    io.observe(el);
    observer.current = io;

    return () => {
      io.disconnect();
      observer.current = null;
    };
  }, []);

  return (
    <Tag
      ref={attach}
      className={`reveal ${className}`}
      data-shown="false"
      style={
        delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined
      }
    >
      {children}
    </Tag>
  );
}
