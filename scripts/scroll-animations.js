document.addEventListener('DOMContentLoaded', () => {
  // 1. Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  const hiddenElements = document.querySelectorAll('.scroll-hidden');
  hiddenElements.forEach((el) => observer.observe(el));

  // 2. Navbar Sticky & Go To Top Button & Active Links
  const navbar = document.getElementById('navbar');
  const goToTopBtn = document.getElementById('go-to-top');
  const navLinks = document.querySelectorAll('.nav-link, .navbar-mobile-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let currentScroll = window.scrollY;

    // Navbar
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Dynamic Logo Text
    const logoText = document.getElementById('nav-logo-text');
    if (logoText) {
      if (currentScroll > 400) { // When scrolled past Hero roughly
        logoText.textContent = 'Krishnalal A K';
        logoText.style.fontSize = '1.2rem'; // Adjust size if needed
      } else {
        logoText.textContent = 'K.';
        logoText.style.fontSize = '1.5rem';
      }
    }

    // Go To Top
    if (goToTopBtn) {
      if (currentScroll > 500) {
        goToTopBtn.classList.add('visible');
      } else {
        goToTopBtn.classList.remove('visible');
      }
    }

    // Active Link Highlighting
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (currentScroll >= (sectionTop - 150)) {
        let currentId = section.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + currentId) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 3. System Theme Detection
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const currentTheme = document.body.getAttribute('data-theme');

  if (!currentTheme) {
    if (prefersDarkScheme.matches) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }

  // 4. Mobile Menu Toggle
  const menuToggle = document.querySelector('.navbar-toggle'); // Should be added if missing in dart
  // Note: In current simple nav, mobile menu might need re-implementation if missing. 
  // But focusing on scroll features first.
});
