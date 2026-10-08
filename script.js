/* script.js — كود الموقع كله (الرئيسية + المتجر + السلة والدفع + التتبع + Firebase) */
/* ================================================================
   1) الصفحة الرئيسية: الأقسام والمنتجات والسلايدر
   ============================================================ */

/* ---------- دالة بترجّع مربع "مكان صورة" لو الصورة مش موجودة ---------- */
function phBox(label) {
  const d = document.createElement('div');
  d.className = 'ph';
  d.textContent = label || 'صورة';
  return d;
}
function imgTag(src, label) {
  return `<img src="${src}" alt="" onerror="this.replaceWith(phBox('${label}'))">`;
}

/* ---------- البيانات الافتراضية (لو Firebase مش شغال) ---------- */
const banners = [
  'images/banners/banner-1.jpg',
  'images/banners/banner-2.jpg',
  'images/banners/banner-3.jpg'
];

const categories = [
  { name: 'حلويات مصرية', img: 'images/categories/1.jpg' },
  { name: 'حلويات غربية', img: 'images/categories/2.jpg' },
  { name: 'ميكس سويت',    img: 'images/categories/3.jpg' },
  { name: 'مخبوزات',      img: 'images/categories/4.jpg' },
  { name: 'شيكولاته',     img: 'images/categories/5.jpg' },
  { name: 'كحك 2026',     img: 'images/categories/6.jpg' },
  { name: 'المولد 2026',  img: 'images/categories/7.jpg' },
  { name: 'آيس كريم',     img: 'images/categories/8.jpg' }
];

const sections = [
  { title: 'الأكثر رواجًا', en: 'Best Sellers', items: [
    { name: 'بسبوسة سادة (1/4 كيلو)', en: 'Plain Basbousa (1/4 kg)',  cat: 'حلويات مصرية', sub: 'بسبوسه',   price: 50,   rating: 3, reviews: 1, img: 'images/products/1.jpg' },
    { name: 'عيون سادة (1/4 كيلو)',   en: 'Plain Oyoun (1/4 kg)',     cat: 'حلويات مصرية', sub: 'مكس شرقي', price: 60,   rating: 3, reviews: 1, img: 'images/products/2.jpg' },
    { name: 'كنافة كريمة (1/4 كيلو)', en: 'Cream Kunafa (1/4 kg)',    cat: 'حلويات مصرية', sub: 'كنافه',    price: 62.5, rating: 2, reviews: 1, stock: 8,  img: 'images/products/3.jpg' },
    { name: 'بسبوسة بندق (1/4 كيلو)', en: 'Hazelnut Basbousa (1/4 kg)', cat: 'حلويات مصرية', sub: 'بسبوسه', price: 70,   rating: 3, reviews: 1, img: 'images/products/4.jpg' },
    { name: 'بلح الشام (1/4 كيلو)',   en: 'Balah El Sham (1/4 kg)',   cat: 'حلويات مصرية', sub: 'مكس شرقي', price: 47.5, rating: 3, reviews: 1, stock: 10, img: 'images/products/5.jpg' }
  ]},
  { title: 'المنتجات الجديده', en: 'New Products', items: [
    { name: 'جلاش بالمكسرات (1/4 كيلو)', en: 'Nuts Goulash (1/4 kg)', cat: 'حلويات مصرية', sub: 'جلاش',     price: 75,  rating: 4, reviews: 2, img: 'images/products/6.jpg' },
    { name: 'خبز الحبة الكاملة',         en: 'Whole Grain Bread',     cat: 'مخبوزات',      sub: 'خبز',      price: 45,  rating: 4, reviews: 3, img: 'images/products/7.jpg' },
    { name: 'تشيز كيك التوت',            en: 'Berry Cheesecake',      cat: 'حلويات غربية', sub: 'تشيز كيك', price: 95,  rating: 5, reviews: 4, img: 'images/products/8.jpg' },
    { name: 'بوكس شيكولاته فاخر',        en: 'Premium Chocolate Box', cat: 'شيكولاته',     sub: 'بوكس',     price: 210, rating: 4, reviews: 2, stock: 5, img: 'images/products/9.jpg' },
    { name: 'كرواسون بالزبدة',           en: 'Butter Croissant',      cat: 'مخبوزات',      sub: 'كرواسون',  price: 40,  rating: 3, reviews: 1, img: 'images/products/10.jpg' }
  ]},
  { title: 'تشكيلة مميزة', en: 'Featured Selection', carousel: true,
    items: [
    { name: 'آيس كريم مانجو (نص لتر)', en: 'Mango Ice Cream (half liter)', cat: 'آيس كريم',     sub: 'نص لتر',    price: 85,  rating: 0, reviews: 0, img: 'images/products/11.jpg' },
    { name: 'كب كيك (علبة ٦ قطع)',     en: 'Cupcakes (box of 6)',          cat: 'حلويات غربية', sub: 'كب كيك',    price: 110, rating: 0, reviews: 0, img: 'images/products/12.jpg' },
    { name: 'دونات مشكل (علبة ٦ قطع)', en: 'Assorted Donuts (box of 6)',   cat: 'حلويات غربية', sub: 'دونات',     price: 130, rating: 0, reviews: 0, img: 'images/products/13.jpg' },
    { name: 'تارت فواكه',              en: 'Fruit Tart',                   cat: 'حلويات غربية', sub: 'تارت',      price: 140, rating: 0, reviews: 0, img: 'images/products/14.jpg' },
    { name: 'حلقوم وملبن (علبة هدايا)', en: 'Turkish Delight (gift box)',  cat: 'ميكس سويت',    sub: 'علب هدايا', price: 75,  rating: 0, reviews: 0, img: 'images/products/15.jpg' },
    { name: 'تورتة شيكولاته (وسط)',    en: 'Chocolate Cake (medium)',      cat: 'حلويات غربية', sub: 'تورتات',    price: 350, rating: 0, reviews: 0, stock: 3, img: 'images/products/16.jpg' }
  ]}
];

const menu = [
  { name: 'الخصومات',     subs: ['عروض اليوم', 'عروض الأسبوع'] },
  { name: 'مطعم',         subs: ['وجبات', 'سلطات', 'مشروبات'] },
  { name: 'حلويات مصرية', subs: ['بسبوسه', 'علب مشكل', 'مكس شرقي', 'جلاش', 'اطباق', 'كنافه', 'علب شرقي جاهزة'] },
  { name: 'حلويات غربية', subs: ['تشيز كيك', 'كب كيك', 'دونات', 'تارت', 'تورتات'] },
  { name: 'ميكس سويت',    subs: ['علب هدايا', 'ملبن'] },
  { name: 'مخبوزات',      subs: ['خبز', 'كرواسون', 'بسكوت'] },
  { name: 'شيكولاته',     subs: ['بوكس', 'ألواح'] },
  { name: 'كحك 2026',     subs: ['كحك سادة', 'كحك بالعجمية', 'كحك محشي'] },
  { name: 'المولد 2026',  subs: ['حلاوة المولد', 'علب المولد', 'عروسة المولد'] },
  { name: 'آيس كريم',     subs: ['نص لتر', 'كوب', 'عبوات عائلية'] }
];

/* ---------- بيانات Firebase ----------
   لو Firebase اشتغل: الموقع بيعرض اللي في قاعدة البيانات بس (حتى لو فاضية).
   لو مردش أو القواعد مش منشورة: بيشتغل بالبيانات الافتراضية اللي فوق. */
sections.forEach(s => s.items.forEach(p => { p.id = p.id || p.img; }));
window.EXTRA_EN = {};
(function (R) {
  if (!R) return;
  const cfg = R.settings || {};
  const live = R.prods.filter(p => p.active !== false);
  live.forEach(p => { p.en = p.en || p.name; p.rating = p.rating || 0; p.reviews = p.reviews || 0; });
  sections.forEach(s => { s.items = live.filter(p => p.section === s.title); });
  sections.push({ title: 'أخرى', en: 'Other', hidden: true, items: live.filter(p => !sections.some(s => s.title === p.section)) });
  menu.length = 0; categories.length = 0;
  R.cats.forEach(c => {
    menu.push({ name: c.name, subs: c.subs || [] });
    if (c.circle && c.img) categories.push({ name: c.name, img: c.img });
    if (c.en) EXTRA_EN[c.name] = c.en;
    (c.subs || []).forEach((x, i) => { if (c.subsEn && c.subsEn[i]) EXTRA_EN[x] = c.subsEn[i]; });
  });
  banners.length = 0; banners.push(...(cfg.banners || []));
  if (!banners.length) document.getElementById('slider').parentElement.style.display = 'none';
  const pr = cfg.promos || {}, els = document.querySelectorAll('.promos .promo');
  [pr.p1, pr.p2].forEach((u, i) => { if (!els[i]) return; if (u) els[i].innerHTML = imgTag(u, 'بانر إعلاني ' + (i + 1)); else els[i].style.display = 'none'; });
  // اللوجو بيتتحكم فيه من لوحة التحكم: '' = الافتراضي | 'none' = مخفي | صورة = يظهر مكانها
  window.LOGO = cfg.logo || '';
  applyLogo();
})(window.REMOTE);

function applyLogo() {
  const L = window.LOGO || '';
  const head = document.getElementById('logoLink');
  const foot = document.querySelector('.foot-brand img');
  if (L === 'none') {
    if (head) head.style.display = 'none';
    if (foot) foot.style.display = 'none';
  } else if (L) {
    const img = head && head.querySelector('img');
    if (img) { img.onerror = null; img.src = L; }
    if (foot) { foot.onerror = null; foot.src = L; foot.style.display = ''; }
  }
}

