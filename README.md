# Frontend (Next.js 15)

Bu klasör Dalgıç-Masüt Hukuk Bürosu web arayüzünü barındırır. Tasarım CODEX brief'ine göre Paksoy Hukuk referansı baz alınarak hazırlanmıştır.

## Başlarken

```bash
npm install
npm run dev
```

Geliştirme sunucusu varsayılan olarak `http://localhost:3000` adresinde çalışır.

## Özellikler

- Tailwind 4 temelli, marka renkleri ve tipografi (Inter + Playfair Display)
- App Router mimarisi ve SEO metadata yapılandırması
- Responsive üst navigasyon, alt bilgi ve CTA bileşenleri
- Ana sayfa bölümleri: hero, istatistik bandı, hizmetler, ekip, yayınlar, referanslar, SSS, CTA
- Sayfalar: Hakkımızda, Hizmetler (+ dinamik detay), Ekibimiz (+ dinamik profil), Yayınlar (+ dinamik makale), Hesaplayıcılar, İletişim, KVKK, Çerez Politikası, 404
- Üç adet örnek hesaplayıcı (kıdem, nafaka, trafik tazminatı)
- İletişim formu (`react-hook-form`) ve `/api/contact` API route'u
- Strapi CMS üzerinden dinamik içerik çekmek için `fetchSiteSettings`, `fetchServices`, vb. yardımcılar

## Yapı

```
src/
  app/           # App Router sayfaları ve API route'u
  components/    # Yeniden kullanılabilir React bileşenleri
  lib/           # Tip tanımları, Strapi yardımcıları
```

## Çevresel Değişkenler

İsteğe bağlı e-posta gönderimi ve Strapi bağlantısı için `.env.local` dosyasında aşağıdaki değişkenleri tanımlayın:

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN= # (opsiyonel, public içerik için gerekmez)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
CONTACT_TO=
```

`STRAPI_API_TOKEN` tanımlanmadığında Strapi public role üzerinden yayınlanan içeriklere erişilir. Değerler tanımlanmamışsa iletişim formu gönderimleri sunucu loglarına yazılır.

## Strapi Entegrasyonu

`src/lib/api.ts` dosyası Strapi API isteklerini ve veri dönüşümlerini yönetir. İçerik tipleri Strapi tarafında oluşturulduktan sonra veriler otomatik olarak bu uç noktalardan çekilir. Frontend bileşenleri doğrudan Strapi'den dönen verilere göre render edilir.

