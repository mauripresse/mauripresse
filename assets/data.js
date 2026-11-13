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

/* Modes de livraison (multiplicateur appliqué au prix de base) */
const DELIVERY = [
  { id: "std", label: "Standard", sub: "3 – 4 jours", short: "3 – 4 jours", mult: 1, days: 4 },
  { id: "exp", label: "Express", sub: "24 / 48 h", short: "Express 24/48h", mult: 1.25, days: 2 },
  { id: "day", label: "Retrait atelier", sub: "Jour même · Paris 10e", short: "Jour même", mult: 1.35, days: 0 },
];

/* Produits configurables en ligne */
const PRODUCTS = {
  cartes: {
    name: "Cartes de visite classiques",
    cat: "Cartes de visite", catId: "cartes-de-visite",
    img: PH(PHOTOS.cartes),
    desc: "Le support incontournable de votre communication professionnelle. Papier couché 350 g, formats standards et finitions personnalisées.",
    qty: [100, 250, 500, 1000, 2500, 5000, 10000],
    base: [22.8, 28.8, 33.6, 45.6, 78, 132, 234],
    defQty: 500,
    groups: [
      { id: "format", label: "Format fini", options: [
        { label: "8,5 × 5,5 cm", hint: "Standard carte bancaire" },
        { label: "9 × 5 cm", hint: "Allongé" },
        { label: "8,5 × 5 cm", hint: "Format italien" },
        { label: "5,5 × 5,5 cm", hint: "Carré", mult: 1.05 },
      ]},
      { id: "orientation", label: "Orientation", options: [
        { label: "Horizontale" }, { label: "Verticale" },
      ]},
      { id: "impression", label: "Impression", options: [
        { label: "Recto seul" },
        { label: "Recto / verso identiques", mult: 1.15 },
        { label: "Recto / verso différents", mult: 1.2 },
      ]},
      { id: "papier", label: "Papier & grammage", options: [
        { label: "Couché demi-mat 350 g", hint: "Aspect satiné, tenue en main rigide et soignée." },
        { label: "Couché brillant 350 g", hint: "Finition glacée, couleurs vives et contrastées." },
        { label: "Kraft brun naturel 300 g", hint: "Papier recyclé non blanchi, esprit vintage.", mult: 1.1 },
      ]},
      { id: "finition", label: "Finition & pelliculage", options: [
        { label: "Sans pelliculage" },
        { label: "Mat soft-touch", hint: "Toucher velours", mult: 1.15 },
        { label: "Pelliculage brillant", hint: "Couleurs éclatantes", mult: 1.12 },
        { label: "Vernis sélectif 3D / dorure or", hint: "Finition Deluxe", mult: 1.6 },
      ]},
      { id: "coins", label: "Découpe des coins", options: [
        { label: "Coins carrés" },
        { label: "Coins arrondis", hint: "Rayon 4 mm", mult: 1.08 },
      ]},
      { id: "controle", label: "Vérification du fichier", options: [
        { label: "Contrôle automatique", hint: "Dimensions et format — inclus." },
        { label: "Contrôle par un graphiste + BAT", hint: "Polices, fonds perdus, colorimétrie CMJN.", add: 3.5 },
      ]},
    ],
  },
  flyers: {
    name: "Flyers & tracts",
    cat: "Flyers & tracts", catId: "flyers-tracts",
    img: PH(PHOTOS.flyers),
    desc: "Flyers du A6 au A3 sur papier couché brillant ou mat, 135 g ou 170 g. Idéal pour vos événements, ouvertures et opérations commerciales.",
    qty: [100, 250, 500, 1000, 2500, 5000, 10000],
    base: [14.9, 22.9, 31.9, 44.9, 79, 129, 219],
    defQty: 500,
    groups: [
      { id: "format", label: "Format", options: [
        { label: "A6", hint: "10,5 × 14,8 cm" },
        { label: "10 × 15 cm", hint: "Carte postale" },
        { label: "DL", hint: "10 × 21 cm", mult: 1.1 },
        { label: "A5", hint: "14,8 × 21 cm", mult: 1.35 },
        { label: "A4", hint: "21 × 29,7 cm", mult: 1.9 },
        { label: "A3", hint: "29,7 × 42 cm", mult: 3.2 },
      ]},
      { id: "impression", label: "Impression", options: [
        { label: "Recto seul" }, { label: "Recto / verso", mult: 1.18 },
      ]},
      { id: "papier", label: "Papier & grammage", options: [
        { label: "Couché brillant 135 g" },
        { label: "Couché mat 135 g" },
        { label: "Couché brillant 170 g", mult: 1.12 },
        { label: "Couché mat 170 g", mult: 1.12 },
      ]},
      { id: "controle", label: "Vérification du fichier", options: [
        { label: "Contrôle automatique", hint: "Dimensions et format — inclus." },
        { label: "Contrôle par un graphiste + BAT", hint: "Polices, fonds perdus, colorimétrie CMJN.", add: 3.5 },
      ]},
    ],
  },
  rollup: {
    name: "Roll-up & kakémono",
    cat: "Roll up kakemono", catId: "roll-up-kakemono",
    img: PH(PHOTOS.rollup),
    desc: "Structure aluminium rétractable avec bâche haute résolution anti-froissement. Montage en quelques secondes pour salons, vitrines et événements.",
    qty: [1, 2, 5, 10],
    base: [49, 94, 225, 430],
    defQty: 1,
    groups: [
      { id: "format", label: "Format du visuel", options: [
        { label: "85 × 200 cm", hint: "Le standard salon" },
        { label: "100 × 200 cm", mult: 1.2 },
        { label: "120 × 200 cm", mult: 1.45 },
      ]},
      { id: "structure", label: "Structure", options: [
        { label: "Aluminium standard", hint: "Housse de transport incluse." },
        { label: "Aluminium premium", hint: "Pied large, usage intensif.", mult: 1.35 },
      ]},
      { id: "controle", label: "Vérification du fichier", options: [
        { label: "Contrôle automatique", hint: "Dimensions et format — inclus." },
        { label: "Contrôle par un graphiste + BAT", hint: "Résolution, fonds perdus, colorimétrie.", add: 3.5 },
      ]},
    ],
  },
};

