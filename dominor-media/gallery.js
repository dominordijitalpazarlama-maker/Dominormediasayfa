/* =========================================================
   GALERİ — Supabase'ten içerikleri çeker, eşit ızgarada gösterir
   ========================================================= */
(function () {
  const grid = document.getElementById("galleryGrid");
  const empty = document.getElementById("galleryEmpty");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const lightbox = document.getElementById("lightbox");
  const lightboxContent = document.getElementById("lightboxContent");
  const lightboxClose = document.getElementById("lightboxClose");

  if (!grid) return;

  let items = [];
  let activeFilter = "all";

  async function loadGallery() {
    if (!supabaseClient) {
      empty.textContent = "Galeri için Supabase bağlantısı gerekli (supabase-config.js dosyasını doldur).";
      return;
    }
    const { data, error } = await supabaseClient
      .from("gallery_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      empty.textContent = "İçerikler yüklenemedi.";
      return;
    }
    items = data || [];
    render();
  }

  function render() {
    const filtered =
      activeFilter === "all" ? items : items.filter((i) => i.type === activeFilter);

    if (!filtered.length) {
      grid.innerHTML = '<p class="gallery-empty">Bu kategoride henüz içerik yok.</p>';
      return;
    }

    grid.innerHTML = filtered
      .map((item, idx) => {
        const caption = item.title
          ? `<div class="item-caption">${escapeHtml(item.title)}</div>`
          : "";
        if (item.type === "video") {
          return `
            <figure class="gallery-item" data-index="${idx}" data-type="video" data-url="${item.url}">
              <video src="${item.url}" muted playsinline preload="metadata"></video>
              <span class="play-badge">▶</span>
              ${caption}
            </figure>`;
        }
        return `
          <figure class="gallery-item" data-index="${idx}" data-type="image" data-url="${item.url}">
            <img src="${item.url}" alt="${escapeHtml(item.title || "Galeri görseli")}" loading="lazy" />
            ${caption}
          </figure>`;
      })
      .join("");

    grid.querySelectorAll(".gallery-item").forEach((el) => {
      el.addEventListener("click", () => openLightbox(el.dataset.type, el.dataset.url));
    });
  }

  // --- Filtreler ---
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      render();
    });
  });

  // --- Lightbox ---
  function openLightbox(type, url) {
    lightboxContent.innerHTML =
      type === "video"
        ? `<video src="${url}" controls autoplay playsinline></video>`
        : `<img src="${url}" alt="" />`;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    lightboxContent.innerHTML = "";
    document.body.style.overflow = "";
  }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  loadGallery();
})();
