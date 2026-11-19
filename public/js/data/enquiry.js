/* ---- HERO ENQUIRY WIDGET: the Air Ticket / Visa search card in the hero. When a visitor presses
   "Send on WhatsApp", a neatly arranged message opens in WhatsApp (to the number in CONTACT).
   To add a TAB: copy a whole { id: ... } block.  To add a FIELD: copy one { name: ... } line inside "fields".
   Tab:    id (any unique word), icon, label, messageIntro / messageClosing (first and last line of the WhatsApp message, English)
   Field:  name (unique in the tab)    type: "text" | "airport" (airport search pop-up) | "date" (calendar pop-up) | "select" (list pop-up) | "segmented" (pill buttons) | "travellers" (passenger pop-up)
           label, hint (small line under the value, optional), placeholder (text fields)
           columns: how wide on a big screen, out of 12 (3 = a quarter of the row; halves like 2.5 are fine). Smaller screens adapt by themselves.
           tablet: (optional) how wide on a tablet, out of 12 (default 6 = half, or 4 for narrow fields)
           required: true     options: [{ label, icon }] for select / segmented (icon = an icon name shown in the list; add value only if enableWhen needs it)
           searchable: true + searchPlaceholder = adds a search box to a select list      defaultCode: "DAC" = the airport chosen at the start (airport fields)
           swapWith: "to"  = adds the round swap button between this field and the named one
           enableWhen: { field: "tripType", value: "return" } = greyed out until another field has that value (clicking it switches that field)
           disabledText = text shown while greyed out      minFrom: "departure" = a date that cannot be before another date
           messageLabel = English name used in the WhatsApp message (defaults to the label)
   "travellers" field: counters [{ name, label, hint, min, max, value, omitIfZero, messageLabel }]
           classOptions { name, messageLabel, options } (the cabin class choices; leave out for no class)
           summarySub: "class" (small line shows the class) or "breakdown" (shows e.g. "2 Adult, 1 Child") ---- */
