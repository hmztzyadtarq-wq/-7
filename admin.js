/* admin.js — لوحة التحكم كلها (بيانات، أدوات، Firebase، الصفحات، الأزرار، تسجيل الدخول) */

/* ================================================================
   البيانات الأولية (بتتنقل لـ Firebase بزرار في الإعدادات)
   ================================================================ */
const SEED_BANNERS = [
  'images/banners/banner-1.jpg',
  'images/banners/banner-2.jpg',
  'images/banners/banner-3.jpg'
];

const SEED_CATS = [
  { name: 'حلويات مصرية', img: 'images/categories/1.jpg' },
  { name: 'حلويات غربية', img: 'images/categories/2.jpg' },
  { name: 'ميكس سويت',    img: 'images/categories/3.jpg' },
  { name: 'مخبوزات',      img: 'images/categories/4.jpg' },
  { name: 'شيكولاته',     img: 'images/categories/5.jpg' },
  { name: 'كحك 2026',     img: 'images/categories/6.jpg' },
  { name: 'المولد 2026',  img: 'images/categories/7.jpg' },
  { name: 'آيس كريم',     img: 'images/categories/8.jpg' }
];

const SEED_SECTIONS = [
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

const SEED_MENU = [
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

/* ================================================================
   ثوابت اللوحة: الأيقونات والصفحات والحالات
   ================================================================ */
const ICONS = {
  dash:     '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  orders:   '<path d="M6 8h12l-1 12H7zM9 8a3 3 0 0 1 6 0"/>',
  reports:  '<path d="M4 20V10M10 20V4M16 20v-6M22 20H2"/>',
  inv:      '<path d="M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8"/>',
  offers:   '<path d="M20.6 13.4l-7.2 7.2a2 2 0 01-2.8 0L3 13V3h10l7.6 7.6a2 2 0 010 2.8zM7 7h.01"/>',
  branch:   '<path d="M12 21s-7-7.5-7-12a7 7 0 1114 0c0 4.5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  products: '<path d="M3 12h18v8H3zM5 12V8a7 7 0 0 1 14 0v4"/>',
  cats:     '<path d="M4 6h16M4 12h16M4 18h10"/>',
  cust:     '<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M16 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-4-6"/>',
  banners:  '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 17l-5-5-9 7"/>',
  set:      '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>'
};
// صفحات الشريط الجانبي (الرسائل اتشالت — الإشعارات بتيجي على الجرس)
const PAGES = [
  ['dash', 'لوحة التحكم'], ['orders', 'الطلبات'], ['reports', 'التقارير'], ['inv', 'المخزون'],
  ['offers', 'العروض'], ['branch', 'الفروع'], ['products', 'المنتجات'], ['cats', 'الأقسام'],
  ['cust', 'العملاء'], ['banners', 'البانرات'], ['set', 'الإعدادات']
];
const STATUSES = ['جديدة', 'قيد التحضير', 'في الطريق', 'تم التسليم', 'ملغي'];
const STATUS_COLOR = { 'جديدة': 'var(--gold)', 'قيد التحضير': 'var(--navy)', 'في الطريق': 'var(--purple)', 'تم التسليم': 'var(--green)', 'ملغي': 'var(--red)' };
const HOME_SECTIONS = ['الأكثر رواجًا', 'المنتجات الجديده', 'تشكيلة مميزة'];
const MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

/* ================================================================
   أدوات مشتركة + رفع الصور
   ================================================================ */
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (n) => Number(n || 0).toLocaleString('en-US', { maximumFractionDigits: 2 });

let currentPage = 'dash';
let currentRange = 'week';      // الرسم في الرئيسية: أسبوع / شهر
let repRange = 'day';           // التقارير: يوم / أسبوع / شهر / سنة
let statusFilter = '';

const dOf = (t) => (t && t.toDate) ? t.toDate() : (t instanceof Date ? t : new Date());
const dayKey = (d) => d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
const fmtDate = (t) => dOf(t).toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' });

function icon(name, size = 20) {
  return `<svg viewBox="0 0 24 24" style="width:${size}px;height:${size}px;stroke:currentColor;fill:none;stroke-width:1.7">${ICONS[name]}</svg>`;
}
function showToast(text) {
  const t = $('#toast'); t.textContent = text; t.classList.add('show');
  clearTimeout(showToast.t); showToast.t = setTimeout(() => t.classList.remove('show'), 2200);
}
function openModal(html) {
  const m = $('#modal');
  m.innerHTML = `<div class="m-box"><button class="m-x" type="button" data-act="close" aria-label="إغلاق">×</button>${html}</div>`;
  m.hidden = false;
}
function closeModal() { const m = $('#modal'); m.hidden = true; m.innerHTML = ''; }

const imgSrc = (u) => /^(https?:|data:)/.test(u || '') ? u : (u || '');

// الصور بتتصغّر وبتتخزن جوه Firestore نفسه كنص base64
function resizeImage(file, max, q) {
  return new Promise((resolve, reject) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url); resolve(c.toDataURL('image/jpeg', q));
    };
    img.onerror = () => reject(new Error('الملف مش صورة صالحة'));
    img.src = url;
  });
}
const uploadImage = (file, max = 800, q = 0.75) => resizeImage(file, max, q);

/* ================================================================
   الاستماع للبيانات لحظيًا من Firebase
   ================================================================ */
const S = { orders: [], products: [], cats: [], users: [], messages: [], branches: [], settings: {}, promos: {} };
let unsubs = [];
function listen(name, key) {
  return db.collection(name).onSnapshot(
    (snap) => { S[key] = snap.docs.map(d => ({ id: d.id, ...d.data() })); if (typeof onData === 'function') onData(); },
    (e) => showToast('تعذّر تحميل ' + name + ': ' + e.code)
  );
}
function startStore() {
  stopStore();
  unsubs = [
    listen('orders', 'orders'), listen('products', 'products'), listen('categories', 'cats'),
    listen('users', 'users'), listen('messages', 'messages'), listen('branches', 'branches'),
    db.collection('settings').doc('home').onSnapshot((d) => { S.settings = d.exists ? d.data() : {}; if (typeof onData === 'function') onData(); }),
    db.collection('settings').doc('promos').onSnapshot((d) => { S.promos = d.exists ? d.data() : {}; if (typeof onData === 'function') onData(); })
  ];
}
function stopStore() { unsubs.forEach(u => u()); unsubs = []; }

/* ================================================================
   الشريط الجانبي والتنقل
   ================================================================ */
function renderNav() {
  $('#nav').innerHTML = PAGES.map(([key, title]) =>
    `<button class="nav ${key === currentPage ? 'on' : ''}" data-page="${key}">${icon(key)}${title}</button>`).join('');
}
function goTo(page, status = '') {
  currentPage = page; statusFilter = status;
  $('#q').value = '';
  renderNav(); renderPage();
  $('#drop').classList.remove('show');
}
$('#nav').addEventListener('click', (e) => {
  const b = e.target.closest('.nav'); if (b) goTo(b.dataset.page);
});

/* ================================================================
   الرئيسية + الرسم البياني (مشترك مع التقارير)
   ================================================================ */
const DAYS = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
const liveOrders = () => S.orders.filter(o => o.status !== 'ملغي');
const sumOf = (list) => list.reduce((a, o) => a + (o.total || 0), 0);
const onDay = (list, d) => list.filter(o => dayKey(dOf(o.createdAt)) === dayKey(d));