document.getElementById('navList').innerHTML = menu.map(m => `
  <li class="has-drop">
    <a href="#" data-nf>${m.name}</a>
    <ul class="drop">
      <li><a href="#" data-nf data-go="${m.name}" class="all">عرض الكل</a></li>
      ${m.subs.map(x => `<li><a href="#" data-nf>${x}</a></li>`).join('')}
    </ul>
  </li>`).join('');

/* ============================================================
   2) رسم الصفحة الرئيسية
   ============================================================ */
const HEART = '<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';

// بادج "جديد" = المنتج متسجل خلال 30 يوم / بادج "خصم" = فيه سعر قديم من صفحة العروض
const isNewP = (p) => {
  if (p.isNew) return true;
  try { return !!(p.createdAt && p.createdAt.toDate && (Date.now() - p.createdAt.toDate().getTime() < 30 * 864e5)); }
  catch { return false; }
};
const offPct = (p) => (p.oldPrice && p.oldPrice > p.price) ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

// كارت منتج: icon=true يظهر زرار سلة مربع صغير (صفحة القسم / منتجات مشابهة)
function productCard(p, icon) {
  const favs = JSON.parse(localStorage.getItem('hm_favs') || '[]');
  const stars = `<span class="stars"><b>${'★'.repeat(p.rating)}</b>${'★'.repeat(5 - p.rating)}</span>`;
  const stock = p.stock === 0 ? `<span class="stock low">نفد المخزون</span>` : (p.stock && p.stock <= 10) ? `<span class="stock low">تبقى فقط ${p.stock}</span>` : `<span class="stock">متوفر في المخزون</span>`;
  const off = offPct(p), isNew = isNewP(p);
  const badges = (off ? `<span class="b-off">خصم ${off}%</span>` : '') + (isNew ? `<span class="b-new">جديد</span>` : '');
  const priceHtml = `<span class="price">${p.price} ج.م${off ? ` <s>${p.oldPrice} ج.م</s>` : ''}</span>`;
  const btn = `<button class="add ${icon ? 'icb' : ''}" type="button" ${p.stock === 0 ? 'disabled' : ''} aria-label="اضف الي عربة">`
    + (icon ? `<svg class="ic"><use href="#i-basket"/></svg>` : `<svg class="ic"><use href="#i-basket"/></svg>اضف الي عربة`) + `</button>`;
  return `
    <article class="card" data-id="${p.id}">
      <div class="card-img">
        ${badges ? `<div class="card-badges">${badges}</div>` : ''}
        <button class="heart ${favs.includes(p.id) ? 'on' : ''}" type="button" aria-label="Favorite">${HEART}</button>
        ${imgTag(p.img, 'صورة المنتج')}
      </div>
      <div class="card-body">
        <h3>${p.name}</h3>
        ${p.sub ? `<small class="csub">${p.sub}</small>` : ''}
        <div class="rate">${stars}<span class="rcount">(${p.reviews})</span></div>
        ${stock}
        ${icon ? `<div class="prow2">${priceHtml}${btn}</div>` : priceHtml + btn}
      </div>
    </article>`;
}

// الأقسام الدائرية
document.getElementById('cats').innerHTML = categories.map(c => `
  <a href="#" data-nf class="cat">
    <div class="cat-img">${imgTag(c.img, c.name)}</div>${c.name}
  </a>`).join('');

function sectionHTML(s) {
  if (s.hidden || !s.items.length) return '';
  const title = `<div class="sec-title"><i class="dot"></i><h2>${s.title}</h2><i class="line"></i></div>`;
  const cards = s.items.map(productCard).join('');
  if (!s.carousel) return `<section class="psec"><div class="container">${title}<div class="grid">${cards}</div></div></section>`;
  return `<section class="psec"><div class="container">${title}
    <div class="car-row">
      <div class="car">
        <button class="car-btn prev" type="button" aria-label="Previous"><svg class="ic"><use href="#i-left"/></svg></button>
        <div class="grid">${cards}</div>
        <button class="car-btn next" type="button" aria-label="Next"><svg class="ic"><use href="#i-right"/></svg></button>
      </div>
    </div></div></section>`;
}
document.getElementById('productSections').innerHTML = sections.map(sectionHTML).join('');

/* ============================================================
   3) السلايدر
   ============================================================ */
const slidesEl = document.getElementById('slides');
const dotsEl = document.getElementById('dots');
let current = 0, timer;

slidesEl.innerHTML = banners.map((src, i) =>
  `<div class="slide">${imgTag(src, 'مكان صورة البانر ' + (i + 1))}</div>`).join('');
dotsEl.innerHTML = banners.map((_, i) => `<i data-i="${i}"></i>`).join('');

function goTo(i) {
  current = (i + banners.length) % banners.length;
  slidesEl.style.transform = `translateX(${-current * 100}%)`;
  [...dotsEl.children].forEach((d, k) => d.classList.toggle('on', k === current));
}
function autoplay() { clearInterval(timer); timer = setInterval(() => goTo(current + 1), 5000); }

document.getElementById('nextBtn').onclick = () => { goTo(current + 1); autoplay(); };
document.getElementById('prevBtn').onclick = () => { goTo(current - 1); autoplay(); };
dotsEl.onclick = (e) => { if (e.target.dataset.i) { goTo(+e.target.dataset.i); autoplay(); } };
goTo(0); autoplay();

/* ============================================================
   4) Not Found + الكوكيز + قائمة الموبايل
   ============================================================ */
const home = document.getElementById('home');
const notFound = document.getElementById('notfound');

function showNotFound() { home.hidden = true; notFound.hidden = false; window.scrollTo(0, 0); }
function showHome()     { notFound.hidden = true; home.hidden = false; window.scrollTo(0, 0); }

document.addEventListener('click', (e) => {
  if (e.target.closest('[data-nf]')) { e.preventDefault(); showNotFound(); }
});
document.getElementById('backHome').addEventListener('click', (e) => { e.preventDefault(); showHome(); });
document.getElementById('logoLink').addEventListener('click', (e) => { e.preventDefault(); showHome(); });

['allowCk', 'denyCk'].forEach(id =>
  document.getElementById(id).addEventListener('click', () =>
    document.getElementById('cookies').classList.add('hide')));

const navEl = document.querySelector('.nav');
const overlay = document.getElementById('overlay');
const isMobile = () => window.innerWidth <= 900;
function toggleMenu(open) { navEl.classList.toggle('open', open); overlay.classList.toggle('show', open); }
document.getElementById('burger').addEventListener('click', () => toggleMenu(!navEl.classList.contains('open')));
overlay.addEventListener('click', () => toggleMenu(false));
navEl.addEventListener('click', (e) => { if (e.target.closest('a') && isMobile()) toggleMenu(false); });
let touchX = null;
slidesEl.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
slidesEl.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) { goTo(current + (dx < 0 ? 1 : -1)); autoplay(); }
  touchX = null;
});


/* ================================================================
   المتجر: الحسابات + السلة والدفع + تتبع الطلب + صفحة المنتج + القسم
   ================================================================ */
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const allProducts = sections.flatMap(s => s.items);
const byId = (id) => allProducts.find(p => p.id === id);
let cartData = load('hm_cart', {});
let user = load('hm_user', null);
let afterAuth = null;
let detailQty = 1;

/* ---------- النوافذ ---------- */
const modalEl = $('#modal');
function openModal(html, drawer) {
  modalEl.innerHTML = `<div class="m-box ${drawer ? 'sm' : ''}"><button class="m-x" data-act="close" aria-label="إغلاق">×</button>${html}</div>`;
  modalEl.classList.toggle('drawer', !!drawer);
  modalEl.hidden = false; document.body.style.overflow = 'hidden';
}
function closeModal() { modalEl.hidden = true; modalEl.innerHTML = ''; document.body.style.overflow = ''; }
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.hidden = false;
  clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, 2500);
}
const thumb = (p) => imgTag(p.img, 'صورة');

/* ---------- حسابات السلة ---------- */
const FEE = 35;                                        // رسوم التوصيل للمنزل
const PROMOS = { 'MALEK15': 15, 'HELW10': 10 };        // أكواد الخصم: الكود = نسبة %
let ckDeliver = 'home';                                // توصيل للمنزل أو استلام من الفرع
let ckPromo = { code: '', pct: 0 };

const cartRows = () => Object.entries(cartData).filter(([id]) => byId(id));
const cartCount = () => Object.values(cartData).reduce((a, b) => a + b, 0);
const cartSub = () => cartRows().reduce((s, [id, q]) => s + byId(id).price * q, 0);
const cartDisc = () => cartRows().reduce((s, [id, q]) => s + ((byId(id).oldPrice || byId(id).price) - byId(id).price) * q, 0);
function ckTotals() {
  const sub = cartSub(), disc = cartDisc();
  const fee = ckDeliver === 'home' ? FEE : 0;
  const base = Math.max(0, sub - disc);
  const promoV = Math.round(base * ckPromo.pct / 100) || 0;
  return { n: cartCount(), sub, disc, fee, promoV, total: Math.max(0, base - promoV + fee) };
}
function saveCart() { save('hm_cart', cartData); $('#cartCount').textContent = cartCount(); }
function addToCart(id, n = 1) {
  const p = byId(id), have = cartData[id] || 0;
  if (p && p.stock != null && have + n > p.stock) return toast('الكمية المتاحة ' + p.stock + ' فقط');
  cartData[id] = have + n; saveCart(); toast('تمت الإضافة للسلة ✓');
}

/* ============================================================
   صفحة السلة والدفع (صفحة كاملة زي الصورة: سلة + توصيل + دفع + ملخص)
   ============================================================ */
const pageEl = $('#page');

function getCkVals() {
  const f = document.getElementById('ckForm');
  return f ? Object.fromEntries(new FormData(f)) : null;
}

