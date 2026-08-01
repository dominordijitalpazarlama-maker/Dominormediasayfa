# DOMINOR — yeni site paketi

Bu paket **GitHub Pages** için hazırlandı. Derleme adımı yok; dosyalar deponun kökünde
olduğu gibi durur ve GitHub Actions bunları otomatik yayınlar.

> Netlify sürümünden gelen farklar: `netlify.toml` kaldırıldı, güvenlik başlıkları
> sayfa içi CSP etiketine taşındı, form altyapısı Netlify Forms yerine Web3Forms oldu.
> Ayrıntılar aşağıda.

## Yayına almadan ÖNCE mutlaka değiştirin

| Ne | Nerede | Şu an ne yazıyor |
|---|---|---|
| Adres | `ADDRESS` | `Mahalle / Sokak No / İlçe, İstanbul` |

> ✅ E-posta (dominordijitalpazarlama@gmail.com), telefon ve WhatsApp (0541 415 93 22) girildi.
> ✅ Logo entegre edildi. Üretilen dosyalar:
> `logo-mark.png` (amblem — menü, ayraç), `logo-full.png` (amblem+yazı — hero, footer),
> `favicon.png` + `apple-touch-icon.png` (sekme ve telefon ikonu),
> `og-kapak.jpg` (link paylaşımında çıkan 1200×630 kapak),
> `logo-beyaz-zemin.jpg` (açık zeminli / basılı kullanım için).
| Instagram linki | `INSTAGRAM` | `https://www.instagram.com/` |
| Şirket unvanı + VKN | `kvkk.html` | `[ŞİRKET UNVANI]`, `[DOLDURUN]` |

| Proje görselleri | `images/work/01-10.jpg` | Şablon görseller |
| Vaka çalışması rakamları | `index.html`, "VAKA ÇALIŞMALARI" bölümü | **ÖRNEK VERİ** |
| İstatistik şeridi | `index.html`, "İSTATİSTİK ŞERİDİ" | 80+ / 7 / 6 / 3.1x |

> ⚠️ Vaka çalışmalarındaki yüzdeler ve istatistik şeridindeki rakamlar örnektir.
> Gerçek verinizle değiştirin ya da o bölümü silin. Doğrulayamadığınız rakam yayınlamayın.

## Görselleri değiştirme
`images/work/` içindeki dosyaları **aynı isimlerle** (01.jpg … 10.jpg) kendi çalışmalarınızla
değiştirin; HTML'e dokunmanıza gerek kalmaz. Dikey duracak olanlar: 01 ve 04.
`images/team/` için de aynısı geçerli — kare fotoğraf, **en az 800×800**:
`1.jpg` Cesur Kaya · `2.jpg` Baki Çağlar · `3.jpg` Kuzey Kakaş · `4.jpg` Loran Gavloski

## Form — Web3Forms kurulu

GitHub Pages statik bir barındırma; sunucu tarafı yok, dolayısıyla form gönderimini
kendi başına işleyemez. Bu yüzden formlar **Web3Forms**'a bağlandı (ücretsiz, üyelik yok,
sadece e-posta doğrulaması ile bir anahtar alıyorsunuz).

### Kurulum (5 dakika, yayına almadan önce)

1. https://web3forms.com adresine gidin
2. `dominordijitalpazarlama@gmail.com` adresini yazıp **Create Access Key** deyin
3. Gelen kutunuza düşen **access key**'i kopyalayın (uzun bir kod)
4. Şu iki dosyada `ERISIM-ANAHTARINIZI-BURAYA-YAPISTIRIN` yazan yeri anahtarla değiştirin:
   - `index.html`
   - `teklif-al.html`

```html
<input type="hidden" name="access_key" value="a1b2c3d4-...">
```

Bu kadar. Form gönderimleri doğrudan e-posta adresinize düşer; Netlify panelindeki gibi
ayrıca bildirim açmanıza gerek yok.

