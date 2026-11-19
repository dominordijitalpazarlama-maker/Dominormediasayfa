/* =========================================================
   GALERİ — Supabase'ten içerikleri çeker, eşit ızgarada gösterir.
   Bağlantı kurulamazsa ya da içerik yoksa galeri bölümü (ve menüdeki
   bağlantısı) hiç görünmez; ziyaretçi boş bir bölüm görmez.
   ========================================================= */
(function () {
  "use strict";

  var section = document.getElementById("gallery");
  var grid = document.getElementById("galleryGrid");
  var filterWrap = document.getElementById("galleryFilter");
  if (!section || !grid || !filterWrap) return;

  var btns = Array.prototype.slice.call(filterWrap.querySelectorAll(".seg-btn"));
  var glider = filterWrap.querySelector(".seg-glider");
  var SVG_NS = "http://www.w3.org/2000/svg";

  var items = [];
  var activeFilter = "all";

  function safeUrl(u) {
    try {
      var p = new URL(u, location.href).protocol;
      return p === "https:" || p === "http:";
    } catch (e) { return false; }
  }

  function placeGlider(animate) {
    var active = btns.filter(function (b) { return b.classList.contains("active"); })[0];
    if (!active || !glider) return;
    var c = filterWrap.getBoundingClientRect();
    var r = active.getBoundingClientRect();
    if (!animate) glider.classList.add("no-anim");
    glider.style.width = r.width + "px";
    glider.style.height = r.height + "px";
    glider.style.transform = "translate(" + (r.left - c.left) + "px," + (r.top - c.top) + "px)";
    if (!animate) { void glider.offsetWidth; glider.classList.remove("no-anim"); }
  }

  function icon(id) {
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("class", "i");
    var use = document.createElementNS(SVG_NS, "use");
    use.setAttribute("href", "#" + id);
    svg.appendChild(use);
    return svg;
  }

  function render() {
    var list = activeFilter === "all" ? items : items.filter(function (i) { return i.type === activeFilter; });
    grid.replaceChildren();

    if (!list.length) {
      var p = document.createElement("p");
      p.className = "gallery-empty";
      p.textContent = "Bu kategoride henüz içerik yok.";
      grid.appendChild(p);
      return;
    }

    var lbItems = list.map(function (it) {
      return { type: it.type === "video" ? "video" : "image", src: it.url, caption: it.title || "" };
    });

    list.forEach(function (it, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "g-item";
      b.style.setProperty("--gi", Math.min(i, 12));
      b.setAttribute("aria-label", it.title || (it.type === "video" ? "Videoyu aç" : "Görseli büyüt"));

      if (it.type === "video") {
        var v = document.createElement("video");
        v.src = it.url + "#t=0.1";
        v.muted = true;
        v.playsInline = true;
        v.preload = "metadata";
        b.appendChild(v);
        var badge = document.createElement("span");
        badge.className = "g-play";
        badge.appendChild(icon("i-play"));
        b.appendChild(badge);
      } else {
        var img = new Image();
        img.src = it.url;
        img.alt = it.title || "Galeri görseli";
        img.loading = "lazy";
        img.decoding = "async";
        b.appendChild(img);
      }

      if (it.title) {
        var cap = document.createElement("span");
        cap.className = "g-cap";
        cap.textContent = it.title;
        b.appendChild(cap);
      }

      b.addEventListener("click", function () {
        if (window.DominorLightbox) window.DominorLightbox.open(lbItems, i, b);
      });
      grid.appendChild(b);
    });
  }

  function reveal() {
    section.hidden = false;
    Array.prototype.forEach.call(document.querySelectorAll("[data-gallery-link]"), function (a) { a.hidden = false; });
    window.dispatchEvent(new Event("dm:layout"));
    requestAnimationFrame(function () { placeGlider(false); });
  }

  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      btns.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
      activeFilter = btn.dataset.filter;
      placeGlider(true);
      render();
    });
  });
  window.addEventListener("resize", function () { if (!section.hidden) placeGlider(false); });

  async function load() {
    if (typeof supabaseClient === "undefined" || !supabaseClient) return;
    try {
      var res = await supabaseClient
        .from("gallery_items")
        .select("*")
        .order("created_at", { ascending: false });
      if (res.error || !res.data || !res.data.length) return;
      items = res.data.filter(function (i) {
        return i && typeof i.url === "string" && safeUrl(i.url) && (i.type === "image" || i.type === "video");
      });
      if (!items.length) return;
      reveal();
      render();
    } catch (e) {
      /* bağlantı yoksa galeri gizli kalır */
    }
  }

  load();
})();