function showCheckoutPage() {
  closeModal();
  home.hidden = true; notFound.hidden = true; pageEl.hidden = false;
  window.scrollTo(0, 0);
  if (!cartRows().length) {
    pageEl.innerHTML = `<div class="crumb"><a href="#" id="crumbHome">الرئيسية</a> / سلة المشتريات</div>
      <div class="card-ck ck-empty"><h2>سلة المشتريات</h2>
      <div class="empty">السلة فاضية — ضيف منتجات وارجع هنا.<br><br>
      <button class="ck-go" style="max-width:220px;margin:0 auto" data-ck="home">تسوق الآن</button></div></div>`;
    return;
  }
  if (!user) { pageEl.hidden = true; home.hidden = false; afterAuth = showCheckoutPage; return showAuth('login'); }
  ckPromo = { code: '', pct: 0 };
  renderCheckout();
}

function renderCheckout() {
  const pv = getCkVals() || {};
  if (pv.deliver) ckDeliver = pv.deliver;
  const t = ckTotals();
  const rows = cartRows().map(([id, q]) => {
    const p = byId(id);
    return `<div class="ck-row">
      <div class="t">${thumb(p)}</div>
      <div><b class="nm">${esc(p.name)}</b><small>${p.price} ج.م${p.sub ? ' — ' + esc(p.sub) : ''}</small></div>
      <div class="qty"><button type="button" data-ck="dec" data-id="${esc(id)}">−</button><b>${q}</b><button type="button" data-ck="inc" data-id="${esc(id)}">+</button></div>
      <span class="lt">${Math.round(p.price * q * 100) / 100} ج.م</span>
      <button class="del2" type="button" data-ck="del" data-id="${esc(id)}" aria-label="حذف">🗑</button>
    </div>`;
  }).join('');
  const bs = (window.BRANCHES || []);
  const brOpts = bs.length
    ? bs.map(b => `<option value="${esc(b.name)}" ${pv.branch === b.name ? 'selected' : ''}>${esc(b.name)}</option>`).join('')
    : '';
  const nm = pv.name ?? ((user.name && user.name !== 'عميل' && user.name) || '');
  const ph = pv.phone ?? (user.phone || '');

  pageEl.innerHTML = `
  <div class="crumb"><a href="#" id="crumbHome">الرئيسية</a> / سلة المشتريات</div>
  <div class="ck">
    <div class="ck-main">
      <div class="ck-steps"><i class="on">السلة</i><i class="on">بيانات التوصيل</i><i class="on">الدفع</i></div>
      <div class="card-ck">
        <div class="ck-h"><h2>سلة المشتريات <span>(${t.n})</span></h2><button type="button" data-ck="clear">إفراغ السلة</button></div>
        <div class="ck-rows">${rows}</div>
      </div>
      <div class="card-ck">
        <h2>بيانات التوصيل</h2>
        <form data-form="checkout" id="ckForm">
          <div class="ck-grid">
            <div><label>الاسم بالكامل *</label><input name="name" value="${esc(nm)}" required></div>
            <div><label>رقم الموبايل *</label><input name="phone" inputmode="tel" value="${esc(ph)}" required></div>
          </div>
          <label>الفرع *</label>
          <select name="branch" required>
            <option value="">اختر أقرب فرع لك</option>
            ${brOpts || '<option value="" disabled>لا توجد فروع — راجع الإدارة</option>'}
          </select>
          <label>العنوان بالتفصيل *</label>
          <textarea name="addr" rows="2" required>${esc(pv.addr || '')}</textarea>
          <label>ملاحظات إضافية (اختياري)</label>
          <input name="note" value="${esc(pv.note || '')}">
          <div class="del-opts">
            <label class="dopt ${ckDeliver === 'home' ? 'on' : ''}">
              <input type="radio" name="deliver" value="home" ${ckDeliver === 'home' ? 'checked' : ''}>
              <span>توصيل للمنزل<small>من 45 لـ 60 دقيقة — رسوم ${FEE} ج.م</small></span></label>
            <label class="dopt ${ckDeliver === 'pickup' ? 'on' : ''}">
              <input type="radio" name="deliver" value="pickup" ${ckDeliver === 'pickup' ? 'checked' : ''}>
              <span>استلام من الفرع<small>جاهز في 30 دقيقة — بدون رسوم</small></span></label>
          </div>
        </form>
      </div>
      <div class="card-ck">
        <h2>طريقة الدفع</h2>
        <div class="pay-opts">
          <label class="popt on"><input type="radio" name="pay" checked><span>كاش<small>الدفع عند الاستلام</small></span><span class="tick">✓</span></label>
          <label class="popt dis"><input type="radio" disabled><span>بطاقة بنكية<small>فيزا / ماستركارد</small></span></label>
          <label class="popt dis"><input type="radio" disabled><span>محفظة إلكترونية<small>فودافون كاش وغيرها</small></span></label>
        </div>
        <p class="pay-note">متاح حالياً الدفع كاش فقط</p>
      </div>
    </div>
    <aside class="ck-side">
      <div class="card-ck sum">
        <h2>ملخص الطلب</h2>
        <div class="li"><span>المجموع الفرعي (${t.n} منتج)</span><span>${t.sub} ج.م</span></div>
        ${t.disc ? `<div class="li"><span>خصم العروض</span><span class="green">−${t.disc} ج.م</span></div>` : ''}
        <div class="li"><span>رسوم التوصيل</span><span>${t.fee ? t.fee + ' ج.م' : 'مجاناً'}</span></div>
        ${t.promoV ? `<div class="li"><span>كود الخصم (${esc(ckPromo.code)})</span><span class="green">−${t.promoV} ج.م</span></div>` : ''}
        <div class="li tot"><span>الإجمالي</span><span id="ckTotal">${t.total} ج.م</span></div>
        <div class="promo-row"><input id="promoIn" placeholder="كود الخصم" value="${esc(ckPromo.code)}"><button type="button" data-ck="promo">تطبيق</button></div>
        <button class="ck-go" type="button" data-ck="place">تأكيد الطلب</button>
        <p class="safe">🔒 بياناتك محمية وآمنة</p>
      </div>
    </aside>
  </div>`;
  const sel = pageEl.querySelector('select[name=branch]');
  if (sel && pv.branch) sel.value = pv.branch;
}

/* أزرار السلة (كمية / حذف / إفراغ / كود خصم / تأكيد) */
pageEl.addEventListener('click', (e) => {
  const b = e.target.closest('[data-ck]'); if (!b) return;
  const act = b.dataset.ck, id = b.dataset.id;
  if (act === 'home') { showHome(); return; }
  if (act === 'inc' || act === 'dec' || act === 'del') {
    const p = byId(id);
    if (act === 'inc') {
      if (p && p.stock != null && cartData[id] >= p.stock) return toast('الكمية المتاحة ' + p.stock + ' فقط');
      cartData[id]++;
    }
    if (act === 'dec') { if (--cartData[id] <= 0) delete cartData[id]; }
    if (act === 'del') delete cartData[id];
    saveCart(); renderCheckout(); return;
  }
  if (act === 'clear') {
    if (!confirm('إفراغ السلة كلها؟')) return;
    cartData = {}; ckPromo = { code: '', pct: 0 }; saveCart(); renderCheckout(); return;
  }
  if (act === 'promo') {
    const code = ($('#promoIn').value || '').trim().toUpperCase();
    if (!code) return;
    if (PROMOS[code] == null) return toast('الكود ده مش صحيح');
    ckPromo = { code, pct: PROMOS[code] };
    toast('تم تطبيق خصم ' + PROMOS[code] + '% ✓');
    renderCheckout(); return;
  }
  if (act === 'place') {
    const f = document.getElementById('ckForm');
    if (!f) return;
    if (!f.branch.value) return toast('لازم تختار فرع الأول');
    f.requestSubmit();
  }
});
pageEl.addEventListener('change', (e) => {
  if (e.target.name === 'deliver') renderCheckout();
});

/* ============================================================
   تتبع الطلب (نافذة + خط زمني للحالات)
   ============================================================ */
function showTrack(no) {
  openModal(`<h2>تتبع الطلب</h2>
    <form data-form="track">
      <label>رقم الطلب</label>
      <div class="track-row"><input name="no" inputmode="numeric" placeholder="مثال: 102345" value="${esc(no || '')}" required>
      <button class="m-btn">تتبع طلبك</button></div>
    </form>
    <div id="trackRes"></div>`);
  if (no) doTrack(no);
}
async function doTrack(no) {
  const box = $('#trackRes'); if (!box) return;
  box.innerHTML = '<div class="empty">جاري البحث عن الطلب...</div>';
  try {
    const snap = await db.collection('orders').where('orderNo', '==', Number(no)).limit(1).get();
    if (snap.empty) { box.innerHTML = '<div class="empty">مفيش طلب بالرقم ده — تأكد من رقم الطلب.</div>'; return; }
    const o = snap.docs[0].data();
    const steps = ['جديدة', 'قيد التحضير', 'في الطريق', 'تم التسليم'];
    const idx = o.status === 'ملغي' ? -1 : Math.max(0, steps.indexOf(o.status));
    const tl = steps.map((s, k) => `<div class="tl-st ${k <= idx ? 'on' : ''}"><i>${k <= idx ? '✓' : k + 1}</i><span>${s}</span></div>`).join('');
    const items = (o.items || []).reduce((a, i) => a + i.qty, 0);
    box.innerHTML = `
      ${o.status === 'ملغي' ? '<div class="tl-note">الطلب ملغي — لو فيه استفسار كلمنا على 16312</div>' : ''}
      <div class="tl">${tl}</div>
      <div class="li" style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee;font-size:14px"><span>حالة الطلب</span><b>${esc(o.status)}</b></div>
      <div class="li" style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee;font-size:14px"><span>الفرع</span><b>${esc(o.branch || '—')}</b></div>
      <div class="li" style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee;font-size:14px"><span>المنتجات</span><b>${items} قطعة</b></div>
      <div class="li" style="display:flex;justify-content:space-between;padding:8px 0;font-size:14px"><span>الإجمالي</span><b>${o.total} ج.م</b></div>`;
  } catch { box.innerHTML = '<div class="empty">تعذّر الاتصال — حاول تاني.</div>'; }
}