> **Anahtarı girmezseniz ne olur?** Site çalışmaya devam eder — form gönder butonu
> ziyaretçinin e-posta uygulamasını doldurulmuş halde açar. Yani mesaj kaybolmaz,
> ama ziyaretçinin bir adım daha atması gerekir. Anahtarı girmeniz şiddetle önerilir.

**Anahtar gizli mi?** Hayır, HTML kaynağında görünür — Web3Forms bu şekilde çalışacak
biçimde tasarlandı. Anahtar yalnızca *size* form göndermeye yarar; hesabınıza erişim vermez.
Panelden istediğiniz zaman iptal edip yenisini alabilirsiniz.

**Spam koruması:** Formda gizli bir onay kutusu var (`botcheck`). Botlar o alanı işaretler,
Web3Forms gönderimi otomatik eler. Ek ayar gerekmez. Panelden hCaptcha da açabilirsiniz.

**Kota:** Ücretsiz planda aylık gönderim sınırı var (yazıldığı tarihte 250/ay).
Güncel durumu web3forms.com üzerinden kontrol edin. Sınırı aşarsanız Formspree veya
FormSubmit'e geçmek yalnızca `fetch` adresini ve alan adlarını değiştirmek demektir.

**Formların adları:** `teklif-anasayfa` ve `teklif-sayfasi` — gelen e-postanın konusundan
hangi formdan geldiğini ayırt edebilirsiniz.

## SEO
`sitemap.xml` ve `robots.txt` hazır. Google Search Console'a sitemap'i ekleyin.
Her sayfada meta description, canonical, Open Graph ve JSON-LD var.
Ana sayfada FAQPage şeması var — Google'da SSS'leriniz zengin sonuç olarak çıkabilir.

## Referans logoları
`images/ref/` içindeki kartlar, kaynak logolardan otomatik üretildi:
her logo kırpıldı, **eşit optik ağırlığa** göre ölçeklendi (alan normalizasyonu) ve
440×240'lık standart bir karta ortalandı. Beyaz/açık renkli logolar (Arçelik, Louisiana Polo,
Rosa By Belle, Çanta Park) beyaz zeminde kaybolduğu için koyu karta yerleştirildi.

Yeni referans eklemek isterseniz: logoyu `images/` içine PNG olarak koyun, kart üretimi için
aynı işlemi tekrarlayın veya doğrudan 440×240 bir kart hazırlayıp `images/ref/` içine atın,
sonra `index.html`'de referans ızgarasına bir satır ekleyin. Izgara 5 sütun olduğu için
logo sayısını **5'in katı** tutmak en düzgün görünümü verir (10, 15, 20…).
Uçmakdere Dağevi bu yüzden çıkarıldı; geri eklemek isterseniz 11. yerine başka bir markayla
birlikte 15'e tamamlamanız gerekir.

## Görsel çözünürlüğü

Tüm görseller retina (2x) ekranlarda keskin çıkacak şekilde üretildi:

| Görsel | Dosya | Ekranda |
|---|---|---|
| Proje karoları | 1200×1500 / 1200×750 | ~300 px |
| Ekip kartları | 800×800 | ~280 px |
| Referans kartları | 880×480 (WebP) | ~220 px |
| Hero logosu | 600×528 (WebP) | 300 px |

Logolar ve referans kartları **WebP** formatında — PNG'ye göre %81 daha küçük, kalite aynı.
Tüm modern tarayıcılar destekler. PNG yedekleri de klasörde duruyor.

### ⚠️ Daha iyi logo dosyası gerekenler
Şu markaların elimizdeki logo dosyaları düşük çözünürlüklü; kartta büyütmek zorunda kaldım.
Müşteriden **SVG veya en az 1000 px genişliğinde PNG** isterseniz belirgin şekilde netleşirler:

- Keller Williams (mevcut: 181 px genişlik)
- Louisiana Polo (212 px)
- RE/MAX (232 px)
- Mado (233 px)
- Rosa By Belle (304 px)
- Arçelik (336 px)
- Çanta Park (339 px)

