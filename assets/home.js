/* Accueil — sections interactives affichées sur ordinateur. */
(() => {
  const $ = (id) => document.getElementById(id);
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Chiffres qui comptent ---------- */
  const total = CATS.reduce((n, c) => n + c.items.length, 0);
  $("stat-products").dataset.count = total;
  $("stat-products").textContent = total;
  const counters = document.querySelectorAll("[data-count]");
  const run = (el) => {
    const to = +el.dataset.count, t0 = performance.now(), dur = 1400;
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(to * e).toLocaleString("fr-FR");
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!still && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { run(x.target); io.unobserve(x.target); } }), { threshold: 0.6 });
    counters.forEach((c) => io.observe(c));
  }

  /* ---------- Prix dégressifs (grille réelle des cartes de visite) ---------- */
  const P = PRODUCTS.classic, range = $("dg-range"), chart = $("dg-chart");
  const unit = (i) => P.base[i] / P.qty[i], maxU = unit(0);
  const short = (q) => (q >= 1000 ? String(q / 1000).replace(".", ",") + "k" : q);
  $("dg-ticks").innerHTML = P.qty.map((q) => `<span>${short(q)}</span>`).join("");
  chart.innerHTML = P.qty.map((q, i) => `
    <button type="button" class="bar" data-i="${i}" style="--h:${Math.max(6, (unit(i) / maxU) * 100)}%" tabindex="-1">
      <em>${unit(i).toLocaleString("fr-FR", { minimumFractionDigits: 3, maximumFractionDigits: 3 })} €</em><i></i><span>${short(q)} ex.</span>
    </button>`).join("");
  const draw = () => {
    const i = +range.value;
    $("dg-qty").textContent = P.qty[i].toLocaleString("fr-FR") + " ex.";
    $("dg-unit").textContent = unit(i).toLocaleString("fr-FR", { minimumFractionDigits: 3, maximumFractionDigits: 3 }) + " €";
    $("dg-total").textContent = eur(P.base[i]);
    $("dg-go").href = "produit.html?p=classic&d=eco&q=" + i;
    $("dg-save").textContent = i ? "−" + Math.round((1 - unit(i) / maxU) * 100) + " % à l'unité par rapport à 100 ex." : "";
    range.style.setProperty("--fill", (i / (P.qty.length - 1)) * 100 + "%");
    chart.querySelectorAll(".bar").forEach((b) => b.classList.toggle("is-on", +b.dataset.i === i));
    if (window.bump) bump($("dg-unit"));
  };
  range.addEventListener("input", draw);
  chart.addEventListener("click", (e) => { const b = e.target.closest(".bar"); if (b) { range.value = b.dataset.i; draw(); } });
  draw();

  /* ---------- Finitions : la carte change d'aspect ---------- */
  const FX = [
    { id: "mat", name: "Couché demi-mat 350 g", hint: "Aspect satiné, tenue en main rigide et soignée." },
    { id: "brillant", name: "Pelliculage brillant", hint: "Finition glacée, couleurs vives et contrastées." },
    { id: "soft", name: "Mat soft-touch", hint: "Toucher velours, rendu profond et élégant." },
    { id: "or", name: "Vernis sélectif 3D / dorure or", hint: "Finition Deluxe : reliefs brillants et marquage doré." },
    { id: "kraft", name: "Kraft brun naturel 300 g", hint: "Papier recyclé non blanchi, esprit vintage." },
  ];
  const card = $("fx-card"), stage = $("fx-stage"), list = $("fx-list");
  list.innerHTML = FX.map((f, i) => `<button type="button" role="tab" class="fx ${i ? "" : "is-on"}" data-fx="${f.id}" aria-selected="${!i}"><span class="fx__dot fx__dot--${f.id}"></span><span><b>${f.name}</b><small>${f.hint}</small></span></button>`).join("");
  const pick = (id) => {
    card.dataset.fx = id;
    list.querySelectorAll(".fx").forEach((b) => { const on = b.dataset.fx === id; b.classList.toggle("is-on", on); b.setAttribute("aria-selected", on); });
    card.classList.remove("is-flip"); void card.offsetWidth; card.classList.add("is-flip");
  };
  list.addEventListener("click", (e) => { const b = e.target.closest(".fx"); if (b) pick(b.dataset.fx); });
  list.addEventListener("mouseover", (e) => { const b = e.target.closest(".fx"); if (b && b.dataset.fx !== card.dataset.fx) pick(b.dataset.fx); });
  if (!still) {
    stage.addEventListener("mousemove", (e) => {
      const r = stage.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty("--rx", (-y * 16).toFixed(2) + "deg");
      card.style.setProperty("--ry", (x * 22).toFixed(2) + "deg");
      card.style.setProperty("--sx", ((x + 0.5) * 100).toFixed(1) + "%");
    });
    stage.addEventListener("mouseleave", () => { card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg"); });
  }

  /* ---------- Tous les produits en bandeau ---------- */
  const all = CATS.flatMap((c) => c.items.map((it) => `<a href="${itemHref(it)}">${esc(itemName(it))}</a>`));
  const half = Math.ceil(all.length / 2);
  $("chips-a").innerHTML = `<div>${all.slice(0, half).join("").repeat(2)}</div>`;
  $("chips-b").innerHTML = `<div>${all.slice(half).join("").repeat(2)}</div>`;

  /* ---------- Halo qui suit la souris sur les blocs sombres ---------- */
  document.querySelectorAll(".dark").forEach((d) => d.addEventListener("mousemove", (e) => {
    const r = d.getBoundingClientRect();
    d.style.setProperty("--mx", e.clientX - r.left + "px");
    d.style.setProperty("--my", e.clientY - r.top + "px");
  }));
})();
