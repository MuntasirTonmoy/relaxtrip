import { CONTACT } from '/js/data/contact.js';

/* =========================================================================
   2. HELPER FUNCTIONS (preferences, contact links, small utilities)
   ========================================================================= */

/* true when the visitor's device asks for less animation */
export const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* localStorage can be blocked (private mode, some in-app browsers). Never let that crash the page. */
export const safeStorage = {
  get(key) {
    try { return localStorage.getItem(key); } catch (error) { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch (error) { /* ignore: the choice just won't be remembered */ }
  }
};


/* Phone numbers: CONTACT.phone is written the way you dial it in Bangladesh (01631-829573).
   Calls and WhatsApp need the international form (+8801631829573), so it is worked out here. */
function toInternationalDigits(localNumber) {
  const digits = localNumber.replace(/\D/g, '');
  return digits.startsWith('880') ? digits : '880' + digits.replace(/^0/, '');
}
const PHONE_INTERNATIONAL_DIGITS = toInternationalDigits(CONTACT.phone);
const WHATSAPP_INTERNATIONAL_DIGITS = toInternationalDigits(CONTACT.whatsappPhone || CONTACT.phone);
export { PHONE_INTERNATIONAL_DIGITS };
export const PHONE_LINK = 'tel:+' + PHONE_INTERNATIONAL_DIGITS;
export const MAPS_LINK = CONTACT.mapsLink || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(CONTACT.address.en);

/* Link that opens WhatsApp with a ready-typed message */
export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_INTERNATIONAL_DIGITS}?text=${encodeURIComponent(message)}`;
}


/* Avatar letters from a name: "Mohammad Sagor" -> "MS" (first letter of the first and last word) */
export function initialsOf(fullName) {
  const words = fullName.trim().split(/\s+/);
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}