/* Catalogue complet (catégories et produits du site actuel).
   Un produit avec `p` ouvre le configurateur ; les autres partent en devis. */
const CATS = [
  { id: "reprographie", name: "Reprographie", blurb: "Copies, impressions et reliures minute.", items: ["Photocopie", "Impression", "Reliures", "Scan et numérisation", "Plastification"] },
  { id: "cartes-de-visite", name: "Cartes de visite", blurb: "Classiques, pelliculées, Deluxe ou PVC.", items: [{ n: "Cartes de visite classiques", p: "cartes" }, "Cartes de visite pelliculées", "Cartes de fidélité", "Cartes de visite finitions Deluxe", "Cartes de visite en PVC", "Cartes de correspondance", "Cartes postales"] },
  { id: "flyers-tracts", name: "Flyers & tracts", blurb: "Du A6 au A3, en 24 h si besoin.", items: [{ n: "Flyer 10×15 cm", p: "flyers", o: 1 }, { n: "Flyer A6", p: "flyers", o: 0 }, { n: "Flyer DL 10×21 cm", p: "flyers", o: 2 }, { n: "Flyer A5", p: "flyers", o: 3 }, { n: "Flyer A4", p: "flyers", o: 4 }, { n: "Flyer A3", p: "flyers", o: 5 }] },
  { id: "depliants-plaquettes", name: "Dépliants & plaquettes", blurb: "1, 2 ou 3 plis pour vos présentations.", items: ["Dépliant 1 pli", "Dépliant 2 plis", "Dépliant 3 plis"] },
  { id: "catalogue-brochures", name: "Catalogues & brochures", blurb: "Agrafé, spirale, dos carré collé.", items: ["Brochure agrafée", "Spirale métallique", "Dos carré collé", "Couverture rigide"] },
  { id: "affiche-poster", name: "Affiches & posters", blurb: "À l'unité ou en série, jusqu'à l'Abribus.", items: ["Affiches à l'unité", "Affiches petit format", "Affiche grand format", "Affiche Abribus", "Affiche dos bleu", "Affiche fluo", "Affiche autocollante", "Affiche backlight"] },
  { id: "papeterie-bureautique", name: "Papeterie & bureautique", blurb: "En-têtes, administratif, plaques gravées.", items: ["Bureautique", "Administratif", "Plaque gravure"] },
  { id: "etiquettes-autocollants", name: "Étiquettes & autocollants", blurb: "Rouleaux, holographiques, imperméables.", items: ["Étiquettes en rouleau standards", "Étiquettes en plastique", "Étiquettes en papier", "Étiquettes avec finitions spéciales", "Étiquettes holographiques", "Étiquettes Premium", "Étiquettes imperméables", "Étiquettes repositionnables"] },
  { id: "vinyle-adhesif", name: "Vinyle adhésif", blurb: "Vitrines, murs, sols et véhicules.", items: ["Adhésifs pour vitrines", "Adhésifs muraux", "Adhésifs pour voitures et motos", "Covering voiture", "Adhésif pour sols", "Lettrage adhésif", "Adhésif vinyle transparent", "Adhésifs dépoli", "Adhésifs microperforé", "Vitrophanie"] },
  { id: "roll-up-kakemono", name: "Roll-up & kakémono", blurb: "Structures rétractables prêtes à poser.", items: [{ n: "Roll-up & kakémono", p: "rollup" }] },
  { id: "signaletique-enseignes", name: "Signalétique & enseignes", blurb: "Enseignes, bâches et plaques pro.", items: ["Enseignes extérieures", "Bâches & banderoles PVC", "Plaques professionnelles laiton / alu"] },
  { id: "support-rigide", name: "Supports rigides", blurb: "Panneaux rigides sur mesure.", items: ["Panneaux & supports rigides"] },
  { id: "plv-expo", name: "PLV & expo", blurb: "Stands, présentoirs et PLV.", items: ["PLV, stands & expo"] },
  { id: "objets-packaging", name: "Sacs, objets pub & packaging", blurb: "Textile, goodies et boîtes personnalisées.", items: ["Sacs personnalisés", "Objets publicitaires", "Packaging & boîtes", "Textile personnalisé"] },
];

/* ---------- Utilitaires partagés ---------- */
const eur = (n) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const itemName = (it) => (typeof it === "string" ? it : it.n);
const itemHref = (it) => {
  if (typeof it === "string") return "contact.html?produit=" + encodeURIComponent(it);
  return "produit.html?p=" + it.p + (it.o != null ? "&format=" + it.o : "");
};
const fromPrice = (key) => Math.min(...PRODUCTS[key].base);

/* Prix HT d'une configuration : base(quantité) × options × livraison + suppléments */
function computePrice(key, qtyIndex, choices, deliveryId) {
  const p = PRODUCTS[key];
  let price = p.base[qtyIndex], add = 0;
  p.groups.forEach((g, i) => {
    const o = g.options[choices?.[i] ?? 0] || g.options[0];
    if (o.mult) price *= o.mult;
    if (o.add) add += o.add;
  });
  const d = DELIVERY.find((x) => x.id === deliveryId) || DELIVERY[0];
  return Math.round((price * d.mult + add) * 100) / 100;
}

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