/* ============================================================
   صفحة المنتج (معرض + بادجات + تابات + منتجات مشابهة)
   ============================================================ */
function showProduct(id) {
  const p = byId(id); if (!p) return;
  detailQty = 1; closeModal();
  const out = p.stock === 0;
  const off = offPct(p), isNew = isNewP(p);
  const stockHtml = out ? `<span class="pdp-stock out">نفد المخزون</span>`
    : (p.stock && p.stock <= 10) ? `<span class="pdp-stock low">تبقى فقط ${p.stock}</span>`
    : `<span class="pdp-stock">متوفر في المخزون</span>`;
  const rating = Math.max(0, Math.min(5, p.rating || 0));
  const stars = `<span class="stars"><b>${'★'.repeat(rating)}</b>${'★'.repeat(5 - rating)}</span>`;
  const rvTxt = p.reviews ? `(${p.reviews} تقييم)` : 'لا توجد تقييمات من العملاء';
  const weight = (p.name.match(/\(([^)]+)\)/) || [])[1] || '';
  const favs = load('hm_favs', []);
  const similar = allProducts.filter(x => x.id !== id && (x.sub === p.sub || x.cat === p.cat)).slice(0, 5);
  const badges = (off ? `<span class="b-off">خصم ${off}%</span>` : '') + (isNew ? `<span class="b-new">جديد</span>` : '');
  const sku = esc(String(p.id).slice(-6).toUpperCase());
  home.hidden = true; notFound.hidden = true; pageEl.hidden = false;
  pageEl.innerHTML = `
    <div class="crumb"><a href="#" id="crumbHome">الرئيسية</a> / <a href="#" data-nf>${esc(p.cat)}</a> / ${esc(p.name)}</div>
    <div class="pdp2">
      <div class="pgal">
        <div class="pgal-main">${badges ? `<div class="card-badges">${badges}</div>` : ''}${imgTag(p.img, 'صورة المنتج')}</div>
        <div class="pgal-thumbs">${[0, 1, 2, 3].map(i => `<i class="${i === 0 ? 'on' : ''}" data-src="${esc(p.img)}">${imgTag(p.img, 'صورة')}</i>`).join('')}</div>
      </div>
      <div class="pinfo card-ck">
        <h1>${esc(p.name)}</h1>
        <div class="prate">${stars} <span class="rcount">${rvTxt}</span></div>
        <div class="pprice"><b>${p.price} ج.م</b>${off ? `<s>${p.oldPrice} ج.م</s><em class="off-b">خصم ${off}%</em>` : ''}</div>
        ${weight ? `<div class="psize"><label>الحجم</label><span class="sz">${esc(weight)}</span></div>` : ''}
        <div class="prow">
          <div class="qty big"><button type="button" data-act="dminus" ${out ? 'disabled' : ''}>−</button><b id="dq">1</b><button type="button" data-act="dplus" data-id="${esc(id)}" ${out ? 'disabled' : ''}>+</button></div>
          <button class="pdp-add2" data-act="dadd" data-id="${esc(id)}" ${out ? 'disabled' : ''}>${out ? 'نفد المخزون' : '<svg class="ic"><use href="#i-basket"/></svg>أضف للسلة'}</button>
          <button class="pfav ${favs.includes(id) ? 'on' : ''}" type="button" data-act="dfav" data-id="${esc(id)}" aria-label="المفضلة">${HEART}</button>
        </div>
        <div class="pline">${stockHtml}</div>
        <div class="pline">🚚 التوصيل من 45 لـ 60 دقيقة</div>
        <div class="pline">🏷️ الرمز: ${sku}</div>
      </div>
    </div>
    <div class="ptabs card-ck">
      <div class="ptab-h">
        <button type="button" class="on">الوصف</button>
        <button type="button">المكونات</button>
        <button type="button">التقييمات</button>
      </div>
      <div class="ptab-b">
        <div>${esc(p.desc || 'منتج طازج بيحضّره الشيف بتاعنا يومياً بأجود المكونات، بيتم التحضير والتغليف بعناية عشان يوصلك في أحسن صورة.')}</div>
        <div hidden>مكونات طبيعية فاخرة مختارة بعناية. ممكن يحتوي على مكسرات أو منتجات ألبان — لو عندك حساسية اسأل الفرع قبل الطلب.</div>
        <div hidden><div class="prate">${stars} <span class="rcount">${rvTxt}</span></div><p style="color:#888">لسه مفيش تقييمات مكتوبة على المنتج ده.</p></div>
      </div>
    </div>
    ${similar.length ? `<div class="sec-title"><i class="dot"></i><h2>منتجات مشابهة</h2><i class="line"></i></div>
      <div class="grid pg-sim">${similar.map(x => productCard(x, true)).join('')}</div>` : ''}
  `;
  window.scrollTo(0, 0);
}

/* التابات + صور المعرض في صفحة المنتج */
pageEl.addEventListener('click', (e) => {
  const tb = e.target.closest('.ptab-h button');
  if (tb) {
    const h = tb.parentElement, b = h.nextElementSibling;
    [...h.children].forEach((x, i) => { x.classList.toggle('on', x === tb); b.children[i].hidden = x !== tb; });
    return;
  }
  const th = e.target.closest('.pgal-thumbs i');
  if (th) {
    const main = pageEl.querySelector('.pgal-main img, .pgal-main .ph');
    th.parentElement.querySelectorAll('i').forEach(x => x.classList.toggle('on', x === th));
    if (main && main.tagName === 'IMG') { main.onerror = null; main.src = th.dataset.src; }
  }
});

/* ============================================================
   صفحة القسم: فلاتر + ترتيب + ترقيم صفحات
   ============================================================ */
let catState = null;
const PER_PAGE = 8;

function showCategory(title, list, emptyMsg) {
  catState = { title, q: list, emptyMsg, subs: new Set(), only: 'all', sort: 'top', page: 1, min: 0, max: 0 };
  const prices = list.map(p => p.price).filter(n => n > 0);
  catState.rmin = prices.length ? Math.max(0, Math.floor(Math.min(...prices))) : 0;
  catState.rmax = prices.length ? Math.ceil(Math.max(...prices)) : 1000;
  catState.min = catState.rmin; catState.max = catState.rmax;
  home.hidden = true; notFound.hidden = true; pageEl.hidden = false;
  window.scrollTo(0, 0);
  renderCategory();
}

function renderCategory() {
  const st = catState; if (!st) return;
  const subs = [...new Set(st.q.map(p => p.sub).filter(Boolean))];
  let list = st.q.filter(p =>
    (!st.subs.size || st.subs.has(p.sub)) &&
    p.price >= st.min && p.price <= st.max &&
    (st.only === 'all' || (st.only === 'in' && p.stock !== 0) || (st.only === 'off' && p.oldPrice))
  );
  if (st.sort === 'new') list = [...list].sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
  else if (st.sort === 'plow') list = [...list].sort((a, b) => a.price - b.price);
  else if (st.sort === 'phigh') list = [...list].sort((a, b) => b.price - a.price);
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  st.page = Math.min(st.page, pages);
  const view = list.slice((st.page - 1) * PER_PAGE, st.page * PER_PAGE);
  const pg = pages > 1 ? `<div class="pager">
      <button type="button" data-pg="${st.page - 1}" ${st.page === 1 ? 'disabled' : ''}>‹</button>
      ${Array.from({ length: pages }, (_, i) => `<button type="button" class="${i + 1 === st.page ? 'on' : ''}" data-pg="${i + 1}">${i + 1}</button>`).join('')}
      <button type="button" data-pg="${st.page + 1}" ${st.page === pages ? 'disabled' : ''}>›</button>
    </div>` : '';

  pageEl.innerHTML = `
  <div class="crumb"><a href="#" id="crumbHome">الرئيسية</a> / ${esc(st.title)}</div>
  <div class="cpg-head">
    <h1 class="pg-title">${esc(st.title)} <small>${list.length} منتج</small></h1>
    <label class="sortb">ترتيب حسب:
      <select id="cpgSort">
        <option value="top" ${st.sort === 'top' ? 'selected' : ''}>الأكثر طلباً</option>
        <option value="new" ${st.sort === 'new' ? 'selected' : ''}>الأحدث</option>
        <option value="plow" ${st.sort === 'plow' ? 'selected' : ''}>السعر: من الأقل للأعلى</option>
        <option value="phigh" ${st.sort === 'phigh' ? 'selected' : ''}>السعر: من الأعلى للأقل</option>
      </select>
    </label>
  </div>
  <div class="cpg-body">
    <aside class="cpg-side card-ck">
      <h3>التصنيف</h3>
      ${subs.length ? subs.map(s => `<label class="fchk"><input type="checkbox" data-sub="${esc(s)}" ${st.subs.has(s) ? 'checked' : ''}><span>${esc(s)}</span><em>${st.q.filter(p => p.sub === s).length}</em></label>`).join('') : '<p style="color:#999;font-size:13px">مفيش أقسام فرعية</p>'}
      <h3>السعر</h3>
      <div class="range-vals"><span>من <b id="rvMin">${st.min}</b> ج.م</span><span>إلى <b id="rvMax">${st.max}</b> ج.م</span></div>
      <div class="dual"><span class="fill" id="rFill"></span>
        <input type="range" id="rMin" min="${st.rmin}" max="${st.rmax}" value="${st.min}">
        <input type="range" id="rMax" min="${st.rmin}" max="${st.rmax}" value="${st.max}">
      </div>
      <h3>المنتج</h3>
      <label class="frad"><input type="radio" name="cpgOnly" value="all" ${st.only === 'all' ? 'checked' : ''}><span>الكل</span><em>${st.q.length}</em></label>
      <label class="frad"><input type="radio" name="cpgOnly" value="in" ${st.only === 'in' ? 'checked' : ''}><span>متوفر</span><em>${st.q.filter(p => p.stock !== 0).length}</em></label>
      <label class="frad"><input type="radio" name="cpgOnly" value="off" ${st.only === 'off' ? 'checked' : ''}><span>عروض</span><em>${st.q.filter(p => p.oldPrice).length}</em></label>
      <button class="ck-go" type="button" data-cpg="apply">تطبيق الفلتر</button>
    </aside>
    <div>
      ${view.length ? `<div class="grid cpg-grid">${view.map(p => productCard(p, true)).join('')}</div>${pg}`
        : `<div class="empty">${esc(st.emptyMsg || 'مفيش منتجات بالمواصفات دي.')}</div>`}
    </div>
  </div>`;
  bindDual();
}

