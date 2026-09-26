/* =========================================================
   SUPABASE AYARLARI
   ---------------------------------------------------------
   1) https://supabase.com adresinden ücretsiz hesap + proje aç.
   2) Project Settings > API bölümünden aşağıdaki 2 değeri kopyala.
   3) KURULUM.md içindeki SQL'i "SQL Editor"de bir kez çalıştır.

   NOT: "anon key" tarayıcıda görünmesi NORMAL ve güvenlidir.
   Verini RLS kuralları korur (KURULUM.md'de hazır).
   ========================================================= */

const SUPABASE_URL = "https://SENIN-PROJEN.supabase.co";      // <-- değiştir
const SUPABASE_ANON_KEY = "SENIN_ANON_KEY";                    // <-- değiştir
const GALLERY_BUCKET = "gallery";

// İstemciyi oluştur (supabase-js CDN'den yüklenir)
const supabaseClient =
  window.supabase && SUPABASE_URL.indexOf("SENIN-PROJEN") === -1
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;
