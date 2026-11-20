import { NAV_LINKS } from '/js/data/navigation.js';

/* =========================================================================
   6. HEADER: mobile menu, shadow on scroll, "current section" highlight
   ========================================================================= */
export const siteHeader = document.querySelector('#hdr');
const mobileMenu = document.querySelector('#mnav');
const menuButton = document.querySelector('#burger');

function setMobileMenuOpen(shouldBeOpen) {
  mobileMenu.classList.toggle('open', shouldBeOpen);
  menuButton.setAttribute('aria-expanded', shouldBeOpen);
}

menuButton.onclick = () => setMobileMenuOpen(!mobileMenu.classList.contains('open'));
mobileMenu.addEventListener('click', event => {
  if (event.target.closest('a')) setMobileMenuOpen(false);        /* close after choosing a link */
});
addEventListener('keydown', event => {
  if (event.key === 'Escape') setMobileMenuOpen(false);
});
document.addEventListener('click', event => {
  if (!event.composedPath().includes(siteHeader)) setMobileMenuOpen(false);   /* click outside the header closes it */
});

/* Header gets a shadow (class "sc") after the page is scrolled a little */
addEventListener('scroll', () => siteHeader.classList.toggle('sc', scrollY > 8), { passive: true });

/* "Current section" highlight: the nav link of the section you are reading gets class "on".
   The section you are reading = the LAST section whose top edge has passed the "reading line"
   (a line 40% down the screen). Above the first section (the hero) NO link is highlighted.
   It is recalculated on every scroll (once per animation frame) and on resize, so it is always
   correct, including when you scroll back up to the top. */
const READING_LINE_FRACTION = 0.4;
let currentSectionCheckScheduled = false;

function highlightCurrentSectionLink() {
  const readingLineY = window.innerHeight * READING_LINE_FRACTION;
  let currentSectionId = null;   /* null = still in the hero, nothing to highlight */
  NAV_LINKS.forEach(({ sectionId }) => {
    if (document.getElementById(sectionId).getBoundingClientRect().top <= readingLineY) currentSectionId = sectionId;
  });
  document.querySelectorAll('.hdr .nav-link').forEach(link => {
    link.classList.toggle('on', link.getAttribute('href') === '#' + currentSectionId);
  });
}

function scheduleCurrentSectionCheck() {
  if (currentSectionCheckScheduled) return;          /* already queued for the next frame */
  currentSectionCheckScheduled = true;
  requestAnimationFrame(() => {
    currentSectionCheckScheduled = false;
    highlightCurrentSectionLink();
  });
}
addEventListener('scroll', scheduleCurrentSectionCheck, { passive: true });
addEventListener('resize', scheduleCurrentSectionCheck);
highlightCurrentSectionLink();

