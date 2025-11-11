console.log('JavaScript je pripojený! 🪄');

// PREPÍNANIE JAZYKOV
function changeLanguage(lang) {
  if (lang === 'sk') {
    window.location.href = 'index.html';
  } else if (lang === 'en') {
    window.location.href = 'metodacesta_en.html';
  }
}

// Po načítaní stránky
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
  // 🔹 SKRYTIE TLAČIDLA AKTUÁLNEHO JAZYKA
  const currentFile = window.location.pathname.split('/').pop();
  if (currentFile.includes('_en')) {
    // sme na anglickej stránke → skry EN tlačidlo
    const enButton = document.querySelector("button[onclick*='en']");
    if (enButton) enButton.style.display = 'none';
  } else {
    // sme na slovenskej stránke → skry SK tlačidlo
    const skButton = document.querySelector("button[onclick*='sk']");
    if (skButton) skButton.style.display = 'none';
  } // 🔹 HAMBURGER MENU

  const menuIcon = document.querySelector('.menu-icon i');
  const nav = document.querySelector('nav');

  if (menuIcon && nav) {
    menuIcon.addEventListener('click', () => {
      // prepínanie ikony
      menuIcon.classList.toggle('fa-bars');
      menuIcon.classList.toggle('fa-xmark'); // zobrazenie/skrytie menu

      nav.classList.toggle('show');
    });
  }
});

// 🔹 ZMENA LOGA PODĽA JAZYKA
const logo = document.querySelector('.site-logo');
if (currentFile.includes('_en')) {
  logo.src = 'images/logo_en.png';
} else {
  logo.src = 'images/logo.png';
}
