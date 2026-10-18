/**
 * Per-category accent colours.
 *
 * Purpose is wayfinding, not decoration: a category keeps the same hue from
 * the homepage tile, through the catalogue filter, onto the product page. The
 * copper brand accent still owns every call to action, so these never compete
 * with a CTA.
 *
 * Class strings are written out in full rather than composed, because Tailwind
 * scans source text and would not see an interpolated class name.
 */
export type AccentName = "copper" | "steel" | "teal" | "moss" | "ochre";

export type AccentClasses = {
  /** Label and link text on a white or canvas ground. */
  readonly text: string;
  /** Same hue, legible on the navy sections. */
  readonly textOnDark: string;
  /** Solid fill — always pairs with white text (all clear 4.5:1). */
  readonly solid: string;
  /** Hairline rule / underline. */
  readonly rule: string;
  /** Very low-alpha wash for a tile ground. */
  readonly wash: string;
  /** Hover colour for a heading inside a `group`. Written out in full —
      building this by string manipulation would hide it from Tailwind. */
  readonly groupHoverText: string;
};

export const accents: Record<AccentName, AccentClasses> = {
  copper: {
    text: "text-copper-600",
    textOnDark: "text-copper-light",
    solid: "bg-copper-600",
    rule: "bg-copper-600",
    wash: "bg-copper-600/8",
    groupHoverText: "group-hover:text-copper-600",
  },
  steel: {
    text: "text-steel",
    textOnDark: "text-steel-on-dark",
    solid: "bg-steel",
    rule: "bg-steel",
    wash: "bg-steel/8",
    groupHoverText: "group-hover:text-steel",
  },
  teal: {
    text: "text-teal",
    textOnDark: "text-teal-on-dark",
    solid: "bg-teal",
    rule: "bg-teal",
    wash: "bg-teal/8",
    groupHoverText: "group-hover:text-teal",
  },
  moss: {
    text: "text-moss",
    textOnDark: "text-moss-on-dark",
    solid: "bg-moss",
    rule: "bg-moss",
    wash: "bg-moss/8",
    groupHoverText: "group-hover:text-moss",
  },
  ochre: {
    text: "text-ochre",
    textOnDark: "text-ochre-on-dark",
    solid: "bg-ochre",
    rule: "bg-ochre",
    wash: "bg-ochre/8",
    groupHoverText: "group-hover:text-ochre",
  },
};

export const accentFor = (name: AccentName): AccentClasses => accents[name];

/**
 * Fixed order for anything that reads as a sequence — the numbered process
 * steps, the industry tiles. Using the same five hues in the same order keeps
 * those sequences tied to the category system rather than inventing a second
 * palette.
 */
export const accentSequence: readonly AccentName[] = [
  "copper",
  "steel",
  "teal",
  "moss",
  "ochre",
];

export const accentByIndex = (i: number): AccentClasses =>
  accents[accentSequence[i % accentSequence.length]];
