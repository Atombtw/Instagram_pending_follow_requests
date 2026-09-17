# Takip İsteği Geri Çekici

Instagram'da gönderdiğin ama henüz onaylanmamış takip isteklerini toplu olarak geri çeken bir tarayıcı betiği. Herhangi bir kurulum gerektirmez; instagram.com açıkken tarayıcı konsoluna yapıştırılarak çalıştırılır.

> **Uyarı:** Bu araç Instagram'ın resmi bir aracı değildir ve Instagram'ın herkese açık olmayan web arayüzünü kullanır. Toplu ve otomatik işlemler Instagram'ın kullanım koşullarına aykırı sayılabilir ve hesabına geçici kısıtlama gelmesine yol açabilir. Kullanım riski tamamen sana aittir. Instagram bir değişiklik yaparsa betik çalışmayı bırakabilir.

---

## İçindekiler

- [Özellikler](#özellikler)
- [Gereksinimler](#gereksinimler)
- [1. Bekleyen isteklerin listesini al](#1-bekleyen-isteklerin-listesini-al)
- [2. Betiği çalıştır](#2-betiği-çalıştır)
- [3. Tara](#3-tara)
- [4. İstekleri geri çek](#4-istekleri-geri-çek)
- [Panel](#panel)
- [Hız ve güvenlik ayarları](#hız-ve-güvenlik-ayarları)
- [Kaldığın yerden devam etme](#kaldığın-yerden-devam-etme)
- [Log mesajları ve ne yapmalı](#log-mesajları-ve-ne-yapmalı)
- [Sık sorulan sorular](#sık-sorulan-sorular)
- [Nasıl çalışır](#nasıl-çalışır)
- [Gizlilik ve güvenlik](#gizlilik-ve-güvenlik)

---

## Özellikler

- **Tarama modu:** Hiçbir şeyi değiştirmeden listedeki kişilerden hangilerinde isteğinin hâlâ beklediğini gösterir.
- **Geri çekme modu:** Yalnızca isteği gerçekten bekleyen kişilerde isteği geri çeker. İsteğini onaylamış (yani zaten takip ettiğin) kişilere dokunmaz, kimseyi yanlışlıkla takipten çıkarmaz.
- **Esnek liste girişi:** Kullanıcı adları, `@kullaniciadi`, profil linkleri ya da Instagram'dan indirilen JSON dosyasının içeriği.
- **Kaldığı yerden devam:** Sonuçlar tarayıcıda 24 saat saklanır. Sayfa yenilense veya işlem durdurulsa da tekrar başlatıldığında işlenmiş kişiler atlanır.
- **Hesap koruması:** İşlemler arasında rastgele beklemeler, düzenli molalar, Instagram limit uyguladığında artan bekleme süreleri ve engel gelince otomatik durma.
- **Arayüz:** Koyu temalı, sürüklenebilir ve küçültülebilir panel; ilerleme çubuğu, sayaçlar ve renkli işlem kaydı.

## Gereksinimler

- Bilgisayarda Chrome, Edge, Brave veya başka bir Chromium tabanlı tarayıcı (Firefox da çalışır)
- instagram.com'da açık bir oturum
- Betik dosyası: [`takip-istegi-geri-cekici.js`](takip-istegi-geri-cekici.js)

Telefondaki Instagram uygulamasında çalışmaz.

---

## 1. Bekleyen isteklerin listesini al

Elinde zaten kullanıcı adı listesi varsa bu adımı atla.

1. Instagram'da **Ayarlar → Hesap Merkezi → Bilgilerin ve izinlerin → Bilgilerini indir** yolunu izle.
2. **Bazı bilgi türleri**ni seç ve **Takipçiler ve takip edilenler**i işaretle.
3. Biçim olarak **JSON**'u seç ve isteği gönder.
4. Hazır olduğunda gelen dosyayı indirip aç. `pending_follow_requests.json` dosyası bekleyen isteklerini içerir.

Dosyanın içeriğini olduğu gibi panele yapıştırabilirsin; betik kullanıcı adlarını kendisi ayıklar.

## 2. Betiği çalıştır

1. Bilgisayarda **instagram.com**'u aç ve giriş yap.
2. **F12**'ye bas (veya sayfaya sağ tıklayıp **İncele**) ve **Console** sekmesine geç.
3. Chrome yapıştırmayı engellerse önce `allow pasting` yazıp Enter'a bas.
4. [`takip-istegi-geri-cekici.js`](takip-istegi-geri-cekici.js) dosyasının tüm içeriğini kopyalayıp konsola yapıştır ve Enter'a bas.

Sağ üstte panel açılır.

## 3. Tara

İlk çalıştırmada her zaman önce tarama yap.

1. Listeyi panelin üstündeki kutuya yapıştır. Kutunun sağ üstünde kaç kişi algılandığı görünür.
2. **Sadece tara** düğmesinin açık olduğundan emin ol.
3. **Taramayı başlat**'a bas.

Tarama bittiğinde kutuda yalnızca isteği hâlâ bekleyen kişiler kalır. Tarama hesabında hiçbir şeyi değiştirmez.

> Yaklaşık süre: kişi başına 2–4 saniye, her 15 kişide 30 saniye mola. 250 kişilik bir liste 20 dakika kadar sürer.

## 4. İstekleri geri çek

1. **İlk seferde küçük dene:** Kutuya yalnızca 1–2 kişi bırak (tam listeyi bir yere kaydet).
2. **Sadece tara** düğmesini kapat. Buton **Geri çekmeyi başlat** olur.
3. Butona bas ve çıkan onayı kabul et.
4. Log'da `istek geri çekildi` yazısını gör, sonra o kişinin profilini açıp butonun **Takip Et** olduğunu kontrol et.
5. Her şey yolundaysa tam listeyi yapıştırıp aynı şekilde başlat. Denemede işlenen kişiler otomatik atlanır.

Geri çekmeden hemen önce her kişinin durumu yeniden kontrol edilir. Bu arada isteğini onaylamış biri varsa atlanır.

> Yaklaşık süre: kişi başına 20–40 saniye, her 10 kişide 4 dakika mola. 180 kişi 3 saatin üzerinde sürer.
>
> **Önerilen:** Günde 60–80 kişide **Durdur**'a bas ve ertesi gün aynı listeyle devam et.

---

## Panel

| Öğe | Açıklama |
|---|---|
| Liste kutusu | Kullanıcı adları, linkler veya JSON içeriği. Sağ üstte algılanan kişi sayısı. |
| **Sadece tara** | Açıkken hiçbir şey değiştirilmez; kapalıyken istekler geri çekilir. |
| **Bekleme** | Geri çekme işlemleri arasındaki süre aralığı (saniye). En düşük 10. |
| **Başlat / Durdur** | Durdur her an çalışır; süren bekleme ve istek anında kesilir. |
| İlerleme çubuğu | İşlenen kişi sayısı ve yüzde; sağda bekleme geri sayımı. |
| Sayaçlar | Bekleyen istek (taramada) veya geri çekilen (geri çekmede), atlanan, hata. |
| İşlem kaydı | Yeşil: başarılı · Mavi: bilgi · Sarı: uyarı/bekleme · Kırmızı: hata · Gri: atlanan |
| **—** (küçült) | Paneli sağ alttaki küçük bir hapa dönüştürür; hap ilerlemeyi gösterir, tıklayınca panel açılır. |
| **✕** (kapat) | Paneli kapatır. İşlem sürüyorsa onay ister; ilerleme kaydedilmiş olur. |
| **Kayıtları sil** | Kaydedilen tarama sonuçlarını siler. |
| Başlık çubuğu | Tutup sürükleyerek paneli taşıyabilirsin; yeri hatırlanır. |

## Hız ve güvenlik ayarları

| Durum | Davranış |
|---|---|
| Tarama | Kişi başına 2–4 sn; her 15 sorguda 30 sn mola |
| Geri çekme | Kişi başına 20–40 sn (panelden değiştirilebilir); her 10 işlemde 4 dk mola |
| Kayıttan gelen kişi | Instagram'a istek gitmez, bekleme yapılmaz |
| Instagram limiti (429) | Sırasıyla 2, 5, 10, 20 dk bekler; sonra durur ve 1–2 saat sonra tekrar denemeni ister |
| Instagram engeli | Beklemeden hemen durur |

Bekleme sürelerini kısaltmak hesabının kısıtlanma olasılığını artırır.

**Sekmeyi önde tut.** Chrome arka plandaki sekmelerin zamanlayıcılarını dakikada bire kadar yavaşlatır; başka sekmeye geçersen beklemeler çok uzar. Bilgisayarın uyku moduna geçmemesine de dikkat et.

## Kaldığın yerden devam etme

Her kişinin sonucu tarayıcının `localStorage`'ında 24 saat saklanır. Durdurduğunda, panel kapandığında veya sayfa yenilendiğinde:

1. Betiği tekrar konsola yapıştır.
2. Aynı listeyi kutuya koy ve aynı modda başlat.

İsteği geri çekilmiş, bulunamamış ya da bekleyen isteği olmayan kişiler Instagram'a sorgu gönderilmeden atlanır (log'da `(kayıttan)` yazar). 24 saatten eski kayıtlar yeniden kontrol edilir.

---

## Log mesajları ve ne yapmalı

| Mesaj | Anlamı | Ne yapmalı |
|---|---|---|
| `istek geri çekildi` | İstek başarıyla geri çekildi. | — |
| `bekleyen istek var` | Taramada isteğin hâlâ beklediği görüldü. | Geri çekme moduna geç. |
| `bekleyen istek yok, atlandı` | İstek zaten yok (reddedilmiş veya önceden geri çekilmiş). | — |
| `zaten takip ediyorsun, atlandı` | Kişi isteğini onaylamış. | — |
| `bulunamadı, atlandı` | Hesap silinmiş, kapatılmış veya kullanıcı adı değişmiş. | — |
| `Instagram limiti ... dk bekleyip tekrar denenecek` | Instagram sorguları geçici olarak sınırlıyor. | Bir şey yapma, betik kendisi bekler. |
| `Instagram art arda limit uyguluyor` | Bekleme yetmedi, betik durdu. | 1–2 saat sonra tekrar çalıştır. |
| `Instagram bu işlemi engelledi` / `isteği reddetti (403)` | Hesaba geçici işlem kısıtı geldi. | O gün tekrar deneme; en az birkaç saat, tercihen bir gün bekle. |
| `Oturum kapanmış görünüyor` | Instagram oturumu düştü. | Sayfayı yenile, giriş yap, betiği tekrar çalıştır. |
| `Veri yerine sayfa döndü: ...` | Instagram beklenmeyen bir yanıt verdi. | Birkaç saat sonra tekrar dene. Sürerse Instagram arayüzünü değiştirmiş olabilir. |
| `Birinci yol olmadı, ikinci yol deneniyor` | Geri çekmenin ilk yöntemi çalışmadı. | Bir şey yapma; sonraki satır sonucu gösterir. |
| `geri çekilemedi` | Instagram isteği kabul etmedi. | Birkaç tane olursa sorun değil; sürekli oluyorsa durdur. |

Instagram uygulamasında **"Bazı işlemleri kısıtlıyoruz"** uyarısı görürsen betiği durdur ve bir gün ara ver.

---

## Sık sorulan sorular

**Yanlışlıkla birini takipten çıkarır mı?**
Hayır. Geri çekme isteği yalnızca Instagram o kişi için "istek bekliyor" dediğinde gönderilir. Kişi isteğini onaylamışsa atlanır.

**Tarama yaparken neden bekliyor?**
Her kişi için Instagram'a bir sorgu gider ve Instagram kısa sürede çok sorgu gelirse bunu engeller. Küçük beklemeler, çok daha uzun süren limit beklemelerini önler.

**Sayfayı yenilersem ne olur?**
Panel kapanır ama ilerleme kaybolmaz. Betiği tekrar yapıştırıp aynı listeyle başlat.

**Aynı anda başka sekmede Instagram kullanabilir miyim?**
Betiğin çalıştığı sekme önde kalmalı. Başka bir pencerede gezinebilirsin ama yoğun kullanım (beğeni, takip vb.) Instagram limitlerine katkıda bulunur.

**Günde kaç kişi güvenli?**
Kesin bir sayı yok; Instagram bunu açıklamıyor ve hesaba göre değişiyor. Günde 60–80 kişi makul bir başlangıç.

**Konsolda `YAKALANDI` yazan yeşil satırlar görüyorum.**
Bunlar sorun giderirken kullanılan dinleyici kodundan kalma. Zararsızdır; sayfayı yenileyince kaybolur. Betik için gerekli değildir.

**Kayıtları tamamen nasıl silerim?**
Paneldeki **Kayıtları sil** tarama sonuçlarını siler. Her şeyi temizlemek için konsola şunu yazabilirsin:

```js
['igc_cache_v2', 'igc_pos_v1', 'igc_headers_v1'].forEach(k => localStorage.removeItem(k));
```

---

## Nasıl çalışır

Betik, instagram.com sayfasının içinden ve senin oturumunla Instagram'ın web arayüzünün kullandığı adreslere istek gönderir.

| Adım | Adres | Amaç |
|---|---|---|
| 1 | `GET /web/search/topsearch/` | Kullanıcı adından hesap numarasını ve takip durumunu (`outgoing_request`) tek istekte almak |
| 2 | `GET /<kullanici_adi>/` | Kişi aramada çıkmazsa hesap numarasını profil sayfasından bulmak |
| 3 | `GET /api/v1/friendships/show/<id>/` | Takip durumu aramadan gelmezse durumu kontrol etmek |
| 4 | `POST /web/friendships/<id>/unfollow/` | Bekleyen isteği geri çekmek |
| 5 | `POST /api/v1/friendships/destroy/<id>/` | 4. adım başarısız olursa yedek yöntem |

Liste girişi; satır, boşluk, virgül veya noktalı virgülle ayrılmış kullanıcı adlarını, profil linklerini ve Instagram veri indirmesindeki `string_list_data` yapısını tanır.

Tarayıcıda saklanan veriler:

| Anahtar | İçerik |
|---|---|
| `igc_cache_v2` | Kullanıcı adı → hesap numarası, durum, kontrol zamanı |
| `igc_pos_v1` | Panelin ekrandaki konumu |

## Gizlilik ve güvenlik

- Betik **yalnızca instagram.com'a** istek gönderir. Başka hiçbir sunucuya veri göndermez, dış kaynaktan kod yüklemez.
- Şifreni sormaz; tarayıcıdaki mevcut oturumu kullanır.
- Kaydettiği bilgiler yalnızca senin tarayıcında kalır.
- **Genel kural:** Başkalarının "konsola yapıştır" diye verdiği kodları içini okumadan veya güvendiğin birine kontrol ettirmeden asla çalıştırma. Bu yöntemle hesaplar çalınabiliyor.
