import { CONTACT } from './data/contact.js';
import { NAV_LINKS, TRUST_POINTS } from './data/navigation.js';
import { STAT_CARDS, SERVICES, REVIEWS, WHY_US_ITEMS } from './data/sections.js';
import { TEAM_MEMBERS, FAQ_ITEMS } from './data/team-faq.js';
import { PARTNER_AIRLINES, AIRLINE_LOGO_URL, PAYMENT_METHODS, PAYMENT_LOGO_URL, PAYMENT_GATEWAY_BADGE } from './data/partners.js';
import { SUPPORT_CHANNELS, SOCIAL_LINKS } from './data/support.js';
import { iconSvg, LOGO_HTML } from './01-icons.js';
import { whatsappLink, PHONE_INTERNATIONAL_DIGITS, PHONE_LINK, MAPS_LINK, initialsOf } from './02-helpers.js';
import { cardText } from './04-language.js';

/* =========================================================================
   3. BUILD THE PAGE
   Each list from the content script (SERVICES, TEAM_MEMBERS ...) becomes cards here,
   so adding an item to a list adds a card. style="--reveal-order:N" makes cards in the
   same row appear one after another.
   ========================================================================= */

/* Section links: header menu, mobile menu and footer all use NAV_LINKS */
document.querySelectorAll('[data-nav]').forEach(navContainer => {
  navContainer.innerHTML = NAV_LINKS.map(({ sectionId, label }, index) => {
    const linkHtml = `<a class="nav-link" href="#${sectionId}" data-i18n="${cardText('nav', index, 'label', label)}"></a>`;
    return navContainer.dataset.nav === 'li' ? `<li>${linkHtml}</li>` : linkHtml;
  }).join('');
});

/* Hero trust points */
document.querySelector('.trust').innerHTML = TRUST_POINTS.map(({ icon, text }, index) =>
  `<span>${iconSvg(icon)}<b data-i18n="${cardText('trust', index, 'text', text)}"></b></span>`
).join('');

/* Service cards: each opens WhatsApp with a message about that service */
document.querySelector('#svc').innerHTML = SERVICES.map((service, index) => {
  const enquiryMessage = 'Hi RelaxTrip, I want to enquire about: ' + service.title.en;
  return `<a class="card link svc rv" style="--reveal-order:${index % 3}" target="_blank" rel="noopener" href="${whatsappLink(enquiryMessage)}"><span class="ibox">${iconSvg(service.icon)}</span><h3 data-i18n="${cardText('service', index, 'title', service.title)}"></h3><p data-i18n="${cardText('service', index, 'description', service.description)}"></p><span class="more"><span data-i18n="enq"></span>${iconSvg('arrow')}</span></a>`;
}).join('');

/* Footer list of services */
document.querySelector('#fsvc').innerHTML = SERVICES.map((service, index) =>
  `<li><a class="nav-link" href="#services" data-i18n="${cardText('service', index, 'title', service.title)}"></a></li>`
).join('');

/* "About" number cards */
document.querySelector('#stats').innerHTML = STAT_CARDS.map(({ type, value, label, note }, index) => {
  const numberAttribute = type === 'counter' ? `data-count="${value}"` : `data-num="${value}"`;
  return `<div class="card stat rv" style="--reveal-order:${index}"><b ${numberAttribute}>0</b><p data-i18n="${cardText('stat', index, 'label', label)}"></p><small data-i18n="${cardText('stat', index, 'note', note)}"></small></div>`;
}).join('');

/* Review slides (inside #track): stars, the quote, then who said it (Facebook recommendation) */
document.querySelector('#track').innerHTML = REVIEWS.map((review, index) =>
  `<div class="slide" role="group" aria-roledescription="slide" aria-label="${index + 1} / ${REVIEWS.length}"><figure class="card rev"><div class="stars" role="img" aria-label="5 / 5">★★★★★</div><blockquote data-i18n="${cardText('review', index, 'quote', review.quote)}"></blockquote><figcaption class="who"><span class="av" aria-hidden="true">${review.initials || initialsOf(review.name.en)}</span><span><b data-i18n="${cardText('review', index, 'name', review.name)}"></b><br><small class="fb-src"><i data-icon="facebook"></i><span data-i18n="review_fb_source"></span></small></span></figcaption></figure></div>`
).join('');

/* Slider dots (one per review) */
document.querySelector('#car .dots').innerHTML = REVIEWS.map((review, index) =>
  `<button class="dot" data-index="${index}" aria-label="Review ${index + 1}"></button>`
).join('');

/* "Why us" numbered list */
document.querySelector('#whyl').innerHTML = WHY_US_ITEMS.map(({ title, description }, index) => {
  const displayNumber = String(index + 1).padStart(2, '0');
  return `<div class="wi rv" style="--reveal-order:${index}"><span class="n" data-num="${displayNumber}">${displayNumber}</span><div><h3 data-i18n="${cardText('whyus', index, 'title', title)}"></h3><p data-i18n="${cardText('whyus', index, 'description', description)}"></p></div></div>`;
}).join('');

