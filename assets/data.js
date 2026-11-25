/* Données du site — catalogue repris de mauripresse.com.
   ⚠️ TARIFS : la grille « Cartes de visite » reprend celle du calculateur actuel.
   Les grilles Flyers et Roll-up ainsi que les majorations d'options sont
   INDICATIVES et doivent être remplacées par les vrais tarifs de l'atelier. */

const IMG = "assets/img/"; /* logo et favicon, hébergés avec le site */

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
  /* Clé Web3Forms (gratuite, à créer sur web3forms.com avec mauripresse24@gmail.com). Si elle est remplie, elle remplace FormSubmit. */
  web3key: "201a0977-4e64-461e-9be9-fd89c3eef3d6",
  /* Passer à true quand l'abonnement Web3Forms Pro est actif : les fichiers partent alors directement dans l'e-mail. */
  web3pro: false,
  /* Script Google (gratuit) : envoie les e-mails AVEC les fichiers joints depuis mauripresse24@gmail.com.
     Coller ici l'URL /exec du déploiement (voir google-script-mauripresse.gs). Prioritaire sur Web3Forms. */
  gasUrl: "",
  gasToken: "mp-site-2026",
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
  { id: "flyers-tracts", name: "Flyers & tracts", blurb: "Du A6 au A3, pour vos événements et opérations commerciales.", items: [{ n: "Flyers & tracts", from: 27.09, f: "flyers" }, { n: "Flyer A6", f: "flyers", t: 0 }, { n: "Flyer 10×15 cm", f: "flyers", t: 1 }, { n: "Flyer DL 10×21 cm", f: "flyers", t: 2 }, { n: "Flyer A5", f: "flyers", t: 3 }, { n: "Flyer A4", f: "flyers", t: 4 }, { n: "Flyer A3", f: "flyers", t: 5 }] },
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
  { id: "objets-packaging", name: "Sacs, objets pub & packaging", blurb: "Textile, goodies et boîtes personnalisées.", items: [{ n: "Sac kraft personnalisé restaurant · 26 × 17 × 29 cm", from: 99.99, h: "sac.html" }, { n: "Papier alimentaire personnalisé", h: "perso.html?p=papier" }, { n: "Serviettes personnalisées", h: "perso.html?p=serviette" }, "Sacs personnalisés", "Objets publicitaires", "Packaging & boîtes", "Textile personnalisé"] },
];

/* ---------- Utilitaires partagés ---------- */
const eur = (n) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const itemName = (it) => (typeof it === "string" ? it : it.n);
/* Un article est « configurable » s'il a un calculateur (p) ; sinon il part en devis.
   `from` = prix « dès » affiché sur le site officiel pour un article sans calculateur. */
const isConf = (it) => typeof it === "object" && !!it.p;
const itemHref = (it) => (typeof it === "object" && it.h ? it.h : isConf(it) ? "produit.html?p=" + it.p : typeof it === "object" && it.f ? "format.html?p=" + it.f + (it.t != null ? "&t=" + it.t : "") + (it.v ? "&n=" + encodeURIComponent(it.n) : "") : "contact.html?produit=" + encodeURIComponent(itemName(it)));
const delivOf = (key, id) => { const p = PRODUCTS[key]; return p.deliv.find((x) => x.id === id) || p.deliv.find((x) => x.id === p.defDeliv) || p.deliv[0]; };

/* Prix HT d'une configuration, selon les règles du site officiel :
   - grille fixe (prices) : prix(quantité, délai), options sans supplément ;
   - calculateur (base)   : base(quantité) × délai × options + suppléments. */
