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

/* ---- FOOTER "PAY WITH" BANNER: the accepted-methods strip in the footer footer.
   It is a plain <img class="pay-banner"> in index.html pointing at public/logos/sslcommerz.webp —
   one single image that already lists Visa, Mastercard, bKash, Nagad, etc.
   To change it, replace that file (or edit the <img> tag in index.html). ---- */
