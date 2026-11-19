import { ENQUIRY_TABS, AIRPORTS, CALENDAR_WEEK_STARTS_ON } from './data/enquiry.js';
import { iconSvg } from './01-icons.js';
import { whatsappLink, prefersReducedMotion } from './02-helpers.js';
import { cardText, translate, localizeDigits, currentLanguage, onLanguageChange } from './04-language.js';

/* =========================================================================
   13. HERO ENQUIRY WIDGET (Air Ticket / Visa -> a neatly arranged WhatsApp message)
   The tabs and fields come from ENQUIRY_TABS in the content script. Nothing is sent to a server:
   pressing the button just opens WhatsApp with the message already typed.
   Every field card opens a pop-up under it: airport search, calendar, visa-type list or the passenger counters.
   ========================================================================= */
const bookingTabsBox = document.querySelector('#booking-tabs');
const bookingPanelsBox = document.querySelector('#booking-panels');
const toIsoDate = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const todayAsInputValue = toIsoDate(new Date());                    /* today as "YYYY-MM-DD" in the visitor's own time zone */
const escapeHtml = text => text.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

/* One field -> HTML. Every field is a "card": small label, big value, small line under it. */
function enquiryFieldHtml(tab, field) {
  const idPrefix = `enquiry-${tab.id}-${field.name}`;
  const keyPrefix = `enquiry_${tab.id}_${field.name}`;
  const desktopColumns = field.columns || 3;                       /* out of 12 (halves allowed) */
  const tabletColumns = field.tablet || (desktopColumns >= 12 ? 12 : desktopColumns >= 2.5 ? 6 : 4);
  const phoneColumns = desktopColumns >= 2.5 || field.type === 'travellers' ? 12 : 6;     /* a field of 12 is always a full row */
  const labelKey = cardText(keyPrefix, 0, 'label', field.label);
  const wrapperStart = (extraClass = '', extraAttributes = '') =>
    `<div class="f ${extraClass}" data-field="${field.name}" data-type="${field.type}" style="--c-desktop:${desktopColumns};--c-tablet:${tabletColumns};--c-phone:${phoneColumns}"` +
    (field.enableWhen ? ` data-enable-when-field="${field.enableWhen.field}" data-enable-when-value="${field.enableWhen.value}"` : '') +
    (field.disabledText ? ` data-disabled-key="${cardText(keyPrefix, 0, 'disabledText', field.disabledText)}"` : '') + extraAttributes + '>';
  const labelHtml = `<span class="f-label" data-i18n="${labelKey}"></span>`;
  const subHtml = field.hint ? `<span class="f-sub" data-i18n="${cardText(keyPrefix, 0, 'hint', field.hint)}"></span>` : '<span class="f-sub"></span>';
  const triggerStart = `<button class="f-card f-card-button" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="${idPrefix}-popover">`;
  const searchBox = placeholderKey => `<label class="pop-search">${iconSvg('search')}<input class="pop-search-input" type="search" autocomplete="off" placeholder="" data-i18n-placeholder="${placeholderKey}"></label>`;

  if (field.type === 'segmented') {                                  /* One Way / Round Trip pills */
    const pills = field.options.map((option, index) => {
      const value = option.value ?? option.label.en;
      return `<label class="seg"><input type="radio" name="${field.name}" value="${value}"${index === 0 ? ' checked' : ''}><span data-i18n="${cardText(keyPrefix + '_option', index, 'label', option.label)}"></span></label>`;
    }).join('');
    return `${wrapperStart('f-segmented')}<fieldset><legend class="sr-only" data-i18n="${labelKey}"></legend><div class="seg-group">${pills}</div></fieldset></div>`;
  }
  if (field.type === 'airport') {                                    /* city + airport, chosen from a searchable list */
    const extraAttributes = ` data-placeholder-key="${cardText(keyPrefix, 0, 'placeholder', field.placeholder)}" data-hint-key="${cardText(keyPrefix, 0, 'hint', field.hint)}"`;
    const swapButton = field.swapWith
      ? `<button class="f-swap" type="button" data-swap="${field.name}|${field.swapWith}">${iconSvg('swap')}<span class="sr-only" data-i18n="booking_swap"></span></button>`
      : '';
    return `${wrapperStart('f-popup-field', extraAttributes)}${triggerStart}${labelHtml}<span class="f-value"></span><span class="f-sub"></span></button><input type="hidden" name="${field.name}" id="${idPrefix}" data-value-input data-selection="">${swapButton}<div class="f-pop" id="${idPrefix}-popover" role="dialog" aria-label="${field.label.en}">${searchBox('booking_search_airport')}<p class="pop-title"></p><ul class="pop-list" role="listbox"></ul></div></div>`;
  }
  if (field.type === 'select') {                                     /* a list pop-up (optionally with a search box) */
    field.options.forEach((option, index) => cardText(keyPrefix + '_option', index, 'label', option.label));
    const searchHtml = field.searchable ? searchBox(cardText(keyPrefix, 0, 'search', field.searchPlaceholder)) : '';
    const firstOption = field.options[0];
    return `${wrapperStart('f-popup-field')}${triggerStart}${labelHtml}<span class="f-value"></span>${subHtml}</button><input type="hidden" name="${field.name}" id="${idPrefix}" data-value-input value="${firstOption.value ?? firstOption.label.en}"><div class="f-pop" id="${idPrefix}-popover" role="dialog" aria-label="${field.label.en}">${searchHtml}<ul class="pop-list" role="listbox"></ul></div></div>`;
  }
  if (field.type === 'date') {                                       /* a calendar pop-up */
    return `${wrapperStart('f-popup-field')}${triggerStart}${labelHtml}<span class="f-value"></span><span class="f-sub"></span></button><input type="hidden" name="${field.name}" id="${idPrefix}" data-value-input><div class="f-pop cal-pop" id="${idPrefix}-popover" role="dialog" aria-label="${field.label.en}"><div class="cal-head"><span class="cal-head-icon">${iconSvg('calendar')}</span><span class="cal-head-text"><small data-i18n="${labelKey}"></small><b class="cal-head-value"></b></span></div><div class="cal-nav"><button class="cal-nav-button" type="button" data-cal-nav="-1">${iconSvg('chev-l')}</button><b class="cal-month"></b><button class="cal-nav-button" type="button" data-cal-nav="1">${iconSvg('chev-r')}</button></div><div class="cal-grid"></div></div></div>`;
  }
  if (field.type === 'travellers') {                                 /* summary button + pop-up with counters (and cabin class) */
    const counterRows = field.counters.map((counter, index) => {
      const counterLabelKey = cardText(keyPrefix + '_counter', index, 'label', counter.label);
      const hintKey = cardText(keyPrefix + '_counter', index, 'hint', counter.hint);
      return `<div class="pax-row"><span class="pax-icon">${iconSvg('user')}</span><span class="pax-text"><b data-i18n="${counterLabelKey}"></b><small data-i18n="${hintKey}"></small></span><span class="pax-stepper"><button class="pax-step" type="button" data-counter="${counter.name}" data-step="-1" aria-label="Decrease ${counter.label.en}">${iconSvg('minus')}</button><output class="pax-count" data-count-of="${counter.name}"></output><button class="pax-step" type="button" data-counter="${counter.name}" data-step="1" aria-label="Increase ${counter.label.en}">${iconSvg('plus')}</button><input type="hidden" name="${counter.name}" value="${counter.value ?? counter.min ?? 0}" data-min="${counter.min ?? 0}" data-max="${counter.max ?? 9}" data-label-key="${counterLabelKey}"></span></div>`;
    }).join('');
    const cabinHtml = field.classOptions
      ? `<p class="pax-title" data-i18n="booking_cabin_title"></p><div class="cabin-grid">${field.classOptions.options.map((option, index) => {
          const optionKey = cardText(keyPrefix + '_class', index, 'label', option.label);
          return `<label class="cabin"><input type="radio" name="${field.classOptions.name}" value="${option.value ?? option.label.en}" data-label-key="${optionKey}"${index === 0 ? ' checked' : ''}><span data-i18n="${optionKey}"></span></label>`;
        }).join('')}</div>`
      : '';
    return `${wrapperStart('f-travellers')}${triggerStart}${labelHtml}<span class="f-value" data-pax-summary></span><span class="f-sub" data-pax-sub></span></button><div class="pax-pop" id="${idPrefix}-popover" role="dialog" aria-labelledby="${idPrefix}-title"><p class="pax-title" id="${idPrefix}-title" data-i18n="booking_travellers_title"></p>${counterRows}${cabinHtml}<button class="btn primary pax-done" type="button"><span data-i18n="booking_done"></span></button></div></div>`;
  }
  /* "text" */
  const placeholderAttributes = field.placeholder ? ` placeholder="" data-i18n-placeholder="${cardText(keyPrefix, 0, 'placeholder', field.placeholder)}"` : '';
  return `${wrapperStart()}<label class="f-card">${labelHtml}<input class="f-control" type="text" name="${field.name}" id="${idPrefix}" autocomplete="off"${field.required ? ' required' : ''}${placeholderAttributes}${field.maxlength ? ` maxlength="${field.maxlength}"` : ''}>${subHtml}</label></div>`;
}

