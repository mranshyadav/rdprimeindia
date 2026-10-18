/**
 * Industries served.
 *
 * An industry appears here ONLY when at least one product listing names it in
 * its own Usage/Application specification field. `evidence` lists those
 * products by slug so the claim is auditable from the page itself.
 *
 * No industry is listed on the strength of plausibility alone, and no named
 * customer or OEM relationship is claimed anywhere.
 */

import { products } from "./products";

export type Industry = {
  readonly slug: string;
  readonly name: string;
  /** The spec-field wording that puts this industry in scope. */
  readonly sourceField: string;
  readonly summary: string;
  /** What the relevant parts actually do in that setting. */
  readonly application: string;
  readonly image: string;
  readonly evidence: readonly string[];
};

export const industries: readonly Industry[] = [
  {
    slug: "automotive",
    name: "Automotive & Auto Components",
    sourceField: "Usage / Application: Automobile, Automobile Industry",
    summary:
      "The largest part of the catalogue — more listings name automobile or automobile-industry use in their own specification than any other sector.",
    application:
      "Sealing and anti-vibration duty on vehicle assemblies: O-rings and flange gaskets on bolted joints, stabilizer bar bushings locating anti-roll bars, grommets protecting looms where they pass through panels, and washers spreading fastener load. Custom moulded plastic and nylon parts are listed specifically for auto-parts assemblies.",
    image: "/products/stabilizer-bar-rubber-bushing.jpg",
    evidence: [
      "red-silicone-o-ring",
      "colored-rubber-gasket",
      "rubber-flange-gaskets",
      "silicone-rubber-o-ring",
      "silicone-rubber-products",
      "black-rubber-grommet",
      "silicone-rubber-grommet",
      "silicon-rubber-washer",
      "plastic-round-washer",
      "plastic-rubber-washers",
      "white-plastic-washer",
      "plastic-custom-molded-components",
    ],
  },
  {
    slug: "electrical",
    name: "Electrical Equipment",
    sourceField: "Usage / Application: Electrical",
    summary:
      "Insulating and cable-protection components for electrical assemblies and enclosures.",
    application:
      "Bushings and split bushings line the holes a conductor or shaft passes through, and plastic end caps close and insulate openings. The split bushing can be fitted over a cable already in place, which matters on retrofit and maintenance work where the run cannot be broken.",
    image: "/products/split-rubber-bushing.jpg",
    evidence: [
      "stabilizer-bar-rubber-bushing",
      "split-rubber-bushing",
      "black-plastic-end-cap",
    ],
  },
  {
    slug: "general-industrial",
    name: "General Industrial & Machinery",
    sourceField: "Usage / Application: Industrial",
    summary:
      "Static sealing and wear components for plant, machinery and fabricated assemblies.",
    application:
      "Industrial-duty O-rings and gaskets on static joints, and metal bush inserts that give a plastic housing a hard, wear-resistant bore where a fastener or shaft runs. The industrial O-ring listing carries the catalogue's lowest minimum order at 1,000 pieces, which suits maintenance and trial quantities.",
    image: "/products/metal-bush-for-plastic.jpg",
    evidence: ["rubber-o-ring", "epdm-rubber-gasket", "metal-bush-for-plastic"],
  },
  {
    slug: "hardware-fittings",
    name: "Hardware & Fittings",
    sourceField: "Usage / Application: Hardware Fitting",
    summary:
      "Cylindrical silicone bushes for hardware fitting assemblies.",
    application:
      "Silicone bushes seat between fixed and moving parts in a fitting to take up movement and keep contact faces apart, holding their properties over a wider temperature band than natural rubber.",
    image: "/products/industrial-rubber-bush-silicone.jpeg",
    evidence: ["industrial-rubber-bush-silicone"],
  },
  {
    slug: "printing",
    name: "Printing",
    sourceField: "Usage / Application: Printing Industry",
    summary:
      "Moulded silicone pads for printing industry equipment.",
    application:
      "A resilient silicone pad gives a compliant face or backing layer so pressure is carried evenly across the work. This listing is a rectangular pad at a 5 mm section.",
    image: "/products/silicone-rubber-plugs.jpg",
    evidence: ["square-rubber-pad"],
  },
  {
    slug: "packaging",
    name: "Packaging & Container Closures",
    sourceField: "Usage / Application: Edible Oil; Type: can caps",
    summary:
      "Round plastic can caps, listed by the company for edible oil containers.",
    application:
      "A moulded closure for can-type containers. Specification detail is limited in the source listing, so container neck dimensions should be confirmed with the works before ordering.",
    image: "/products/black-plastic-end-caps.jpg",
    evidence: ["black-plastic-end-caps-can"],
  },
];

export const industryBySlug = (slug: string): Industry | undefined =>
  industries.find((i) => i.slug === slug);

/** Resolves an industry's evidence slugs to full product records. */
export const evidenceProducts = (industry: Industry) =>
  industry.evidence
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
