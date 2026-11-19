/* =========================================================================
   10. SCROLL REVEAL
   Elements with class "rv" start hidden (CSS section 7). When 12% visible they get
   class "in" (fade/slide in). The classes are removed afterwards so hover effects
   on those cards are not affected by the reveal transition.
   ========================================================================= */
const REVEAL_CLEANUP_DELAY_MS = 1000;

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    revealObserver.unobserve(entry.target);
    entry.target.classList.add('in');
    setTimeout(() => entry.target.classList.remove('rv', 'in'), REVEAL_CLEANUP_DELAY_MS);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.rv').forEach(element => revealObserver.observe(element));

