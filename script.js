document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. THEME TOGGLE MECHANISM (DARK / LIGHT MAPPING)
  // ==========================================================================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  
  // Set default initial rendering mode layout state to Dark
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
      // Inline transform path to Sun design matrix
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>`;
    } else {
      // Return path token back to Moon design matrix
      themeIcon.innerHTML = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`;
    }
  }

  // ==========================================================================
  // 2. MOBILE HAMBURGER NAVIGATION SYSTEM 
  // ==========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Automatically wrap closed toggle viewports upon structural link triggers
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // ==========================================================================
  // 3. RUNTIME FOOTER CALCULATION LOG
  // ==========================================================================
  document.getElementById('year').textContent = new Date().getFullYear();
});