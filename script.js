document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. SCROLL-DRIVEN CINEMATIC TRANSITION VIDEO SCRUBBING
  // ==========================================================================
  const video = document.getElementById('bgVideo');

  // Ensure the video metadata loads so we know its duration length parameters
  video.addEventListener('loadedmetadata', () => {
    mapVideoToScroll();
  });

  window.addEventListener('scroll', mapVideoToScroll);

  function mapVideoToScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (docHeight <= 0) return;
    
    // Calculate page position ratio percentage (0.0 to 1.0)
    const scrollFraction = scrollTop / docHeight;
    
    // Translate page scroll percentage directly to video duration timestamps
    if (video.duration) {
      video.currentTime = video.duration * scrollFraction;
    }
  }

  // ==========================================================================
  // 2. THEME TOGGLE MECHANISM (DARK / LIGHT MAPPING)
  // ==========================================================================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'dark');
  }
  
  const currentTheme = localStorage.getItem('theme');
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
    updateThemeIcon(targetTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>`;
    } else {
      themeIcon.innerHTML = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`;
    }
  }

  // ==========================================================================
  // 3. MOBILE NAVIGATION SYSTEM
  // ==========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // ==========================================================================
  // 4. RUNTIME FOOTER CALCULATION LOG
  // ==========================================================================
  document.getElementById('year').textContent = new Date().getFullYear();
});