/* Tab buttons (the floating pill) and one form per tab */
bookingTabsBox.innerHTML = ENQUIRY_TABS.map((tab, tabIndex) =>
  `<button class="booking-tab" type="button" role="tab" id="booking-tab-${tab.id}" aria-controls="booking-form-${tab.id}" aria-selected="${tabIndex === 0}" tabindex="${tabIndex === 0 ? 0 : -1}"><span class="booking-tab-icon">${iconSvg(tab.icon)}</span><span data-i18n="${cardText('enquiry_' + tab.id, 0, 'tab', tab.label)}"></span></button>`
).join('');
bookingPanelsBox.innerHTML = ENQUIRY_TABS.map((tab, tabIndex) =>
  `<form class="booking-form" id="booking-form-${tab.id}" role="tabpanel" aria-labelledby="booking-tab-${tab.id}" novalidate${tabIndex === 0 ? '' : ' hidden'}><div class="booking-fields">${tab.fields.map(field => enquiryFieldHtml(tab, field)).join('')}</div><p class="booking-error" role="alert" hidden data-i18n="booking_required"></p><p class="booking-fallback" hidden><a target="_blank" rel="noopener" data-i18n="booking_open_failed"></a></p><button class="btn primary booking-send" type="submit">${iconSvg('msg')}<span data-i18n="booking_send"></span></button></form>`
).join('');

