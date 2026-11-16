/* Données du site — catalogue repris de mauripresse.com.
   ⚠️ TARIFS : la grille « Cartes de visite » reprend celle du calculateur actuel.
   Les grilles Flyers et Roll-up ainsi que les majorations d'options sont
   INDICATIVES et doivent être remplacées par les vrais tarifs de l'atelier. */

const IMG = "https://mauripresse.com/images/"; /* logo uniquement */

/* Photos libres de droits (Unsplash, licence gratuite), choisies pour correspondre à chaque produit */
const PH = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const PHOTOS = {
  hero: "1777652918682-dec5c79d1301",         // remise de carte de visite en main propre
  atelier: "1503694978374-8a2fa686963a",       // presse offset en marche
  grandformat: "1693031630369-bd429a57f115",   // imprimante grand format
  cmyk: "1715154470884-1c2be0b0129f",          // compte-fils sur charte CMJN
  papiers: "1750537735437-847075c29538",       // stock de papiers colorés
  cartes: "1777652918753-d66882b15391", // deux cartes de visite sur bois
  flyers: "1784217066842-508f135591ff", // flyer imprimé sur table
  depliants: "1769893715447-8f12c382e49c",     // dépliants pliés
  brochures: "1658863025658-4a259cc68fc9",     // brochures et livres imprimés
  affiches: "1572188863110-46d457c9234d", // affiches encadrées
  papeterie: "1520764588094-8fc067746a8e",     // papeterie d'entreprise
  etiquettes: "1758799012068-9235d4181456", // mur d'autocollants
  vinyle: "1769437541941-22aaaef1247c", // lettrage adhésif sur vitrine
  rollup: "1761225646548-bc92fea0dc72",        // stand avec visuel imprimé
  signaletique: "1754326450638-840ba690a379", // enseigne suspendue
  rigide: "1543487945-139a97f387d5",           // affiche encadrée
  plv: "1761195689615-9469b65dac01",           // salon professionnel
  packaging: "1648587456176-4969b0124b12", // emballages kraft personnalisés
  textile: "1456456496250-d5e7c0a9b44d",       // sérigraphie textile
  reprographie: "1650094980833-7373de26feb6",  // copieur
  sacs: "1548863227-3af567fc3b27",             // tote bag imprimé
};
const CAT_PHOTO = {
  "reprographie": "reprographie", "cartes-de-visite": "cartes", "flyers-tracts": "flyers", "depliants-plaquettes": "depliants",
  "catalogue-brochures": "brochures", "affiche-poster": "affiches", "papeterie-bureautique": "papeterie", "etiquettes-autocollants": "etiquettes",
  "vinyle-adhesif": "vinyle", "roll-up-kakemono": "rollup", "signaletique-enseignes": "signaletique", "support-rigide": "rigide",
  "plv-expo": "plv", "objets-packaging": "packaging",
};
const catPhoto = (id, w) => PH(PHOTOS[CAT_PHOTO[id]] || PHOTOS.atelier, w);

const SHOP = {
  tel: "01 47 70 79 24", telHref: "tel:0147707924",
  urgent: "07 83 46 02 17", urgentHref: "tel:0783460217",
  wa: "https://api.whatsapp.com/send?phone=33783460217&text=Bonjour%20Mauri%20Presse",
  mail: "mauripresse24@gmail.com",
  /* Réception des formulaires (FormSubmit). Après activation, on peut remplacer l'adresse par la clé fournie. */
  formKey: "",
  /* Paiement en ligne : à remplir quand les comptes existent (sinon seul le paiement à l'atelier est proposé).
     paypal = identifiant PayPal.me ; stripe = lien de paiement Stripe (Payment Link). */
  pay: { paypal: "", stripe: "" },
  address: "24 Rue de Chabrol, 75010 Paris",
  social: [
    { id: "instagram", name: "Instagram", handle: "@mauripresse", url: "https://www.instagram.com/mauripresse/" },
    { id: "tiktok", name: "TikTok", handle: "@mauripresse24", url: "https://www.tiktok.com/@mauripresse24" },
    { id: "facebook", name: "Facebook", handle: "Mauri Presse", url: "https://www.facebook.com/p/Mauri-Presse-100060693466237/" },
  ],
};

/* Produits configurables en ligne.
   Données recopiées telles quelles du site officiel mauripresse.com (relevé du 13/11/2026) :
   formats, options, quantités, délais et prix HT. Rien n'est estimé ici. */
