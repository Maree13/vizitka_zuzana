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
    // Force reload - zabráni cache problémom
    // Pridá timestamp aby browser načítal stránku znova
    window.location.replace(config.file + '?v=' + Date.now());
  }
}

// ============================================
// INICIALIZÁCIA PO NAČÍTANÍ STRÁNKY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const currentLang = getCurrentLanguage();
  const config = LANGUAGE_CONFIG[currentLang];

  // 1. Vyčisti a pridaj loaded class (na HTML element!)
  document.documentElement.classList.remove('loaded');
  setTimeout(() => {
    document.documentElement.classList.add('loaded');
  }, 10);

  // 2. Nastav správne logo
  const logo = document.querySelector('.site-logo');
  if (logo && config) {
    logo.src = config.logo;
    logo.style.visibility = 'visible';
  }

  // 3. Zvýrazni aktuálne jazykové tlačidlo
  if (config) {
    // Odstráň active class zo všetkých tlačidiel
    document.querySelectorAll('.button-language').forEach((btn) => {
      btn.classList.remove('active');
    });

    // Pridaj active class aktuálnemu tlačidlu
    const currentButton = document.querySelector(`.${config.buttonClass}`);
    if (currentButton) {
      currentButton.classList.add('active');
    }
  }

  // 3. Zvýrazni aktuálne jazykové tlačidlo
  if (config) {
    // Odstráň active class zo všetkých tlačidiel
    document.querySelectorAll('.button-language').forEach((btn) => {
      btn.classList.remove('active');
    });

    // Pridaj active class aktuálnemu tlačidlu
    const currentButton = document.querySelector(`.${config.buttonClass}`);
    if (currentButton) {
      currentButton.classList.add('active');
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
    // Stránka prišla z bfcache - resetuj a znovu zobraz
    document.documentElement.style.visibility = 'visible';
    document.documentElement.classList.remove('loaded');
    setTimeout(() => {
      document.documentElement.classList.add('loaded');

      // Reinicializuj logo
      const currentLang = getCurrentLanguage();
      const config = LANGUAGE_CONFIG[currentLang];
      const logo = document.querySelector('.site-logo');
      if (logo && config) {
        logo.src = config.logo;
        logo.style.visibility = 'visible';
      }
    }, 10);
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
    // Vynechaj externe linky a prázdne kotvy
    const href = this.getAttribute('href');
    if (!href || href === '#' || href.startsWith('http')) {
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollToTopBtn = document.querySelector('.scroll-to-top');

// Kontrola či tlačidlo existuje
if (scrollToTopBtn) {
  // Zobraz tlačidlo po scrolle
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });

  // Kliknutie na tlačidlo
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
