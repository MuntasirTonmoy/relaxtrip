import { safeStorage } from './02-helpers.js';

/* =========================================================================
   5. THEME (light / dark)
   The class "dark" on <html> switches every colour token (see CSS section 1).
   The first choice is applied by the small script in <head> to avoid a flash.
   ========================================================================= */
const htmlElement = document.documentElement;
const themeToggleButton = document.querySelector('#theme');
let userChoseThemeManually = false;   /* once true, the device's own dark-mode setting is ignored */

themeToggleButton.setAttribute('aria-pressed', htmlElement.classList.contains('dark'));

themeToggleButton.onclick = () => {
  userChoseThemeManually = true;
  const isDarkNow = htmlElement.classList.toggle('dark');
  safeStorage.set('rt_theme', isDarkNow ? 'dark' : 'light');
  themeToggleButton.setAttribute('aria-pressed', isDarkNow);
};

/* Follow the device setting only while the visitor has never chosen a theme */
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  if (!userChoseThemeManually && !safeStorage.get('rt_theme')) {
    htmlElement.classList.toggle('dark', event.matches);
    themeToggleButton.setAttribute('aria-pressed', event.matches);
  }
});

