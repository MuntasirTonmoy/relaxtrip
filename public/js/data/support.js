/* ---- SUPPORT BUTTON (bottom-right of every page): one row per contact option.
   type = "whatsapp", "phone" or "email" (the link comes from CONTACT at the top). icon = icon name.
   note = (optional) small line under the label; phone and email show the number / address automatically. ---- */
export const SUPPORT_CHANNELS = [
  { type: "whatsapp", icon: "msg", label: { en: "Chat on WhatsApp", bn: "হোয়াটসঅ্যাপে চ্যাট করুন" }, note: { en: "Message us anytime", bn: "যেকোনো সময় মেসেজ করুন" } },
  { type: "phone", icon: "phone", label: { en: "Call us", bn: "আমাদের কল করুন" } },
  { type: "email", icon: "mail", label: { en: "Email us", bn: "ইমেইল করুন" } },
];