export const ENQUIRY_TABS = [
  {
    id: "flight",
    icon: "plane",
    label: { en: "Air Ticket", bn: "এয়ার টিকিট" },
    messageIntro: "Hello RelaxTrip! I would like to enquire about ✈️ Air ticket booking.",
    messageClosing: "Please share the best available fares. Thank you!",
    fields: [
      { name: "tripType", type: "segmented", columns: 12, label: { en: "Trip type", bn: "ট্রিপের ধরন" }, messageLabel: "Trip",
        options: [ { value: "one-way", label: { en: "One Way", bn: "ওয়ান ওয়ে" } }, { value: "return", label: { en: "Round Trip", bn: "রাউন্ড ট্রিপ" } } ] },
      { name: "from", type: "airport", columns: 2.5, required: true, swapWith: "to", defaultCode: "DAC", label: { en: "From", bn: "কোথা থেকে" }, placeholder: { en: "Select city", bn: "শহর বাছাই করুন" }, hint: { en: "City or airport", bn: "শহর বা বিমানবন্দর" } },
      { name: "to", type: "airport", columns: 2.5, required: true, label: { en: "To", bn: "কোথায়" }, placeholder: { en: "Select city", bn: "শহর বাছাই করুন" }, hint: { en: "City or airport", bn: "শহর বা বিমানবন্দর" } },
      { name: "departure", type: "date", columns: 2, required: true, label: { en: "Departure", bn: "যাত্রার তারিখ" } },
      { name: "return", type: "date", columns: 2, required: true, minFrom: "departure", enableWhen: { field: "tripType", value: "return" }, disabledText: { en: "Add Return", bn: "ফেরার তারিখ দিন" }, label: { en: "Return", bn: "ফেরার তারিখ" } },
      { name: "travellers", type: "travellers", columns: 3, tablet: 4, summarySub: "class", label: { en: "Passenger & Class", bn: "যাত্রী ও ক্লাস" },
        counters: [
          { name: "adults", min: 1, max: 9, value: 1, label: { en: "Adult", bn: "প্রাপ্তবয়স্ক" }, hint: { en: "12 years and above", bn: "১২ বছর ও তার বেশি" }, messageLabel: "Adults" },
          { name: "children", min: 0, max: 9, value: 0, omitIfZero: true, label: { en: "Child", bn: "শিশু" }, hint: { en: "2 to 11 years", bn: "২ থেকে ১১ বছর" }, messageLabel: "Children" },
          { name: "infants", min: 0, max: 9, value: 0, omitIfZero: true, label: { en: "Infant", bn: "ইনফ্যান্ট" }, hint: { en: "Below 2 years", bn: "২ বছরের কম" }, messageLabel: "Infants" },
        ],
        classOptions: { name: "cabin", messageLabel: "Class",
          options: [ { label: { en: "Economy", bn: "ইকোনমি" } }, { label: { en: "Premium Economy", bn: "প্রিমিয়াম ইকোনমি" } }, { label: { en: "Business", bn: "বিজনেস" } }, { label: { en: "First Class", bn: "ফার্স্ট ক্লাস" } } ] } },
    ],
  },
  {
    id: "visa",
    icon: "file-check",
    label: { en: "Visa Processing", bn: "ভিসা প্রসেসিং" },
    messageIntro: "Hello RelaxTrip! I would like to enquire about 🛂 Visa processing.",
    messageClosing: "Please let me know the required documents, fees and processing time. Thank you!",
    fields: [
      { name: "country", type: "text", columns: 3, required: true, label: { en: "Visa country", bn: "ভিসার দেশ" }, placeholder: { en: "e.g. Malaysia", bn: "যেমন মালয়েশিয়া" }, hint: { en: "Where do you want to go?", bn: "কোথায় যেতে চান?" }, messageLabel: "Destination country" },
      { name: "visaType", type: "select", columns: 3, searchable: true, searchPlaceholder: { en: "Search visa type", bn: "ভিসার ধরন খুঁজুন" }, label: { en: "Visa type", bn: "ভিসার ধরন" }, hint: { en: "Select", bn: "নির্বাচন করুন" }, messageLabel: "Visa type",
        options: [ { icon: "compass", label: { en: "Tourist", bn: "ট্যুরিস্ট" } }, { icon: "briefcase", label: { en: "Business", bn: "বিজনেস" } }, { icon: "cap", label: { en: "Student", bn: "স্টুডেন্ট" } }, { icon: "building", label: { en: "Work", bn: "ওয়ার্ক" } }, { icon: "heart", label: { en: "Medical", bn: "মেডিকেল" } }, { icon: "globe", label: { en: "Other", bn: "অন্যান্য" } } ] },
      { name: "travelDate", type: "date", columns: 3, label: { en: "Expected travel date", bn: "ভ্রমণের সম্ভাব্য তারিখ" }, messageLabel: "Expected travel date" },
      { name: "travellers", type: "travellers", columns: 3, summarySub: "breakdown", label: { en: "Passengers", bn: "যাত্রী" },
        counters: [
          { name: "adults", min: 1, max: 20, value: 1, label: { en: "Adult", bn: "প্রাপ্তবয়স্ক" }, hint: { en: "18 years or above", bn: "১৮ বছর বা তার বেশি" }, messageLabel: "Adults" },
          { name: "children", min: 0, max: 20, value: 0, omitIfZero: true, label: { en: "Child", bn: "শিশু" }, hint: { en: "Above 2 and below 18", bn: "২ বছরের বেশি, ১৮ বছরের কম" }, messageLabel: "Children" },
          { name: "infants", min: 0, max: 20, value: 0, omitIfZero: true, label: { en: "Infant", bn: "ইনফ্যান্ট" }, hint: { en: "Under 2 years", bn: "২ বছরের কম" }, messageLabel: "Infants" },
        ] },
    ],
  },
];

/* ---- AIRPORTS for the From / To pop-up. Visitors can search by city, country, airport name or code
   (the Bangla city name works too). To add an airport, copy one line.
   city = English city name, bn = Bangla city name (optional), country, airport = full airport name,
   code = 3-letter code, popular: true = listed under "Popular airports" before the visitor types anything.
   If a visitor types a place that is not in this list, they can still use what they typed. ---- */
