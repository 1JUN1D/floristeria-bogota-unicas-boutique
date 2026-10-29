/* ============================================================
   PROMO 12% — Corazón Doble Dulzura (ESP-022) y Sol y Amor (GIR-007)
   Vigente hasta el VIERNES 30 de octubre de 2026, 6:00 p. m. (hora Colombia).
   Pasada esa hora este archivo no hace NADA: sin flyer, sin sección fijada,
   sin precios tachados. Las tarjetas quedan en el catálogo a precio normal.
   ============================================================ */
(function () {
  var FIN = Date.parse('2026-10-30T23:00:00Z'); // = viernes 30/10/2026 18:00 en Bogotá (UTC-5)
  if (!(Date.now() < FIN)) return;

  var CODES = ['ESP-022', 'GIR-007'];
  var DESC = 12;
  var FLYER_MS = 4000;

  function money(n) { return '$' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  // ---------- Estilos (solo se inyectan mientras la promo está vigente) ----------
  var css = '' +
    '.pv-banner{background:#000;color:#fff;border-radius:20px;padding:1.6rem 1.8rem;margin:0 0 2rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1.2rem;box-shadow:0 15px 40px rgba(0,0,0,.18);border:1px solid #EABE81}' +
    '.pv-banner h3{font-family:Georgia,"Times New Roman",serif;color:#EABE81;font-size:1.7rem;font-weight:normal;margin:.35rem 0 .3rem}' +
    '.pv-banner p{font-family:Arial,sans-serif;font-size:.95rem;opacity:.85;margin:0;max-width:520px;line-height:1.5}' +
    '.pv-tag{display:inline-block;background:#EABE81;color:#000;font-family:Arial,sans-serif;font-weight:bold;font-size:.75rem;letter-spacing:1.5px;padding:4px 12px;border-radius:20px;text-transform:uppercase}' +
    '.pv-count{display:flex;gap:.5rem}' +
    '.pv-count div{background:#1a1a1a;border:1px solid #333;border-radius:12px;min-width:62px;padding:.55rem .4rem;text-align:center}' +
    '.pv-count b{display:block;font-family:Georgia,"Times New Roman",serif;font-size:1.7rem;font-weight:normal;color:#fff;line-height:1.1}' +
    '.pv-count span{display:block;font-family:Arial,sans-serif;font-size:.65rem;letter-spacing:1px;text-transform:uppercase;color:#EABE81;margin-top:2px}' +
    '.product-card.pv-card{outline:2px solid #EABE81;outline-offset:-2px}' +
    '.pv-ribbon{position:absolute;top:15px;left:15px;z-index:2;background:#000;color:#EABE81;font-family:Arial,sans-serif;font-weight:bold;font-size:.8rem;letter-spacing:1px;padding:6px 12px;border-radius:15px}' +
    '.pv-old{color:#aaa;text-decoration:line-through;font-weight:normal;margin-right:.45rem;font-size:.85em}' +
    '.product-price .pv-old{display:block;font-size:1.1rem;margin:0 0 .15rem}' +
    '.pv-until{display:block;text-align:center;font-family:Arial,sans-serif;font-size:.8rem;color:#C089C4;margin:-1rem 0 1.2rem;letter-spacing:.3px}' +
    /* Flyer flotante */
    '.pv-overlay{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;transition:opacity .35s ease}' +
    '.pv-overlay.pv-show{opacity:1}' +
    '.pv-flyer{position:relative;width:100%;max-width:520px;background:#000;color:#fff;border:1px solid #EABE81;border-radius:22px;overflow:hidden;text-align:center;transform:translateY(20px) scale(.96);transition:transform .35s ease;box-shadow:0 30px 80px rgba(0,0,0,.45)}' +
    '.pv-overlay.pv-show .pv-flyer{transform:none}' +
    '.pv-flyer-head{padding:1.4rem 1.2rem .9rem}' +
    '.pv-flyer-head h2{font-family:Georgia,"Times New Roman",serif;font-weight:normal;color:#EABE81;font-size:1.9rem;margin:.5rem 0 .2rem;line-height:1.15}' +
    '.pv-flyer-head p{font-family:Arial,sans-serif;font-size:.85rem;opacity:.8;margin:0}' +
    '.pv-items{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0 1.2rem}' +
    '.pv-item{background:#111;border-radius:14px;overflow:hidden}' +
    '.pv-item img{display:block;width:100%;aspect-ratio:1/1;object-fit:cover}' +
    '.pv-item div{padding:.6rem .4rem .75rem}' +
    '.pv-item h4{font-family:Georgia,"Times New Roman",serif;font-weight:normal;font-size:1rem;margin:0 0 .25rem;color:#fff}' +
    '.pv-item s{display:block;font-family:Arial,sans-serif;font-size:.75rem;color:#888}' +
    '.pv-item strong{display:block;font-family:Georgia,"Times New Roman",serif;font-weight:normal;font-size:1.25rem;color:#EABE81}' +
    '.pv-flyer-count{font-family:Arial,sans-serif;font-size:.85rem;padding:1rem 1rem .4rem;color:#fff}' +
    '.pv-flyer-count b{color:#EABE81;font-weight:bold;letter-spacing:.5px}' +
    '.pv-cta{display:inline-block;margin:.5rem 0 1.3rem;background:linear-gradient(135deg,#C089C4,#d4a6d8);color:#fff;border:none;border-radius:12px;padding:12px 28px;font-family:Georgia,"Times New Roman",serif;font-weight:bold;font-size:1rem;letter-spacing:1px;text-transform:uppercase;cursor:pointer}' +
    '.pv-close{position:absolute;top:10px;right:12px;width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.08);color:#fff;font-size:22px;line-height:1;cursor:pointer}' +
    '.pv-bar{height:4px;background:#EABE81;width:100%;transform-origin:left;animation:pvBar ' + FLYER_MS + 'ms linear forwards}' +
    '@keyframes pvBar{from{transform:scaleX(1)}to{transform:scaleX(0)}}' +
    '@media(max-width:768px){.pv-banner{padding:1.3rem 1.2rem;margin:0 10px 1.5rem}.pv-banner h3{font-size:1.4rem}.pv-count div{min-width:0;flex:1}.pv-count{width:100%}}' +
    '@media(max-width:420px){.pv-flyer-head h2{font-size:1.5rem}.pv-item h4{font-size:.9rem}.pv-item strong{font-size:1.1rem}}';

  var style = document.createElement('style');
  style.id = 'pv-style';
  style.textContent = css;
  document.head.appendChild(style);

  // ---------- Reloj ----------
  function restante() {
    var ms = Math.max(0, FIN - Date.now());
    var s = Math.floor(ms / 1000);
    return { ms: ms, d: Math.floor(s / 86400), h: Math.floor(s % 86400 / 3600), m: Math.floor(s % 3600 / 60), s: s % 60 };
  }

  var grid = document.getElementById('productsGrid');
  var cards = [];
  var undo = [];
  var banner = null;
  var overlay = null;

  // ---------- Sección fijada arriba del catálogo ----------
  if (grid) {
    CODES.slice().reverse().forEach(function (code) {
      var card = grid.querySelector('.product-card[data-code="' + code + '"]');
      if (!card) return;
      cards.unshift(card);
      var next = card.nextSibling;
      undo.push(function () { grid.insertBefore(card, next); });
      grid.insertBefore(card, grid.firstChild);
    });

    cards.forEach(function (card) {
      card.classList.add('pv-card');
      var ribbon = document.createElement('div');
      ribbon.className = 'pv-ribbon';
      ribbon.textContent = '-' + DESC + '% hasta el viernes';
      card.insertBefore(ribbon, card.firstChild);

      var priceEls = card.querySelectorAll('[data-promo-price]');
      Array.prototype.forEach.call(priceEls, function (el) {
        var before = el.innerHTML;
        var original = el.textContent.replace('Desde', '').trim();
        var nuevo = money(parseInt(el.getAttribute('data-promo-price'), 10));
        el.innerHTML = el.classList.contains('product-price')
          ? '<span class="pv-old">Antes ' + original + '</span>Desde ' + nuevo
          : '<span class="pv-old">' + original + '</span>' + nuevo;
        undo.push(function () { el.innerHTML = before; });
      });

      var price = card.querySelector('.product-price');
      if (price) {
        var until = document.createElement('span');
        until.className = 'pv-until';
        until.textContent = 'Precio con ' + DESC + '% de descuento · hasta el viernes 6:00 p. m.';
        price.parentNode.insertBefore(until, price.nextSibling);
        undo.push(function () { until.remove(); });
      }

      var btn = card.querySelector('.product-button');
      if (btn) {
        var oc = btn.getAttribute('onclick');
        var name = card.getAttribute('data-name');
        btn.setAttribute('onclick', oc.replace("'" + name + "'", "'" + name + " con el " + DESC + "% de descuento'"));
        undo.push(function () { btn.setAttribute('onclick', oc); });
      }
      undo.push(function () { card.classList.remove('pv-card'); ribbon.remove(); });
    });

    if (cards.length) {
      banner = document.createElement('div');
      banner.className = 'pv-banner';
      banner.id = 'promo-viernes';
      banner.innerHTML =
        '<div><span class="pv-tag">' + DESC + '% de descuento</span>' +
        '<h3>Destacados de la semana</h3>' +
        '<p>Corazón Doble Dulzura y Sol y Amor con ' + DESC + '% de descuento, solo hasta el viernes 30 de octubre a las 6:00 p. m.</p></div>' +
        '<div class="pv-count" aria-label="Tiempo restante">' +
        '<div><b data-u="d">0</b><span>días</span></div>' +
        '<div><b data-u="h">00</b><span>horas</span></div>' +
        '<div><b data-u="m">00</b><span>min</span></div>' +
        '<div><b data-u="s">00</b><span>seg</span></div></div>';
      grid.parentNode.insertBefore(banner, grid);
    }
  }

  // ---------- Flyer flotante (se cierra solo a los 4 s) ----------
  function abrirFlyer() {
    overlay = document.createElement('div');
    overlay.className = 'pv-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Promoción hasta el viernes');
    overlay.innerHTML =
      '<div class="pv-flyer">' +
      '<button class="pv-close" type="button" aria-label="Cerrar">&times;</button>' +
      '<div class="pv-flyer-head"><span class="pv-tag">' + DESC + '% de descuento</span>' +
      '<h2>Solo hasta el viernes</h2><p>Arreglos destacados de Únicas Boutique Floral</p></div>' +
      '<div class="pv-items">' +
      '<div class="pv-item"><img src="unicas_fotos/59.webp" alt="Corazón Doble Dulzura"><div><h4>Corazón Doble Dulzura</h4><s>Desde $190.000</s><strong>Desde $167.000</strong></div></div>' +
      '<div class="pv-item"><img src="unicas_fotos/60.webp" alt="Sol y Amor"><div><h4>Sol y Amor</h4><s>Desde $167.500</s><strong>Desde $147.000</strong></div></div>' +
      '</div>' +
      '<div class="pv-flyer-count">Termina en <b data-f="1"></b></div>' +
      (banner ? '<button class="pv-cta" type="button">Ver la promoción</button>' : '<div style="height:1rem"></div>') +
      '<div class="pv-bar"></div></div>';
    document.body.appendChild(overlay);
    requestAnimationFrame(function () { overlay.classList.add('pv-show'); });

    var timer = setTimeout(cerrarFlyer, FLYER_MS);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.classList.contains('pv-close')) { clearTimeout(timer); cerrarFlyer(); }
      if (e.target.classList.contains('pv-cta')) {
        clearTimeout(timer); cerrarFlyer();
        banner.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { clearTimeout(timer); cerrarFlyer(); } });
    pintar();
  }

  function cerrarFlyer() {
    if (!overlay) return;
    var o = overlay; overlay = null;
    o.classList.remove('pv-show');
    setTimeout(function () { o.remove(); }, 350);
  }

  // ---------- Contador en vivo; al llegar a cero se retira todo solo ----------
  function pintar() {
    var t = restante();
    if (t.ms <= 0) { terminar(); return; }
    if (banner) {
      banner.querySelector('[data-u="d"]').textContent = t.d;
      banner.querySelector('[data-u="h"]').textContent = pad(t.h);
      banner.querySelector('[data-u="m"]').textContent = pad(t.m);
      banner.querySelector('[data-u="s"]').textContent = pad(t.s);
    }
    var f = overlay && overlay.querySelector('[data-f]');
    if (f) f.textContent = (t.d ? t.d + 'd ' : '') + pad(t.h) + 'h ' + pad(t.m) + 'm ' + pad(t.s) + 's';
  }

  var intervalo = setInterval(pintar, 1000);

  function terminar() {
    clearInterval(intervalo);
    cerrarFlyer();
    if (banner) banner.remove();
    while (undo.length) undo.pop()();
    style.remove();
  }

  pintar();
  setTimeout(abrirFlyer, 400);
})();
