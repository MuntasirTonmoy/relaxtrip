/* =========================================================================
   12. SUPPORT BUTTON (floating, bottom-right)
   Opens a small panel with the contact options from SUPPORT_CHANNELS.
   Closes with the X, the Escape key, or a click anywhere outside it.
   ========================================================================= */
const supportBox = document.querySelector('#support');
const supportButton = document.querySelector('#support-fab');

function setSupportOpen(shouldBeOpen) {
  supportBox.classList.toggle('open', shouldBeOpen);
  supportButton.setAttribute('aria-expanded', shouldBeOpen);
}

supportButton.onclick = () => setSupportOpen(!supportBox.classList.contains('open'));
document.querySelector('#support-close').onclick = () => { setSupportOpen(false); supportButton.focus(); };
addEventListener('keydown', event => {
  if (event.key === 'Escape') setSupportOpen(false);
});
document.addEventListener('click', event => {
  if (!event.composedPath().includes(supportBox)) setSupportOpen(false);
});

