import {
  Calculator,
  FAQ,
  FirmInfo,
  HeroContent,
  NavigationItem,
  Publication,
  SiteSettings,
  Statistic,
  TeamMember,
  Testimonial,
  TimelineEvent,
  Service,
} from "./types";

const fallbackNavigation: NavigationItem[] = [
  { id: 1, label: "Ana Sayfa", href: "/" },
  { id: 2, label: "Hakkımızda", href: "/hakkimizda" },
  { id: 3, label: "Hizmetler", href: "/hizmetler" },
  { id: 4, label: "Ekibimiz", href: "/ekibimiz" },
  { id: 5, label: "Yayınlar", href: "/yayinlar" },
  { id: 6, label: "Hesaplayıcılar", href: "/hesaplayicilar" },
  { id: 7, label: "İletişim", href: "/iletisim" },
];

const fallbackFirm: FirmInfo = {
  name: "Dalgıç-Masüt Hukuk Bürosu",
  tagline: "Güvenilir Çözüm Ortağınız",
  description:
    "1999'dan bu yana Eskişehir'de iş, aile, ticaret ve sigorta hukuku alanlarında hukuki danışmanlık hizmeti sunuyoruz.",
  foundingYear: 1999,
};

const fallbackHero: HeroContent = {
  heading: "Her adımda şeffaf, her aşamada güçlü temsil.",
  subheading:
    "Eskişehir merkezli Dalgıç-Masüt Hukuk Bürosu, şirketlere ve bireylere uçtan uca hukuki danışmanlık sunar.",
  primaryCtaLabel: "Bize Danışın",
  primaryCtaUrl: "/iletisim",
  secondaryCtaLabel: "Hizmetlerimizi İnceleyin",
  secondaryCtaUrl: "/hizmetler",
  highlights: ["1999'dan bu yana Eskişehir'de", "12 hukuki hizmet alanı", "İş, aile ve ticaret hukuku"],
};

const fallbackStatistics: Statistic[] = [
  {
    id: 1,
    value: "1999",
    label: "Kuruluş Yılı",
    description:
      "Dalgıç-Masüt Hukuk Bürosu, 1999 yılında Eskişehir'de kurulmuştur.",
  },
  {
    id: 2,
    value: "12",
    label: "Hukuki Hizmet Alanı",
    description:
      "Şirket danışmanlığından bireysel uyuşmazlıklara kadar geniş hizmet kapsamı.",
  },
  {
    id: 3,
    value: "%100",
    label: "Müvekkil Odaklılık",
    description:
      "Her müvekkile özel, şeffaf ve dürüst hukuki danışmanlık anlayışıyla hareket ederiz.",
  },
  {
    id: 4,
    value: "81 İl",
    label: "Hizmet Kapsamı",
    description:
      "Eskişehir merkezli büromuz, uzaktan danışmanlık ve vekâlet ile tüm Türkiye genelinde müvekkillerine hizmet vermektedir.",
  },
];

export const fallbackSiteSettings: SiteSettings = {
  firm: fallbackFirm,
  hero: fallbackHero,
  statistics: fallbackStatistics,
  contactInfo: {
    address:
      "Kurtuluş, Cumhuriyet Blv. Şimşek İş Merkezi No:75 K:7 D:28, 26020, Odunpazarı / Eskişehir",
    phone: "+90 530 159 81 32",
    email: "atilayd@gmail.com",
    workingHours: "Hafta içi 09:00 - 19:00",
    mapEmbedUrl:
      "https://www.google.com/maps?q=QG9M%2B27+Odunpazarı,+Eskişehir&hl=tr&z=18&iwloc=A&output=embed",
  },
  navigation: fallbackNavigation,
  footerDescription:
    "1999'dan bu yana Eskişehir'de şirketlere ve bireylere iş, aile, ticaret ve sigorta hukuku alanlarında hukuki danışmanlık hizmeti sunuyoruz.",
  seo: {
    title: "Dalgıç-Masüt Hukuk Bürosu | Eskişehir Avukat",
    description:
      "1999'dan bu yana Eskişehir'de iş, aile, ticaret ve sigorta hukuku alanlarında hukuki danışmanlık hizmeti.",
    keywords:
      "eskişehir avukat, hukuk bürosu, iş hukuku, aile hukuku, trafik kazası avukatı, dalgıç masüt",
  },
};

const paragraphsToHtml = (paragraphs: string[]): string =>
  paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");

