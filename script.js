document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. SCROLL-DRIVEN DYNAMIC VIDEO SCRUBBING
  // ==========================================================================
  const video = document.getElementById('bgVideo');

  video.addEventListener('loadedmetadata', () => {
    mapVideoToScroll();
  });

  window.addEventListener('scroll', mapVideoToScroll);

  function mapVideoToScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (docHeight <= 0) return;
    
    const scrollFraction = scrollTop / docHeight;
    
    if (video.duration) {
      video.currentTime = video.duration * scrollFraction;
    }
  }

  // ==========================================================================
  // 2. AUDIO FEED SYSTEM (MUTED VECTOR RECOVERY)
  // ==========================================================================
  const audio = document.getElementById('bgAudio');
  const audioControlBtn = document.getElementById('audioControlBtn');
  const audioIcon = document.getElementById('audioIcon');
  const audioBtnText = document.getElementById('audioBtnText');

  audioControlBtn.addEventListener('click', () => {
    if (audio.paused) {
      // Unpause and sync background wave streams
      audio.play().catch(err => console.log("Audio unlock restriction:", err));
      audioBtnText.textContent = "Telemetry Audio: LIVE";
      audioControlBtn.style.borderColor = "var(--accent-emerald)";
      
      // Swap out visual matrix path to active sound waves
      audioIcon.innerHTML = `<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>`;
    } else {
      // Freeze audio track
      audio.pause();
      audioBtnText.textContent = "Telemetry Audio: OFF";
      audioControlBtn.style.borderColor = "var(--border-glass)";
      
      // Swap path to muted/canceled waves
      audioIcon.innerHTML = `<path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>`;
    }
  });

  // ==========================================================================
  // 3. THEME TOGGLE MECHANISM (DARK / LIGHT MAPPING)
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
  // 4. MOBILE NAVIGATION SYSTEM
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
  // 5. RUNTIME FOOTER CALCULATION LOG
  // ==========================================================================
  document.getElementById('year').textContent = new Date().getFullYear();
});