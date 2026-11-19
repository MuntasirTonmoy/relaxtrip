# RelaxTrip — Static Website

A fully static, dependency-free website. Plain HTML + CSS + vanilla JavaScript — no framework, no build step. Deploys to Cloudflare Pages (or any static host) as-is.

## Project structure

```
relaxtrip/
├── README.md
└── public/                    ← deploy THIS folder (it is the website root)
    ├── index.html             ← page skeleton: <head>, body markup, logo SVG
    │
    ├── css/                   ← one file per section, loaded in number order
    │   ├── 01-tokens.css      ← ALL colors, fonts, spacing (edit colors here)
    │   ├── 02-base.css        ← html/body defaults, headings, links
    │   ├── 03-components.css  ← reusable pieces: section titles, cards, buttons
    │   ├── 04-header.css      ← top navigation bar
    │   ├── 05-hero.css        ← hero + enquiry widget positioning
    │   ├── 06-sections.css    ← services, why-us, team, FAQ, reviews…
    │   ├── 07-reveal-motion.css   ← scroll fade-in animations
    │   ├── 08-refinements.css ← small polish (hovers, badges)
    │   ├── 09-map-video-poster.css
    │   ├── 10-small-screens.css   ← phone/tablet adjustments
    │   ├── 11-mobile-menu-cta.css ← mobile drawer & floating CTA
    │   ├── 12-airlines-payments-support.css
    │   └── 13-enquiry-widget.css  ← the booking/enquiry form widget
    │
    └── js/
        ├── boot.js            ← runs before paint: applies saved theme/language
        ├── main.js            ← entry point: imports every numbered file in order
        │
        ├── 01-icons.js        ← icon library (SVG paths) + logo HTML
        ├── 02-helpers.js      ← small utilities (WhatsApp link, storage…)
        ├── 03-render.js       ← builds the whole page FROM the js/data/ files
        ├── 04-language.js     ← English/Bangla switching
        ├── 05-theme.js        ← light/dark mode
        ├── 06-header.js       ← nav bar behavior (scroll, mobile menu)
        ├── 07-faq.js          ← FAQ accordion
        ├── 08-slider.js       ← reviews slider
        ├── 09-counters.js     ← animated stat numbers
        ├── 10-reveal.js       ← scroll fade-in
        ├── 11-smooth-scroll.js
        ├── 12-support.js      ← floating support button
        ├── 13-booking.js      ← enquiry/booking widget logic
        │
        └── data/              ← ★ ALL EDITABLE CONTENT LIVES HERE ★
            ├── contact.js     ← phone, email, address, WhatsApp number
            ├── navigation.js  ← NAV_LINKS, TRUST_POINTS
            ├── enquiry.js     ← ENQUIRY_TABS, AIRPORTS, calendar settings
            ├── sections.js    ← STAT_CARDS, SERVICES, REVIEWS, WHY_US_ITEMS
            ├── team-faq.js    ← TEAM_MEMBERS, FAQ_ITEMS
            ├── partners.js    ← PARTNER_AIRLINES, PAYMENT_METHODS + logo URLs
            ├── support.js     ← SUPPORT_CHANNELS
            └── texts.js       ← SITE_TEXT (every UI label, in English + Bangla)
```

## How to edit

### Change texts, cards, prices, phones…
Open a file in **`public/js/data/`** — each file has comments explaining every field. The page rebuilds itself from this data when it loads; you never touch HTML or logic.

**Add / remove / reorder a card** (service, review, FAQ, team member, airport…): copy, delete, or move a whole `{ ... }` block inside the matching array. Keep the commas between blocks.

```js
// in js/data/sections.js
const SERVICES = [
  { icon: "plane", title_en: "Air Ticket", ... },
  { icon: "compass", title_en: "Holiday Package", ... },   // ← copy any block
];
```

**Change the WhatsApp number / email / address**: `js/data/contact.js` — used everywhere (buttons, footer, enquiry messages) automatically.

**Change a UI label** (e.g. "Book Now"): `js/data/texts.js` — every label has an `en` and a `bn` value. Update both.

### Change colors, fonts, sizes
All design tokens are at the top of **`public/css/01-tokens.css`** (light theme, plus the dark-theme overrides in the same file). Change one variable and the whole site updates.

### Add or change an icon
Icons live in `js/01-icons.js` under `ICON_PATHS` as `name: "svg path text"`. Add an entry (copy an SVG `d` path from any icon set, e.g. an icon inside `<svg><path d="…"/>`), then use `icon: "your-name"` in any data card.

### Logo
The big SVG `<symbol id="rt-mark">` inside `index.html` **is** the logo. It must stay inline (not in a separate file) so it inherits the theme colors. Edit the `<path>` fills there, or swap it for an `<img>` if you prefer a raster logo.

## Numbered file names = load order

CSS files and JS modules are numbered because **order matters** (later rules win in CSS; later modules depend on earlier ones). When adding a new file, give it the next number. You then need two small edits:

1. **CSS**: add `<link rel="stylesheet" href="css/14-myfile.css">` in `index.html` after `13-enquiry-widget.css`.
2. **JS**: create `js/14-myfile.js`, and in `js/main.js` add `import "./14-myfile.js";` (or `import { myFn } from "./14-myfile.js";` to use it elsewhere) before the final `applyLanguage()` call.

To **remove** a feature, delete its numbered file and its `<link>`/`import` line. Everything in `js/data/` is consumed by `03-render.js` and `13-booking.js`, so removing a data array also means removing the code that renders it — for normal edits you only touch `js/data/`.

## Test locally

ES modules don't run from `file://` URLs, so serve the folder:

```bash
cd public
python3 -m http.server 8000
# open http://localhost:8000
```

Any static server works (e.g. the Live Server extension in VS Code).

## Deploy to Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Upload assets**.
2. Drag and drop the **contents of `public/`** (or, if the project is in a Git repo, connect the repo and set the **build output directory** to `public` — leave the build command empty).
3. Done. There is no build step; every file is served as-is. Fanout caching and `Cache-Control` can be tuned later with a `_headers` file in `public/`.

That's the whole workflow: edit `js/data/*.js` → redeploy/drag-drop → site updated.
