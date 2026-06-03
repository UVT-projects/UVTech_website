(function () {
  var btn = document.querySelector('.nav-toggle');
  var header = document.querySelector('header');
  if (!btn || !header) return;

  btn.addEventListener('click', function () {
    var open = header.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Inchide meniu' : 'Deschide meniu');
  });

  document.addEventListener('click', function (e) {
    if (!header.contains(e.target) && header.classList.contains('nav-open')) {
      header.classList.remove('nav-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Deschide meniu');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('nav-open')) {
      header.classList.remove('nav-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Deschide meniu');
      btn.focus();
    }
  });
})();