/* السلايدر المزدوج للسعر */
function bindDual() {
  const st = catState, mn = pageEl.querySelector('#rMin'), mx = pageEl.querySelector('#rMax');
  if (!mn || !mx) return;
  const upd = () => {
    let a = +mn.value, b = +mx.value;
    if (a > b) { const t = a; a = b; b = t; mn.value = a; mx.value = b; }
    st.min = a; st.max = b;
    const R = (st.rmax - st.rmin) || 1, f = pageEl.querySelector('#rFill');
    if (f) { f.style.insetInlineStart = ((a - st.rmin) / R * 100) + '%'; f.style.width = ((b - a) / R * 100) + '%'; }
    const v1 = pageEl.querySelector('#rvMin'), v2 = pageEl.querySelector('#rvMax');
    if (v1) v1.textContent = a; if (v2) v2.textContent = b;
  };
  mn.oninput = mx.oninput = upd; upd();
}

/* أحداث صفحة القسم: ترتيب / ترقيم / زر الفلتر */
pageEl.addEventListener('input', (e) => { if (e.target.id === 'cpgSort') { catState.sort = e.target.value; catState.page = 1; renderCategory(); } });
pageEl.addEventListener('click', (e) => {
  const pg = e.target.closest('[data-pg]');
  if (pg && !pg.disabled) { catState.page = +pg.dataset.pg; renderCategory(); window.scrollTo(0, 0); return; }
  if (e.target.closest('[data-cpg="apply"]') && catState) {
    catState.subs = new Set([...pageEl.querySelectorAll('.fchk input:checked')].map(i => i.dataset.sub));
    const r = pageEl.querySelector('.frad input:checked');
    if (r) catState.only = r.value;
    catState.page = 1; renderCategory();
  }
});

/* ============================================================
   تسجيل / دخول / حساب — بالرقم وكلمة المرور بس
   ============================================================ */
const EYE = '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 5C7 5 2.7 8.1 1 12c1.7 3.9 6 7 11 7s9.3-3.1 11-7c-1.7-3.9-6-7-11-7zm0 11.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm0-7a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"/></svg>';
function showAuth(tab = 'login') {
  const reg = tab === 'register';
  openModal(`<h2>${reg ? 'أهلاً بك' : 'مرحبا بعودتك'}</h2>
    <p class="dr-sub">${reg ? 'أنشئ حسابك برقم الموبايل لإتمام طلباتك بسهولة' : 'قم بتسجيل الدخول برقم الموبايل للاستمتاع بتجربتك'}</p>
    <form data-form="${tab}">
      <label>رقم الموبايل</label><input name="phone" inputmode="tel" placeholder="01XXXXXXXXX" autocomplete="username" required>
      <label>كلمة المرور</label>
      <div class="pass-wrap"><input name="pass" type="password" autocomplete="${reg ? 'new-password' : 'current-password'}" minlength="6" required>
        <button type="button" class="eye" data-act="eye" aria-label="إظهار كلمة المرور">${EYE}</button></div>
      ${reg ? '' : '<a href="#" class="dr-link" data-act="forgot">نسيت كلمة المرور ؟</a>'}
      <div class="err" id="err"></div>
      <button class="m-btn" disabled>${reg ? 'إنشاء الحساب' : 'تسجيل دخول'}</button></form>
    <p class="dr-foot">${reg ? 'لديك حساب بالفعل ؟' : 'ليس لديك حساب ؟'} <a href="#" class="dr-link" data-act="${reg ? 'tlogin' : 'treg'}">${reg ? 'تسجيل دخول' : 'انشاء حساب'}</a></p>`, true);
}
function showAccount() {
  openModal(`<h2>أهلاً ${esc(user.name || '')}</h2><p dir="ltr">${esc(user.phone || '')}</p>
    <h3 style="margin:14px 0 6px">طلباتي</h3><div id="myOrders" class="empty">...</div>
    <button class="m-btn ghost" data-act="logout">تسجيل خروج</button>`, true);
  try {
    db.collection('orders').where('uid', '==', user.uid).get().then((snap) => {
      const list = snap.docs.map(d => d.data()).sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      const box = $('#myOrders'); if (!box) return;
      box.className = '';
      box.innerHTML = list.length
        ? list.map(o => `<div class="sr"><div>طلب #${o.orderNo}<small style="display:block;color:#888">${esc(o.status)} — ${o.total} ج.م</small></div>
            <button class="m-btn ghost" style="width:auto;margin:0;padding:6px 16px" data-act="track" data-no="${o.orderNo}">تتبع</button></div>`).join('')
        : '<div class="empty">لسه معندكش طلبات.</div>';
    }).catch(() => { const b = $('#myOrders'); if (b) b.textContent = 'تعذّر تحميل الطلبات'; });
  } catch { const b = $('#myOrders'); if (b) b.textContent = 'تعذّر تحميل الطلبات'; }
}
function renderUser() {
  $('#loginTxt').textContent = user ? (user.name && user.name !== 'عميل' ? user.name : 'حسابي') : 'تسجيل دخول';
  $('#registerLink').hidden = !!user;                    // مسجل دخول؟ زرار إنشاء حساب بيختفي
}

/* ---------- الأوامر (data-act) ---------- */
const actions = {
  close: closeModal,
  prod: (el) => showProduct(el.dataset.id),
  track: (el) => showTrack(el.dataset.no),
  dplus: (el) => {
    const p = byId(el.dataset.id);
    if (p && p.stock != null && detailQty >= p.stock) return toast('الكمية المتاحة ' + p.stock + ' فقط');
    $('#dq').textContent = ++detailQty;
  },
  dminus: () => { if (detailQty > 1) $('#dq').textContent = --detailQty; },
  dadd: (el) => addToCart(el.dataset.id, detailQty),
  dfav: (el) => {
    const favs = load('hm_favs', []), id = el.dataset.id, i = favs.indexOf(id);
    i < 0 ? favs.push(id) : favs.splice(i, 1); save('hm_favs', favs); el.classList.toggle('on', i < 0);
    toast(i < 0 ? 'أضفناه للمفضلة ✓' : 'شيلناه من المفضلة');
  },
  eye: (el) => { const i = el.parentElement.querySelector('input'); i.type = i.type === 'password' ? 'text' : 'password'; },
  forgot: () => { const e = $('#err'); e.className = 'err'; e.textContent = 'لاستعادة كلمة المرور اتصل بنا على 16312'; },
  tlogin: () => showAuth('login'),
  treg: () => showAuth('register'),
  logout: async () => { await auth.signOut(); closeModal(); toast('تم تسجيل الخروج'); }
};
modalEl.addEventListener('click', (e) => {
  if (e.target === modalEl) return closeModal();
  const a = e.target.closest('[data-act]'); if (a) { e.preventDefault(); actions[a.dataset.act]?.(a); }
});
modalEl.addEventListener('input', (e) => {
  const f = e.target.closest('form[data-form="login"], form[data-form="register"]'); if (!f) return;
  const b = f.querySelector('button.m-btn'); if (b) b.disabled = ![...f.querySelectorAll('input[required]')].every(i => i.value.trim());
});