/* Small helpers */
const tabOfForm = form => ENQUIRY_TABS.find(tab => 'booking-form-' + tab.id === form.id);
const fieldOfWrapper = (form, wrapper) => tabOfForm(form).fields.find(field => field.name === wrapper.dataset.field);
const valueInputOf = wrapper => wrapper.querySelector('[data-value-input]');
const dateLocale = () => (currentLanguage === 'bn' ? 'bn-BD' : 'en-GB');
const optionKeyOf = (tab, field, index) => `enquiry_${tab.id}_${field.name}_option_${index + 1}_label`;
const airportByCode = code => AIRPORTS.find(airport => airport.code === code);
function parseIsoDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/* ---------- AIRPORT field ---------- */
/* Remembers the chosen airport: the hidden input holds the text for the WhatsApp message ("Dubai (DXB)"), data-selection holds the details */
function setAirportSelection(wrapper, selection) {
  const input = valueInputOf(wrapper);
  input.value = selection ? (selection.code ? `${selection.city} (${selection.code})` : selection.city) : '';
  input.dataset.selection = selection ? JSON.stringify(selection) : '';
}
function refreshAirportDisplay(wrapper) {
  const input = valueInputOf(wrapper);
  const selection = input.dataset.selection ? JSON.parse(input.dataset.selection) : null;
  const valueText = wrapper.querySelector('.f-value');
  valueText.classList.toggle('is-empty', !selection);
  valueText.textContent = selection ? (currentLanguage === 'bn' && selection.bn ? selection.bn : selection.city) : translate(wrapper.dataset.placeholderKey);
  wrapper.querySelector('.f-sub').textContent = selection ? (selection.code ? `${selection.code} - ${selection.airport}` : '') : translate(wrapper.dataset.hintKey);
}
/* The list inside the pop-up: popular airports, or the airports matching what was typed */
function renderAirportList(wrapper) {
  const typedText = wrapper.querySelector('.pop-search-input').value.trim();
  const query = typedText.toLowerCase();
  const matches = query
    ? AIRPORTS.filter(airport => [airport.city, airport.bn, airport.country, airport.airport, airport.code].filter(Boolean).join(' ').toLowerCase().includes(query))
    : AIRPORTS.filter(airport => airport.popular);
  wrapper.querySelector('.pop-title').textContent = translate(query ? 'booking_search_results' : 'booking_popular_airports');
  const selectedCode = valueInputOf(wrapper).dataset.selection ? JSON.parse(valueInputOf(wrapper).dataset.selection).code : '';
  let itemsHtml = matches.slice(0, 40).map(airport => {
    const cityName = currentLanguage === 'bn' && airport.bn ? airport.bn : airport.city;
    return `<li><button class="pop-item${airport.code === selectedCode ? ' is-selected' : ''}" type="button" role="option" data-airport-code="${airport.code}"><span class="pop-icon">${iconSvg('plane')}</span><span class="pop-item-text"><b>${cityName}, ${airport.country}</b><small>${airport.airport}</small></span><span class="pop-code">${airport.code}</span></button></li>`;
  }).join('');
  if (!itemsHtml && typedText) {                                      /* nothing found: let the visitor use what they typed */
    itemsHtml = `<li><button class="pop-item" type="button" role="option" data-airport-free="${encodeURIComponent(typedText)}"><span class="pop-icon">${iconSvg('plane')}</span><span class="pop-item-text"><b>${translate('booking_use_typed').replace('{q}', escapeHtml(typedText))}</b></span></button></li>`;
  }
  wrapper.querySelector('.pop-list').innerHTML = itemsHtml;
}

