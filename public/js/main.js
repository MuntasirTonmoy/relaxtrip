/* =========================================================================
   MAIN ENTRY - loads every feature file in order, then starts the site.
   -------------------------------------------------------------------------
   One file per part of the page (same numbering as the CSS files):
     01-icons.js          SVG icon set, logo pieces
     02-helpers.js        preferences, contact links, small utilities
     03-render.js         builds the page cards from js/data/
     04-language.js       English / Bangla switch and text lookup
     05-theme.js          light / dark switch
     06-header.js         mobile menu, scroll shadow, current-section highlight
     07-faq.js            FAQ accordion
     08-slider.js         reviews slider
     09-counters.js       number count-up
     10-reveal.js         fade-in on scroll
     11-smooth-scroll.js  smooth section navigation
     12-support.js        floating support button
     13-booking.js        hero enquiry widget (-> WhatsApp)
   Site texts and cards: edit the files in js/data/.
   IMPORT ORDER below = execution order. applyLanguage() must stay last.
   ========================================================================= */
import './01-icons.js';
import './02-helpers.js';
import './04-language.js';
import './03-render.js';
import './05-theme.js';
import './06-header.js';
import './07-faq.js';
import './08-slider.js';
import './09-counters.js';
import './10-reveal.js';
import './11-smooth-scroll.js';
import './12-support.js';
import './13-booking.js';

import { applyLanguage } from './04-language.js';

/* START: write all texts for the current language (must stay the LAST line) */
applyLanguage();