export const AIRPORTS = [
  { city: "Dhaka", bn: "ঢাকা", country: "Bangladesh", airport: "Hazrat Shahjalal International Airport", code: "DAC", popular: true },
  { city: "Chittagong", bn: "চট্টগ্রাম", country: "Bangladesh", airport: "Shah Amanat International Airport", code: "CGP", popular: true },
  { city: "Cox's Bazar", bn: "কক্সবাজার", country: "Bangladesh", airport: "Cox's Bazar Airport", code: "CXB", popular: true },
  { city: "Sylhet", bn: "সিলেট", country: "Bangladesh", airport: "Osmani International Airport", code: "ZYL", popular: true },
  { city: "Jessore", bn: "যশোর", country: "Bangladesh", airport: "Jessore Airport", code: "JSR", popular: true },
  { city: "Saidpur", bn: "সৈয়দপুর", country: "Bangladesh", airport: "Saidpur Airport", code: "SPD", popular: true },
  { city: "Rajshahi", bn: "রাজশাহী", country: "Bangladesh", airport: "Shah Makhdum Airport", code: "RJH", popular: true },
  { city: "Barisal", bn: "বরিশাল", country: "Bangladesh", airport: "Barisal Airport", code: "BZL", popular: true },
  { city: "Dubai", bn: "দুবাই", country: "United Arab Emirates", airport: "Dubai International Airport", code: "DXB", popular: true },
  { city: "Abu Dhabi", bn: "আবুধাবি", country: "United Arab Emirates", airport: "Zayed International Airport", code: "AUH" },
  { city: "Sharjah", bn: "শারজাহ", country: "United Arab Emirates", airport: "Sharjah International Airport", code: "SHJ" },
  { city: "Doha", bn: "দোহা", country: "Qatar", airport: "Hamad International Airport", code: "DOH", popular: true },
  { city: "Jeddah", bn: "জেদ্দা", country: "Saudi Arabia", airport: "King Abdulaziz International Airport", code: "JED", popular: true },
  { city: "Riyadh", bn: "রিয়াদ", country: "Saudi Arabia", airport: "King Khalid International Airport", code: "RUH", popular: true },
  { city: "Medina", bn: "মদিনা", country: "Saudi Arabia", airport: "Prince Mohammad Bin Abdulaziz Airport", code: "MED" },
  { city: "Dammam", bn: "দাম্মাম", country: "Saudi Arabia", airport: "King Fahd International Airport", code: "DMM" },
  { city: "Muscat", bn: "মাস্কাট", country: "Oman", airport: "Muscat International Airport", code: "MCT" },
  { city: "Kuwait City", bn: "কুয়েত সিটি", country: "Kuwait", airport: "Kuwait International Airport", code: "KWI" },
  { city: "Bahrain", bn: "বাহরাইন", country: "Bahrain", airport: "Bahrain International Airport", code: "BAH" },
  { city: "Singapore", bn: "সিঙ্গাপুর", country: "Singapore", airport: "Changi Airport", code: "SIN", popular: true },
  { city: "Kuala Lumpur", bn: "কুয়ালালামপুর", country: "Malaysia", airport: "Kuala Lumpur International Airport", code: "KUL", popular: true },
  { city: "Bangkok", bn: "ব্যাংকক", country: "Thailand", airport: "Suvarnabhumi Airport", code: "BKK", popular: true },
  { city: "Jakarta", bn: "জাকার্তা", country: "Indonesia", airport: "Soekarno-Hatta International Airport", code: "CGK" },
  { city: "Colombo", bn: "কলম্বো", country: "Sri Lanka", airport: "Bandaranaike International Airport", code: "CMB" },
  { city: "Kathmandu", bn: "কাঠমান্ডু", country: "Nepal", airport: "Tribhuvan International Airport", code: "KTM" },
  { city: "Male", bn: "মালে", country: "Maldives", airport: "Velana International Airport", code: "MLE" },
  { city: "Kolkata", bn: "কলকাতা", country: "India", airport: "Netaji Subhas Chandra Bose International Airport", code: "CCU", popular: true },
  { city: "Delhi", bn: "দিল্লি", country: "India", airport: "Indira Gandhi International Airport", code: "DEL", popular: true },
  { city: "Mumbai", bn: "মুম্বাই", country: "India", airport: "Chhatrapati Shivaji Maharaj International Airport", code: "BOM" },
  { city: "Chennai", bn: "চেন্নাই", country: "India", airport: "Chennai International Airport", code: "MAA" },
  { city: "Istanbul", bn: "ইস্তাম্বুল", country: "Turkey", airport: "Istanbul Airport", code: "IST" },
  { city: "Cairo", bn: "কায়রো", country: "Egypt", airport: "Cairo International Airport", code: "CAI" },
  { city: "London", bn: "লন্ডন", country: "United Kingdom", airport: "Heathrow Airport", code: "LHR", popular: true },
  { city: "Manchester", bn: "ম্যানচেস্টার", country: "United Kingdom", airport: "Manchester Airport", code: "MAN" },
  { city: "Paris", bn: "প্যারিস", country: "France", airport: "Charles de Gaulle Airport", code: "CDG" },
  { city: "Frankfurt", bn: "ফ্রাঙ্কফুর্ট", country: "Germany", airport: "Frankfurt Airport", code: "FRA" },
  { city: "Hong Kong", bn: "হংকং", country: "Hong Kong", airport: "Hong Kong International Airport", code: "HKG" },
  { city: "Guangzhou", bn: "গুয়াংজু", country: "China", airport: "Baiyun International Airport", code: "CAN" },
  { city: "Tokyo", bn: "টোকিও", country: "Japan", airport: "Narita International Airport", code: "NRT" },
  { city: "Seoul", bn: "সিউল", country: "South Korea", airport: "Incheon International Airport", code: "ICN" },
  { city: "Toronto", bn: "টরন্টো", country: "Canada", airport: "Pearson International Airport", code: "YYZ" },
  { city: "New York", bn: "নিউ ইয়র্ক", country: "United States", airport: "John F. Kennedy International Airport", code: "JFK" },
  { city: "Sydney", bn: "সিডনি", country: "Australia", airport: "Kingsford Smith Airport", code: "SYD" },
];

/* First day of the week in the date pop-up calendar: 0 = Sunday, 6 = Saturday */
export const CALENDAR_WEEK_STARTS_ON = 0;
