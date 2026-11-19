/* ---- ABOUT: number cards.
   type "counter": value counts up from 0 and shows a "+" (value is a number).
   type "text":    value is shown as written, e.g. "24/7" (value is a string).
   label = bold line, note = small line under it. ---- */
export const STAT_CARDS = [
  {
    type: "counter",
    value: 100,
    label: { en: "Domestic Flight Bookings", bn: "ডোমেস্টিক ফ্লাইট বুকিং" },
    note: { en: "(Verified Daily Fares)", bn: "(দৈনিক যাচাইকৃত ভাড়া)" },
  },
  {
    type: "counter",
    value: 50,
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

/* ---- REVIEWS: one slide each (video review card).
   videoId   = the YouTube video ID (the part after "v=" in the link). These are DUMMY ids - replace them.
   videoBadge = small label on the video poster.
   initials  = (optional) avatar letters; if missing they are made from the English name. ---- */
export const REVIEWS = [
  {
    name: { en: "Tanvir Ahmed", bn: "তানভীর আহমেদ" },
    location: { en: "Dhaka, Bangladesh", bn: "ঢাকা, বাংলাদেশ" },
    quote: {
      en: "\"RelaxTrip made our family trip to Cox's Bazar completely effortless. Tickets and hotel bookings were handled in minutes with great support!\"",
      bn: "\"রিল্যাক্সট্রিপ আমাদের কক্সবাজার পারিবারিক ভ্রমণকে অত্যন্ত সহজ করে তুলেছে। টিকিট এবং হোটেল বুকিং মাত্র কয়েক মিনিটে সম্পন্ন হয়েছে!\"",
    },
    videoBadge: { en: "Video Review: Cox's Bazar Trip", bn: "ভিডিও রিভিউ: কক্সবাজার ট্যুর" },
    videoId: "jNQXAC9IVRw",
  },
  {
    name: { en: "Sumaiya Rahman", bn: "সুমাইয়া রহমান" },
    location: { en: "Chattogram, Bangladesh", bn: "চট্টগ্রাম, বাংলাদেশ" },
    quote: {
      en: "\"I got my Dubai tourist visa and air ticket through RelaxTrip. Their pricing is transparent and the service is exceptionally professional.\"",
      bn: "\"আমি রিল্যাক্সট্রিপের মাধ্যমে আমার দুবাই ট্যুরিস্ট ভিসা ও এয়ার টিকিট সংগ্রহ করেছি। তাদের মূল্য অত্যন্ত স্বচ্ছ এবং সেবা পেশাদার।\"",
    },
    videoBadge: { en: "Video Review: Dubai Visa & Flight", bn: "ভিডিও রিভিউ: দুবাই ভিসা ও ফ্লাইট" },
    videoId: "jNQXAC9IVRw",
  },
  {
    name: { en: "Fahim Chowdhury", bn: "ফাহিম চৌধুরী" },
    location: { en: "Sylhet, Bangladesh", bn: "সিলেট, বাংলাদেশ" },
    quote: {
      en: "\"Outstanding 24/7 support. When my connecting flight was rescheduled, their team solved my ticket reissuance instantly.\"",
      bn: "\"অসাধারণ ২৪/৭ সাপোর্ট। কানেক্টিং ফ্লাইট পরিবর্তনের সময় এয়ারপোর্টে থাকা অবস্থায় তাদের টিম তাৎক্ষণিকভাবে সমাধান করে দিয়েছে।\"",
    },
    videoBadge: { en: "Video Review: 24/7 Support", bn: "ভিডিও রিভিউ: ২৪/৭ সাপোর্ট" },
    videoId: "jNQXAC9IVRw",
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
