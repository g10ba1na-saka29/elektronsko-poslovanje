/* ===== CYRILLIC ===== */
const LAT_CYR = [
  ['DŽ','Џ'],['Dž','Џ'],['dž','џ'],
  ['LJ','Љ'],['Lj','Љ'],['lj','љ'],
  ['NJ','Њ'],['Nj','Њ'],['nj','њ'],
  ['Đ','Ђ'],['đ','ђ'],
  ['Č','Ч'],['č','ч'],
  ['Ć','Ћ'],['ć','ћ'],
  ['Š','Ш'],['š','ш'],
  ['Ž','Ж'],['ž','ж'],
  ['A','А'],['a','а'],['B','Б'],['b','б'],
  ['C','Ц'],['c','ц'],['D','Д'],['d','д'],
  ['E','Е'],['e','е'],['F','Ф'],['f','ф'],
  ['G','Г'],['g','г'],['H','Х'],['h','х'],
  ['I','И'],['i','и'],['J','Ј'],['j','ј'],
  ['K','К'],['k','к'],['L','Л'],['l','л'],
  ['M','М'],['m','м'],['N','Н'],['n','н'],
  ['O','О'],['o','о'],['P','П'],['p','п'],
  ['R','Р'],['r','р'],['S','С'],['s','с'],
  ['T','Т'],['t','т'],['U','У'],['u','у'],
  ['V','В'],['v','в'],['Z','З'],['z','з'],
];

function toCyrillic(str) {
  let s = str;
  for (const [l, c] of LAT_CYR) s = s.replaceAll(l, c);
  return s;
}

let cyrillicMode = false;
const originals = new Map();

