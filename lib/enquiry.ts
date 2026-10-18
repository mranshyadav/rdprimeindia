/**
 * Enquiry payload shape and validation, shared by the client form and the
 * route handler so the rules cannot drift apart.
 */

export const ENQUIRY_KINDS = ["quote", "product", "contact"] as const;
export type EnquiryKind = (typeof ENQUIRY_KINDS)[number];

export type EnquiryPayload = {
  kind: EnquiryKind;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  productCategory?: string;
  productName?: string;
  quantity?: string;
  specifications?: string;
  message?: string;
  /** Honeypot — must stay empty. Bots fill it. */
  website?: string;
  /** Milliseconds the form was on screen before submission. */
  elapsedMs?: number;
};

export type FieldErrors = Partial<Record<keyof EnquiryPayload, string>>;

const MAX = {
  name: 120,
  companyName: 160,
  email: 200,
  phone: 32,
  productCategory: 120,
  productName: 160,
  quantity: 80,
  specifications: 4000,
  message: 4000,
} as const;

/** Deliberately permissive — enough to catch typos, not to reject real addresses. */
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

/**
 * Accepts Indian and international formats: 10 digits, optional +91 or 0
 * prefix, with spaces, dashes, dots or brackets anywhere.
 */
const phoneDigits = (v: string) => v.replace(/[^\d]/g, "");

export function validateEnquiry(input: EnquiryPayload): FieldErrors {
  const errors: FieldErrors = {};
  const trimmed = (v?: string) => (v ?? "").trim();

  if (!ENQUIRY_KINDS.includes(input.kind)) errors.kind = "Unknown form type.";

  const name = trimmed(input.name);
  if (name.length < 2) errors.name = "Please enter your full name.";
  else if (name.length > MAX.name) errors.name = "That name is too long.";

  const companyName = trimmed(input.companyName);
  if (companyName.length < 2)
    errors.companyName = "Please enter your company name.";
  else if (companyName.length > MAX.companyName)
    errors.companyName = "That company name is too long.";

  const email = trimmed(input.email);
  if (!email) errors.email = "Please enter your business email.";
  else if (!EMAIL_RE.test(email) || email.length > MAX.email)
    errors.email = "Please enter a valid email address.";

  const phone = trimmed(input.phone);
  const digits = phoneDigits(phone);
  if (!phone) errors.phone = "Please enter a phone number.";
  else if (digits.length < 10 || digits.length > 15)
    errors.phone = "Please enter a valid phone number with country or STD code.";

  if (input.kind !== "contact") {
    const quantity = trimmed(input.quantity);
    if (!quantity)
      errors.quantity = "Please tell us the quantity you need — even a range helps.";
    else if (quantity.length > MAX.quantity)
      errors.quantity = "Please shorten the quantity.";
  }

  if (input.kind === "contact" && trimmed(input.message).length < 10)
    errors.message = "Please tell us a little more about what you need.";

  if (trimmed(input.specifications).length > MAX.specifications)
    errors.specifications = "Please shorten your specifications.";
  if (trimmed(input.message).length > MAX.message)
    errors.message = "Please shorten your message.";

  return errors;
}

/** Non-field spam signals. Returns a reason, or null when the submission looks human. */
export function spamReason(input: EnquiryPayload): string | null {
  if ((input.website ?? "").trim() !== "") return "honeypot";
  if (typeof input.elapsedMs === "number" && input.elapsedMs < 2500)
    return "too-fast";
  const body = `${input.specifications ?? ""} ${input.message ?? ""}`;
  const links = body.match(/https?:\/\//gi)?.length ?? 0;
  if (links > 4) return "link-spam";
  return null;
}