function dailySeries() {
  const n = currentRange === 'week' ? 7 : 30, now = new Date(), out = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    out.push({ key: dayKey(d), label: n === 7 ? DAYS[d.getDay()] : String(d.getDate()), val: 0 });
  }
  liveOrders().forEach(o => { const s = out.find(x => x.key === dayKey(dOf(o.createdAt))); if (s) s.val += o.total || 0; });
  return out;
}
function chartSVG(data) {
  const W = 640, H = 250, padL = 52, padR = 20, padT = 14, padB = 34;
  const max = niceMax(Math.max(...data.map(d => d.val)));
  const getX = (i) => padL + (W - padL - padR) * (i / (data.length - 1));
  const getY = (v) => padT + (H - padT - padB) * (1 - v / max);
  const pts = data.map((d, i) => ({ x: getX(i), y: getY(d.val) }));
  let path = `M${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) { const m = (pts[i - 1].x + pts[i].x) / 2; path += ` C${m},${pts[i - 1].y} ${m},${pts[i].y} ${pts[i].x},${pts[i].y}`; }
  const area = `${path} L${pts[pts.length - 1].x},${H - padB} L${pts[0].x},${H - padB} Z`;
  let grid = '';
  for (let k = 0; k <= 4; k++) {
    const v = max * k / 4, y = getY(v);
    grid += `<line x1="${padL}" x2="${W - padR}" y1="${y}" y2="${y}" stroke="var(--line)"/><text x="${padL - 8}" y="${y + 4}" text-anchor="end">${v >= 1000 ? +(v / 1000).toFixed(1) + 'k' : Math.round(v)}</text>`;
  }
  const labels = data.map((d, i) => (data.length === 7 || i % 5 === 0 || i === data.length - 1) ? `<text x="${getX(i)}" y="${H - 10}" text-anchor="middle">${d.label}</text>` : '').join('');
  const dots = pts.map((p, i) => `<circle class="pt" cx="${p.x}" cy="${p.y}" r="${data.length > 7 ? 4 : 5}" fill="var(--gold)" data-i="${i}"/>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" width="100%">${grid}<path d="${area}" fill="var(--gold)" opacity=".18"/><path d="${path}" fill="none" stroke="var(--gold)" stroke-width="2.5"/>${labels}${dots}<text class="tip" id="tip" x="${W / 2}" y="12" text-anchor="middle"></text></svg>`;
}
function niceMax(v) {
  if (v <= 0) return 100;
  const mag = Math.pow(10, Math.floor(Math.log10(v / 4)));
  for (const m of [1, 2, 2.5, 5, 10]) if (m * mag * 4 >= v) return m * mag * 4;
  return v;
}

function buildDashboard() {
  const now = new Date(), yest = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const live = liveOrders(), tOrders = onDay(live, now), yOrders = onDay(live, yest);
  const newUsers = (d) => S.users.filter(u => dayKey(dOf(u.createdAt)) === dayKey(d)).length;
  const avg = (l) => l.length ? sumOf(l) / l.length : 0;
  const kpis = [
    ['مبيعات اليوم', fmt(sumOf(tOrders)), sumOf(tOrders), sumOf(yOrders), 'orders'],
    ['الطلبات', tOrders.length, tOrders.length, yOrders.length, 'orders'],
    ['عملاء جدد', newUsers(now), newUsers(now), newUsers(yest), 'cust'],
    ['متوسط الطلب', fmt(Math.round(avg(tOrders))), avg(tOrders), avg(yOrders), 'orders']
  ];
  const kpiHtml = kpis.map(([title, value, a, b, target]) => {
    let ch = '<span style="color:var(--muted)">—</span>';
    if (b > 0) { const c = Math.round((a - b) / b * 1000) / 10; ch = `<span class="${c >= 0 ? 'up' : 'down'}">${c > 0 ? '+' : ''}${c}% عن أمس</span>`; }
    return `<div class="card kpi" data-go="${target}"><div class="h"><span>${title}</span></div><b>${value}</b>${ch}</div>`;
  }).join('');

  const byCat = {}, byProd = {};
  live.forEach(o => (o.items || []).forEach(it => {
    const c = it.cat || 'أخرى'; byCat[c] = (byCat[c] || 0) + it.price * it.qty;
    byProd[it.name] = (byProd[it.name] || 0) + it.qty;
  }));
  const catTotal = Object.values(byCat).reduce((a, b) => a + b, 0);
  const catList = Object.entries(byCat).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const catsHtml = catList.length ? catList.map(([name, v]) => {
    const pct = Math.round(v / catTotal * 100);
    return `<div class="bar" data-go="cats"><div class="l"><span>${esc(name)}</span><span>${pct}%</span></div><div class="t"><div class="f" style="width:${pct}%"></div></div></div>`;
  }).join('') : '<div class="empty">لسه مفيش مبيعات</div>';
  const topHtml = Object.entries(byProd).sort((a, b) => b[1] - a[1]).slice(0, 5)
    .map(([name, n]) => `<div class="row" data-go="products"><span>${esc(name)}</span><span>${n} قطعة</span></div>`).join('') || '<div class="empty">لسه مفيش مبيعات</div>';
  const statusHtml = STATUSES.map(s => {
    const n = onDay(S.orders, now).filter(o => o.status === s).length;
    return `<div class="row" data-go="orders" data-st="${s}"><span><i class="dot" style="background:${STATUS_COLOR[s]}"></i>${s}</span><span>${n}</span></div>`;
  }).join('');

  return `
    <div class="grid g4">${kpiHtml}</div>
    <div class="grid g2">
      <div class="card"><h3>المبيعات حسب القسم</h3>${catsHtml}</div>
      <div class="card">
        <div class="ch"><h3>${currentRange === 'week' ? 'المبيعات خلال الأسبوع' : 'المبيعات خلال الشهر'}</h3>
        <button class="sel" id="range">${currentRange === 'week' ? 'آخر 7 أيام' : 'آخر 30 يوم'} ▾</button></div>
        ${chartSVG(dailySeries())}
      </div>
    </div>
    <div class="grid g2b">
      <div class="card"><h3>الأكثر مبيعًا</h3>${topHtml}</div>
      <div class="card"><h3>حالة الطلبات اليوم</h3>${statusHtml}</div>
    </div>`;
}

/* ================================================================
   صفحات الإدارة
   ================================================================ */
const card = (title, count, tools, body) =>
  `<div class="card"><div class="ch"><h3>${title} <span class="tag">${count}</span></h3><div>${tools || ''}</div></div>${body}</div>`;
const table = (heads, rows) => `<div class="tw"><table><tr>${heads.map(h => `<th>${h}</th>`).join('')}</tr>${rows.join('')}</table></div>`;
const none = '<div class="empty">لا توجد نتائج</div>';
const hit = (arr, q) => !q || arr.join(' ').toLowerCase().includes(q.toLowerCase());
const thumb = (u) => u ? `<img class="thumb" src="${esc(imgSrc(u))}" alt="" onerror="this.style.visibility='hidden'">` : '<span class="thumb ph">—</span>';
const btn = (act, id, label, cls = '') => `<button class="act ${cls}" data-act="${act}" data-id="${esc(id)}">${label}</button>`;

