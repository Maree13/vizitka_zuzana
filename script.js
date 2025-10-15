console.log('JavaScript je pripojený! 🪄');

function changeLanguage(lang) {
  if (lang === 'sk') {
    window.location.href = 'index.html';
  } else if (lang === 'en') {
    window.location.href = 'terapiecesta_en.html';
  }
}

// 🔸 Po načítaní stránky automaticky zistí, kde sme, a skryje tlačidlo aktuálneho jazyka
document.addEventListener('DOMContentLoaded', () => {
  const currentFile = window.location.pathname.split('/').pop();

  if (currentFile.includes('_en')) {
    // sme na anglickej stránke → skry EN tlačidlo
    document.querySelector("button[onclick*='en']").style.display = 'none';
  } else {
    // sme na slovenskej stránke → skry SK tlačidlo
    document.querySelector("button[onclick*='sk']").style.display = 'none';
  }
});

// function changeLanguage(lang) {
//   if (lang === "sk") {
//     window.location.href = "index.html";
//   } else if (lang === "en") {
//     window.location.href = "terapiecesta_en.html";
//   }

// ak by si mala aj CZ, pridaj ďalší else if:
// else if (lang === "cz") {
//   window.location.href = "terapiecesta_cz.html";
// }
