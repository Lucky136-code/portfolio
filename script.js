document.addEventListener('DOMContentLoaded', () => {
  const dots = document.querySelectorAll('.nav-dot');
  const sections = document.querySelectorAll('.slide-frame');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        dots.forEach(dot => {
          if (dot.getAttribute('href') === `#${id}`) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});