/* ---------- الطلبات (بعمود الفرع) ---------- */
function ordersPage(q, status) {
  const list = [...S.orders].sort((a, b) => dOf(b.createdAt) - dOf(a.createdAt))
    .filter(o => (!status || o.status === status) && hit(['#' + o.orderNo, o.name, o.phone, o.addr, o.branch], q));
  const rows = list.map(o => `<tr><td>#${o.orderNo}</td><td>${esc(o.name)}</td><td dir="ltr">${esc(o.phone)}</td><td>${esc(o.branch || '—')}</td><td>${fmt(o.total)} ج.م</td>
    <td><select class="st" data-oid="${o.id}">${STATUSES.map(s => `<option ${s === o.status ? 'selected' : ''}>${s}</option>`).join('')}</select></td>
    <td>${fmtDate(o.createdAt)}</td><td>${btn('view-order', o.id, 'تفاصيل')}${btn('del-order', o.id, 'حذف')}</td></tr>`);
  const tools = status ? `<span class="chip">${status}</span><button class="btn ghost sm" data-act="clear-status">إلغاء الفلتر</button>` : '';
  return card('الطلبات', list.length, tools, list.length ? table(['رقم', 'العميل', 'الموبايل', 'الفرع', 'الإجمالي', 'الحالة', 'التاريخ', ''], rows) : none);
}
function orderModal(id) {
  const o = S.orders.find(x => x.id === id); if (!o) return;
  openModal(`<h2>طلب #${o.orderNo}</h2><p class="note">${fmtDate(o.createdAt)} — ${esc(o.status)}</p>
    <div class="li"><span>العميل</span><span>${esc(o.name)}</span></div>
    <div class="li"><span>الموبايل</span><a href="tel:${esc(o.phone)}" dir="ltr" style="color:var(--gold)">${esc(o.phone)}</a></div>
    <div class="li"><span>الفرع</span><span>${esc(o.branch || '—')}</span></div>
    <div class="li"><span>طريقة التسليم</span><span>${esc(o.deliver || '—')}</span></div>
    <div class="li"><span>العنوان</span><span style="white-space:normal;text-align:left">${esc(o.addr)}</span></div>
    ${o.note ? `<div class="li"><span>ملاحظات</span><span>${esc(o.note)}</span></div>` : ''}
    <h3 style="margin:14px 0 4px">المنتجات</h3>
    ${(o.items || []).map(i => `<div class="li"><span>${esc(i.name)} × ${i.qty}</span><span>${fmt(i.price * i.qty)} ج.م</span></div>`).join('')}
    ${o.promoV ? `<div class="li"><span>كود خصم ${esc(o.promoCode || '')}</span><span>−${fmt(o.promoV)} ج.م</span></div>` : ''}
    <div class="li"><b>الإجمالي</b><b>${fmt(o.total)} ج.م — ${esc(o.pay || 'كاش')}</b></div>`);
}

/* ---------- التقارير: كل المبيعات باليوم/الأسبوع/الشهر/السنة + زر مسح كل الطلبات ---------- */
function rangeStart(r) {
  const n = new Date();
  if (r === 'day') return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  if (r === 'week') return new Date(n.getFullYear(), n.getMonth(), n.getDate() - (n.getDay() + 1) % 7);   // الأسبوع يبدأ السبت
  if (r === 'month') return new Date(n.getFullYear(), n.getMonth(), 1);
  return new Date(n.getFullYear(), 0, 1);
}
function reportSeries() {
  const live = liveOrders();
  if (repRange === 'year') {
    const y = new Date().getFullYear();
    return Array.from({ length: 12 }, (_, i) => {
      const a = new Date(y, i, 1), b = new Date(y, i + 1, 1);
      const val = live.filter(o => { const t = dOf(o.createdAt); return t >= a && t < b; }).reduce((s, o) => s + (o.total || 0), 0);
      return { label: MONTHS[i].slice(0, 4), val };
    });
  }
  if (repRange === 'day') {          // كل ساعتين خلال اليوم
    const t0 = new Date(); t0.setHours(0, 0, 0, 0);
    return Array.from({ length: 12 }, (_, i) => {
      const h = i * 2, a = new Date(t0.getTime() + h * 3600e3), b = new Date(a.getTime() + 2 * 3600e3);
      const val = live.filter(o => { const t = dOf(o.createdAt); return t >= a && t < b; }).reduce((s, o) => s + (o.total || 0), 0);
      return { label: h + ':00', val };
    });
  }
  const n = repRange === 'week' ? 7 : 30, now = new Date(), out = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    out.push({ key: dayKey(d), label: n === 7 ? DAYS[d.getDay()] : String(d.getDate()), val: 0 });
  }
  live.forEach(o => { const s = out.find(x => x.key === dayKey(dOf(o.createdAt))); if (s) s.val += o.total || 0; });
  return out;
}
function reportsPage() {
  const start = rangeStart(repRange);
  const inR = (o) => dOf(o.createdAt) >= start;
  const live = liveOrders().filter(inR);
  const canceled = S.orders.filter(o => o.status === 'ملغي' && inR(o));
  const avg = live.length ? sumOf(live) / live.length : 0;
  const names = { day: 'اليوم', week: 'هذا الأسبوع', month: 'هذا الشهر', year: 'هذه السنة' };
  const kpis = [
    [`مبيعات ${names[repRange]}`, fmt(sumOf(live)) + ' ج.م'],
    ['عدد الطلبات', live.length],
    ['متوسط الطلب', fmt(Math.round(avg)) + ' ج.م'],
    ['طلبات ملغاة', canceled.length]
  ].map(([t, v]) => `<div class="card kpi" style="cursor:default"><div class="h"><span>${t}</span></div><b>${v}</b></div>`).join('');
  const statusHtml = STATUSES.map(s => {
    const n = S.orders.filter(o => o.status === s && inR(o)).length;
    return `<div class="row" data-go="orders" data-st="${s}"><span><i class="dot" style="background:${STATUS_COLOR[s]}"></i>${s}</span><span>${n}</span></div>`;
  }).join('');
  const rows = S.orders.filter(inR).sort((a, b) => dOf(b.createdAt) - dOf(a.createdAt))
    .map(o => `<tr><td>#${o.orderNo}</td><td>${esc(o.name)}</td><td dir="ltr">${esc(o.phone)}</td><td>${esc(o.branch || '—')}</td>
      <td>${esc(o.status)}</td><td>${fmtDate(o.createdAt)}</td><td>${fmt(o.total)} ج.م</td>
      <td>${btn('view-order', o.id, 'تفاصيل')}</td></tr>`);
  return `
    <div class="seg">${['day', 'week', 'month', 'year'].map(r =>
      `<button class="${repRange === r ? 'on' : ''}" data-rep="${r}">${{ day: 'اليوم', week: 'أسبوع', month: 'شهر', year: 'سنة' }[r]}</button>`).join('')}</div>
    <div class="grid g4">${kpis}</div>
    <div class="grid g2b">
      <div class="card"><h3>المبيعات — ${names[repRange]}</h3>${chartSVG(reportSeries())}</div>
      <div class="card"><h3>حالة الطلبات — ${names[repRange]}</h3>${statusHtml}</div>
    </div>
    ${card('سجل كل الطلبات — ' + names[repRange], rows.length, '', rows.length ? table(['رقم', 'العميل', 'الموبايل', 'الفرع', 'الحالة', 'التاريخ', 'الإجمالي', ''], rows) : none)}
    <div class="card danger">
      <p>⚠️ المسح بيمسح كل الطلبات نهائيًا من قاعدة البيانات عشان تفرّغ مساحة الداتابيز — الأرقام في التقارير هترجع صفر. مفيش رجوع بعد المسح.</p>
      <button class="btn red" data-act="wipe-orders">حذف جميع الطلبات (${S.orders.length})</button>
    </div>`;
}

