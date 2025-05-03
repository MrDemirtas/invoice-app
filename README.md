# Invoice App

Bu proje, modern ve kullanıcı dostu bir fatura yönetim uygulamasıdır. React ve Vite kullanılarak geliştirilmiş olup, fatura oluşturma, düzenleme ve takip etme işlemlerini kolaylaştırmayı amaçlamaktadır.

## 🚀 Özellikler

- Fatura oluşturma ve düzenleme
- Fatura durumu takibi (Taslak, Beklemede, Ödenmiş)
- Fatura filtreleme
- Karanlık/Aydınlık tema desteği
- Responsive tasarım (Mobil ve Tablet uyumlu)
- Yerel depolama ile veri kalıcılığı

## 🛠️ Kullanılan Teknolojiler

- **React** - ^18.3.1
- **React DOM** - ^18.3.1
- **Vite** - ^6.0.5
- **ESLint** - Kod kalitesi ve standartları için

## 📁 Proje Yapısı

```
invoice-app/
├── public/
│   ├── images/
│   │   └── avatar.png
│   └── svg/
│       ├── backarrow.svg
│       ├── dropdownarrow.svg
│       └── [diğer svg dosyaları...]
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── HomePage.jsx
│   │   ├── IvoiceDetails.jsx
│   │   └── NewAndEditInvoice.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── dark-mode.css
│   ├── reset.css
│   └── main.jsx
└── package.json
```

## 🚦 Başlangıç

1. Projeyi klonlayın:

```bash
git clone https://github.com/MrDemirtas/invoice-app.git
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

## 💡 Temel Bileşenler

### App.jsx

- Ana uygulama bileşeni
- Rota yönetimi
- Tema ve ekran boyutu yönetimi
- Veri yönetimi (Context API)

### HomePage.jsx

- Fatura listesi görüntüleme
- Filtreleme işlemleri
- Yeni fatura oluşturma

### IvoiceDetails.jsx

- Fatura detayları görüntüleme
- Fatura durumu güncelleme
- Fatura silme işlemleri

### Header.jsx

- Tema değiştirme (Karanlık/Aydınlık)
- Logo ve kullanıcı avatarı

## 🎨 Tema Desteği

Uygulama, kullanıcı tercihine göre karanlık ve aydınlık tema desteği sunmaktadır. Tema tercihi yerel depolamada saklanır ve sistem teması ile senkronize çalışır.

## 📱 Responsive Tasarım

Uygulama, farklı ekran boyutlarına uyum sağlayacak şekilde tasarlanmıştır:

- Mobil görünüm (< 768px)
- Tablet ve masaüstü görünümü (≥ 768px)

## 🔄 Veri Yönetimi

- Veriler yerel depolamada (localStorage) saklanır
- Context API ile global state yönetimi
- Anlık veri güncellemeleri

## 🛠️ Geliştirme

```bash
# Geliştirme sunucusu
npm run dev

# Lint kontrolü
npm run lint

# Üretim için derleme
npm run build

# Önizleme
npm run preview
```
