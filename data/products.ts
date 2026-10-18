/**
 * Product catalogue for R D Prime India.
 *
 * Every `specs` entry is copied verbatim from the company's own IndiaMART
 * specification tables (see docs/VERIFIED-COMPANY-FACTS.md §5). `summary` and
 * `overview` describe the component type in neutral engineering terms and
 * restate those specs — they never attribute a capability, certification,
 * tolerance or test to the company that the company has not published.
 *
 * `sourceNote` flags values that are internally inconsistent in the source
 * listing. These are reproduced as published rather than quietly corrected,
 * and the UI surfaces the note next to the specification table.
 *
 * Unit prices exist on IndiaMART but are deliberately not published here:
 * the site is quotation-based, and stale prices damage credibility.
 */

import type { AccentName } from "@/lib/accents";

export type Spec = { readonly label: string; readonly value: string };

export type CategoryId =
  | "o-rings-gaskets"
  | "bushes-bushings"
  | "grommets-plugs-caps"
  | "washers-pads"
  | "moulded-components";

export type Category = {
  readonly id: CategoryId;
  readonly name: string;
  readonly shortName: string;
  readonly blurb: string;
  readonly image: string;
  /** Wayfinding hue carried from tile to filter to product page. */
  readonly accent: AccentName;
};

export type Product = {
  readonly slug: string;
  readonly name: string;
  readonly category: CategoryId;
  /** The category the listing sits in on the company's IndiaMART profile. */
  readonly sourceCategory: string;
  readonly image: string;
  readonly imageWidth: number;
  readonly imageHeight: number;
  readonly imageAlt: string;
  readonly gallery?: readonly string[];
  /** One line for cards — technically accurate, no superlatives. */
  readonly summary: string;
  /** Two or three sentences for the detail page. */
  readonly overview: string;
  readonly specs: readonly Spec[];
  readonly moq?: string;
  readonly materials?: readonly string[];
  readonly applications?: readonly string[];
  /** True only where the listing explicitly states build-to-requirement. */
  readonly customisable?: boolean;
  readonly sourceNote?: string;
  readonly featured?: boolean;
};

export const categories: readonly Category[] = [
  {
    id: "o-rings-gaskets",
    name: "O-Rings & Gaskets",
    shortName: "O-Rings & Gaskets",
    blurb:
      "Round-section O-rings, flat gaskets and flange gaskets in silicone, nitrile and EPDM.",
    image: "/products/rubber-o-ring.jpg",
    accent: "copper",
  },
  {
    id: "bushes-bushings",
    name: "Bushes & Bushings",
    shortName: "Bushes & Bushings",
    blurb:
      "Cylindrical and split bushings in natural and silicone rubber, plus metal inserts.",
    image: "/products/industrial-rubber-bush.jpg",
    accent: "steel",
  },
  {
    id: "grommets-plugs-caps",
    name: "Grommets, Plugs & End Caps",
    shortName: "Grommets & Caps",
    blurb:
      "Panel grommets, sealing plugs, and rubber and plastic caps for tube and pipe ends.",
    image: "/products/silicone-rubber-grommet.jpg",
    accent: "teal",
  },
  {
    id: "washers-pads",
    name: "Washers & Pads",
    shortName: "Washers & Pads",
    blurb:
      "Flat sealing and load-spreading washers in silicone and plastic, and moulded pads.",
    image: "/products/plastic-rubber-washers.jpg",
    accent: "moss",
  },
  {
    id: "moulded-components",
    name: "Custom Moulded Components",
    shortName: "Custom Moulded",
    blurb:
      "Parts moulded to your drawing — engineering plastics, nylon and multi-colour components.",
    image: "/products/plastic-custom-molded-components.jpg",
    accent: "ochre",
  },
];

export const categoryById = (id: CategoryId): Category =>
  categories.find((c) => c.id === id) ?? categories[0];

