📐 Geometri Araç Seti (tab-that-aktarim)
Dijital Geometri Laboratuvarı ve Etkileşimli Sınıf Platformu

Bu yazılım, geometri öğretimini somutlaştırmak, etkileşimi artırmak ve geleneksel ölçüm araçlarını dijital dünyanın hızıyla birleştirmek amacıyla geliştirilmiş, gönüllü bir eğitim platformudur.

🌟 Öne Çıkan Özellikler
1. Çizim ve Şekil Araçları
Akıllı Çizim: Kalem ve silgi ile akıcı not alma. Silgi, temas ettiği tüm objeyi tek dokunuşta siler.

Gelişmiş Çizim Araçları: Çizgi, doğru parçası ve ışın çizimi. İkinci tıklama/parmak çekme ile onaylanan önizlemeli çizim mekanizması.

Geometrik Şekiller: Çokgenler (3gen, 5gen vb.) ve çemberler. Çizim esnasında gerçek zamanlı boyut takibi ve çokgen kenar/açı ölçümleri.

Matematiksel Hesaplama: Çember ve çokgenlerde, taştı butonuna basıp şekle tıklandığında Pİ=3 kabulüyle hesaplanmış çevre, alan ve yarıçap formüllerinin gösterimi.

2. Etkileşimli Fiziksel Araçlar
Cetvel, Gönye, Açıölçer ve Pergel: Gerçek zamanlı uzunluk/açı etiketleri.

Akıllı Pergel: Otomatik kilitlenen sivri uç, uç değiştirme (tepeye çift tıklama) ve turuncu/pembe butonlarla boyutlandırma.

Dinamik Etiketleme: Araçların üzerine entegre edilen etiketler sayesinde, çizim yaparken değerleri anlık takip edebilirsiniz.

3. PDF/Resim Desteği ve "Canlandırma" (Snapshot)
Ultra Yüksek Çözünürlük: Tek tıkla PDF kitapları veya görselleri sisteme yükleme.

Sayfa Yönetimi: Kitap modunda sayfa numarası ile doğrudan erişim ve ileri/geri navigasyon.

Snapshot Özelliği: Yüklü PDF/Resim üzerindeki bir soruyu veya şekli çerçeve içine alıp kopyalama. Kopyalanan parçayı döndürme, taşıma ve yeniden boyutlandırma.

Arka Sıra Görünürlüğü: İki parmakla zoom özelliği sayesinde en arkadaki öğrencinin bile içeriği net görmesini sağlama.

4. Özelleştirme ve Kontrol
Renk Paleti: Beyaz veya Siyah zemin seçeneği (Kitap arka planına göre hızlı geçiş).

Kontrol Paneli: Geri al, hepsini sil ve araç gövdelerinden serbestçe taşıma özellikleri.

Eğitim Oyunları: 5. Sınıf Maarif Modeli ile uyumlu 14 adet etkileşimli oyun (Restorasyon aşamasında).

🔒 Güvenlik Mimarisi
Uygulama, Merkeziyetsiz P2P (Peer-to-Peer) mimarisiyle tasarlanmıştır.

Yerel Ağ (Wi-Fi) Zorunluluğu: Dışarıdan veya farklı lokasyonlardan izinsiz erişimleri engellemek için bağlantı, aynı yerel ağ (Aynı modem/okul ağı) ile sınırlandırılmıştır.

Veri Gizliliği: Uygulama hiçbir kişisel veri toplamaz, depolamaz veya sunucuya yüklemez. Tüm oturum verileri geçicidir ve tarayıcılar arası doğrudan (P2P) aktarılır.

PIN Korumalı Bağlantı: Oda kodu ve her ders için üretilen 4 haneli PIN kodu sayesinde, sınıf içindeki bağlantılar sadece yetkili tabletlerle mühürlenir.