function computePrice(key, qtyIndex, choices, deliveryId) {
  const p = PRODUCTS[key], d = delivOf(key, deliveryId);
  let price = p.px ? p.px(qtyIndex, choices, d) : d.prices ? d.prices[qtyIndex] : p.base[qtyIndex] * d.mult, add = 0;
  p.groups.forEach((g, i) => {
    const o = g.options[choices?.[i] ?? 0] || g.options[0];
    if (o.mult && !p.px) price *= o.mult;
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
/* Envoi par le script Google, fichiers inclus (base64) */
const fileB64 = (f) => new Promise((ok, ko) => { const r = new FileReader(); r.onload = () => ok(String(r.result).split(",")[1]); r.onerror = ko; r.readAsDataURL(f); });
async function sendGas(subject, data, file) {
  const files = file && file.size <= 10 * 1024 * 1024 ? [{ name: file.name, type: file.type, data: await fileB64(file) }] : [];
  const fields = Object.assign({}, data); if (file && !files.length) fields.fichier = file.name + " (trop lourd : à envoyer séparément)";
  const ctrl = new AbortController(), t = setTimeout(() => ctrl.abort(), 25000);
  try {
    const r = await fetch(SHOP.gasUrl, { method: "POST", body: JSON.stringify({ token: SHOP.gasToken, subject, fields, files }), signal: ctrl.signal });
    const j = await r.json().catch(() => ({}));
    if (!j.success) throw new Error(j.message || "Envoi impossible");
    return j;
  } finally { clearTimeout(t); }
}
const fileAuto = (file) => !!(file && ((SHOP.gasUrl && file.size <= 10 * 1024 * 1024) || (SHOP.web3key && SHOP.web3pro)));
async function sendMail(subject, data, file) {
  if (SHOP.gasUrl) { try { return await sendGas(subject, data, file); } catch (e) { /* secours : Web3Forms ci-dessous */ } }
  /* Le texte part par un service d'e-mail (Web3Forms si une clé est configurée, sinon FormSubmit).
     Les fichiers ne passent pas par ces services gratuits (non pris en charge ou instables) :
     le nom du fichier est indiqué, et le client l'envoie ensuite par WhatsApp ou e-mail (voir fileShareHTML). */
  const fields = Object.assign({}, data);
  const attach = !!(file && SHOP.web3key && SHOP.web3pro);
  if (file && !attach) fields.fichier = file.name + " (envoyé séparément par le client)";
  const web3 = !!SHOP.web3key;
  const fd = new FormData();
  if (web3) { fd.append("access_key", SHOP.web3key); fd.append("subject", subject); fd.append("from_name", "Site Mauri Presse"); if (data.email) fd.append("replyto", data.email); }
  else { fd.append("_subject", subject); fd.append("_template", "table"); fd.append("_captcha", "false"); if (data.email) fd.append("_replyto", data.email); }
  Object.entries(fields).forEach(([k, v]) => { if (v !== "" && v != null) fd.append(k, v); });
  if (attach) fd.append("attachment", file);
  const url = web3 ? "https://api.web3forms.com/submit" : "https://formsubmit.co/ajax/" + (SHOP.formKey || SHOP.mail);
  let last;
  for (let attempt = 0; attempt < 2; attempt++) { /* 2 essais, 8 s maximum chacun (un envoi normal prend moins d’1 s) */
    const ctrl = new AbortController(), t = setTimeout(() => ctrl.abort(), 8000);
    try {
      const r = await fetch(url, { method: "POST", body: fd, headers: { Accept: "application/json" }, signal: ctrl.signal });
      const j = await r.json().catch(() => ({}));
      if (r.ok && String(j.success) !== "false") return j;
      last = new Error(j.message || "Envoi impossible");
    } catch (e) { last = e; } finally { clearTimeout(t); }
  }
  throw last;
}
/* Envoi d'un fichier (capture, devis, maquette) : partage natif sur téléphone, sinon WhatsApp / e-mail */
function fileShareHTML(file, ref) {
  if (!file || fileAuto(file)) return "";
  const txt = `Bonjour Mauri Presse, voici le fichier de ma demande ${ref}.`;
  return `<div class="fshare"><b>📎 Dernière étape : envoyez-nous votre fichier « ${esc(file.name)} »</b>
    <p>Les pièces jointes ne passent pas par le formulaire : envoyez-la en un clic, avec la référence ${esc(ref)}.</p>
    <div class="fshare__btns">
      <button type="button" class="btn btn--cyan btn--sm" data-share>Envoyer le fichier</button>
      <a class="btn btn--ghost btn--sm" href="${SHOP.wa.split("&text=")[0]}&text=${encodeURIComponent(txt)}" target="_blank" rel="noopener">Par WhatsApp</a>
      <a class="btn btn--ghost btn--sm" href="mailto:${SHOP.mail}?subject=${encodeURIComponent("Fichier – " + ref)}&body=${encodeURIComponent(txt + "\n\n(Pensez à joindre le fichier.)")}">Par e-mail</a>
    </div></div>`;
}
function bindFileShare(root, file, ref) {
  const b = root && root.querySelector("[data-share]"); if (!b || !file) return;
  const can = navigator.canShare && navigator.canShare({ files: [file] });
  if (!can) { b.remove(); return; }
  b.addEventListener("click", () => navigator.share({ files: [file], title: "Mauri Presse – " + ref, text: `Fichier de ma demande ${ref}` }).catch(() => {}));
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
    name: "Flyers & tracts", catId: "flyers-tracts", cat: "Flyers & tracts", kind: "sheet", from: 36.27,
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
      { id: "papier", label: "Papier", options: [{ label: "Couché brillant 135 g", hint: "Le classique des flyers" }, { label: "Couché mat 170 g", hint: "Plus épais, aspect soigné" }, { label: "Couché 250 g", hint: "Épais, tient bien en main" }, { label: "Couché 350 g rigide", hint: "Effet carton" }] },
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

/* ---------- Sac kraft personnalisé (restaurants, vente à emporter) ---------- */
const SAC = {
  colors: [
    { id: "kraft", label: "Kraft brun", hint: "Naturel, le plus choisi", hex: "#b88a55" },
    { id: "blanc", label: "Kraft blanc", hint: "Couleurs éclatantes", hex: "#f2efe7" },
    { id: "noir", label: "Noir", hint: "Chic, impression blanche", hex: "#26262b" },
  ],
  sides: [{ label: "Recto", hint: "Logo sur une face" }, { label: "Recto-verso", hint: "Logo sur les deux faces" }],
  inks: [{ id: "noir", label: "Noir", hint: "1 couleur" }, { id: "blanc", label: "Blanc", hint: "Pour sac noir" }, { id: "quadri", label: "Couleurs (quadri)", hint: "Votre logo en couleurs" }],
  qty: [100, 250, 500, 1000, 2000, 5000, 10000],
  /* Prix HT dégressifs. 100 sacs : prix fixé par Mauri Presse ; au-delà, grille estimée d'après le marché
     (≈ 0,25 € HT / sac à 1 000 en impression couleur), à aligner sur le concurrent si besoin. */
  prices: { 100: 99.99, 250: 169.99, 500: 219.99, 1000: 289.99, 2000: 499.99, 5000: 1049.99, 10000: 1899.99 },
  deliv: [
    { id: "pickup", label: "Retrait à l'atelier", hint: "Fabriqué sous 24 – 48 h · gratuit" },
    { id: "day", label: "Livraison jour même", hint: "Paris & IDF · tarif selon l'adresse", paid: true },
    { id: "france", label: "Livraison France", hint: "48 – 72 h après fabrication" },
  ],
};
/* Sac dessiné (bannière) : même rendu que l'aperçu de la page produit */
function bagHTML(color = "kraft", ink = "noir", n = 0) {
  const g = "g" + n;
  return `<div class="bag bag--mini" data-color="${color}" data-ink="${ink}"><div class="bag__stage">
    <svg class="bag__svg" viewBox="0 0 440 540" aria-hidden="true"><defs>
      <filter id="${g}n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .16"/></feComponentTransfer><feBlend in2="SourceGraphic" mode="multiply"/><feComposite in2="SourceGraphic" operator="in"/></filter>
      <linearGradient id="${g}f" x1="0" x2="1"><stop offset="0" style="stop-color:var(--bag-2)"/><stop offset=".35" style="stop-color:var(--bag)"/><stop offset="1" style="stop-color:var(--bag-2)"/></linearGradient>
      <linearGradient id="${g}s" x1="0" x2="1"><stop offset="0" style="stop-color:var(--bag-3)"/><stop offset="1" style="stop-color:var(--bag-2)"/></linearGradient></defs>
      <ellipse cx="225" cy="508" rx="190" ry="16" fill="rgba(0,0,0,.3)"/>
      <path d="M205 150 C205 40, 335 40, 335 150" fill="none" stroke="var(--handle-2)" stroke-width="9" stroke-linecap="round"/>
      <polygon points="60,180 130,150 400,150 330,180" fill="var(--bag-3)"/>
      <polygon points="330,180 400,150 400,470 330,500" fill="url(#${g}s)"/>
      <polyline points="330,180 362,210 400,150" fill="none" stroke="var(--bag-3)" stroke-width="2" opacity=".8"/>
      <rect x="60" y="180" width="270" height="320" fill="url(#${g}f)"/>
      <rect x="60" y="180" width="270" height="320" fill="var(--bag)" filter="url(#${g}n)" opacity=".9"/>
      <rect x="60" y="180" width="270" height="30" fill="rgba(0,0,0,.08)"/>
      <path d="M135 190 C135 70, 255 70, 255 190" fill="none" stroke="var(--handle)" stroke-width="10" stroke-linecap="round"/>
      <rect x="125" y="186" width="20" height="16" rx="2" fill="var(--bag-2)"/><rect x="245" y="186" width="20" height="16" rx="2" fill="var(--bag-2)"/>
    </svg>
    <div class="bag__print"><img src="${IMG}mauri_logo.png" alt=""><span>Imprimerie · Paris 10e</span></div>
  </div></div>`;
}

/* ---------- Sac kraft en 3D (on le fait tourner pour voir recto et verso) ---------- */
function bag3dHTML(o = {}) {
  const { color = "kraft", ink = "noir", sides = "rv", text = "Imprimerie · Paris 10e", back = "Merci & à bientôt !", spin = false, u = 12 } = o;
  const handle = (c) => `<svg class="b3f__handle" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true"><path d="M8 60 C8 -8, 92 -8, 92 60" fill="none" stroke="var(${c})" stroke-width="5.5" stroke-linecap="round"/><path d="M8 60 C8 -8, 92 -8, 92 60" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.2" stroke-dasharray="2 4"/></svg>`;
  return `<div class="bag b3d${spin ? " b3d--spin" : ""}" data-color="${color}" data-ink="${ink}" data-sides="${sides}" style="--u:${u}px">
    <div class="b3d__scene"><div class="b3d__box" style="--ry:-28deg">
      <div class="b3f b3f--inner"></div><div class="b3f b3f--inner b3f--inner2"></div>
      <div class="b3f b3f--left"></div><div class="b3f b3f--right"></div><div class="b3f b3f--bottom"></div>
      <div class="b3f b3f--back">${handle("--handle-2")}<div class="bag__print bag__print--back"><b data-bag-back>${esc(back)}</b><img data-bag-logo src="${IMG}mauri_logo.png" alt=""></div></div>
      <div class="b3f b3f--front">${handle("--handle")}<div class="bag__print"><img data-bag-logo src="${IMG}mauri_logo.png" alt=""><span data-bag-text>${esc(text)}</span></div></div>
    </div><div class="b3d__shadow"></div></div></div>`;
}
/* Faire tourner un sac à la souris / au doigt */
function bag3dDrag(root, onTurn) {
  const box = root.querySelector(".b3d__box"); let ry = -28, x0 = null, r0 = 0;
  const set = (v) => { ry = v; box.style.setProperty("--ry", v + "deg"); onTurn && onTurn(v); };
  root.addEventListener("pointerdown", (e) => { x0 = e.clientX; r0 = ry; root.classList.add("is-drag"); root.classList.remove("b3d--spin"); root.setPointerCapture(e.pointerId); });
  root.addEventListener("pointermove", (e) => { if (x0 != null) set(r0 + (e.clientX - x0) * 0.6); });
  const end = () => { x0 = null; root.classList.remove("is-drag"); };
  root.addEventListener("pointerup", end); root.addEventListener("pointercancel", end);
  return { set, get: () => ry };
}

/* ---------- Sac kraft sur une vraie photo (le logo est incrusté sur la face) ---------- */
SAC.colors = SAC.colors.filter((c) => c.id !== "noir");
SAC.inks = SAC.inks.filter((c) => c.id !== "blanc");
const BAG_PHOTO = "https://images.unsplash.com/photo-1616429368325-d5d7542b0ec3?auto=format&fit=crop&w=1000&q=80";
function bagPhotoHTML(o = {}) {
  const { color = "kraft", ink = "noir", side = "front", text = "Imprimerie · Paris 10e", back = "Merci & à bientôt !" } = o;
  return `<div class="bph" data-color="${color}" data-ink="${ink}" data-side="${side}">
    <img class="bph__img" src="${BAG_PHOTO}" alt="Sac kraft à poignées torsadées, 26 × 17 × 29 cm">
    <div class="bph__print bph__print--front"><img data-bag-logo src="${IMG}mauri_logo.png" alt=""><span data-bag-text>${esc(text)}</span></div>
    <div class="bph__print bph__print--back"><b data-bag-back>${esc(back)}</b><img data-bag-logo src="${IMG}mauri_logo.png" alt=""></div>
    <span class="bph__side">Recto</span>
  </div>`;
}

/* ---------- Papier alimentaire et serviettes personnalisés (sur devis) ---------- */
const PERSO = {
  papier: {
    name: "Papier alimentaire personnalisé", short: "papier alimentaire",
    lead: "Papier ingraissable pour burgers, sandwichs, frites et viennoiseries, imprimé à votre logo. Encres alimentaires, contact direct avec les aliments.",
    photo: "1585238341267-1cfec2046a55", photoAlt: "Burger posé sur du papier alimentaire",
    badges: [["✓ Maquette avant tirage", "BAT envoyé avant impression"], ["🍔 Contact alimentaire", "Encres et papier certifiés"], ["🇫🇷 Imprimé en France", "dans notre atelier, Paris 10e"], ["🔒 Paiement sécurisé", "CB, espèces ou lien de paiement"]],
    groups: [
      { id: "papier", label: "Papier", swatch: true, options: [{ label: "Blanc ingraissable", hint: "40 g · le plus choisi", hex: "#f7f5ef", v: "blanc" }, { label: "Kraft ingraissable", hint: "40 g · aspect naturel", hex: "#c9a173", v: "kraft" }] },
      { id: "format", label: "Format", options: [{ label: "25 × 35 cm", hint: "Sandwichs, viennoiseries", w: 25, h: 35 }, { label: "31 × 38 cm", hint: "Burgers · le plus commandé", w: 31, h: 38 }, { label: "35 × 50 cm", hint: "Plateaux, fonds de panier", w: 35, h: 50 }] },
      { id: "motif", label: "Mise en page", options: [{ label: "Motif répété", hint: "Logo en quinconce sur toute la feuille", v: "repeat" }, { label: "Logo centré", hint: "Un grand logo au centre", v: "center" }] },
      { id: "encre", label: "Couleur d'impression", options: [{ label: "Noir", v: "noir" }, { label: "Rouge", v: "rouge" }, { label: "Couleurs (quadri)", v: "quadri" }] },
    ],
    text: "Fait maison · Paris 10e",
    qty: [1000, 2500, 5000, 10000, 25000], unit: "feuilles",
  },
  serviette: {
    name: "Serviettes personnalisées", short: "serviettes",
    lead: "Serviettes en ouate de cellulose imprimées à votre logo, pour restaurants, cafés, traiteurs et événements. Pliées en 4, prêtes à poser sur la table.",
    photo: "1767528402041-55425fc177ee", photoAlt: "Serviette blanche imprimée au logo d'un café",
    badges: [["✓ Maquette avant tirage", "BAT envoyé avant impression"], ["🧻 Douces et résistantes", "2 ou 3 plis, ouate de cellulose"], ["🇫🇷 Imprimé en France", "dans notre atelier, Paris 10e"], ["🔒 Paiement sécurisé", "CB, espèces ou lien de paiement"]],
    groups: [
      { id: "couleur", label: "Couleur de la serviette", swatch: true, options: [{ label: "Blanc", hint: "Le classique", hex: "#ffffff", v: "blanc" }, { label: "Kraft", hint: "Recyclé, naturel", hex: "#c8a47a", v: "kraft" }, { label: "Noir", hint: "Chic, logo blanc", hex: "#24242a", v: "noir" }, { label: "Bordeaux", hint: "Gastronomique", hex: "#6b1d2b", v: "bordeaux" }] },
      { id: "format", label: "Format", options: [{ label: "33 × 33 cm", hint: "Plié 16,5 × 16,5 cm · café, snack" }, { label: "40 × 40 cm", hint: "Plié 20 × 20 cm · restaurant" }] },
      { id: "plis", label: "Épaisseur", options: [{ label: "2 plis", hint: "Le standard" }, { label: "3 plis", hint: "Plus épaisse, effet tissu" }] },
      { id: "position", label: "Position du logo", options: [{ label: "Dans le coin", hint: "Visible une fois pliée", v: "corner" }, { label: "Au centre", hint: "Grand logo", v: "center" }] },
    ],
    text: "Bon appétit",
    qty: [500, 1000, 2500, 5000, 10000], unit: "serviettes",
  },
};
const LOGO_URL = IMG + "mauri_logo.png";
/* Aperçu réaliste : feuille de papier alimentaire ou serviette pliée, avec le logo */
function persoHTML(key, st, logo = LOGO_URL, text = "") {
  const P = PERSO[key], v = (id) => { const g = P.groups.find((x) => x.id === id); return g.options[st[id] || 0]; };
  if (key === "papier") {
    const f = v("format"), cells = Array.from({ length: 48 }, (_, i) => `<span class="fp__cell">${i % 2 ? `<b>${esc(text)}</b>` : `<img src="${logo}" alt="">`}</span>`).join("");
    return `<div class="fp" data-paper="${v("papier").v}" data-ink="${v("encre").v}" data-motif="${v("motif").v}" style="--ar:${f.w / f.h}">
      <div class="fp__sheet"><div class="fp__grid">${cells}</div><div class="fp__center"><img src="${logo}" alt=""><b>${esc(text)}</b></div><i class="fp__light"></i></div>
      <span class="fp__dim">${esc(f.label)}</span></div>`;
  }
  return `<div class="fn" data-color="${v("couleur").v}" data-pos="${v("position").v}">
    <div class="fn__napkin"><i class="fn__fold fn__fold--a"></i><i class="fn__fold fn__fold--b"></i><div class="fn__print"><img src="${logo}" alt=""><b>${esc(text)}</b></div></div>
    <div class="fn__napkin fn__napkin--2"></div><span class="fp__dim">${esc(v("format").hint.split(" · ")[0])}</span></div>`;
}

/* ---------- Flyers : grille de prix par quantité et date de livraison (prix HT) ----------
   old = prix avant remise (barré), now = prix remisé. Jour même : +40 % sur le prix de base le plus rapide, jusqu'à 5 000 ex. */
const FLY_GRID = {
  qty: [100, 250, 500, 1000, 2500, 5000, 7500, 10000, 15000, 20000, 30000],
  cols: [
    { id: "j2", days: 2, badge: "jusqu'à -5%",
      old: [50.48, 54.41, 60.96, 74.06, 102.86, 148.35, 204.29, 245.65, 352.85, 448.28, 665.86],
      now: [47.96, 51.69, 57.91, 70.36, 97.72, 140.93, 194.08, 233.37, 335.21, 425.87, 665.86] },
    { id: "j3", days: 3, badge: "jusqu'à -5%",
      old: [44.13, 47.57, 53.29, 64.74, 89.92, 129.70, 178.60, 214.76, 308.48, 391.91, 582.13],
      now: [41.92, 45.19, 50.63, 61.50, 85.42, 123.21, 169.67, 204.02, 293.06, 372.31, 582.13] },
    { id: "j5", days: 5, badge: "jusqu'à -15%",
      old: [36.27, 39.10, 43.80, 53.21, 73.91, 106.60, 146.80, 176.52, 253.55, 322.12, 478.46],
      now: [30.83, 33.23, 37.23, 45.23, 62.82, 90.61, 124.78, 150.04, 215.52, 273.80, 406.69] },
  ],
};
/* Jour même = prix de base (non remisé) du délai le plus rapide + 40 %, seulement jusqu'à 5 000 ex. */
FLY_GRID.cols.unshift({ id: "day", sameDay: true, badge: "+40 % · Paris & IDF", max: 5000,
  now: FLY_GRID.cols[0].old.map((p, i) => (FLY_GRID.qty[i] <= 5000 ? Math.round(p * 1.4 * 100) / 100 : null)) });
/* Date de livraison : jours ouvrés (lundi → vendredi) */
const workDate = (n) => { const d = new Date(); let k = n; while (k > 0) { d.setDate(d.getDate() + 1); if (d.getDay() !== 0 && d.getDay() !== 6) k--; } return d; };
const fmtDay = (d) => [d.toLocaleDateString("fr-FR", { weekday: "long" }), d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })];
FORMATS.flyers.grid = FLY_GRID;
/* Prix retenus : les anciens prix (non remisés) deviennent les prix du site, sans prix barré ni remise. */
FLY_GRID.cols.forEach((c) => { if (c.old) { c.now = c.old.slice(); delete c.old; c.badge = c.id === "j5" ? "Le moins cher" : ""; } });
FORMATS.flyers.from = FLY_GRID.cols.find((c) => c.id === "j5").now[0];

/* ---------- Flyers : prix par format (relevé Pixartprinting du 25/11/2026, prix non remisés, HT) ----------
   Ordre des formats = FORMATS.flyers.sizes : A6, 10×15, DL (10×21), A5, A4, A3.
   Chaque ligne = quantité, colonnes = [J+2, J+3, J+5]. */
FLY_GRID.byFormat = [
  [[42.29,36.97,30.38],[43.97,38.45,31.6],[46.79,40.91,33.62],[52.42,45.83,37.67],[66.1,57.78,47.49],[86.78,75.86,62.35],[108.39,94.76,77.88],[135.69,118.62,97.5],[199.31,174.25,143.22],[251.95,220.27,181.04],[352.85,308.48,253.55]],
  [[42.29,36.97,30.38],[43.97,38.45,31.6],[46.79,40.91,33.62],[52.42,45.83,37.67],[66.1,57.78,47.49],[86.78,75.86,62.35],[108.39,94.76,77.88],[135.69,118.62,97.5],[199.31,174.25,143.22],[251.95,220.27,181.04],[352.85,308.48,253.55]],
  [[49.61,43.37,35.64],[52.23,45.66,37.53],[56.59,49.47,40.66],[65.32,57.11,46.94],[91.52,80.01,65.76],[131.41,114.88,94.42],[180.92,158.17,130],[230.42,201.45,165.57],[314.94,275.34,226.3],[389.78,340.77,280.08],[527.39,461.07,378.96]],
  [[50.48,44.13,36.27],[54.41,47.57,39.1],[60.96,53.29,43.8],[74.06,64.74,53.21],[102.86,89.92,73.91],[148.35,129.7,106.6],[204.29,178.6,146.8],[245.65,214.76,176.52],[352.85,308.48,253.55],[448.28,391.91,322.12],[665.86,582.13,478.46]],
  [[63.72,55.71,45.79],[73.15,63.95,52.56],[81.46,71.22,58.53],[112.34,98.21,80.72],[172.56,150.86,123.99],[267.7,234.03,192.36],[352.85,308.48,253.55],[474.65,414.96,341.07],[665.86,582.13,478.46],[916.16,800.95,658.32],[1319.82,1153.85,948.37]],
  [[67.73,59.21,43.8],[81.88,71.58,52.95],[109.87,96.05,71.05],[145.3,127.03,104.41],[277.69,242.77,199.53],[514.8,450.06,369.91],[716.63,626.51,514.94],[929.94,813,668.22],[1403.79,1227.26,1008.71],[1840.78,1609.3,1322.71],[2702.67,2362.81,1942.04]],
];
/* Met la grille aux prix du format choisi. Jour même = prix J+2 + 40 % (jusqu'à 5 000 ex.), + 10 % en recto/verso. */
FLY_GRID.apply = (sizeIdx, rectoVerso) => {
  const rows = FLY_GRID.byFormat[sizeIdx] || FLY_GRID.byFormat[3];
  const r2 = (n) => Math.round(n * 100) / 100;
  FLY_GRID.cols.forEach((c) => {
    if (c.sameDay) c.now = rows.map((r, i) => (FLY_GRID.qty[i] <= 5000 ? r2(r[0] * 1.4 * (rectoVerso ? 1.1 : 1)) : null));
    else c.now = rows.map((r) => r[{ j2: 0, j3: 1, j5: 2 }[c.id]]);
  });
};
(() => { const day = FLY_GRID.cols.find((c) => c.sameDay); day.badge = "Express +40 %"; FLY_GRID.apply(3, false);
  FORMATS.flyers.from = Math.min(...FLY_GRID.byFormat.map((f) => f[0][2])); })();

/* ---------- Flyers : prix par papier (relevé Pixartprinting du 25/11/2026, prix barrés, HT) ----------
   Papier 0 = couché brillant (130 g chez Pixartprinting), 1 = couché mat 170 g, 2 = 250 g, 3 = 350 g.
   null = délai non proposé (Pixartprinting : pas de J+2 / J+3 au-delà de 5 000 ex. en 130, 250 et 350 g). */
FLY_GRID.byPaper = [
  [
    [[37.7,32.96,27.09],[38.97,34.07,28],[43.76,38.26,31.44],[48.27,42.2,34.69],[61.82,54.04,44.42],[79.89,69.84,57.41],[null,null,70.46],[null,null,76.15],[null,null,127.79],[null,null,153.53],[null,null,213.39]],
    [[37.7,32.96,27.09],[38.97,34.07,28],[43.76,38.26,31.44],[48.27,42.2,34.69],[61.82,54.04,44.42],[79.89,69.84,57.41],[null,null,70.46],[null,null,76.15],[null,null,127.79],[null,null,153.53],[null,null,213.39]],
    [[49.33,43.12,35.44],[51.53,45.05,37.03],[55.2,48.26,39.66],[62.54,54.68,44.94],[84.56,73.93,60.76],[119.48,104.46,85.86],[null,null,117.15],[null,null,139.75],[null,null,191.92],[null,null,228.44],[null,null,310.19]],
    [[47.56,41.58,34.17],[50.7,44.32,36.43],[53.57,46.84,38.5],[63.59,55.6,45.7],[94.3,82.44,67.76],[133.68,116.87,96.06],[null,null,130.99],[null,null,149.69],[null,null,213.39],[null,null,263.66],[null,null,385.61]],
    [[62.72,54.83,45.07],[70.64,61.76,50.76],[76.87,67.2,55.24],[91.9,80.35,66.04],[154.82,135.35,111.25],[227.02,198.47,163.13],[null,null,213.39],[null,null,279.17],[null,null,385.61],[null,null,519.4],[null,null,744.11]],
    [[66.23,57.9,42.83],[78.12,68.3,50.52],[92.5,80.87,59.82],[123.72,108.16,88.9],[237.32,207.48,170.53],[423.87,370.57,304.58],[null,null,416.94],[null,null,529.3],[null,null,793.7],[null,null,1030.24],[null,null,1503.33]]
  ],
  FLY_GRID.byFormat,
  [
    [[49.66,43.41,35.68],[52.36,45.77,37.62],[56.86,49.71,40.86],[65.85,57.57,47.32],[83.56,73.06,60.05],[113.63,99.34,81.65],[null,null,105.96],[null,null,126.64],[null,null,193.31],[null,null,243.2],[null,null,360]],
    [[49.66,43.41,35.68],[52.36,45.77,37.62],[56.86,49.71,40.86],[65.85,57.57,47.32],[83.56,73.06,60.05],[113.63,99.34,81.65],[null,null,105.96],[null,null,126.64],[null,null,193.31],[null,null,243.2],[null,null,360]],
    [[50.26,43.94,36.11],[53.86,47.09,38.7],[59.86,52.33,43.01],[71.85,62.82,51.63],[119.93,104.85,86.18],[171.48,149.92,123.22],[null,null,168.85],[null,null,223.16],[null,null,304],[null,null,386.58],[null,null,543.05]],
    [[51.46,44.99,36.98],[56.86,49.71,40.86],[65.85,57.57,47.32],[83.85,73.31,60.25],[134.93,117.96,96.96],[211.48,184.89,151.96],[null,null,205.39],[null,null,237.12],[null,null,360],[null,null,461.59],[null,null,703.88]],
    [[66.07,57.76,47.47],[79.03,69.09,56.78],[92.24,80.64,66.28],[131.93,115.34,94.8],[224.46,196.24,161.29],[359.61,314.39,258.4],[null,null,360],[null,null,488.74],[null,null,703.88],[null,null,970.08],[null,null,1416.01]],
    [[71.26,62.3,46.08],[90.69,79.29,65.17],[126.52,110.61,90.91],[183.75,160.64,132.04],[369.28,322.84,265.35],[731.73,639.72,525.79],[null,null,752.89],[null,null,979.98],[null,null,1500.96],[null,null,1979.05],[null,null,2926.54]]
  ],
  [
    [[50.31,43.98,36.15],[53.99,47.2,38.79],[60.12,52.56,43.2],[72.38,63.27,52.01],[109.11,95.39,78.4],[147.66,129.09,106.1],[null,null,143.96],[null,null,169.78],[null,null,262.34],[null,null,328.3],[null,null,499.32]],
    [[50.31,43.98,36.15],[53.99,47.2,38.79],[60.12,52.56,43.2],[72.38,63.27,52.01],[109.11,95.39,78.4],[147.66,129.09,106.1],[null,null,143.96],[null,null,169.78],[null,null,262.34],[null,null,328.3],[null,null,499.32]],
    [[51.13,44.7,36.74],[56.03,48.99,40.26],[64.2,56.13,46.13],[80.55,70.42,57.88],[141.67,123.85,101.8],[220.83,193.06,158.68],[null,null,226.38],[null,null,294.08],[null,null,419.06],[null,null,528.41],[null,null,764.48]],
    [[52.76,46.13,37.91],[60.12,52.56,43.2],[72.38,63.27,52.01],[108.98,95.27,78.31],[175.15,153.13,125.86],[283.54,247.88,203.74],[null,null,278.74],[null,null,320.09],[null,null,499.32],[null,null,642.43],[null,null,991.1]],
    [[69.2,60.5,49.72],[86.85,75.93,62.41],[119.88,104.8,86.14],[170.1,148.71,122.22],[300.43,262.65,215.88],[485.44,424.4,348.82],[null,null,499.32],[null,null,680.22],[null,null,991.1],[null,null,1374.3],[null,null,2030.6]],
    [[75.95,66.4,54.58],[113.31,99.06,81.42],[158.96,138.97,114.23],[231.94,202.77,166.66],[494.28,432.13,355.17],[1013,885.62,727.91],[null,null,1056.06],[null,null,1384.2],[null,null,2147.9],[null,null,2838.73],[null,null,4211.73]]
  ],
];
FLY_GRID.apply = (sizeIdx, rectoVerso, paperIdx) => {
  const grid = FLY_GRID.byPaper[paperIdx == null ? 1 : paperIdx] || FLY_GRID.byFormat;
  const rows = grid[sizeIdx] || grid[3];
  const r2 = (n) => Math.round(n * 100) / 100;
  FLY_GRID.cols.forEach((c) => {
    if (c.sameDay) c.now = rows.map((r, i) => (FLY_GRID.qty[i] <= 5000 && r[0] != null ? r2(r[0] * 1.4 * (rectoVerso ? 1.1 : 1)) : null));
    else c.now = rows.map((r) => r[{ j2: 0, j3: 1, j5: 2 }[c.id]]);
  });
};
FLY_GRID.apply(3, false, 0);
FORMATS.flyers.from = Math.min(...FLY_GRID.byPaper.flatMap((g) => g.map((f) => f[0][2])));

/* ---------- Cartes de visite : prix Pixartprinting (relevé du 25/11/2026, prix barrés, HT) ----------
   Prix de base par format (couché mat 350 g, recto/verso, sans pelliculage) pour 100 → 2 500 ex. et 3 dates
   (J+2, J+3, J+5 ouvrés). Chaque option applique le rapport de prix relevé chez Pixartprinting.
   Jour même = prix J+2 + 40 % (+10 % en recto/verso). */
const CARD_PX = {
  qty: [100, 250, 500, 1000, 2500],
  fmt: [[[29.77, 23.39, 18.98], [30.88, 24.26, 19.69], [32.72, 25.71, 21.85], [36.41, 28.61, 24.32], [47.47, 37.3, 33.14]], [[33.66, 26.45, 24.04], [35.67, 28.02, 25.48], [39.69, 31.18, 28.35], [51.74, 40.66, 36.96], [71.23, 55.97, 50.88]], [[34.28, 26.93, 24.48], [36.32, 28.54, 25.94], [40.41, 31.75, 28.87], [52.69, 41.4, 37.64], [72.54, 57, 51.82]], [[30.88, 24.26, 22.06], [32.72, 25.71, 23.37], [36.41, 28.61, 26.01], [47.47, 37.3, 33.91], [65.35, 51.35, 46.68]]],
  r: {"l_mat1": [[1.4179, 1.4177, 1.5885], [1.4061, 1.4064, 1.5754], [1.4691, 1.4691, 1.5712], [1.5946, 1.5945, 1.7052], [1.7535, 1.7534, 1.7942]], "l_soft1": [[1.788, 1.7879, 2.0032], [1.7668, 1.7671, 1.9792], [1.846, 1.846, 1.9744], [2.0044, 2.0042, 2.1435], [2.4605, 2.4603, 2.5175]], "l_bri2": [[1.4286, 1.4288, 1.6006], [1.422, 1.4221, 1.5932], [1.5755, 1.5753, 1.6851], [1.8075, 1.8074, 1.933], [2.2562, 2.256, 2.3084]], "l_mat2": [[1.4286, 1.4288, 1.6006], [1.422, 1.4221, 1.5932], [1.5755, 1.5753, 1.6851], [1.8075, 1.8074, 1.933], [2.2562, 2.256, 2.3084]], "l_soft2": [[1.8105, 1.8106, 2.0285], [1.8993, 1.8994, 2.1275], [2.2127, 2.2124, 2.3666], [2.641, 2.6407, 2.824], [3.4715, 3.4713, 3.5519]], "g300": [[0.9966, 0.9966, 0.9963], [0.9916, 0.9918, 0.9914], [0.9844, 0.9844, 0.9844], [0.9717, 0.9717, 0.9716], [0.9459, 0.9458, 0.946]], "g250": [[1.0208, 1.0209, 1.0205], [1.0278, 1.028, 1.0767], [1.0529, 1.0529, 1.0531], [1.1692, 1.1692, 1.222], [1.182, 1.1818, 1.2094]], "g130": [[1.003, 1.003, 1.0032], [0.9938, 0.9938, 1.0411], [0.9887, 0.9887, 0.9886], [1.025, 1.0248, 1.0711], [0.9732, 0.9732, 0.9958]], "recycle": [[1.2405, 1.2407, 1.3899], [1.3251, 1.3256, 1.4845], [1.4542, 1.4539, 1.5556], [1.6723, 1.6721, 1.7887], [2.1241, 2.1239, 2.1732]], "havane": [[1.2553, 1.2552, 1.4062], [1.3611, 1.3611, 1.5246], [1.5214, 1.5212, 1.6275], [1.7935, 1.7931, 1.9178], [2.356, 2.3558, 2.4104]], "round": [[1.7071, 1.7071, 1.9125], [1.7302, 1.7304, 1.9385], [1.7659, 1.7658, 1.8888], [1.8259, 1.8256, 1.9527], [1.6863, 1.6861, 1.7254]], "vernis": [[1.4734, 1.4733, 1.4733], [1.5628, 1.5629, 1.5625], [1.6938, 1.6938, 1.694], [1.9046, 1.9048, 1.9044], [2.5026, 2.5028, 2.5024]], "or": [[1.6114, 1.6116, 1.6116], [1.6098, 1.6098, 1.6094], [1.6071, 1.607, 1.6072], [1.603, 1.6033, 1.6029], [1.5322, 1.5322, 1.532]]},
};
const FIN_PX = [{ label: "Sans pelliculage" }, { label: "Pelliculage mat soft-touch (recto)", hint: "Toucher velours", px: "l_soft1" }, { label: "Pelliculage brillant (recto/verso)", hint: "Couleurs éclatantes", px: "l_bri2" },
  { label: "Pelliculage mat (recto)", px: "l_mat1" }, { label: "Pelliculage mat (recto/verso)", px: "l_mat2" }, { label: "Pelliculage soft-touch (recto/verso)", px: "l_soft2" },
  { label: "Vernis sélectif 3D", hint: "Relief brillant au toucher", px: "vernis" }, { label: "Dorure or 3D", hint: "Effet métallisé en relief", px: "or" }];
(() => {
  const D = () => [
    { id: "day", label: "Jour même", sub: "Paris 20 € · IDF 40 € · Express +40 %", short: "Jour même", days: 0, paid: true },
    ...[[2, 0], [3, 1], [5, 2]].map(([n, col]) => { const [wd, dd] = fmtDay(workDate(n)); return { id: "j" + n, col, days: n, label: wd.charAt(0).toUpperCase() + wd.slice(1) + " " + dd, sub: n === 5 ? "Le moins cher · livraison incluse" : "Livraison incluse", short: wd + " " + dd }; }),
  ];
  const fmtIdx = (o) => ["8,5 × 5,5", "9,0 × 5,0", "8,5 × 5,0", "5,5 × 5,5"].findIndex((f) => o.label.replace("8,50", "8,5").replace("5,50", "5,5").replace("9,00", "9,0").replace("5,00", "5,0").startsWith(f));
  const price = (p) => (qi, choices, d) => {
    const opt = (id) => { const i = p.groups.findIndex((g) => g.id === id); return i < 0 ? null : p.groups[i].options[choices?.[i] ?? 0]; };
    const col = d.id === "day" ? 0 : d.col;
    let v = CARD_PX.fmt[Math.max(0, fmtIdx(opt("format")))][qi][col];
    p.groups.forEach((g, i) => { const o = g.options[choices?.[i] ?? 0]; if (o && o.px) v *= CARD_PX.r[o.px][qi][col]; });
    if (d.id === "day") v *= 1.4 * (/verso/i.test((opt("impression") || {}).label || "") ? 1.1 : 1);
    return v;
  };
  Object.entries(PRODUCTS).forEach(([k, p]) => {
    p.qty = CARD_PX.qty.slice(); p.defQty = 100; p.deliv = D(); p.defDeliv = "j5"; delete p.base;
    p.groups.forEach((g) => g.options.forEach((o) => { delete o.mult; }));
    const g = (id) => p.groups.find((x) => x.id === id);
    if (g("finition")) g("finition").options = FIN_PX.map((o) => ({ ...o }));
    if (g("coins")) g("coins").options[1].px = "round";
    p.px = price(p);
  });
  /* Cartes classiques : papiers et grammages proposés chez Pixartprinting */
  PRODUCTS.cartes.groups.find((x) => x.id === "papier").options = [{ label: "Classic demimatt – Couché mat" }, { label: "Classic gloss – Couché brillant" }, { label: "Papier recyclé", px: "recycle" }, { label: "Papier Havane (kraft)", px: "havane" }];
  PRODUCTS.cartes.groups.find((x) => x.id === "grammage").options = [{ label: "350 g", hint: "Le standard, rigide" }, { label: "300 g", px: "g300" }, { label: "250 g", px: "g250" }, { label: "130 g", hint: "Fin et léger", px: "g130" }];
  PRODUCTS.cartes.groups.find((x) => x.id === "grammage").label = "Grammage";
  const kraft = PRODUCTS.classic.groups.find((x) => x.id === "papier").options.find((o) => /kraft/i.test(o.label)); if (kraft) kraft.px = "havane";
})();

/* ---------- Grille Pixartprinting pour les autres familles (relevé du 25/11/2026, prix barrés HT) ----------
   F.px = { qty, days: [3 délais en jours ouvrés], t: tableaux relevés, key(s, choix) → nom du tableau,
            r: rapports de prix des options (option.px) }. Jour même = 1er délai + 40 % (+10 % recto/verso), jusqu'à 5 000. */
function pxGrid(F) {
  const P = F.px, r2 = (n) => Math.round(n * 100) / 100;
  const G = { qty: P.qty, cols: [{ id: "day", sameDay: true, badge: "Express +40 %" }, { id: "j2", days: P.days[0], badge: "" }, { id: "j3", days: P.days[1], badge: "" }, { id: "j5", days: P.days[2], badge: "Le moins cher" }] };
  const rows = (s, ch) => P.t[P.key(s, ch || [])];
  const mult = (ch, q, c) => F.groups.reduce((m, g, i) => { const o = g.options[(ch || [])[i] || 0]; const r = o && o.px && P.r && P.r[o.px]; return r ? m * (r[q] && r[q][c] != null ? r[q][c] : NaN) : m; }, 1);
  G.apply = (s, rv, pi, ch) => {
    const t = rows(s, ch) || [];
    G.cols.forEach((col, ci) => {
      col.now = P.qty.map((n, q) => {
        const c = col.sameDay ? 0 : ci - 1, b = t[q] && t[q][c], m = mult(ch, q, c);
        if (b == null || !isFinite(m) || (col.sameDay && n > 5000)) return null;
        return r2(b * m * (col.sameDay ? 1.4 * (rv ? 1.1 : 1) : 1));
      });
    });
  };
  F.sizes.forEach((z, s) => { const t = rows(s); const v = t && t.map((r) => r[2]).find((x) => x != null); if (v) z.price = v; });
  F.from = Math.min(...F.sizes.map((z) => z.price || Infinity));
  F.grid = G; G.apply(F.defSize || 0, false, 0, []);
  return G;
}

/* ---------- Branchement des relevés Pixartprinting (assets/pxdata.js) sur les familles ---------- */
(() => {
  if (typeof PXDATA === "undefined") return;
  const wire = (fk, key, extra) => {
    const d = PXDATA[fk], F = FORMATS[fk]; if (!d || !F) return;
    F.px = Object.assign({ qty: d.qty, days: d.days || [2, 3, 5], t: d.t, r: d.r || {}, key }, extra || {});
    pxGrid(F);
  };
  const c = (F, id, ch) => { const i = F.groups.findIndex((g) => g.id === id); return i < 0 ? 0 : ch[i] || 0; };
  wire("depliants", (s, ch) => "s" + s + "_" + c(FORMATS.depliants, "papier", ch));
})();
(() => {
  if (typeof PXDATA === "undefined") return;
  const wire = (fk, key, extra) => { const d = PXDATA[fk], F = FORMATS[fk]; if (!d || !F) return; F.px = Object.assign({ qty: d.qty, days: d.days || [2, 3, 5], t: d.t, r: d.r || {}, key }, extra || {}); pxGrid(F); };
  const ci = (F, id, ch) => { const i = F.groups.findIndex((g) => g.id === id); return i < 0 ? 0 : ch[i] || 0; };
  /* Affiches : papiers des affiches grand format Pixartprinting (prix à l'unité, 1 à 5 affiches) */
  const A = FORMATS.affiches;
  A.groups.find((g) => g.id === "papier").options = [
    { label: "Papier affiche dos blanc", hint: "Le standard intérieur" }, { label: "Papier photo haute qualité", hint: "Couleurs et détails photo" },
    { label: "Papier affiche dos bleu", hint: "Affichage extérieur, opaque" }, { label: "Backlight", hint: "Caisson lumineux", quote: true }];
  A.unit = "affiche(s)";
  wire("affiches", (s, ch) => "s" + s + "_" + ci(A, "papier", ch));
})();
