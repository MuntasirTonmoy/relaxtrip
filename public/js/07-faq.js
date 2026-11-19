/* =========================================================================
   7. FAQ ACCORDION (only one answer open at a time)
   ========================================================================= */
document.querySelectorAll('.fq button').forEach(questionButton => {
  questionButton.onclick = () => {
    const faqItem = questionButton.parentElement;
    const wasOpen = faqItem.classList.contains('open');
    document.querySelectorAll('.fq').forEach(item => {              /* close all */
      item.classList.remove('open');
      item.querySelector('button').setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) {                                                  /* re-open the clicked one unless it was the open one */
      faqItem.classList.add('open');
      questionButton.setAttribute('aria-expanded', 'true');
    }
  };
});

