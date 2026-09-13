# Doğum Günü Sürpriz Uygulaması — Kişiselleştirme Rehberi

Uygulamayı sevgiline göre özelleştirmek için tek yapman gereken **index.html** dosyasının üst kısmındaki **CONFIG** objesini düzenlemek.

## Neler Düzenleyebilirsin?

### 1. Sevgilinin Adı
```javascript
PARTNER_NAME: "Aşkım",  // → Sevgilinin gerçek adını yaz
```

### 2. Aşk Mesajları
Her hediye kutusunda çıkacak mesajlar. İstediğin kadar ekleyebilir veya çıkar:
```javascript
LOVE_MESSAGES: [
    "Seni seviyorum çünkü gülüşün dünyamı aydınlatıyor.",
    "Seninle geçen her saniye bir ömre bedel.",
    // Yeni mesajlar ekle...
],
```

### 3. Fotoğraflar
Galerideki fotoğrafları değiş. Her fotoğrafa bir başlık ekleyebilirsin:
```javascript
PHOTOS: [
    { url: "https://ornek.com/foto1.jpg", caption: "İlk buluşmamız" },
    { url: "https://ornek.com/foto2.jpg", caption: "Tatilimiz" },
    // Kendi fotoğraflarınızı ekleyin...
],
```

**Fotoğraf yükleme seçenekleri:**
- **imgur.com**'a ücretsiz yükle, "Direct Link" alıp url alanına yapıştır
- veya fotoğrafları uygulamayla aynı klasöre koy (örn: `photos/1.jpg`) ve url olarak `photos/1.jpg` yaz

### 4. Final Mektup
Son ekrandaki kişisel mektup:
```javascript
FINAL_MESSAGE: "Sevgilim,\n\nBu küçük uygulamayı...",
```
`\n` ile yeni satıra geçebilirsin. `[Senin Adın]` kısmını kendi adınla değiş.

### 5. Doğum Günü Tarihi (Geri Sayım)
```javascript
BIRTHDAY_DATE: "2026-09-20",  // YYYY-AA-GG formatında
```

### 6. Arka Plan Müziği
Uygulama açıldığında sağ altta bir müzik butonu belirir. Sevgilin butona bastığında şarkı çalmaya başlar:
```javascript
MUSIC_URL: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
```
Herhangi bir YouTube şarkı linkini yapıştırman yeterli. "İlişkinizin şarkısı"nı koyabilirsin.

### 7. Video Mesajı
Galeri bölümünden sonra bir video bölümü gelir. Senin çektiğin bir video mesajı veya sevdiği bir klip olabilir:
```javascript
VIDEO_URL: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
VIDEO_TITLE: "Sana Özel Video",
VIDEO_DESC: "Bu videoyu senin için hazırladım. Umarım seversin.",
```
**Video ipucu:** Kendi videonu YouTube'a yükleyip linkini buraya yapıştır. Telefonla çektiğin 1-2 dakikalık romantik bir mesaj harika olur.

## Uygulamayı Nasıl Paylaşırsın?

1. Yukarıdaki önizleme uygulamasını aç
2. **Share** butonuna tıkla
3. Linki sevgiline gönder (WhatsApp, SMS, Instagram DM — fark etmez)
4. Sevgilin linki tıkladığında Safari'de açılacak
5. İstersen "Ana Ekrana Ekle" diyerek app gibi görünmesini sağlayabilir (ama bu sevgilinin yapması gereken bir şey)

## İpucu: Sürpriz Etkisini Artır

- Fotoğrafları önceden hazırla, mesajları dikkatle yaz
- Linki doğum günü sabahı veya gece yarısı gönder
- Mesajlara ortak anılarınızdan detaylar ekle (ilk buluşma, ilk "seni seviyorum", özel tatil)
- Final mektubunda geleceğe dair küçük vaatler de kullanabilirsin
