/* ---- ABOUT: number cards.
   type "counter": value counts up from 0 and shows a "+" (value is a number).
   type "text":    value is shown as written, e.g. "24/7" (value is a string).
   label = bold line, note = small line under it. ---- */
export const STAT_CARDS = [
  {
    type: "counter",
    value: 1000,
    label: { en: "Domestic Flight Bookings", bn: "ডোমেস্টিক ফ্লাইট বুকিং" },
    note: { en: "(Verified Daily Fares)", bn: "(দৈনিক যাচাইকৃত ভাড়া)" },
  },
  {
    type: "counter",
    value: 500,
    label: { en: "International Destinations", bn: "ইন্টারন্যাশনাল গন্তব্য" },
    note: { en: "(Global Airline Network)", bn: "(বৈশ্বিক এয়ারলাইন নেটওয়ার্ক)" },
  },
  {
    type: "text",
    value: "24/7",
    label: { en: "Booking Support", bn: "বুকিং সাপোর্ট" },
    note: { en: "(Emergency Assistance)", bn: "(জরুরি সহায়তা)" },
  },
  {
    type: "text",
    value: "1:1",
    label: { en: "Dedicated Consultants", bn: "ডেডিকেটেড কনসালট্যান্ট" },
    note: { en: "(Personal Guidance)", bn: "(ব্যক্তিগত দিকনির্দেশনা)" },
  },
];

/* ---- SERVICES: one card each. The whole card opens WhatsApp with a message about that service. ---- */
export const SERVICES = [
  {
    icon: "plane",
    title: { en: "Air Ticketing", bn: "এয়ার টিকেটিং" },
    description: {
      en: "Best price domestic and international flight bookings across major global airlines with immediate e-ticket issuance.",
      bn: "প্রধান প্রধান আন্তর্জাতিক ও দেশীয় এয়ারলাইন্সের সেরা মূল্যে ফ্লাইট বুকিং এবং তাৎক্ষণিক ই-টিকিট প্রদান।",
    },
  },
  {
    icon: "file-check",
    title: { en: "Visa Processing", bn: "ভিসা প্রসেসিং" },
    description: {
      en: "Expert consultancy and hassle-free tourist and business visa processing assistance for popular worldwide destinations.",
      bn: "জনপ্রিয় গন্তব্যের জন্য ট্যুরিস্ট ও বিজনেস ভিসা প্রসেসিংয়ে দক্ষ ও নির্ভরযোগ্য কনসালটেন্সি সহায়তা।",
    },
  },
  {
    icon: "map",
    title: { en: "Holiday Tour Packages", bn: "হলিডে ট্যুর প্যাকেজ" },
    description: {
      en: "Curated domestic tours (Cox's Bazar, Sylhet, Sundarbans) and international holiday packages tailored to your budget.",
      bn: "কক্সবাজার, সিলেট, সুন্দরবনসহ বিভিন্ন দেশীয় এবং আকর্ষণীয় আন্তর্জাতিক ট্যুর প্যাকেজ।",
    },
  },
  {
    icon: "bed",
    title: { en: "Hotel Booking", bn: "হোটেল বুকিং" },
    description: {
      en: "Seamless hotel reservations worldwide at competitive corporate rates with verified comfort and safety standards.",
      bn: "স্বচ্ছ কর্পোরেট রেটে এবং নিরাপদ আবাসন নিশ্চিত করে বিশ্বব্যাপী হোটেল রিজার্ভেশন।",
    },
  },
  {
    icon: "shield-plus",
    title: { en: "Travel Insurance", bn: "ট্রাভেল ইন্স্যুরেন্স" },
    description: {
      en: "Comprehensive international medical and trip cancellation insurance plans ensuring peace of mind abroad.",
      bn: "বিদেশে ভ্রমণের সময় পূর্ণ মানসিক শান্তির জন্য আন্তর্জাতিক মেডিকেল ও ট্রিপ ইন্স্যুরেন্স প্ল্যান।",
    },
  },
  {
    icon: "car",
    title: { en: "Airport Transfers", bn: "এয়ারপোর্ট ট্রান্সফার" },
    description: {
      en: "Reliable airport pickup and drop-off services as well as car rental assistance for your seamless travel experience.",
      bn: "নির্ভরযোগ্য এয়ারপোর্ট পিক-আপ ও ড্রপ-অফ সেবা এবং গাড়ি ভাড়ার সুবিধা।",
    },
  },
];

