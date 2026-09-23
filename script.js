// ---
// About Me — click to expand/collapse
// ---

document.addEventListener('DOMContentLoaded', function () {
  var trigger = document.getElementById('aboutTrigger');
  var details = document.getElementById('about-details');
  var learnMoreBtn = document.querySelector('.btn-ornate');

  // Opens or closes the About Me details panel
  function setAboutExpanded(expand) {
    trigger.setAttribute('aria-expanded', String(expand));
    trigger.classList.toggle('is-open', expand);

    if (expand) {
      details.classList.add('is-open');
      // Set max-height to the panel's real height so the CSS transition can animate it
      details.style.maxHeight = details.scrollHeight + 'px';
    } else {
      details.style.maxHeight = '0px';
      details.classList.remove('is-open');
    }
  }

  // Click the "About Me" heading/row to toggle the panel
  trigger.addEventListener('click', function () {
    var isOpen = trigger.getAttribute('aria-expanded') === 'true';
    setAboutExpanded(!isOpen);
  });

  // The hero's "Learn More" button opens the section, then scrolls to it
  if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', function (event) {
      event.preventDefault();
      setAboutExpanded(true);

      // Wait one frame so the panel has expanded before we measure scroll position
      requestAnimationFrame(function () {
        document.getElementById('about').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  }

  // If someone lands directly on #about (e.g. a bookmarked link), open it immediately
  if (window.location.hash === '#about') {
    setAboutExpanded(true);
  }

  // Keep the open panel's height correct if the window is resized (text reflows)
  window.addEventListener('resize', function () {
    if (trigger.getAttribute('aria-expanded') === 'true') {
      details.style.maxHeight = details.scrollHeight + 'px';
    }
  });
});
