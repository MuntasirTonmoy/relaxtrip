/* =========================================================================
   8. CAROUSELS (arrows, dots, swipe, keyboard). No auto-sliding.
   Used by the Reviews slider and the Team slider; any section can add its own
   by giving it the same markup (see index.html) and calling setupCarousel below.
   One step moves exactly ONE card.
   Dots are rebuilt automatically so there is exactly ONE dot per possible
   position (cards - per-view + 1) — no dead dots on any screen size.
   Slide speed/feel: edit --slider-slide-duration and --slider-slide-easing in the CSS tokens.
   ========================================================================= */
const SWIPE_MIN_DISTANCE_PX = 50;      /* a drag shorter than this is ignored */

/* How many cards are visible at once: 3 on laptop, 2 on tablet, 1 on mobile.
   >>> Keep in sync with the .slide widths in css/06-sections.css (640px / 1024px). */
function getPerView() {
  if (window.matchMedia('(min-width:1024px)').matches) return 3;
  if (window.matchMedia('(min-width:640px)').matches) return 2;
  return 1;
}

/* Wires up one carousel. `root` is the slider block (holds the arrows and the
   .dots container), `track` is the .track row holding the .slide cards. */
function setupCarousel(root, track) {
  const slides = track.querySelectorAll('.slide');
  const dotsRoot = root.querySelector('.dots');
  const SLIDE_COUNT = slides.length;
  let dots = [];
  let currentSlideIndex = 0;
  let swipeStartX = null;             /* where the finger/mouse went down; null = no drag in progress */

  /* Highest valid first-visible-card index (so the last step is never half empty) */
  const maxFirstSlide = () => Math.max(0, SLIDE_COUNT - getPerView());

  /* (Re)build the dots: cards - per-view + 1 positions. Called once and again
     whenever the breakpoint changes the per-view count. */
  function buildDots() {
    dotsRoot.innerHTML = Array.from({ length: maxFirstSlide() + 1 }, (_, index) =>
      `<button class="dot" data-index="${index}" aria-label="Go to ${index + 1}"></button>`
    ).join('');
    dots = [...dotsRoot.querySelectorAll('.dot')];
    dots.forEach(dot => { dot.onclick = () => goToSlide(+dot.dataset.index); });
  }

  /* Shows the window of cards that starts at card `index`; wraps around at both ends.
     One step moves exactly ONE card. The track is as wide as the viewport (one page),
     so one card = 100 / cards-per-view % of the track (100% on mobile, 50% on tablet,
     33.33% on laptop). */
  function goToSlide(index) {
    const cardsPerView = getPerView();
    const last = maxFirstSlide();
    currentSlideIndex = index > last ? 0 : index < 0 ? last : Math.min(index, last);
    /* Last position: align the END of the card row with the END of the viewport in real pixels.
       This avoids the fraction-of-a-percent rounding error (card basis is 33.3333% of the track)
       that could otherwise leave the last card slightly cut off or the window not fully filled. */
    const overflowAtEndPx = track.scrollWidth - track.clientWidth;
    const endAlign = currentSlideIndex === last && overflowAtEndPx > 0 ? `translateX(-${overflowAtEndPx}px)` : `translateX(${-currentSlideIndex * (100 / cardsPerView)}%)`;
    track.style.transform = endAlign;
    /* Cards outside the current window cannot be tabbed into */
    const visibleUpTo = currentSlideIndex + cardsPerView;
    slides.forEach((slide, slideIndex) => { slide.inert = slideIndex < currentSlideIndex || slideIndex >= visibleUpTo; });
    dots.forEach((dot, dotIndex) => dot.setAttribute('aria-current', dotIndex === currentSlideIndex));
  }

  root.querySelector('[data-prev]').onclick = () => goToSlide(currentSlideIndex - 1);
  root.querySelector('[data-next]').onclick = () => goToSlide(currentSlideIndex + 1);

  root.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') goToSlide(currentSlideIndex + 1);
    if (event.key === 'ArrowLeft') goToSlide(currentSlideIndex - 1);
  });

  /* Swipe: remember where the drag started, decide on release */
  track.addEventListener('pointerdown', event => { swipeStartX = event.clientX; });
  addEventListener('pointerup', event => {
    if (swipeStartX !== null && Math.abs(event.clientX - swipeStartX) > SWIPE_MIN_DISTANCE_PX) {
      goToSlide(currentSlideIndex + (event.clientX < swipeStartX ? 1 : -1));   /* dragged left = next slide */
    }
    swipeStartX = null;
  });

  /* Screen size change (laptop -> tablet -> phone): if the number of positions
     changed, rebuild the dots; then re-clamp the position so the visible window
     still fits, and keep the hidden/visible cards in sync */
  let lastDotCount = -1;
  addEventListener('resize', () => {
    if (dots.length !== maxFirstSlide() + 1) buildDots();
    goToSlide(currentSlideIndex);
  });

  buildDots();
  goToSlide(0);
}

setupCarousel(document.querySelector('#car'), document.querySelector('#track'));
setupCarousel(document.querySelector('#tcar'), document.querySelector('#ttrack'));
