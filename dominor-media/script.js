/* =========================================================
   DOMINOR MEDIA — site etkileşimleri (kurulumsuz çalışır)
   ========================================================= */

// --- Yıl (footer) ---
document.getElementById("year").textContent = new Date().getFullYear();

// --- Navbar scroll efekti ---
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// --- Mobil menü aç/kapat ---
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  navToggle.classList.toggle("active");
});
// Menüden bir linke tıklayınca kapat
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
  });
});

// --- Scroll ile ortaya çıkma animasyonu ---
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// --- İstatistik sayaç animasyonu ---
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const tick = () => {
        current += step;
        if (current >= target) {
          el.textContent = target;
        } else {
          el.textContent = current;
          requestAnimationFrame(tick);
        }
      };
      tick();
      statObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll(".stat-num").forEach((el) => statObserver.observe(el));

// --- İletişim formu -> Telegram botuna gönderim (sunucu gerektirmez) ---
// Bot / chat ayarları:
const TELEGRAM_BOT_TOKEN = "8882681341:AAFQNpSRdPD2b8tcFGlocnwNOsFYW-eo0ww";
const TELEGRAM_CHAT_ID = "-5436782601";

const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim() || "Konu belirtilmedi";
    const message = document.getElementById("message").value.trim();

    const text =
      "🔔 Yeni İletişim Formu\n\n" +
      "👤 Ad: " + name + "\n" +
      "📧 E-posta: " + email + "\n" +
      "📌 Konu: " + subject + "\n\n" +
      "💬 Mesaj:\n" + message;

    submitBtn.disabled = true;
    submitBtn.textContent = "Gönderiliyor...";
    formStatus.textContent = "";
    formStatus.className = "form-status";

    try {
      const res = await fetch(
        "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: text }),
        }
      );
      const data = await res.json();

      if (data.ok) {
        formStatus.textContent = "✓ Mesajınız iletildi. Teşekkürler!";
        formStatus.classList.add("success");
        form.reset();
      } else {
        throw new Error(data.description || "Gönderim başarısız");
      }
    } catch (err) {
      formStatus.textContent = "✕ Mesaj gönderilemedi. Lütfen WhatsApp'tan ulaşın.";
      formStatus.classList.add("error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Gönder";
    }
  });
}