function applyScript(toCyr) {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const tag = node.parentElement?.tagName;
        if (!tag || tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT;
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const nodes = [];
  let n;
  while ((n = walker.nextNode())) nodes.push(n);

  for (const node of nodes) {
    if (toCyr) {
      if (!originals.has(node)) originals.set(node, node.nodeValue);
      node.nodeValue = toCyrillic(node.nodeValue);
    } else {
      if (originals.has(node)) {
        node.nodeValue = originals.get(node);
        originals.delete(node);
      }
    }
  }

  const btn = document.getElementById('scriptToggle');
  if (btn) {
    btn.textContent = toCyr ? 'Lat' : 'Ћир';
    btn.classList.toggle('active', toCyr);
    btn.setAttribute('title', toCyr ? 'Prebaci na latinicu' : 'Prebaci na ćirilicu');
  }
}

/* ===== DATA ===== */
const PRODUCTS = [
  // Crveno meso
  { id: 1,  name: "Goveđi odrezak",     cat: "meso",     emoji: "🥩", weight: "250g",  price: 12.90, desc: "Svježi goveđi odrezak prvog kvaliteta, idealan za roštilj" },
  { id: 2,  name: "Janjeća plećka",     cat: "meso",     emoji: "🍖", weight: "1 kg",  price: 18.50, desc: "Domaća janjeća plećka, mekana i ukusna, direktno sa farme" },
  { id: 3,  name: "Teleće meso",        cat: "meso",     emoji: "🥩", weight: "500g",  price: 11.00, desc: "Mlado teleće meso delikatnog ukusa, bez kostiju" },
  { id: 4,  name: "Svinjski vrat",      cat: "meso",     emoji: "🍖", weight: "1 kg",  price: 14.90, desc: "Svinjski vrat bez kosti, idealan za pečenje i roštilj" },
  { id: 5,  name: "Mljeveno meso",      cat: "meso",     emoji: "🫙", weight: "500g",  price: 8.90,  desc: "Mješano mljeveno goveđe i svinjsko meso za ćufte i sarmu" },
  // Perad
  { id: 6,  name: "Pileća prsa",        cat: "perad",    emoji: "🍗", weight: "500g",  price: 7.50,  desc: "Svježa pileća prsa bez kostiju i kože, bogata proteinima" },
  { id: 7,  name: "Cijela piletina",    cat: "perad",    emoji: "🐔", weight: "~1.2kg",price: 11.90, desc: "Domaća cijela piletina, svježe zaklana svakog dana" },
  { id: 8,  name: "Pileći batak",       cat: "perad",    emoji: "🍗", weight: "1 kg",  price: 7.90,  desc: "Sočan pileći batak sa kožicom, ukusan pečen ili u supi" },
  { id: 9,  name: "Ćureća prsa",        cat: "perad",    emoji: "🦃", weight: "500g",  price: 10.50, desc: "Nježna ćureća prsa, idealna za zdravu i dijetalnu ishranu" },
  // Kobasice
  { id: 10, name: "Domaće kobasice",    cat: "kobasice", emoji: "🌭", weight: "1 kg",  price: 16.90, desc: "Tradicionalne domaće kobasice po staroj bosanskoj recepturi" },
  { id: 11, name: "Sudžuk",             cat: "kobasice", emoji: "🌭", weight: "250g",  price: 8.50,  desc: "Autentični bosanski sudžuk, začinjen i sušen po tradiciji" },
  { id: 12, name: "Pečenica",           cat: "kobasice", emoji: "🥓", weight: "500g",  price: 11.90, desc: "Dimljena svinjska pečenica, idealna za doručak ili večeru" },
  { id: 13, name: "Domaće hrenovke",    cat: "kobasice", emoji: "🌭", weight: "500g",  price: 7.90,  desc: "Hrenovke bez vještačkih aditiva i konzervansa" },
  { id: 14, name: "Sremska kobasica",   cat: "kobasice", emoji: "🥩", weight: "500g",  price: 13.50, desc: "Začinjena sremska kobasica od kvalitetnog svinjskog mesa" },
  // Mliječni
  { id: 15, name: "Domaći sir",         cat: "mljecni",  emoji: "🧀", weight: "500g",  price: 9.90,  desc: "Svježi domaći bijeli sir, kremast i blag, od kravljeg mlijeka" },
  { id: 16, name: "Kajmak",             cat: "mljecni",  emoji: "🫙", weight: "250g",  price: 7.50,  desc: "Pravi domaći kajmak sa planine Majevice, punomasni" },
  { id: 17, name: "Pavlaka",            cat: "mljecni",  emoji: "🥛", weight: "400ml", price: 4.90,  desc: "Kisela pavlaka od domaćeg punomasnog mlijeka" },
  { id: 18, name: "Domaće maslo",       cat: "mljecni",  emoji: "🧈", weight: "250g",  price: 6.50,  desc: "Čisto domaće maslo zlatne boje, aromatično i prirodno" },
];

const CAT_LABELS = {
  meso:     "Crveno meso",
  perad:    "Perad",
  kobasice: "Kobasice",
  mljecni:  "Mliječni",
};

const FAQS = [
  {
    q: "Da li vršite dostavu kući?",
    a: "Da! Vršimo besplatnu dostavu na cijelo područje Bijeljine za narudžbe iznad 30 KM. Za narudžbe ispod tog iznosa, naknada za dostavu iznosi 3 KM. Narudžbe primamo telefonom na broj +387 65 123-456 radnim danima do 17:00."
  },
  {
    q: "Koje su vaše radne sate?",
    a: "Radimo svakim danom osim nedjelje. Ponedjeljak do petka: 07:00–19:00, subota: 07:00–16:00. Nedjeljom i državnim praznicima ne radimo."
  },
  {
    q: "Da li je vaše meso svježe dostavljeno svaki dan?",
    a: "Apsolutno! Naši pouzdani dobavljači sa lokalnih farmi Semberije dostavljaju svježe meso svako jutro između 6 i 7 sati. Garantujemo da je sve što prodajemo isporučeno istog dana — nikad zamrznuto."
  },
  {
    q: "Mogu li naručiti veće količine za slave i proslave?",
    a: "Naravno! Za narudžbe veće od 10 kg ili za specijalne prilike poput slava, svadbi i roštilj-proslava, kontaktirajte nas najmanje 48 sati unaprijed. Nudimo poseban popust za veće narudžbe i možemo pripremiti meso po vašim željama."
  },
  {
    q: "Da li prodajete organsko i domaće uzgojene proizvode?",
    a: "Sarađujemo isključivo sa lokalnim farmerima iz Semberije koji uzgajaju životinje na prirodan, tradicionalan način. Naše meso nema dodanih hormona rasta niti vještačkih aditiva. Možete nam vjerovati — poznajemo farmere po imenu."
  },
  {
    q: "Kako pravilno čuvati svježe meso kod kuće?",
    a: "Svježe meso čuvajte u frižideru na temperaturi između 0°C i 4°C i potrošite ga unutar 2–3 dana od kupovine. Za duže čuvanje, zamrznite odmah nakon kupovine na -18°C. Meso nikad ne odmrzavajte na sobnoj temperaturi — uvijek koristite frižider ili hladnu vodu."
  },
  {
    q: "Da li primate rezervacije i posebne narudžbe?",
    a: "Da! Možete rezervisati određene komade ili naručiti specifične dijelove koji nisu uvijek dostupni (npr. goveđi T-bone, janjeća rebra, cijelo janje). Pozovite nas dan ranije i potrudićemo se ispuniti vaš zahtjev bez doplata."
  },
];

/* ===== CART ===== */
class Cart {
  constructor() {
    this.items = this._load();
    this._syncUI();
  }

  _load() {
    try { return JSON.parse(localStorage.getItem('mg_cart') || '[]'); }
    catch { return []; }
  }

  _save() {
    localStorage.setItem('mg_cart', JSON.stringify(this.items));
    this._syncUI();
  }

  add(productId) {
    const existing = this.items.find(i => i.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      const p = PRODUCTS.find(p => p.id === productId);
      if (p) this.items.push({ id: p.id, qty: 1 });
    }
    this._save();
    this._renderItems();
  }

  remove(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    this._save();
    this._renderItems();
    this._updateProductButtons();
  }

  setQty(productId, qty) {
    if (qty <= 0) { this.remove(productId); return; }
    const item = this.items.find(i => i.id === productId);
    if (item) {
      item.qty = qty;
      this._save();
      this._renderItems();
    }
  }

  clear() {
    this.items = [];
    this._save();
    this._renderItems();
    this._updateProductButtons();
  }

  total() {
    return this.items.reduce((sum, i) => {
      const p = PRODUCTS.find(p => p.id === i.id);
      return sum + (p ? p.price * i.qty : 0);
    }, 0);
  }

  count() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  }

  has(productId) {
    return this.items.some(i => i.id === productId);
  }

  _syncUI() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const n = this.count();
    badge.textContent = n;
    badge.hidden = n === 0;
  }

  _renderItems() {
    const empty   = document.getElementById('cartEmpty');
    const list    = document.getElementById('cartItems');
    const footer  = document.getElementById('cartFooter');
    const totalEl = document.getElementById('cartTotal');
    const shipEl  = document.getElementById('shippingNote');
    if (!list) return;

    if (this.items.length === 0) {
      empty.style.display = '';
      list.innerHTML = '';
      if (footer) footer.hidden = true;
      return;
    }

    empty.style.display = 'none';
    if (footer) footer.hidden = false;

    list.innerHTML = this.items.map(item => {

      const p = PRODUCTS.find(p => p.id === item.id);
      if (!p) return '';
      const linePrice = (p.price * item.qty).toFixed(2);
      return `
        <li class="cart-item" data-id="${p.id}">
          <div class="cart-item-emoji">${p.emoji}</div>
          <div class="cart-item-info">
            <div class="cart-item-name">${p.name}</div>
            <div class="cart-item-price">${linePrice} KM</div>
          </div>
          <div class="cart-item-controls">
            <button class="qty-btn" data-action="dec" data-id="${p.id}" aria-label="Smanji količinu">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" data-action="inc" data-id="${p.id}" aria-label="Povećaj količinu">+</button>
          </div>
          <button class="cart-item-remove" data-action="remove" data-id="${p.id}" aria-label="Ukloni">✕</button>
        </li>`;
    }).join('');

    const t = this.total();
    if (cyrillicMode) setTimeout(() => applyScript(true), 30);
    if (totalEl) totalEl.textContent = t.toFixed(2) + ' KM';
    if (shipEl) {
      if (t >= 30) {
        shipEl.innerHTML = '🎉 <strong style="color:var(--red)">Besplatna dostava</strong> uključena!';
      } else {
        const diff = (30 - t).toFixed(2);
        shipEl.textContent = `Dodajte još ${diff} KM za besplatnu dostavu`;
      }
    }
  }

  _updateProductButtons() {
    document.querySelectorAll('.btn-add[data-id]').forEach(btn => {
      const id = +btn.dataset.id;
      if (this.has(id)) {
        btn.textContent = '✓ Dodano';
        btn.classList.add('in-cart');
      } else {
        btn.textContent = '+ Dodaj';
        btn.classList.remove('in-cart');
      }
    });
  }
}

