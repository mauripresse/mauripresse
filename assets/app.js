/* En-tête, pied de page, méga-menu, panier — communs à toutes les pages. */
document.documentElement.classList.add("js");

(function () {
  const TOP = ["cartes-de-visite", "flyers-tracts", "affiche-poster", "etiquettes-autocollants", "vinyle-adhesif", "roll-up-kakemono", "signaletique-enseignes", "reprographie"];
  const cat = (id) => CATS.find((c) => c.id === id);
  const icon = {
    search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    bolt: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>',
    user: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    bag: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    wa: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5Z"/></svg>',
  };

  /* Ouvert / fermé (Lun–Sam 9h–19h30, heure de Paris) */
  function openNow() {
    try {
      const f = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Paris", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
      const g = (t) => f.find((x) => x.type === t).value;
      const m = +g("hour") * 60 + +g("minute");
      return g("weekday") !== "Sun" && m >= 540 && m < 1170;
    } catch (e) { return null; }
  }
  const on = openNow();
  const status = on == null ? "" : on ? '<span><i class="dot"></i><strong>Atelier ouvert</strong> jusqu\'à 19h30</span>' : '<span><i class="dot dot--off"></i><strong>Atelier fermé</strong> · urgences au ' + SHOP.urgent + "</span>";

  const header = `
  <div class="topbar"><div class="wrap">
    <div class="topbar__left">${status}<span>Lun – Sam · 9h – 19h30</span><span>${SHOP.address}</span></div>
    <a href="${SHOP.telHref}"><strong>${SHOP.tel}</strong></a>
  </div></div>
  <header class="header">
    <div class="wrap header__main">
      <a class="logo" href="index.html" aria-label="Mauri Presse — accueil"><img src="${IMG}mauri_logo.png" alt="Mauri Presse" width="195" height="40"></a>
      <form class="search" action="catalogue.html" role="search">
        <label class="sr" for="q">Rechercher un produit</label>
        <input id="q" name="q" type="search" placeholder="Que cherchez-vous ? Roll-up, flyers, étiquettes…" autocomplete="off">
        <button aria-label="Rechercher">${icon.search}</button>
        <div class="suggest" data-suggest role="listbox" aria-label="Suggestions"></div>
      </form>
      <div class="header__actions">
        <a class="hlink hlink--express" href="catalogue.html?express=1">${icon.bolt}<span class="lbl">Express 24h</span></a>
        <a class="hlink" href="contact.html"><span class="lbl">Devis sur mesure</span></a>
        <a class="hlink hlink--acc" href="compte.html" aria-label="Mon compte">${icon.user}<span class="lbl">Compte</span></a>
        <button class="hlink" data-cart-open aria-label="Ouvrir le panier">${icon.bag}<span class="lbl">Panier</span><span class="cart-count" data-cart-count>0</span></button>
      </div>
    </div>
    <nav class="nav" aria-label="Catégories"><div class="wrap">
      <button class="nav__all" data-mega-toggle aria-expanded="false"><i class="bars"></i>Tous les produits</button>
      <div class="nav__links">${[...TOP, ...CATS.map((c) => c.id).filter((id) => !TOP.includes(id))].map((id) => `<a href="categorie.html?c=${id}" data-cat="${id}">${esc(cat(id).name)}</a>`).join("")}</div>
      <div class="nav__urgent">Urgence soir & dimanche · <a href="${SHOP.urgentHref}">${SHOP.urgent}</a></div>
    </div></nav>
    <div class="sub" data-sub></div>
    <div class="mega" data-mega><div class="wrap mega__grid">
      ${CATS.map((c, i) => `<div><h4><span>${String(i + 1).padStart(2, "0")}</span><a href="categorie.html?c=${c.id}">${esc(c.name)}</a></h4><ul>${c.items.slice(0, 6).map((it) => `<li><a href="${itemHref(it)}">${esc(itemName(it))}</a></li>`).join("")}${c.items.length > 6 ? `<li><a href="categorie.html?c=${c.id}">Tout voir →</a></li>` : ""}</ul></div>`).join("")}
    </div></div>
  </header>`;

  const footer = `
  <footer class="footer"><div class="wrap">
    <div class="footer__big">Bon à tirer<span>.</span></div>
    <div class="footer__grid">
      <div>
        <img class="footer__logo" src="${IMG}mauri_logo_white.png" alt="Mauri Presse" width="185" height="38">
        <p>Imprimerie offset & numérique, reprographie et signalétique.<br>${SHOP.address}.</p>
        <p style="margin-top:14px"><a href="${SHOP.telHref}"><strong style="color:#fff">${SHOP.tel}</strong></a><br><a href="mailto:${SHOP.mail}">${SHOP.mail}</a></p>
        <div class="sdots" data-social="dots"></div>
      </div>
      <div><h4>Produits</h4><ul>${TOP.slice(0, 6).map((id) => `<li><a href="categorie.html?c=${id}">${esc(cat(id).name)}</a></li>`).join("")}<li><a href="catalogue.html">Tout le catalogue →</a></li></ul></div>
      <div><h4>L'atelier</h4><ul>
        <li>Lundi au samedi : 9h – 19h30</li>
        <li>Urgences sur devis : 20h – 23h et le dimanche</li>
        <li><a href="${SHOP.urgentHref}">${SHOP.urgent}</a></li>
        <li><a href="index.html#acces">Plan d'accès</a></li>
        <li><a href="contact.html">Demander un devis</a></li>
        <li><a href="compte.html">Mon compte</a></li>
      </ul></div>
      <div><h4>Paiements acceptés</h4><div class="pay"><span>Espèces</span><span>CB</span><span>Visa</span><span>Mastercard</span><span>Virement</span><span>PayPal</span></div></div>
    </div>
    <div class="footer__bottom"><span>© ${new Date().getFullYear()} Mauri Presse. Tous droits réservés.</span><span class="cmyk" aria-hidden="true"><i></i><i></i><i></i><i></i></span></div>
  </div></footer>
  <a class="wa" href="${SHOP.wa}" target="_blank" rel="noopener" aria-label="Écrire sur WhatsApp">${icon.wa}<span>WhatsApp</span></a>
  <div class="drawer" data-drawer aria-hidden="true">
    <div class="drawer__veil" data-cart-close></div>
    <aside class="drawer__panel" role="dialog" aria-label="Panier">
      <div class="drawer__head"><h3>Votre panier</h3><button class="x" data-cart-close aria-label="Fermer">✕</button></div>
      <div class="drawer__body" data-cart-lines></div>
      <div class="drawer__foot">
        <div class="total"><span>Total HT</span><b data-cart-total>0,00 €</b></div>
        <a class="btn btn--cyan btn--block" href="panier.html">Voir le panier et commander <span class="arrow">→</span></a>
      </div>
    </aside>
  </div>
  <div class="toast" data-toast role="status"></div>`;

  document.getElementById("site-header").outerHTML = header;
  document.addEventListener("DOMContentLoaded", () => {
    document.body.insertAdjacentHTML("beforeend", footer);
    init();
  });

  /* ---------- Panier (localStorage) ---------- */
  const KEY = "mp_cart";
  const Cart = {
    get() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } },
    set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} this.render(); },
    add(line) { const c = this.get(); c.push(line); this.set(c); toast("Ajouté au panier"); this.open(); document.querySelectorAll("[data-cart-count]").forEach((e) => { e.classList.remove("is-new"); void e.offsetWidth; e.classList.add("is-new"); }); },
    remove(i) { const c = this.get(); c.splice(i, 1); this.set(c); },
    open() { const d = document.querySelector("[data-drawer]"); d.classList.add("is-open"); d.setAttribute("aria-hidden", "false"); },
    close() { const d = document.querySelector("[data-drawer]"); d.classList.remove("is-open"); d.setAttribute("aria-hidden", "true"); },
    render() {
      const c = this.get();
      document.querySelectorAll("[data-cart-count]").forEach((e) => (e.textContent = c.length));
      const box = document.querySelector("[data-cart-lines]");
      if (!box) return;
      box.innerHTML = c.length
        ? c.map((l, i) => `<div class="line"><h4>${esc(l.name)}</h4><b>${eur(l.price)}</b><p>${esc(l.detail)}</p><button data-rm="${i}">Retirer</button></div>`).join("")
        : '<p class="empty">Votre panier est vide.<br><a href="catalogue.html" style="text-decoration:underline">Parcourir le catalogue</a></p>';
      document.querySelector("[data-cart-total]").textContent = eur(c.reduce((s, l) => s + l.price, 0));
    },
  };
  window.Cart = Cart;

  let tt;
  function toast(msg) {
    const t = document.querySelector("[data-toast]");
    t.textContent = msg; t.classList.add("is-on");
    clearTimeout(tt); tt = setTimeout(() => t.classList.remove("is-on"), 2200);
  }
  window.toast = toast;
  window.bump = (el) => { if (!el) return; el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); };

  function init() {
    Cart.render();

    /* Réseaux sociaux : pastilles (pied de page, contact) ou grandes cartes (accueil) */
    const SOC = {
      instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/>',
      tiktok: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.4 2.7 2.2 4.6 5 5"/>',
      facebook: '<path d="M14 8.5V7a1.5 1.5 0 0 1 1.5-1.5H17V3h-2.5A4 4 0 0 0 10.500 7v1.500H8V11h2.500v10H14V11h2.600l.4-2.500z"/>',
    };
    const sicon = (k) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${SOC[k].replace(/(\.\d*?)0+(?=\D|$)/g, "$1").replace(/\.(?=\D|$)/g, "")}</svg>`;
    document.querySelectorAll("[data-social]").forEach((box) => {
      box.innerHTML = SHOP.social.map((s) => box.dataset.social === "cards"
        ? `<a class="social social--${s.id}" href="${s.url}" target="_blank" rel="noopener"><span class="social__ico">${sicon(s.id)}</span><div><h3>${s.name}</h3><p>${esc(s.handle)}</p></div><span class="tile__go">→</span></a>`
        : `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name} — ${esc(s.handle)}" title="${s.name}">${sicon(s.id)}</a>`).join("");
    });
    const mega = document.querySelector("[data-mega]"), tog = document.querySelector("[data-mega-toggle]");
    const setMega = (v) => { mega.classList.toggle("is-open", v); tog.setAttribute("aria-expanded", v); };
    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-mega-toggle]")) return setMega(!mega.classList.contains("is-open"));
      if (!e.target.closest("[data-mega]") || e.target.closest("a")) setMega(false);
      if (e.target.closest("[data-cart-open]")) Cart.open();
      if (e.target.closest("[data-cart-close]")) Cart.close();
      const rm = e.target.closest("[data-rm]");
      if (rm) Cart.remove(+rm.dataset.rm);
    });
    /* Sous-menu au survol d'une catégorie (ordinateur uniquement) */
    const sub = document.querySelector("[data-sub]"), hdr = document.querySelector(".header");
    const desktop = window.matchMedia("(hover: hover) and (min-width: 1021px)");
    const hideSub = () => { sub.classList.remove("is-open"); hdr.querySelectorAll(".nav__links a.is-on").forEach((a) => a.classList.remove("is-on")); };
    hdr.querySelectorAll(".nav__links a").forEach((a) => a.addEventListener("mouseenter", () => {
      if (!desktop.matches) return;
      const c = cat(a.dataset.cat);
      setMega(false); hideSub(); a.classList.add("is-on");
      sub.innerHTML = `<div class="wrap sub__grid">
        <div><span class="mono" style="color:var(--cyan)">${String(CATS.indexOf(c) + 1).padStart(2, "0")}</span><h4>${esc(c.name)}</h4><p>${esc(c.blurb)}</p>
          <a class="btn btn--sm" href="categorie.html?c=${c.id}">Voir toute la famille <span class="arrow">→</span></a></div>
        <ul>${c.items.map((it) => `<li><a href="${itemHref(it)}">${esc(itemName(it))}${typeof it !== "string" ? ' <span class="pill">24h</span>' : ""}</a></li>`).join("")}</ul>
      </div>`;
      sub.classList.add("is-open");
    }));
    hdr.addEventListener("mouseleave", hideSub);
    tog.addEventListener("mouseenter", hideSub);
    hdr.querySelector(".header__main").addEventListener("mouseenter", hideSub);

    /* Suggestions de recherche */
    const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const INDEX = CATS.flatMap((c) => [{ n: c.name, k: "Famille", h: "categorie.html?c=" + c.id }, ...c.items.map((it) => ({ n: itemName(it), k: c.name, h: itemHref(it) }))]).map((x) => ({ ...x, s: norm(x.n + " " + x.k) }));
    const q = document.getElementById("q"), sug = document.querySelector("[data-suggest]");
    const hideSug = () => sug.classList.remove("is-open");
    q.addEventListener("input", () => {
      const v = norm(q.value.trim());
      if (v.length < 2) return hideSug();
      const words = v.split(/\s+/), hits = INDEX.filter((x) => words.every((w) => x.s.includes(w))).slice(0, 7);
      sug.innerHTML = hits.length
        ? hits.map((x) => `<a href="${x.h}" role="option"><b>${esc(x.n)}</b><span>${esc(x.k)}</span></a>`).join("") + `<a class="suggest__all" href="catalogue.html?q=${encodeURIComponent(q.value.trim())}">Voir tous les résultats →</a>`
        : `<p>Aucun produit trouvé. <a href="contact.html?produit=${encodeURIComponent(q.value.trim())}">Demander un devis →</a></p>`;
      sug.classList.add("is-open");
    });
    q.addEventListener("focus", () => { if (sug.innerHTML && q.value.trim().length > 1) sug.classList.add("is-open"); });
    document.addEventListener("click", (e) => { if (!e.target.closest(".search")) hideSug(); });

    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { setMega(false); Cart.close(); hideSub(); hideSug(); } });

    /* Apparition au défilement */
    /* Apparition en cascade des grilles et listes */
    document.querySelectorAll(".bento, .socials, .fams, .stats, .fxlist, .cats, .products, .works, .steps, .items, .specs, .info, .chips, #p-lines, .hero__facts").forEach((box) => {
      box.classList.add("stagger");
      [...box.children].forEach((el, i) => el.style.setProperty("--i", Math.min(i, 11)));
    });
    const els = document.querySelectorAll(".reveal, .stagger");

    /* Effets liés au défilement : barre de progression, tampon qui tourne, image qui glisse, en-tête qui se range */
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.body.insertAdjacentHTML("afterbegin", '<div class="progress" aria-hidden="true"></div>');
      const bar = document.querySelector(".progress"), head = document.querySelector(".header");
      const stamp = document.querySelector(".hero__stamp"), himg = document.querySelector(".hero__img img");
      let last = 0, tick = false;
      const onScroll = () => {
        tick = false;
        const y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
        if (stamp && y < 1400) stamp.style.transform = `rotate(${10 + y * 0.18}deg)`;
        if (himg && y < 1400) himg.style.transform = `translateY(${y * 0.06}px) scale(1.12)`;
        const busy = mega.classList.contains("is-open") || document.activeElement === document.getElementById("q");
        head.classList.toggle("header--away", window.innerWidth <= 720 && !busy && y > 220 && y > last + 4);
        if (y < last - 4 || y <= 220) head.classList.remove("header--away");
        last = y;
      };
      window.addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
      onScroll();
    }
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("is-in"); io.unobserve(x.target); } }), { rootMargin: "0px 0px -8% 0px" });
      els.forEach((e) => io.observe(e));
    } else els.forEach((e) => e.classList.add("is-in"));
    /* Filet de sécurité : rien ne doit rester invisible si l'observateur ne se déclenche pas */
    const sweep = () => els.forEach((e) => {
      if (e.classList.contains("is-in")) return;
      const r = e.getBoundingClientRect();
      if (r.width && r.top < window.innerHeight * 0.95 && r.bottom > 0) e.classList.add("is-in");
    });
    let sw = false;
    window.addEventListener("scroll", () => { if (!sw) { sw = true; setTimeout(() => { sw = false; sweep(); }, 180); } }, { passive: true });
    window.addEventListener("load", sweep);
    setTimeout(sweep, 600);
  }
})();