⚠️ Yasal Uyarı ve Sorumluluk Reddi
Eğitim Amaçlıdır: Bu yazılım, yalnızca sınıf içi eğitim faaliyetlerini desteklemek amacıyla tasarlanmıştır. Yazılımın amacı dışında kullanımı yasaktır ve kullanıcı sorumluluğundadır.

Sorumluluk Reddi: Bu yazılım "olduğu gibi" sunulmuştur. Geliştirici, yazılımın kullanımından kaynaklanan veya kullanım amacı dışında kullanılmasıyla ortaya çıkabilecek hiçbir hukuki, cezai veya idari sorumluluğu kabul etmez. Kullanıcı, yazılımı kullanmaya başladığı andan itibaren tüm sorumluluğu üstlenmiş sayılır.

Bağımsızlık: Bu proje, herhangi bir resmi kurumla organik bağ içermeyen, öğretmen tarafından geliştirilmiş kişisel bir hobi projesidir.

Lisans: MIT Lisansı ile korunmaktadır.

ℹ️ Disclaimer (English)
This software is an independent educational tool developed voluntarily by a teacher. It is intended solely for classroom educational purposes. It does not collect, store, or upload any personal data. It is provided "as is" under the MIT License. The developer accepts no liability for misuse.

## Derste hızlı kullanım (önerilen)

1. Tahtada GitHub Pages bağlantısını açın: `https://bdemir1499.github.io/-geobek/`
2. Tabletlerde aynı bağlantıyı açın ve **Oda Kodu** ile tahtada görünen **Tahta Şifresi/PIN** değerini girin.
3. Tahta üzerindeki bağlantı isteğini onaylayın. İlk başarılı tablet bağlantısından sonra aynı ders oturumundaki diğer bağlantılar otomatik reddedilir.
4. Yeni bir ders için tahtayı yenileyin; yeni oda kodu ve PIN üretilir.

Tablet için istenirse tahtadaki QR kod okutulabilir. Linke tıklamak ve oda kodu + PIN girmek dışında Node.js, npm, `IP:3000` veya `.bat` kullanımı gerekmez.

GitHub Pages dışında localhost ile geliştirme yapılırken `server.js` ve `Geobek-Baslat.bat` hâlâ kullanılabilir. Bu durumda uygulama yerel `9000/peerjs` signaling endpoint'ine bağlanır; GitHub Pages'te ise uygulama PeerJS'in public signaling varsayılanını otomatik seçer.

### Gizlilik ve bağlantı modeli

PDF, fotoğraf ve çizim içerikleri kabul edilmiş bağlantı üzerinden WebRTC ile cihazlar arasında P2P aktarılır; uygulama bu içerikleri signaling servisine veya diske kaydetmez. GitHub Pages akışında yalnızca PeerJS'in bağlantı kurmak için kullandığı oda/kimlik ve bağlantı metadata'sı public signaling servisinden geçebilir. Bu nedenle oda kodu ve PIN'i sınıf dışıyla paylaşmayın. Öğretmen onayı, PIN doğrulaması ve ilk bağlantı kilidi uygulama içinde korunur.

`vendor/` ve kök dizindeki tarayıcı kütüphaneleri yereldir; ana ekran CDN kütüphanelerine ihtiyaç duymaz. Eğitim oyunlarının harici bağlantıları bu veri aktarım kanalından bağımsızdır ve değiştirilmemiştir.

**Teknik Sınırlar ve Kullanıcı Sorumlulukları:**
- Uygulama oturum verilerini, PDF'leri ve çizimleri kalıcı olarak saklamaz.
- İçerikler yalnızca yetkili P2P bağlantı sırasında cihazlar arasında geçici aktarılır.
- Kullanıcının kendi cihazında yaptığı tarayıcı/kod değişiklikleri uygulamanın yayınlanan sürümünü veya diğer kullanıcıları değiştirmez.
- Ekran görüntüsü, tarayıcı önbelleği ve işletim sistemi kaynaklı kayıtlar uygulamanın kontrolü dışındadır.
- Okul ve ilgili KVKK prosedürlerine uyulmalıdır.
