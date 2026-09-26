/* =========================================================
   SUPABASE AYARLARI
   ---------------------------------------------------------
   1) https://supabase.com adresinden ücretsiz hesap + proje aç.
   2) Project Settings > API bölümünden aşağıdaki 2 değeri kopyala.
   3) KURULUM.md içindeki SQL'i "SQL Editor"de bir kez çalıştır.

   NOT: "anon key" tarayıcıda görünmesi NORMAL ve güvenlidir.
   Verini RLS kuralları korur (KURULUM.md'de hazır).
   ========================================================= */

const SUPABASE_URL = "https://clkuyrppyeuvrknbgygn.supabase.co";      // <-- değiştir
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsa3V5cnBweWV1dnJrbmJneWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0Mzc1MzIsImV4cCI6MjEwNjAxMzUzMn0.Yr9mJxvdJeO1q7AF8JaaQztyUvLU1dDp17nnTdw2L1I";                    // <-- değiştir
const GALLERY_BUCKET = "gallery";

// İstemciyi oluştur (supabase-js CDN'den yüklenir)
const supabaseClient =
  window.supabase && SUPABASE_URL.indexOf("SENIN-PROJEN") === -1
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;
