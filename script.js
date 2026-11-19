/* =========================================================
   DOMINOR MEDIA — site etkileşimleri (derleme gerektirmez)

   İLETİŞİM FORMU AYARLARI (Telegram botu)
   Form gönderildiğinde mesaj bu bota iletilir.
   ========================================================= */
const TELEGRAM_BOT_TOKEN = "8882681341:AAFQNpSRdPD2b8tcFGlocnwNOsFYW-eo0ww";
const TELEGRAM_CHAT_ID = "-5436782601";

(() => {
  "use strict";

  /* ---------- Yardımcılar ---------- */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const store = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* yoksay */ } },
  };

  /* ---------- Açılış ekranı ---------- */
  let setReady;
  const ready = new Promise((res) => { setReady = res; });

  function finishIntro() {
    if (root.classList.contains("ready")) return;
    root.classList.add("ready");
    const loader = $("#loader");
    if (loader) {
      loader.classList.add("done");
      setTimeout(() => loader.remove(), 1500);
    }
    store.set("dm-intro", "1");
    setReady();
  }

  (function intro() {
    // Oturumda ilk kez giriliyorsa açılış ekranı (loader) en az 900 ms görünür.
    // Sonraki ziyaretlerde yalnızca yazı tiplerinin hazır olmasını bekleriz.
    const quick = root.classList.contains("skip-intro") || reduced;
    const minShow = quick ? 0 : 900;
    const t0 = performance.now();
    const pageLoaded = new Promise((res) => {
      if (document.readyState === "complete") res();
      else addEventListener("load", res, { once: true });
    });
    const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    const cap = new Promise((res) => setTimeout(res, quick ? 1500 : 4000)); // ağ yavaşsa bile bekletme
    Promise.race([quick ? fontsReady : pageLoaded, cap]).then(() => {
      setTimeout(finishIntro, Math.max(0, minShow - (performance.now() - t0)));
    });
  })();

  /* ---------- Yıl ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Yumuşak kaydırma ---------- */
  let scrollToken = 0;
  ["wheel", "touchstart", "keydown", "mousedown"].forEach((ev) =>
    addEventListener(ev, () => { scrollToken++; }, { passive: true })
  );

  function scrollToY(y) {
    const max = root.scrollHeight - innerHeight;
    const target = clamp(y, 0, max);
    const start = scrollY;
    const dist = target - start;
    if (Math.abs(dist) < 2) return;
    if (reduced) { scrollTo(0, target); return; }

    const token = ++scrollToken;
    const dur = clamp(Math.abs(dist) * 0.55, 800, 1600);
    const t0 = performance.now();
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    (function step(now) {
      if (token !== scrollToken) return; // kullanıcı müdahale etti
      const p = clamp((now - t0) / dur, 0, 1);
      scrollTo(0, start + dist * ease(p));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const el = document.getElementById(id.slice(1));
    if (!el || el.hidden) return;
    e.preventDefault();
    closeMenu();
    scrollToY(id === "#top" ? 0 : el.getBoundingClientRect().top + scrollY);
    try { history.replaceState(null, "", id); } catch (err) { /* file:// vb. */ }
  });

  /* ---------- Üst menü ---------- */
  const nav = $("#nav");
  const navLinks = $("#navLinks");
  const glider = navLinks ? $(".nav-glider", navLinks) : null;
  let activeLink = null;

  function placeGlider(el) {
    if (!glider) return;
    if (!el) { glider.style.opacity = "0"; return; }
    const animate = glider.style.opacity === "1";
    const c = navLinks.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (!animate) glider.classList.add("no-anim");
    glider.style.width = r.width + "px";
    glider.style.height = r.height + "px";
    glider.style.transform = `translate(${r.left - c.left}px, ${r.top - c.top}px)`;
    glider.style.opacity = "1";
    if (!animate) { void glider.offsetWidth; glider.classList.remove("no-anim"); }
  }

  if (navLinks) {
    navLinks.addEventListener("pointerover", (e) => {
      const a = e.target.closest("a");
      if (a && !a.hidden) placeGlider(a);
    });
    navLinks.addEventListener("pointerleave", () => placeGlider(activeLink));
  }

  function updateActive() {
    if (!navLinks) return;
    const line = innerHeight * 0.4;
    let current = null;
    for (const a of $$("a", navLinks)) {
      if (a.hidden) continue;
      const sec = document.getElementById(a.getAttribute("href").slice(1));
      if (!sec || sec.hidden) continue;
      const r = sec.getBoundingClientRect();
      if (r.top <= line && r.bottom > line) current = a;
    }
    if (current === activeLink) return;
    if (activeLink) activeLink.classList.remove("active");
    if (current) current.classList.add("active");
    activeLink = current;
    placeGlider(activeLink);
  }

  /* ---------- Mobil menü ---------- */
  const burger = $("#burger");
  const menu = $("#mobileMenu");

  function openMenu() {
    if (!menu) return;
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Menüyü kapat");
    root.style.overflow = "hidden";
  }
  function closeMenu() {
    if (!menu || !menu.classList.contains("open")) return;
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Menüyü aç");
    root.style.overflow = "";
  }
  if (burger) burger.addEventListener("click", () => (menu.classList.contains("open") ? closeMenu() : openMenu()));
  addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
  matchMedia("(min-width: 861px)").addEventListener("change", (e) => { if (e.matches) closeMenu(); });

  /* ---------- Kaydırma: ilerleme, menü durumu, paralaks ---------- */
  const progress = $("#progress");
  const parallaxEls = $$("[data-parallax]");

  function parallax() {
    if (reduced) return;
    const vh = innerHeight;
    parallaxEls.forEach((el) => {
      const host = el.parentElement.getBoundingClientRect();
      if (host.bottom < -200 || host.top > vh + 200) return;
      const off = host.top + host.height / 2 - vh / 2;
      el.style.setProperty("--py", (off * -parseFloat(el.dataset.parallax)).toFixed(1) + "px");
    });
  }

  let ticking = false;
  function update() {
    ticking = false;
    const max = root.scrollHeight - innerHeight;
    if (progress) progress.style.setProperty("--p", max > 0 ? (scrollY / max).toFixed(4) : "0");
    if (nav) nav.classList.toggle("scrolled", scrollY > 24);
    updateActive();
    parallax();
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", () => { onScroll(); placeGlider(activeLink); });
  addEventListener("dm:layout", () => { activeLink = null; onScroll(); }); // galeri bölümü açılınca
  update();

  /* ---------- Görünme animasyonları ---------- */
  $$("[data-stagger]").forEach((parent) =>
    $$(":scope > [data-reveal]", parent).forEach((c, i) => c.style.setProperty("--d", i * 90 + "ms"))
  );

  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        revealIO.unobserve(en.target);
        ready.then(() => en.target.classList.add("in"));
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  $$("[data-reveal]").forEach((el) => revealIO.observe(el));

  /* ---------- Sayaçlar ---------- */
  function countUp(el) {
    const target = +el.dataset.target || 0;
    const suffix = el.dataset.suffix || "";
    if (reduced) { el.textContent = target + suffix; return; }
    const dur = 2300;
    const t0 = performance.now();
    const ease = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    (function step(now) {
      const p = clamp((now - t0) / dur, 0, 1);
      el.textContent = Math.round(target * ease(p)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }
  const countIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        countIO.unobserve(en.target);
        ready.then(() => countUp(en.target));
      });
    },
    { threshold: 0.6 }
  );
  $$(".count").forEach((el) => {
    if (!reduced) el.textContent = "0" + (el.dataset.suffix || "");
    countIO.observe(el);
  });

  /* ---------- Hizmet kartları: imleci takip eden ışık ---------- */
  $$(".svc").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  /* ---------- Manyetik butonlar ---------- */
  if (fine && !reduced) {
    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${(x * 0.18).toFixed(1)}px, ${(y * 0.28).toFixed(1)}px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------- Hero: fareyle derinlik ---------- */
  const hero = $("#top");
  const hv = $("#heroVisual");
  if (hero && hv && fine && !reduced) {
    const items = $$(".hv-item", hv).map((el) => ({ el, depth: +el.dataset.depth || 10, x: 0, y: 0 }));
    let mx = 0, my = 0, running = false;

    const loop = () => {
      let moving = false;
      items.forEach((it) => {
        const tx = -mx * it.depth;
        const ty = -my * it.depth;
        it.x = lerp(it.x, tx, 0.07);
        it.y = lerp(it.y, ty, 0.07);
        if (Math.abs(it.x - tx) > 0.05 || Math.abs(it.y - ty) > 0.05) moving = true;
        it.el.style.setProperty("--tx", it.x.toFixed(2));
        it.el.style.setProperty("--ty", it.y.toFixed(2));
      });
      if (moving) requestAnimationFrame(loop); else running = false;
    };
    const kick = () => { if (!running) { running = true; requestAnimationFrame(loop); } };

    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
      kick();
    });
    hero.addEventListener("pointerleave", () => { mx = 0; my = 0; kick(); });
  }

  /* ---------- İmleç ışığı ---------- */
  const glow = $("#cursorGlow");
  if (glow && fine && !reduced) {
    let gx = 0, gy = 0, tx = 0, ty = 0, shown = false, running = false;
    const tick = () => {
      gx = lerp(gx, tx, 0.09);
      gy = lerp(gy, ty, 0.09);
      glow.style.transform = `translate3d(${gx.toFixed(1)}px, ${gy.toFixed(1)}px, 0)`;
      if (Math.abs(gx - tx) + Math.abs(gy - ty) > 0.4) requestAnimationFrame(tick); else running = false;
    };
    addEventListener("pointermove", (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!shown) { shown = true; gx = tx; gy = ty; glow.classList.add("on"); }
      if (!running) { running = true; requestAnimationFrame(tick); }
    }, { passive: true });
    root.addEventListener("mouseleave", () => glow.classList.remove("on"));
    root.addEventListener("mouseenter", () => { if (shown) glow.classList.add("on"); });
  }

  /* ---------- Görseli bulunamayan kutular ---------- */
  $$("img[data-img]").forEach((img) => {
    const fail = () => img.parentElement.classList.add("img-missing");
    img.addEventListener("error", fail);
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) fail();
  });

  /* ---------- Lightbox ---------- */
  const Lightbox = (() => {
    const el = $("#lightbox");
    if (!el) return null;
    const media = $("#lbMedia");
    const cap = $("#lbCaption");
    const count = $("#lbCount");
    const prev = $("#lbPrev");
    const next = $("#lbNext");
    const closeBtn = $(".lb-close", el);
    let items = [], index = 0, opener = null, hideTimer = 0, isOpen = false;

    function render() {
      const it = items[index];
      media.replaceChildren();
      let node;
      if (it.type === "video") {
        node = document.createElement("video");
        node.controls = true; node.autoplay = true; node.playsInline = true;
        node.addEventListener("loadeddata", () => node.classList.add("loaded"));
      } else {
        node = new Image();
        node.alt = it.caption || "";
        node.decoding = "async";
        node.addEventListener("load", () => node.classList.add("loaded"));
      }
      node.addEventListener("error", () => { cap.textContent = "İçerik yüklenemedi"; });
      node.src = it.src;
      media.append(node);
      cap.textContent = it.caption || "";
      count.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : "";
      prev.hidden = next.hidden = items.length < 2;
    }

    function open(list, i, trigger) {
      items = list; index = i;
      opener = trigger || document.activeElement;
      clearTimeout(hideTimer);
      el.hidden = false;
      render();
      void el.offsetWidth; // geçişin başlaması için
      el.classList.add("open");
      el.setAttribute("aria-hidden", "false");
      isOpen = true;
      root.style.overflow = "hidden";
      closeBtn.focus({ preventScroll: true });
    }

    function close() {
      if (!isOpen) return;
      isOpen = false;
      el.classList.remove("open");
      el.setAttribute("aria-hidden", "true");
      root.style.overflow = "";
      $$("video", media).forEach((v) => v.pause());
      hideTimer = setTimeout(() => { el.hidden = true; media.replaceChildren(); }, 800);
      if (opener && opener.focus) opener.focus({ preventScroll: true });
    }

    function go(d) {
      if (items.length < 2) return;
      index = (index + d + items.length) % items.length;
      render();
    }

    $$("[data-lb-close]", el).forEach((b) => b.addEventListener("click", close));
    prev.addEventListener("click", () => go(-1));
    next.addEventListener("click", () => go(1));

    addEventListener("keydown", (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "Tab") {
        const f = [closeBtn, prev, next].filter((b) => !b.hidden);
        const i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });

    // Dokunmatik kaydırma
    let sx = 0, sy = 0;
    el.addEventListener("pointerdown", (e) => { sx = e.clientX; sy = e.clientY; });
    el.addEventListener("pointerup", (e) => {
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
    });

    return { open, close };
  })();
  window.DominorLightbox = Lightbox;

  // Çalışmalar bölümündeki görseller
  const workBtns = $$('[data-lightbox="work"]');
  if (Lightbox && workBtns.length) {
    const list = workBtns.map((b) => {
      const img = $("img", b);
      return { type: "image", src: img ? img.currentSrc || img.src : "", caption: b.dataset.caption || "" };
    });
    workBtns.forEach((b, i) => b.addEventListener("click", () => {
      const img = $("img", b);
      if (img && img.parentElement.parentElement.classList.contains("img-missing")) return;
      list[i].src = img ? img.currentSrc || img.src : list[i].src;
      Lightbox.open(list, i, b);
    }));
  }

  /* ---------- İletişim formu -> Telegram botuna gönderim ---------- */
  const form = $("#contactForm");
  if (form) {
    const status = $("#formStatus");
    const btn = $("#submitBtn");
    const label = $(".btn-label", btn);
    const success = $("#formSuccess");
    const again = $("#formAgain");
    const card = $("#formCard");
    const fields = $$(".field", form);

    function setStatus(text, type, link) {
      status.className = "form-status" + (type ? " " + type : "");
      status.textContent = text || "";
      if (link) {
        const a = document.createElement("a");
        a.href = link.href; a.target = "_blank"; a.rel = "noopener"; a.textContent = link.text;
        status.append(a, " üzerinden ulaşabilirsiniz.");
      }
    }

    fields.forEach((f) => {
      const input = $("input, textarea", f);
      input.addEventListener("input", () => {
        f.classList.remove("invalid");
        if (status.classList.contains("error")) setStatus("");
      });
    });

    function showSuccess() {
      card.style.minHeight = card.offsetHeight + "px"; // kart boyu sıçramasın
      form.classList.add("out");
      setTimeout(() => { form.hidden = true; success.hidden = false; }, 650);
    }

    again.addEventListener("click", () => {
      success.hidden = true;
      form.hidden = false;
      void form.offsetWidth;
      form.classList.remove("out");
      card.style.minHeight = "";
      setStatus("");
      $("#name").focus({ preventScroll: true });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Bot tuzağı doluysa sessizce başarılı göster, hiçbir şey gönderme
      if ($("#website").value) { showSuccess(); return; }

      // Doğrulama
      let firstBad = null;
      fields.forEach((f) => {
        const input = $("input, textarea", f);
        const bad = !input.checkValidity() || (input.required && !input.value.trim());
        f.classList.toggle("invalid", bad);
        if (bad && !firstBad) firstBad = input;
      });
      if (firstBad) {
        setStatus("Lütfen işaretli alanları kontrol edin.", "error");
        firstBad.focus();
        return;
      }

      // Art arda gönderimi sınırla
      const last = +(store.get("dm-last-send") || 0);
      if (Date.now() - last < 30000) {
        setStatus("Mesajınız az önce iletildi. Lütfen birkaç saniye bekleyin.", "error");
        return;
      }

      const name = $("#name").value.trim();
      const email = $("#email").value.trim();
      const subject = $("#subject").value.trim() || "Konu belirtilmedi";
      const message = $("#message").value.trim();
      const text = [
        "Yeni iletişim formu", "",
        "Ad: " + name,
        "E-posta: " + email,
        "Konu: " + subject, "",
        "Mesaj:", message,
      ].join("\n").slice(0, 4000);

      btn.classList.add("loading");
      btn.disabled = true;
      label.textContent = "Gönderiliyor";
      setStatus("");

      const ctrl = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), 15000);
      try {
        const res = await fetch("https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
          signal: ctrl.signal,
        });
        const data = await res.json();
        if (!data.ok) throw new Error(data.description || "Gönderim başarısız");
        store.set("dm-last-send", String(Date.now()));
        form.reset();
        showSuccess();
      } catch (err) {
        setStatus("Mesaj gönderilemedi. Bize ", "error", { href: "https://wa.me/905414159322", text: "WhatsApp" });
      } finally {
        clearTimeout(timeout);
        btn.classList.remove("loading");
        btn.disabled = false;
        label.textContent = "Gönder";
      }
    });
  }
})();
