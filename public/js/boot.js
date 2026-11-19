/* Runs BEFORE the page is painted, so there is no flash of the wrong theme or language.
   It reads the visitor's saved choices and applies them to <html>. */
(function applySavedPreferencesBeforeFirstPaint() {
  var savedTheme, savedLanguage;
  try {
    savedTheme = localStorage.getItem('rt_theme');        /* 'dark' or 'light' (saved by the theme button) */
    savedLanguage = localStorage.getItem('rt_lang');      /* 'en' or 'bn' (saved by the language button) */
  } catch (error) { /* storage blocked: fall back to the device setting */ }

  var htmlElement = document.documentElement;
  var useDarkTheme = savedTheme ? savedTheme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  if (useDarkTheme) htmlElement.classList.add('dark');
  if (savedLanguage) htmlElement.lang = savedLanguage;
  htmlElement.classList.add('js');                         /* tells the CSS that JavaScript is running */
})();
