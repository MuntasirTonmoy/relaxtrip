/* =========================================================================
   8. REVIEWS SLIDER (arrows, dots, swipe, keyboard). No auto-sliding.
   Slide speed/feel: edit --slider-slide-duration and --slider-slide-easing in the CSS tokens.
   ========================================================================= */
const reviewCarousel = document.querySelector('#car');
const reviewTrack = document.querySelector('#track');
const reviewSlides = document.querySelectorAll('.slide');
const reviewDots = document.querySelectorAll('.dot');
const SWIPE_MIN_DISTANCE_PX = 50;      /* a drag shorter than this is ignored */
let currentSlideIndex = 0;
let swipeStartX = null;                /* where the finger/mouse went down; null = no drag in progress */

/* Shows slide number `index`; wraps around at both ends */
function goToSlide(index) {
  currentSlideIndex = (index + reviewSlides.length) % reviewSlides.length;
  reviewTrack.style.transform = `translateX(${-currentSlideIndex * 100}%)`;
  reviewSlides.forEach((slide, slideIndex) => { slide.inert = slideIndex !== currentSlideIndex; });   /* hidden slides cannot be tabbed into */
  reviewDots.forEach((dot, dotIndex) => dot.setAttribute('aria-current', dotIndex === currentSlideIndex));
}

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