export const fallbackServices: Service[] = [
  {
    id: 1,
    slug: "is-hukuku",
    title: "İş Hukuku ve İşçi-İşveren Uyuşmazlıkları",
    summary:
      "Kıdem tazminatı, iş akdi feshi, mobbing ve yetkili mahkeme süreçlerinde yanınızdayız.",
    description: paragraphsToHtml([
      "İşçi ve işveren ilişkilerinde doğabilecek tüm uyuşmazlıklarda proaktif danışmanlık sunuyoruz. Haksız fesih, kıdem ve ihbar tazminatı, iş kazası, mobbing ve sendikal haklar gibi kritik konularda detaylı hukuki analiz yapıyor, süreci baştan sona yönetiyoruz.",
      "Şirketlere yönelik uyum denetimleri, iç yönetmeliklerin hazırlanması ve toplu iş sözleşmeleri alanında da hizmet veriyoruz.",
    ]),
    highlights: [
      "Kıdem ve ihbar tazminatı davaları",
      "İş kazası ve meslek hastalığı tazminatı",
      "Şirketler için iş hukuku uyum denetimi",
    ],
    relatedArticles: [],
  },
  {
    id: 2,
    slug: "aile-hukuku",
    title: "Aile Hukuku ve Boşanma Süreçleri",
    summary:
      "Çekişmeli ve anlaşmalı boşanma, velayet, nafaka ve mal paylaşımı davaları.",
    description: paragraphsToHtml([
      "Aile hukuku süreçlerinde müvekkillerimizi duygusal ve hukuki olarak destekler, stratejik yol haritaları sunarız. Velayet, nafaka ve mal paylaşımı davalarında çocukların üstün yararı ve müvekkilimizin haklarını gözetiriz.",
    ]),
    highlights: [
      "Çekişmeli ve anlaşmalı boşanma",
      "Velayet ve kişisel ilişki düzenlemesi",
      "Nafaka ve mal paylaşımı davaları",
    ],
    relatedArticles: [],
  },
  {
    id: 3,
    slug: "ticaret-hukuku",
    title: "Ticaret Hukuku ve Şirket Danışmanlığı",
    summary:
      "Şirket kuruluşundan sözleşme yönetimine, ticari davalara kadar kapsamlı destek.",
    description: paragraphsToHtml([
      "Küçük ölçekli işletmelerden uluslararası ortaklıklara kadar şirketlere günlük hukuki danışmanlık sağlıyoruz. Sözleşme incelemeleri, risk analizi, hisse devirleri ve ticari uyuşmazlıkların çözümü ana uzmanlık alanlarımızdır.",
    ]),
    highlights: [
      "Şirket kuruluşu ve birleşmeler",
      "Sözleşme hazırlama ve revizyonu",
      "Ticari alacak takibi",
    ],
    relatedArticles: [],
  },
];

export const fallbackTeam: TeamMember[] = [
  {
    id: 1,
    slug: "atilay-dalgic",
    name: "Av. Atilay Dalgıç",
    title: "Kurucu Ortak",
    bio: paragraphsToHtml([
      "Dalgıç-Masüt Hukuk Bürosu'nun kurucu ortağı olan Av. Atilay Dalgıç, Ankara Üniversitesi Hukuk Fakültesi mezunudur. 1999 yılından bu yana Eskişehir Barosu'na kayıtlı olarak iş ve ticaret hukuku alanlarında faaliyet göstermektedir.",
      "Şirket birleşmeleri, iş hukuku denetimleri ve ticari uyuşmazlıklar başta olmak üzere çeşitli hukuki konularda müvekkillerine danışmanlık hizmeti vermektedir.",
    ]),
    expertise: [
      "İş hukuku denetimleri",
      "Şirket birleşmeleri ve devralmalar",
      "Ticari sözleşmeler",
    ],
    education: ["Ankara Üniversitesi Hukuk Fakültesi"],
    barAdmissions: ["Eskişehir Barosu", "Ankara Barosu"],
    languages: ["Türkçe", "İngilizce"],
    email: "atilay.dalgic@dalgicmasut.av.tr",
    phone: "+90 530 159 81 32",
    linkedin: "https://www.linkedin.com",
  },
  {
    id: 2,
    slug: "duru-masut",
    name: "Av. Duru Masüt",
    title: "Kurucu Ortak",
    bio: paragraphsToHtml([
      "Dalgıç-Masüt Hukuk Bürosu'nun kurucu ortağı olan Av. Duru Masüt, İstanbul Üniversitesi Hukuk Fakültesi mezunudur. Eskişehir Barosu'na kayıtlı olarak ceza hukuku ve aile hukuku alanlarında müvekkillerine hukuki danışmanlık hizmeti vermektedir.",
    ]),
    expertise: [
      "Ceza yargılaması",
      "Boşanma ve velayet davaları",
      "Kişisel verilerin korunması",
    ],
    education: ["İstanbul Üniversitesi Hukuk Fakültesi"],
    barAdmissions: ["Eskişehir Barosu"],
    languages: ["Türkçe", "Fransızca", "İngilizce"],
    email: "duru.masut@dalgicmasut.av.tr",
    phone: "+90 222 333 44 55",
    linkedin: "https://www.linkedin.com",
  },
];