/* Team carousel: one slide per member — photo (optional — falls back to initials) + name + role */
document.querySelector('#ttrack').innerHTML = TEAM_MEMBERS.map((member, index) => {
  const photo = member.photo
    ? `<span class="team-photo"><img src="${member.photo}" loading="lazy" alt=""></span>`
    : `<span class="av lg" aria-hidden="true">${member.initials || initialsOf(member.name.en)}</span>`;
  return `<div class="slide" role="group" aria-roledescription="slide" aria-label="Team member ${index + 1} / ${TEAM_MEMBERS.length}"><div class="card rv tm" style="--reveal-order:${index % 3}">${photo}<h3 data-i18n="${cardText('team', index, 'name', member.name)}"></h3><p class="role" data-i18n="${cardText('team', index, 'role', member.role)}"></p></div></div>`;
}).join('');

/* Team slider dots (one per member) */
document.querySelector('#tcar .dots').innerHTML = TEAM_MEMBERS.map((member, index) =>
  `<button class="dot" data-index="${index}" aria-label="Team member ${index + 1}"></button>`
).join('');

/* FAQ questions and answers */
document.querySelector('#faql').innerHTML = FAQ_ITEMS.map(({ question, answer }, index) => {
  const number = index + 1;
  return `<div class="card fq"><button aria-expanded="false" aria-controls="fa${number}" id="fh${number}"><span data-i18n="${cardText('faq', index, 'question', question)}"></span>${iconSvg('plus')}</button><div class="fb" id="fa${number}" role="region" aria-labelledby="fh${number}"><div><p data-i18n="${cardText('faq', index, 'answer', answer)}"></p></div></div></div>`;
}).join('');

/* Partner airlines: a slowly scrolling strip. Each half of the strip holds the whole list (repeated if the
   list is short); the second half is a copy hidden from screen readers, so the loop has no visible gap.
   The round badge shows the airline logo; if there is no logo (or it cannot load) it shows the code on gold instead. */
function airlineItemHtml(airline, isCopy) {
  const logoUrl = airline.logo || (AIRLINE_LOGO_URL ? AIRLINE_LOGO_URL.replace('{code}', airline.code) : '');
  const logoImage = logoUrl
    ? `<img src="${logoUrl}" alt="" loading="lazy" onerror="this.parentElement.classList.add('no-logo');this.remove()">`
    : '';
  return `<li class="airline"${isCopy ? ' aria-hidden="true"' : ''}><span class="airline-badge${logoUrl ? '' : ' no-logo'}">${logoImage}<b>${airline.code}</b></span><span class="airline-text"><span class="airline-name">${airline.name}</span><span class="airline-code">${airline.code}</span></span></li>`;
}
const airlineCopiesPerHalf = Math.max(1, Math.ceil(10 / (PARTNER_AIRLINES.length || 1)));
const airlinesOneHalf = Array.from({ length: airlineCopiesPerHalf }, () => PARTNER_AIRLINES).flat();
document.querySelector('#airline-list').innerHTML =
  airlinesOneHalf.map(airline => airlineItemHtml(airline, false)).join('') +
  airlinesOneHalf.map(airline => airlineItemHtml(airline, true)).join('');

/* Footer "Pay with" tiles: a white tile with the logo; without a logo (or if it cannot load) the tile shows the name */
document.querySelector('#pay-list').innerHTML = PAYMENT_METHODS.map(method => {
  const fileId = method.id || method.name.toLowerCase().replace(/[^a-z0-9]+/g, '');
  const logoUrl = method.logo === '' || method.id === '-' ? '' : (method.logo || (PAYMENT_LOGO_URL ? PAYMENT_LOGO_URL.replace('{id}', fileId) : ''));
  const logoImage = logoUrl
    ? `<img src="${logoUrl}" alt="${method.name}" loading="lazy" onerror="this.parentElement.classList.add('no-logo');this.remove()">`
    : '';
  return `<li class="pay-tile${logoUrl ? '' : ' no-logo'}">${logoImage}<span class="pay-name">${method.name}</span></li>`;
}).join('');

/* Optional payment banner/badge (only when PAYMENT_GATEWAY_BADGE is set in the content script);
   the optional text field in front of it is translatable, the image alone is enough most times */
if (PAYMENT_GATEWAY_BADGE) {
  const badge = PAYMENT_GATEWAY_BADGE;
  const gatewayLogo = badge.logo
    ? `<img src="${badge.logo}" alt="${badge.name || badge.alt || ''}" height="36" loading="lazy">`
    : `<b class="pay-gateway-name">${badge.name}</b>`;
  const label = badge.text ? `<span data-i18n="${cardText('gateway', 0, 'text', badge.text)}"></span>` : '';
  document.querySelector('#pay-gateway').innerHTML = `${label}${gatewayLogo}`;
}