const PRODUCTS = {
  /* Fiche produit officielle : /produit/cartes-de-visite-cartes-de-visite-classiques
     Prix fixés par quantité et par délai ; les options n'ont pas de supplément. */
  cartes: {
    name: "Cartes de visite classiques",
    cat: "Cartes de visite", catId: "cartes-de-visite",
    img: PH(PHOTOS.cartes),
    desc: "Support incontournable de votre communication professionnelle. Formats sur-mesure et finitions personnalisées haut de gamme.",
    qty: [100, 250, 500],
    defQty: 100, defDeliv: "j5",
    deliv: [
      { id: "day", label: "Livraison jour même", sub: "Paris & IDF · + frais", short: "Jour même", days: 0, paid: true, prices: [30, 50, 80] },
      { id: "j5", label: "Livraison 5 jours", sub: "Standard", short: "5 jours", days: 5, prices: [25, 40, 60] },
    ],
    groups: [
      { id: "format", label: "Format & dimensions", options: [
        { label: "8,50 × 5,50 cm", hint: "Standard" },
        { label: "9,00 × 5,00 cm", hint: "Standard" },
        { label: "8,50 × 5,00 cm", hint: "Standard" },
      ]},
      { id: "orientation", label: "Orientation", options: [
        { label: "Verticale" }, { label: "Horizontale" },
      ]},
      { id: "papier", label: "Papier", options: [
        { label: "Classic demimatt – Couché mat" },
        { label: "Classic gloss – Couché brillant" },
      ]},
      { id: "grammage", label: "Type de papier & grammage", options: [
        { label: "Classic Demimatt – Couché mat (170 g)" },
        { label: "Classic Gloss – Couché brillant (170 g)" },
        { label: "Papier couché épais (350 g)" },
        { label: "Papier recyclé extra-blanc (160 g)" },
      ]},
      { id: "finition", label: "Pelliculage & finition", options: [
        { label: "Sans pelliculage (standard)" },
        { label: "Pelliculage mat soft-touch", hint: "Toucher velours" },
        { label: "Pelliculage brillant", hint: "Couleurs éclatantes" },
        { label: "Vernis sélectif 3D / dorure or" },
      ]},
    ],
  },

  /* Calculateur officiel : /calculator
     Prix HT = base(quantité) × délai × options, + 3,50 € si contrôle par un graphiste. */
  classic: {
    name: "Cartes de Visite Classic",
    cat: "Cartes de visite", catId: "cartes-de-visite",
    img: PH(PHOTOS.hero),
    desc: "Support incontournable de votre communication professionnelle. Papier couché 350 g, formats standards et finitions personnalisées.",
    qty: [100, 250, 500, 1000, 2500, 5000, 10000],
    base: [19, 24, 28, 38, 65, 110, 195],
    defQty: 500, defDeliv: "standard",
    deliv: [
      { id: "eco", label: "Livraison éco", sub: "5 – 6 jours · meilleur prix", short: "Éco 5-6 jours", days: 6, mult: 1 },
      { id: "standard", label: "Livraison standard", sub: "3 – 4 jours", short: "3 – 4 jours", days: 4, mult: 1.1 },
      { id: "express", label: "Livraison express", sub: "24 / 48 h", short: "Express 24/48h", days: 2, mult: 1.25 },
      { id: "pickup", label: "Retrait atelier", sub: "Même jour · Paris 10e", short: "Jour même", days: 0, mult: 1.35 },
    ],
    groups: [
      { id: "format", label: "Format & dimensions", options: [
        { label: "8,5 × 5,5 cm", hint: "Standard CB" },
        { label: "9,0 × 5,0 cm", hint: "Allongé", mult: 1.05 },
        { label: "8,5 × 5,0 cm", hint: "Format italien" },
        { label: "5,5 × 5,5 cm", hint: "Format carré", mult: 1.1 },
      ]},
      { id: "orientation", label: "Orientation", options: [
        { label: "Horizontale" }, { label: "Verticale" },
      ]},
      { id: "impression", label: "Indications d'impression", options: [
        { label: "Impression sur le recto" },
        { label: "Recto/verso identiques", mult: 1.2 },
        { label: "Recto/verso différents", mult: 1.25 },
      ]},
      { id: "papier", label: "Type de papier & grammage", options: [
        { label: "Couché demi-mat 350 g", hint: "Aspect satiné haut de gamme, tenue en main rigide et soignée." },
        { label: "Couché brillant 350 g", hint: "Finition glacée renforçant la vivacité et le contraste des couleurs." },
        { label: "Kraft brun naturel 300 g", hint: "Papier recyclé non blanchi, style vintage & éco-responsable.", mult: 1.15 },
      ]},
      { id: "finition", label: "Finition & pelliculage", options: [
        { label: "Sans pelliculage" },
        { label: "Mat soft-touch", hint: "Toucher velours", mult: 1.2 },
        { label: "Pelliculage brillant", mult: 1.15 },
      ]},
      { id: "coins", label: "Découpe des coins", options: [
        { label: "Coins carrés standards" },
        { label: "Coins arrondis", hint: "Rayon 4 mm", mult: 1.12 },
      ]},
      { id: "controle", label: "Vérification de fichier", options: [
        { label: "Vérification standard automatisée", hint: "Contrôle basique des dimensions et du format (gratuit)." },
        { label: "Contrôle professionnel par un graphiste + BAT numérique", hint: "Vérification manuelle des polices, fonds perdus, colorimétrie CMJN.", add: 3.5 },
      ]},
    ],
  },
};

/* Catalogue complet (catégories et produits du site actuel).
   Un produit avec `p` ouvre le configurateur ; les autres partent en devis. */
const CATS = [
  { id: "reprographie", name: "Reprographie", blurb: "Copies, impressions et reliures minute.", items: ["Photocopie", "Impression", "Reliures", "Scan et numérisation", "Plastification"] },
  { id: "cartes-de-visite", name: "Cartes de visite", blurb: "Classiques, pelliculées, Deluxe ou PVC.", items: [{ n: "Cartes de visite classiques", p: "cartes" }, { n: "Cartes de Visite Classic", p: "classic" }, "Cartes de visite pelliculées", "Cartes de fidélité", "Cartes de visite finitions Deluxe", "Cartes de visite en PVC", "Cartes de correspondance", "Cartes postales"] },
  { id: "flyers-tracts", name: "Flyers & tracts", blurb: "Du A6 au A3, pour vos événements et opérations commerciales.", items: [{ n: "Flyers & tracts", from: 14.9, f: "flyers" }, { n: "Flyer A6", f: "flyers", t: 0 }, { n: "Flyer 10×15 cm", f: "flyers", t: 1 }, { n: "Flyer DL 10×21 cm", f: "flyers", t: 2 }, { n: "Flyer A5", f: "flyers", t: 3 }, { n: "Flyer A4", f: "flyers", t: 4 }, { n: "Flyer A3", f: "flyers", t: 5 }] },
  { id: "depliants-plaquettes", name: "Dépliants & plaquettes", blurb: "1, 2 ou 3 plis pour vos présentations.", items: [{ n: "Dépliant 1 pli", f: "depliants", t: 0 }, { n: "Dépliant 2 plis roulés", f: "depliants", t: 2 }, { n: "Dépliant 2 plis accordéon", f: "depliants", t: 3 }] },
  { id: "catalogue-brochures", name: "Catalogues & brochures", blurb: "Agrafé, spirale, dos carré collé.", items: ["Brochure agrafée", "Spirale métallique", "Dos carré collé", "Couverture rigide"] },
  { id: "affiche-poster", name: "Affiches & posters", blurb: "À l'unité ou en série, jusqu'à l'Abribus.", items: ["Affiches à l'unité", "Affiches petit format", "Affiche grand format", "Affiche Abribus", "Affiche dos bleu", "Affiche fluo", "Affiche autocollante", "Affiche backlight"] },
  { id: "papeterie-bureautique", name: "Papeterie & bureautique", blurb: "En-têtes, administratif, plaques gravées.", items: ["Bureautique", "Administratif", "Plaque gravure"] },
  { id: "etiquettes-autocollants", name: "Étiquettes & autocollants", blurb: "Rouleaux, holographiques, imperméables.", items: ["Étiquettes en rouleau standards", "Étiquettes en plastique", "Étiquettes en papier", "Étiquettes avec finitions spéciales", "Étiquettes holographiques", "Étiquettes Premium", "Étiquettes imperméables", "Étiquettes repositionnables"] },
  { id: "vinyle-adhesif", name: "Vinyle adhésif", blurb: "Vitrines, murs, sols et véhicules.", items: ["Adhésifs pour vitrines", "Adhésifs muraux", "Adhésifs pour voitures et motos", "Covering voiture", "Adhésif pour sols", "Lettrage adhésif", "Adhésif vinyle transparent", "Adhésifs dépoli", "Adhésifs microperforé", "Vitrophanie"] },
  { id: "roll-up-kakemono", name: "Roll-up & kakémono", blurb: "Imprimé en 24h, livré dans la journée.", items: [{ n: "Roll-up 80 × 200 cm · Classique", from: 79.99, f: "rollup", t: 0, x: 1 }, { n: "Roll-up 100 × 200 cm · Large", f: "rollup", t: 1, x: 1 }, { n: "Roll-up 120 × 200 cm · XL", f: "rollup", t: 2, x: 1 }, { n: "Roll-up 150 × 200 cm · XXL", f: "rollup", t: 3, x: 1 }, { n: "Roll-up 200 × 200 cm · Géant", f: "rollup", t: 4, x: 1 }] },
  { id: "signaletique-enseignes", name: "Signalétique & enseignes", blurb: "Enseignes, bâches et plaques pro.", items: ["Enseignes extérieures", "Bâches & banderoles PVC", "Plaques professionnelles laiton / alu"] },
  { id: "support-rigide", name: "Supports rigides", blurb: "Panneaux rigides sur mesure.", items: ["Panneaux & supports rigides"] },
  { id: "plv-expo", name: "PLV & expo", blurb: "Stands, présentoirs et PLV.", items: ["PLV, stands & expo"] },
  { id: "objets-packaging", name: "Sacs, objets pub & packaging", blurb: "Textile, goodies et boîtes personnalisées.", items: ["Sacs personnalisés", "Objets publicitaires", "Packaging & boîtes", "Textile personnalisé"] },
];

