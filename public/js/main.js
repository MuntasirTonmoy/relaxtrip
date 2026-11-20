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
import '/js/01-icons.js';
import '/js/02-helpers.js';
import '/js/04-language.js';
import '/js/03-render.js';
import '/js/05-theme.js';
import '/js/06-header.js';
import '/js/07-faq.js';
import '/js/08-slider.js';
import '/js/09-counters.js';
import '/js/10-reveal.js';
import '/js/11-smooth-scroll.js';
import '/js/12-support.js';
import '/js/13-booking.js';

import { applyLanguage } from '/js/04-language.js';

/* START: write all texts for the current language (must stay the LAST line) */
applyLanguage();
