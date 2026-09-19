/**
 * Sureshkumar Choudhary - Portfolio Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Typewriter Effect for Hero Roles
  initTypewriter();

  // 2. Header Scroll Effects & Active Navigation Spy
  initHeaderAndNavSpy();

  // 3. Mobile Drawer Menu Toggle & Backdrop
  initMobileDrawer();

  // 4. Skills Category Filter
  initSkillsFilter();

  // 4b. Experience Domain Filter
  initExperienceFilter();

  // 5. One-Click Copy-to-Clipboard with Toast Feedback
  initCopyToClipboard();

  // 6. Interactive Project Deep-Dive Modal
  initProjectModal();

  // 7. Interactive Contact Form with Validation
  initContactForm();

  // 8. Print / ATS Resume Trigger
  initResumePrint();

  // 9. Animated Metric Counters
  initMetricCounters();

  // 10. Update Current Copyright Year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

/* --------------------------------------------------------------------------
   1. Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const roleElement = document.getElementById('typewriter-role');
  if (!roleElement) return;

  const roles = [
    'Full-Stack Web Engineering',
    'Telecom PCC & HA Systems',
    'React.js & Node.js Architectures',
    'Cloud DevOps & CI/CD Pipelines',
    '3D Visuals & Digital Media'
  ];

  let currentRoleIdx = 0;
  let currentCharIdx = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentRole = roles[currentRoleIdx];

    if (isDeleting) {
      roleElement.textContent = currentRole.substring(0, currentCharIdx - 1);
      currentCharIdx--;
      typingSpeed = 40;
    } else {
      roleElement.textContent = currentRole.substring(0, currentCharIdx + 1);
      currentCharIdx++;
      typingSpeed = 90;
    }

    if (!isDeleting && currentCharIdx === currentRole.length) {
      typingSpeed = 2200; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && currentCharIdx === 0) {
      isDeleting = false;
      currentRoleIdx = (currentRoleIdx + 1) % roles.length;
      typingSpeed = 400; // Pause before new word
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 800);
}

/* --------------------------------------------------------------------------
   2. Header & Active Navigation Spy
   -------------------------------------------------------------------------- */
function initHeaderAndNavSpy() {
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy
    let currentSectionId = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Mobile Drawer Navigation & Backdrop
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const closeBtn = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!toggleBtn || !drawer || !closeBtn) return;

  function openDrawer() {
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   3b. Experience Domain Filter
   -------------------------------------------------------------------------- */
function initExperienceFilter() {
  const expTabs = document.querySelectorAll('.exp-filter-btn');
  const expItems = document.querySelectorAll('.timeline-item');

  if (!expTabs.length || !expItems.length) return;

  expTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      expTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-exp-filter');

      expItems.forEach(item => {
        const category = item.getAttribute('data-exp-category');
        if (filter === 'all' || category === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. Skills Filter
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.skill-tab');
  const cards = document.querySelectorAll('.skill-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. One-Click Copy-to-Clipboard with Toast Feedback
   -------------------------------------------------------------------------- */
function initCopyToClipboard() {
  const copyElements = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    if (toastText) toastText.textContent = message;

    toast.classList.add('show');
    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  copyElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = el.getAttribute('data-copy');

      if (!textToCopy) return;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => showToast(`Copied "${textToCopy}" to clipboard!`))
          .catch(() => fallbackCopy(textToCopy));
      } else {
        fallbackCopy(textToCopy);
      }
    });
  });

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`Copied "${text}" to clipboard!`);
    } catch (err) {
      showToast(`Could not copy: ${text}`);
    }
    document.body.removeChild(textArea);
  }
}

/* --------------------------------------------------------------------------
   6. Interactive Project Modal Dialog
   -------------------------------------------------------------------------- */