/* ---------- SELECT field (e.g. visa type) ---------- */
function refreshSelectDisplay(form, wrapper) {
  const tab = tabOfForm(form);
  const field = fieldOfWrapper(form, wrapper);
  const index = Math.max(0, field.options.findIndex(option => (option.value ?? option.label.en) === valueInputOf(wrapper).value));
  const option = field.options[index];
  wrapper.querySelector('.f-value').innerHTML = `${option.icon ? `<span class="f-value-icon">${iconSvg(option.icon)}</span>` : ''}${escapeHtml(translate(optionKeyOf(tab, field, index)))}`;
}
function renderSelectList(form, wrapper) {
  const tab = tabOfForm(form);
  const field = fieldOfWrapper(form, wrapper);
  const searchInput = wrapper.querySelector('.pop-search-input');
  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const currentValue = valueInputOf(wrapper).value;
  wrapper.querySelector('.pop-list').innerHTML = field.options.map((option, index) => {
    const text = translate(optionKeyOf(tab, field, index));
    if (query && !text.toLowerCase().includes(query) && !option.label.en.toLowerCase().includes(query)) return '';
    const value = option.value ?? option.label.en;
    return `<li><button class="pop-item${value === currentValue ? ' is-selected' : ''}" type="button" role="option" data-option-value="${value}"><span class="pop-icon">${option.icon ? iconSvg(option.icon) : ''}</span><span class="pop-item-text"><b>${escapeHtml(text)}</b></span></button></li>`;
  }).join('');
}

