import { siteHeader } from './06-header.js';
import { prefersReducedMotion } from './02-helpers.js';

/* =========================================================================
   11. SMOOTH SCROLLING TO A SECTION
   Lands so the section's heading sits just under the sticky header, then checks
   again once scrolling stops, in case the layout moved while scrolling.
   ========================================================================= */
const EXTRA_TOP_SPACE_TO_TRIM_PX = 24;   /* section top padding minus this = space left above the heading */
const POSITION_TOLERANCE_PX = 3;          /* ignore tiny differences when re-checking */

function scrollToSection(sectionId) {
  const headerHeight = siteHeader.offsetHeight;
  const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

  if (sectionId === 'top') {
    scrollTo({ top: 0, behavior: scrollBehavior });
    return;
  }
  const section = document.getElementById(sectionId);
  if (!section) return;

  const sectionTopPadding = parseFloat(getComputedStyle(section).paddingTop) || 0;
  const paddingToSkip = Math.max(sectionTopPadding - EXTRA_TOP_SPACE_TO_TRIM_PX, 0);
  /* a function (not a number) so it is measured again at the end, after any layout change */
  const targetScrollY = () => Math.max(section.getBoundingClientRect().top + scrollY + paddingToSkip - headerHeight, 0);

  scrollTo({ top: targetScrollY(), behavior: scrollBehavior });

  const correctPositionIfNeeded = () => {
    if (Math.abs(targetScrollY() - scrollY) > POSITION_TOLERANCE_PX) scrollTo({ top: targetScrollY(), behavior: 'auto' });
  };
  if ('onscrollend' in window) addEventListener('scrollend', correctPositionIfNeeded, { once: true });
  setTimeout(correctPositionIfNeeded, prefersReducedMotion ? 60 : 1300);   /* fallback for browsers without "scrollend" */
}

/* Every link that points to "#something" scrolls with the function above.
   The URL bar shows the section as a PATH (relaxtrip.com/reviews), never with #.
   Pasted or refreshed path links still land on the right section: on Cloudflare Pages the public/_redirects
   file serves index.html for any path, and the small router below scrolls to the matching section. */
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || link.getAttribute('href').length < 2) return;
  event.preventDefault();
  const sectionId = link.getAttribute('href').slice(1);
  scrollToSection(sectionId);
  const newUrl = sectionId === 'top' ? '/' : '/' + sectionId;
  try { window.history.replaceState(null, '', newUrl); } catch (error) { /* some previews block this: ignore */ }
});

/* Path router: on load, a path matching a section id (/, /reviews, /faq ...) scrolls to that section.
   A #hash on the actual URL is left to the browser, which jumps on its own. */
if (window.location && !window.location.hash) {
  const pathSection = decodeURIComponent(window.location.pathname).replace(/\/+$/, '').split('/').pop();
  if (pathSection && document.getElementById(pathSection)) scrollToSection(pathSection);
}

