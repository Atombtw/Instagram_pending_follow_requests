<a id="turkce"></a>

# Takip İsteği Geri Çekici

**Türkçe** · [English](#english)

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

---
---

<a id="english"></a>

# Follow Request Withdrawer (English)

[Türkçe](#turkce) · **English**

A browser script that withdraws Instagram follow requests you sent that haven't been approved yet, in bulk. No installation needed: open instagram.com, paste the script into the browser console and run it.

> **Warning:** This is not an official Instagram tool. It uses Instagram's non-public web interface. Bulk, automated actions may violate Instagram's Terms of Use and can lead to temporary restrictions on your account. Use at your own risk. The script may stop working if Instagram changes its site.

> **Note:** The panel and log messages are in Turkish. The tables below give the English meaning of each label and message.

---

## Contents

- [Features](#features)
- [Requirements](#requirements)
- [1. Get your list of pending requests](#1-get-your-list-of-pending-requests)
- [2. Run the script](#2-run-the-script)
- [3. Scan](#3-scan)
- [4. Withdraw requests](#4-withdraw-requests)
- [The panel](#the-panel)
- [Speed and safety settings](#speed-and-safety-settings)
- [Resuming where you left off](#resuming-where-you-left-off)
- [Log messages and what to do](#log-messages-and-what-to-do)
- [FAQ](#faq)
- [How it works](#how-it-works)
- [Privacy and security](#privacy-and-security)

---

## Features

- **Scan mode:** Shows which people on your list still have a pending request from you, without changing anything.
- **Withdraw mode:** Withdraws requests only for people whose request is actually still pending. It never touches people who approved your request (i.e. people you already follow), so it can't unfollow anyone by mistake.
- **Flexible input:** Usernames, `@username`, profile links, or the contents of the JSON file from Instagram's data download.
- **Resume support:** Results are stored in the browser for 24 hours. If you stop, close the panel or reload the page, already processed people are skipped when you start again.
- **Account protection:** Random delays between actions, regular breaks, increasing wait times when Instagram rate-limits, and an automatic stop when Instagram blocks an action.
- **Interface:** Dark, draggable and minimizable panel with a progress bar, counters and a color-coded log.

## Requirements

- Chrome, Edge, Brave or another Chromium-based browser on a computer (Firefox also works)
- A logged-in session on instagram.com
- The script file: [`takip-istegi-geri-cekici.js`](takip-istegi-geri-cekici.js)

It does not work in the Instagram mobile app.

---

## 1. Get your list of pending requests

Skip this step if you already have a list of usernames.

1. In Instagram, go to **Settings → Accounts Center → Your information and permissions → Download your information**.
2. Choose **Some of your information** and select **Followers and following**.
3. Choose **JSON** as the format and submit the request.
4. When it's ready, download and open the file. `pending_follow_requests.json` contains your pending requests.

You can paste the file's contents into the panel as-is; the script extracts the usernames itself.

## 2. Run the script

1. Open **instagram.com** on your computer and log in.
2. Press **F12** (or right-click the page and choose **Inspect**) and switch to the **Console** tab.
3. If Chrome blocks pasting, type `allow pasting` and press Enter first.
4. Copy the entire contents of [`takip-istegi-geri-cekici.js`](takip-istegi-geri-cekici.js), paste it into the console and press Enter.

The panel opens in the top-right corner.

## 3. Scan

Always scan first on your first run.

1. Paste your list into the box at the top of the panel. The number of detected people appears at the top right of the box.
2. Make sure the **Sadece tara** (scan only) switch is on.
3. Click **Taramayı başlat** (start scan).

When the scan finishes, the box contains only the people whose request is still pending. Scanning doesn't change anything on your account.

> Estimated time: 2–4 seconds per person, plus a 30-second break every 15 people. A list of 250 people takes about 20 minutes.

## 4. Withdraw requests

1. **Try a small test first:** Leave only 1–2 people in the box (save the full list somewhere).
2. Turn the **Sadece tara** switch off. The button changes to **Geri çekmeyi başlat** (start withdrawing).
3. Click the button and accept the confirmation.
4. Look for `istek geri çekildi` (request withdrawn) in the log, then open that person's profile and check that the button now says **Follow**.
5. If everything looks right, paste the full list and start again the same way. People processed in the test are skipped automatically.

Each person's status is re-checked right before withdrawing. Anyone who approved your request in the meantime is skipped.

> Estimated time: 20–40 seconds per person, plus a 4-minute break every 10 people. 180 people take more than 3 hours.
>
> **Recommended:** Click **Durdur** (stop) after 60–80 people a day and continue with the same list the next day.

---

## The panel

| Element (Turkish label) | Description |
|---|---|
| List box | Usernames, links or JSON content. The number of detected people is shown at the top right. |
| **Sadece tara** (scan only) | When on, nothing is changed; when off, requests are withdrawn. |
| **Bekleme** (delay) | Delay range between withdrawals, in seconds. Minimum 10. |
| **Başlat / Durdur** (start / stop) | Stop works at any time; the current wait and request are cancelled immediately. |
| Progress bar | Number of processed people and percentage; wait countdown on the right. |
| Counters | **Bekleyen istek** (pending requests, when scanning) or **Geri çekilen** (withdrawn, when withdrawing), **Atlanan** (skipped), **Hata** (errors). |
| Log | Green: success · Blue: info · Yellow: warning/wait · Red: error · Grey: skipped |
| **—** (minimize) | Turns the panel into a small pill in the bottom-right corner that shows progress; click it to reopen the panel. |
| **✕** (close) | Closes the panel. Asks for confirmation if a run is in progress; progress is saved. |
| **Kayıtları sil** (clear records) | Deletes saved scan results. |
| Title bar | Drag it to move the panel; the position is remembered. |

## Speed and safety settings

| Situation | Behavior |
|---|---|
| Scanning | 2–4 s per person; 30 s break every 15 lookups |
| Withdrawing | 20–40 s per person (adjustable in the panel); 4 min break every 10 actions |
| Person loaded from saved records | No request is sent to Instagram, no delay |
| Instagram rate limit (429) | Waits 2, 5, 10, then 20 minutes; then stops and asks you to try again in 1–2 hours |
| Instagram block | Stops immediately without waiting |

Shortening the delays increases the chance of your account being restricted.

**Keep the tab in the foreground.** Chrome slows down timers in background tabs to as little as once per minute, so waits get much longer if you switch tabs. Also make sure your computer doesn't go to sleep.

## Resuming where you left off

Each person's result is stored in the browser's `localStorage` for 24 hours. If you stop, the panel closes or the page reloads:

1. Paste the script into the console again.
2. Put the same list in the box and start in the same mode.

People whose request was withdrawn, who weren't found, or who have no pending request are skipped without sending a request to Instagram (the log shows `(kayıttan)`, meaning "from records"). Records older than 24 hours are checked again.

---

## Log messages and what to do

| Message (Turkish) | Meaning | What to do |
|---|---|---|
| `istek geri çekildi` | The request was withdrawn successfully. | — |
| `bekleyen istek var` | The scan found the request is still pending. | Switch to withdraw mode. |
| `bekleyen istek yok, atlandı` | No pending request (declined or already withdrawn). | — |
| `zaten takip ediyorsun, atlandı` | The person approved your request. | — |
| `bulunamadı, atlandı` | The account was deleted, deactivated or renamed. | — |
| `Instagram limiti ... dk bekleyip tekrar denenecek` | Instagram is temporarily limiting requests. | Do nothing; the script waits on its own. |
| `Instagram art arda limit uyguluyor` | Waiting didn't help, so the script stopped. | Run it again in 1–2 hours. |
| `Instagram bu işlemi engelledi` / `isteği reddetti (403)` | Your account has a temporary action restriction. | Don't retry that day; wait at least a few hours, ideally a day. |
| `Oturum kapanmış görünüyor` | Your Instagram session ended. | Reload the page, log in and run the script again. |
| `Veri yerine sayfa döndü: ...` | Instagram returned an unexpected response (a page instead of data). | Try again in a few hours. If it persists, Instagram may have changed its interface. |
| `Birinci yol olmadı, ikinci yol deneniyor` | The first withdrawal method failed. | Do nothing; the next line shows the result. |
| `geri çekilemedi` | Instagram didn't accept the withdrawal. | A few are fine; if it keeps happening, stop. |

If the Instagram app shows **"We restrict certain activity"**, stop the script and take a day off.

---

## FAQ

**Can it unfollow someone by mistake?**
No. A withdrawal is only sent when Instagram reports the request for that person as pending. If they approved your request, they are skipped.

**Why does it wait while scanning?**
Each person requires a request to Instagram, and Instagram blocks too many requests in a short time. Small delays prevent much longer rate-limit waits.

**What happens if I reload the page?**
The panel closes but progress isn't lost. Paste the script again and start with the same list.

**Can I use Instagram in another tab at the same time?**
The tab running the script should stay in the foreground. You can browse in another window, but heavy activity (likes, follows, etc.) also counts toward Instagram's limits.

**How many people a day is safe?**
There's no exact number; Instagram doesn't publish it and it varies by account. 60–80 people a day is a reasonable starting point.

**I see green `YAKALANDI` lines in the console.**
These come from the listener code used during troubleshooting. They're harmless and disappear when you reload the page. The script doesn't need them.

**How do I delete all saved data?**
**Kayıtları sil** in the panel deletes scan results. To clear everything, type this into the console:

```js
['igc_cache_v2', 'igc_pos_v1', 'igc_headers_v1'].forEach(k => localStorage.removeItem(k));
```

---

## How it works

The script runs inside the instagram.com page and, using your session, sends requests to the endpoints Instagram's web interface uses.

| Step | Endpoint | Purpose |
|---|---|---|
| 1 | `GET /web/search/topsearch/` | Get the account ID and follow status (`outgoing_request`) from a username in a single request |
| 2 | `GET /<username>/` | Find the account ID from the profile page if the person doesn't appear in search |
| 3 | `GET /api/v1/friendships/show/<id>/` | Check the follow status if search didn't return it |
| 4 | `POST /web/friendships/<id>/unfollow/` | Withdraw the pending request |
| 5 | `POST /api/v1/friendships/destroy/<id>/` | Fallback if step 4 fails |

The list parser accepts usernames separated by newlines, spaces, commas or semicolons, profile links, and the `string_list_data` structure from Instagram's data download.

Data stored in the browser:

| Key | Contents |
|---|---|
| `igc_cache_v2` | Username → account ID, status, check time |
| `igc_pos_v1` | The panel's position on screen |

## Privacy and security

- The script sends requests **only to instagram.com**. It doesn't send data to any other server or load code from external sources.
- It never asks for your password; it uses the existing session in your browser.
- Everything it saves stays in your own browser.
- **General rule:** Never run code someone tells you to "paste into the console" without reading it or having someone you trust check it. Accounts get stolen this way.