/* ---------- Utilitaires partagés ---------- */
const eur = (n) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const itemName = (it) => (typeof it === "string" ? it : it.n);
/* Un article est « configurable » s'il a un calculateur (p) ; sinon il part en devis.
   `from` = prix « dès » affiché sur le site officiel pour un article sans calculateur. */
const isConf = (it) => typeof it === "object" && !!it.p;
const itemHref = (it) => (isConf(it) ? "produit.html?p=" + it.p : typeof it === "object" && it.f ? "format.html?p=" + it.f + (it.t != null ? "&t=" + it.t : "") + (it.v ? "&n=" + encodeURIComponent(it.n) : "") : "contact.html?produit=" + encodeURIComponent(itemName(it)));
const delivOf = (key, id) => { const p = PRODUCTS[key]; return p.deliv.find((x) => x.id === id) || p.deliv.find((x) => x.id === p.defDeliv) || p.deliv[0]; };

/* Prix HT d'une configuration, selon les règles du site officiel :
   - grille fixe (prices) : prix(quantité, délai), options sans supplément ;
   - calculateur (base)   : base(quantité) × délai × options + suppléments. */
function computePrice(key, qtyIndex, choices, deliveryId) {
  const p = PRODUCTS[key], d = delivOf(key, deliveryId);
  let price = d.prices ? d.prices[qtyIndex] : p.base[qtyIndex] * d.mult, add = 0;
  p.groups.forEach((g, i) => {
    const o = g.options[choices?.[i] ?? 0] || g.options[0];
    if (o.mult) price *= o.mult;
    if (o.add) add += o.add;
  });
  return Math.round((price + add) * 100) / 100;
}
const fromPrice = (key) => Math.min(...PRODUCTS[key].deliv.map((d) => computePrice(key, 0, null, d.id)));
const itemFrom = (it) => (isConf(it) ? fromPrice(it.p) : (typeof it === "object" && it.from) || null);

