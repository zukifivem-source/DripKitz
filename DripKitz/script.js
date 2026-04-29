// =========================================
// DRIPKITZ — script.js
// =========================================

// -----------------------------------------
// TRANSLATIONS
// -----------------------------------------
const translations = {
  nl: {
    nav_collectie: "Collectie",
    nav_over: "Over ons",
    nav_contact: "Contact",
    hero_tag: "WK 2026 — Exclusieve Kits",
    hero_line1: "GAME DAY",
    hero_line2: "DRIP",
    hero_sub: "Scherp geprijsde fan kits. Snel geleverd. Klaar voor het grootste WK ooit.",
    hero_cta: "Bekijk Collectie",
    col_tag: "— Nieuwe Collectie",
    col_title: "WK 2026 KITS",
    badge_hot: "HOT",
    badge_best: "BESTSELLER",
    badge_new: "NIEUW",
    prod_turkije: "Turkije Thuis Kit",
    prod_turkije_desc: "WK 2026 — Fan Versie",
    prod_marokko: "Marokko Thuis Kit",
    prod_marokko_desc: "WK 2026 — Fan Versie",
    prod_nederland: "Nederland Thuis Kit",
    prod_nederland_desc: "WK 2026 — Fan Versie",
    btn_cart: "+ Winkelwagen",
    usp1: "Snelle levering",
    usp2: "Scherpe prijzen",
    usp3: "Alle maten beschikbaar",
    usp4: "WK 2026 klaar",
    over_tag: "— Wie zijn wij",
    over_title: "OVER DRIPKITZ",
    over_text1: "DripKitz is opgericht door twee vrienden die geloven dat iedereen betaalbaar kan supporteren voor zijn land. Geen overdreven prijzen, geen gedoe — gewoon strakke kits op tijd bij jou thuis.",
    over_text2: "Voor het WK 2026 starten we met de meest gevraagde kits in Nederland: Turkije, Marokko en Oranje. Later groeien we door naar een volledig streetwear & merkkleding concept.",
    stat1: "Landen",
    stat2: "Vanaf",
    stat3: "Levering",
    footer_sub: "Jouw WK kit dealer. Snel. Betaalbaar. Strak.",
    footer_shop: "Shop",
    footer_maten: "Maatgids",
    footer_levering: "Levering & Retour",
    footer_info: "Info",
    footer_rights: "Alle rechten voorbehouden",
  },
  en: {
    nav_collectie: "Collection",
    nav_over: "About",
    nav_contact: "Contact",
    hero_tag: "World Cup 2026 — Exclusive Kits",
    hero_line1: "GAME DAY",
    hero_line2: "DRIP",
    hero_sub: "Affordable fan kits. Fast delivery. Ready for the biggest World Cup ever.",
    hero_cta: "Shop Collection",
    col_tag: "— New Collection",
    col_title: "WORLD CUP 2026 KITS",
    badge_hot: "HOT",
    badge_best: "BESTSELLER",
    badge_new: "NEW",
    prod_turkije: "Turkey Home Kit",
    prod_turkije_desc: "World Cup 2026 — Fan Version",
    prod_marokko: "Morocco Home Kit",
    prod_marokko_desc: "World Cup 2026 — Fan Version",
    prod_nederland: "Netherlands Home Kit",
    prod_nederland_desc: "World Cup 2026 — Fan Version",
    btn_cart: "+ Add to Cart",
    usp1: "Fast delivery",
    usp2: "Sharp prices",
    usp3: "All sizes available",
    usp4: "World Cup 2026 ready",
    over_tag: "— Who we are",
    over_title: "ABOUT DRIPKITZ",
    over_text1: "DripKitz was founded by two friends who believe everyone deserves to support their country in style — without paying crazy prices. No fuss, just clean kits delivered fast.",
    over_text2: "For the 2026 World Cup we're starting with the most wanted kits in the Netherlands: Turkey, Morocco and Oranje. Later we'll expand into a full streetwear & brand clothing concept.",
    stat1: "Nations",
    stat2: "From",
    stat3: "Delivery",
    footer_sub: "Your World Cup kit dealer. Fast. Affordable. Clean.",
    footer_shop: "Shop",
    footer_maten: "Size Guide",
    footer_levering: "Shipping & Returns",
    footer_info: "Info",
    footer_rights: "All rights reserved",
  }
};

// -----------------------------------------
// LANGUAGE TOGGLE
// -----------------------------------------
let currentLang = 'nl';

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  document.documentElement.lang = lang;
}

const langToggle = document.getElementById('langToggle');
langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'nl' ? 'en' : 'nl';
  langToggle.textContent = currentLang === 'nl' ? 'EN' : 'NL';
  applyTranslations(currentLang);
});

// -----------------------------------------
// MOBILE MENU
// -----------------------------------------
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// -----------------------------------------
// NAVBAR SCROLL EFFECT
// -----------------------------------------
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.borderBottomColor = 'rgba(212,175,55,0.3)';
  } else {
    navbar.style.borderBottomColor = 'rgba(212,175,55,0.15)';
  }
});

// -----------------------------------------
// CART BUTTON FEEDBACK
// -----------------------------------------
document.querySelectorAll('.btn-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const original = btn.textContent;
    btn.textContent = currentLang === 'nl' ? '✓ Toegevoegd!' : '✓ Added!';
    btn.style.background = 'var(--gold)';
    btn.style.color = 'var(--black)';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.color = '';
    }, 1500);
  });
});

// -----------------------------------------
// SCROLL REVEAL
// -----------------------------------------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card, .over-content, .usp').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