/* ---------- DATE field (calendar pop-up) ---------- */
function refreshDateDisplay(wrapper) {
  const input = valueInputOf(wrapper);
  const valueText = wrapper.querySelector('.f-value');
  const weekdayText = wrapper.querySelector('.f-sub');
  valueText.classList.toggle('is-empty', input.disabled || !input.value);
  if (input.disabled) {                                               /* greyed out, e.g. "Add Return" */
    valueText.textContent = translate(wrapper.dataset.disabledKey);
    weekdayText.textContent = '';
  } else if (!input.value) {
    valueText.textContent = translate('booking_select_date');
    weekdayText.textContent = '';
  } else {
    const date = parseIsoDate(input.value);
    valueText.textContent = date.toLocaleDateString(dateLocale(), { day: 'numeric', month: 'short', year: '2-digit' });
    weekdayText.textContent = date.toLocaleDateString(dateLocale(), { weekday: 'long' });
  }
}
/* Draws the month shown in the calendar (wrapper.dataset.view = "2026-11") */
function renderCalendar(wrapper) {
  const input = valueInputOf(wrapper);
  const earliestDate = wrapper.dataset.min || todayAsInputValue;
  const [viewYear, viewMonth] = wrapper.dataset.view.split('-').map(Number);          /* month is 1-12 */
  const firstOfMonth = new Date(viewYear, viewMonth - 1, 1);
  const leadingDays = (firstOfMonth.getDay() - CALENDAR_WEEK_STARTS_ON + 7) % 7;      /* faded days before the 1st */
  const rowCount = Math.ceil((leadingDays + new Date(viewYear, viewMonth, 0).getDate()) / 7);
  const weekdayNames = Array.from({ length: 7 }, (unused, position) =>
    `<span class="cal-weekday">${new Date(2024, 0, 7 + ((CALENDAR_WEEK_STARTS_ON + position) % 7)).toLocaleDateString(dateLocale(), { weekday: 'short' })}</span>`   /* 7 Jan 2024 was a Sunday */
  ).join('');
  const dayButtons = Array.from({ length: rowCount * 7 }, (unused, position) => {
    const date = new Date(viewYear, viewMonth - 1, 1 - leadingDays + position);
    const isoDate = toIsoDate(date);
    const isOtherMonth = date.getMonth() !== viewMonth - 1;
    const classes = ['cal-day', isOtherMonth ? 'is-other-month' : '', isoDate === todayAsInputValue ? 'is-today' : '', isoDate === input.value ? 'is-selected' : ''].filter(Boolean).join(' ');
    return `<button class="${classes}" type="button" data-iso="${isoDate}"${isOtherMonth || isoDate < earliestDate ? ' disabled' : ''}>${localizeDigits(date.getDate())}</button>`;
  }).join('');
  wrapper.querySelector('.cal-grid').innerHTML = weekdayNames + dayButtons;
  wrapper.querySelector('.cal-month').textContent = firstOfMonth.toLocaleDateString(dateLocale(), { month: 'long', year: 'numeric' });
  wrapper.querySelector('.cal-head-value').textContent = input.value
    ? parseIsoDate(input.value).toLocaleDateString(dateLocale(), { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
    : translate('booking_select_date');
  const [previousButton, nextButton] = wrapper.querySelectorAll('.cal-nav-button');
  previousButton.disabled = toIsoDate(firstOfMonth) <= earliestDate.slice(0, 8) + '01';  /* cannot go before the month of the earliest date */
  previousButton.setAttribute('aria-label', translate('booking_prev_month'));
  nextButton.setAttribute('aria-label', translate('booking_next_month'));
}

/* ---------- PASSENGERS field ---------- */
/* Passenger card: "2 Passengers" + class (or the breakdown), and the numbers/buttons inside the pop-up */
function refreshTravellersDisplay(form, wrapper) {
  const field = fieldOfWrapper(form, wrapper);
  const counts = field.counters.map(counter => {
    const input = form.elements[counter.name];
    return { counter, input, count: Number(input.value) };
  });
  const total = counts.reduce((sum, item) => sum + item.count, 0);
  wrapper.querySelector('[data-pax-summary]').textContent =
    translate(total === 1 ? 'booking_passengers_one' : 'booking_passengers_many').replace('{n}', localizeDigits(total));
  const chosenClass = field.classOptions ? form.querySelector(`input[name="${field.classOptions.name}"]:checked`) : null;
  wrapper.querySelector('[data-pax-sub]').textContent = field.summarySub === 'breakdown' || !chosenClass
    ? counts.filter(item => item.count > 0).map(item => `${localizeDigits(item.count)} ${translate(item.input.dataset.labelKey)}`).join(', ')
    : translate(chosenClass.dataset.labelKey);
  counts.forEach(({ counter, input, count }) => {
    wrapper.querySelector(`[data-count-of="${counter.name}"]`).textContent = localizeDigits(count);
    wrapper.querySelector(`[data-counter="${counter.name}"][data-step="-1"]`).disabled = count <= Number(input.dataset.min);
    wrapper.querySelector(`[data-counter="${counter.name}"][data-step="1"]`).disabled = count >= Number(input.dataset.max);
  });
}

/* ---------- Keeping one form correct ---------- */
/* Does this field have a value? (used for the red "please fill in" marks) */
function fieldHasValue(form, wrapper) {
  return String(form.elements[wrapper.dataset.field].value || '').trim() !== '';
}
/* After any change: greyed-out fields (enableWhen), date limits (minFrom), red marks, and every display */
function refreshEnquiryForm(form) {
  form.querySelectorAll('[data-enable-when-field]').forEach(wrapper => {
    const isEnabled = form.elements[wrapper.dataset.enableWhenField].value === wrapper.dataset.enableWhenValue;
    wrapper.classList.toggle('is-disabled', !isEnabled);
    wrapper.querySelectorAll('[data-value-input]').forEach(control => { control.disabled = !isEnabled; });   /* a disabled field is not checked */
  });
  form.querySelectorAll('.f[data-type=date]').forEach(wrapper => {
    const field = fieldOfWrapper(form, wrapper);
    const dateAfterWhichAllowed = field.minFrom ? form.elements[field.minFrom].value : '';
    wrapper.dataset.min = dateAfterWhichAllowed > todayAsInputValue ? dateAfterWhichAllowed : todayAsInputValue;
    const input = valueInputOf(wrapper);
    if (input.value && input.value < wrapper.dataset.min) input.value = '';
    refreshDateDisplay(wrapper);
    if (wrapper.classList.contains('open')) renderCalendar(wrapper);
  });
  form.querySelectorAll('.f[data-type=airport]').forEach(refreshAirportDisplay);
  form.querySelectorAll('.f[data-type=select]').forEach(wrapper => refreshSelectDisplay(form, wrapper));
  form.querySelectorAll('.f[data-type=travellers]').forEach(wrapper => refreshTravellersDisplay(form, wrapper));
  form.querySelectorAll('.f.is-invalid').forEach(wrapper => { if (fieldHasValue(form, wrapper)) wrapper.classList.remove('is-invalid'); });
}
/* Called after every language change (dates, airports and numbers are written by script, not by data-i18n) */
function refreshEnquiryDisplays() {
  document.querySelectorAll('.booking-form').forEach(form => {
    refreshEnquiryForm(form);
    form.querySelectorAll('.f.open[data-type=airport]').forEach(renderAirportList);
    form.querySelectorAll('.f.open[data-type=select]').forEach(wrapper => renderSelectList(form, wrapper));
  });
}
onLanguageChange(refreshEnquiryDisplays);   /* dates, airports and passenger summaries are script-written texts */

/* ---------- Pop-ups: open, close, position ---------- */
/* Puts the pop-up inside the card: full card width on phones, otherwise its own width, never past the card's right edge */
function positionPopup(wrapper, popup) {
  popup.style.width = '';
  popup.style.left = '';
  popup.style.right = '';
  const cardRect = bookingPanelsBox.getBoundingClientRect();
  const wrapperRect = wrapper.getBoundingClientRect();
  const margin = 16;
  const isNarrowCard = cardRect.width < 36 * parseFloat(getComputedStyle(document.documentElement).fontSize);   /* 36rem, same as the CSS */
  const popupWidth = isNarrowCard ? cardRect.width - margin * 2 : Math.min(popup.offsetWidth, cardRect.width - margin * 2);
  const popupLeft = isNarrowCard ? cardRect.left + margin : Math.min(wrapperRect.left, cardRect.right - margin - popupWidth);
  popup.style.width = popupWidth + 'px';
  popup.style.left = (popupLeft - wrapperRect.left) + 'px';
  popup.style.right = 'auto';
}
function setFieldPopupOpen(wrapper, shouldBeOpen) {
  wrapper.classList.toggle('open', shouldBeOpen);
  wrapper.querySelector('.f-card-button').setAttribute('aria-expanded', shouldBeOpen);
  if (!shouldBeOpen) return;
  const form = wrapper.closest('form');
  const searchInput = wrapper.querySelector('.pop-search-input');
  if (searchInput) searchInput.value = '';
  if (wrapper.dataset.type === 'airport') renderAirportList(wrapper);
  if (wrapper.dataset.type === 'select') renderSelectList(form, wrapper);
  if (wrapper.dataset.type === 'date') {                               /* open on the chosen month, or the earliest allowed month */
    const startDate = parseIsoDate(valueInputOf(wrapper).value || wrapper.dataset.min || todayAsInputValue);
    wrapper.dataset.view = `${startDate.getFullYear()}-${startDate.getMonth() + 1}`;
    renderCalendar(wrapper);
  }
  const popup = wrapper.querySelector('.f-pop, .pax-pop');
  positionPopup(wrapper, popup);
  popup.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion ? 'auto' : 'smooth' });   /* scroll just enough so the whole pop-up is on screen */
  if (searchInput) searchInput.focus({ preventScroll: true });                                      /* ready to type (without jumping the page) */
}
function closeAllFieldPopups(exceptWrapper = null) {
  document.querySelectorAll('.f.open').forEach(wrapper => {
    if (wrapper !== exceptWrapper) setFieldPopupOpen(wrapper, false);
  });
}

