import type { ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes, InputHTMLAttributes } from "react";

const control =
  "w-full rounded-sm border bg-surface px-3.5 text-[0.9375rem] text-navy " +
  "placeholder:text-slate/70 transition-[border-color,box-shadow] duration-200 " +
  "focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/12 " +
  "disabled:bg-canvas disabled:text-slate";

export function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  className = "",
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline gap-1.5 text-[0.8125rem] font-semibold text-navy"
      >
        {label}
        {required ? (
          <span className="text-copper-600" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="text-[0.75rem] font-normal text-slate">
            (optional)
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-[0.75rem] font-medium text-copper-600"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5 shrink-0" fill="currentColor">
            <path d="M8 1.5 15 14H1L8 1.5Zm-.75 4.2.5 4.3h.5l.5-4.3h-1.5Zm0 5.5v1.3h1.5v-1.3h-1.5Z" />
          </svg>
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.75rem] text-slate">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  id,
  label,
  hint,
  error,
  required,
  className,
  ...rest
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <input
        id={id}
        name={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${control} h-11 ${error ? "border-copper" : "border-hairline-strong"}`}
        {...rest}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  id,
  label,
  hint,
  error,
  required,
  className,
  rows = 4,
  ...rest
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <textarea
        id={id}
        name={id}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${control} resize-y py-2.5 leading-relaxed ${error ? "border-copper" : "border-hairline-strong"}`}
        {...rest}
      />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
  ...rest
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <div className="relative">
        <select
          id={id}
          name={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={`${control} h-11 appearance-none pr-10 ${error ? "border-copper" : "border-hairline-strong"}`}
          {...rest}
        >
          {children}
        </select>
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3.5 size-3 -translate-y-1/2 text-slate"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" />
        </svg>
      </div>
    </FieldShell>
  );
}
