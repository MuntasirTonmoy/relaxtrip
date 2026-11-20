import { localizeDigits } from '/js/04-language.js';
import { prefersReducedMotion } from '/js/02-helpers.js';

/* =========================================================================
   9. NUMBER COUNTERS (count up once, when 60% visible)
   ========================================================================= */
const COUNT_UP_DURATION_MS = 1400;

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    counterObserver.unobserve(entry.target);                 /* only count once */
    const counterElement = entry.target;
    const targetNumber = +counterElement.dataset.count;
    const startTime = performance.now();

    if (prefersReducedMotion) {                              /* no animation: show the final number */
      counterElement.textContent = localizeDigits(targetNumber) + '+';
      counterElement.dataset.done = 1;
      return;
    }
    (function showNextFrame(now) {
      const progress = Math.min((now - startTime) / COUNT_UP_DURATION_MS, 1);   /* 0 -> 1 */
      const easedProgress = 1 - Math.pow(1 - progress, 3);                      /* fast start, slow finish */
      counterElement.textContent = localizeDigits(Math.round(targetNumber * easedProgress)) + '+';
      if (progress < 1) requestAnimationFrame(showNextFrame);
      else counterElement.dataset.done = 1;                                     /* language switch may now re-format it */
    })(startTime);
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach(counter => counterObserver.observe(counter));

