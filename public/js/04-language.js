import { CONTACT } from '/js/data/contact.js';
import { SITE_TEXT } from '/js/data/texts.js';
import { WORDMARK_HTML, LANGUAGE_FLAG_SVG } from '/js/01-icons.js';
import { safeStorage } from '/js/02-helpers.js';

/* The address and opening hours are edited in CONTACT but shown through the normal text system,
   so they also switch between English and Bangla. */
SITE_TEXT.office_address = CONTACT.address;
SITE_TEXT.office_hours = CONTACT.openingHours;

export let currentLanguage = document.documentElement.lang === 'bn' ? 'bn' : 'en';

/* In Bangla mode, turns 0-9 into ০-৯. In English mode returns the value as text. */
export function localizeDigits(value) {
  return currentLanguage === 'bn'
    ? String(value).replace(/\d/g, digit => '০১২৩৪৫৬৭৮৯'[digit])
    : String(value);
}

/* Card texts live inside their card ({ en, bn }). The language switch finds every text by a key,
   so each card text gets an automatic key such as "team_2_role", saved into SITE_TEXT.
   Returns that key so it can be written into data-i18n="...". */
export function cardText(keyPrefix, cardIndex, fieldName, bilingualText) {
  const key = `${keyPrefix}_${cardIndex + 1}_${fieldName}`;
  SITE_TEXT[key] = bilingualText;
  return key;
}

/* Looks up the text for a key in the current language and applies the small fixes below. */
export function translate(key) {
  const entry = SITE_TEXT[key] || {};
  let text = entry[currentLanguage] ?? entry.en ?? '';
  text = text.replace('{WM}', WORDMARK_HTML);                                  /* insert the coloured wordmark */
  if (!text.includes('<') && currentLanguage === 'en') text = text.replace(/'/g, '’');   /* curly apostrophes */
  if (!text.includes('<') && currentLanguage === 'bn') text = localizeDigits(text);   /* Bangla numerals even if a bn text was typed with 0-9 */
  text = text.replace(/2026|২০২৬/, localizeDigits(new Date().getFullYear())); /* always show the current year */
  if (/^review_\d+_quote$/.test(key)) {                                        /* review quotes get curly quote marks */
    text = '“' + text.replace(/^["“]|["”]$/g, '') + '”';
  }
  return text;
}


/* =========================================================================
   4. LANGUAGE (English / Bangla)
   ========================================================================= */
/* Other feature files (the enquiry widget) register functions here that must
   re-draw their script-written texts when the language changes. */
const onLanguageChangeListeners = [];
export function onLanguageChange(callback) { onLanguageChangeListeners.push(callback); }

const languageButton = document.querySelector('#lang');
const languageButtonLabel = document.querySelector('#lang-l');
const languageButtonFlag = document.querySelector('#flag');

/* Re-writes every translated text on the page for currentLanguage */
export function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  safeStorage.set('rt_lang', currentLanguage);

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const text = translate(element.dataset.i18n);
    if (text.includes('<')) element.innerHTML = text;   /* text that contains HTML, e.g. the wordmark */
    else element.textContent = text;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    element.setAttribute('placeholder', translate(element.dataset.i18nPlaceholder));   /* texts inside input boxes */
  });
  onLanguageChangeListeners.forEach(listener => listener());   /* parts built by script (dates, passenger summaries) re-write themselves */
  document.querySelectorAll('[data-num]').forEach(element => {
    element.textContent = localizeDigits(element.dataset.num);
  });
  document.querySelectorAll('[data-count]').forEach(element => {
    if (element.dataset.done) element.textContent = localizeDigits(element.dataset.count) + '+';   /* only after it finished counting */
  });

  /* The button advertises the language you will switch TO */
  const nextLanguageIsBangla = currentLanguage === 'en';
  languageButtonLabel.textContent = nextLanguageIsBangla ? 'বাংলা' : 'EN';
  languageButtonFlag.innerHTML = LANGUAGE_FLAG_SVG[nextLanguageIsBangla ? 'bn' : 'en'];
  languageButton.setAttribute('aria-label', nextLanguageIsBangla ? 'Switch language to Bangla' : 'ভাষা ইংরেজিতে পরিবর্তন করুন');
}

languageButton.onclick = () => {
  currentLanguage = currentLanguage === 'en' ? 'bn' : 'en';
  applyLanguage();
};

