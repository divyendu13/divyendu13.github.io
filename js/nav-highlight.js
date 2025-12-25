document.addEventListener('DOMContentLoaded', function () {
  const links = Array.from(document.querySelectorAll('.nav-list a'));
  const sections = links
    .map(l => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const mapElToLink = new Map();
  links.forEach(l => {
    const s = document.querySelector(l.getAttribute('href'));
    if (s) mapElToLink.set(s, l);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = mapElToLink.get(entry.target);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0.15 });

  sections.forEach(s => observer.observe(s));
});