export const products: readonly Product[] = [
  // ───────────────────────────── O-Rings & Gaskets ─────────────────────────
  {
    slug: "red-silicone-o-ring",
    name: "Red Silicone O Ring",
    category: "o-rings-gaskets",
    sourceCategory: "Rubber Gasket",
    image: "/products/red-silicone-o-ring.jpg",
    imageWidth: 1000,
    imageHeight: 809,
    imageAlt:
      "Red silicone O-rings of round cross-section, supplied by R D Prime India",
    summary:
      "Round-section silicone O-ring, 10 mm thickness, 60 shore hardness, for automobile sealing.",
    overview:
      "An O-ring is a round-section elastomer loop that seals by compression between two mating surfaces. This listing is moulded in silicone at 60 shore hardness with a 10 mm section, in a 10 inch size, and is listed for automobile applications.",
    specs: [
      { label: "Material", value: "Silicon" },
      { label: "Type", value: "O Ring" },
      { label: "Shape", value: "Round" },
      { label: "Size", value: "10 inch" },
      { label: "Thickness", value: "10 mm" },
      { label: "Hardness", value: "60" },
      { label: "Colour", value: "Red" },
      { label: "Usage / Application", value: "Automobile" },
    ],
    moq: "10,000 pieces",
    materials: ["Silicone rubber"],
    applications: ["Automobile"],
    featured: true,
  },
  {
    slug: "silicon-o-rings",
    name: "Silicon O Rings",
    category: "o-rings-gaskets",
    sourceCategory: "Silicon O Rings",
    image: "/products/silicon-o-rings.jpg",
    imageWidth: 1000,
    imageHeight: 667,
    imageAlt:
      "Silicone O-rings fitted to a bottle closure, manufactured by R D Prime India",
    summary:
      "Silicone O-rings above 10 mm section thickness, moulded in India.",
    overview:
      "Silicone O-rings hold their elasticity across a wide temperature range and resist ozone and weathering, which makes them a common choice for closures and static seals. This listing covers sections thicker than 10 mm.",
    specs: [
      { label: "Material", value: "Silicon" },
      { label: "Thickness", value: "More than 10 mm" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    moq: "10,000 pieces",
    materials: ["Silicone rubber"],
    featured: true,
  },
  {
    slug: "silicone-rubber-o-ring",
    name: "Silicone Rubber O Ring",
    category: "o-rings-gaskets",
    sourceCategory: "Silicon O Rings",
    image: "/products/silicone-rubber-o-ring.jpg",
    imageWidth: 750,
    imageHeight: 1000,
    imageAlt:
      "White and orange nitrile O-rings in assorted sizes from R D Prime India",
    summary:
      "Nitrile (NBR) O-ring, 60 shore hardness, in white and orange, for automobile use.",
    overview:
      "Nitrile rubber is the usual choice where a seal meets oil, fuel or grease. This listing is a round-section O-ring in NBR at 60 shore hardness, with a section above 10 mm, listed for automobile applications.",
    specs: [
      { label: "Material", value: "(NBR) Nitrile" },
      { label: "Type", value: "O Ring" },
      { label: "Shape", value: "Round" },
      { label: "Thickness", value: "More than 10 mm" },
      { label: "Hardness", value: "60" },
      { label: "Colour", value: "White and Orange" },
      { label: "Usage / Application", value: "Automobile" },
    ],
    moq: "10,000 pieces",
    materials: ["Nitrile (NBR)"],
    applications: ["Automobile"],
    sourceNote:
      "The source listing sits under the Silicon O Rings category while specifying NBR nitrile as the material. Confirm the material with the works before ordering.",
  },
  {
    slug: "rubber-o-ring",
    name: "Rubber O Ring",
    category: "o-rings-gaskets",
    sourceCategory: "Rubber O Ring",
    image: "/products/rubber-o-ring.jpg",
    imageWidth: 1000,
    imageHeight: 1000,
    imageAlt: "Black rubber O-ring seals from R D Prime India",
    summary:
      "Black silicone O-ring for general industrial sealing, from 1,000 pieces.",
    overview:
      "A general-purpose round-section seal for static industrial joints. This is the lowest-MOQ sealing listing in the catalogue, at 1,000 pieces, which suits smaller trial or replacement orders.",
    specs: [
      { label: "Material", value: "Silicon" },
      { label: "Colour", value: "Black" },
      { label: "Usage / Application", value: "Industrial" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    moq: "1,000 pieces",
    materials: ["Silicone rubber"],
    applications: ["General industrial"],
  },
  {
    slug: "nitrile-rubber-o-rings",
    name: "Nitrile Rubber O Rings",
    category: "o-rings-gaskets",
    sourceCategory: "Rubber O Ring",
    image: "/products/nitrile-rubber-o-rings.jpeg",
    imageWidth: 1000,
    imageHeight: 947,
    imageAlt: "Assorted nitrile rubber O-rings from R D Prime India",
    summary: "Nitrile rubber O-rings. Sizes and specification on enquiry.",
    overview:
      "Nitrile O-rings for oil- and fuel-contact sealing. The company has not published a specification table for this listing — share your section, inner diameter and hardness requirement and the works will confirm what can be supplied.",
    specs: [],
    materials: ["Nitrile (NBR)"],
  },
  {
    slug: "colored-rubber-gasket",
    name: "Coloured Rubber Gasket",
    category: "o-rings-gaskets",
    sourceCategory: "Rubber Gasket",
    image: "/products/colored-rubber-gasket.jpg",
    imageWidth: 1000,
    imageHeight: 709,
    imageAlt:
      "Blue ring-shaped rubber gaskets manufactured by R D Prime India",
    summary:
      "Blue ring gasket, 100 mm inner diameter, 10 mm thick, 60 shore, for automobile use.",
    overview:
      "A ring gasket seats in a joint or opening and seals under bolt load to stop the passage of air, liquid or gas. This listing is moulded in rubber at 60 shore hardness, 100 mm inner diameter and 10 mm thickness, and is supplied packed in packets.",
    specs: [
      { label: "Material", value: "Rubber" },
      { label: "Shape", value: "Ring Gasket" },
      { label: "Inner Diameter", value: "100 mm" },
      { label: "Thickness", value: "10 mm" },
      { label: "Hardness", value: "60" },
      { label: "Colour", value: "Blue" },
      { label: "Usage / Application", value: "Automobile Industry" },
      { label: "Packaging Type", value: "Packet" },
    ],
    moq: "10,000 pieces",
    materials: ["Rubber"],
    applications: ["Automobile"],
  },
  {
    slug: "rubber-flange-gaskets",
    name: "Rubber Flange Gaskets",
    category: "o-rings-gaskets",
    sourceCategory: "Rubber Gasket",
    image: "/products/rubber-flange-gaskets.jpeg",
    imageWidth: 1000,
    imageHeight: 750,
    imageAlt:
      "Black flat rubber flange gaskets with bolt holes, from R D Prime India",
    summary:
      "Flat black flange gasket, 80 mm inner diameter, 3 mm thick, 60 shore, polybag packed.",
    overview:
      "Flange gaskets sit between two bolted flange faces to give a leak-tight joint in piped systems. This listing is a flat rubber gasket at 3 mm thickness and 80 mm inner diameter, 60 shore hardness, supplied in polybags.",
    specs: [
      { label: "Material", value: "Rubber" },
      { label: "Shape", value: "Flat Gasket" },
      { label: "Inner Diameter", value: "80 mm" },
      { label: "Thickness", value: "3 mm" },
      { label: "Hardness", value: "60" },
      { label: "Colour", value: "Black" },
      { label: "Usage / Application", value: "Automobile Industry" },
      { label: "Packaging Type", value: "Polybag" },
    ],
    moq: "5,000 pieces",
    materials: ["Rubber"],
    applications: ["Automobile"],
    featured: true,
  },
  {
    slug: "silicone-rubber-gasket",
    name: "Silicone Rubber Gasket",
    category: "o-rings-gaskets",
    sourceCategory: "Rubber Gasket",
    image: "/products/silicone-rubber-gasket.jpg",
    imageWidth: 1000,
    imageHeight: 606,
    imageAlt: "Silicone rubber gaskets in a moulded strip from R D Prime India",
    summary:
      "Thin-section silicone gasket at 2 mm, hardness 60 to 80, high-volume supply.",
    overview:
      "A thin silicone gasket for low-clamp-load sealing faces. The listing specifies a 2 mm section with hardness in the 60 to 80 shore band, and carries the largest minimum order in the catalogue at 50,000 pieces.",
    specs: [
      { label: "Thickness", value: "2 mm" },
      { label: "Size", value: "2 mm" },
      { label: "Hardness", value: "60 to 80" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    moq: "50,000 pieces",
    materials: ["Silicone rubber"],
  },
  {
    slug: "epdm-rubber-gasket",
    name: "EPDM Rubber Gasket",
    category: "o-rings-gaskets",
    sourceCategory: "Rubber Products",
    image: "/products/epdm-rubber-gasket.jpg",
    imageWidth: 1000,
    imageHeight: 1000,
    imageAlt: "Black EPDM rubber gasket ring from R D Prime India",
    summary:
      "Industrial gasket with 60 mm inner diameter, listed for industrial sealing duty.",
    overview:
      "EPDM is a synthetic elastomer chosen for weathering, ozone and UV resistance, which suits outdoor and water-contact seals. This listing is specified with a 60 mm inner diameter for industrial applications.",
    specs: [
      { label: "Material", value: "Silicon" },
      { label: "Inner Diameter", value: "60 mm" },
      { label: "Thickness", value: "100 mm" },
      { label: "Usage / Application", value: "Industrial" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    moq: "5,000 pieces",
    materials: ["EPDM rubber"],
    applications: ["General industrial"],
    sourceNote:
      "The source listing is titled EPDM while the material field reads “silicon”, and the 100 mm thickness is inconsistent with the 60 mm inner diameter. Both values are shown as published — confirm material and section with the works.",
  },

  // ───────────────────────────── Bushes & Bushings ─────────────────────────
  {
    slug: "industrial-rubber-bush",
    name: "Industrial Rubber Bush",
    category: "bushes-bushings",
    sourceCategory: "Industrial Bushes",
    image: "/products/industrial-rubber-bush.jpg",
    imageWidth: 1000,
    imageHeight: 1000,
    imageAlt:
      "Black cylindrical industrial rubber bushes manufactured by R D Prime India",
    summary:
      "Black cylindrical rubber bush, 3.00 inch size, branded R D Prime India.",
    overview:
      "A rubber bush is an elastomeric sleeve set between two moving or vibrating parts to absorb movement and reduce noise transfer. This listing is a cylindrical bush in rubber at a 3.00 inch size.",
    specs: [
      { label: "Material", value: "Rubber" },
      { label: "Shape", value: "Cylindrical" },
      { label: "Size", value: "3.00 inch" },
      { label: "Colour", value: "Black" },
      { label: "Brand", value: "R D Prime India" },
    ],
    materials: ["Rubber"],
    featured: true,
  },
  {
    slug: "industrial-rubber-bush-silicone",
    name: "Industrial Rubber Bush — Silicone",
    category: "bushes-bushings",
    sourceCategory: "Industrial Bushes",
    image: "/products/industrial-rubber-bush-silicone.jpeg",
    imageWidth: 1000,
    imageHeight: 1000,
    imageAlt:
      "Silicone rubber bush with cylindrical profile from R D Prime India",
    summary:
      "Silicone cylindrical bush, 70 mm length, 3.00 inch size, for hardware fitting.",
    overview:
      "A silicone variant of the cylindrical bush, listed for hardware fitting duty at 70 mm length and a 3.00 inch size. Silicone holds its properties across a wider temperature band than natural rubber.",
    specs: [
      { label: "Material", value: "Silicone Rubber" },
      { label: "Shape", value: "Cylindrical" },
      { label: "Size", value: "3.00 inch" },
      { label: "Length", value: "70 mm" },
      { label: "Inner Diameter", value: "140 mm" },
      { label: "Outer Diameter", value: "80 mm" },
      { label: "Colour", value: "Black" },
      { label: "Usage / Application", value: "Hardware Fitting" },
    ],
    moq: "10,000 pieces",
    materials: ["Silicone rubber"],
    applications: ["Hardware fitting"],
    sourceNote:
      "The published inner diameter (140 mm) is larger than the published outer diameter (80 mm). Both are shown as listed — confirm the intended dimensions on enquiry.",
  },
  {
    slug: "stabilizer-bar-rubber-bushing",
    name: "Stabilizer Bar Rubber Bushing",
    category: "bushes-bushings",
    sourceCategory: "Industrial Bushes",
    image: "/products/stabilizer-bar-rubber-bushing.jpg",
    imageWidth: 1000,
    imageHeight: 654,
    imageAlt:
      "Black natural rubber stabilizer bar bushings from R D Prime India",
    summary:
      "Natural rubber bushing, 25 mm ID × 35 mm OD × 70 mm long, box packed.",
    overview:
      "A stabilizer bar bushing locates an anti-roll bar while allowing it to rotate, damping the load path into the chassis. This listing is moulded in natural rubber at 25 mm inner and 35 mm outer diameter, 70 mm long, and is supplied box packed.",
    specs: [
      { label: "Material", value: "Natural Rubber" },
      { label: "Shape", value: "Cylindrical" },
      { label: "Size", value: "2.00 inch" },
      { label: "Length", value: "70 mm" },
      { label: "Inner Diameter", value: "25 mm" },
      { label: "Outer Diameter", value: "35 mm" },
      { label: "Colour", value: "Black" },
      { label: "Usage / Application", value: "Electrical" },
      { label: "Packaging", value: "Box packaging" },
    ],
    moq: "5,000 pieces",
    materials: ["Natural rubber"],
    applications: ["Electrical"],
    featured: true,
  },
  {
    slug: "split-rubber-bushing",
    name: "Split Rubber Bushing",
    category: "bushes-bushings",
    sourceCategory: "Industrial Bushes",
    image: "/products/split-rubber-bushing.jpg",
    imageWidth: 500,
    imageHeight: 500,
    imageAlt: "Black split rubber bushing from R D Prime India",
    summary:
      "Natural rubber split bushing, 2 inch, for electrical applications.",
    overview:
      "A split bushing is slit along its length so it can be fitted over a shaft or cable already in place, without dismantling the assembly. This listing is moulded in natural rubber at a 2 inch size for electrical applications.",
    specs: [
      { label: "Material", value: "Natural Rubber" },
      { label: "Size", value: "2 inch" },
      { label: "Colour", value: "Black" },
      { label: "Application", value: "Electrical" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    materials: ["Natural rubber"],
    applications: ["Electrical"],
  },
  {
    slug: "metal-bush-for-plastic",
    name: "Metal Bush for Plastic",
    category: "bushes-bushings",
    sourceCategory: "Industrial Bushes",
    image: "/products/metal-bush-for-plastic.jpg",
    imageWidth: 1000,
    imageHeight: 884,
    imageAlt:
      "Metal bush inserts for plastic assemblies manufactured by R D Prime India",
    summary:
      "Cylindrical metal bush insert, 20 gm, for industrial plastic assemblies.",
    overview:
      "A metal bush pressed or moulded into a plastic part gives a hard, wear-resistant bore where a fastener or shaft runs, protecting the surrounding plastic. This listing is a cylindrical insert at 20 gm unit weight for industrial use.",
    specs: [
      { label: "Shape", value: "Cylindrical" },
      { label: "Weight", value: "20 gm" },
      { label: "Usage / Application", value: "Industrial" },
    ],
    moq: "50,000 pieces",
    materials: ["Metal insert"],
    applications: ["General industrial"],
  },
  {
    slug: "industrial-black-rubber-bushes",
    name: "Industrial Black Rubber Bushes",
    category: "bushes-bushings",
    sourceCategory: "Industrial Bushes",
    image: "/products/industrial-rubber-bush.jpg",
    imageWidth: 1000,
    imageHeight: 1000,
    imageAlt:
      "Black moulded industrial rubber bushes manufactured by R D Prime India",
    summary:
      "Square-profile silicone rubber bush, 15 mm length, 1.0 inch size.",
    overview:
      "A square-profile bush in silicone rubber, listed at 15 mm length and a 1.0 inch size with a 50 mm outer dimension.",
    specs: [
      { label: "Material", value: "Silicone Rubber" },
      { label: "Shape", value: "Square" },
      { label: "Size", value: "1.0 inch" },
      { label: "Length", value: "15 mm" },
      { label: "Inner Diameter", value: "140 mm" },
      { label: "Outer Diameter", value: "50 mm" },
      { label: "Colour", value: "White" },
    ],
    moq: "10,000 pieces",
    materials: ["Silicone rubber"],
    sourceNote:
      "The published inner diameter (140 mm) exceeds the published outer diameter (50 mm), and the colour field reads White against the listing title. Shown as published — confirm on enquiry.",
  },

  // ──────────────────────── Grommets, Plugs & End Caps ────────────────────
  {
    slug: "black-rubber-grommet",
    name: "Black Rubber Grommet",
    category: "grommets-plugs-caps",
    sourceCategory: "Rubber Grommet",
    image: "/products/black-rubber-grommet.webp",
    imageWidth: 1000,
    imageHeight: 934,
    imageAlt:
      "Black EPDM rubber grommets for cable pass-throughs, from R D Prime India",
    summary:
      "EPDM panel grommet, 15 mm ID × 30 mm OD, round, for automobile wiring.",
    overview:
      "A grommet lines a hole in a panel so a cable or hose passing through is not chafed by the bare edge, and seals the opening against dust and moisture. This listing is moulded in EPDM at 15 mm inner and 30 mm outer diameter for automobile applications.",
    specs: [
      { label: "Grommet Material", value: "EPDM Rubber" },
      { label: "Shape", value: "Round" },
      { label: "Inner Diameter", value: "15 mm" },
      { label: "Outer Diameter", value: "30 mm" },
      { label: "Colour", value: "Black" },
      { label: "Usage / Application", value: "Automobile" },
    ],
    moq: "10,000 pieces",
    materials: ["EPDM rubber"],
    applications: ["Automobile"],
    gallery: ["/products/black-rubber-grommet-2.jpg"],
    featured: true,
  },
  {
    slug: "silicone-rubber-grommet",
    name: "Silicone Rubber Grommet",
    category: "grommets-plugs-caps",
    sourceCategory: "Silicone Rubber Grommet",
    image: "/products/silicone-rubber-grommet.jpg",
    imageWidth: 1000,
    imageHeight: 813,
    imageAlt: "Black silicone rubber grommets from R D Prime India",
    summary: "Round rubber grommet, 15 mm inner diameter, for automobile use.",
    overview:
      "A round panel grommet at 15 mm inner diameter for automobile applications, moulded in rubber and finished in black.",
    specs: [
      { label: "Material", value: "Rubber" },
      { label: "Shape", value: "Round" },
      { label: "Inner Diameter", value: "15 mm" },
      { label: "Colour", value: "Black" },
      { label: "Usage / Application", value: "Automobile" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    materials: ["Rubber"],
    applications: ["Automobile"],
  },
  {
    slug: "silicone-rubber-plugs",
    name: "Silicone Rubber Plugs",
    category: "grommets-plugs-caps",
    sourceCategory: "Rubber Products",
    image: "/products/silicone-rubber-plugs.jpg",
    imageWidth: 1000,
    imageHeight: 601,
    imageAlt:
      "Black silicone rubber plugs for sealing openings, from R D Prime India",
    summary:
      "Silicone sealing plug, 100 mm diameter, 80 shore hardness, black.",
    overview:
      "Plugs cap or mask an opening in a pipe, tube or housing — in service as a permanent seal, or during assembly and finishing to keep a bore clean. This listing is moulded in silicone at 100 mm diameter and 80 shore hardness.",
    specs: [
      { label: "Material", value: "Silicone" },
      { label: "Diameter", value: "100 mm" },
      { label: "Hardness", value: "80" },
      { label: "Colour", value: "Black" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    moq: "10,000 pieces",
    materials: ["Silicone rubber"],
  },
  {
    slug: "rubber-end-cap",
    name: "Rubber End Cap",
    category: "grommets-plugs-caps",
    sourceCategory: "Rubber Products",
    image: "/products/rubber-end-cap.jpg",
    imageWidth: 1000,
    imageHeight: 511,
    imageAlt: "Moulded rubber end caps and packing from R D Prime India",
    summary:
      "Moulded rubber end cap. Dimensions and material on enquiry.",
    overview:
      "A rubber end cap closes off a tube, bar or pipe end to protect the opening and the people handling it. The company has not published a specification table for this listing — send the tube outside diameter and wall thickness you need to cover and the works will confirm.",
    specs: [],
    materials: ["Rubber"],
  },
  {
    slug: "black-plastic-end-cap",
    name: "Black Plastic End Cap",
    category: "grommets-plugs-caps",
    sourceCategory: "Plastic End Cap",
    image: "/products/black-plastic-end-cap.webp",
    imageWidth: 1000,
    imageHeight: 1000,
    imageAlt:
      "Black circular plastic end caps and bushes from R D Prime India",
    summary:
      "Circular black plastic end cap for electrical applications, packet supplied.",
    overview:
      "A circular plastic end cap used to close and insulate an opening in electrical assemblies. This listing is moulded in plastic, finished black, and supplied in packets.",
    specs: [
      { label: "Material", value: "Plastic" },
      { label: "Shape", value: "Circular" },
      { label: "Colour", value: "Black" },
      { label: "Usage / Application", value: "Electrical" },
      { label: "Packaging Type", value: "Packet" },
    ],
    moq: "5,000 pieces",
    materials: ["Plastic"],
    applications: ["Electrical"],
  },
  {
    slug: "black-plastic-end-caps-can",
    name: "Black Plastic End Caps — Can Caps",
    category: "grommets-plugs-caps",
    sourceCategory: "Plastic End Cap",
    image: "/products/black-plastic-end-caps.jpg",
    imageWidth: 1000,
    imageHeight: 659,
    imageAlt:
      "Black round plastic can caps for edible oil containers, from R D Prime India",
    summary:
      "Round black can cap listed for edible oil container closures.",
    overview:
      "A round plastic closure for can-type containers, listed by the company for edible oil packaging.",
    specs: [
      { label: "Type", value: "Can caps" },
      { label: "Shape", value: "Round" },
      { label: "Colour", value: "Black" },
      { label: "Usage / Application", value: "Edible Oil" },
    ],
    materials: ["Plastic"],
    applications: ["Edible oil packaging"],
  },
  {
    slug: "plastic-end-caps",
    name: "Plastic End Caps",
    category: "grommets-plugs-caps",
    sourceCategory: "Plastic End Cap",
    image: "/products/plastic-end-caps.jpg",
    imageWidth: 1000,
    imageHeight: 741,
    imageAlt:
      "Assorted moulded plastic end caps and spare parts from R D Prime India",
    summary: "Plastic end cap at 1 inch diameter, moulded in India.",
    overview:
      "A 1 inch diameter moulded plastic end cap for closing tube and pipe ends.",
    specs: [
      { label: "Diameter", value: "1 inch" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    materials: ["Plastic"],
  },
  {
    slug: "round-plastic-end-caps",
    name: "Round Plastic End Caps",
    category: "grommets-plugs-caps",
    sourceCategory: "Plastic End Cap",
    image: "/products/black-plastic-end-caps.jpg",
    imageWidth: 1000,
    imageHeight: 659,
    imageAlt:
      "Round black plastic end caps manufactured by R D Prime India",
    summary: "Round moulded plastic end cap, made in India.",
    overview:
      "A round plastic end cap. Beyond country of origin the company has not published a specification table for this listing — send the diameter and fit you need and the works will confirm.",
    specs: [{ label: "Country of Origin", value: "Made in India" }],
    materials: ["Plastic"],
  },

  // ───────────────────────────── Washers & Pads ────────────────────────────
  {
    slug: "silicon-rubber-washer",
    name: "Silicon Rubber Washer",
    category: "washers-pads",
    sourceCategory: "Rubber Bush",
    image: "/products/silicon-rubber-washer.jpg",
    imageWidth: 730,
    imageHeight: 1000,
    imageAlt:
      "Red silicone rubber washers manufactured by R D Prime India",
    summary:
      "Red silicone washer, 60 mm ID × 72 mm OD × 6 mm, for automobile use.",
    overview:
      "A rubber washer spreads the load of a fastener and seals the joint beneath it. This listing is moulded in silicone rubber at 60 mm inner and 72 mm outer diameter with a 6 mm section, in red, for automobile applications.",
    specs: [
      { label: "Material", value: "Silicon Rubber" },
      { label: "Shape", value: "Round" },
      { label: "Inner Diameter", value: "60 mm" },
      { label: "Outer Diameter", value: "72 mm" },
      { label: "Thickness", value: "6 mm" },
      { label: "Colour", value: "Red" },
      { label: "Usage", value: "Automobile Industry" },
    ],
    moq: "10,000 pieces",
    materials: ["Silicone rubber"],
    applications: ["Automobile"],
    featured: true,
  },
  {
    slug: "silicon-rubber-washer-thin",
    name: "Silicon Rubber Washer — 2.5 mm",
    category: "washers-pads",
    sourceCategory: "Rubber Washer",
    image: "/products/silicon-rubber-washer-2.jpeg",
    imageWidth: 1000,
    imageHeight: 1000,
    imageAlt: "Thin silicone rubber washers from R D Prime India",
    summary: "Thin-section silicone washer at 2.5 mm, 72 mm outer diameter.",
    overview:
      "A thinner silicone washer for joints with limited stack height, listed at a 2.5 mm section and 72 mm outer diameter.",
    specs: [
      { label: "Material", value: "Silicon" },
      { label: "Inner Diameter", value: "120 mm" },
      { label: "Outer Diameter", value: "72 mm" },
      { label: "Thickness", value: "2.5 mm" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    moq: "10,000 pieces",
    materials: ["Silicone rubber"],
    sourceNote:
      "The published inner diameter (120 mm) exceeds the published outer diameter (72 mm). Shown as published — confirm the intended dimensions on enquiry.",
  },
  {
    slug: "white-plastic-washer",
    name: "White Plastic Washer",
    category: "washers-pads",
    sourceCategory: "Plastic Component",
    image: "/products/white-plastic-washer.jpg",
    imageWidth: 1000,
    imageHeight: 994,
    imageAlt:
      "White flat plastic washers manufactured by R D Prime India",
    summary:
      "Flat white plastic washer, 36 mm ID × 72 mm OD × 2 mm, for automobile use.",
    overview:
      "A flat plastic disc that spreads fastener load, protects the surface beneath it and electrically insulates the joint. This listing is specified at 36 mm inner and 72 mm outer diameter with a 2 mm section, for automobile applications.",
    specs: [
      { label: "Material", value: "Plastic" },
      { label: "Shape", value: "Round" },
      { label: "Inner Diameter", value: "36 mm" },
      { label: "Outer Diameter", value: "72 mm" },
      { label: "Thickness", value: "2 mm" },
      { label: "Colour", value: "White" },
      { label: "Usage / Application", value: "Automobile Industry" },
    ],
    materials: ["Plastic"],
    applications: ["Automobile"],
    featured: true,
  },
  {
    slug: "plastic-round-washer",
    name: "Plastic Round Washer",
    category: "washers-pads",
    sourceCategory: "Rubber Bush",
    image: "/products/plastic-round-washer.jpg",
    imageWidth: 1000,
    imageHeight: 1000,
    imageAlt: "Black round plastic washers from R D Prime India",
    summary:
      "Black plastic washer, 30 mm ID × 50 mm OD × 6 mm, for automobile use.",
    overview:
      "A round plastic washer used where a non-metallic fastener seat is needed for corrosion resistance, electrical insulation or low friction. Listed at 30 mm inner and 50 mm outer diameter with a 6 mm section.",
    specs: [
      { label: "Material", value: "Plastic" },
      { label: "Shape", value: "Round" },
      { label: "Inner Diameter", value: "30 mm" },
      { label: "Outer Diameter", value: "50 mm" },
      { label: "Thickness", value: "6 mm" },
      { label: "Colour", value: "Black" },
      { label: "Usage", value: "Automobile Industry" },
    ],
    moq: "10,000 pieces",
    materials: ["Plastic"],
    applications: ["Automobile"],
  },
  {
    slug: "plastic-rubber-washers",
    name: "Plastic Rubber Washers",
    category: "washers-pads",
    sourceCategory: "Rubber Washer",
    image: "/products/plastic-rubber-washers.jpg",
    imageWidth: 1000,
    imageHeight: 1000,
    imageAlt:
      "Moulded plastic and rubber washers in bulk, from R D Prime India",
    summary:
      "Plastic washer at 30 mm inner diameter, branded R D Prime India.",
    overview:
      "A plastic washer listed at 30 mm inner diameter for automobile applications. This is the lowest-priced washer listing in the catalogue and is supplied in bulk.",
    specs: [
      { label: "Material", value: "Plastic" },
      { label: "Inner Diameter", value: "30 mm" },
      { label: "Usage", value: "Automobile Industry" },
      { label: "Brand", value: "R D Prime India" },
    ],
    materials: ["Plastic"],
    applications: ["Automobile"],
  },
  {
    slug: "square-rubber-pad",
    name: "Square Rubber Pad",
    category: "washers-pads",
    sourceCategory: "Rubber Grommet",
    image: "/products/square-rubber-pad.jpg",
    imageWidth: 750,
    imageHeight: 1000,
    imageAlt:
      "Black moulded silicone rubber pad from R D Prime India",
    summary:
      "Rectangular silicone pad, 5 mm thick, for the printing industry.",
    overview:
      "A moulded silicone pad used as a resilient face or backing layer. This listing is rectangular at a 5 mm section and is listed by the company for printing industry use.",
    specs: [
      { label: "Material", value: "Silicone" },
      { label: "Type", value: "Rubber Pad" },
      { label: "Shape", value: "Rectangular" },
      { label: "Thickness", value: "5 mm" },
      { label: "Colour", value: "Black" },
      { label: "Usage / Application", value: "Printing Industry" },
    ],
    moq: "10,000 pieces",
    materials: ["Silicone rubber"],
    applications: ["Printing"],
  },

  // ─────────────────────── Custom Moulded Components ──────────────────────
  {
    slug: "plastic-custom-molded-components",
    name: "Plastic Custom Moulded Components",
    category: "moulded-components",
    sourceCategory: "Plastic Component",
    image: "/products/plastic-custom-molded-components.jpg",
    imageWidth: 1000,
    imageHeight: 814,
    imageAlt:
      "Custom moulded plastic components for automotive assemblies, from R D Prime India",
    summary:
      "Plastic and nylon components moulded for auto-parts assemblies.",
    overview:
      "Components moulded to a buyer's part requirement in plastic and nylon. The company lists these for use in auto parts and supplies them packed in plastic packets.",
    specs: [
      { label: "Material", value: "Plastic and Nylon" },
      { label: "Usage", value: "Used in auto parts" },
      { label: "Pack Type", value: "Plastic packet" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    moq: "5,000 pieces",
    materials: ["Plastic", "Nylon"],
    applications: ["Automobile"],
    customisable: true,
    featured: true,
  },
  {
    slug: "engineering-plastic-parts",
    name: "Engineering Plastic Parts",
    category: "moulded-components",
    sourceCategory: "Plastic Component",
    image: "/products/engineering-plastic-parts.jpg",
    imageWidth: 944,
    imageHeight: 1000,
    imageAlt:
      "Blue PVC engineering plastic parts manufactured by R D Prime India",
    summary:
      "PVC engineering parts, sized to buyer requirement, in blue.",
    overview:
      "Engineering plastic parts moulded in PVC. The listing states the size is customised to requirement, so send a drawing or a sample and the works will confirm what can be produced.",
    specs: [
      { label: "Material", value: "PVC" },
      { label: "Colour", value: "Blue" },
      { label: "Size", value: "As per requirement, customised" },
      { label: "Packaging", value: "Plastic packet" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    moq: "10,000 pieces",
    materials: ["PVC"],
    customisable: true,
  },
  {
    slug: "plastic-molded-parts",
    name: "Plastic Moulded Parts",
    category: "moulded-components",
    sourceCategory: "Plastic Moulded Products",
    image: "/products/plastic-molded-parts.jpg",
    imageWidth: 750,
    imageHeight: 1000,
    imageAlt:
      "Range of moulded plastic parts produced by R D Prime India",
    summary:
      "Plastic parts moulded to requirement — size, thickness, weight and colour customised.",
    overview:
      "The company's broadest build-to-requirement listing: size, thickness, weight and colour are all stated as customised. In the company's own words, “we can customize plastic parts as per requirement and we will provide your product as per your convenience.”",
    specs: [
      { label: "Material", value: "Plastic" },
      { label: "Size", value: "Customised" },
      { label: "Thickness", value: "Customised" },
      { label: "Weight", value: "Customised" },
      { label: "Colour", value: "All" },
      { label: "Packaging Type", value: "Packet" },
    ],
    moq: "5,000 pieces",
    materials: ["Plastic"],
    customisable: true,
    featured: true,
  },
  {
    slug: "multicolor-plastic-parts",
    name: "Multicolour Plastic Parts",
    category: "moulded-components",
    sourceCategory: "Rubber Grommet",
    image: "/products/multicolor-plastic-parts.jpg",
    imageWidth: 1000,
    imageHeight: 869,
    imageAlt:
      "Multicolour moulded plastic parts manufactured by R D Prime India",
    summary:
      "Assembly parts moulded to buyer requirement in a range of colours.",
    overview:
      "Moulded plastic parts for product assemblies, produced to buyer requirement. The company states it will “manufacture plastic parts according to buyer requirements” and customise them for the assembly they are going into. Supplied in polybags or cartons.",
    specs: [
      { label: "Colour", value: "Multicolour" },
      { label: "Packaging Type", value: "Polybag, carton" },
      { label: "Country of Origin", value: "Made in India" },
    ],
    moq: "10,000 pieces",
    materials: ["Plastic"],
    customisable: true,
  },
  {
    slug: "silicone-rubber-products",
    name: "Silicone Rubber Products",
    category: "moulded-components",
    sourceCategory: "Rubber Products",
    image: "/products/silicone-rubber-products.jpeg",
    imageWidth: 563,
    imageHeight: 1000,
    imageAlt:
      "Moulded silicone rubber products from R D Prime India",
    summary:
      "Round silicone components at 20 mm, 60 shore, box packed, for automobile use.",
    overview:
      "Moulded silicone rubber components at a 20 mm size and 60 shore hardness, listed for automobile applications and supplied box packed.",
    specs: [
      { label: "Material", value: "Silicone Rubber" },
      { label: "Shape", value: "Round" },
      { label: "Size", value: "20 mm" },
      { label: "Hardness", value: "60" },
      { label: "Colour", value: "Black" },
      { label: "Usage / Application", value: "Automobile Industry" },
      { label: "Packaging Type", value: "Box" },
    ],
    moq: "10,000 pieces",
    materials: ["Silicone rubber"],
    applications: ["Automobile"],
    gallery: ["/products/silicone-rubber-products-2.jpeg"],
  },
];

/* ───────────────────────────────── helpers ──────────────────────────────── */

export const productBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const productsInCategory = (id: CategoryId): readonly Product[] =>
  products.filter((p) => p.category === id);

export const featuredProducts = (): readonly Product[] =>
  products.filter((p) => p.featured);

export const relatedProducts = (product: Product, limit = 3): readonly Product[] => {
  const sameCategory = products.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const filler = products.filter(
    (p) => p.category !== product.category && p.slug !== product.slug,
  );
  return [...sameCategory, ...filler].slice(0, limit);
};

/** Every distinct material across the catalogue, for the listing-page filter. */
export const allMaterials = (): readonly string[] =>
  [...new Set(products.flatMap((p) => p.materials ?? []))].sort();

/** Every distinct application across the catalogue, for the listing-page filter. */
export const allApplications = (): readonly string[] =>
  [...new Set(products.flatMap((p) => p.applications ?? []))].sort();