/* ---------- المخزون: تعديل سريع بالزرار أو الكتابة ---------- */
function invPage(q) {
  const list = [...S.products].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).filter(p => hit([p.name, p.cat, p.sub], q));
  const k = (t, v) => `<div class="card kpi" style="cursor:default"><div class="h"><span>${t}</span></div><b>${v}</b></div>`;
  const kpis = k('إجمالي المنتجات', S.products.length)
    + k('متوفر', S.products.filter(p => p.stock == null || p.stock > 10).length)
    + k('كمية قليلة (≤10)', S.products.filter(p => p.stock != null && p.stock > 0 && p.stock <= 10).length)
    + k('نفد المخزون', S.products.filter(p => p.stock === 0).length);
  const chipOf = (st) => st == null ? '<span class="chip off">بدون حد</span>'
    : st === 0 ? '<span class="chip off" style="background:var(--red);color:#5a0f1a">نفد</span>'
    : st <= 10 ? '<span class="chip">قليل</span>' : '<span class="chip" style="background:var(--green);color:#14400f">متوفر</span>';
  const rows = list.map(p => `<tr><td>${thumb(p.img)}</td><td>${esc(p.name)}</td><td>${esc(p.cat)}</td>
    <td><div class="stq">
      <button class="btn sm ghost" data-act="inv-dec" data-id="${p.id}">−</button>
      <input class="inv-in" data-id="${p.id}" value="${p.stock ?? ''}" placeholder="∞" inputmode="numeric">
      <button class="btn sm ghost" data-act="inv-inc" data-id="${p.id}">+</button>
    </div></td><td>${chipOf(p.stock)}</td></tr>`);
  return kpis + card('المخزون', list.length, '<p class="note" style="margin:0">اكتب رقم واضغط Enter أو استخدم − و + — فاضي معناها متوفر بدون حد</p>',
    list.length ? table(['', 'المنتج', 'القسم', 'الكمية', 'الحالة'], rows) : none);
}

/* ---------- العروض: خصم على منتج (سعر قديم يتشطب في الموقع) ---------- */
function offersPage(q) {
  const list = S.products.filter(p => p.oldPrice).filter(p => hit([p.name], q));
  const rows = list.map(p => {
    const d = Math.round((1 - p.price / p.oldPrice) * 100);
    return `<tr><td>${thumb(p.img)}</td><td>${esc(p.name)}</td><td><s>${fmt(p.oldPrice)} ج.م</s></td><td><b style="color:var(--green)">${fmt(p.price)} ج.م</b></td>
      <td><span class="chip">خصم ${d}%</span></td><td>${btn('off-del', p.id, 'إلغاء العرض')}</td></tr>`;
  });
  return card('العروض', list.length, '<button class="btn sm" data-act="add-offer">+ إضافة عرض</button>',
    (list.length ? table(['', 'المنتج', 'السعر قبل', 'السعر بعد', 'الخصم', ''], rows) : '<div class="empty">مفيش عروض — ضيف عرض يظهر في الموقع ببادج "خصم" وسعر قديم متشطب.</div>'))
    + '<p class="note">العروض بتظهر في الموقع في قسم "الخصومات" وفي صفحة القسم تحت فلتر "عروض".</p>';
}
function offerForm() {
  if (!S.products.length) return showToast('ضيف منتجات الأول');
  openModal(`<h2>إضافة عرض</h2>
  <form data-form="offer">
    <label>المنتج</label>
    <select name="pid">${S.products.map(p => `<option value="${p.id}">${esc(p.name)} — ${fmt(p.price)} ج.م</option>`).join('')}</select>
    <label>نسبة الخصم (%)</label><input name="disc" type="number" min="1" max="90" value="10" required>
    <div class="err" id="ferr"></div>
    <button class="btn">حفظ العرض</button>
  </form>`);
}

/* ---------- الفروع: إجباري للعميل + رقم واتساب لاستلام الطلبات ---------- */
function branchesPage(q) {
  const list = [...S.branches].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).filter(b => hit([b.name, b.phone, b.addr], q));
  const rows = list.map(b => `<tr><td>${esc(b.name)}</td><td dir="ltr"><a href="tel:${esc(b.phone)}" style="color:var(--gold)">${esc(b.phone)}</a></td>
    <td class="wrap">${esc(b.addr || '—')}</td>
    <td><span class="chip ${b.active === false ? 'off' : ''}">${b.active === false ? 'موقوف' : 'شغال'}</span></td>
    <td>${btn('edit-branch', b.id, 'تعديل')}${btn('del-branch', b.id, 'حذف')}</td></tr>`);
  return card('الفروع', list.length, '<button class="btn sm" data-act="add-branch">+ إضافة فرع</button>',
    (list.length ? table(['الفرع', 'رقم استلام الطلبات', 'العنوان', 'الحالة', ''], rows)
      : '<div class="empty">مفيش فروع — العميل مش هيقدر يطلب قبل ما تضيف فرع على الأقل.</div>'))
    + '<p class="note">العميل لازم يختار فرع عند الطلب، ورسالة واتساب بالطلب بتفتح تلقائيًا على رقم الفرع اللي اختره.</p>';
}
function branchForm(id) {
  const b = S.branches.find(x => x.id === id) || {};
  openModal(`<h2>${id ? 'تعديل فرع' : 'إضافة فرع'}</h2>
  <form data-form="branch" data-id="${esc(id || '')}">
    <label>اسم الفرع</label><input name="name" value="${esc(b.name)}" required>
    <label>رقم استلام الطلبات (واتساب — 01xxxxxxxxx)</label><input name="phone" inputmode="tel" value="${esc(b.phone)}" required>
    <label>العنوان</label><input name="addr" value="${esc(b.addr || '')}">
    <div class="two">
      <div><label>الترتيب</label><input name="order" type="number" value="${b.order ?? S.branches.length}"></div>
      <div><label class="chk" style="margin-top:34px"><input type="checkbox" name="active" ${b.active === false ? '' : 'checked'}> شغال وبيظهر للعملاء</label></div>
    </div>
    <div class="err" id="ferr"></div>
    <button class="btn">حفظ</button>
  </form>`);
}