/* ---------- ربط الصفحة ---------- */
$('#loginLink').onclick = (e) => { e.preventDefault(); user ? showAccount() : showAuth('login'); };
$('#registerLink').onclick = (e) => { e.preventDefault(); showAuth('register'); };
$('#cartLink').onclick = (e) => { e.preventDefault(); showCheckoutPage(); };
$('#trackLink').onclick = (e) => { e.preventDefault(); showTrack(); };
$('#searchBtn').onclick = doSearch;
$('#searchInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') doSearch(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// ضغطة على الكارت تفتح صفحة المنتج، وعلى "أضف للسلة" تضيف مباشرة
document.addEventListener('click', (e) => {
  const card = e.target.closest('.card'); if (!card) return;
  const heart = e.target.closest('.heart');
  if (heart) {
    const favs = load('hm_favs', []), id = card.dataset.id, i = favs.indexOf(id);
    i < 0 ? favs.push(id) : favs.splice(i, 1); save('hm_favs', favs); heart.classList.toggle('on', i < 0);
    return;
  }
  e.target.closest('.add') ? addToCart(card.dataset.id) : showProduct(card.dataset.id);
});

saveCart(); renderUser();

/* ============================================================
   الصفحات التعريفية + الراوتر
   ============================================================ */
showHome = function () { pageEl.hidden = true; notFound.hidden = true; home.hidden = false; window.scrollTo(0, 0); };

const infoPages = {
  'من نحن': '<p>حلو الملك بيقدّم أفضل الحلويات الشرقية والغربية والمخبوزات بأجود المكونات، وبنهتم بالطعم والجودة في كل منتج.</p>',
  'الفروع': '<h3>فرع مكرم عبيد</h3><p>مدينة نصر، القاهرة<br>اتصل بنا: 16312</p>',
  'وظائف': '<p>عايز تشتغل معانا؟ ابعتلنا بياناتك من صفحة "اتصل بنا" وهنراجعها.</p>',
  'الشروط والأحكام': '<p>بإتمامك الطلب فإنت بتوافق على بيانات التوصيل والأسعار المعروضة وقت الطلب. الأسعار قابلة للتغيير. لو في مشكلة في الطلب كلمنا خلال 24 ساعة من الاستلام.</p>',
  'سياسة الخصوصية': '<p>بنستخدم بياناتك (الاسم والموبايل والعنوان) لتوصيل طلبك والتواصل معاك بس، ومش بنشاركها مع أي جهة تانية.</p>'
};

function showPage(title, body) {
  home.hidden = true; notFound.hidden = true; pageEl.hidden = false;
  pageEl.innerHTML = `<div class="crumb"><a href="#" id="crumbHome">الرئيسية</a> / ${esc(title)}</div><h1 class="pg-title">${esc(title)}</h1>${body}`;
  window.scrollTo(0, 0);
}

function contactForm() {
  return `<div class="info"><p>اتصل بنا: 16312</p>
    <form data-form="contact"><label>الاسم</label><input name="name" required>
    <label>الموبايل</label><input name="phone" required>
    <label>رسالتك</label><textarea name="msg" rows="3" required></textarea>
    <button class="m-btn">إرسال</button></form></div>`;
}

// 🧭 الراوتر: كل الأقسام والأقسام الفرعية بتفتح صفحة القسم بالفلاتر
function route(label, el) {
  if (label === 'اتصل بنا') return showPage(label, contactForm());
  if (infoPages[label]) return showPage(label, `<div class="info">${infoPages[label]}</div>`);
  if (label === 'عرض الكل') {
    const t = el.closest('section').querySelector('h2').textContent;
    return showCategory(t, sections.find(s => s.title === t).items);
  }
  if (!label) return showCategory('كل المنتجات', allProducts);
  if (allProducts.some(p => p.sub === label) || ['علب مشكل', 'اطباق', 'علب شرقي جاهزة'].includes(label))
    return showCategory(label, allProducts.filter(p => p.sub === label));
  if (label === 'الخصومات' || label === 'عروض اليوم' || label === 'عروض الأسبوع')
    return showCategory('العروض', allProducts.filter(p => p.oldPrice && p.oldPrice > p.price), 'مفيش عروض متاحة دلوقتي — تابعنا قريباً.');
  showCategory(label, allProducts.filter(p => p.cat === label));
}

// قفل قوايم القائمة + التقاط الضغط قبل ما يفتح 404
const closeDrops = () => document.querySelectorAll('.has-drop.open').forEach(l => l.classList.remove('open'));
document.addEventListener('click', (e) => { if (!e.target.closest('.has-drop')) closeDrops(); });
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-nf]'); if (!el) return;
  e.preventDefault(); e.stopImmediatePropagation();
  const li = el.parentElement;
  if (li.classList && li.classList.contains('has-drop')) {
    const was = li.classList.contains('open'); closeDrops(); li.classList.toggle('open', !was); return;
  }
  closeDrops();
  if (isMobile()) toggleMenu(false);
  route(toAr(el.dataset.go || el.textContent.trim().replace(/\s+/g, ' ')), el);
}, true);

pageEl.addEventListener('click', (e) => { if (e.target.id === 'crumbHome') { e.preventDefault(); showHome(); } });

/* ---------- البحث ---------- */
function doSearch() {
  const q = $('#searchInput').value.trim(); if (!q) return;
  const hay = (p) => (p.name + p.en + p.cat + p.sub).toLowerCase();
  const res = allProducts.filter(p => hay(p).includes(q.toLowerCase()));
  openModal(`<h2>نتائج البحث عن "${esc(q)}"</h2>` + (res.length
    ? res.map(p => `<div class="sr" data-act="prod" data-id="${esc(p.id)}"><div class="t">${thumb(p)}</div><div>${esc(p.name)}<small style="display:block;color:#888">${p.price} ج.م</small></div></div>`).join('')
    : '<div class="empty">مفيش نتائج.</div>'));
}

/* ---------- المنطقة والسلايدرات ---------- */
const areas = ['مكرم عبيد', 'مدينة نصر', 'التجمع الخامس', 'المعادي', 'الدقي'];
$('#areaTxt').textContent = load('hm_area', 'مكرم عبيد');
$('#areaLink').onclick = (e) => {
  e.preventDefault();
  openModal('<h2>اختار منطقتك</h2>' + areas.map(a => `<button class="area ${a === $('#areaTxt').textContent ? 'on' : ''}" data-act="area" data-v="${a}">${a}</button>`).join(''), true);
};
actions.area = (el) => { save('hm_area', el.dataset.v); $('#areaTxt').textContent = el.dataset.v; closeModal(); };

document.querySelectorAll('.car').forEach(car => {
  const track = car.querySelector('.grid'), prev = car.querySelector('.prev'), next = car.querySelector('.next');
  const upd = () => { prev.disabled = track.scrollLeft <= 2; next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2; };
  prev.onclick = () => track.scrollBy({ left: -track.clientWidth * 0.8, behavior: 'smooth' });
  next.onclick = () => track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' });
  track.addEventListener('scroll', upd); upd();
});
$('#ckTab').onclick = () => $('#cookies').classList.toggle('hide');
const topBtn = $('#toTop');
window.addEventListener('scroll', () => topBtn.classList.toggle('show', window.scrollY > 400));
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

/* ================================================================
   الترجمة: عربي / English
   ================================================================ */
