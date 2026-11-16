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
  cartes: "1718670013988-c6e3edb92345",        // carte de visite noire
  flyers: "1563097013-a1df1d1fd1c7",           // flyer tendu à la main
  depliants: "1769893715447-8f12c382e49c",     // dépliants pliés
  brochures: "1658863025658-4a259cc68fc9",     // brochures et livres imprimés
  affiches: "1563050860-87d45eaaeabb",         // mur d'affiches
  papeterie: "1520764588094-8fc067746a8e",     // papeterie d'entreprise
  etiquettes: "1773904215704-139e9ff8c894",    // impression d'autocollants
  vinyle: "1701921729931-28722c1b747e",        // adhésif sur vitrine
  rollup: "1761225646548-bc92fea0dc72",        // stand avec visuel imprimé
  signaletique: "1577980158219-1d4fb3ec8378",  // enseigne de façade
  rigide: "1543487945-139a97f387d5",           // affiche encadrée
  plv: "1761195689615-9469b65dac01",           // salon professionnel
  packaging: "1595246007497-15e0ed4b8d96",     // boîtes personnalisées
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
  { id: "flyers-tracts", name: "Flyers & tracts", blurb: "Du A6 au A3, pour vos événements et opérations commerciales.", items: [{ n: "Flyers & Brochures", from: 14.9 }, "Flyer 10×15 cm", "Flyer A6", "Flyer DL 10×21 cm", "Flyer A5", "Flyer A4", "Flyer A3"] },
  { id: "depliants-plaquettes", name: "Dépliants & plaquettes", blurb: "1, 2 ou 3 plis pour vos présentations.", items: ["Dépliant 1 pli", "Dépliant 2 plis", "Dépliant 3 plis"] },
  { id: "catalogue-brochures", name: "Catalogues & brochures", blurb: "Agrafé, spirale, dos carré collé.", items: ["Brochure agrafée", "Spirale métallique", "Dos carré collé", "Couverture rigide"] },
  { id: "affiche-poster", name: "Affiches & posters", blurb: "À l'unité ou en série, jusqu'à l'Abribus.", items: ["Affiches à l'unité", "Affiches petit format", "Affiche grand format", "Affiche Abribus", "Affiche dos bleu", "Affiche fluo", "Affiche autocollante", "Affiche backlight"] },
  { id: "papeterie-bureautique", name: "Papeterie & bureautique", blurb: "En-têtes, administratif, plaques gravées.", items: ["Bureautique", "Administratif", "Plaque gravure"] },
  { id: "etiquettes-autocollants", name: "Étiquettes & autocollants", blurb: "Rouleaux, holographiques, imperméables.", items: ["Étiquettes en rouleau standards", "Étiquettes en plastique", "Étiquettes en papier", "Étiquettes avec finitions spéciales", "Étiquettes holographiques", "Étiquettes Premium", "Étiquettes imperméables", "Étiquettes repositionnables"] },
  { id: "vinyle-adhesif", name: "Vinyle adhésif", blurb: "Vitrines, murs, sols et véhicules.", items: ["Adhésifs pour vitrines", "Adhésifs muraux", "Adhésifs pour voitures et motos", "Covering voiture", "Adhésif pour sols", "Lettrage adhésif", "Adhésif vinyle transparent", "Adhésifs dépoli", "Adhésifs microperforé", "Vitrophanie"] },
  { id: "roll-up-kakemono", name: "Roll-up & kakémono", blurb: "Imprimé en 24h, livré dans la journée.", items: [{ n: "Roll-Up Stand & Kakemono", from: 49, x: 1 }] },
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
const itemHref = (it) => (isConf(it) ? "produit.html?p=" + it.p : "contact.html?produit=" + encodeURIComponent(itemName(it)));
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
