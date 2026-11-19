/* =========================================================================
   8. REVIEWS SLIDER (arrows, dots, swipe, keyboard). No auto-sliding.
   Slide speed/feel: edit --slider-slide-duration and --slider-slide-easing in the CSS tokens.
   ========================================================================= */
const reviewCarousel = document.querySelector('#car');
const reviewTrack = document.querySelector('#track');
const reviewSlides = document.querySelectorAll('.slide');
const reviewDots = document.querySelectorAll('.dot');
const SWIPE_MIN_DISTANCE_PX = 50;      /* a drag shorter than this is ignored */
const SLIDE_COUNT = reviewSlides.length;
let currentSlideIndex = 0;
let swipeStartX = null;                /* where the finger/mouse went down; null = no drag in progress */

/* How many review cards are visible at once: 3 on laptop, 2 on tablet, 1 on mobile.
   >>> Keep in sync with the .slide widths in css/06-sections.css (640px / 1024px). */
function getPerView() {
  if (window.matchMedia('(min-width:1024px)').matches) return 3;
  if (window.matchMedia('(min-width:640px)').matches) return 2;
  return 1;
}

/* Highest valid first-visible-card index (so the last step is never half empty) */
const maxFirstSlide = () => Math.max(0, SLIDE_COUNT - getPerView());

/* Shows the window of cards that starts at card `index`; wraps around at both ends.
   One step moves exactly ONE card: with 11 cards that is 100/11 % of the track,
   which is correct for any screen size and any number of cards per view. */
function goToSlide(index) {
  const last = maxFirstSlide();
  currentSlideIndex = index > last ? 0 : index < 0 ? last : Math.min(index, last);
  reviewTrack.style.transform = `translateX(${-currentSlideIndex * (100 / SLIDE_COUNT)}%)`;
  /* Cards outside the current window cannot be tabbed into */
  const visibleUpTo = currentSlideIndex + getPerView();
  reviewSlides.forEach((slide, slideIndex) => { slide.inert = slideIndex < currentSlideIndex || slideIndex >= visibleUpTo; });
  reviewDots.forEach((dot, dotIndex) => dot.setAttribute('aria-current', dotIndex === currentSlideIndex));
}

/* Screen size change (laptop -> tablet -> phone): re-clamp the position so the
   visible window still fits, and keep the hidden/visible cards in sync */
addEventListener('resize', () => goToSlide(currentSlideIndex));

document.querySelector('#next').onclick = () => goToSlide(currentSlideIndex + 1);
document.querySelector('#prev').onclick = () => goToSlide(currentSlideIndex - 1);
reviewDots.forEach(dot => { dot.onclick = () => goToSlide(+dot.dataset.index); });

reviewCarousel.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') goToSlide(currentSlideIndex + 1);
  if (event.key === 'ArrowLeft') goToSlide(currentSlideIndex - 1);
});

/* Swipe: remember where the drag started, decide on release */
reviewTrack.addEventListener('pointerdown', event => { swipeStartX = event.clientX; });
addEventListener('pointerup', event => {
  if (swipeStartX !== null && Math.abs(event.clientX - swipeStartX) > SWIPE_MIN_DISTANCE_PX) {
    goToSlide(currentSlideIndex + (event.clientX < swipeStartX ? 1 : -1));   /* dragged left = next slide */
  }
  swipeStartX = null;
});

goToSlide(0);


