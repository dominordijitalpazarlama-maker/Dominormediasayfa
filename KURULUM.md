# Dominor Media — Statik Site + Admin Panel

Saf HTML/CSS/JS. Site build gerektirmez. Galeri ve admin paneli için ücretsiz
**Supabase** kullanılır (sunucu yönetmen gerekmez).

## Dosyalar
- `index.html` — ana sayfa (metinler, hero, hizmetler, galeri, iletişim)
- `admin.html` — **admin paneli** (girişli; foto/video yükle-sil)
- `style.css` — tasarım ve renkler (`:root` bloğundan değiştir)
- `script.js` — menü, animasyon, iletişim formu (Telegram)
- `gallery.js` — galeriyi Supabase'ten çeker
- `supabase-config.js` — **Supabase anahtarların buraya**
- `images/` — logo ve görseller

---

## 1) Logo
- Menüdeki amblem: `images/logo-icon.png`
- Hero'daki büyük logo: `images/logo.png`
Değiştirmek istersen aynı adla üstüne yaz.

---

## 2) Galeri + Admin Panel kurulumu (Supabase — ücretsiz)

### a) Proje aç
1. https://supabase.com → ücretsiz hesap → **New Project**.
2. Proje açılınca **Project Settings > API** kısmından şunları kopyala:
   - `Project URL`
   - `anon public` key
3. Bunları `supabase-config.js` içine yapıştır (SENIN-PROJEN yazan yerler).
   > anon key'in tarayıcıda görünmesi normaldir; verini aşağıdaki RLS kuralları korur.

### b) Veritabanı — SQL Editor'de bir kez çalıştır
```sql
create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('image','video')),
  url text not null,
  path text,
  title text,
  created_at timestamptz default now()
);

alter table gallery_items enable row level security;

create policy "public read"  on gallery_items for select using (true);
create policy "auth insert"  on gallery_items for insert to authenticated with check (true);
create policy "auth delete"  on gallery_items for delete to authenticated using (true);
```

### c) Depolama (dosyalar için)
1. **Storage > New bucket** → ad: `gallery` → **Public bucket** işaretle → oluştur.
2. Sonra SQL Editor'de şunu çalıştır (yükleme/silme izinleri):
```sql
create policy "public read gallery"
  on storage.objects for select using ( bucket_id = 'gallery' );
create policy "auth upload gallery"
  on storage.objects for insert to authenticated with check ( bucket_id = 'gallery' );
create policy "auth delete gallery"
  on storage.objects for delete to authenticated using ( bucket_id = 'gallery' );
```

### d) Admin kullanıcısı oluştur
1. **Authentication > Users > Add user** → kendi e-posta + şifreni gir (Auto Confirm açık).
2. (Önerilir) **Authentication > Providers > Email** altında “Allow new users to sign up” seçeneğini **kapat** — böylece dışarıdan kimse kayıt olamaz, sadece senin eklediğin kullanıcı girer.

### e) Kullanım
- Panele gir: siteadresin/`admin.html`
- E-posta + şifrenle giriş yap → foto/video yükle → sitedeki **Galeri** bölümünde anında görünür.
- Silmek için panelde “Sil”e bas.

---

## 3) GitHub Pages'e yükleme
1. Bu klasördeki **tüm** dosyaları reponun köküne koy (`index.html` en üstte).
2. GitHub > **Settings > Pages** > Source: `Deploy from a branch` > `main` / `root`.
3. Birkaç dakikada yayında.

Domain zaten GitHub'a bağlıysa ek işlem yok. Yeni bağlıyorsan repo köküne `CNAME`
dosyası aç, içine sadece alan adını yaz (örn. `dominormedia.com`).

---

## 4) İletişim formu
Form, mesajı doğrudan **Telegram botuna** gönderir. Ayarlar `script.js` en üstünde
(`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`). Botun ilgili sohbete mesaj atma yetkisi olmalı.
