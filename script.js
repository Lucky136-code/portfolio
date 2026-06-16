/* script.js - Premium Interactive Portfolio Core Logic */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Core functions initialization
  initParticles();
  initCursorFollower();
  initNavbarScroll();
  initNavActiveLinks();
  initMobileMenu();
  initTypingEffect();
  initTerminalTabs();
  initTerminalCommands();
  initProjectGlow();
  initScrollReveal();
  initContactForm();
});

// 1. Interactive HTML5 Canvas Particles Background
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null, radius: 140 };

  // Adjust canvas size
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap around edges
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Mouse interactive push/pull force
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.hypot(dx, dy);
        if (distance < mouse.radius) {
          let force = (mouse.radius - distance) / mouse.radius;
          this.x -= (dx / distance) * force * 1.5;
          this.y -= (dy / distance) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.16)';
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    // Calculate count based on viewport size (less particles on mobile)
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 16000), 90);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Connect close particles with lines
      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let distance = Math.hypot(dx, dy);

        if (distance < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          let opacity = (110 - distance) / 110 * 0.08;
          ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect particles to mouse
      if (mouse.x !== null && mouse.y !== null) {
        let dx = particles[i].x - mouse.x;
        let dy = particles[i].y - mouse.y;
        let distance = Math.hypot(dx, dy);

        if (distance < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          let opacity = (mouse.radius - distance) / mouse.radius * 0.12;
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  init();
  animate();
  window.addEventListener('resize', init);
}

// 2. Custom Smooth Cursor Follower
function initCursorFollower() {
  // Disable cursor follower on touchscreen mobile devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.querySelector('.cursor-follower');
  if (!cursor) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    let dx = mouseX - cursorX;
    let dy = mouseY - cursorY;
    
    // Smooth lerp movement
    cursorX += dx * 0.12;
    cursorY += dy * 0.12;

    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(animate);
  }
  animate();

  // Add scale states on hoverable items
  const hoverables = document.querySelectorAll('a, button, .logo, .skill-tag, .project-card, .term-tab');
  hoverables.forEach(item => {
    item.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    item.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });
}

// 3. Navbar Scroll Behavior
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// 4. Navigation Links Active State Highlighting
function initNavActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 180; // Offset

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

// 5. Mobile Hamburg Navigation Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('mobile-active');
    
    const icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('mobile-active')) {
      icon.setAttribute('data-lucide', 'x');
    } else {
      icon.setAttribute('data-lucide', 'menu');
    }
    
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  });

  // Close when clicking outside of menu
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('mobile-active') && !navLinks.contains(e.target) && e.target !== menuBtn) {
      navLinks.classList.remove('mobile-active');
      menuBtn.querySelector('i').setAttribute('data-lucide', 'menu');
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }
  });

  // Close when clicking links
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-active');
      menuBtn.querySelector('i').setAttribute('data-lucide', 'menu');
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  });
}

// 6. Typewriter Effect
function initTypingEffect() {
  const words = ["AI/ML Engineer", "Full Stack Developer", "Problem Solver"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const targetElement = document.querySelector('.typewriter');

  if (!targetElement) return;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      targetElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      targetElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 400; // Pause before typing next word
    }

    setTimeout(type, speed);
  }

  type();
}

// 7. Interactive IDE Terminal Tabs switching
function initTerminalTabs() {
  const tabs = document.querySelectorAll('.term-tab');
  const termBody = document.getElementById('terminal-body');
  const termInput = document.getElementById('terminal-input');

  if (!tabs.length || !termBody) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Deactivate all
      tabs.forEach(t => t.classList.remove('active'));
      termBody.querySelectorAll('.term-tab-content').forEach(c => c.classList.remove('active'));

      // Activate current
      tab.classList.add('active');
      const targetContentId = `term-content-${tab.getAttribute('data-tab')}`;
      const targetContent = document.getElementById(targetContentId);
      
      if (targetContent) {
        targetContent.classList.add('active');
      }

      // Autofocus input if console tab selected
      if (tab.getAttribute('data-tab') === 'terminal' && termInput) {
        termInput.focus();
      }
    });
  });
}

// Helper function to switch tabs via terminal commands
function switchTerminalTab(tabName) {
  const tabBtn = document.querySelector(`.term-tab[data-tab="${tabName}"]`);
  if (tabBtn) {
    tabBtn.click();
  }
}