function initProjectModal() {
  const backdrop = document.getElementById('project-modal-backdrop');
  const content = document.getElementById('modal-content');
  const closeBtn = document.getElementById('modal-close-btn');
  const openButtons = document.querySelectorAll('.open-project-modal');

  if (!backdrop || !content || !closeBtn) return;

  const projectDetails = {
    pcc: {
      badge: 'Telecom Infrastructure & High Availability',
      title: 'Carrier-Grade Telecom PCC (Policy & Charging Control) Platform',
      contentHtml: `
        <p class="modal-text">
          Engineered at <strong>Tayana Mobility Technologies</strong>, this mission-critical telecom solution 
          manages live subscriber sessions, data consumption quotas, and account balance lifecycle packages across carrier networks.
        </p>
        <h4 class="modal-section-title">Key Engineering Responsibilities</h4>
        <ul class="modal-list">
          <li><strong>Real-Time Quota Handling:</strong> Developed low-latency package verification routines triggered during active user browsing sessions.</li>
          <li><strong>High Availability (HA) Deployment:</strong> Configured and administered services across Linux Virtual Machine clusters, ensuring zero unplanned service interruption.</li>
          <li><strong>Database State Consistency:</strong> Integrated relational and high-velocity data layers to preserve absolute transaction integrity during high concurrency traffic spikes.</li>
          <li><strong>Fault Tolerance & Monitoring:</strong> Conducted health heartbeat checks, VM failover diagnostics, and logging analysis for telecom operators.</li>
        </ul>
        <h4 class="modal-section-title">Applied Technology Stack</h4>
        <div class="modal-tags">
          <span class="tech-tag">Linux Virtual Machines</span>
          <span class="tech-tag">Telecom PCC Specs</span>
          <span class="tech-tag">High Availability (HA)</span>
          <span class="tech-tag">Backend Services</span>
          <span class="tech-tag">PostgreSQL / SQL</span>
          <span class="tech-tag">Network Protocols</span>
        </div>
      `
    },
    saas: {
      badge: 'Commercial Full-Stack SaaS',
      title: 'All-in-One Enterprise SaaS Business Management Platform',
      contentHtml: `
        <p class="modal-text">
          Built at <strong>Genzpro Marketing</strong>, this cloud-hosted software application provides growing enterprises 
          with integrated business analytics, client relationship tracking, and streamlined workflow automation.
        </p>
        <h4 class="modal-section-title">Key Architectural Features</h4>
        <ul class="modal-list">
          <li><strong>Modern SPA Frontend:</strong> Developed with React.js, featuring responsive analytics dashboards, dynamic forms, and custom state managers.</li>
          <li><strong>Modular Backend Microservices:</strong> Constructed secure RESTful APIs in Node.js and Express.js with input validation, JWT authentication, and error boundaries.</li>
          <li><strong>Third-Party Integrations:</strong> Connected automated webhooks, payment verification gateways, and data notification channels.</li>
          <li><strong>Zero-Container Direct Cloud CI/CD:</strong> Implemented direct automated pipelines to Vercel (frontend) and Render (backend services) with environment parameter configuration.</li>
        </ul>
        <h4 class="modal-section-title">Applied Technology Stack</h4>
        <div class="modal-tags">
          <span class="tech-tag">React.js</span>
          <span class="tech-tag">Node.js</span>
          <span class="tech-tag">Express.js</span>
          <span class="tech-tag">RESTful APIs</span>
          <span class="tech-tag">MongoDB</span>
          <span class="tech-tag">Vercel & Render</span>
          <span class="tech-tag">Git & GitHub</span>
        </div>
      `
    },
    samsung: {
      badge: '3D Modeling & Visual Campaign',
      title: 'Samsung Consumer Product 3D Renders & Promotional Campaign',
      contentHtml: `
        <p class="modal-text">
          In partnership with <strong>Hello AR</strong>, delivered photorealistic 3D models and high-tempo promotional 
          video campaigns for Samsung hardware products, resulting in a documented <strong>25% increase in customer interaction</strong>.
        </p>
        <h4 class="modal-section-title">Creative & Technical Execution</h4>
        <ul class="modal-list">
          <li><strong>3D Geometry & Texturing:</strong> Modeled high-fidelity product parts in Blender 3D, creating realistic shaders, specular maps, and metallic reflections.</li>
          <li><strong>Cinematic Camera Direction:</strong> Choreographed product turntable shots, dynamic focal lengths, and depth-of-field sequences.</li>
          <li><strong>Motion Graphics & Post-Processing:</strong> Polished keyframe animation, typography overlays, and color grading in Adobe After Effects and Premiere Pro.</li>
        </ul>
        <h4 class="modal-section-title">Applied Tools</h4>
        <div class="modal-tags">
          <span class="tech-tag">Blender 3D</span>
          <span class="tech-tag">Adobe After Effects</span>
          <span class="tech-tag">Adobe Premiere Pro</span>
          <span class="tech-tag">3D Product Rendering</span>
          <span class="tech-tag">Interactive Media</span>
        </div>
      `
    },
    youtube: {
      badge: 'Auditory Visualizers & Digital Brand',
      title: 'Art Cinema & Music Visualizer Digital Platform',
      contentHtml: `
        <p class="modal-text">
          An independently conceived digital media and audio-visual channel focused on art cinema visual pacing and 
          auditory synthesizers, reaching a self-built community of over <strong>1,000+ active subscribers</strong>.
        </p>
        <h4 class="modal-section-title">Highlights & Milestones</h4>
        <ul class="modal-list">
          <li><strong>15+ Original Productions:</strong> Authored, edited, and sound-engineered narrative-driven visualizers.</li>
          <li><strong>Sound-to-Light Synchronization:</strong> Utilized DaVinci Resolve and particle synthesis tools to trigger visual elements directly from music frequencies.</li>
          <li><strong>Organic Audience Scaling:</strong> Researched video distribution algorithms, retention heatmaps, and click-through optimization.</li>
        </ul>
        <h4 class="modal-section-title">Applied Tools</h4>
        <div class="modal-tags">
          <span class="tech-tag">DaVinci Resolve</span>
          <span class="tech-tag">After Effects</span>
          <span class="tech-tag">Audio Engineering</span>
          <span class="tech-tag">Audience Retention Strategy</span>
        </div>
      `
    }
  };

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    content.innerHTML = `
      <span class="modal-badge">${data.badge}</span>
      <h3 class="modal-title" id="modal-title">${data.title}</h3>
      ${data.contentHtml}
    `;

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   7. Interactive Contact Form with Validation
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successAlert = document.getElementById('form-success-alert');
  const submitBtn = document.getElementById('submit-form-btn');

  if (!form || !successAlert || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('sender-name');
    const emailInput = document.getElementById('sender-email');
    const messageInput = document.getElementById('sender-message');

    let isValid = true;

    // Name check
    if (!nameInput.value.trim()) {
      nameInput.parentElement.classList.add('has-error');
      isValid = false;
    } else {
      nameInput.parentElement.classList.remove('has-error');
    }

    // Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.parentElement.classList.add('has-error');
      isValid = false;
    } else {
      emailInput.parentElement.classList.remove('has-error');
    }

    // Message check
    if (!messageInput.value.trim()) {
      messageInput.parentElement.classList.add('has-error');
      isValid = false;
    } else {
      messageInput.parentElement.classList.remove('has-error');
    }

    if (!isValid) return;

    // Simulate sending state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <i class="fa-solid fa-spinner fa-spin"></i>
      <span>Transmitting Message...</span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <span>Send Message</span>
        <i class="fa-regular fa-paper-plane"></i>
      `;

      successAlert.style.display = 'flex';
      form.reset();

      // Show toast
      const toast = document.getElementById('toast');
      const toastText = document.getElementById('toast-text');
      if (toast && toastText) {
        toastText.textContent = 'Message sent! Suresh will reply soon.';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
      }

      setTimeout(() => {
        successAlert.style.display = 'none';
      }, 6000);
    }, 1000);
  });
}

/* --------------------------------------------------------------------------
   8. Resume Print / Save Trigger
   -------------------------------------------------------------------------- */
function initResumePrint() {
  const printBtns = [
    document.getElementById('print-resume-btn'),
    document.getElementById('hero-quick-resume'),
    document.getElementById('mobile-print-resume'),
    document.getElementById('sticky-resume-btn')
  ];

  printBtns.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });
}

/* --------------------------------------------------------------------------
   9. Animated Metric Counters
   -------------------------------------------------------------------------- */
function initMetricCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseFloat(el.getAttribute('data-counter'));
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        const suffix = el.getAttribute('data-suffix') || '';
        
        let startVal = 0;
        const duration = 1400;
        const startTime = performance.now();

        function updateNumber(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = startVal + (targetVal - startVal) * easeOut;

          el.textContent = currentVal.toFixed(decimals) + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          } else {
            el.textContent = targetVal.toFixed(decimals) + suffix;
          }
        }

        requestAnimationFrame(updateNumber);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => observer.observe(el));
}