/* Shows one tab and hides the others */
function showEnquiryTab(tabId) {
  closeAllFieldPopups();
  ENQUIRY_TABS.forEach(tab => {
    const isActive = tab.id === tabId;
    const tabButton = document.querySelector('#booking-tab-' + tab.id);
    tabButton.setAttribute('aria-selected', isActive);
    tabButton.tabIndex = isActive ? 0 : -1;
    document.querySelector('#booking-form-' + tab.id).hidden = !isActive;
  });
}
bookingTabsBox.addEventListener('click', event => {
  const tabButton = event.target.closest('.booking-tab');
  if (tabButton) showEnquiryTab(tabButton.id.replace('booking-tab-', ''));
});
bookingTabsBox.addEventListener('keydown', event => {        /* arrow keys move between tabs */
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  const tabIds = ENQUIRY_TABS.map(tab => tab.id);
  const currentIndex = tabIds.findIndex(id => document.querySelector('#booking-tab-' + id).getAttribute('aria-selected') === 'true');
  const nextId = tabIds[(currentIndex + (event.key === 'ArrowRight' ? 1 : -1) + tabIds.length) % tabIds.length];
  showEnquiryTab(nextId);
  document.querySelector('#booking-tab-' + nextId).focus();
});

/* All clicks inside the widget */
bookingPanelsBox.addEventListener('click', event => {
  const form = event.target.closest('form');
  if (!form) return;
  const wrapper = event.target.closest('.f');
  const swapButton = event.target.closest('.f-swap');
  const stepButton = event.target.closest('.pax-step');
  const popupItem = event.target.closest('.pop-item');
  const dayButton = event.target.closest('.cal-day');
  const calendarNavButton = event.target.closest('.cal-nav-button');
  const triggerButton = event.target.closest('.f-card-button');

  if (swapButton) {                                                    /* swap From and To */
    const [firstName, secondName] = swapButton.dataset.swap.split('|');
    const firstInput = form.elements[firstName];
    const secondInput = form.elements[secondName];
    [firstInput.value, secondInput.value] = [secondInput.value, firstInput.value];
    [firstInput.dataset.selection, secondInput.dataset.selection] = [secondInput.dataset.selection, firstInput.dataset.selection];
    refreshEnquiryForm(form);
  } else if (stepButton) {                                             /* + / - in the passenger pop-up */
    const counterInput = form.elements[stepButton.dataset.counter];
    const nextValue = Number(counterInput.value) + Number(stepButton.dataset.step);
    counterInput.value = Math.min(Number(counterInput.dataset.max), Math.max(Number(counterInput.dataset.min), nextValue));
    refreshEnquiryForm(form);
  } else if (event.target.closest('.pax-done')) {
    closeAllFieldPopups();
  } else if (popupItem) {                                              /* a choice in the airport / list pop-up */
    if (popupItem.dataset.airportCode) {
      setAirportSelection(wrapper, airportByCode(popupItem.dataset.airportCode));
    } else if (popupItem.dataset.airportFree !== undefined) {
      setAirportSelection(wrapper, { city: decodeURIComponent(popupItem.dataset.airportFree), code: '' });
    } else {
      valueInputOf(wrapper).value = popupItem.dataset.optionValue;
    }
    refreshEnquiryForm(form);
    closeAllFieldPopups();
    wrapper.querySelector('.f-card-button').focus();
  } else if (dayButton) {                                              /* a day in the calendar */
    valueInputOf(wrapper).value = dayButton.dataset.iso;
    refreshEnquiryForm(form);
    closeAllFieldPopups();
    wrapper.querySelector('.f-card-button').focus();
  } else if (calendarNavButton) {                                      /* previous / next month */
    const [viewYear, viewMonth] = wrapper.dataset.view.split('-').map(Number);
    const newView = new Date(viewYear, viewMonth - 1 + Number(calendarNavButton.dataset.calNav), 1);
    wrapper.dataset.view = `${newView.getFullYear()}-${newView.getMonth() + 1}`;
    renderCalendar(wrapper);
  } else if (triggerButton) {                                          /* open / close the pop-up under a card */
    if (wrapper.classList.contains('is-disabled')) {                   /* the greyed-out Return card switches to Round Trip first */
      form.elements[wrapper.dataset.enableWhenField].value = wrapper.dataset.enableWhenValue;
      refreshEnquiryForm(form);
      closeAllFieldPopups();
      setFieldPopupOpen(wrapper, true);
      return;
    }
    closeAllFieldPopups(wrapper);
    setFieldPopupOpen(wrapper, !wrapper.classList.contains('open'));
  }
});
/* Typing in a pop-up's search box filters its list */
bookingPanelsBox.addEventListener('input', event => {
  if (!event.target.classList.contains('pop-search-input')) return;
  const wrapper = event.target.closest('.f');
  if (wrapper.dataset.type === 'airport') renderAirportList(wrapper);
  if (wrapper.dataset.type === 'select') renderSelectList(wrapper.closest('form'), wrapper);
});
/* Arrow keys move through the search box and the list */
bookingPanelsBox.addEventListener('keydown', event => {
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
  const popup = event.target.closest('.f-pop');
  if (!popup) return;
  const focusable = [...popup.querySelectorAll('.pop-search-input, .pop-item')];
  const currentIndex = focusable.indexOf(document.activeElement);
  if (currentIndex < 0) return;
  event.preventDefault();
  focusable[(currentIndex + (event.key === 'ArrowDown' ? 1 : -1) + focusable.length) % focusable.length].focus();
});
document.addEventListener('click', event => {
  if (!event.composedPath().includes(bookingPanelsBox)) closeAllFieldPopups();   /* click outside closes the pop-up */
});
addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const openWrapper = document.querySelector('.f.open');
  closeAllFieldPopups();
  if (openWrapper) openWrapper.querySelector('.f-card-button').focus();          /* give the focus back to the card */
});

