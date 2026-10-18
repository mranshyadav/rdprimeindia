import type { Spec } from "@/data/products";

/**
 * Specification table. Values are tabular-aligned and rendered exactly as the
 * company published them — the `note` slot carries any source inconsistency
 * rather than the data being silently corrected.
 */
export function SpecTable({
  specs,
  note,
  caption,
}: {
  specs: readonly Spec[];
  note?: string;
  caption?: string;
}) {
  if (specs.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-hairline-strong bg-canvas p-6">
        <p className="text-[0.9375rem] leading-relaxed text-slate">
          The company has not published a specification table for this listing.
          Send your dimensions, material and quantity with an enquiry and the
          works will confirm what can be supplied.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-md border border-hairline bg-surface">
        {caption ? (
          <div className="label-technical border-b border-hairline bg-canvas px-5 py-3.5 text-navy">
            {caption}
          </div>
        ) : null}
        <table className="w-full border-collapse text-left">
          <tbody>
            {specs.map((spec, i) => (
              <tr
                key={spec.label}
                className={i % 2 === 1 ? "bg-canvas/60" : undefined}
              >
                <th
                  scope="row"
                  className="w-[48%] border-b border-hairline px-5 py-3.5 align-top text-[0.8125rem] font-medium text-slate last:border-0 sm:w-[42%]"
                >
                  {spec.label}
                </th>
                <td className="tabular border-b border-hairline px-5 py-3.5 align-top text-[0.875rem] font-semibold text-navy last:border-0">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {note ? (
        <p className="mt-3 flex gap-2.5 rounded-sm border-l-2 border-copper bg-copper-50 px-4 py-3 text-[0.8125rem] leading-relaxed text-graphite">
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="mt-px size-4 shrink-0 text-copper-600"
            fill="currentColor"
          >
            <path d="M8 1.5 15 14H1L8 1.5Zm0 3.8-.75 4.9h1.5L9.5 5.3h-3Zm-.75 6.2v1.4h1.5v-1.4h-1.5Z" />
          </svg>
          <span>
            <strong className="font-semibold">Source note:</strong> {note}
          </span>
        </p>
      ) : null}
    </div>
  );
}