Yeni dosyaları `images/` içine aynı isimle koyup kart üretimini tekrarlamanız yeterli.

## Projelere video ekleme

`index.html` içindeki proje ızgarasında iki tür karo var: sadece görsel, ve video.
Video karolar ekranda görününce **sessizce oynar**, tıklayınca sesli ve tam boy açılır.

### Kendi videonuzu koymak
1. Videoyu iki formatta hazırlayın (ikisi de gerekli — hepsi tarayıcı uyumluluğu için):
   `video-03.mp4` ve `video-03.webm`, `images/work/` klasörüne.
2. Bir de kapak görseli koyun (`images/work/11.jpg`) — video yüklenene kadar o görünür.
3. Izgaraya şu bloğu ekleyin:

```html
<a class="work-tile videolu" href="#" role="button"
   data-mp4="images/work/video-03.mp4"
   aria-label="Marka Adı — İş Türü videosunu oynat">
  <img src="images/work/11.jpg" alt="Marka Adı — İş Türü" loading="lazy" width="1200" height="900">
  <video muted loop playsinline preload="metadata" poster="images/work/11.jpg">
    <source src="images/work/video-03.webm" type="video/webm">
    <source src="images/work/video-03.mp4" type="video/mp4">
  </video>
  <span class="work-badge" aria-hidden="true">
    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>
  <span class="work-cap"><span>İş Türü</span><b>Marka Adı</b></span>
</a>
```

### YouTube videosu kullanmak (önerilen — siteyi yormaz)
Videoyu YouTube'a yükleyin, adresteki kimliği alın
(`youtube.com/watch?v=**AbCdEf12345**`) ve karoda `data-mp4` yerine `data-yt` kullanın:

```html
<a class="work-tile videolu" href="#" role="button" data-yt="AbCdEf12345" ...>
```
Bu durumda `<video>` etiketine gerek yok — kapak görseli yeter, tıklayınca YouTube oynatıcısı açılır.


### Video dosya düzeni (güncel)
Her video karo için üç dosya gerekiyor. Örnek: Mado

| Dosya | Ne işe yarar | Boyut hedefi |
|---|---|---|
| `mado-onizleme.webm` + `mado-onizleme.mp4` | Karoda dönen **sessiz 8 sn'lik klip** | ≤ 500 KB |
| `mado.mp4` | Tıklayınca açılan **tam video, sesli** | ≤ 5 MB |
| `mado-kapak.jpg` | Video yüklenene kadar görünen kapak karesi | ≤ 150 KB |

Yeni bir video eklerken bu üçlüyü hazırlayıp `index.html`'de karoya
`data-mp4="images/work/DOSYA.mp4"` yazmanız yeterli.

FFmpeg ile hazırlama (üç komut):
```
ffmpeg -y -t 8 -i kaynak.mp4 -an -vf scale=540:-2 -crf 30 ADI-onizleme.mp4
ffmpeg -y -i ADI-onizleme.mp4 -c:v libvpx-vp9 -crf 44 -b:v 0 -an ADI-onizleme.webm
ffmpeg -y -i kaynak.mp4 -vf scale=640:-2 -crf 29 -c:a aac -b:a 80k -movflags +faststart ADI.mp4
ffmpeg -y -ss 1 -i kaynak.mp4 -frames:v 1 -q:v 3 ADI-kapak.jpg
```

### Dikkat
- **Video dosyası 3–4 MB'ı geçmesin.** Karodaki önizlemeler 5–10 saniyelik sessiz kliplerdir,
  tam videoyu koymayın. Uzun videolar için YouTube yöntemini kullanın.
- Sessiz önizlemelerde ses olmamalı (`-an` ile sesi çıkarın), yoksa bazı tarayıcılar oynatmaz.
- Sayfada **2–3'ten fazla otomatik oynayan video olmasın**; mobil veride ve pil ömründe fark eder.
- Dikey (Reels) videolar `tall` sınıfıyla, yatay videolar normal karoda daha iyi durur.

