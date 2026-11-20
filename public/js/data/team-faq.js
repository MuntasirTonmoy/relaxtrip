/* ---- TEAM: one photo card each (photos live in public/images/team/).
   TO ADD: put the photo file in images/team/, then copy one { ... } block and change
   name / role / photo. TO REMOVE: delete the whole { ... } block.
   A member without a photo falls back to initials automatically. ---- */
export const TEAM_MEMBERS = [
  {
    name: { en: "Shahin Hossain (Sagor)", bn: "শাহিন হোসসেন (সাগর)" },
    role: { en: "Managing Partner", bn: "ম্যানেজিং পার্টনার" },
    photo: "/images/team/shahin.jpg",
  },
  {
    name: { en: "Muntasir Hossain", bn: "মুনতাসির হোসেন" },
    role: { en: "Managing Partner", bn: "ম্যানেজিং পার্টনার" },
    photo: "/images/team/muntasir.jpg",
  },
  {
    name: { en: "Rumman Khan", bn: "রুম্মান খান" },
    role: { en: "Managing Partner", bn: "ম্যানেজিং পার্টনার" },
    photo: "/images/team/rumman.jpg",
  },
  {
    name: { en: "Mehreen Asha", bn: "মহরিন আশা" },
    role: { en: "Reservation Officer", bn: "রিজার্ভেশন অফিসার" },
    photo: "/images/team/mehreen.jpg",
  },
  {
    name: { en: "Sk Walid", bn: "এসকে বালিদ" },
    role: { en: "Visualizer", bn: "ভিজুয়ালাইজার" },
    photo: "/images/team/walid.jpg",
  },
  {
    name: { en: "Any Chakraborty", bn: "আনি চক্রবর্ত্তী" },
    role: { en: "Customer Relationship Officer", bn: "কাস্টমার রিলেশনশিপ অফিসার" },
    photo: "/images/team/anny.jpg",
  },
  {
    name: { en: "M M Sohan Parvez", bn: "এম এম সোহান পরবেজ" },
    role: { en: "Accounts Manager", bn: "অ্যাকাউন্টস ম্যানেজার" },
    photo: "/images/team/sohan.jpg",
  },
  {
    name: { en: "Habibur Rahman", bn: "হাবিবুর রহমান" },
    role: { en: "Senior Developer", bn: "সিনিয়র ডেভেলপার" },
    photo: "/images/team/habibur.jpg",
  },
];

/* ---- FAQ: question and answer pairs (only one answer is open at a time) ---- */
export const FAQ_ITEMS = [
  {
    question: {
      en: "How can I book an air ticket through RelaxTrip?",
      bn: "রিল্যাক্সট্রিপের মাধ্যমে কীভাবে এয়ার টিকিট বুক করব?",
    },
    answer: {
      en: "You can book directly by calling our hotline, visiting our office in Dhaka, or sending us your travel details via WhatsApp or email. Our team will instantly issue your e-ticket.",
      bn: "আপনি আমাদের হটলাইনে কল করে,ঢাকায় আমাদের অফিসে এসে অথবা হোয়াটসঅ্যাপ বা ইমেইলের মাধ্যমে সরাসরি বুক করতে পারেন। আমাদের টিম তাৎক্ষণিকভাবে ই-টিকিট ইস্যু করে দেবে।",
    },
  },
  {
    question: {
      en: "What payment methods do you accept?",
      bn: "আপনারা কি ধরনের পেমেন্ট পদ্ধতি গ্রহণ করেন?",
    },
    answer: {
      en: "We accept mobile financial services like bKash, Nagad, and Rocket, bank transfers, credit/debit cards (Visa, MasterCard, Amex), and cash payments at our office.",
      bn: "আমরা বিকাশ, নগদ, রকেটের মতো মোবাইল ফাইন্যান্সিয়াল সার্ভিস, ব্যাংক ট্রান্সফার, ক্রেডিট/ডেবিট কার্ড (ভিসা, মাস্টারকার্ড, অ্যামেক্স) এবং অফিসে ক্যাশ পেমেন্ট গ্রহণ করি।",
    },
  },
  {
    question: {
      en: "Do you provide visa processing assistance?",
      bn: "আপনারা কি ভিসা প্রসেসিং সহায়তা দেন?",
    },
    answer: {
      en: "Yes! We provide complete documentation support and consultancy for tourist and business visas to countries including India, Dubai, Thailand, Malaysia, Singapore, and more.",
      bn: "হ্যাঁ! ভারত, দুবাই, থাইল্যান্ড, মালয়েশিয়া, সিঙ্গাপুরসহ বিভিন্ন দেশের ট্যুরিস্ট ও বিজনেস ভিসার জন্য আমরা সম্পূর্ণ ডকুমেন্টেশন ও কনসালটেন্সি সহায়তা দিয়ে থাকি।",
    },
  },
  {
    question: {
      en: "Can I cancel or reschedule my flight ticket?",
      bn: "আমি কি আমার ফ্লাইট টিকিট বাতিল বা রিশিডিউল করতে পারব?",
    },
    answer: {
      en: "Yes, cancellations and rescheduling are subject to airline policies and fare classes. Contact our 24/7 customer support immediately, and we will process it for you.",
      bn: "হ্যাঁ, এয়ারলাইন্সের নীতিমালা এবং ফেয়ার ক্লাস অনুযায়ী টিকিট বাতিল বা রিশিডিউল করা সম্ভব। আমাদের ২৪/৭ কাস্টমার সাপোর্টে অবিলম্বে যোগাযোগ করুন।",
    },
  },
];