/* ---------- المنتجات ---------- */
function productsPage(q) {
  const list = [...S.products].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).filter(p => hit([p.name, p.en, p.cat, p.sub], q));
  const rows = list.map(p => `<tr><td>${thumb(p.img)}</td><td>${esc(p.name)}</td><td>${esc(p.cat)} | ${esc(p.sub)}</td><td>${fmt(p.price)} ج.م</td>
    <td>${p.stock == null ? '—' : p.stock}</td><td>${esc(p.section || '—')}</td>
    <td><span class="chip ${p.active === false ? 'off' : ''}">${p.active === false ? 'مخفي' : 'ظاهر'}</span></td>
    <td>${btn('edit-product', p.id, 'تعديل')}${btn('toggle-product', p.id, p.active === false ? 'إظهار' : 'إخفاء')}${btn('del-product', p.id, 'حذف')}</td></tr>`);
  return card('المنتجات', list.length, '<button class="btn sm" data-act="add-product">+ إضافة منتج</button>',
    list.length ? table(['', 'المنتج', 'القسم', 'السعر', 'المخزون', 'صف الرئيسية', 'الحالة', ''], rows) : none);
}
function productForm(id) {
  if (!S.cats.length) return showToast('ضيف قسم الأول من صفحة الأقسام');
  const p = S.products.find(x => x.id === id) || {};
  openModal(`<h2>${id ? 'تعديل منتج' : 'إضافة منتج'}</h2>
  <form data-form="product" data-id="${esc(id || '')}">
    <label>الاسم (عربي)</label><input name="name" value="${esc(p.name)}" required>
    <label>الاسم (English)</label><input name="en" value="${esc(p.en)}">
    <div class="two">
      <div><label>القسم</label><select name="cat" id="fCat">${S.cats.map(c => `<option ${c.name === p.cat ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select></div>
      <div><label>القسم الفرعي</label><select name="sub" id="fSub"></select></div>
    </div>
    <div class="two">
      <div><label>السعر (ج.م)</label><input name="price" type="number" min="0" step="0.5" value="${p.price ?? ''}" required></div>
      <div><label>المخزون (فاضي = متوفر)</label><input name="stock" type="number" min="0" value="${p.stock ?? ''}"></div>
    </div>
    <label>يظهر في صف (الرئيسية)</label>
    <select name="section"><option value="">— لا يظهر في الرئيسية —</option>${HOME_SECTIONS.map(s => `<option ${s === p.section ? 'selected' : ''}>${s}</option>`).join('')}</select>
    <label>الوصف (بيظهر في صفحة المنتج — تبويب الوصف)</label>
    <textarea name="desc" rows="3">${esc(p.desc || '')}</textarea>
    <label>صورة المنتج</label><input type="file" name="file" accept="image/*" id="fFile">
    ${p.img ? `<img class="prev" id="prev" src="${esc(imgSrc(p.img))}" alt="">` : '<img class="prev" id="prev" style="display:none" alt="">'}
    <label class="chk"><input type="checkbox" name="active" ${p.active === false ? '' : 'checked'}> ظاهر في الموقع</label>
    <div class="err" id="ferr"></div>
    <button class="btn">حفظ</button>
  </form>`);
  fillSubs(p.sub);
}
function fillSubs(selected) {
  const c = S.cats.find(x => x.name === $('#fCat').value);
  const subs = (c && c.subs) || [];
  $('#fSub').innerHTML = subs.length ? subs.map(s => `<option ${s === selected ? 'selected' : ''}>${esc(s)}</option>`).join('') : '<option value="">—</option>';
}

/* ---------- الأقسام ---------- */
function catsPage(q) {
  const list = [...S.cats].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).filter(c => hit([c.name, c.en, (c.subs || []).join(' ')], q));
  const rows = list.map(c => `<tr><td>${thumb(c.img)}</td><td>${esc(c.name)}</td><td>${esc(c.en || '—')}</td><td>${(c.subs || []).length}</td>
    <td>${S.products.filter(p => p.cat === c.name).length}</td><td><span class="chip ${c.circle ? '' : 'off'}">${c.circle ? 'ظاهر' : 'لا'}</span></td>
    <td>${btn('edit-cat', c.id, 'تعديل')}${btn('del-cat', c.id, 'حذف')}</td></tr>`);
  return card('الأقسام', list.length, '<button class="btn sm" data-act="add-cat">+ إضافة قسم</button>',
    list.length ? table(['صورة', 'القسم', 'English', 'أقسام فرعية', 'منتجات', 'في دوائر الرئيسية', ''], rows) : none);
}
function catForm(id) {
  const c = S.cats.find(x => x.id === id) || {};
  const subs = (c.subs || []).map((s, i) => s + (c.subsEn && c.subsEn[i] ? ' | ' + c.subsEn[i] : '')).join('\n');
  openModal(`<h2>${id ? 'تعديل قسم' : 'إضافة قسم'}</h2>
  <form data-form="cat" data-id="${esc(id || '')}">
    <label>اسم القسم (عربي)</label><input name="name" value="${esc(c.name)}" required>
    <label>الاسم (English)</label><input name="en" value="${esc(c.en)}">
    <label>الأقسام الفرعية (كل واحد في سطر — ممكن: عربي | English)</label>
    <textarea name="subs" rows="5">${esc(subs)}</textarea>
    <div class="two">
      <div><label>الترتيب</label><input name="order" type="number" value="${c.order ?? S.cats.length}"></div>
      <div><label class="chk" style="margin-top:34px"><input type="checkbox" name="circle" ${c.circle ? 'checked' : ''}> يظهر كدايرة في الرئيسية</label></div>
    </div>
    <label>صورة القسم (للدايرة)</label><input type="file" name="file" accept="image/*" id="fFile">
    ${c.img ? `<img class="prev" id="prev" src="${esc(imgSrc(c.img))}" alt="">` : '<img class="prev" id="prev" style="display:none" alt="">'}
    <div class="note">لو غيّرت اسم القسم، المنتجات بتتنقل له تلقائي. لو غيّرت اسم قسم فرعي، عدّل المنتجات بتاعته.</div>
    <div class="err" id="ferr"></div>
    <button class="btn">حفظ</button>
  </form>`);
}

/* ---------- العملاء ---------- */
function custPage(q) {
  const list = [...S.users].sort((a, b) => dOf(b.createdAt) - dOf(a.createdAt)).filter(u => hit([u.name, u.phone], q));
  const rows = list.map(u => {
    const mine = S.orders.filter(o => o.uid === u.id);
    return `<tr><td>${esc(u.name || '—')}</td><td dir="ltr"><a href="tel:${esc(u.phone)}" style="color:var(--gold)">${esc(u.phone)}</a></td>
      <td>${fmtDate(u.createdAt)}</td><td>${mine.length}</td><td>${fmt(mine.filter(o => o.status !== 'ملغي').reduce((a, o) => a + (o.total || 0), 0))} ج.م</td>
      <td>${btn('view-cust', u.id, 'طلباته')}</td></tr>`;
  });
  return card('العملاء المسجلين', list.length, '', list.length ? table(['الاسم', 'الموبايل', 'تاريخ التسجيل', 'الطلبات', 'إجمالي المشتريات', ''], rows) : none);
}
function custModal(id) {
  const u = S.users.find(x => x.id === id); if (!u) return;
  const mine = S.orders.filter(o => o.uid === id).sort((a, b) => dOf(b.createdAt) - dOf(a.createdAt));
  openModal(`<h2>${esc(u.name || u.phone)}</h2><p class="note" dir="ltr" style="text-align:right">${esc(u.phone)}</p><h3 style="margin:14px 0 4px">الطلبات</h3>` +
    (mine.map(o => `<div class="li"><span>#${o.orderNo} — ${esc(o.status)}</span><span>${fmt(o.total)} ج.م</span></div>`).join('') || '<div class="empty">لا توجد طلبات</div>'));
}

/* ---------- البانرات ---------- */
function bannersPage() {
  const b = S.settings.banners || [], pr = S.promos || {};
  const gal = b.map((u, i) => `<figure><img src="${esc(imgSrc(u))}" alt="">${btn('del-banner', String(i), 'حذف')}</figure>`).join('');
  const slot = (k, n) => `<div class="slot">${pr[k] ? `<img src="${esc(imgSrc(pr[k]))}" alt="">` : '<span class="thumb ph" style="width:160px;height:70px;line-height:70px">فاضي</span>'}
    <div><b>البانر الإعلاني ${n}</b><br><label class="btn sm" style="display:inline-block;margin-top:8px">${pr[k] ? 'استبدال' : 'رفع صورة'}<input type="file" accept="image/*" hidden data-up="${k}"></label></div></div>`;
  return card('بانرات السلايدر', b.length, `<label class="btn sm">+ إضافة صور<input type="file" accept="image/*" multiple hidden data-up="banner"></label>`,
    (gal ? `<div class="gal">${gal}</div>` : '<div class="empty">مفيش بانرات — الموقع بيعرض الصور الافتراضية.</div>')) +
    card('البانرات الإعلانية', 2, '', slot('p1', 1) + slot('p2', 2));
}

/* ---------- الإعدادات: بيانات دخول الأدمن + اللوجو + أدوات القاعدة ---------- */
function setPage() {
  const logo = S.settings.logo || '';
  const logoHtml = logo && logo !== 'none'
    ? `<img class="logo-prev" src="${esc(imgSrc(logo))}" alt="">`
    : (logo === 'none' ? '<p class="note">اللوجو مخفي حاليًا من الموقع.</p>' : '<p class="note">اللوجو الافتراضي (images/logo.png).</p>');
  return card('الإعدادات', '', '', `
    <div class="li"><span>الحساب الحالي</span><span dir="ltr">${esc(auth.currentUser ? auth.currentUser.email : '')}</span></div>
    <div class="li"><span>المنتجات / الأقسام / الفروع / العملاء / الطلبات</span><span>${S.products.length} / ${S.cats.length} / ${S.branches.length} / ${S.users.length} / ${S.orders.length}</span></div>

    <h3 style="margin-top:18px">🔑 بيانات دخول الأدمن</h3>
    <div class="two">
      <form data-form="adm-phone">
        <label>تغيير رقم الموبايل اللي بيسجل بيه الأدمن</label>
        <input name="phone" inputmode="tel" placeholder="01XXXXXXXXX" required>
        <button class="btn sm">تغيير الرقم</button>
      </form>
      <form data-form="adm-pass">
        <label>تغيير كلمة المرور</label>
        <input name="cur" type="password" placeholder="كلمة المرور الحالية" required>
        <input name="pass" type="password" placeholder="كلمة المرور الجديدة (6 حروف على الأقل)" minlength="6" required>
        <button class="btn sm">تغيير كلمة المرور</button>
      </form>
    </div>
    <div class="err" id="admErr"></div>

    <h3 style="margin-top:18px">🖼️ لوجو الموقع</h3>
    <div>${logoHtml}</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px">
      <label class="btn sm">${logo && logo !== 'none' ? 'استبدال اللوجو' : 'رفع لوجو'}<input type="file" accept="image/*" hidden data-up="logo"></label>
      ${logo === 'none' ? '<button class="btn ghost sm" data-act="logo-def">رجوع اللوجو الافتراضي</button>' : '<button class="btn ghost sm" data-act="logo-hide">إخفاء اللوجو من الموقع</button>'}
    </div>

    <h3 style="margin-top:18px">🧰 أدوات القاعدة</h3>
    <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn" data-act="seed">نقل البيانات الأولية للقاعدة</button>
      <button class="btn red" data-act="wipe-products">حذف كل المنتجات</button>
      <button class="btn ghost" data-act="wipe-msgs">حذف كل الرسائل (${S.messages.length})</button>
      <button class="btn ghost" data-act="logout">تسجيل خروج</button>
    </div>
    <p class="note">زرار "نقل البيانات الأولية" بينقل الأقسام والمنتجات والبانرات الموجودة في الموقع لـ Firebase مرة واحدة. استخدمه مرة واحدة بس.</p>
    <div class="danger"><p>حذف جميع الطلبات موجود في صفحة التقارير (عشان تفرّغ مساحة الداتابيز من سجل المبيعات).</p></div>`);
}

function buildPage(key, q, status) {
  return { orders: () => ordersPage(q, status), reports: reportsPage, inv: () => invPage(q), offers: () => offersPage(q),
    branch: () => branchesPage(q), products: () => productsPage(q), cats: () => catsPage(q), cust: () => custPage(q),
    banners: bannersPage, set: setPage }[key]();
}


/* ================================================================
   تشغيل اللوحة وربط كل الأزرار وتسجيل الدخول
   ================================================================ */
let loginMsg = '';
const touch = () => db.collection('settings').doc('meta').set({ v: Date.now() }).catch(() => {});

function renderPage() {
  if (currentPage === 'dash') { $('#sub').textContent = 'ملخص الأداء اليوم'; $('#q').placeholder = 'ابحث في الطلبات'; $('#view').innerHTML = buildDashboard(); return; }
  const title = PAGES.find(p => p[0] === currentPage)[1];
  $('#sub').textContent = title; $('#q').placeholder = 'ابحث في ' + title;
  $('#view').innerHTML = buildPage(currentPage, $('#q').value, statusFilter);
}
function updateBadge() {
  const n = S.orders.filter(o => o.status === 'جديدة').length;      // الرسايل اتشالت من اللوحة
  const b = $('#badge'); b.textContent = n; b.style.display = n ? '' : 'none';
  $('#drop').innerHTML = n ? `<div data-go="orders" data-st="جديدة">${n} طلب جديد</div>` : '<div>لا توجد إشعارات</div>';
}
function onData() { updateBadge(); renderPage(); }

/* ---------- الأوامر (data-act) ---------- */
const guard = (fn) => async (...a) => { try { await fn(...a); } catch (e) { showToast('حصل خطأ: ' + (e.code || e.message)); } };
const ACT = {
  close: closeModal,
  'clear-status': () => { statusFilter = ''; renderPage(); },
  'view-order': (id) => orderModal(id),
  'del-order': guard(async (id) => { if (confirm('حذف الطلب نهائيًا؟')) { await db.collection('orders').doc(id).delete(); showToast('تم الحذف'); } }),

  'add-product': () => productForm(''), 'edit-product': (id) => productForm(id),
  'toggle-product': guard(async (id) => { const p = S.products.find(x => x.id === id); await db.collection('products').doc(id).update({ active: p.active === false }); touch(); }),
  'del-product': guard(async (id) => { const p = S.products.find(x => x.id === id); if (confirm('حذف "' + p.name + '"؟')) { await db.collection('products').doc(id).delete(); touch(); showToast('تم الحذف'); } }),

  'add-cat': () => catForm(''), 'edit-cat': (id) => catForm(id),
  'del-cat': guard(async (id) => {
    const c = S.cats.find(x => x.id === id), n = S.products.filter(p => p.cat === c.name).length;
    if (confirm('حذف قسم "' + c.name + '"؟' + (n ? `\nفيه ${n} منتج مش هيظهروا في أي قسم.` : ''))) { await db.collection('categories').doc(id).delete(); touch(); showToast('تم الحذف'); }
  }),

  'view-cust': (id) => custModal(id),

  /* الفروع */
  'add-branch': () => branchForm(''), 'edit-branch': (id) => branchForm(id),
  'del-branch': guard(async (id) => {
    const b = S.branches.find(x => x.id === id);
    if (confirm('حذف فرع "' + b.name + '"؟')) { await db.collection('branches').doc(id).delete(); touch(); showToast('تم الحذف'); }
  }),

  /* المخزون */
  'inv-dec': guard(async (id) => { const p = S.products.find(x => x.id === id); const s = Math.max(0, (p.stock ?? 0) - (p.stock ? 1 : 0)); await db.collection('products').doc(id).update({ stock: s }); }),
  'inv-inc': guard(async (id) => { const p = S.products.find(x => x.id === id); await db.collection('products').doc(id).update({ stock: (p.stock ?? 0) + 1 }); }),

  /* العروض */
  'add-offer': () => offerForm(),
  'off-del': guard(async (id) => {
    const p = S.products.find(x => x.id === id);
    if (!confirm('إلغاء عرض "' + p.name + '" ورجوع السعر لـ ' + fmt(p.oldPrice) + ' ج.م؟')) return;
    await db.collection('products').doc(id).update({ price: p.oldPrice, oldPrice: null });
    touch(); showToast('تم إلغاء العرض');
  }),

  'del-banner': guard(async (i) => {
    const url = (S.settings.banners || [])[+i];
    if (url && confirm('حذف البانر؟')) { await db.collection('settings').doc('home').set({ banners: firebase.firestore.FieldValue.arrayRemove(url) }, { merge: true }); touch(); }
  }),

  /* اللوجو */
  'logo-hide': guard(async () => { await db.collection('settings').doc('home').set({ logo: 'none' }, { merge: true }); touch(); showToast('اللوجو اتخفى من الموقع'); }),
  'logo-def': guard(async () => { await db.collection('settings').doc('home').set({ logo: '' }, { merge: true }); touch(); showToast('رجع اللوجو الافتراضي'); }),

  seed: guard(async () => {
    if (S.products.length || S.cats.length) return showToast('القاعدة فيها بيانات بالفعل — مش هنكررها');
    if (!confirm('نقل الأقسام والمنتجات والبانرات الأولية لـ Firebase؟')) return;
    const batch = db.batch();
    SEED_MENU.forEach((m, i) => {
      const circle = SEED_CATS.find(c => c.name === m.name);
      batch.set(db.collection('categories').doc(), { name: m.name, en: '', subs: m.subs, subsEn: [], img: '', circle: !!circle, order: i });
    });
    let k = 0;
    SEED_SECTIONS.forEach(s => s.items.forEach(p => batch.set(db.collection('products').doc(), {
      name: p.name, en: p.en, cat: p.cat, sub: p.sub, price: p.price, stock: p.stock ?? null, section: s.title,
      img: '', active: true, rating: p.rating, reviews: p.reviews, order: k++, createdAt: TS()
    })));
    batch.set(db.collection('settings').doc('home'), { banners: [] }, { merge: true });
    await batch.commit(); touch(); showToast('تم نقل البيانات ✓');
  }),
  'wipe-products': guard(async () => {
    if (!S.products.length) return showToast('مفيش منتجات');
    if (!confirm('حذف كل المنتجات (' + S.products.length + ') نهائيًا؟')) return;
    const batch = db.batch(); S.products.forEach(p => batch.delete(db.collection('products').doc(p.id)));
    await batch.commit(); touch(); showToast('تم حذف كل المنتجات ✓');
  }),
  'wipe-msgs': guard(async () => {
    if (!S.messages.length) return showToast('مفيش رسائل');
    if (!confirm('حذف كل الرسائل (' + S.messages.length + ')؟')) return;
    const batch = db.batch(); S.messages.forEach(m => batch.delete(db.collection('messages').doc(m.id)));
    await batch.commit(); showToast('تم حذف الرسائل ✓');
  }),
  /* حذف كل الطلبات — موجودة في صفحة التقارير عشان مساحة الداتابيز */
  'wipe-orders': guard(async () => {
    if (!S.orders.length) return showToast('مفيش طلبات');
    if (!confirm('حذف جميع الطلبات (' + S.orders.length + ') نهائيًا؟ ده بيمسح كل سجل المبيعات ومش بيرجع.')) return;
    if (!confirm('متأكد تمامًا؟ كل التقارير هترجع صفر.')) return;
    showToast('جاري حذف الطلبات...');
    let left = [...S.orders];
    while (left.length) {
      const chunk = left.splice(0, 400);
      const batch = db.batch();
      chunk.forEach(o => batch.delete(db.collection('orders').doc(o.id)));
      await batch.commit();
    }
    showToast('تم حذف كل الطلبات ✓');
  }),
  logout: () => auth.signOut()
};
function handleAct(el) { const f = ACT[el.dataset.act]; if (f) f(el.dataset.id, el); }

/* ---------- الضغط جوه منطقة المحتوى ---------- */
$('#view').addEventListener('click', (e) => {
  if (e.target.id === 'range') { currentRange = currentRange === 'week' ? 'month' : 'week'; return renderPage(); }
  const seg = e.target.closest('[data-rep]');
  if (seg) { repRange = seg.dataset.rep; return renderPage(); }
  const pt = e.target.closest('.pt');
  if (pt) {
    const data = currentPage === 'reports' ? reportSeries() : dailySeries();
    const d = data[+pt.dataset.i]; $('#tip').textContent = `${d.label}: ${fmt(d.val)} ج.م`; return;
  }
  const a = e.target.closest('[data-act]'); if (a) return handleAct(a);
  const g = e.target.closest('[data-go]'); if (g) goTo(g.dataset.go, g.dataset.st || '');
});
$('#modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal') return closeModal();
  const a = e.target.closest('[data-act]'); if (a) handleAct(a);
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* ---------- تغيير حالة الطلب + المخزون + رفع الصور واللوجو ---------- */
$('#view').addEventListener('change', guard(async (e) => {
  const t = e.target;
  if (t.dataset.oid) { await db.collection('orders').doc(t.dataset.oid).update({ status: t.value }); return showToast('تم تحديث الحالة ✓'); }
  if (t.classList.contains('inv-in')) {
    const v = t.value.trim();
    await db.collection('products').doc(t.dataset.id).update({ stock: v === '' ? null : Math.max(0, Number(v) || 0) });
    touch(); return showToast('تم تحديث المخزون ✓');
  }
  if (t.dataset.up && t.files.length) {
    showToast('جاري رفع الصور...');
    if (t.dataset.up === 'logo') {
      const url = await uploadImage(t.files[0], 400, 0.85);
      await db.collection('settings').doc('home').set({ logo: url }, { merge: true });
      touch(); showToast('تم تغيير اللوجو ✓');
      t.value = ''; return;
    }
    const ref = db.collection('settings').doc('home'), files = [...t.files];
    if (t.dataset.up === 'banner') {
      for (const f of files) {
        const url = await uploadImage(f, 1400, 0.7);
        const used = (S.settings.banners || []).reduce((n, x) => n + x.length, 0);
        if (used + url.length > 900000) throw new Error('حجم البانرات كبير — احذف بانر قديم الأول');
        await ref.set({ banners: firebase.firestore.FieldValue.arrayUnion(url) }, { merge: true });
        S.settings.banners = [...(S.settings.banners || []), url];
      }
    } else {
      const url = await uploadImage(files[0], 1000, 0.7);
      await db.collection('settings').doc('promos').set({ [t.dataset.up]: url }, { merge: true });
    }
    t.value = ''; touch(); showToast('تم الرفع ✓');
  }
}));

/* ---------- فورمات النوافذ: منتج / قسم / فرع / عرض / بيانات الأدمن ---------- */
$('#modal').addEventListener('change', (e) => {
  if (e.target.id === 'fCat') fillSubs();
  if (e.target.id === 'fFile' && e.target.files[0]) { const p = $('#prev'); p.src = URL.createObjectURL(e.target.files[0]); p.style.display = 'block'; }
});
$('#modal').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target, type = form.dataset.form, id = form.dataset.id, f = Object.fromEntries(new FormData(form));
  const file = form.querySelector('input[type=file]') ? form.querySelector('input[type=file]').files[0] : null;
  const btnEl = form.querySelector('.btn'), err = (m) => { const x = $('#ferr'); if (x) x.textContent = m; };
  btnEl.disabled = true; btnEl.textContent = file ? 'جاري رفع الصورة...' : 'جاري الحفظ...';
  try {
    if (type === 'branch') {
      if (!/^01[0125]\d{8}$/.test((f.phone || '').trim())) { btnEl.disabled = false; btnEl.textContent = 'حفظ'; return err('رقم الموبايل غير صحيح (01xxxxxxxxx)'); }
      const data = { name: f.name.trim(), phone: f.phone.trim(), addr: (f.addr || '').trim(), active: !!f.active, order: Number(f.order) || 0 };
      if (id) await db.collection('branches').doc(id).update(data);
      else await db.collection('branches').add(data);
      touch(); closeModal(); showToast('تم حفظ الفرع ✓');
    } else if (type === 'offer') {
      const p = S.products.find(x => x.id === f.pid); if (!p) throw new Error('المنتج مش موجود');
      const d = Math.min(90, Math.max(1, Number(f.disc) || 10));
      const base = p.oldPrice || p.price;                      // السعر الأصلي قبل أي عرض قديم
      const newPrice = Math.round(base * (1 - d / 100) * 2) / 2;
      await db.collection('products').doc(p.id).update({ price: newPrice, oldPrice: base });
      touch(); closeModal(); showToast('تم حفظ العرض: خصم ' + d + '% ✓');
    } else if (type === 'product') {
      const old = S.products.find(x => x.id === id) || {};
      let img = old.img || '';
      if (file) { img = await uploadImage(file, 800, 0.75); }
      const data = {
        name: f.name.trim(), en: (f.en || '').trim() || f.name.trim(), cat: f.cat, sub: f.sub || '', price: Number(f.price),
        stock: f.stock === '' ? null : Number(f.stock), section: f.section || '', desc: (f.desc || '').trim(), img, active: !!f.active
      };
      if (id) await db.collection('products').doc(id).update(data);
      else await db.collection('products').add({ ...data, rating: 0, reviews: 0, order: -Date.now(), createdAt: TS() });
      touch(); closeModal(); showToast('تم الحفظ ✓');
    } else {
      const old = S.cats.find(x => x.id === id) || {};
      let img = old.img || '';
      if (file) { img = await uploadImage(file, 500, 0.75); }
      const lines = f.subs.split('\n').map(l => l.split('|').map(x => x.trim())).filter(l => l[0]);
      const name = f.name.trim();
      const data = { name, en: (f.en || '').trim(), subs: lines.map(l => l[0]), subsEn: lines.map(l => l[1] || ''), img, circle: !!f.circle && !!img, order: Number(f.order) || 0 };
      if (f.circle && !img) { btnEl.disabled = false; btnEl.textContent = 'حفظ'; return err('ارفع صورة عشان القسم يظهر كدايرة'); }
      if (id) {
        await db.collection('categories').doc(id).update(data);
        if (old.name && old.name !== name) {
          const batch = db.batch(); S.products.filter(p => p.cat === old.name).forEach(p => batch.update(db.collection('products').doc(p.id), { cat: name }));
          await batch.commit();
        }
      } else await db.collection('categories').add(data);
      touch(); closeModal(); showToast('تم الحفظ ✓');
    }
  } catch (ex) { btnEl.disabled = false; btnEl.textContent = 'حفظ'; err('تعذّر الحفظ: ' + (ex.code || ex.message)); }
});

