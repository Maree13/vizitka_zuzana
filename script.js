console.log('JavaScript je pripojený! 🪄');

// ============================================
// KONFIGURÁCIA JAZYKOV
// ============================================
const LANGUAGE_CONFIG = {
  sk: {
    file: 'index.html',
    logo: 'images/logo.png',
    buttonClass: 'button_sk',
  },
  en: {
    file: 'en.html',
    logo: 'images/logo_en_.png',
    buttonClass: 'button_en',
  },
  cz: {
    file: 'cz.html',
    logo: 'images/logo.png', // použije slovenské logo alebo vytvor vlastné
    buttonClass: 'button_cz',
  },
};

// ============================================
// DETEKCIA AKTUÁLNEHO JAZYKA
// ============================================
function getCurrentLanguage() {
  const path = window.location.pathname;
  if (path.includes('en.html')) return 'en';
  if (path.includes('cz.html')) return 'cz';
  return 'sk'; // default
}

// ============================================
// PREPÍNANIE JAZYKOV
// ============================================
function changeLanguage(lang) {
  const config = LANGUAGE_CONFIG[lang];
  if (config) {
    window.location.href = config.file;
  }
}

// ============================================
// INICIALIZÁCIA PO NAČÍTANÍ STRÁNKY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const currentLang = getCurrentLanguage();
  const config = LANGUAGE_CONFIG[currentLang];

  // 1. Pridaj loaded class pre fade-in efekt (na HTML element!)
  document.documentElement.classList.add('loaded');

  // 2. Nastav správne logo
  const logo = document.querySelector('.site-logo');
  if (logo && config) {
    logo.src = config.logo;
    logo.style.visibility = 'visible';
  }

  // 3. Skry aktuálne jazykové tlačidlo
  if (config) {
    const currentButton = document.querySelector(`.${config.buttonClass}`);
    if (currentButton) {
      currentButton.style.display = 'none';
    }
  }

  // 4. HAMBURGER MENU
  const menuIcon = document.querySelector('.menu-icon');
  const nav = document.querySelector('nav');

  if (menuIcon && nav) {
    menuIcon.addEventListener('click', () => {
      const icon = menuIcon.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
      nav.classList.toggle('show');
    });

    // Zatvor menu po kliknutí na link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('show');
        const icon = menuIcon.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 5. COOKIE BANNER
  initCookieBanner(currentLang);
});

// ============================================
// OŠETRENIE BACK/FORWARD CACHE
// ============================================
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    // Stránka prišla z cache
    document.documentElement.style.visibility = 'visible';
    const logo = document.querySelector('.site-logo');
    if (logo) logo.style.visibility = 'visible';
  }
});

// ============================================
// COOKIE BANNER
// ============================================
function initCookieBanner(lang) {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const message = document.getElementById('cookie-message');

  if (!banner || !acceptBtn || !message) return;

  // Texty podľa jazyka
  const texts = {
    sk: {
      message: 'Táto stránka používa cookies pre lepší zážitok.',
      button: 'Súhlasím',
    },
    en: {
      message: 'This site uses cookies to improve your experience.',
      button: 'Accept',
    },
    cz: {
      message: 'Tato stránka používá cookies pro lepší zážitek.',
      button: 'Souhlasím',
    },
  };

  const text = texts[lang] || texts.sk;
  message.textContent = text.message;
  acceptBtn.textContent = text.button;

  // Zobraz banner ak ešte nebol akceptovaný
  if (!localStorage.getItem('cookiesAccepted')) {
    banner.style.display = 'block';
  }

  // Akceptovanie cookies
  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    banner.style.display = 'none';
  });
}

// ============================================
// SMOOTH SCROLL (voliteľné vylepšenie)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});
