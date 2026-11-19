/* ---- SUPPORT BUTTON (bottom-right of every page): one row per contact option.
   type = "whatsapp", "phone" or "email" (the link comes from CONTACT at the top). icon = icon name.
   note = (optional) small line under the label; phone and email show the number / address automatically. ---- */
export const SUPPORT_CHANNELS = [
  { type: "whatsapp", icon: "msg", label: { en: "Chat on WhatsApp", bn: "হোয়াটসঅ্যাপে চ্যাট করুন" }, note: { en: "Message us anytime", bn: "যেকোনো সময় মেসেজ করুন" } },
  { type: "phone", icon: "phone", label: { en: "Call us", bn: "আমাদের কল করুন" } },
  { type: "email", icon: "mail", label: { en: "Email us", bn: "ইমেইল করুন" } },
];

/* ---- SOCIAL LINKS: round icon buttons at the bottom of the footer.
   Add / remove / reorder a whole { ... } line. Two kinds of entry:
     1. your own address: { icon: "facebook", label: { en, bn }, url: "https://..." }   icon can be facebook, youtube, tiktok, linkedin (names in js/01-icons.js ICON_PATHS)
     2. using CONTACT automatically: { type: "whatsapp" | "phone" | "email", icon, label } — the link is built from CONTACT, no url needed.
   Icons for other sites can be added in js/01-icons.js under ICON_PATHS. ---- */
export const SOCIAL_LINKS = [
  { icon: "facebook", label: { en: "Facebook", bn: "ফেসবুক" }, url: "https://www.facebook.com/relaxtripbangladesh/" },
  { icon: "whatsapp", label: { en: "WhatsApp Channel", bn: "হোয়াটসঅ্যাপ চ্যানেল" }, url: "https://whatsapp.com/channel/0029VbCiIHWFCCoP2afjbb1g" },
];
