# E-Ticaret Uygulaması (Frontend)

Bu proje, Next.js ve TypeScript kullanılarak geliştirilmiş bir **e-ticaret frontend** uygulamasıdır.  
Ürünleri listeleyen, filtreleyen, sepete ekleyen ve basit bir giriş / kayıt ol arayüzü sunar.

---

## Özellikler

- Ürün listeleme
- Arama çubuğu ile ürün arama
- Kategoriye göre filtreleme
- Sepet ekranı (state tabanlı)
- Cüzdan/bakiye sayfası
- Giriş ve Kayıt Ol ekranları (UI hazır)
- Responsive ve modern tasarım

---

## Kullanılan Teknolojiler

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Redux Toolkit & RTK Query**
- **PrimeReact** bileşenleri
- **CSS / utility class’lar** (Tailwind benzeri)

---

## Kurulum ve Çalıştırma

Depoyu klonladıktan sonra:

cd client
npm install
npm run dev

client/
├── public/
│   ├── login1 .png           # Login sayfası görseli
│   ├── logo.png              # Logo
│   └── notlog.jpg            # Giriş yapmamış kullanıcı görseli
├── src/
│   ├── app/
│   │   ├── (auth)/           # Auth için route grubu (URL’de görünmez)
│   │   │   ├── login/
│   │   │   │   └── page.tsx  # Giriş ekranı
│   │   │   └── signup/
│   │   │       └── page.tsx  # Kayıt ol ekranı
│   │   ├── Home/
│   │   │   └── Home.tsx      # Ana ürün listeleme sayfası
│   │   ├── cart/
│   │   │   └── page.tsx      # Sepet sayfası
│   │   ├── detail/
│   │   │   └── page.tsx      # Ürün detay sayfası
│   │   ├── wallet/
│   │   │   └── page.tsx      # Cüzdan / bakiye sayfası
│   │   ├── NotLog.tsx        # Giriş yapmamış kullanıcıya uyarı ekranı
│   │   ├── layout.tsx        # Tüm uygulama için genel layout (Header/Footer)
│   │   └── page.tsx          # Root giriş noktası / yönlendirme
│   ├── components/
│   │   └── layout/
│   │       ├── Header.tsx    # Üst menü (logo, menü, login/cart linkleri)
│   │       └── Footer.tsx    # Alt bilgi alanı
│   ├── providers/
│   │   └── ReduxProvider.tsx # Redux store provider’ı
│   ├── store/
│   │   ├── api/
│   │   │   └── productApi.tsx    # RTK Query ile ürün API istekleri
│   │   ├── slice/
│   │   │   ├── balanceSlice.tsx  # Bakiye ile ilgili state
│   │   │   └── cartSlice.tsx     # Sepet ile ilgili state
│   │   └── store.tsx             # Redux store yapılandırması
│   └── types/
│       ├── product.ts            # Ürün tipi (TypeScript interface)
│       └── cart.ts               # Sepet öğesi tipi
├── package.json
├── package-lock.json
├── next.config.ts
└── tsconfig.json