/* ---------- فورمات الإعدادات (جوه الصفحة مش نافذة): رقم الأدمن / الباسورد ---------- */
$('#view').addEventListener('submit', async (e) => {
  const type = e.target.dataset.form;
  if (!['adm-phone', 'adm-pass'].includes(type)) return;
  e.preventDefault();
  const f = Object.fromEntries(new FormData(e.target));
  const errEl = $('#admErr');
  const err = (m) => { if (errEl) errEl.textContent = m; };
  const b = e.target.querySelector('.btn'); if (b) { b.disabled = true; }
  try {
    if (type === 'adm-phone') {
      const ph = (f.phone || '').trim();
      if (!/^01[0125]\d{8}$/.test(ph)) { err('رقم الموبايل غير صحيح'); if (b) b.disabled = false; return; }
      await auth.currentUser.updateEmail(phoneEmail(ph));
      await db.collection('admins').doc(auth.currentUser.uid).set({ phone: ph }, { merge: true });
      showToast('تم تغيير رقم الدخول ✓ سجّل بيه من المرة الجاية');
      renderPage();
    } else {
      if ((f.pass || '').length < 6) { err('كلمة المرور الجديدة لازم 6 حروف على الأقل'); if (b) b.disabled = false; return; }
      const cred = firebase.auth.EmailAuthProvider.credential(auth.currentUser.email, f.cur);
      await auth.currentUser.reauthenticateWithCredential(cred);
      await auth.currentUser.updatePassword(f.pass);
      showToast('تم تغيير كلمة المرور ✓');
      renderPage();
    }
  } catch (ex) {
    const c = ex.code || '';
    err(c === 'auth/requires-recent-login' ? 'لسه مسجّل دخول من قديم — سجّل خروج ودخول تاني وحاول'
      : /invalid|wrong/.test(c) ? 'كلمة المرور الحالية غلط'
      : 'تعذّر التنفيذ: ' + c);
  } finally { if (b) b.disabled = false; }
});

