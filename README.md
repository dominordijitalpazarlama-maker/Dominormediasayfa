# Dominor Dijital Pazarlama — kurumsal site

Statik site. Derleme adımı, bağımlılık, `node_modules` yok. Depoya gönderilen dosyalar
GitHub Pages tarafından olduğu gibi yayınlanır.

**Canlı:** https://dominor.com.tr

İçerik düzenleme, görsel değiştirme, video ekleme ve SEO ile ilgili her şey
👉 **[OKUBENI.md](OKUBENI.md)** dosyasında.

---

## İlk kurulum

### 1. Depoyu oluşturun

GitHub'da yeni bir depo açın (örn. `dominor-site`). **Private olabilir** — GitHub Pages
ücretsiz planda public depo ister; Pro/Team hesabında private de yayınlanabilir.
Emin değilseniz public seçin, sitede zaten gizli bir şey yok.

### 2. Dosyaları gönderin

Bu klasörün içinde:

```bash
git init
git branch -M main
git add .
git commit -m "İlk sürüm"
git remote add origin https://github.com/KULLANICI-ADINIZ/dominor-site.git
git push -u origin main
```

### 3. Pages'i açın

Depoda **Settings → Pages → Build and deployment → Source: GitHub Actions**

Bu kadar. `.github/workflows/yayinla.yml` devreye girer, 1–2 dakikada site yayında olur.
Sonraki her `git push` otomatik yayınlanır.

### 4. Alan adını bağlayın

Depoda `CNAME` dosyası hazır (`dominor.com.tr`). Alan adı sağlayıcınızın DNS panelinde:

| Tür | Ad | Değer |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `KULLANICI-ADINIZ.github.io` |

DNS yayılması 10 dakika–24 saat sürer. Sonra **Settings → Pages → Enforce HTTPS**
kutusunu işaretleyin (sertifika hazır olana kadar seçilemez, bekleyin).

> **Kendi alan adınızı kullanmayacaksanız:** `CNAME` dosyasını silin. Site
> `KULLANICI-ADINIZ.github.io/dominor-site/` adresinden yayınlanır. Tüm bağlantılar
> göreceli olduğu için sayfalar sorunsuz çalışır — ancak `sitemap.xml`, `robots.txt`
> ve sayfalardaki `canonical` / `og:url` etiketlerindeki `https://dominor.com.tr/`
> adreslerini yeni adresle değiştirmeniz gerekir.

---

## ⚠️ Yayına almadan önce yapılacak tek zorunlu iş

**Form erişim anahtarı.** `index.html` ve `teklif-al.html` içinde
`ERISIM-ANAHTARINIZI-BURAYA-YAPISTIRIN` yazan yeri web3forms.com'dan aldığınız
anahtarla değiştirin. Ayrıntılar: [OKUBENI.md → Form bölümü](OKUBENI.md).

Yapmazsanız site çalışır ama form, gönderim yerine ziyaretçinin e-posta uygulamasını açar.

---

## Depo yapısı

```
├── index.html                 Ana sayfa
├── teklif-al.html             Teklif formu sayfası
├── pazaryeri-yonetimi.html    ┐
├── reklam-yonetimi.html       │
├── sosyal-medya-yonetimi.html │ Hizmet sayfaları
├── icerik-uretimi.html        │
├── fotograf-video-cekimi.html │
├── e-ihracat.html             │
├── meta-google-reklamlari.html┘
├── beylikduzu-e-ticaret-ajansi.html   Yerel SEO açılış sayfası
├── kvkk.html · gizlilik.html · cerez-politikasi.html   Hukuki metinler
├── 404.html
├── style.css
├── sitemap.xml · robots.txt
├── CNAME                      Özel alan adı
├── .nojekyll                  Jekyll işlemesini kapatır
├── images/
│   ├── work/                  Proje görselleri ve videoları
│   ├── team/                  Ekip fotoğrafları
│   └── ref/                   Referans logo kartları
└── .github/workflows/yayinla.yml
```

## Yerelde önizleme

```bash
python3 -m http.server 8000
# tarayıcıda: http://localhost:8000
```

Dosyayı doğrudan çift tıklayıp açmayın — `file://` altında CSP ve bazı yollar farklı davranır.

## İçerik güncellerken

Küçük düzeltmeler için GitHub arayüzünden dosyayı açıp kalem simgesine basmak yeterli;
kaydettiğinizde yayın otomatik tetiklenir. Görsel değişikliklerinde `git push` daha pratik.

> `<script>` bloklarına dokunursanız o sayfanın CSP hash'ini yenilemeniz gerekir —
> [OKUBENI.md → Güvenlik altyapısı](OKUBENI.md) bölümüne bakın.