/* Pictogrammes des familles (tracés SVG, viewBox 24) */
const CAT_ICONS = {
  "reprographie": '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2"/>',
  "cartes-de-visite": '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 11h5M7 14h3"/><circle cx="16.5" cy="11.5" r="1.5"/>',
  "flyers-tracts": '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  "depliants-plaquettes": '<path d="M3 6l6-2v15l-6 2zM9 4l6 2v15l-6-2M15 6l6-2v15l-6 2"/>',
  "catalogue-brochures": '<path d="M12 6c-2-1.5-5-2-8-1.5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-13c-3-.5-6 0-8 1.5zM12 6v13"/>',
  "affiche-poster": '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M5 16l4-4 3 3 2-2 5 5"/><circle cx="14.5" cy="8" r="1.5"/>',
  "papeterie-bureautique": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  "etiquettes-autocollants": '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="8" cy="8" r="1.5"/>',
  "vinyle-adhesif": '<path d="M4 4h16v10l-6 6H4z"/><path d="M20 14h-4a2 2 0 0 0-2 2v4"/>',
  "roll-up-kakemono": '<rect x="7" y="3" width="10" height="15" rx="1"/><path d="M12 18v3M8 21h8"/>',
  "signaletique-enseignes": '<path d="M12 3v18M5 6h11l3 2.5-3 2.5H5zM8 21h8"/>',
  "support-rigide": '<path d="M12 3l9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/>',
  "plv-expo": '<path d="M4 9l1.5-5h13L20 9M4 9v11h16V9M4 9h16M9 20v-6h6v6"/>',
  "objets-packaging": '<path d="M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2"/>',
};
const catIcon = (id) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${CAT_ICONS[id] || ""}</svg>`;

/* Pictogrammes partagés par le panier (tiroir et page) */
const BAG_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>';
const TRASH_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>';
/* Icône d'une ligne de panier : le pictogramme de sa famille, retrouvé via le nom du produit */
const lineIcon = (name) => { const p = Object.values(PRODUCTS).find((p) => p.name === name); return p ? catIcon(p.catId) : BAG_ICON; };

/* ---------- Produits express (24h) : les cartes configurables et le roll-up ---------- */
const isExpress = (it) => isConf(it) || (typeof it === "object" && !!it.x);

/* ---------- Visuels de roll-up (exemples dessinés, pas des photos) ---------- */
const ROLLUPS = [
  { cls: "ru--tech", tag: "Salon 2026", title: "Tech Days", sub: "Innovation · Stand B12", url: "tech-days.fr" },
  { cls: "ru--resto", tag: "Nouvelle carte", title: "La Table de Clara", sub: "Cuisine maison · Paris 10e", url: "latabledeclara.fr" },
  { cls: "ru--immo", tag: "Agence immobilière", title: "Maison Lumière", sub: "Achat · Vente · Location", url: "maison-lumiere.fr" },
  { cls: "ru--beaute", tag: "Institut", title: "Atelier Rose", sub: "Soins visage & bien-être", url: "atelier-rose.fr" },
  { cls: "ru--mp", tag: "Votre logo ici", title: "Votre roll-up", sub: "Imprimé en 24h", url: "mauripresse.com" },
];
const rollupHTML = (i) => {
  const r = ROLLUPS[i % ROLLUPS.length];
  return `<div class="ru ${r.cls}" aria-hidden="true"><div class="ru__rail"></div><div class="ru__banner">
      <span class="ru__tag">${r.tag}</span><b class="ru__title">${r.title}</b><span class="ru__sub">${r.sub}</span>
      <span class="ru__art"><i></i><i></i><i></i></span><span class="ru__url">${r.url}</span>
    </div><div class="ru__base"></div></div>`;
};

/* Envoi des formulaires par e-mail à l'atelier (service FormSubmit, sans serveur).
   Le tout premier envoi déclenche un e-mail d'activation à SHOP.mail : il faut cliquer dessus une fois. */
async function sendMail(subject, data, file) {
  const fd = new FormData();
  fd.append("_subject", subject);
  fd.append("_template", "table");
  fd.append("_captcha", "false");
  if (data.email) fd.append("_replyto", data.email);
  Object.entries(data).forEach(([k, v]) => { if (v !== "" && v != null) fd.append(k, v); });
  if (file) fd.append("attachment", file);
  const ctrl = new AbortController(), t = setTimeout(() => ctrl.abort(), 20000); /* jamais plus de 20 s d'attente */
  const r = await fetch("https://formsubmit.co/ajax/" + (SHOP.formKey || SHOP.mail), { method: "POST", body: fd, headers: { Accept: "application/json" }, signal: ctrl.signal }).finally(() => clearTimeout(t));
  const j = await r.json().catch(() => ({}));
  if (!r.ok || String(j.success) === "false") throw new Error(j.message || "Envoi impossible");
  return j;
}
const formData = (form) => Object.fromEntries([...new FormData(form)].filter(([, v]) => typeof v === "string"));
const mailError = (el, subject, data) => {
  const body = data ? Object.entries(data).map(([k, v]) => `${k} : ${v}`).join("\n").slice(0, 1800) : "";
  const href = `mailto:${SHOP.mail}?subject=${encodeURIComponent(subject || "Demande")}&body=${encodeURIComponent(body)}`;
  el.innerHTML = `L'envoi automatique n'a pas abouti. <a class="btn btn--cyan btn--sm" href="${href}">Envoyer par e-mail (message déjà rédigé)</a> ou appelez le ${SHOP.tel}.`;
  el.classList.add("is-on", "is-err");
};

/* Espace client : comptes enregistrés dans ce navigateur (mot de passe chiffré en SHA-256). */
const Account = {
  users() { try { return JSON.parse(localStorage.getItem("mp_users") || "{}"); } catch { return {}; } },
  save(u) { localStorage.setItem("mp_users", JSON.stringify(u)); },
  async hash(pw) {
    const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("mauripresse:" + pw));
    return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
  },
  current() { const e = localStorage.getItem("mp_session"); return e ? Object.assign({ email: e }, this.users()[e] || null) : null; },
  async signup(d) {
    const u = this.users(), email = d.email.trim().toLowerCase();
    if (u[email]) throw new Error("Un compte existe déjà avec cet e-mail : connectez-vous.");
    u[email] = { nom: d.nom, societe: d.societe || "", tel: d.tel || "", hash: await this.hash(d.password), orders: [], since: Date.now() };
    this.save(u); localStorage.setItem("mp_session", email);
  },
  async login(email, pw) {
    email = email.trim().toLowerCase();
    const u = this.users()[email];
    if (!u || u.hash !== await this.hash(pw)) throw new Error("E-mail ou mot de passe incorrect.");
    localStorage.setItem("mp_session", email);
  },
  logout() { localStorage.removeItem("mp_session"); },
  addOrder(o) {
    const e = localStorage.getItem("mp_session"), u = this.users();
    if (!e || !u[e]) return;
    u[e].orders = [Object.assign({ date: Date.now() }, o), ...(u[e].orders || [])].slice(0, 50);
    this.save(u);
  },
};

/* ---------- Produits « au format » : roll-up, flyers, dépliants ----------
   Le client choisit une taille (dessinée à l'échelle) et ses options.
   Un prix n'est affiché que s'il est connu ; sinon la demande part en devis. */
const RU_SIZES = [
  { w: 80, h: 200, name: "Classique", use: "Le plus commandé", price: 79.99, star: true },
  { w: 100, h: 200, name: "Large", use: "Salon, accueil" },
  { w: 120, h: 200, name: "XL", use: "Fond de stand" },
  { w: 150, h: 200, name: "XXL", use: "Mur d'image" },
  { w: 200, h: 200, name: "Géant", use: "Scène, grand stand" },
];
const FORMATS = {
  rollup: {
    name: "Roll-up", catId: "roll-up-kakemono", cat: "Roll-up & kakémono", kind: "rollup",
    desc: "Structure aluminium rétractable, bâche haute définition anti-froissement, housse de transport incluse. Imprimé en 24h dans notre atelier.",
    sizes: RU_SIZES.map((s) => ({ label: `${s.w} × ${s.h} cm`, w: s.w, h: s.h, name: s.name, hint: s.use, price: s.price, star: s.star })),
    defSize: 0,
    groups: [
      { id: "structure", label: "Structure", options: [{ label: "Standard aluminium", hint: "Housse incluse" }, { label: "Premium pied large", hint: "Plus stable, bâche interchangeable", quote: true }] },
      { id: "bache", label: "Bâche", options: [{ label: "Polyester anti-froissement 210 g", hint: "Aspect mat, ne gondole pas" }, { label: "PVC opaque 440 g", hint: "Anti-reflets, très couvrant", quote: true }] },
    ],
    qty: [1, 2, 3, 5, 10], unit: "roll-up",
    deliv: [
      { id: "pickup", label: "Retrait à l'atelier", sub: "Prêt en 24h · gratuit" },
      { id: "day", label: "Livraison jour même", sub: "Paris & IDF · tarif selon l'adresse", paid: true },
      { id: "france", label: "Livraison France", sub: "48 – 72 h" },
    ],
  },
  flyers: {
    name: "Flyers & tracts", catId: "flyers-tracts", cat: "Flyers & tracts", kind: "sheet", from: 14.9,
    desc: "Pour vos ouvertures, événements et opérations commerciales. Papier brillant ou mat, recto ou recto/verso, du A6 au A3.",
    sizes: [
      { label: "A6", w: 10.5, h: 14.8, hint: "10,5 × 14,8 cm" },
      { label: "10 × 15 cm", w: 10, h: 15, hint: "Format carte postale" },
      { label: "DL", w: 10, h: 21, hint: "10 × 21 cm · format enveloppe" },
      { label: "A5", w: 14.8, h: 21, hint: "14,8 × 21 cm · le plus commandé", star: true },
      { label: "A4", w: 21, h: 29.7, hint: "21 × 29,7 cm" },
      { label: "A3", w: 29.7, h: 42, hint: "29,7 × 42 cm · affichette" },
    ],
    defSize: 3,
    groups: [
      { id: "papier", label: "Papier", options: [{ label: "Couché brillant 135 g", hint: "Le classique des flyers" }, { label: "Couché mat 170 g", hint: "Plus épais, aspect soigné" }, { label: "Couché 350 g rigide", hint: "Effet carton" }, { label: "Recyclé 120 g" }] },
      { id: "impression", label: "Impression", options: [{ label: "Recto" }, { label: "Recto/verso" }] },
    ],
    qty: [100, 250, 500, 1000, 2500, 5000], unit: "ex.",
    deliv: [
      { id: "pickup", label: "Retrait à l'atelier", sub: "Jour même possible · gratuit" },
      { id: "day", label: "Livraison jour même", sub: "Paris & IDF · tarif selon l'adresse", paid: true },
      { id: "france", label: "Livraison France", sub: "3 – 5 jours" },
    ],
  },
  depliants: {
    name: "Dépliants & plaquettes", catId: "depliants-plaquettes", cat: "Dépliants & plaquettes", kind: "fold",
    desc: "1 ou 2 plis, roulé ou accordéon : présentez votre activité, vos tarifs ou votre menu. Pliage fait à l'atelier.",
    sizes: [
      { label: "A5 fermé", w: 29.7, h: 21, fw: 14.8, folds: 1, pli: "1 pli", hint: "A4 ouvert · 4 pages" },
      { label: "A4 fermé", w: 42, h: 29.7, fw: 21, folds: 1, pli: "1 pli", hint: "A3 ouvert · 4 pages" },
      { label: "DL roulé", w: 29.7, h: 21, fw: 10, folds: 2, pli: "2 plis roulés", hint: "A4 ouvert · 6 volets · le plus commandé", star: true },
      { label: "DL accordéon", w: 29.7, h: 21, fw: 10, folds: 2, pli: "2 plis accordéon", zig: true, hint: "A4 ouvert · 6 volets en Z" },
      { label: "Carré 15 cm", w: 30, h: 15, fw: 15, folds: 1, pli: "1 pli", hint: "30 × 15 cm ouvert" },
    ],
    defSize: 2,
    groups: [
      { id: "papier", label: "Papier", options: [{ label: "Couché brillant 135 g" }, { label: "Couché mat 170 g", hint: "Le plus choisi" }, { label: "Couché mat 250 g", hint: "Plus rigide, rainage inclus" }] },
    ],
    qty: [100, 250, 500, 1000, 2500], unit: "ex.",
    deliv: [
      { id: "pickup", label: "Retrait à l'atelier", sub: "Sous 24 – 48 h · gratuit" },
      { id: "day", label: "Livraison jour même", sub: "Paris & IDF · tarif selon l'adresse", paid: true },
      { id: "france", label: "Livraison France", sub: "3 – 5 jours" },
    ],
  },
};
/* Roll-up dessiné à l'échelle (taille réelle en cm → --w / --h) */
const rollupSized = (i, s) => `<div class="rusz" style="--w:${s.w};--h:${s.h}">${rollupHTML(i)}</div>`;
/* Silhouette humaine de 1,70 m, pour comparer les tailles */
const PERSON_SVG = '<svg class="person" viewBox="0 0 40 170" aria-hidden="true"><circle cx="20" cy="12" r="10"/><path d="M8 28h24l3 60h-7l-1 80h-9l-1-55-1 55h-9l-1-80H5z"/></svg>';

/* ---------- Avis clients (avis Google réels de Mauri Presse, relevés le 16/11/2026) ---------- */
const REVIEWS = {
  rating: "4,9", count: 77,
  url: "https://www.google.com/maps/place/Mauri+Presse/@48.8768922,2.353372,17z",
  list: [
    { name: "Sarah O.", when: "octobre 2026", text: "Vraiment génial : les impressions sont de très belle qualité et l'équipe est très pro et très agréable !" },
    { name: "Alicia T.", when: "août 2026", text: "Service et qualité au rendez-vous ! Merci encore, les stickers ont fait sensation ! Je recommande à 100%", tag: "etiquettes-autocollants" },
    { name: "Louise R.", when: "mai 2026", text: "Le rendu de mes menus de mariage est super ! L'accompagnement de l'équipe était très à l'écoute et aidant.", tag: "flyers-tracts" },
  ],
};
function reviewsHTML(catId) {
  const l = [...REVIEWS.list].sort((a, b) => (b.tag === catId) - (a.tag === catId));
  const stars = '<span class="stars" aria-label="5 étoiles sur 5">★★★★★</span>';
  return `<section class="revs" aria-labelledby="revs-t">
    <div class="revs__head">
      <div><span class="eyebrow eyebrow--cyan">Avis clients</span><h2 id="revs-t">Ils ont imprimé chez nous.</h2></div>
      <a class="revs__score" href="${REVIEWS.url}" target="_blank" rel="noopener"><b>${REVIEWS.rating}</b><span>${stars}<small>${REVIEWS.count} avis Google</small></span></a>
    </div>
    <div class="revs__list">${l.map((r) => `<figure class="rev">${stars}<blockquote>« ${esc(r.text)} »</blockquote><figcaption><b>${esc(r.name)}</b><span>Avis Google · ${esc(r.when)}</span></figcaption></figure>`).join("")}</div>
    <div class="revs__foot"><a class="btn btn--ghost btn--sm" href="${REVIEWS.url}" target="_blank" rel="noopener">Voir les ${REVIEWS.count} avis sur Google <span class="arrow">→</span></a><a class="btn btn--ghost btn--sm" href="${REVIEWS.url}" target="_blank" rel="noopener">Laisser un avis</a></div>
  </section>`;
}

/* ---------- Alignement à l'échelle (roll-up, flyers) ----------
   Chaque élément a sa taille réelle en cm (--w, --h) ; l'échelle --k s'adapte à la largeur disponible. */
function lineupHTML(items, sel = -1, extra = "") {
  const sum = items.reduce((a, b) => a + b.w, 0);
  return `<div class="lineup${sel >= 0 ? " has-sel" : ""}" style="--sum:${sum};--gaps:${items.length - 1}${extra}">${items.map((it, i) => {
    const tag = it.static ? "span" : "button";
    return `<${tag}${it.static ? ' aria-hidden="true"' : ` type="button" data-i="${i}" aria-label="${esc(it.label + " " + (it.sub || ""))}"`} class="lineup__it${i === sel ? " is-on" : ""}${it.cls ? " " + it.cls : ""}">
      <span class="lineup__lbl"><b>${it.label}</b>${it.sub ? `<small>${it.sub}</small>` : ""}</span>
      <span class="lineup__shape" style="--w:${it.w};--h:${it.h}">${it.inner}</span></${tag}>`;
  }).join("")}</div>`;
}
const rollupLineup = (sel = -1) => lineupHTML([
  ...RU_SIZES.map((s, i) => ({ w: s.w, h: s.h, label: `${s.w} × ${s.h}`, sub: s.name + (s.price ? " · " + eur(s.price) : ""), inner: rollupHTML(i), cls: "is-ru" })),
  { w: 42, h: 170, label: "1,70 m", sub: "repère", inner: PERSON_SVG, cls: "is-person", static: true },
], sel);
const sheetArt = '<span class="sheet"><i></i><i></i><i></i><i></i></span>';
const flyerLineup = (sel = -1) => lineupHTML(FORMATS.flyers.sizes.map((s) => ({ w: s.w, h: s.h, label: s.label, sub: s.hint.split(" · ")[0], inner: sheetArt, cls: "is-sheet" })), sel);

/* ---------- Modèles dessinés pour toutes les autres familles (sur devis) ---------- */
(() => {
  const D3 = (sub = "Sous 24 – 72 h") => [
    { id: "pickup", label: "Retrait à l'atelier", sub: sub + " · gratuit" },
    { id: "day", label: "Livraison jour même", sub: "Paris & IDF · tarif selon l'adresse", paid: true },
    { id: "france", label: "Livraison France", sub: "3 – 5 jours" },
  ];
  const opt = (...l) => l.map((x) => (typeof x === "string" ? { label: x } : x));
  const mk = (key, o) => { FORMATS[key] = Object.assign({ kind: "sheet", defSize: 0, deliv: D3(), unit: "ex." }, o); };
  mk("affiches", { name: "Affiches & posters", catId: "affiche-poster", cat: "Affiches & posters", art: "poster", person: true,
    desc: "Affiches à l'unité ou en série, du A3 au format Abribus. Couleurs éclatantes, papier photo, dos bleu ou backlight.",
    sizes: [{ label: "A3", w: 29.7, h: 42, hint: "29,7 × 42 cm" }, { label: "A2", w: 42, h: 59.4, hint: "42 × 59,4 cm" }, { label: "A1", w: 59.4, h: 84.1, hint: "59,4 × 84,1 cm · le plus commandé", star: true }, { label: "A0", w: 84.1, h: 118.9, hint: "84,1 × 118,9 cm" }, { label: "Abribus", w: 120, h: 176, hint: "120 × 176 cm" }],
    defSize: 2, qty: [1, 5, 10, 25, 50, 100],
    groups: [{ id: "papier", label: "Papier", options: opt({ label: "Couché satiné 200 g", hint: "Le standard" }, { label: "Papier photo brillant 260 g" }, { label: "Dos bleu 115 g", hint: "Affichage extérieur" }, { label: "Backlight", hint: "Caisson lumineux" }) }] });
  mk("etiquettes", { name: "Étiquettes & autocollants", catId: "etiquettes-autocollants", cat: "Étiquettes & autocollants", art: "sticker",
    desc: "Stickers et étiquettes ronds, carrés ou rectangulaires : papier, vinyle, holographique ou imperméable, en planche ou en rouleau.",
    sizes: [{ label: "Rond 3 cm", w: 3, h: 3, round: true, hint: "Ø 3 cm" }, { label: "Rond 5 cm", w: 5, h: 5, round: true, hint: "Ø 5 cm · le plus commandé", star: true }, { label: "Carré 5 cm", w: 5, h: 5, hint: "5 × 5 cm" }, { label: "7 × 4 cm", w: 7, h: 4, hint: "Rectangle" }, { label: "10 × 5 cm", w: 10, h: 5, hint: "Rectangle" }, { label: "10 × 15 cm", w: 10, h: 15, hint: "Grand format" }],
    defSize: 1, qty: [50, 100, 250, 500, 1000, 5000],
    groups: [{ id: "matiere", label: "Matière", options: opt({ label: "Papier adhésif mat" }, { label: "Vinyle blanc brillant", hint: "Résiste à l'eau" }, { label: "Holographique" }, { label: "Transparent" }) }, { id: "livraison", label: "Conditionnement", options: opt("Planches", "Rouleau", "À l'unité (découpe)") }] });
  mk("vinyle", { name: "Vinyle adhésif", catId: "vinyle-adhesif", cat: "Vinyle adhésif", art: "window", person: true,
    desc: "Lettrage, vitrophanie, adhésif dépoli ou microperforé : habillez vitrines, murs, sols et véhicules. Pose possible à Paris.",
    sizes: [{ label: "Lettrage", w: 80, h: 25, hint: "80 × 25 cm" }, { label: "Porte vitrée", w: 90, h: 200, hint: "90 × 200 cm" }, { label: "Vitrine", w: 150, h: 120, hint: "150 × 120 cm · le plus commandé", star: true }, { label: "Grande vitrine", w: 250, h: 200, hint: "250 × 200 cm" }],
    defSize: 2, qty: [1, 2, 3, 5, 10], unit: "pièce(s)",
    groups: [{ id: "type", label: "Type d'adhésif", options: opt({ label: "Vinyle couleur", hint: "Lettrage, logo" }, { label: "Vitrophanie", hint: "Lisible des deux côtés" }, { label: "Dépoli", hint: "Effet verre sablé" }, { label: "Microperforé", hint: "On voit à travers" }) }, { id: "pose", label: "Pose", options: opt({ label: "Sans pose" }, { label: "Pose par l'atelier", hint: "Paris & IDF" }) }] });
  mk("signaletique", { name: "Bâches & enseignes", catId: "signaletique-enseignes", cat: "Signalétique & enseignes", art: "banner", person: true,
    desc: "Bâches PVC avec œillets, banderoles et enseignes pour façades, chantiers et événements. Résistantes à l'extérieur.",
    sizes: [{ label: "100 × 50", w: 100, h: 50, hint: "Petite bâche" }, { label: "200 × 100", w: 200, h: 100, hint: "le plus commandé", star: true }, { label: "300 × 100", w: 300, h: 100, hint: "Façade" }, { label: "400 × 80", w: 400, h: 80, hint: "Banderole" }],
    defSize: 1, qty: [1, 2, 3, 5, 10], unit: "pièce(s)",
    groups: [{ id: "matiere", label: "Matière", options: opt({ label: "Bâche PVC 510 g", hint: "Extérieur, œillets" }, { label: "Bâche microperforée", hint: "Laisse passer le vent" }, { label: "Enseigne Dibond", hint: "Panneau aluminium" }) }, { id: "finition", label: "Finition", options: opt("Œillets tous les 50 cm", "Ourlets + œillets", "Fourreaux") }] });
  mk("rigide", { name: "Panneaux rigides", catId: "support-rigide", cat: "Supports rigides", art: "rigid",
    desc: "Panneaux Forex, Dibond ou carton plume, découpés sur mesure : signalétique, panneaux d'exposition, photos d'art.",
    sizes: [{ label: "A3", w: 29.7, h: 42, hint: "29,7 × 42 cm" }, { label: "50 × 70", w: 50, h: 70, hint: "cm · le plus commandé", star: true }, { label: "60 × 80", w: 60, h: 80, hint: "cm" }, { label: "80 × 120", w: 80, h: 120, hint: "cm" }, { label: "100 × 150", w: 100, h: 150, hint: "cm" }],
    defSize: 1, qty: [1, 2, 5, 10, 25], unit: "panneau(x)",
    groups: [{ id: "matiere", label: "Matière", options: opt({ label: "Forex PVC 3 mm", hint: "Léger, intérieur" }, { label: "Dibond aluminium 3 mm", hint: "Extérieur, premium" }, { label: "Carton plume 5 mm", hint: "Exposition" }) }] });
  mk("plv", { name: "PLV & expo", catId: "plv-expo", cat: "PLV & expo", art: "plv", person: true,
    desc: "Présentoirs, totems, stop-trottoirs et comptoirs pour vos points de vente, salons et événements.",
    sizes: [{ label: "Chevalet", w: 30, h: 40, hint: "Comptoir · 30 × 40 cm" }, { label: "Stop-trottoir", w: 60, h: 100, hint: "60 × 100 cm · le plus commandé", star: true }, { label: "Totem", w: 60, h: 180, hint: "60 × 180 cm" }, { label: "Comptoir", w: 100, h: 90, hint: "Stand · 100 × 90 cm" }],
    defSize: 1, qty: [1, 2, 3, 5, 10], unit: "pièce(s)",
    groups: [{ id: "usage", label: "Utilisation", options: opt("Intérieur", { label: "Extérieur", hint: "Matière résistante à la pluie" }) }] });
  mk("packaging", { name: "Sacs & packaging", catId: "objets-packaging", cat: "Sacs, objets pub & packaging", art: "box",
    desc: "Sacs kraft, tote bags, boîtes et emballages personnalisés à vos couleurs, en petite ou grande série.",
    sizes: [{ label: "Boîte 15 cm", w: 15, h: 15, hint: "15 × 15 cm" }, { label: "Sac kraft", w: 25, h: 32, hint: "25 × 32 cm · le plus commandé", star: true }, { label: "Boîte 30 × 20", w: 30, h: 20, hint: "cm" }, { label: "Tote bag", w: 38, h: 42, hint: "38 × 42 cm" }],
    defSize: 1, qty: [25, 50, 100, 250, 500, 1000],
    groups: [{ id: "marquage", label: "Marquage", options: opt("Logo 1 couleur", "Logo quadri", "Impression tout autour") }] });
  mk("brochures", { name: "Catalogues & brochures", catId: "catalogue-brochures", cat: "Catalogues & brochures", art: "booklet",
    desc: "Brochures agrafées, spirales ou dos carré collé : catalogues, rapports, menus, livres. Mise en page possible par nos graphistes.",
    sizes: [{ label: "A6", w: 10.5, h: 14.8, hint: "10,5 × 14,8 cm" }, { label: "A5", w: 14.8, h: 21, hint: "14,8 × 21 cm · le plus commandé", star: true }, { label: "Carré 21", w: 21, h: 21, hint: "21 × 21 cm" }, { label: "A4", w: 21, h: 29.7, hint: "21 × 29,7 cm" }],
    defSize: 1, qty: [10, 25, 50, 100, 250, 500],
    groups: [{ id: "reliure", label: "Reliure", options: opt({ label: "Agrafée", hint: "8 à 64 pages" }, { label: "Spirale métallique" }, { label: "Dos carré collé", hint: "Effet livre" }, { label: "Couverture rigide" }) }, { id: "pages", label: "Nombre de pages", options: opt("8 pages", "16 pages", "32 pages", "48 pages et plus") }] });
  mk("papeterie", { name: "Papeterie & bureautique", catId: "papeterie-bureautique", cat: "Papeterie & bureautique", art: "doc",
    desc: "En-têtes de lettre, enveloppes, cartes de correspondance, documents administratifs et plaques gravées.",
    sizes: [{ label: "Carte DL", w: 10, h: 21, hint: "Correspondance 10 × 21 cm" }, { label: "Enveloppe", w: 22, h: 11, hint: "DL 22 × 11 cm" }, { label: "En-tête A4", w: 21, h: 29.7, hint: "21 × 29,7 cm · le plus commandé", star: true }, { label: "Plaque 30 × 20", w: 30, h: 20, hint: "Gravée laiton / alu" }],
    defSize: 2, qty: [50, 100, 250, 500, 1000],
    groups: [{ id: "papier", label: "Papier", options: opt("Offset 90 g", "Offset 120 g", "Vergé premium") }] });
  mk("repro", { name: "Reprographie", catId: "reprographie", cat: "Reprographie", art: "doc",
    desc: "Photocopies, impressions, reliures, scans et plastification, en noir & blanc ou couleur. Sur place, à la minute.",
    sizes: [{ label: "A5", w: 14.8, h: 21, hint: "14,8 × 21 cm" }, { label: "A4", w: 21, h: 29.7, hint: "21 × 29,7 cm · le plus commandé", star: true }, { label: "A3", w: 29.7, h: 42, hint: "29,7 × 42 cm" }, { label: "Plan A1", w: 59.4, h: 84.1, hint: "59,4 × 84,1 cm" }],
    defSize: 1, qty: [1, 10, 50, 100, 500, 1000], deliv: D3("Sur place, à la minute"),
    groups: [{ id: "couleur", label: "Impression", options: opt("Noir & blanc", "Couleur") }, { id: "finition", label: "Finition", options: opt("Sans", "Reliure", "Plastification", "Agrafage") }] });
  FORMATS.flyers.art = "poster";
  /* Tous les articles de ces familles ouvrent leur modèle dessiné */
  const BY_CAT = Object.fromEntries(Object.entries(FORMATS).map(([k, f]) => [f.catId, k]));
  CATS.forEach((c) => {
    const k = BY_CAT[c.id]; if (!k || k === "rollup") return;
    c.items = c.items.map((it) => (typeof it === "string" ? { n: it, f: k, v: 1 } : it.f || it.p ? it : Object.assign({ f: k, v: 1 }, it)));
  });
  window.CAT_FORMAT = BY_CAT;
})();

/* Dessin d'un exemplaire selon la famille (affiche, sticker, vitrine, bâche…) */
const artHTML = (F, s) => F.art === "photo" ? flyerEx(s.ex || 0) : `<span class="sheet sheet--${F.art || "poster"}${s.round ? " is-round" : ""}"><i></i><i></i><i></i><i></i></span>`;
const formatLineup = (key, sel = -1, only, auto) => {
  const F = FORMATS[key], list = F.sizes.map((s, i) => ({ s, i })).filter(({ i }) => !only || only.includes(i));
  const items = list.map(({ s }) => ({ w: s.w, h: s.h, label: s.label, sub: s.hint.split(" · ")[0], inner: artHTML(F, s), cls: "is-sheet" }));
  const maxH = Math.max(...F.sizes.map((s) => s.h));
  if (F.person && maxH > 60) items.push({ w: 42, h: 170, label: "1,70 m", sub: "repère", inner: PERSON_SVG, cls: "is-person", static: true });
  /* Échelle adaptée : le plus grand modèle fait environ 300 px de haut */
  const extra = auto ? `;--kmax:${(300 / Math.max(maxH, F.person && maxH > 60 ? 170 : 0)).toFixed(2)}px;--g:22px` : "";
  const html = lineupHTML(items, list.findIndex(({ i }) => i === sel), extra);
  /* data-i = index réel de la taille */
  return only ? html.replace(/data-i="(\d+)"/g, (m, n) => `data-i="${list[+n] ? list[+n].i : n}"`) : html;
};

/* ---------- Exemples réalistes (vraies photos) pour flyers et dépliants ---------- */
const EX = [
  { ph: "1504674900247-0877df9cc836", tag: "Nouvelle carte", title: "La Table de Clara", sub: "Cuisine maison · Paris 10e", cta: "Réservez au 01 23 45 67 89", c: "#6b1d2b" },
  { ph: "1514525253161-7a46d19cd819", tag: "Samedi · 23h", title: "Nuit Électro", sub: "Line-up exclusif · Entrée 10 €", cta: "Billets sur nuitelectro.fr", c: "#e6007e" },
  { ph: "1517836357463-d25dfeac3438", tag: "1er mois offert", title: "Studio Move", sub: "Coaching · Cross training · Yoga", cta: "Séance d'essai gratuite", c: "#01a0e2" },
  { ph: "1600585154340-be6161a56a0c", tag: "Estimation gratuite", title: "Maison Lumière", sub: "Achat · Vente · Location", cta: "maison-lumiere.fr", c: "#0f3d33" },
  { ph: "1540555700478-4be289fbecef", tag: "-20 % ce mois-ci", title: "Atelier Rose", sub: "Soins visage & bien-être", cta: "Prenez rendez-vous", c: "#a8336a" },
  { ph: "1495474472287-4d71bcdd2085", tag: "Ouverture", title: "Café Chabrol", sub: "Torréfié sur place", cta: "24 rue de Chabrol", c: "#3b2a1e" },
];
const exPhoto = (id, w = 600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;
/* Flyer imprimé : photo + bandeau de texte, la mise en page s'adapte au format */
const flyerEx = (n) => { const e = EX[n % EX.length];
  return `<span class="pf" style="--c:${e.c}"><img src="${exPhoto(e.ph)}" alt="" loading="lazy"><span class="pf__band"><em>${e.tag}</em><b>${e.title}</b><small>${e.sub}</small><i>${e.cta}</i></span></span>`; };
/* Dépliant : volets intérieurs (photo + texte) ouverts, ou couverture fermée */
const DEP_EX = [
  { c: "#6b1d2b", t: ["La Table de Clara", "Nos entrées", "Nos plats"], ph: ["1555396273-367ea4eb4db5", "1504674900247-0877df9cc836", "1414235077428-338989a2e8c0"] },
  { c: "#0f3d33", t: ["Maison Lumière", "Nos services", "Nos biens"], ph: ["1600585154340-be6161a56a0c", "1560518883-ce09059eeffa", "1600596542815-ffad4c1539a9"] },
  { c: "#a8336a", t: ["Atelier Rose", "Nos soins", "Nos tarifs"], ph: ["1540555700478-4be289fbecef", "1556228578-8c89e6adf883", "1570172619644-dfd03ed5d881"] },
];
function depEx(s, open, n = 0) {
  const e = DEP_EX[n % DEP_EX.length], k = s.folds + 1;
  if (!open) return `<span class="fo fo--closed fo--ph" style="--w:${s.fw};--h:${s.h};--c:${e.c}"><i><img src="${exPhoto(e.ph[0], 400)}" alt="" loading="lazy"><b>${e.t[0]}</b></i></span>`;
  return `<span class="fo fo--open fo--ph${s.zig ? " fo--zig" : ""}" style="--w:${s.w};--h:${s.h};--c:${e.c}">${Array.from({ length: k }, (_, j) => `<i><img src="${exPhoto(e.ph[(j + 1) % 3], 400)}" alt="" loading="lazy"><b>${e.t[(j + 1) % 3]}</b><u></u><u></u><u></u></i>`).join("")}</span>`;
}
FORMATS.flyers.art = "photo";
FORMATS.flyers.sizes.forEach((s, i) => { s.ex = i; });