/* ---------- البحث والإشعارات ---------- */
$('#q').addEventListener('input', () => {
  if (['dash', 'reports', 'banners', 'set'].includes(currentPage)) { if (!$('#q').value) return; currentPage = 'orders'; renderNav(); }
  renderPage();
});
$('#bell').addEventListener('click', (e) => { e.stopPropagation(); $('#drop').classList.toggle('show'); });
$('#drop').addEventListener('click', (e) => { const g = e.target.closest('[data-go]'); if (g) goTo(g.dataset.go, g.dataset.st || ''); });
document.addEventListener('click', () => $('#drop').classList.remove('show'));

/* ---------- تسجيل دخول الأدمن ---------- */
$('#loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(e.target)), b = e.target.querySelector('.btn');
  b.disabled = true; $('#loginErr').textContent = '';
  try { const id = f.email.trim(); await auth.signInWithEmailAndPassword(id.includes('@') ? id : phoneEmail(id), f.pass); }
  catch (ex) { $('#loginErr').textContent = /invalid|wrong|user-not-found/.test(ex.code || '') ? 'الرقم أو كلمة المرور غلط' : ex.code === 'auth/operation-not-allowed' ? 'فعّل Email/Password من Firebase ← Authentication ← Sign-in method' : 'تعذّر الدخول: ' + (ex.code || ex.message); }
  b.disabled = false;
});
auth.onAuthStateChanged(async (u) => {
  if (!u) { stopStore(); $('#login').hidden = false; $('#loginErr').textContent = loginMsg; loginMsg = ''; return; }
  try {
    const a = await db.collection('admins').doc(u.uid).get();
    if (!a.exists) { loginMsg = 'الحساب ده مش أدمن. أضف الـ UID ده كـ Document ID في مجموعة admins:  ' + u.uid; await auth.signOut(); return; }
  } catch (ex) { loginMsg = 'تعذّر التحقق من الصلاحية: ' + (ex.code || ex.message); await auth.signOut(); return; }
  $('#login').hidden = true; startStore(); renderNav(); renderPage();
});
renderNav();
