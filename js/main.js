// Regal Tees landing page — small progressive-enhancement behaviors only.
document.addEventListener('DOMContentLoaded', function () {
  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close menu after tapping a link
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Tee animation: pausable (WCAG 2.2.2) and never auto-starts for reduced-motion users
  var video = document.getElementById('teeVideo');
  var videoToggle = document.getElementById('teeVideoToggle');
  if (video && videoToggle) {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var syncToggle = function () {
      var paused = video.paused;
      videoToggle.classList.toggle('is-paused', paused);
      videoToggle.setAttribute('aria-label', paused ? 'Play animation' : 'Pause animation');
    };
    video.addEventListener('play', syncToggle);
    video.addEventListener('pause', syncToggle);
    videoToggle.addEventListener('click', function () {
      if (video.paused) { video.play(); } else { video.pause(); }
    });
    videoToggle.hidden = false;
    syncToggle();
    if (!reduceMotion.matches) {
      var p = video.play();
      if (p && p.catch) p.catch(syncToggle); // autoplay blocked: leave poster + play button
    }
    reduceMotion.addEventListener('change', function (e) { if (e.matches) video.pause(); });
  }
});
