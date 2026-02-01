console.log('JavaScript je pripojený! 🪄');

// PREPÍNANIE JAZYKOV
function changeLanguage(lang) {
  if (lang === 'sk') {
    window.location.href = 'index.html';
  } else if (lang === 'en') {
    window.location.href = 'en.html'; // zmena z metodacesta_en.html
  }
}
// function changeLanguage(lang) {
//   if (lang === 'sk') {
//     window.location.href = 'index.html';
//   } else if (lang === 'en') {
//     window.location.href = 'metodacesta_en.html';
//   }
// }

// Po načítaní stránky
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
  const currentFile = window.location.pathname.split('/').pop();

  // 🔹 HAMBURGER MENU
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
  }

  // 🔹 ZMENA LOGA
  const logo = document.querySelector('.site-logo');
  if (logo) {
    if (currentFile.includes('en.html')) {
      logo.src = 'images/logo_en_.png';
    } else {
      logo.src = 'images/logo.png';
    }
  }
});

// LOGO

// document
//   .getElementById('language-button')
//   .addEventListener('click', function () {
//     var logo = document.getElementById('logo');
//     var currentPage = window.location.pathname;

//     if (currentPage.includes('en.html')) {
//       logo.src = 'images/logo_en_.png';
//     } else {
//       logo.src = 'images/logo.png'; // slovenské logo
//     }
//   });