/* ---- REVIEWS: real customer recommendations taken from our Facebook page.
   HOW TO EDIT:
   - ADD a review: copy one { ... } block, paste it at the top or bottom, and change name + quote.
   - REMOVE a review: delete its { ... } block.
   quotes are shown exactly as customers wrote them (English or Bangla). The SAME text is used
   for both languages, so reviews switch between EN/BN unchanged - swap quote.bn for your own
   Bangla translation if you prefer.
   initials are made automatically from the English name. ---- */
export const REVIEWS = [
  {
    name: { en: "Md Rafik Ahmed", bn: "Md Rafik Ahmed" },
    quote: {
      en: "Excellent service! The booking process was smooth, quick, and hassle-free. Highly recommended for reliable air ticketing services.",
      bn: "Excellent service! The booking process was smooth, quick, and hassle-free. Highly recommended for reliable air ticketing services.",
    },
  },
  {
    name: { en: "Yeasin Arafat", bn: "Yeasin Arafat" },
    quote: {
      en: "Well and so much trustful... thanks for making our journey so easy and comfortable.",
      bn: "Well and so much trustful... thanks for making our journey so easy and comfortable.",
    },
  },
  {
    name: { en: "MD Forhad Ahmead", bn: "MD Forhad Ahmead" },
    quote: {
      en: "\u0985\u09a4\u09cd\u09af\u09a8\u09cd\u09a4 \u09ac\u09bf\u09b6\u09cd\u09ac\u09b8\u09cd\u09a4 \u098f\u0995\u099f\u09bf \u098f\u09af\u09bc\u09be\u09b0 \u099f\u09bf\u0995\u09bf\u099f\u09bf\u0982 \u09b8\u09be\u09b0\u09cd\u09ad\u09bf\u09b8\u0964 \u09a4\u09be\u09a6\u09c7\u09b0 \u09b8\u09be\u09b0\u09cd\u09ad\u09bf\u09b8\u09c7 \u0986\u09ae\u09bf \u09b8\u09a8\u09cd\u09a4\u09c1\u09b7\u09cd\u099f\u0964",
      bn: "\u0985\u09a4\u09cd\u09af\u09a8\u09cd\u09a4 \u09ac\u09bf\u09b6\u09cd\u09ac\u09b8\u09cd\u09a4 \u098f\u0995\u099f\u09bf \u098f\u09af\u09bc\u09be\u09b0 \u099f\u09bf\u0995\u09bf\u099f\u09bf\u0982 \u09b8\u09be\u09b0\u09cd\u09ad\u09bf\u09b8\u0964 \u09a4\u09be\u09a6\u09c7\u09b0 \u09b8\u09be\u09b0\u09cd\u09ad\u09bf\u09b8\u09c7 \u0986\u09ae\u09bf \u09b8\u09a8\u09cd\u09a4\u09c1\u09b7\u09cd\u099f\u0964",
    },
  },
  {
    name: { en: "Tareq Rahman", bn: "Tareq Rahman" },
    quote: {
      en: "\u09a4\u09be\u09a6\u09c7\u09b0 \u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0 \u0993 \u09b8\u09be\u09b0\u09cd\u09ad\u09bf\u09b8 \u09a6\u09c1\u099f\u09cb\u0987 \u0985\u09a8\u09c7\u0995 \u09ad\u09be\u09b2\u09cb\u0964 \u09ac\u09b0\u09cd\u09a4\u09ae\u09be\u09a8 \u09b8\u09ae\u09df\u09c7 \u098f\u0987 \u09b0\u0995\u09ae \u09b8\u09be\u09b0\u09cd\u09ad\u09bf\u09b8 \u0996\u09c1\u09ac\u0987 \u0995\u09ae \u09aa\u09be\u0993\u09df\u09be \u09af\u09be\u09df\u0964 \u09b8\u09ac \u0995\u09bf\u099b\u09c1\u09b0 \u099c\u09a8\u09cd\u09af \u09a7\u09a8\u09cd\u09af\u09ac\u09be\u09a6.",
      bn: "\u09a4\u09be\u09a6\u09c7\u09b0 \u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0 \u0993 \u09b8\u09be\u09b0\u09cd\u09ad\u09bf\u09b8 \u09a6\u09c1\u099f\u09cb\u0987 \u0985\u09a8\u09c7\u0995 \u09ad\u09be\u09b2\u09cb\u0964 \u09ac\u09b0\u09cd\u09a4\u09ae\u09be\u09a8 \u09b8\u09ae\u09df\u09c7 \u098f\u0987 \u09b0\u0995\u09ae \u09b8\u09be\u09b0\u09cd\u09ad\u09bf\u09b8 \u0996\u09c1\u09ac\u0987 \u0995\u09ae \u09aa\u09be\u0993\u09df\u09be \u09af\u09be\u09df\u0964 \u09b8\u09ac \u0995\u09bf\u099b\u09c1\u09b0 \u099c\u09a8\u09cd\u09af \u09a7\u09a8\u09cd\u09af\u09ac\u09be\u09a6.",
    },
  },
  {
    name: { en: "Tahsan Khan", bn: "Tahsan Khan" },
    quote: {
      en: "\u0986\u09ae\u09bf \u0986\u099c\u0995\u09c7 \u09ae\u09be\u09b2\u09af\u09bc\u09c7\u09b6\u09bf\u09af\u09bc\u09be\u09af\u09af\u09bc \u09b0\u09bf\u09b2\u09cd\u09af\u09be\u0995\u09cd\u09b8 \u099f\u09bf\u09aa \u098f\u09b0 \u09ae\u09be\u09a7\u09cd\u09af\u09ae\u09c7 \u099f\u09bf\u0995\u09c7\u099f \u0995\u09c7\u099f\u09c7 \u0986\u09b8\u099b\u09bf, \u0993\u09a8\u09be\u09a6\u09c7\u09b0 \u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0 \u0985\u09a8\u09c7\u0995 \u09ad\u09be\u09b2\u09cb \u098f\u09ac\u0982 \u0985\u09a8\u09c7\u0995 \u09b8\u09be\u09aa\u09cb\u09b0\u09cd\u099f\u09bf\u0982 \u09b8\u0995\u09b2 \u0995\u09bf\u099b\u09c1 \u0985\u09a8\u09c7\u0995 \u09b8\u09c1\u09a8\u09cd\u09a6\u09b0 \u0995\u09b0\u09c7 \u09ac\u09c1\u099d\u09bf\u09af\u09bc\u09c7 \u09a6\u09bf\u09af\u09bc\u09c7\u099b\u09bf\u09b2\u09c7\u09a8\u0964",
      bn: "\u0986\u09ae\u09bf \u0986\u099c\u0995\u09c7 \u09ae\u09be\u09b2\u09af\u09bc\u09c7\u09b6\u09bf\u09af\u09bc\u09be\u09af\u09af\u09bc \u09b0\u09bf\u09b2\u09cd\u09af\u09be\u0995\u09cd\u09b8 \u099f\u09bf\u09aa \u098f\u09b0 \u09ae\u09be\u09a7\u09cd\u09af\u09ae\u09c7 \u099f\u09bf\u0995\u09c7\u099f \u0995\u09c7\u099f\u09c7 \u0986\u09b8\u099b\u09bf, \u0993\u09a8\u09be\u09a6\u09c7\u09b0 \u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0 \u0985\u09a8\u09c7\u0995 \u09ad\u09be\u09b2\u09cb \u098f\u09ac\u0982 \u0985\u09a8\u09c7\u0995 \u09b8\u09be\u09aa\u09cb\u09b0\u09cd\u099f\u09bf\u0982 \u09b8\u0995\u09b2 \u0995\u09bf\u099b\u09c1 \u0985\u09a8\u09c7\u0995 \u09b8\u09c1\u09a8\u09cd\u09a6\u09b0 \u0995\u09b0\u09c7 \u09ac\u09c1\u099d\u09bf\u09af\u09bc\u09c7 \u09a6\u09bf\u09af\u09bc\u09c7\u099b\u09bf\u09b2\u09c7\u09a8\u0964",
    },
  },
  {
    name: { en: "Md Rafsan Imran", bn: "Md Rafsan Imran" },
    quote: {
      en: "I really appreciate their professionalism, honesty, and commitment to customer satisfaction.",
      bn: "I really appreciate their professionalism, honesty, and commitment to customer satisfaction.",
    },
  },
  {
    name: { en: "Habibur Rahman", bn: "Habibur Rahman" },
    quote: {
      en: "Very satisfied with their service. Highly recommended!",
      bn: "Very satisfied with their service. Highly recommended!",
    },
  },
  {
    name: { en: "Tufael Khan", bn: "Tufael Khan" },
    quote: {
      en: "Excellent service with reasonable prices.",
      bn: "Excellent service with reasonable prices.",
    },
  },
  {
    name: { en: "SK Walid", bn: "SK Walid" },
    quote: {
      en: "Excellent service with reasonable prices. Highly recommended.",
      bn: "Excellent service with reasonable prices. Highly recommended.",
    },
  },
  {
    name: { en: "Sam Fisher", bn: "Sam Fisher" },
    quote: {
      en: "Trusted and very well-behaved. After-sales service is top-notch. 100/100 recommended.",
      bn: "Trusted and very well-behaved. After-sales service is top-notch. 100/100 recommended.",
    },
  },
  {
    name: { en: "M M Sohan Parvez", bn: "M M Sohan Parvez" },
    quote: {
      en: "The admin's support and behavior is awesome.",
      bn: "The admin's support and behavior is awesome.",
    },
  },
];