const D = {
  // الشريط العلوي والهيدر
  'اتصل بنا: 16312': 'Call us: 16312', 'وقت التوصيل من ٤٥ : ٦٠ دقيقة': 'Delivery time 45 - 60 minutes', 'طرق دفع سهلة': 'Easy payment methods',
  'ابحث عن..': 'Search for..', 'تسجيل دخول': 'Login', 'انشاء حساب': 'Sign up', 'إنشاء حساب': 'Sign up', 'منتج (ات)': 'item(s)', 'تغيير': 'Change',
  'تتبع الطلب': 'Track order', 'حسابي': 'My account',
  'مكرم عبيد': 'Makram Ebeid', 'مدينة نصر': 'Nasr City', 'التجمع الخامس': 'Fifth Settlement', 'المعادي': 'Maadi', 'الدقي': 'Dokki',
  'حلو الملك': 'Helw El Malek',
  // القائمة
  'الخصومات': 'Offers', 'مطعم': 'Restaurant', 'حلويات مصرية': 'Egyptian Sweets', 'حلويات غربية': 'Western Sweets', 'ميكس سويت': 'Mix Sweet',
  'مخبوزات': 'Bakery', 'شيكولاته': 'Chocolate', 'كحك 2026': 'Kahk 2026', 'المولد 2026': 'Mawlid 2026', 'آيس كريم': 'Ice Cream',
  'بسبوسه': 'Basbousa', 'علب مشكل': 'Assorted Boxes', 'مكس شرقي': 'Oriental Mix', 'جلاش': 'Goulash', 'اطباق': 'Plates', 'كنافه': 'Kunafa',
  'علب شرقي جاهزة': 'Ready Oriental Boxes', 'خبز': 'Bread', 'تشيز كيك': 'Cheesecake', 'بوكس': 'Box', 'كرواسون': 'Croissant', 'نص لتر': 'Half Liter',
  'كب كيك': 'Cupcakes', 'دونات': 'Donuts', 'تارت': 'Tarts', 'علب هدايا': 'Gift Boxes', 'عرض الكل': 'View all', 'عروض اليوم': "Today's Offers", 'عروض الأسبوع': 'Weekly Offers', 'وجبات': 'Meals', 'سلطات': 'Salads',
  'مشروبات': 'Drinks', 'ملبن': 'Malban', 'بسكوت': 'Biscuits', 'ألواح': 'Bars', 'كحك سادة': 'Plain Kahk', 'كحك بالعجمية': 'Ajamiya Kahk', 'كحك محشي': 'Stuffed Kahk',
  'حلاوة المولد': 'Mawlid Halawa', 'علب المولد': 'Mawlid Boxes', 'عروسة المولد': 'Mawlid Doll', 'كوب': 'Cups', 'عبوات عائلية': 'Family Tubs', 'تورتات': 'Cakes',
  // الكروت
  'متوفر في المخزون': 'In stock', 'اضف الي عربة': 'Add to cart', 'أضف للسلة': 'Add to cart', 'جديد': 'New',
  // الفوتر
  'نصنع أفضل الحلويات الشرقية والغربية والمخبوزات بأجود المكونات.': 'We make the finest oriental and western sweets and bakery from the best ingredients.',
  'عن الشركة': 'About', 'من نحن': 'About us', 'الفروع': 'Branches', 'وظائف': 'Careers', 'خدمة العملاء': 'Customer service', 'اتصل بنا': 'Contact us',
  'الشروط والأحكام': 'Terms & conditions', 'سياسة الخصوصية': 'Privacy policy', 'تواصل معنا': 'Get in touch', '© 2026 جميع الحقوق محفوظة': '© 2026 All rights reserved',
  // 404 والصفحات
  'الصفحة دي لسه مش متاحة في النسخة التجريبية.': 'This page is not available in the demo yet.', 'الرجوع للرئيسية': 'Back to home', 'الرئيسية': 'Home', 'كل المنتجات': 'All products',
  'المنتجات دي هتتضاف قريباً.': 'These products are coming soon.', 'مفيش عروض متاحة دلوقتي — تابعنا قريباً.': 'No offers right now — stay tuned.',
  'حلو الملك بيقدّم أفضل الحلويات الشرقية والغربية والمخبوزات بأجود المكونات، وبنهتم بالطعم والجودة في كل منتج.': 'Helw El Malek serves the best oriental and western sweets and bakery made with the finest ingredients, and we care about taste and quality in every product.',
  'فرع مكرم عبيد': 'Makram Ebeid branch', 'مدينة نصر، القاهرة': 'Nasr City, Cairo',
  'عايز تشتغل معانا؟ ابعتلنا بياناتك من صفحة "اتصل بنا" وهنراجعها.': 'Want to work with us? Send your details from the "Contact us" page and we will review them.',
  'بإتمامك الطلب فإنت بتوافق على بيانات التوصيل والأسعار المعروضة وقت الطلب. الأسعار قابلة للتغيير. لو في مشكلة في الطلب كلمنا خلال 24 ساعة من الاستلام.': 'By placing an order you agree to the delivery details and prices shown at the time of ordering. Prices may change. If there is a problem with your order, contact us within 24 hours of delivery.',
  'بنستخدم بياناتك (الاسم والموبايل والعنوان) لتوصيل طلبك والتواصل معاك بس، ومش بنشاركها مع أي جهة تانية.': 'We use your data (name, mobile and address) only to deliver your order and contact you, and we never share it with anyone else.',
  'الاسم': 'Name', 'الموبايل': 'Mobile', 'رسالتك': 'Your message', 'إرسال': 'Send',
  'وصلتنا رسالتك ✓ هنرد عليك قريباً.': 'We got your message ✓ We will reply soon.',
  // السلة والدفع
  'سلة المشتريات': 'Shopping cart', 'إفراغ السلة': 'Clear cart', 'بيانات التوصيل': 'Delivery details', 'السلة': 'Cart', 'الدفع': 'Payment',
  'الاسم بالكامل *': 'Full name *', 'رقم الموبايل *': 'Mobile number *', 'الفرع *': 'Branch *', 'اختر أقرب فرع لك': 'Choose your nearest branch',
  'العنوان بالتفصيل *': 'Full address *', 'ملاحظات إضافية (اختياري)': 'Additional notes (optional)',
  'توصيل للمنزل': 'Home delivery', 'استلام من الفرع': 'Pickup from branch', 'طريقة الدفع': 'Payment method',
  'كاش': 'Cash', 'الدفع عند الاستلام': 'Pay on delivery', 'بطاقة بنكية': 'Bank card', 'فيزا / ماستركارد': 'Visa / Mastercard',
  'محفظة إلكترونية': 'e-Wallet', 'فودافون كاش وغيرها': 'Vodafone Cash etc', 'متاح حالياً الدفع كاش فقط': 'Currently cash payment only',
  'ملخص الطلب': 'Order summary', 'المجموع الفرعي': 'Subtotal', 'خصم العروض': 'Offers discount', 'رسوم التوصيل': 'Delivery fee', 'مجاناً': 'Free',
  'كود الخصم': 'Promo code', 'تطبيق': 'Apply', 'تأكيد الطلب': 'Confirm order', 'بياناتك محمية وآمنة': 'Your data is safe',
  'الإجمالي': 'Total', 'حذف': 'Remove', 'السلة فاضية — ضيف منتجات وارجع هنا.': 'Your cart is empty — add some products first.',
  'تسوق الآن': 'Shop now', 'تمت الإضافة للسلة ✓': 'Added to cart ✓', 'إفراغ السلة كلها؟': 'Clear the whole cart?',
  'الكود ده مش صحيح': 'Invalid promo code', 'لازم تختار فرع الأول': 'Please choose a branch first',
  // تتبع الطلب
  'تتبع طلبك': 'Track your order', 'رقم الطلب': 'Order number', 'مثال: 102345': 'e.g. 102345', 'جاري البحث عن الطلب...': 'Searching...',
  'مفيش طلب بالرقم ده — تأكد من رقم الطلب.': 'No order with this number — check the order number.',
  'جديدة': 'New', 'قيد التحضير': 'Preparing', 'في الطريق': 'On the way', 'تم التسليم': 'Delivered', 'ملغي': 'Canceled',
  'حالة الطلب': 'Order status', 'الفرع': 'Branch', 'المنتجات': 'Products', 'قطعة': 'items', 'تعذّر الاتصال — حاول تاني.': 'Connection failed — try again.',
  'الطلب ملغي — لو فيه استفسار كلمنا على 16312': 'Order canceled — call us on 16312 for any questions',
  // صفحة القسم
  'ترتيب حسب:': 'Sort by:', 'الأكثر طلباً': 'Most ordered', 'الأحدث': 'Newest', 'السعر: من الأقل للأعلى': 'Price: low to high', 'السعر: من الأعلى للأقل': 'Price: high to low',
  'التصنيف': 'Category', 'السعر': 'Price', 'المنتج': 'Product', 'الكل': 'All', 'متوفر': 'In stock', 'عروض': 'Offers', 'من': 'From', 'إلى': 'To',
  'تطبيق الفلتر': 'Apply filters', 'مفيش منتجات بالمواصفات دي.': 'No products match these filters.',
  // صفحة المنتج
  'منتجات مشابهة': 'Similar products', 'الوصف': 'Description', 'المكونات': 'Ingredients', 'التقييمات': 'Reviews', 'الحجم': 'Size',
  'الرمز:': 'SKU:', 'كمية': 'Quantity', 'أضف إلى السلة': 'Add to cart', 'لا توجد تقييمات من العملاء': 'No customer reviews',
  'تقييم': 'review', 'تقييمات': 'reviews', 'المفضلة': 'Favorite',
  // النوافذ
  'رقم الموبايل': 'Mobile number', 'كلمة المرور': 'Password', 'إنشاء الحساب': 'Create account',
  'رقم الموبايل غير صحيح': 'Invalid mobile number', 'كلمة المرور لازم 6 حروف على الأقل': 'Password must be at least 6 characters',
  'الرقم ده مسجّل قبل كده': 'This number is already registered', 'الرقم أو كلمة المرور غلط': 'Wrong number or password',
  'طلباتي': 'My orders', 'لسه معندكش طلبات.': 'You have no orders yet.', 'تسجيل خروج': 'Logout', 'تم تسجيل الخروج': 'Logged out',
  'تم استلام طلبك بنجاح': 'Order received successfully', 'إرسال الطلب للفرع (واتساب)': 'Send order to branch (WhatsApp)',
  'مفيش نتائج.': 'No results.', 'صورة المنتج': 'Product image', 'صورة': 'Image', 'اللوجو': 'Logo', 'بانر إعلاني 1': 'Promo banner 1', 'بانر إعلاني 2': 'Promo banner 2', 'اختار منطقتك': 'Choose your area',
  'مرحبا بعودتك': 'Welcome back', 'قم بتسجيل الدخول برقم الموبايل للاستمتاع بتجربتك': 'Log in with your mobile number to enjoy your experience',
  'نسيت كلمة المرور ؟': 'Forgot password?', 'ليس لديك حساب ؟': "Don't have an account?", 'لديك حساب بالفعل ؟': 'Already have an account?', 'أهلاً بك': 'Welcome',
  'أنشئ حسابك برقم الموبايل لإتمام طلباتك بسهولة': 'Create your account with your mobile number to order easily',
  'لاستعادة كلمة المرور اتصل بنا على 16312': 'To reset your password call us on 16312',
  'أهلاً': 'Hello', 'رقم الطلب #': 'Order number #'
};
sections.forEach(s => { D[s.title] = s.en; s.items.forEach(p => { D[p.name] = p.en; }); });
Object.assign(D, window.EXTRA_EN || {});
D['نفد المخزون'] = 'Out of stock';
const RULES = [
  [/^تبقى فقط (\d+)$/, 'Only $1 left'], [/^الكمية المتاحة (\d+) فقط$/, 'Only $1 available'], [/^(.+) ج\.م$/, '$1 EGP'], [/^أهلاً (.+)$/, 'Hello $1'], [/^طلب #(\d+)$/, 'Order #$1'],
  [/^رقم الطلب #(\d+)$/, 'Order number #$1'], [/^هنتواصل معاك على (.+)$/, 'We will contact you at $1'],
  [/^نتائج البحث عن "(.*)"$/, 'Search results for "$1"'], [/^(.+) — (\d+) ج\.م$/, '$1 — $2 EGP'],
  [/^خصم (\d+)%$/, '$1% OFF'], [/^(\d+) منتج$/, '$1 products'], [/^\((\d+) تقييم\)$/, '($1 reviews)'],
  [/^خصم (\d+)%?$/, '$1% off'], [/^مثال: (\d+)$/, 'e.g. $1'], [/^الفرع: (.+)$/, 'Branch: $1']
];
const REV = Object.fromEntries(Object.entries(D).map(([a, e]) => [e, a]));
const toAr = (s) => REV[s] || s;

let lang = 'ar';
const origText = new WeakMap();

function trText(s) {
  const t = s.trim(); if (!t) return s;
  let r = D[t];
  if (r === undefined && t.includes(' | ')) { r = t.split(' | ').map(x => D[x] ?? x).join(' | '); if (r === t) r = undefined; }
  if (r === undefined) for (const [re, to] of RULES) if (re.test(t)) { r = t.replace(re, to); break; }
  return r === undefined ? s : s.replace(t, () => r);
}
function walk(root) {
  if (root.nodeType === 3) return fixNode(root);
  if (root.nodeType !== 1) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let n; while ((n = w.nextNode())) { if (!/^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName)) fixNode(n); }
  [root, ...root.querySelectorAll('[placeholder],[aria-label]')].forEach(el => ['placeholder', 'aria-label'].forEach(a => {
    if (el.getAttribute && el.hasAttribute(a) && !el.dataset['ar' + a]) { const v = el.getAttribute(a), r = trText(v); if (r !== v) { el.dataset['ar' + a] = v; el.setAttribute(a, r); } }
  }));
}
function fixNode(n) { const r = trText(n.nodeValue); if (r !== n.nodeValue) { if (!origText.has(n)) origText.set(n, n.nodeValue); n.nodeValue = r; } }
function restore() {
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
  while ((n = w.nextNode())) if (origText.has(n)) { n.nodeValue = origText.get(n); origText.delete(n); }
  document.querySelectorAll('[data-arplaceholder]').forEach(el => {
    if (el.dataset.arplaceholder) { el.setAttribute('placeholder', el.dataset.arplaceholder); delete el.dataset.arplaceholder; }
  });
}
new MutationObserver(ms => { if (lang === 'en') ms.forEach(m => m.addedNodes.forEach(walk)); })
  .observe(document.body, { childList: true, subtree: true });

function setLang(l) {
  lang = l; localStorage.setItem('hm_lang', l);
  const en = l === 'en', root = document.documentElement;
  root.lang = l; root.dir = en ? 'ltr' : 'rtl';
  en ? walk(document.body) : restore();
  document.title = en ? 'Helw El Malek' : 'حلو الملك';
  $('#flag').classList.toggle('us', !en);
  $('#langTxt').textContent = en ? 'العربية' : 'English';
}
$('#langLink').onclick = (e) => { e.preventDefault(); setLang(lang === 'ar' ? 'en' : 'ar'); };
setLang(localStorage.getItem('hm_lang') || 'ar');


/* ================================================================
   Firebase: الحسابات + الطلبات (مع الفرع) + إشعار واتساب + فورم اتصل بنا
   ================================================================ */
localStorage.removeItem('hm_user');
auth.onAuthStateChanged(async (u) => {
  if (!u) { user = null; renderUser(); return; }
  try {
    const d = await db.collection('users').doc(u.uid).get();
    user = { uid: u.uid, name: d.exists ? (d.data().name || '') : '', phone: d.exists ? d.data().phone : '' };
  } catch { user = { uid: u.uid, name: '', phone: '' }; }
  renderUser();
});

actions.logout = async () => { await auth.signOut(); closeModal(); toast('تم تسجيل الخروج'); };

/* رسالة واتساب اللي بتروح لرقم الفرع لما العميل يطلب */
function waLink(order, branchName) {
  const br = (window.BRANCHES || []).find(b => b.name === branchName);
  const raw = ((br && br.phone) || (window.REMOTE && window.REMOTE.settings && window.REMOTE.settings.notify) || '').replace(/\D/g, '');
  if (!raw) return '';
  const intl = raw.startsWith('20') ? raw : (raw.startsWith('0') ? '20' + raw.slice(1) : raw);
  const items = order.items.map(i => `• ${i.name} ×${i.qty} — ${i.price * i.qty} ج.م`).join('\n');
  const msg = `🛎️ طلب جديد #${order.orderNo}\n👤 العميل: ${order.name} — ${order.phone}\n🏪 الفرع: ${order.branch}\n`
    + (order.deliver === 'استلام من الفرع' ? `🏃 ${order.deliver}\n` : `📍 ${order.deliver}: ${order.addr}\n`)
    + `🧾 المنتجات:\n${items}\n💸 الإجمالي: ${order.total} ج.م (كاش)`
    + (order.note ? `\n📝 ملاحظات: ${order.note}` : '');
  return `https://wa.me/${intl}?text=${encodeURIComponent(msg)}`;
}

function showOrderDone(orderNo, wa, phone) {
  openModal(`<div class="empty">
    <div class="ok-ic">✓</div>
    <h2 style="color:var(--gold)">تم استلام طلبك بنجاح</h2>
    <p>رقم الطلب <b>#${orderNo}</b><br>هنتواصل معاك على ${esc(phone || (user && user.phone) || '')}</p>
    <button class="m-btn" data-act="track" data-no="${orderNo}">تتبع طلبك</button>
    ${wa ? `<a class="m-btn wa-btn" href="${wa}" target="_blank" rel="noopener">إرسال الطلب للفرع (واتساب)</a>` : ''}
    <button class="m-btn ghost" data-act="close">متابعة التسوق</button>
  </div>`);
  if (wa) { try { window.open(wa, '_blank'); } catch {} }   // محاولة إرسال تلقائي (المتصفح ممكن يمنعها)
}

/* فورمات النوافذ: تسجيل / دخول / تتبع */
modalEl.addEventListener('submit', async (e) => {
  const type = e.target.dataset.form;
  if (type === 'track') {
    e.preventDefault(); e.stopImmediatePropagation();
    return doTrack(Object.fromEntries(new FormData(e.target)).no);
  }
  if (!['register', 'login'].includes(type)) return;
  e.preventDefault(); e.stopImmediatePropagation();
  const f = Object.fromEntries(new FormData(e.target));
  const err = (m) => { const x = $('#err'); if (x) x.textContent = m; };
  const btn = e.target.querySelector('button.m-btn'); if (btn) btn.disabled = true;
  try {
    if (type === 'register') {
      if (!/^01[0125]\d{8}$/.test(f.phone)) return err('رقم الموبايل غير صحيح');
      if (f.pass.length < 6) return err('كلمة المرور لازم 6 حروف على الأقل');
      const c = await auth.createUserWithEmailAndPassword(phoneEmail(f.phone), f.pass);
      await db.collection('users').doc(c.user.uid).set({ name: '', phone: f.phone, createdAt: TS() });
      user = { uid: c.user.uid, name: '', phone: f.phone };
    } else {
      const c = await auth.signInWithEmailAndPassword(phoneEmail(f.phone.trim()), f.pass);
      const adm = await db.collection('admins').doc(c.user.uid).get();
      if (adm.exists) { location.href = 'admin.html'; return; }
      const d = await db.collection('users').doc(c.user.uid).get();
      if (!d.exists) throw { code: 'auth/user-not-found' };
      user = { uid: c.user.uid, name: d.data().name || '', phone: d.data().phone };
    }
    save('hm_user', { uid: user.uid }); renderUser(); closeModal(); toast('أهلاً' + (user.name ? ' ' + user.name : ''));
    if (afterAuth) { const fn = afterAuth; afterAuth = null; fn(); }
  } catch (ex) {
    const c = ex.code || '';
    err(c === 'auth/email-already-in-use' ? 'الرقم ده مسجّل قبل كده'
      : /invalid|wrong|user-not-found/.test(c) ? 'الرقم أو كلمة المرور غلط'
      : c === 'auth/network-request-failed' ? 'مشكلة في الاتصال بالإنترنت' : 'حصلت مشكلة، حاول تاني');
  } finally { if (btn) btn.disabled = false; }
}, true);

/* فورمات الصفحات: السلة والدفع / اتصل بنا */
pageEl.addEventListener('submit', async (e) => {
  const type = e.target.dataset.form;
  if (type === 'contact') {
    e.preventDefault(); e.stopImmediatePropagation();
    const data = Object.fromEntries(new FormData(e.target));
    try {
      await db.collection('messages').add({ ...data, read: false, createdAt: TS() });
      e.target.innerHTML = '<div class="empty">وصلتنا رسالتك ✓ هنرد عليك قريباً.</div>';
    } catch { toast('تعذّر الإرسال، حاول تاني'); }
    return;
  }
  if (type !== 'checkout') return;
  e.preventDefault(); e.stopImmediatePropagation();
  if (!user) { afterAuth = showCheckoutPage; return showAuth('login'); }
  const f = Object.fromEntries(new FormData(e.target));
  const btn = pageEl.querySelector('[data-ck="place"]');
  if (btn) { btn.disabled = true; btn.textContent = 'جاري تأكيد الطلب...'; }
  try {
    const t = ckTotals();
    const items = cartRows().map(([id, qty]) => ({ id, name: byId(id).name, cat: byId(id).cat, price: byId(id).price, qty }));
    const orderNo = 1000 + Math.floor(Date.now() / 1000) % 1000000;
    const deliver = f.deliver === 'pickup' ? 'استلام من الفرع' : 'توصيل للمنزل';
    const order = {
      uid: user.uid, name: (f.name || '').trim(), phone: (f.phone || user.phone || '').trim(),
      items, sub: t.sub, disc: t.disc, fee: t.fee, promoCode: ckPromo.code || '', promoV: t.promoV, total: t.total,
      addr: deliver === 'استلام من الفرع' ? 'استلام من الفرع' : (f.addr || '').trim(),
      note: (f.note || '').trim(), branch: f.branch, deliver, pay: 'كاش',
      status: 'جديدة', orderNo, createdAt: TS()
    };
    await db.collection('orders').add(order);
    // لو أول مرة يكتب اسمه، نحفظه في حسابه
    if (order.name && order.name !== user.name) {
      user = { ...user, name: order.name };
      db.collection('users').doc(user.uid).update({ name: order.name }).catch(() => {});
      renderUser();
    }
    cartData = {}; ckPromo = { code: '', pct: 0 }; saveCart();
    showOrderDone(orderNo, waLink(order, f.branch), order.phone);
  } catch (ex) {
    toast('تعذّر تأكيد الطلب — حاول تاني');
    if (btn) { btn.disabled = false; btn.textContent = 'تأكيد الطلب'; }
  }
}, true);