/* ===== TOAST ===== */
let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

/* ===== RENDER PRODUCTS ===== */
function renderProducts(filterCat = 'svi') {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const list = filterCat === 'svi'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.cat === filterCat);

  grid.innerHTML = list.map(p => `
    <article class="product-card fade-in" data-cat="${p.cat}">
      <div class="product-visual cat-${p.cat}">${p.emoji}</div>
      <div class="product-body">
        <p class="product-cat-tag">${CAT_LABELS[p.cat] || p.cat}</p>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <div class="product-price-block">
            <span class="product-weight">${p.weight}</span>
            <span class="product-price">${p.price.toFixed(2)} <span>KM</span></span>
          </div>
          <button class="btn-add ${cart.has(p.id) ? 'in-cart' : ''}" data-id="${p.id}" aria-label="Dodaj ${p.name} u korpu">
            ${cart.has(p.id) ? '✓ Dodano' : '+ Dodaj'}
          </button>
        </div>
      </div>
    </article>
  `).join('');

  requestAnimationFrame(() => {
    grid.querySelectorAll('.fade-in').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 55);
    });
    if (cyrillicMode) setTimeout(() => applyScript(true), 80);
  });
}

/* ===== RENDER FAQ ===== */
function renderFAQ() {
  const list = document.getElementById('faqList');
  if (!list) return;

  list.innerHTML = FAQS.map((item, i) => `
    <div class="faq-item fade-in" id="faq-${i}">
      <button class="faq-question" aria-expanded="false" aria-controls="faq-ans-${i}">
        <span>${item.q}</span>
        <span class="faq-icon" aria-hidden="true">+</span>
      </button>
      <div class="faq-answer" id="faq-ans-${i}" role="region">
        <p class="faq-answer-inner">${item.a}</p>
      </div>
    </div>
  `).join('');

  requestAnimationFrame(() => {
    list.querySelectorAll('.fade-in').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 70);
    });
  });

  list.addEventListener('click', e => {
    const btn = e.target.closest('.faq-question');
    if (!btn) return;
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    list.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
}

/* ===== INIT ===== */
const cart = new Cart();

document.addEventListener('DOMContentLoaded', () => {

  /* --- Render dynamic content --- */
  renderProducts('svi');
  renderFAQ();
  cart._renderItems();

  /* --- Header scroll effect --- */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);

    const sections = ['o-nama','katalog','lokacija','faq'];
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    document.querySelectorAll('.nav-link').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Mobile menu --- */
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  /* --- Product filter --- */
  document.getElementById('filterTabs').addEventListener('click', e => {
    const btn = e.target.closest('.filter-tab');
    if (!btn) return;
    document.querySelectorAll('.filter-tab').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    renderProducts(btn.dataset.cat);

    const section = document.getElementById('katalog');
    if (section) {
      const y = section.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });

  /* --- Add to cart --- */
  document.getElementById('productGrid').addEventListener('click', e => {
    const btn = e.target.closest('.btn-add');
    if (!btn) return;
    const id = +btn.dataset.id;
    const p = PRODUCTS.find(p => p.id === id);
    if (!p) return;

    cart.add(id);
    cart._updateProductButtons();

    showToast(`✓ ${p.emoji} ${p.name} dodano u korpu`);
  });

  /* --- Cart open/close --- */
  const sidebar  = document.getElementById('cartSidebar');
  const overlay  = document.getElementById('cartOverlay');

  const openCart = () => {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    sidebar.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeCart = () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    sidebar.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);

  /* --- Cart item controls --- */
  document.getElementById('cartItems').addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = +btn.dataset.id;
    const action = btn.dataset.action;
    const item = cart.items.find(i => i.id === id);

    if (action === 'inc')    cart.setQty(id, (item?.qty || 0) + 1);
    if (action === 'dec')    cart.setQty(id, (item?.qty || 1) - 1);
    if (action === 'remove') { cart.remove(id); showToast('Stavka uklonjena iz korpe'); }

    cart._updateProductButtons();
  });

  /* --- Clear cart --- */
  document.getElementById('clearCartBtn')?.addEventListener('click', () => {
    if (confirm('Isprazni cijelu korpu?')) {
      cart.clear();
      showToast('Korpa je ispražnjena');
    }
  });

  /* --- Checkout --- */
  document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    const t = cart.total().toFixed(2);
    alert(`Hvala na narudžbi! 🎉\n\nUkupno: ${t} KM\n\nKontaktiraćemo vas uskoro radi dostave.\n\n📞 +387 65 123-456`);
    cart.clear();
    closeCart();
    showToast('🎉 Narudžba uspješno poslata!');
  });

  /* --- Footer category links --- */
  document.querySelectorAll('[data-filter]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const cat = a.dataset.filter;
      document.querySelectorAll('.filter-tab').forEach(b => {
        const match = b.dataset.cat === cat;
        b.classList.toggle('active', match);
        b.setAttribute('aria-selected', String(match));
      });
      renderProducts(cat);
      const section = document.getElementById('katalog');
      if (section) {
        const y = section.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  /* --- Cyrillic toggle --- */
  document.getElementById('scriptToggle')?.addEventListener('click', () => {
    cyrillicMode = !cyrillicMode;
    applyScript(cyrillicMode);
  });

  /* --- Intersection observer for fade-in --- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.stat-card, .o-nama-text-col, .contact-card, .map-wrapper').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});