export const fallbackPublications: Publication[] = [
  {
    id: 1,
    slug: "is-akdi-feshinde-isverenin-yukumlulukleri",
    title: "İş Akdi Feshinde İşverenin Yükümlülükleri",
    excerpt:
      "İş akdi fesih süreçlerinde işverenlerin dikkat etmesi gereken zorunlu prosedürleri ve olası tazminat risklerini inceledik.",
    content: paragraphsToHtml([
      "İş akdinin feshi hem işçi hem işveren açısından ciddi sonuçlar yaratır. 4857 sayılı İş Kanunu uyarınca fesih bildirimlerinin yazılı yapılması ve fesih gerekçesinin açıkça belirtilmesi gerekir.",
      "Haklı nedenle fesih, geçerli nedenle fesih ve kötü niyetli fesih başlıklarını ayrı ayrı değerlendirip, her durumda doğabilecek tazminat kalemlerini aktarıyoruz.",
    ]),
    publishedDate: "2024-09-12",
    readTime: "7 dk",
    tags: ["İş Hukuku", "Fesih", "Tazminat"],
  },
  {
    id: 2,
    slug: "bosanmada-mal-paylasimi-nasil-olur",
    title: "Boşanmada Mal Paylaşımı Nasıl Olur?",
    excerpt:
      "Edinilmiş mallara katılma rejimi kapsamında boşanma sonrası mal paylaşımının nasıl yapıldığını adım adım anlattık.",
    content: paragraphsToHtml([
      "Türk Medeni Kanunu'na göre eşlerin evlilik süresince edindiği mallar kural olarak eşit şekilde paylaştırılır.",
    ]),
    publishedDate: "2024-08-05",
    readTime: "6 dk",
    tags: ["Aile Hukuku", "Boşanma"],
  },
];

export const fallbackTestimonials: Testimonial[] = [];

export const fallbackFaqs: FAQ[] = [
  {
    id: 1,
    question: "Randevu nasıl alabilirim?",
    answer:
      "<p>İletişim formumuzdan veya telefon numaramızdan randevu talebinde bulunabilirsiniz. Ücretlendirme bilgisi görüşme sırasında tarafınızla paylaşılır.</p>",
  },
  {
    id: 2,
    question: "Dava süreçlerini nasıl raporluyorsunuz?",
    answer:
      "<p>Her aşamada e-posta veya telefon üzerinden bilgilendirme yapıyor, duruşma ve yazışma özetlerini düzenli olarak paylaşıyoruz.</p>",
  },
];

export const fallbackTimeline: TimelineEvent[] = [
  {
    id: 1,
    year: "1999",
    title: "Kuruluş",
    description:
      "Dalgıç-Masüt Hukuk Bürosu, Eskişehir'de butik bir çalışma ofisi olarak kuruldu.",
  },
  {
    id: 2,
    year: "2007",
    title: "Kurumsallaşma",
    description:
      "Kurumsal danışmanlık hizmetleri ile bölgedeki üretim şirketlerine stratejik hukuk hizmetleri sunmaya başladık.",
  },
];