// 8. Terminal Command Logic
function initTerminalCommands() {
  const termBody = document.getElementById('terminal-body');
  const termInput = document.getElementById('terminal-input');

  if (!termInput || !termBody) return;

  // Set initial focus
  termBody.addEventListener('click', () => {
    const activeTab = document.querySelector('.term-tab.active');
    if (activeTab && activeTab.getAttribute('data-tab') === 'terminal') {
      termInput.focus();
    }
  });

  const commands = {
    help: () => `
      <div class="term-line">Available commands:</div>
      <ul class="term-list">
        <li><span class="term-highlight">about</span>    - Brief biography</li>
        <li><span class="term-highlight">projects</span> - View selected project details</li>
        <li><span class="term-highlight">skills</span>   - List technical competencies</li>
        <li><span class="term-highlight">contact</span>  - Show email and WhatsApp links</li>
        <li><span class="term-highlight">clear</span>    - Clear terminal logs</li>
      </ul>
      <div class="term-line" style="margin-top:8px; color:var(--color-text-muted);">* Pro-tip: You can view structured files directly by clicking the tabs above!</div>
    `,
    about: () => {
      setTimeout(() => switchTerminalTab('about'), 300);
      return `<div style="color:var(--color-accent-secondary);">Loading about.json...</div>`;
    },
    projects: () => `
      <div class="term-line" style="color:var(--color-accent);">Featured Work:</div>
      <ul class="term-list">
        <li>1. <span class="term-highlight">Image Classifier CNN</span> - Python, TensorFlow, CIFAR-10</li>
        <li>2. <span class="term-highlight">Sentiment BERT API</span> - HuggingFace, Flask inference</li>
        <li>3. <span class="term-highlight">Vet Clinic Platform</span> - Next.js, Supabase, Postgres</li>
        <li>4. <span class="term-highlight">Uma Traders Web</span> - HTML5, CSS3, Vanilla JavaScript</li>
      </ul>
    `,
    skills: () => {
      setTimeout(() => switchTerminalTab('skills'), 300);
      return `<div style="color:var(--color-accent-secondary);">Executing skills.py...</div>`;
    },
    contact: () => {
      setTimeout(() => switchTerminalTab('contact'), 300);
      return `<div style="color:var(--color-accent-secondary);">Opening contact.log...</div>`;
    },
    clear: () => {
      const history = termBody.querySelectorAll('.term-history-item');
      history.forEach(item => item.remove());
      return null;
    }
  };

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = termInput.value.trim();
      const cleanVal = val.toLowerCase();
      termInput.value = '';

      if (!val) return;

      // Add to log history
      const historyItem = document.createElement('div');
      historyItem.className = 'term-history-item';

      const cmdRow = document.createElement('div');
      cmdRow.className = 'term-cmd-row';
      cmdRow.innerHTML = `<span class="term-prompt">$</span> <span>${val}</span>`;
      historyItem.appendChild(cmdRow);

      // Execute command
      if (commands[cleanVal]) {
        const output = commands[cleanVal]();
        if (output !== null) {
          const outRow = document.createElement('div');
          outRow.className = 'term-output';
          outRow.innerHTML = output;
          historyItem.appendChild(outRow);
        }
      } else {
        const errorRow = document.createElement('div');
        errorRow.className = 'term-output';
        errorRow.style.color = '#ef4444';
        errorRow.textContent = `Command not recognized: "${val}". Type "help" to list valid options.`;
        historyItem.appendChild(errorRow);
      }

      // Insert command output before the input line
      const inputRow = termBody.querySelector('.term-tab-content.active .term-input-row');
      const activeContent = document.getElementById('term-content-terminal');
      if (activeContent) {
        activeContent.insertBefore(historyItem, inputRow);
      }

      // Autoscroll to bottom
      termBody.scrollTop = termBody.scrollHeight;
    }
  });
}

// 9. Card spotlight glare hover effect (Vercel-like hover glow)
function initProjectGlow() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// 10. Scroll Reveal Animations (using IntersectionObserver)
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// 11. Contact Form submit redirect to WhatsApp
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const message = document.getElementById('form-message').value;

    const text = `Hi Lucky Anish! My name is ${name} (${email}). ${message}`;
    const waUrl = `https://wa.me/919304277935?text=${encodeURIComponent(text)}`;

    window.open(waUrl, '_blank');
    form.reset();
  });
}