/* ---------- Sending ---------- */
/* Checks the required fields. Missing ones get a red mark and a message; the first one gets the focus. */
function validateEnquiryForm(form) {
  let firstMissing = null;
  tabOfForm(form).fields.filter(field => field.required).forEach(field => {
    const wrapper = form.querySelector(`[data-field="${field.name}"]`);
    if (wrapper.classList.contains('is-disabled')) return;
    const isMissing = !fieldHasValue(form, wrapper);
    wrapper.classList.toggle('is-invalid', isMissing);
    if (isMissing && !firstMissing) firstMissing = wrapper;
  });
  form.querySelector('.booking-error').hidden = !firstMissing;
  if (firstMissing) firstMissing.querySelector('.f-card-button, input').focus();
  return !firstMissing;
}

/* Builds the WhatsApp message (always in English): intro line, one "Label: value" line per filled field, closing line */
function buildEnquiryMessage(tab, form) {
  const lines = [tab.messageIntro, ''];
  tab.fields.forEach(field => {
    const wrapper = form.querySelector(`[data-field="${field.name}"]`);
    if (wrapper.classList.contains('is-disabled')) return;               /* a greyed-out field is left out */
    if (field.type === 'travellers') {
      field.counters.forEach(counter => {
        const count = Number(form.elements[counter.name].value);
        if (!(counter.omitIfZero && count === 0)) lines.push(`${counter.messageLabel || counter.label.en}: ${count}`);
      });
      if (field.classOptions) lines.push(`${field.classOptions.messageLabel || 'Class'}: ${form.elements[field.classOptions.name].value}`);
      return;
    }
    let value = String(form.elements[field.name].value || '').trim();
    if (!value) return;
    if (field.type === 'date') value = parseIsoDate(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    if (field.options) value = field.options.find(option => (option.value ?? option.label.en) === value).label.en;
    lines.push(`${field.messageLabel || field.label.en}: ${value}`);
  });
  lines.push('', tab.messageClosing);
  return lines.join('\n');
}

document.querySelectorAll('.booking-form').forEach(form => {
  tabOfForm(form).fields.filter(field => field.defaultCode).forEach(field => {      /* airports chosen at the start (e.g. Dhaka) */
    setAirportSelection(form.querySelector(`[data-field="${field.name}"]`), airportByCode(field.defaultCode));
  });
  form.addEventListener('input', () => refreshEnquiryForm(form));
  form.addEventListener('change', () => refreshEnquiryForm(form));
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.querySelector('.booking-fallback').hidden = true;
    if (!validateEnquiryForm(form)) return;
    const whatsappUrl = whatsappLink(buildEnquiryMessage(tabOfForm(form), form));
    const openedWindow = window.open(whatsappUrl, '_blank');
    if (openedWindow) {
      try { openedWindow.opener = null; } catch (error) { /* ignore */ }
    } else {                                                 /* the browser blocked the new tab: show a link the visitor can tap instead */
      const fallbackLink = form.querySelector('.booking-fallback a');
      fallbackLink.href = whatsappUrl;
      fallbackLink.parentElement.hidden = false;
    }
  });
  refreshEnquiryForm(form);
});
