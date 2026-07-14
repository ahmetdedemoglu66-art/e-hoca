/**
 * Erkan Hoca - Ortaokul Türkçe sorularına doğru cevap verir.
 */

(function (global) {
  'use strict';

  const ERKAN = {
    cevapVer: function (metin) {
      const t = (metin || '').trim().toLowerCase();
      if (!t) return 'Bir soru veya cümle yaz, sana yardımcı olayım.';

      // Selamlaşma
      if (/^(selam|merhaba|hey|naber|nasılsın|iyi günler|günaydın)/i.test(t)) {
        return 'Selam! Ben Erkan Hoca. Ortaokul Türkçe konularında ne sormak istersin? Dil bilgisi, yazım, paragraf, sözcük türleri… Yaz, cevaplayayım.';
      }

      // Teşekkür
      if (/^(teşekkür|sağol|sağ ol|eyvallah|çok teşekkür)/i.test(t)) {
        return 'Rica ederim! Başka sorun olursa yine yaz. Başarılar dilerim. 📚';
      }

      // Fiil kipleri
      if (/fiil\s*kip|kip\s*nedir|haber\s*kip|dilek\s*kip|bildirme|tasarlama/i.test(t) || /geleceğim|geldim|gelsin|gelmeli|gelirdi/i.test(t)) {
        return 'Fiil kipleri ikiye ayrılır:\n\n**1. Haber (Bildirme) Kipleri:** Zaman bildirir.\n• Görülen geçmiş: -dı/-di (geldi)\n• Öğrenilen geçmiş: -mış/-miş (gelmiş)\n• Şimdiki: -yor (geliyor)\n• Gelecek: -acak/-ecek (gelecek)\n• Geniş: -r/-ar/-er (gelir)\n\n**2. Dilek (Tasarlama) Kipleri:** Zaman bildirmez.\n• Gereklilik: -meli/-malı (gelmeli)\n• İstek: -e/-a (gele)\n• Şart: -se/-sa (gelse)\n• Emir: gelsin, gel (emir kipi eki yok, kişi ekleriyle)\n\nBir cümlede kip arıyorsan yüklemi bul; yüklemdeki kip eki cevabı verir.';
      }

      // Özne - yüklem
      if (/özne|yüklem|özne\s*yüklem|özne\s*nedir|yüklem\s*nedir/i.test(t)) {
        return '**Özne:** Cümlede işi, oluşu, hareketi yapan veya durumu üstlenen öğedir. "Kim? / Ne?" sorularına cevap verir. Örnek: "Çocuklar bahçede oynuyor." → Kim oynuyor? Çocuklar (özne).\n\n**Yüklem:** İşi, oluşu, hareketi veya durumu bildiren öğedir. Cümlede mutlaka bulunur; fiil veya ek-fiil alır. Örnek: "Ali kitap okudu." → Yüklem: okudu.\n\nÖzne-yüklem uyumu: Tekillik-çoğulluk ve kişi açısından uyumlu olmalı. "Ben gittim" ✓ / "Ben gitti" ✗';
      }

      // de/da yazımı
      if (/\bde\b|\bda\b|de\s*da\s*yazım|de da ayrı mı|bitişik de/i.test(t) || /de da nasıl yazılır/i.test(t)) {
        return '**Bağlaç "de/da":** Ayrı yazılır, "te/ta" olarak okunmaz. Cümleden çıkarınca anlam bozulmaz. Örnek: "Ben de geldim." → "Ben geldim" de olur.\n\n**Bulunma hâli "-de/-da":** Bitişik yazılır, yer/zaman bildirir. "Evde, okulda, yarında." Cümleden çıkarınca anlam bozulur.\n\n**Kısa kural:** Cümleden çıkarabiliyorsan → ayrı "de/da". Çıkaramıyorsan → bitişik "-de/-da".';
      }

      // ki yazımı
      if (/\bki\b|ki nasıl yazılır|ki bitişik mi|ki ayrı mı/i.test(t)) {
        return '**Bağlaç "ki":** Ayrı yazılır. İki cümleyi veya öğeyi bağlar. Örnek: "Öyle yorgunum ki uyuyacağım."\n\n**Sıfat yapan "-ki" ve zamir "-ki":** Bitişik yazılır. Örnek: "evdeki masa", "bendeki kalem", "duvardaki resim".\n\n**Kısa kural:** "-ki" bir ismin yerini tutuyorsa veya sıfat yapıyorsa bitişik (evdeki, bendeki). Cümle bağlıyorsa ayrı "ki".';
      }

      // mi mı mu mü
      if (/mi\s*mı\s*mu|soru eki|mi ayrı mı|mı nasıl yazılır/i.test(t)) {
        return '**Soru eki "-mı/-mi/-mu/-mü":** Her zaman ayrı yazılır. Ünlü uyumuna göre -mı, -mi, -mu, -mü olur. Örnek: "Geldi mi?", "Okudun mu?", "Güzel mi?"\n\n**Büyük ünlü uyumu:** mı (a, ı, o, u) / mi (e, i, ö, ü). Kelimenin son ünlüsüne bak.\n\n**Dikkat:** "Ev mi?" → ayrı. "Geldi mi?" → ayrı. Hiçbir zaman bitişik yazılmaz.';
      }

      // İsim, sıfat, zarf
      if (/isim\s*nedir|ad\s*nedir|sıfat\s*nedir|zarf\s*nedir|sözcük\s*türü/i.test(t) || /varlık\s*adı|özellik|niteleme/i.test(t)) {
        return '**İsim (Ad):** Varlıkları, kavramları karşılayan sözcüklerdir. "Ev, kitap, Ali, Ankara, sevgi."\n\n**Sıfat:** İsimleri renk, sayı, durum vb. yönlerden niteleyen veya belirten sözcüklerdir. "Güzel ev, üç kitap, bu çocuk."\n\n**Zarf:** Fiilleri, sıfatları veya başka zarfları niteleyen sözcüklerdir. "Hızlı koştu, çok güzel, pek iyi."\n\nKısaca: İsim = varlık/kavram. Sıfat = ismi niteler. Zarf = fiili veya sıfatı niteler.';
      }

      // Noktalama
      if (/noktalama|virgül|nokta|ünlem|soru işareti|iki nokta|tırnak/i.test(t)) {
        return '**Temel noktalama:**\n• Nokta (.): Cümle sonu, kısaltmalar.\n• Virgül (,): Sıralama, hitap, ara cümle, vb.\n• Soru işareti (?): Soru cümlesi sonu.\n• Ünlem (!): Ünlem, emir, uyarı sonu.\n• İki nokta (:): Açıklama, konuşma öncesi.\n• Tırnak (" "): Alıntı, vurgu.\n• Kısa çizgi (-): Ara söz, satır sonu bölme.\n\nCümle bitti mi → nokta. Soru mu → ?. Bağlaçtan önce gerekiyorsa virgül (ama, fakat, çünkü vb. cümle ortasında virgül alabilir).';
      }

      // Söz sanatları (kişileştirme, benzetme, mecaz vb.)
      if (/söz\s*sanat|kişileştirme|benzetme|mecaz|abartma|konuşturma|teşbih|istiare|gülümsüyor|gülümsüyordu/i.test(t) || /hangi\s*sanat|hangi\s*söz/i.test(t)) {
        return '**Söz sanatları** (ortaokulda sık çıkanlar):\n\n• **Kişileştirme:** İnsan dışı varlıklara insana özgü davranış/duygu vermek. Örnek: "Çiçekler gülümsüyordu." → Çiçekler insan gibi gülümsüyor; kişileştirme.\n\n• **Benzetme (teşbih):** Bir şeyi başka bir şeye "gibi, kadar" vb. ile benzetmek. "Gözleri deniz gibi mavi."\n\n• **Abartma:** Bir özelliği olduğundan fazla göstermek. "Dünyalar kadar işim var."\n\n• **Konuşturma:** İnsan dışı varlıkları konuşturmak. "Ağaç, "Beni kesme!" dedi."\n\n• **Mecaz:** Sözcüğü gerçek anlamı dışında kullanmak. "Kalbi kırıldı." (gerçekte kırılma yok)\n\n"Çiçekler gülümsüyordu" → **Kişileştirme** (çiçeklere insan davranışı verilmiş).';
      }

      // Paragraf
      if (/paragraf|ana fikir|yardımcı fikir|giriş|gelişme|sonuç/i.test(t)) {
        return '**Paragraf:** Tek bir düşünce etrafında kurulmuş cümleler topluluğudur.\n\n**Yapı:**\n• **Giriş:** Konunun ortaya konduğu ilk cümle(ler).\n• **Gelişme:** Ana düşüncenin açıldığı, örneklerin verildiği kısım.\n• **Sonuç:** Özet veya sonuç cümlesi.\n\n**Ana fikir:** Paragrafın vermek istediği asıl mesaj.\n**Yardımcı fikirler:** Ana fikri destekleyen düşünceler.\n\nAna fikir genelde giriş veya sonuç cümlesinde olur; bazen gelişme kısmında da çıkarılabilir.';
      }

      // Cümle türleri
      if (/cümle\s*türü|kurallı|devrik|basit|birleşik|isim\s*cümlesi|fiil\s*cümlesi/i.test(t)) {
        return '**Yüklemine göre:**\n• **Fiil cümlesi:** Yüklemi fiil. "Ali okula gitti."\n• **İsim cümlesi:** Yüklemi isim (ek-fiille). "Bu bir kitaptır."\n\n**Yapısına göre:**\n• **Basit cümle:** Tek yüklem. "Çocuk oynuyor."\n• **Birleşik cümle:** İçinde yan cümlecik var. "Gelen çocuk benim kardeşimdir."\n\n**Dizilişine göre:**\n• **Kurallı:** Yüklem sonda. "Ali dün geldi."\n• **Devrik:** Yüklem sonda değil. "Geldi Ali dün."';
      }

      // Yazım kuralları
      if (/yazım|imla|büyük harf|küçük harf|özel isim|birleşik/i.test(t)) {
        return '**Büyük harf:** Cümle başı, özel isimler (kişi, şehir, kitap adı vb.), kısaltmalar (TDK, ABD).\n\n**Özel isimler:** Kişi adları, yer adları, kurum adları, kitap/film adları büyük harfle başlar. "Türkiye, Ankara, Ahmet, Türk Dil Kurumu."\n\n**Birleşik sözcükler:** Bazıları bitişik (birçok, hiçbir, herhangi), bazıları ayrı (araba vapuru, çekirdek ailesi). Sözlükten kontrol etmek en doğrusu.\n\n**-ci/-cı eki:** İsimden isim yapar, bitişik: "balıkçı, gözlükçü."';
      }

      // Zamir
      if (/zamir|adıl|şahıs zamiri|işaret zamiri|belgisiz zamir/i.test(t)) {
        return '**Zamir (Adıl):** İsimlerin yerini tutan sözcüklerdir.\n\n• **Kişi zamirleri:** ben, sen, o, biz, siz, onlar\n• **İşaret zamirleri:** bu, şu, o (işaret anlamında)\n• **Belgisiz zamirler:** bazıları, birkaçı, herkes, kimse, hiçbiri\n• **Soru zamirleri:** kim, ne, hangisi, kaçı\n• **Dönüşlülük:** kendim, kendin, kendisi…\n\nİsmin yerine geçtiği için cümlede isim gibi kullanılır; özne, nesne vb. olabilir.';
      }

      // Edat, bağlaç, ünlem
      if (/edat|bağlaç|ünlem|ilgeç/i.test(t)) {
        return '**Edat (İlgeç):** Sözcükler arasında anlam ilgisi kurar. "için, gibi, kadar, ile, göre, karşı, beri, dolayı" vb. Örnek: "Senin için yaptım."\n\n**Bağlaç:** Cümleleri veya öğeleri bağlar. "ve, ama, fakat, çünkü, ki, de, ya…ya, ne…ne." Örnek: "Geldim ama kalmayacağım."\n\n**Ünlem:** Duygu, sesleniş, onay/red bildirir. "Ah, vay, hey, evet, hayır, aferin." Cümle dışı veya cümle başı/sonu olabilir.';
      }

      // Fiilimsiler (ortaokulda isim-fiil, sıfat-fiil, zarf-fiil)
      if (/fiilimsi|isim fiil|sıfat fiil|zarf fiil|-mak -mek|-an -en|-arak -erek/i.test(t)) {
        return '**Fiilimsi:** Fiilden türeyip cümlede isim, sıfat veya zarf gibi kullanılan sözcüklerdir.\n\n• **İsim-fiil:** -mak/-mek, -ma/-me, -ış/-iş. "Koşmak sağlıklıdır." (isim gibi)\n• **Sıfat-fiil:** -an/-en, -ası/-esi, -maz/-mez, -dık/-dik… "Gelen çocuk." (sıfat gibi)\n• **Zarf-fiil:** -arak/-erek, -ınca/-ince, -madan/-meden, -alı/-eli… "Koşarak geldi." (zarf gibi)\n\nFiilimsi bulmak için: Fiil kökü + fiilimsi eki var mı, cümlede isim/sıfat/zarf görevi görüyor mu diye bak.';
      }

      // Ek-fiil
      if (/ek fiil|ekfiil|-dir -dır|idi imiş ise/i.test(t)) {
        return '**Ek-fiil:** İsim soylu sözcükleri yüklem yapar. "idi, imiş, ise" ve "-dir/-dır" biçimleri vardır.\n\n• **-di/-dı (görülen geçmiş):** "Öğretmendi." (öğretmen + idi)\n• **-miş/-mış (öğrenilen geçmiş):** "Öğretmenmiş."\n• **-se/-sa (şart):** "Öğretmense."\n• **-dir/-dır (geniş zaman):** "Öğretmendir."\n\nİsim cümlelerinde yüklem isim + ek-fiil şeklinde olur. Ek-fiil bazen düşer: "Bu kitap güzel." (güzel(dir) anlamında).';
      }

      // Genel soru
      if (t.length < 100 && (/\?|nedir|ne demek|nasıl|niçin|neden|hangi|kaç|kim|ne/i.test(t))) {
        return 'Bu konuda net bilgi verebilmem için soruyu biraz daha net yazabilir misin? Örneğin: "Fiil kipi nedir?", "de da nasıl yazılır?", "Özne yüklem uyumu nedir?" gibi. İstersen doğrudan bir cümle yaz, o cümledeki dil bilgisi öğelerini de açıklayabilirim.';
      }

      // Varsayılan cevap
      return 'Sorduğun şeyi tam çıkaramadım. Şunlardan birini net yazarsan cevaplayabilirim:\n\n• Fiil kipleri\n• Özne ve yüklem\n• de / da yazımı\n• ki yazımı\n• mi mı mu mü (soru eki)\n• İsim, sıfat, zarf\n• Noktalama işaretleri\n• Paragraf, ana fikir\n• Cümle türleri\n• Zamir, edat, bağlaç\n• Fiilimsiler\n• Ek-fiil\n\nİstersen doğrudan bir cümle yaz, üzerinden birlikte geçelim.';
    }
  };

  global.ErkanHoca = ERKAN;
})(typeof window !== 'undefined' ? window : this);