/* ---- WHY US: numbered list (the numbers 01, 02, 03 ... are automatic) ---- */
export const WHY_US_ITEMS = [
  {
    title: { en: "Transparent Pricing", bn: "স্বচ্ছ মূল্য নির্ধারণ" },
    description: {
      en: "No hidden booking fees or surprise charges. You always get the exact transparent fare breakdown before confirmation.",
      bn: "কোনো লুকানো চার্জ বা অতিরিক্ত ফি নেই। কনফার্মেশনের আগেই আপনি পান সঠিক ফেয়ার ব্রেকডাউন।",
    },
  },
  {
    title: { en: "Expert Guidance", bn: "অভিজ্ঞ দিকনির্দেশনা" },
    description: {
      en: "Our seasoned travel consultants provide personalized itinerary planning and visa advice tailored to your needs.",
      bn: "আমাদের অভিজ্ঞ ট্রাভেল কনসালট্যান্টরা আপনার প্রয়োজন অনুযায়ী পার্সোনালাইজড আইটিনারি প্রদান করেন।",
    },
  },
  {
    title: { en: "Around-The-Clock Support", bn: "সার্বক্ষণিক সহায়তা" },
    description: {
      en: "Flight delayed or need an emergency reschedule? Our customer support team is available 24/7 to assist you.",
      bn: "ফ্লাইট বিলম্ব বা জরুরি রিসিজউল প্রয়োজন? আমাদের কাস্টমার সাপোর্ট টিম ২৪/৭ প্রস্তুত রয়েছে।",
    },
  },
];
