const PRODUCTS = [
  {id:'ma-home',team:'marokko',name:'Marokko Thuis Kit',price:34.99,badge:'BESTSELLER'},
  {id:'nl-home',team:'nederland',name:'Nederland Thuis Kit',price:34.99,badge:'HOT'},
  {id:'tr-home',team:'turkije',name:'Turkije Thuis Kit',price:32.99,badge:'NIEUW'},
  {id:'br-home',team:'brazilie',name:'Brazilië Thuis Kit',price:36.99,badge:'TOP'},
  {id:'ar-away',team:'argentinie',name:'Argentinië Uit Kit',price:36.99,badge:'NIEUW'},
  {id:'es-home',team:'spanje',name:'Spanje Thuis Kit',price:35.99,badge:'TOP'}
];
const KEY='dripkitz_cart_v2';
const euro=n=>`€${n.toFixed(2).replace('.',',')}`;
const cart=()=>JSON.parse(localStorage.getItem(KEY)||'[]');
const setCart=v=>localStorage.setItem(KEY,JSON.stringify(v));

function updateBadge(){
  const c=cart().reduce((s,i)=>s+i.qty,0);
  document.querySelectorAll('#cartCount').forEach(el=>el.textContent=c);
}

function add(id){
  const c=cart();
  const hit=c.find(x=>x.id===id);
  if(hit) hit.qty++; else c.push({id,qty:1});
  setCart(c); updateBadge(); renderCart();
}

function renderProducts(){
  const el=document.getElementById('productGrid'); if(!el) return;
  el.innerHTML=PRODUCTS.map(p=>`<article class="product" data-team="${p.team}"><span class="badge">${p.badge}</span><h3>${p.name}</h3><p class="muted">WK 2026 fan edition</p><div class="cart-total-row"><strong>${euro(p.price)}</strong><button class="btn btn-gold" data-add="${p.id}">+ Winkelwagen</button></div></article>`).join('');
  el.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>add(b.dataset.add));
}

function renderCart(){
  const el=document.getElementById('cartItems'); const totalEl=document.getElementById('cartTotal');
  if(!el||!totalEl) return;
  const c=cart(); if(!c.length){el.innerHTML='<p class="muted">Je winkelwagen is leeg.</p>';totalEl.textContent='€0,00';return;}
  let total=0;
  el.innerHTML=c.map(i=>{const p=PRODUCTS.find(x=>x.id===i.id); if(!p) return ''; const sub=p.price*i.qty; total+=sub; return `<div class="cart-row"><span>${p.name} × ${i.qty}</span><strong>${euro(sub)}</strong></div>`}).join('');
  totalEl.textContent=euro(total);
}

function filters(){
  const chips=[...document.querySelectorAll('.chip')]; if(!chips.length) return;
  chips.forEach(ch=>ch.onclick=()=>{chips.forEach(c=>c.classList.remove('active')); ch.classList.add('active'); const f=ch.dataset.filter; document.querySelectorAll('.product').forEach(p=>p.style.display=(f==='all'||p.dataset.team===f)?'':'none');});
}

function mobileMenu(){
  const btn=document.getElementById('menuBtn'); const nav=document.getElementById('mainNav');
  if(btn&&nav) btn.onclick=()=>nav.classList.toggle('open');
}

function reveal(){
  const obs=new IntersectionObserver((entries)=>entries.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
}

document.addEventListener('DOMContentLoaded',()=>{
  renderProducts(); renderCart(); filters(); mobileMenu(); reveal(); updateBadge();
  const checkout=document.getElementById('checkoutForm');
  if(checkout) checkout.addEventListener('submit',e=>{e.preventDefault(); setCart([]); updateBadge(); alert('Bedankt! Je bestelling is geplaatst (demo).'); location.href='index.html';});
});