Video dönüştürme için ücretsiz araç: [CloudConvert](https://cloudconvert.com) veya
FFmpeg komutu: `ffmpeg -i kaynak.mp4 -t 8 -an -crf 28 video-03.mp4`

## Güvenlik altyapısı

Netlify sürümünde güvenlik başlıkları `netlify.toml` ile sunucudan gönderiliyordu.
**GitHub Pages özel HTTP başlığı ayarlamaya izin vermiyor.** Bu yüzden başlıkların
tarayıcı tarafında karşılığı olanlar her sayfanın `<head>` bölümüne meta etiketi
olarak taşındı:

```html
<meta http-equiv="Content-Security-Policy" content="...">
```

### Korunanlar
| Kural | Ne yapar |
|---|---|
| `script-src` + SHA-256 özetleri | Yalnızca sayfadaki bilinen betikler çalışır, `unsafe-inline` yok |
| `default-src 'self'` | Yabancı alan adlarından içerik yüklenmez |
| `connect-src` | Yalnızca Web3Forms'a veri gönderilebilir |
| `img-src` / `media-src` / `font-src` | Görsel, video ve yazı tipi kaynakları sınırlı |
| `object-src 'none'` | Flash/applet türü gömülü nesne çalışmaz |
| `upgrade-insecure-requests` | http bağlantılar otomatik https'e çevrilir |

### Kaybedilenler (ve çözümü)
Meta etiketiyle **taşınamayan** başlıklar şunlar:

| Başlık | Durum |
|---|---|
| `Strict-Transport-Security` | GitHub Pages, "Enforce HTTPS" açıkken bunu kendisi gönderir — kayıp yok |
| `X-Frame-Options` / `frame-ancestors` | ❌ Uygulanamıyor. Site teorik olarak başka bir sayfaya iframe'le gömülebilir |
| `X-Content-Type-Options` | ❌ Uygulanamıyor |
| `Referrer-Policy` | Sayfaya `<meta name="referrer">` ile eklenebilir |
| `Permissions-Policy` | ❌ Uygulanamıyor |

Bu üç eksik, tanıtım sitesi için pratikte düşük riskli. Tamamını geri istiyorsanız
alan adını **Cloudflare** üzerinden (ücretsiz plan) geçirip başlıkları oradan
"Transform Rules → Response Headers" ile ekleyebilirsiniz — 15 dakikalık iş.

### ⚠️ Betik değiştirirseniz CSP'yi güncelleyin
CSP satır içi betikleri **özet (hash)** ile tanıyor. Bir `<script>` bloğunda tek bir
boşluk bile değiştirirseniz o betik çalışmaz ve tarayıcı konsolunda CSP hatası görürsünüz.
Yeni özet üretmek için, betiğin `<script>` ve `</script>` arasındaki içeriğini bir dosyaya
kaydedip:

```bash
openssl dgst -sha256 -binary betik.txt | openssl base64 -A
```

Çıkan değeri o sayfanın meta CSP'sindeki `script-src` listesine `'sha256-...'` biçiminde
ekleyin. **Not:** her sayfanın kendi CSP'si var, sadece değiştirdiğiniz sayfayı güncelleyin.

Google Analytics veya Meta Pixel eklerseniz CSP'ye şunları da eklemeniz gerekir:
`script-src` → `https://www.googletagmanager.com https://connect.facebook.net`,
`connect-src` → `https://www.google-analytics.com https://www.facebook.com`

## Çerez uyumu

Sitede **KVKK uyumlu çerez onay bannerı** var. Üç seçenek sunuyor:
"Tümünü kabul et", "Sadece zorunlu" ve ayrıntılı ayar paneli (analitik / pazarlama ayrı ayrı).

Tercih tarayıcıda `localStorage` içinde saklanıyor, sunucuya gönderilmiyor.
Ziyaretçi sayfa altındaki **"Çerez Ayarları"** bağlantısıyla kararını her zaman değiştirebilir.

### Ölçüm aracı eklerken
Onay verilmeden hiçbir izleme kodu çalışmamalı. Bunun için hazır bir yer bıraktım —
`parts.py` içindeki `uygula()` fonksiyonu:

```javascript
function uygula(analitik, pazarlama){
  if (analitik)  { /* Google Analytics kodunuzu BURAYA */ }
  if (pazarlama) { /* Meta Pixel kodunuzu BURAYA */ }
}
```
Kodu doğrudan sayfaya yapıştırırsanız onaydan önce çalışır ve KVKK'ya aykırı olur.

### Bilmeniz gereken bir açık
Yazı tipleri Google Fonts'tan yükleniyor. Google çerez yerleştirmiyor ama ziyaretçinin
**IP adresi Google'a iletiliyor**. Katı KVKK yorumunda bu bir yurt dışı veri aktarımıdır.
Çerez politikasında açıkça belirtildi. Tamamen ortadan kaldırmak isterseniz yazı tiplerini
kendi sunucunuzda barındırın (google-webfonts-helper ile 10 dakikalık iş) — ayrıca siteyi
hızlandırır ve CSP'den Google alan adlarını çıkarmanızı sağlar.

## SEO — yapılanlar ve size düşenler

### Sitede yapıldı
- **LocalBusiness yapısal verisi** — adres, çalışma saatleri, hizmet bölgeleri
  (Beylikdüzü, Esenyurt, Büyükçekmece, Avcılar, Bahçeşehir) ve Instagram bağlantısı işlendi
- **Yerel açılış sayfası:** `beylikduzu-e-ticaret-ajansi.html` — "beylikdüzü e-ticaret ajansı"
  aramaları için özel içerik
- **BreadcrumbList** şeması hizmet sayfalarına eklendi (Google sonuçlarında yol izi çıkar)
- **FAQPage** şeması 12 soruyla — sık sorulanlar arama sonucunda açılır kutu olarak çıkabilir
- Tüm sayfa başlıkları 60 karakterin altına çekildi (Google kesmesin diye)
- `sitemap.xml` güncellendi: lastmod tarihleri ve sayfa öncelikleri eklendi

### ⚠️ En kritik adım: Google İşletme Profili
Yerel aramada (harita kutusunda) çıkmanın **tek yolu** budur — sitedeki hiçbir şey bunun
yerini tutmaz. https://business.google.com adresinden ücretsiz oluşturun:

1. İşletme adı: **Dominor Dijital Pazarlama**
2. Kategori: *Reklam ajansı* (ikincil: *Pazarlama ajansı*, *İnternet pazarlama hizmeti*)
3. Adres: Gürpınar Mah. Kartal Sk. No: 10 İç Kapı No: 21, Beylikdüzü
4. Doğrulama kartını bekleyin (posta ile gelir, 1–2 hafta)
5. Onaydan sonra: ofis ve ekip fotoğrafları yükleyin, hizmetleri tek tek girin,
   çalışma saatlerini sitedekiyle **birebir aynı** yazın

Sonra **her müşteriden Google yorumu isteyin.** Yerel sıralamada yorum sayısı ve
tazeliği en güçlü sinyaldir. 10 gerçek yorum, sitede yapılabilecek her şeyden
daha fazla etki eder.

### Diğer adımlar
- **Google Search Console**'a siteyi ekleyin, `sitemap.xml`'i gönderin
- Adres, telefon ve işletme adını Instagram biyografisi, Google profili ve sitede
  **harfi harfine aynı** yazın — tutarsızlık yerel sıralamayı düşürür
- Yandex Webmaster'a da ekleyin (Türkiye'de azımsanmayacak pay)
- Blog açın: "Trendyol komisyon oranları", "Amazon FBA maliyet hesabı" gibi
  gerçek sorulara cevap veren yazılar en çok trafik getiren içeriklerdir
