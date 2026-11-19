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
   "#top" (logo, back-to-top) shows the clean address (relaxtrip.com/) instead of "#top" in the URL bar. */
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || link.getAttribute('href').length < 2) return;
  event.preventDefault();
  const sectionId = link.getAttribute('href').slice(1);
  const newUrl = sectionId === 'top' ? location.pathname + location.search : '#' + sectionId;
  scrollToSection(sectionId);
  try { history.replaceState(null, '', newUrl); } catch (error) { /* some previews block this: ignore */ }
});