export const fallbackCalculators: Calculator[] = [
  {
    id: 1,
    slug: "kidem-tazminati",
    name: "Kıdem Tazminatı Hesaplayıcı",
    description:
      "Çalışma süreniz ve brüt maaşınıza göre hak edebileceğiniz kıdem tazminatını hesaplayın.",
    category: "employment",
    longDescription:
      "İş sözleşmesi kıdem tazminatına hak kazanacak şekilde sona eren çalışanların, hizmet sürelerine göre alabilecekleri toplam kıdem tazminatı tutarını güncel tavan ücreti dikkate alarak hesaplar.",
    info: [
      "Hesaplama, kıdem tazminatı tavanı ile sınırlıdır.",
      "Damga vergisi kesintisi sonuç ekranında ayrıca gösterilir.",
    ],
  },
  {
    id: 2,
    slug: "nafaka",
    name: "Nafaka Tahmini Hesaplayıcı",
    description:
      "Yoksulluk ve iştirak nafakası için gelir verilerine göre aylık tutarı tahmini hesaplayın.",
    category: "family",
    longDescription:
      "Boşanma sürecinde yoksulluk ve iştirak nafakası için her iki tarafın gelir düzeyi, çocuk sayısı ve çocukların yaşı dikkate alınarak aylık nafaka tutarı tahmini çıkarılır.",
    info: [
      "İştirak nafakası çocukların yaşına göre artan oran uygular.",
      "Hakim takdiri ve somut koşullar nihai tutarı değiştirebilir.",
    ],
  },
  {
    id: 3,
    slug: "ihbar-tazminati",
    name: "İhbar Tazminatı Hesaplayıcı",
    description:
      "Çalışma sürenize göre ihbar öneli ve brüt maaş üzerinden ihbar tazminatı hesabı yapın.",
    category: "employment",
    longDescription:
      "İş sözleşmesinin bildirim sürelerine uyulmaksızın feshedilmesi halinde işveren ya da işçinin ödemesi gereken ihbar tazminatı tutarını, yıllık izin alacağı ile birlikte hesaplar.",
    info: [
      "İhbar önelleri İş Kanunu madde 17 uyarınca belirlenmiştir.",
      "Yıllık izin hesabı, hizmet süresine göre 14/20/26 gün olarak varsayılmıştır.",
    ],
  },
  {
    id: 4,
    slug: "trafik-tazminati",
    name: "Trafik Kazası Tazminatı Hesaplayıcı",
    description:
      "Destekten yoksun kalma tazminatı için gelir, destek süresi ve kusur oranına göre hesap yapın.",
    category: "injury",
    longDescription:
      "Trafik kazası sonucu hayatını kaybeden ya da kalıcı malul kalan destekten yoksun kalanların talep edebileceği tazminat tutarını, aylık gelir, destek süresi ve kusur oranı üzerinden hesaplar.",
    info: [
      "Kusur oranı, karşı tarafın sorumluluk payını yüzde olarak gösterir.",
      "Aktüeryal hesaplamalarda dikkate alınan iskonto ve PMF verileri basitleştirilmiştir.",
    ],
  },
  {
    id: 5,
    slug: "ise-iade",
    name: "İşe İade Tazminatı Hesaplayıcı",
    description:
      "Geçersiz fesih halinde ödenebilecek işe iade ve boşta geçen süre tazminatını hesaplayın.",
    category: "employment",
    longDescription:
      "İşe iade davası sonucunda hükmedilebilecek boşta geçen süre ücreti (en çok 4 ay) ve işe başlatmama tazminatı (4-8 aylık ücret) için brüt maaş üzerinden tahmini hesaplama yapar.",
    info: [
      "İşe başlatmama tazminatı için varsayılan katsayı 5 ay olarak alınmıştır, kullanıcı değiştirebilir.",
      "Boşta geçen süre ücreti için azami 4 ay kabul edilmiştir.",
    ],
  },
  {
    id: 6,
    slug: "fazla-mesai",
    name: "Fazla Mesai Ücreti Hesaplayıcı",
    description:
      "Haftalık 45 saati aşan çalışmalar için fazla mesai alacağınızı hesaplayın.",
    category: "employment",
    longDescription:
      "Çalışanın aylık brüt ücreti, haftalık çalışma saati ve fazla mesai süresi dikkate alınarak %50 zamlı fazla çalışma ücretini ve toplam alacağı hesaplar.",
    info: [
      "Haftalık 45 saatin üzerindeki çalışmalar fazla mesai olarak değerlendirilir.",
      "Ulusal bayram ve genel tatil günlerine ilişkin hesaplamalar ayrıca dikkate alınmalıdır.",
    ],
  },
  {
    id: 7,
    slug: "is-kazasi",
    name: "İş Kazası Gelir Kaybı Hesaplayıcı",
    description:
      "İş kazası sonucu geçici veya kalıcı maluliyet için gelir kaybı tazminatını hesaplayın.",
    category: "injury",
    longDescription:
      "İş kazası sonrası belirlenen maluliyet oranı, iyileşme süresi ve aylık gelir verileri kullanılarak geçici iş göremezlik ve sürekli gelir kaybı tutarlarını tahmini olarak hesaplar.",
    info: [
      "Maluliyet oranı SGK raporuna göre yüzde olarak girilmelidir.",
      "Hesaplama açıklayıcı niteliktedir; aktüeryal çalışmalardaki varsayımlar sadeleştirilmiştir.",
    ],
  },
  {
    id: 8,
    slug: "kira-artis",
    name: "Kira Artış Oranı Hesaplayıcı",
    description:
      "TÜFE on iki aylık ortalaması ve yasal sınırlar doğrultusunda yeni kira tutarını hesaplayın.",
    category: "rental",
    longDescription:
      "Mesken kiraları için geçerli üst sınır (örneğin %25) ile TÜFE on iki aylık ortalaması arasından düşük olanı dikkate alarak yeni kira tutarını hesaplar.",
    info: [
      "Konut kiralarında 2024 sonuna kadar %25 tavan uygulaması devam etmektedir.",
      "Ticari kiralar için yalnızca TÜFE on iki aylık ortalaması uygulanır.",
    ],
  },
];
