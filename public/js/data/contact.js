/* =========================================================================
   RELAXTRIP - WEBSITE CONTENT   (all editable content lives in the js/data/ folder: one file per area)
   -------------------------------------------------------------------------
   Every text has two versions side by side:   { en: "English text", bn: "বাংলা লেখা" }

   HOW TO ADD A CARD (services, reviews, why-us, team members, FAQ, numbers, menu links, airlines, payment methods, support channels):
     1. Find that section's list below (SERVICES, REVIEWS, WHY_US_ITEMS, TEAM_MEMBERS, FAQ_ITEMS ...).
     2. Copy ONE whole { ... } block, paste it after the last block of the same list
        (keep the comma after the closing brace).
     3. Change the texts. That's all: numbering, ids, animation order, avatar letters,
        slider dots and the English/Bangla switch are created automatically.
     To REMOVE a card: delete its whole { ... } block.  To REORDER: move the blocks.

   RULES: write texts in "double quotes". If a text itself contains a double quote, write \"
   instead. Keep every field of a block (they are all needed) unless it says (optional).
   The remaining texts (headings, paragraphs, labels) are in SITE_TEXT at the bottom.
   ========================================================================= */

/* =========================================================================
   CONTACT DETAILS: change them here ONLY.
   Every phone link, WhatsApp link, email, address, map link, the Call button,
   the support button, the footer and the search-engine data update from this block.
   ========================================================================= */
export const CONTACT = {
  phone: "01631-829573",        /* shown to visitors and used for BOTH calls and WhatsApp. Write it the way you dial it in Bangladesh */
  whatsappPhone: "",            /* (optional) a different WhatsApp number. Leave "" to use the phone number above */
  email: "relaxtripbd@gmail.com",
  address: { en: "Shah Tower, 48 Naya Paltan, Dhaka 1000, Bangladesh", bn: "শাহ টাওয়্যার, ৪৮ নয়াপল্টন, ঢাকা ১০০০, বাংলাদেশ" },
  mapsLink: "",                 /* (optional) your own map link. Leave "" to open Google Maps for the address above */
  mapEmbed: "Shah Tower, 48 Naya Paltan, Dhaka 1000",   /* (optional) what the real Google map on the page searches for. Leave "" to use the address above */
  openingHours: { en: "Saturday - Thursday: 10:00 AM - 8:00 PM", bn: "শনিবার - বৃহস্পতিবার: সকাল ১০:০০ - রাত ৮:০০" },
  openingHoursCode: "Sa-Th 10:00-20:00"   /* same hours in the short form search engines read (Mo Tu We Th Fr Sa Su) */
};
