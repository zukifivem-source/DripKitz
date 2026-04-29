const products = [
  { id: 'tr-home', team: 'turkije', name: 'Turkije Thuis Kit', price: 29.99, badge: 'HOT', flag: '🇹🇷' },
  { id: 'ma-home', team: 'marokko', name: 'Marokko Thuis Kit', price: 29.99, badge: 'BESTSELLER', flag: '🇲🇦' },
  { id: 'nl-home', team: 'nederland', name: 'Nederland Thuis Kit', price: 29.99, badge: 'NIEUW', flag: '🇳🇱' },
  { id: 'ar-away', team: 'argentinie', name: 'Argentinië Uit Kit', price: 34.99, badge: 'NIEUW', flag: '🇦🇷' },
  { id: 'br-home', team: 'brazilie', name: 'Brazilië Thuis Kit', price: 34.99, badge: 'HOT', flag: '🇧🇷' },
  { id: 'es-home', team: 'spanje', name: 'Spanje Thuis Kit', price: 32.99, badge: 'NIEUW', flag: '🇪🇸' }
];

const CART_KEY = 'dripkitz_cart';

const getCart = () => JSON.parse(localStorage.getItem(CART_KEY) || '[]');
const saveCart = cart => localStorage.setItem(CART_KEY, JSON.stringify(cart));

function addToCart(productId) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    cart.push({ id: product.id, qty: 1 });
  }
  saveCart(cart);
  updateCartBadge();
}

function updateCartBadge() {
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => (el.textContent = count));
}

function money(value) {
  return `€${value.toFixed(2).replace('.', ',')}`;
}

function renderShopGrid() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  grid.innerHTML = products.map(p => `
    <article class="product-card" data-team="${p.team}" data-price="${p.price}">
      <div class="product-img ${p.team}">
        <div class="flag">${p.flag}</div>
        <div class="product-badge">${p.badge}</div>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="product-desc">WK 2026 — Fan Versie</p>
        <div class="product-bottom">
          <span class="price">${money(p.price)}</span>
          <button class="btn-cart" data-id="${p.id}">+ Winkelwagen</button>
        </div>
      </div>
    </article>
  `).join('');
}

function renderCartItems() {
  const itemsWrap = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if (!itemsWrap || !totalEl) return;
  const cart = getCart();

  if (!cart.length) {
    itemsWrap.innerHTML = '<p class="cart-empty">Je winkelwagen is leeg.</p>';
    totalEl.textContent = '€0,00';
    return;
  }

  let total = 0;
  itemsWrap.innerHTML = cart.map(item => {
    const p = products.find(x => x.id === item.id);
    if (!p) return '';
    const sub = p.price * item.qty;
    total += sub;
    return `<div class="cart-row"><span>${p.name} x${item.qty}</span><strong>${money(sub)}</strong></div>`;
  }).join('');

  totalEl.textContent = money(total);
}

function bindCartButtons() {
  document.querySelectorAll('.btn-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.id || 'tr-home');
      btn.textContent = '✓ Toegevoegd';
      setTimeout(() => (btn.textContent = '+ Winkelwagen'), 1200);
      renderCartItems();
    });
  });
}

function setupCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  const openBtn = document.getElementById('cartBtn');
  const closeBtn = document.getElementById('cartClose');
  if (!drawer || !overlay || !openBtn || !closeBtn) return;

  const close = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
  };

  openBtn.addEventListener('click', () => {
    renderCartItems();
    drawer.classList.add('open');
    overlay.classList.add('show');
  });
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
}

function setupFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  if (!buttons.length) return;

  buttons.forEach(btn => btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('#productGrid .product-card').forEach(card => {
      card.style.display = filter === 'all' || card.dataset.team === filter ? '' : 'none';
    });
  }));
}

function setupMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!menuToggle || !mobileMenu) return;
  menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}

window.addEventListener('DOMContentLoaded', () => {
  renderShopGrid();
  bindCartButtons();
  setupCartDrawer();
  setupFilters();
  setupMobileMenu();
  updateCartBadge();
  renderCartItems();
});
