/* ---- PARTNER AIRLINES: the scrolling strip under the hero. Each card shows a round logo, the name and the code.
   code = 2-letter airline (IATA) code (e.g. "EK"), name = airline name (names are not translated).
   logo = (optional) address of THIS airline's logo, which replaces the automatic logo below.
   IMPORTANT: list only airlines you really sell tickets for, and only use logos you have permission to use. ---- */
export const PARTNER_AIRLINES = [
  { code: "BG", name: "Biman Bangladesh Airlines" },
  { code: "BS", name: "US-Bangla Airlines" },
  { code: "VQ", name: "NovoAir" },
  { code: "EK", name: "Emirates" },
  { code: "QR", name: "Qatar Airways" },
  { code: "SQ", name: "Singapore Airlines" },
  { code: "MH", name: "Malaysia Airlines" },
  { code: "SV", name: "Saudia" },
  { code: "TK", name: "Turkish Airlines" },
  { code: "EY", name: "Etihad Airways" },
  { code: "TG", name: "Thai Airways" },
  { code: "CX", name: "Cathay Pacific" },
];

/* Where the airline logos come from. {code} is replaced by each airline's code.
   - Default below: a free logo service for travel sites (needs internet; not tested by me, see the chat notes).
   - To use your OWN logo files, put them in a folder and write e.g. "logos/airlines/{code}.png" (files named BG.png, EK.png ...).
   - "" = no logos, only the code in a gold circle.
   If a logo cannot load, the code in a gold circle is shown instead, so nothing ever looks broken. */
export const AIRLINE_LOGO_URL = "https://pics.avs.io/120/120/{code}.png";

/* ---- FOOTER "PAY WITH" LOGOS: white tiles in the footer.
   name = text shown when there is no logo. id = (optional) short lowercase word used in the logo file name (defaults to the name).
   logo = (optional) address of this method's logo image. This only DISPLAYS accepted methods; real online payment needs a payment-gateway account. ---- */
export const PAYMENT_METHODS = [
  { name: "Visa" },
  { name: "Mastercard" },
  { name: "American Express" },
  { name: "bKash" },
  { name: "Nagad" },
  { name: "Rocket" },
  { name: "Upay" },
  { name: "Nexus Pay" },
  { name: "Bank transfer", id: "bank" },
  { name: "Cash at office", id: "cash" },
];

/* Folder pattern for your payment logo files, e.g. "logos/payments/{id}.svg" (files visa.svg, bkash.svg ...).
   "" = no logo files, the tiles show the names. A logo that cannot load falls back to the name. */
export const PAYMENT_LOGO_URL = "";

/* ---- Optional "Verified by" badge at the right of the payment row (for example the SSLCOMMERZ banner).
   Keep it null until you really are a verified merchant. Example:
   const PAYMENT_GATEWAY_BADGE = { text: { en: "Verified by", bn: "যাচাইকৃত" }, name: "SSLCOMMERZ", logo: "logos/sslcommerz.png" }; ---- */
export const PAYMENT_GATEWAY_BADGE = null;