/* Support button: one row per contact option */
document.querySelector('#support-list').innerHTML = SUPPORT_CHANNELS.map(({ type, icon, label, note }, index) => {
  const href = type === 'whatsapp' ? whatsappLink('Hi RelaxTrip, I need help with a booking.')
             : type === 'phone' ? PHONE_LINK
             : 'mailto:' + CONTACT.email;
  const detailHtml = note
    ? `<small data-i18n="${cardText('support', index, 'note', note)}"></small>`
    : `<small>${type === 'phone' ? CONTACT.phone : CONTACT.email}</small>`;
  const openInNewTab = type === 'whatsapp' ? ' target="_blank" rel="noopener"' : '';
  return `<a class="support-link" href="${href}"${openInNewTab}><span class="ibox">${iconSvg(icon)}</span><span><b data-i18n="${cardText('support', index, 'label', label)}"></b>${detailHtml}</span></a>`;
}).join('');

/* Social icon buttons at the bottom of the footer (SOCIAL_LINKS in the content scripts) */
const socialLinksBox = document.querySelector('#socials');
if (socialLinksBox) {
  socialLinksBox.innerHTML = SOCIAL_LINKS.map(social => {
    const href = social.url
      ? social.url
      : social.type === 'whatsapp' ? whatsappLink('Hello RelaxTrip!')
      : social.type === 'phone' ? PHONE_LINK
      : social.type === 'email' ? 'mailto:' + CONTACT.email
      : '#';
    return `<li><a href="${href}" aria-label="${social.label.en}" title="${social.label.en}" target="_blank" rel="noopener noreferrer"><i data-icon="${social.icon}"></i></a></li>`;
  }).join('');
}

/* The real Google map of the office (the query comes from CONTACT.mapEmbed, falling back to the address). The yellow "Get directions" pill stays in the HTML on top of it */
const mapFrame = document.querySelector('#map-frame');
if (mapFrame) {
  const mapQuery = CONTACT.mapEmbed || CONTACT.address.en || CONTACT.address;
  const mapIframe = document.createElement('iframe');
  mapIframe.title = 'RelaxTrip office on Google Maps';
  mapIframe.src = 'https://www.google.com/maps?q=' + encodeURIComponent(mapQuery) + '&z=16&output=embed&hl=en';
  mapIframe.loading = 'lazy';
  mapIframe.allowFullscreen = true;
  mapIframe.referrerPolicy = 'no-referrer-when-downgrade';
  mapFrame.prepend(mapIframe);
}

/* Fill in the logo wherever the HTML has data-logo */
document.querySelectorAll('[data-logo]').forEach(logoPlaceholder => {
  logoPlaceholder.innerHTML = LOGO_HTML;
});

/* Turn every <i data-icon="name"> placeholder into a real SVG icon (keeps its classes) */
document.querySelectorAll('i[data-icon]').forEach(iconPlaceholder => {
  iconPlaceholder.outerHTML = iconSvg(iconPlaceholder.dataset.icon, iconPlaceholder.className);
});

/* Contact links and texts (values come from CONTACT at the top) */
document.querySelectorAll('[data-contact-link=phone]').forEach(link => { link.href = PHONE_LINK; });
document.querySelectorAll('[data-contact-link=whatsapp]').forEach(link => { link.href = whatsappLink('Hi RelaxTrip, I need help with a booking.'); });
document.querySelectorAll('[data-contact-link=email]').forEach(link => { link.href = 'mailto:' + CONTACT.email; });
document.querySelectorAll('[data-contact-link=map]').forEach(link => { link.href = MAPS_LINK; });

/* Search-engine data (what Google can show about the business) is built from CONTACT, so it never goes out of date */
const structuredDataTag = document.createElement('script');
structuredDataTag.type = 'application/ld+json';
structuredDataTag.textContent = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'RelaxTrip',
  telephone: '+' + PHONE_INTERNATIONAL_DIGITS,
  email: CONTACT.email,
  address: { '@type': 'PostalAddress', streetAddress: CONTACT.address.en, addressCountry: 'BD' },
  openingHours: CONTACT.openingHoursCode
});
document.head.appendChild(structuredDataTag);
document.querySelectorAll('[data-phone-text]').forEach(element => { element.textContent = CONTACT.phone; });
document.querySelectorAll('[data-email-text]').forEach(element => { element.textContent = CONTACT.email; });

/* Menu button holds two icons; CSS shows the "menu" or the "X" depending on aria-expanded */
document.querySelector('#burger').innerHTML = iconSvg('menu', 'b-m') + iconSvg('x', 'b-x');

