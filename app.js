window.onerror = function(msg, url, line) { alert('HATA: ' + msg + '\nSatir: ' + line); };
// ?? ALAN ADI KÃ¯Â¿Â½LÃ¯Â¿Â½DÃ¯Â¿Â½ (DOMAIN BINDING) ??
// Sadece bdemir1499.github.io adresinde, EBA sunucularÃ¯Â¿Â½nda ve yerel bilgisayarda Ã¯Â¿Â½alÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½r!
const gecerliAdresler = ["bdemir1499.github.io", "127.0.0.1", "localhost", "eba.gov.tr", "vercel.app", "pages.dev"];
const mevcutAdres = window.location.hostname;

const kacakKullanimMi = !gecerliAdresler.some(adres => mevcutAdres.includes(adres));

if (kacakKullanimMi && mevcutAdres !== "") {
    document.body.innerHTML = "<div style='color:red; text-align:center; margin-top:50px; font-family:sans-serif; font-size:20px; font-weight:bold;'>? GÃ¯Â¿Â½VENLÃ¯Â¿Â½K Ã¯Â¿Â½HLALÃ¯Â¿Â½: Bu yazÃ¯Â¿Â½lÃ¯Â¿Â½m kopyalanmÃ¯Â¿Â½Ã¯Â¿Â½tÃ¯Â¿Â½r. LÃ¯Â¿Â½tfen orijinal adresi kullanÃ¯Â¿Â½n.</div>";
    throw new Error("Korsan kullanÃ¯Â¿Â½m tespit edildi, sistem durduruldu!");
}

// ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: AkÃ¯Â¿Â½llÃ¯Â¿Â½ tahtalarda kayÃ¯Â¿Â½p resim (X_X yÃ¯Â¿Â½z) Ã¯Â¿Â½Ã¯Â¿Â½kmesini TAMAMEN engeller ??
const cursorFix = document.createElement('style');
cursorFix.innerHTML = `
    /* SADECE KANVASTA DEÃ¯Â¿Â½Ã¯Â¿Â½L, BÃ¯Â¿Â½TÃ¯Â¿Â½N EKRANDA ZOMBÃ¯Â¿Â½ Ã¯Â¿Â½MLEÃ¯Â¿Â½LERÃ¯Â¿Â½ KÃ¯Â¿Â½KÃ¯Â¿Â½NDEN YASAKLA! */
    body.cursor-eraser { cursor: none !important; }
    body.cursor-pen { cursor: crosshair !important; }
    body.cursor-snapshot { cursor: crosshair !important; }

    /* Ã¯Â¿Â½izim tahtasÃ¯Â¿Â½ Ã¯Â¿Â½zerinde de kesin yasak (Ã¯Â¿Â½ifte gÃ¯Â¿Â½venlik) */
    body.cursor-eraser #drawing-canvas { cursor: none !important; }
    body.cursor-pen #drawing-canvas { cursor: crosshair !important; }
    body.cursor-snapshot #drawing-canvas { cursor: crosshair !important; }

    /* MenÃ¯Â¿Â½lerin, panellerin ve butonlarÃ¯Â¿Â½n Ã¯Â¿Â½zerinde her zaman normal ok/parmak iÃ¯Â¿Â½areti Ã¯Â¿Â½Ã¯Â¿Â½ksÃ¯Â¿Â½n! */
    .panel, .panel *, button, .tool-button, .tool-button-sub { 
        cursor: pointer !important; 
    }
`;
document.head.appendChild(cursorFix);



// Artk sabit bir MY_SECRET_KEY yok, retmen her ders ifreyi belirleyecek
window.sessionPassword = "";

// --- DL SZL ---
let currentLang = 'tr'; // Varsaylan dil

const translations = {
    tr: { yukle: "📁 Dosya Yükle", silgi: "Silgi", kalem: "Kalem", cizgi: "Çizgi", nokta: "Nokta", d_cizgi: "Düz Çizgi", dogru: "Doğru", dogru_parcasi: "Doğru Parçası", isin: "Işın", cetvel: "Cetvel", gonye: "Gönye", aciolcer: "Açı Ölçer", pergel: "Pergel", cokgenler: "Çokgenler", cember: "Çember", d_ucgen: "Düzgün 3gen", d_dortgen: "Düzgün 4gen", dikdortgen: "Dikdörtgen", d_besgen: "Düzgün 5gen", d_altigen: "Düzgün 6gen", d_yedigen: "Düzgün 7gen", d_sekizgen: "Düzgün 8gen", oyunlar: "Oyunlar", arac_rengi: "Araç Rengi", geri_al: "Geri Al", hepsini_sil: "Hepsini Sil", tasi: "Taşı", canlandir: "Canlandır ✂️", kutu: "Kutu", serbest: "Serbest", yardim: "Video Yardım", ins_t: "Uygulamayı Yükle", ins_d: "Daha iyi performans için uygulamayı yükle.", ins_b: "Yükle", ins_c: "Kapat", vid_cetvel: "Cetvel Kullanımı", vid_gonye: "Gönye Kullanımı", vid_aciolcer: "Açı Ölçer Kullanımı", vid_pergel: "Pergel Kullanımı", vid_canlandir: "Canlandırma (Kopyalama)", vid_cizgi: "Çizgi Menüsü Kullanımı", vid_cokgenler: "Çokgenler", vid_kalem: "Kalem", vid_kitap: "Kitap ve Resim Yükleme", vid_oyunlar: "Oyunlar", pdf_soru: "Bu PDF {0} sayfadır. Kaçıncı sayfadan devam etmek istersiniz?", kvkk: "Bu uygulama hiçbir kişisel veri toplamaz ve dosyalarınızı sunuculara yüklemez." },

    en: { yukle: "Upload Image/PDF", silgi: "Eraser", kalem: "Pen", cizgi: "Line", nokta: "Point", d_cizgi: "Straight Line", dogru: "Line", dogru_parcasi: "Segment", isin: "Ray", cetvel: "Ruler", gonye: "Set Square", aciolcer: "Protractor", pergel: "Compass", cokgenler: "Polygons", cember: "Circle", d_ucgen: "Regular Triangle", d_dortgen: "Square", dikdortgen: "Rectangle", d_besgen: "Pentagon", d_altigen: "Hexagon", d_yedigen: "Heptagon", d_sekizgen: "Octagon", oyunlar: "Games", arac_rengi: "Tool Color", geri_al: "Undo", hepsini_sil: "Clear All", tasi: "Move", canlandir: "Animate ✂️", kutu: "Box", serbest: "Free", yardim: "Video Help", ins_t: "Install App", ins_d: "Install app for better performance.", ins_b: "Install", ins_c: "Close", vid_cetvel: "Ruler Usage", vid_gonye: "Set Square Usage", vid_aciolcer: "Protractor Usage", vid_pergel: "Compass Usage", vid_canlandir: "Animation (Copy)", vid_cizgi: "Line Menu Usage", vid_cokgenler: "Polygons", vid_kalem: "Pen", vid_kitap: "Load Book and Image", vid_oyunlar: "Games", pdf_soru: "This PDF has {0} pages. Which page would you like to continue from?", kvkk: "This application does not collect any personal data and does not upload your files to servers." },

    de: { yukle: "Bild/PDF hochladen", silgi: "Radierer", kalem: "Stift", cizgi: "Linie", nokta: "Punkt", d_cizgi: "Gerade", dogru: "Gerade", dogru_parcasi: "Strecke", isin: "Strahl", cetvel: "Lineal", gonye: "Geodreieck", aciolcer: "Winkelmesser", pergel: "Zirkel", cokgenler: "Polygone", cember: "Kreis", d_ucgen: "Dreieck", d_dortgen: "Quadrat", dikdortgen: "Rechteck", d_besgen: "Fünfeck", d_altigen: "Sechseck", d_yedigen: "Heptagon", d_sekizgen: "Oktagon", oyunlar: "Spiele", arac_rengi: "Farbe", geri_al: "Rückgängig", hepsini_sil: "Löschen", tasi: "Bewegen", canlandir: "Animieren", kutu: "Box", serbest: "Frei", yardim: "Hilfe", ins_t: "App installieren", ins_d: "Installieren für bessere Leistung.", ins_b: "Installieren", ins_c: "Schließen", vid_cetvel: "Lineal verwenden", vid_gonye: "Geodreieck verwenden", vid_aciolcer: "Winkelmesser verwenden", vid_pergel: "Zirkel verwenden", vid_canlandir: "Animation (Kopieren)", vid_cizgi: "Linienmenü verwenden", vid_cokgenler: "Vielecke", vid_kalem: "Stift", vid_kitap: "Buch und Bild laden", vid_oyunlar: "Spiele", pdf_soru: "Dieses PDF hat {0} Seiten. Auf welcher Seite möchten Sie fortfahren?", kvkk: "Diese Anwendung sammelt keine personenbezogenen Daten und lädt Ihre Dateien nicht auf Server hoch." },

    ar: { yukle: "تحميل ملف", silgi: "ممحاة", kalem: "قلم", cizgi: "خط", nokta: "نقطة", d_cizgi: "خط مستقيم", dogru: "مستقيم", dogru_parcasi: "قطعة", isin: "شعاع", cetvel: "مسطرة", gonye: "مثلث", aciolcer: "منقلة", pergel: "فرجار", cokgenler: "مضلعات", cember: "دائرة", d_ucgen: "مثلث منتظم", d_dortgen: "مربع", dikdortgen: "مستطيل", d_besgen: "مخمس", d_altigen: "مسدس", d_yedigen: "مسبع", d_sekizgen: "مثمن", oyunlar: "ألعاب", arac_rengi: "اللون", geri_al: "تراجع", hepsini_sil: "مسح", tasi: "تحريك", canlandir: "تحريك", kutu: "صندوق", serbest: "حر", yardim: "مساعدة", ins_t: "تثبيت التطبيق", ins_d: "ثبت التطبيق لأداء أفضل.", ins_b: "تثبيت", ins_c: "إغلاق", vid_cetvel: "استخدام المسطرة", vid_gonye: "استخدام المثلث", vid_aciolcer: "استخدام المنقلة", vid_pergel: "استخدام الفرجار", vid_canlandir: "رسوم متحركة (نسخ)", vid_cizgi: "استخدام قائمة الخطوط", vid_cokgenler: "مضلعات", vid_kalem: "قلم", vid_kitap: "تحميل كتاب وصورة", vid_oyunlar: "ألعاب", pdf_soru: "يحتوي هذا الملف على {0} صفحة. من أي صفحة تريد المتابعة؟", kvkk: "لا يجمع هذا التطبيق أي بيانات شخصية ولا يرفع ملفاتك إلى الخوادم." },

    hi: { yukle: "फ़ाइल अपलोड", silgi: "इरेज़र", kalem: "पेन", cizgi: "रेखा", nokta: "बिंदु", d_cizgi: "सीधी रेखा", dogru: "रेखा", dogru_parcasi: "खंड", isin: "किरण", cetvel: "पैमाना", gonye: "गुनिया", aciolcer: "चांदा", pergel: "परकार", cokgenler: "बहुभुज", cember: "वृत्त", d_ucgen: "त्रिभुज", d_dortgen: "वर्ग", dikdortgen: "आयत", d_besgen: "पंचभुज", d_altigen: "षट्भुज", d_yedigen: "सप्तभुज", d_sekizgen: "अष्टभुज", oyunlar: "खेल", arac_rengi: "रंग", geri_al: "पूर्ववत", hepsini_sil: "साफ़", tasi: "ले जाएँ", canlandir: "एनिमेट", kutu: "बॉक्स", serbest: "मुक्त", yardim: "सहायता", ins_t: "ऐप इंस्टॉल करें", ins_d: "बेहतर प्रदर्शन के लिए इंस्टॉल करें।", ins_b: "इंस्टॉल", ins_c: "बंद", vid_cetvel: "रूलer का उपयोग", vid_gonye: "सेट स्क्वायर का उपयोग", vid_aciolcer: "चांदा का उपयोग", vid_pergel: "परकार का उपयोग", vid_canlandir: "एनीमेशन (कॉपी)", vid_cizgi: "लाइन मेनू का उपयोग", vid_cokgenler: "बहुभुज", vid_kalem: "पेन", vid_kitap: "पुस्तक और छवि लोड करें", vid_oyunlar: "खेल", pdf_soru: "इस PDF में {0} पृष्ठ हैं। आप किस पृष्ठ से जारी रखना चाहेंगे?", kvkk: "यह एप्लिकेशन कोई व्यक्तिगत डेटा एकत्र नहीं करता है और आपकी फ़ाइलों को सर्वर पर अपलोड नहीं करता है।" },

    ms: { yukle: "Muat Naik Fail", silgi: "Pemadam", kalem: "Pen", cizgi: "Garis", nokta: "Titik", d_cizgi: "Garis Lurus", dogru: "Garis", dogru_parcasi: "Segmen", isin: "Sinar", cetvel: "Pembaris", gonye: "Sesiku", aciolcer: "Jangka Sudut", pergel: "Jangka Lukis", cokgenler: "Poligon", cember: "Bulatan", d_ucgen: "Segi Tiga", d_dortgen: "Segi Empat", dikdortgen: "Segi Empat Tepat", d_besgen: "Pentagon", d_altigen: "Heksagon", d_yedigen: "Heptagon", d_sekizgen: "Oktagon", oyunlar: "Permainan", arac_rengi: "Warna", geri_al: "Batal", hepsini_sil: "Padam", tasi: "Gerak", canlandir: "Animasi", kutu: "Kotak", serbest: "Bebas", yardim: "Bantuan", ins_t: "Pasang Aplikasi", ins_d: "Pasang untuk prestasi lebih baik.", ins_b: "Pasang", ins_c: "Tutup", vid_cetvel: "Penggunaan Pembaris", vid_gonye: "Penggunaan Sesiku", vid_aciolcer: "Penggunaan Jangka Sudut", vid_pergel: "Penggunaan Jangka Lukis", vid_canlandir: "Animasi (Salin)", vid_cizgi: "Penggunaan Menu Garisan", vid_cokgenler: "Poligon", vid_kalem: "Pen", vid_kitap: "Muat Buku dan Imej", vid_oyunlar: "Permainan", pdf_soru: "PDF ini mempunyai {0} halaman. Dari halaman mana anda ingin teruskan?", kvkk: "Aplikasi ini tidak mengumpul sebarang data peribadi and tidak memuat naik fail anda ke pelayan." },

    id: { yukle: "Unggah Berkas", silgi: "Penghapus", kalem: "Pena", cizgi: "Garis", nokta: "Titik", d_cizgi: "Garis Lurus", dogru: "Garis", dogru_parcasi: "Segmen", isin: "Sinar", cetvel: "Penggaris", gonye: "Segitiga", aciolcer: "Busur", pergel: "Jangka", cokgenler: "Poligon", cember: "Lingkaran", d_ucgen: "Segitiga", d_dortgen: "Persegi", dikdortgen: "Persegi Panjang", d_besgen: "Pentagon", d_altigen: "Heksagon", d_yedigen: "Heptagon", d_sekizgen: "Octagon", oyunlar: "Permainan", arac_rengi: "Warna", geri_al: "Urung", hepsini_sil: "Hapus", tasi: "Pindah", canlandir: "Animasi", kutu: "Kotak", serbest: "Bebas", yardim: "Bantuan", ins_t: "Instal Aplikasi", ins_d: "Instal untuk performa daha baik.", ins_b: "Instal", ins_c: "Tutup", vid_cetvel: "Penggunaan Penggaris", vid_gonye: "Penggunaan Penggaris Segitiga", vid_aciolcer: "Penggunaan Busur Derajat", vid_pergel: "Penggunaan Jangka", vid_canlandir: "Animasi (Salin)", vid_cizgi: "Penggunaan Menu Garis", vid_cokgenler: "Poligon", vid_kalem: "Pena", vid_kitap: "Muat Buku dan Gambar", vid_oyunlar: "Permainan", pdf_soru: "PDF ini memiliki {0} halaman. Dari halaman mana Anda ingin melanjutkan?", kvkk: "Aplikasi ini tidak mengumpulkan data pribadi apa pun dan tidak mengunggah file Anda ke server." },

    zh: { yukle: "上传文件", silgi: "橡皮", kalem: "笔", cizgi: "线", nokta: "点", d_cizgi: "直线", dogru: "直线", dogru_parcasi: "线段", isin: "射线", cetvel: "直尺", gonye: "三角板", aciolcer: "量角器", pergel: "圆规", cokgenler: "多边形", cember: "圆", d_ucgen: "三角形", d_dortgen: "正方形", dikdortgen: "长方形", d_besgen: "五边形", d_altigen: "六边形", d_yedigen: "七边形", d_sekizgen: "八边形", oyunlar: "游戏", arac_rengi: "颜色", geri_al: "撤销", hepsini_sil: "清除", tasi: "移动", canlandir: "动画", kutu: "框选", serbest: "自由", yardim: "帮助", ins_t: "安装应用", ins_d: "安装应用以获得更好性能。", ins_b: "安装", ins_c: "关闭", vid_cetvel: "尺子用法", vid_gonye: "三角板用法", vid_aciolcer: "量角器用法", vid_pergel: "圆规用法", vid_canlandir: "动画（复制）", vid_cizgi: "线条菜单用法", vid_cokgenler: "多边形", vid_kalem: "笔", vid_kitap: "加载书籍和图片", vid_oyunlar: "游戏", pdf_soru: "此 PDF 共有 {0} 页。您想从哪一页开始继续？", kvkk: "此应用程序不收集任何个人数据，也不会将您的文件上传到服务器。" },

    ru: { yukle: "Загрузить файл", silgi: "Ластик", kalem: "Ручка", cizgi: "Линия", nokta: "Точка", d_cizgi: "Прямая линия", dogru: "Прямая", dogru_parcasi: "Отрезок", isin: "Луч", cetvel: "Линейка", gonye: "Угольник", aciolcer: "Транспортир", pergel: "Циркуль", cokgenler: "Многоугольники", cember: "Круг", d_ucgen: "Правильный треугольник", d_dortgen: "Квадрат", dikdortgen: "Прямоугольник", d_besgen: "Пятиугольник", d_altigen: "Шестиугольник", d_yedigen: "Семиугольник", d_sekizgen: "Восьмиугольник", oyunlar: "Игры", arac_rengi: "Цвет инструмента", geri_al: "Отменить", hepsini_sil: "Очистить всё", tasi: "Переместить", canlandir: "Анимация ✂️", kutu: "Коробка", serbest: "Свободно", yardim: "Справка", ins_t: "Установить", ins_d: "Установите для лучшей работы.", ins_b: "Установить", ins_c: "Закрыть", vid_cetvel: "Как использовать линейку", vid_gonye: "Как использовать угольник", vid_aciolcer: "Как использовать транспортир", vid_pergel: "Как использовать циркуль", vid_canlandir: "Анимация (Копия)", vid_cizgi: "Меню линий", vid_cokgenler: "Многоугольники", vid_kalem: "Ручка", vid_kitap: "Загрузка книг", vid_oyunlar: "Игры", pdf_soru: "В этом PDF {0} страниц. С какой страницы вы хотите продолжить?", kvkk: "Это приложение не собирает никаких персональных данных и не загружает ваши файлы на серверы." },

    es: { yukle: "Subir Archivo", silgi: "Borrador", kalem: "Lápiz", cizgi: "Línea", nokta: "Punto", d_cizgi: "Línea Recta", dogru: "Recta", dogru_parcasi: "Segmento", isin: "Rayo", cetvel: "Regla", gonye: "Escuadra", aciolcer: "Transportador", pergel: "Compás", cokgenler: "Polígonos", cember: "Círculo", d_ucgen: "Triángulo", d_dortgen: "Cuadrado", dikdortgen: "Rectángulo", d_besgen: "Pentágono", d_altigen: "Hexágono", d_yedigen: "Heptágono", d_sekizgen: "Octágono", oyunlar: "Juegos", arac_rengi: "Color", geri_al: "Deshacer", hepsini_sil: "Borrar Todo", tasi: "Mover", canlandir: "Animar ✂️", kutu: "Caja", serbest: "Libre", yardim: "Ayuda", ins_t: "Instalar App", ins_d: "Instalar para mejor rendimiento.", ins_b: "Instalar", ins_c: "Cerrar", vid_cetvel: "Uso de Regla", vid_gonye: "Uso de Escuadra", vid_aciolcer: "Uso de Transportador", vid_pergel: "Uso de Compás", vid_canlandir: "Animación (Copiar)", vid_cizgi: "Menú de Líneas", vid_cokgenler: "Polígonos", vid_kalem: "Lápiz", vid_kitap: "Cargar Libro", vid_oyunlar: "Juegos", pdf_soru: "Este PDF tiene {0} páginas. ¿Desde qué página te gustaría continuar?", kvkk: "Esta aplicación no recopila ningún dato personal y no sube sus archivos a los servidores." },

    fr: { yukle: "Télécharger", silgi: "Gomme", kalem: "Stylo", cizgi: "Ligne", nokta: "Point", d_cizgi: "Ligne Droite", dogru: "Droite", dogru_parcasi: "Segment", isin: "Demi-droite", cetvel: "Règle", gonye: "Équerre", aciolcer: "Rapporteur", pergel: "Compas", cokgenler: "Polygones", cember: "Cercle", d_ucgen: "Triangle", d_dortgen: "Carré", dikdortgen: "Rectangle", d_besgen: "Pentagone", d_altigen: "Hexagone", d_yedigen: "Heptagone", d_sekizgen: "Octogone", oyunlar: "Jeux", arac_rengi: "Couleur", geri_al: "Annuler", hepsini_sil: "Effacer Tout", tasi: "Déplacer", canlandir: "Animer ✂️", kutu: "Boîte", serbest: "Libre", yardim: "Aide", ins_t: "Installer App", ins_d: "Installez pour de meilleures performances.", ins_b: "Installer", ins_c: "Fermer", vid_cetvel: "Utilisation de la Règle", vid_gonye: "Utilisation de l'Équerre", vid_aciolcer: "Utilisation du Rapporteur", vid_pergel: "Utilisation du Compas", vid_canlandir: "Animation (Copie)", vid_cizgi: "Menu des Lignes", vid_cokgenler: "Polygones", vid_kalem: "Stylo", vid_kitap: "Charger Livre", vid_oyunlar: "Jeux", pdf_soru: "Ce PDF contient {0} pages. À partir de quelle page voulez-vous continuer ?", kvkk: "Cette application ne collecte aucune donnée personnelle et ne télécharge pas vos fichiers sur des serveurs." },

    pt: { yukle: "Carregar Ficheiro", silgi: "Borracha", kalem: "Caneta", cizgi: "Linha", nokta: "Ponto", d_cizgi: "Linha Reta", dogru: "Reta", dogru_parcasi: "Segmento", isin: "Semirreta", cetvel: "Régua", gonye: "Esquadro", aciolcer: "Transferidor", pergel: "Compasso", cokgenler: "Polígonos", cember: "Círculo", d_ucgen: "Triângulo", d_dortgen: "Quadrado", dikdortgen: "Retângulo", d_besgen: "Pentágono", d_altigen: "Hexágono", d_yedigen: "Heptágono", d_sekizgen: "Octógono", oyunlar: "Jogos", arac_rengi: "Cor", geri_al: "Desfazer", hepsini_sil: "Apagar Tudo", tasi: "Mover", canlandir: "Animar ✂️", kutu: "Caixa", serbest: "Livre", yardim: "Ajuda", ins_t: "Instalar App", ins_d: "Instale para melhor desempenho.", ins_b: "Instalar", ins_c: "Fechar", vid_cetvel: "Uso da Régua", vid_gonye: "Uso do Esquadro", vid_aciolcer: "Uso do Transferidor", vid_pergel: "Uso do Compasso", vid_canlandir: "Animação (Cópia)", vid_cizgi: "Menu de Linhas", vid_cokgenler: "Polígonos", vid_kalem: "Caneta", vid_kitap: "Carregar Livro", vid_oyunlar: "Jogos", pdf_soru: "Este PDF tem {0} páginas. A partir de qual página gostaria de continuar?", kvkk: "Este aplicativo não coleta nenhum dado pessoal e não faz upload de seus arquivos para servidores." },

    ja: { yukle: "アップロード", silgi: "消しゴム", kalem: "ペン", cizgi: "線", nokta: "点", d_cizgi: "直線", dogru: "直線", dogru_parcasi: "線分", isin: "半直線", cetvel: "定規", gonye: "三角定規", aciolcer: "分度器", pergel: "コンパス", cokgenler: "多角形", cember: "円", d_ucgen: "正三角形", d_dortgen: "正方形", dikdortgen: "長方形", d_besgen: "五角形", d_altigen: "六角形", d_yedigen: "七角形", d_sekizgen: "八角形", oyunlar: "ゲーム", arac_rengi: "ツールの色", geri_al: "元に戻す", hepsini_sil: "すべて消去", tasi: "移動", canlandir: "アニメ ✂️", kutu: "ボックス", serbest: "自由", yardim: "ヘルプ", ins_t: "アプリをインストール", ins_d: "パフォーマンス向上のためインストール", ins_b: "インストール", ins_c: "閉じる", vid_cetvel: "定規の使い方", vid_gonye: "三角定規の使い方", vid_aciolcer: "分度器の使い方", vid_pergel: "コンパスの使い方", vid_canlandir: "アニメーション (コピー)", vid_cizgi: "線メニューの使い方", vid_cokgenler: "多角形", vid_kalem: "ペン", vid_kitap: "本と画像を読み込む", vid_oyunlar: "ゲーム", pdf_soru: "このPDFは{0}ページあります。どのページから続行しますか？", kvkk: "このアプリケーションは個人データを収集せず、ファイルをサーバーにアップロードしません。" }
};

const translationExtras = {
 tr:{akilli_kalem:"✨ Akıllı Kalem",sihirli_el:"✨ Sihirli El",soru_cek:"📸 Soru Çek"}, en:{akilli_kalem:"✨ Smart Pen",sihirli_el:"✨ Magic Hand",soru_cek:"📸 Take Photo"}, de:{akilli_kalem:"✨ Intelligenter Stift",sihirli_el:"✨ Magische Hand",soru_cek:"📸 Foto aufnehmen"}, fr:{akilli_kalem:"✨ Stylo intelligent",sihirli_el:"✨ Main magique",soru_cek:"📸 Prendre une photo"}, es:{akilli_kalem:"✨ Lápiz inteligente",sihirli_el:"✨ Mano mágica",soru_cek:"📸 Tomar foto"}, pt:{akilli_kalem:"✨ Caneta inteligente",sihirli_el:"✨ Mão mágica",soru_cek:"📸 Tirar foto"}, ru:{akilli_kalem:"✨ Умная ручка",sihirli_el:"✨ Волшебная рука",soru_cek:"📸 Сделать фото"}, ar:{akilli_kalem:"✨ قلم ذكي",sihirli_el:"✨ يد سحرية",soru_cek:"📸 التقاط صورة"}, hi:{akilli_kalem:"✨ स्मार्ट पेन",sihirli_el:"✨ जादुई हाथ",soru_cek:"📸 फ़ोटो लें"}, zh:{akilli_kalem:"✨ 智能笔",sihirli_el:"✨ 魔法手",soru_cek:"📸 拍照"}, ja:{akilli_kalem:"✨ スマートペン",sihirli_el:"✨ 魔法の手",soru_cek:"📸 写真を撮る"}, ms:{akilli_kalem:"✨ Pen Pintar",sihirli_el:"✨ Tangan Ajaib",soru_cek:"📸 Ambil Foto"}, id:{akilli_kalem:"✨ Pena Pintar",sihirli_el:"✨ Tangan Ajaib",soru_cek:"📸 Ambil Foto"}
};
Object.keys(translationExtras).forEach(lang=>Object.assign(translations[lang],translationExtras[lang]));
const translations3D = {
    en: {
        menu: "3D Shapes",
        sphere: "Sphere",
        prisms: "Prisms",
        pyramids: "Pyramids",
        cube: "Cube",
        squarePrism: "Square Prism",
        rectangularPrism: "Rectangular Prism",
        triangularPrism: "Triangular Prism",
        pentagonalPrism: "Pentagonal Prism",
        hexagonalPrism: "Hexagonal Prism",
        cylinder: "Cylinder",
        cone: "Cone",
        triangularPyramid: "Triangular Pyramid",
        squarePyramid: "Square Pyramid",
        pentagonalPyramid: "Pentagonal Pyramid",
        hexagonalPyramid: "Hexagonal Pyramid"
    },
    de: {
        menu: "3D-Körper",
        sphere: "Kugel",
        prisms: "Prismen",
        pyramids: "Pyramiden",
        cube: "Würfel",
        squarePrism: "Quadratisches Prisma",
        rectangularPrism: "Rechteckiges Prisma",
        triangularPrism: "Dreiecksprisma",
        pentagonalPrism: "Fünfeckiges Prisma",
        hexagonalPrism: "Sechseckiges Prisma",
        cylinder: "Zylinder",
        cone: "Kegel",
        triangularPyramid: "Dreieckspyramide",
        squarePyramid: "Quadratische Pyramide",
        pentagonalPyramid: "Fünfeckige Pyramide",
        hexagonalPyramid: "Sechseckige Pyramide"
    },
    fr: {
        menu: "Solides 3D",
        sphere: "Sphère",
        prisms: "Prismes",
        pyramids: "Pyramides",
        cube: "Cube",
        squarePrism: "Prisme à base carrée",
        rectangularPrism: "Pavé droit",
        triangularPrism: "Prisme triangulaire",
        pentagonalPrism: "Prisme pentagonal",
        hexagonalPrism: "Prisme hexagonal",
        cylinder: "Cylindre",
        cone: "Cône",
        triangularPyramid: "Pyramide triangulaire",
        squarePyramid: "Pyramide à base carrée",
        pentagonalPyramid: "Pyramide pentagonale",
        hexagonalPyramid: "Pyramide hexagonale"
    },
    es: {
        menu: "Sólidos 3D",
        sphere: "Esfera",
        prisms: "Prismas",
        pyramids: "Pirámides",
        cube: "Cubo",
        squarePrism: "Prisma cuadrangular",
        rectangularPrism: "Prisma rectangular",
        triangularPrism: "Prisma triangular",
        pentagonalPrism: "Prisma pentagonal",
        hexagonalPrism: "Prisma hexagonal",
        cylinder: "Cilindro",
        cone: "Cono",
        triangularPyramid: "Pirámide triangular",
        squarePyramid: "Pirámide cuadrangular",
        pentagonalPyramid: "Pirámide pentagonal",
        hexagonalPyramid: "Pirámide hexagonal"
    },
    pt: {
        menu: "Sólidos 3D",
        sphere: "Esfera",
        prisms: "Prismas",
        pyramids: "Pirâmides",
        cube: "Cubo",
        squarePrism: "Prisma de base quadrada",
        rectangularPrism: "Prisma retangular",
        triangularPrism: "Prisma triangular",
        pentagonalPrism: "Prisma pentagonal",
        hexagonalPrism: "Prisma hexagonal",
        cylinder: "Cilindro",
        cone: "Cone",
        triangularPyramid: "Pirâmide triangular",
        squarePyramid: "Pirâmide de base quadrada",
        pentagonalPyramid: "Pirâmide pentagonal",
        hexagonalPyramid: "Pirâmide hexagonal"
    },
    ru: {
        menu: "3D-фигуры",
        sphere: "Сфера",
        prisms: "Призмы",
        pyramids: "Пирамиды",
        cube: "Куб",
        squarePrism: "Четырёхугольная призма",
        rectangularPrism: "Прямоугольная призма",
        triangularPrism: "Треугольная призма",
        pentagonalPrism: "Пятиугольная призма",
        hexagonalPrism: "Шестиугольная призма",
        cylinder: "Цилиндр",
        cone: "Конус",
        triangularPyramid: "Треугольная пирамида",
        squarePyramid: "Четырёхугольная пирамида",
        pentagonalPyramid: "Пятиугольная пирамида",
        hexagonalPyramid: "Шестиугольная пирамида"
    },
    ar: {
        menu: "الأشكال ثلاثية الأبعاد",
        sphere: "كرة",
        prisms: "المناشير",
        pyramids: "الأهرامات",
        cube: "مكعب",
        squarePrism: "منشور مربع",
        rectangularPrism: "منشور مستطيل",
        triangularPrism: "منشور مثلثي",
        pentagonalPrism: "منشور خماسي",
        hexagonalPrism: "منشور سداسي",
        cylinder: "أسطوانة",
        cone: "مخروط",
        triangularPyramid: "هرم مثلثي",
        squarePyramid: "هرم مربع",
        pentagonalPyramid: "هرم خماسي",
        hexagonalPyramid: "هرم سداسي"
    },
    hi: {
        menu: "3D ठोस आकृतियाँ",
        sphere: "गोला",
        prisms: "प्रिज़्म",
        pyramids: "पिरामिड",
        cube: "घन",
        squarePrism: "वर्गाकार प्रिज़्म",
        rectangularPrism: "आयताकार प्रिज़्म",
        triangularPrism: "त्रिभुजाकार प्रिज़्म",
        pentagonalPrism: "पंचभुजाकार प्रिज़्म",
        hexagonalPrism: "षट्भुजाकार प्रिज़्म",
        cylinder: "बेलन",
        cone: "शंकु",
        triangularPyramid: "त्रिभुजाकार पिरामिड",
        squarePyramid: "वर्गाकार पिरामिड",
        pentagonalPyramid: "पंचभुजाकार पिरामिड",
        hexagonalPyramid: "षट्भुजाकार पिरामिड"
    },
    zh: {
        menu: "三维图形",
        sphere: "球体",
        prisms: "棱柱",
        pyramids: "棱锥",
        cube: "正方体",
        squarePrism: "正方形棱柱",
        rectangularPrism: "长方体",
        triangularPrism: "三棱柱",
        pentagonalPrism: "五棱柱",
        hexagonalPrism: "六棱柱",
        cylinder: "圆柱体",
        cone: "圆锥体",
        triangularPyramid: "三棱锥",
        squarePyramid: "四棱锥",
        pentagonalPyramid: "五棱锥",
        hexagonalPyramid: "六棱锥"
    },
    ja: {
        menu: "3D図形",
        sphere: "球",
        prisms: "角柱",
        pyramids: "角錐",
        cube: "立方体",
        squarePrism: "四角柱",
        rectangularPrism: "直方体",
        triangularPrism: "三角柱",
        pentagonalPrism: "五角柱",
        hexagonalPrism: "六角柱",
        cylinder: "円柱",
        cone: "円錐",
        triangularPyramid: "三角錐",
        squarePyramid: "四角錐",
        pentagonalPyramid: "五角錐",
        hexagonalPyramid: "六角錐"
    },
    ms: {
        menu: "Bentuk 3D",
        sphere: "Sfera",
        prisms: "Prisma",
        pyramids: "Piramid",
        cube: "Kubus",
        squarePrism: "Prisma segi empat sama",
        rectangularPrism: "Prisma segi empat tepat",
        triangularPrism: "Prisma segi tiga",
        pentagonalPrism: "Prisma pentagon",
        hexagonalPrism: "Prisma heksagon",
        cylinder: "Silinder",
        cone: "Kon",
        triangularPyramid: "Piramid segi tiga",
        squarePyramid: "Piramid segi empat sama",
        pentagonalPyramid: "Piramid pentagon",
        hexagonalPyramid: "Piramid heksagon"
    },
    id: {
        menu: "Bangun 3D",
        sphere: "Bola",
        prisms: "Prisma",
        pyramids: "Limas",
        cube: "Kubus",
        squarePrism: "Prisma persegi",
        rectangularPrism: "Balok",
        triangularPrism: "Prisma segitiga",
        pentagonalPrism: "Prisma segilima",
        hexagonalPrism: "Prisma segienam",
        cylinder: "Tabung",
        cone: "Kerucut",
        triangularPyramid: "Limas segitiga",
        squarePyramid: "Limas persegi",
        pentagonalPyramid: "Limas segilima",
        hexagonalPyramid: "Limas segienam"
    }
};

const default3DLabels = {
    menu: "3D Cisimler",
    sphere: "Küre",
    prisms: "Prizmalar",
    pyramids: "Piramitler",
    cube: "Küp",
    squarePrism: "Kare Prizma",
    rectangularPrism: "Dikdörtgen Prizma",
    triangularPrism: "Üçgen Prizma",
    pentagonalPrism: "Beşgen Prizma",
    hexagonalPrism: "Altıgen Prizma",
    cylinder: "Silindir",
    cone: "Koni",
    triangularPyramid: "Üçgen Piramit",
    squarePyramid: "Kare Piramit",
    pentagonalPyramid: "Beşgen Piramit",
    hexagonalPyramid: "Altıgen Piramit"
};

function update3DLabels() {
    const labels = { ...default3DLabels, ...(translations3D[currentLang] || {}) };
    const setText = (selector, text) => {
        const element = document.querySelector(selector);
        if (element) element.textContent = text;
    };

    setText('#btn-3d-menu', labels.menu);
    setText('[data-3d="3d_kure"]', labels.sphere);
    setText('#btn-prizmalar', `${labels.prisms} ▶`);
    setText('#btn-piramitler', `${labels.pyramids} ▶`);
    setText('[data-3d="3d_kup"]', labels.cube);
    setText('[data-3d="3d_kare_prizma"]', labels.squarePrism);
    setText('[data-3d="3d_dikdortgen_prizma"]', labels.rectangularPrism);
    setText('[data-3d="3d_ucgen_prizma"]', labels.triangularPrism);
    setText('[data-3d="3d_besgen_prizma"]', labels.pentagonalPrism);
    setText('[data-3d="3d_altigen_prizma"]', labels.hexagonalPrism);
    setText('[data-3d="3d_silindir"]', labels.cylinder);
    setText('[data-3d="3d_koni"]', labels.cone);
    setText('[data-3d="3d_ucgen_piramit"]', labels.triangularPyramid);
    setText('[data-3d="3d_kare_piramit"]', labels.squarePyramid);
    setText('[data-3d="3d_besgen_piramit"]', labels.pentagonalPyramid);
    setText('[data-3d="3d_altigen_piramit"]', labels.hexagonalPyramid);
}

window.aktifBaglantilar = {};
let currentLassoX = 0;
let currentLassoY = 0;
let isDrawingLasso = false;
let lassoPoints = [];
let drawnStrokes = [];
window.drawnStrokes = drawnStrokes;
let boxCopies = [];
window.boxCopies = boxCopies;
let isDrawing = false;
let isDrawingRectangle = false;
let isDrawingPolygon = false;
let rectStartPoint = null;
let globalScale = 1;
let lastDist = 0;
let pointers = new Map();
let offsetX = 0; // BUNU EKLE
let offsetY = 0; // BUNU EKLE
const MIN_SCALE = 0.5;
const MAX_SCALE = 5.0;
let initialWidth = 0;
let initialHeight = 0;
let isPenActive = false; // AvuÃ¯Â¿Â½ iÃ¯Â¿Â½i reddi iÃ¯Â¿Â½in
let penActiveTimer = null;

// --- Ã¯Â¿Â½OK DÃ¯Â¿Â½LLÃ¯Â¿Â½ OYUNLAR LÃ¯Â¿Â½STESÃ¯Â¿Â½ (TÃ¯Â¿Â½M DÃ¯Â¿Â½LLER GÃ¯Â¿Â½NCELLENDÃ¯Â¿Â½) ---
window.OyunListesi = [
    {
        tr: "Ã‡EMBERLERDEN ÃœÃ‡GEN Ä°NÅASI",
        en: "TRIANGLE CONSTRUCTION FROM CIRCLES",
        de: "DREIECKSKONSTRUKTION AUS KREISEN",
        ar: "???? ?????? ?? ???????",
        hi: "??????? ?? ??????? ???????",
        ms: "PEMBINAAN SEGI TIGA DARIPADA BULATAN",
        id: "KONSTRUKSI SEGITIGA DARI LINGKARAN",
        zh: "???????",
        ru: "?????????? ???????????? ?? ???????????",
        es: "CONSTRUCCIÃ¯Â¿Â½N DE TRIÃ¯Â¿Â½NGULOS DESDE CÃ¯Â¿Â½RCULOS",
        fr: "CONSTRUCTION DE TRIANGLES Ã¯Â¿Â½ PARTIR DE CERCLES",
        pt: "CONSTRUÃ¯Â¿Â½Ã¯Â¿Â½O DE TRIÃ¯Â¿Â½NGULOS A PARTIR DE CÃ¯Â¿Â½RCULOS",
        ja: "??????????",
        link: "https://bekrmatmt25.my.canva.site/cemberden-ucgen-elde-etme"
    },
    {
        tr: "AÃ‡I Ã–LÃ‡ER YERLEÅTÄ°RME OYUNU",
        en: "PROTRACTOR PLACEMENT GAME",
        de: "WINKELMESSER-PLATZIERUNGSSPIEL",
        ar: "???? ??? ???????",
        hi: "????? ????????? ???",
        ms: "PERMAINAN PENEMPATAN JANGKA SUDUT",
        id: "PERMAINAN PENEMPATAN BUSUR DERAJAT",
        zh: "???????",
        ru: "???? ?? ?????????? ????????????",
        es: "JUEGO DE COLOCACIÃ¯Â¿Â½N DEL TRANSPORTADOR",
        fr: "JEU DE PLACEMENT DU RAPPORTEUR",
        pt: "JOGO DE COLOCAÃ¯Â¿Â½Ã¯Â¿Â½O DO TRANSFERIDOR",
        ja: "??????Ã¯Â¿Â½?",
        link: "https://bekrmatmt2507.my.canva.site/a-l-er-yar-mas"
    },
    {
        tr: "DOÄRUYA DIÅINDAKÄ° NOKTADAN DÄ°KME",
        en: "PERPENDICULAR FROM EXTERNAL POINT",
        de: "LORECHT VON EINEM EXTERNEN PUNKT",
        ar: "????? ???? ?? ???? ???? ????",
        hi: "????? ????? ?? ????? ????",
        ms: "SERENJANG DARI TITIK LUAR",
        id: "TEGAK LURUS DARI TITIK LUAR",
        zh: "???????",
        ru: "????????????? ?? ??????? ?????",
        es: "PERPENDICULAR DESDE UN PUNTO EXTERNO",
        fr: "PERPENDICULAIRE Ã¯Â¿Â½ PARTIR D'UN POINT EXTERNE",
        pt: "PERPENDICULAR A PARTIR DE UM PONTO EXTERNO",
        ja: "?????????",
        link: "https://bekrmatmt25.my.canva.site/dogruya-disindeki-noktadan-dikme-cizmek"
    },
    {
        tr: "AYNI DÃœZLEMDE Ä°KÄ° DOÄRUNUN YOLCULUÄU",
        en: "JOURNEY OF TWO LINES IN THE SAME PLANE",
        de: "REISE ZWEIER LINIEN IN DERSELBEN EBENE",
        ar: "???? ???? ?? ??? ???????",
        hi: "?? ?? ?? ??? ?? ?????? ?? ??????",
        ms: "PERJALANAN DUA GARIS DALAM SATAH YANG SAMA",
        id: "PERJALANAN DUA GARIS DALAM BIDANG YANG SAMA",
        zh: "???????????",
        ru: "??????????? ???? ????? ? ????? ?????????",
        es: "EL VIAJE DE DOS LÃ¯Â¿Â½NEAS EN EL MISMO PLANO",
        fr: "LE VOYAGE DE DEUX LIGNES DANS LE MÃ¯Â¿Â½ME PLAN",
        pt: "A JORNADA DE DUAS LINHAS NO MESMO PLANO",
        ja: "??????2?????",
        link: "https://bdemir1499.github.io/ayni-duzlemde-iki-dogru/"
    },
    {
        tr: "AYNI DÃœZLEMDE 3 DOÄRUNUN DURUMLARI",
        en: "POSITIONS OF 3 LINES IN THE SAME PLANE",
        de: "LAGE VON 3 LINIEN IN DERSELBEN EBENE",
        ar: "????? 3 ???? ?? ??? ???????",
        hi: "?? ?? ?? ??? 3 ?????? ?? ?????????",
        ms: "KEDUDUKAN 3 GARIS DALAM SATAH YANG SAMA",
        id: "POSISI 3 GARIS DALAM BIDANG YANG SAMA",
        zh: "?????3?????",
        ru: "????????? 3 ????? ? ????? ?????????",
        es: "POSICIONES DE 3 LÃ¯Â¿Â½NEAS EN EL MISMO PLANO",
        fr: "POSITIONS DE 3 LIGNES DANS LE MÃ¯Â¿Â½ME PLAN",
        pt: "POSIÃ¯Â¿Â½Ã¯Â¿Â½ES DE 3 LINHAS NO MESMO PLANO",
        ja: "??????3??????",
        link: "https://bekrmatmt2507.my.canva.site/ayniduzlemdeucdogrunundurumlari"
    },
    {
        tr: "AÃ‡I Ã‡EÅÄ°TLERÄ° (TÃœMLER/BÃœTÃœNLER/KOMÅU)",
        en: "ANGLE TYPES (COMPLEMENTARY/SUPPLEMENTARY/ADJACENT)",
        de: "WINKELARTEN (KOMPLEMENTÃ¯Â¿Â½R/SUPPLEMENTÃ¯Â¿Â½R/NEBENWINKEL)",
        ar: "????? ??????? (??????/???????/???????)",
        hi: "????? ?? ?????? (????/??????/?????)",
        ms: "JENIS SUDUT (PELENGKAP/PENGGENAP/BERSEBELAH)",
        id: "JENIS SUDUT (BERPELURUS/BERPENYIKU/BERDAMPINGAN)",
        zh: "????(??/??/??)",
        ru: "???? ????? (??????????????/???????)",
        es: "TIPOS DE Ã¯Â¿Â½NGULOS (COMPLEMENTARIOS/SUPLEMENTARIOS/ADYACENTES)",
        fr: "TYPES D'ANGLES (COMPLÃ¯Â¿Â½MENTAIRES/SUPPLÃ¯Â¿Â½MENTAIRES/ADJACENTS)",
        pt: "TIPOS DE Ã¯Â¿Â½NGULOS (COMPLEMENTARES/SUPLEMENTARES/ADJACENTES)",
        ja: "?????(??/??/???)",
        link: "https://bdemir1499.github.io/tumler-butunler-komsutumler-komsubutunler/"
    },
    {
        tr: "AÇILARINA GÖRE ÜÇGENLER",
        en: "TRIANGLES ACCORDING TO THEIR ANGLES",
        de: "DREIECKE NACH IHREN WINKELN",
        ar: "???????? ??? ???????",
        hi: "????? ?? ???? ?? ???????",
        ms: "SEGI TIGA MENGIKUT SUDUT",
        id: "SEGITIGA BERDASARKAN SUDUTNYA",
        zh: "????????",
        ru: "???????????? ?? ????? ?????",
        es: "TRIÃ¯Â¿Â½NGULOS SEGÃ¯Â¿Â½N SUS Ã¯Â¿Â½NGULOS",
        fr: "TRIANGLES SELON LEURS ANGLES",
        pt: "TRIÃ¯Â¿Â½NGULOS DE ACORDO COM SEUS Ã¯Â¿Â½NGULOS",
        ja: "??????????",
        link: "https://bekrmatmt25.my.canva.site/acilarina-gire-ucgenler"
    },
    {
        tr: "AÃ‡I Ã‡EÅÄ°TLERÄ° (DAR, DÄ°K, GENÄ°Å vb.)",
        en: "ANGLE TYPES (ACUTE, RIGHT, OBTUSE etc.)",
        de: "WINKELARTEN (SPITZ, RECHT, STUMPF usw.)",
        ar: "????? ??????? (????? ?????? ?????? ???)",
        hi: "????? ?? ?????? (?????, ??, ???? ???)",
        ms: "JENIS SUDUT (TIRUS, TEGAK, CAWAK dsb.)",
        id: "JENIS SUDUT (LANCIP, SIKU, TUMPUL dll.)",
        zh: "????(?????????)",
        ru: "???? ????? (??????, ??????, ????? ? ?.?.)",
        es: "TIPOS DE Ã¯Â¿Â½NGULOS (AGUDO, RECTO, OBTUSO, etc.)",
        fr: "TYPES D'ANGLES (AIGU, DROIT, OBTUS, etc.)",
        pt: "TIPOS DE Ã¯Â¿Â½NGULOS (AGUDO, RETO, OBTUSO, etc.)",
        ja: "?????(??????????)",
        link: "https://bekrmatmt2507.my.canva.site/aci-cesitleri"
    },
    {
        tr: "TEMEL GEOMETRÄ°K ÅEKÄ°LLER",
        en: "BASIC GEOMETRIC SHAPES",
        de: "GEOMETRISCHE GRUNDFORMEN",
        ar: "??????? ???????? ????????",
        hi: "???????? ????????? ????????",
        ms: "BENTUK GEOMETRI ASAS",
        id: "BENTUK GEOMETRIS DASAR",
        zh: "??????",
        ru: "???????? ?????????????? ??????",
        es: "FORMAS GEOMÃ¯Â¿Â½TRICAS BÃ¯Â¿Â½SICAS",
        fr: "FORMES GÃ¯Â¿Â½OMÃ¯Â¿Â½TRIQUES DE BASE",
        pt: "FORMAS GEOMÃ¯Â¿Â½TRICAS BÃ¯Â¿Â½SICAS",
        ja: "?????????",
        link: "https://bekrmatmt25.my.canva.site/temel-geometrik-sekiller"
    },
    {
        tr: "ÇOKGENLERİN ELEMANLARI",
        en: "ELEMENTS OF POLYGONS",
        de: "ELEMENTE VON POLYGONEN",
        ar: "????? ????????",
        hi: "?????? ?? ????",
        ms: "ELEMEN POLIGON",
        id: "UNSUR-UNSUR POLIGON",
        zh: "??????",
        ru: "???????? ???????????????",
        es: "ELEMENTOS DE LOS POLÃ¯Â¿Â½GONOS",
        fr: "Ã¯Â¿Â½LÃ¯Â¿Â½MENTS DES POLYGONES",
        pt: "ELEMENTOS DOS POLÃ¯Â¿Â½GONOS",
        ja: "??????",
        link: "https://bekrmatmt2507.my.canva.site/cokgenlerin-elemanlari"
    },
    {
        tr: "Ä°KÄ° PARALEL VE KESENLE OLUÅAN AÃ‡ILAR (1)",
        en: "ANGLES FORMED BY TWO PARALLELS AND A TRANSVERSAL (1)",
        de: "WINKEL AN PARALLELEN UND SCHNEIDENDEN LINIEN (1)",
        ar: "??????? ??????? ?? ???????? ????? (1)",
        hi: "?? ?????? ?????? ?? bir ?????? ???? ?????? ??? ??? (1)",
        ms: "SUDUT YANG DIBENTUK OLEH DUA GARIS SELARI DAN KERENTAS (1)",
        id: "SUDUT YANG DIBENTUK OLEH DUA GARIS SEJAJAR DAN TRANSVERSAL (1)",
        zh: "?????????????? (1)",
        ru: "???? ??? ???????????? ? ??????? (1)",
        es: "Ã¯Â¿Â½NGULOS ENTRE DOS PARALELAS Y UNA TRANSVERSAL (1)",
        fr: "ANGLES FORMÃ¯Â¿Â½S PAR DEUX PARALLÃ¯Â¿Â½LES ET UNE TRANSVERSALE (1)",
        pt: "Ã¯Â¿Â½NGULOS FORMADOS POR DUAS PARALELAS E UMA TRANSVERSAL (1)",
        ja: "2??????1??????????????? (1)",
        link: "https://bekrmatmt25.my.canva.site/k-paralel-dogrunun-b-r-kesenle-yapt-g-ac-lar"
    },
    {
        tr: "ÃœÃ‡ DOÄRUNUN Ä°KÄ°ÅER KESÄ°ÅMESÄ°",
        en: "INTERSECTION OF THREE LINES IN PAIRS",
        de: "PAARWEISE SCHNITTPUNKTE VON DREI LINIEN",
        ar: "????? ???? ???? ???? ????",
        hi: "??? ?????? ?? ??????? ??? ???????????",
        ms: "PERSILANGAN TIGA GARIS SECARA BERPASANGAN",
        id: "PERPOTONGAN TIGA GARIS BERPASANGAN",
        zh: "???????",
        ru: "???????? ??????????? ???? ??????",
        es: "INTERSECCIÃ¯Â¿Â½N DE TRES LÃ¯Â¿Â½NEAS EN PARES",
        fr: "INTERSECTION DE TROIS LIGNES PAR PAIRES",
        pt: "INTERSEÃ¯Â¿Â½Ã¯Â¿Â½O DE TRÃ¯Â¿Â½S LINHAS EM PARES",
        ja: "3???????????",
        link: "https://bekrmatmt2507.my.canva.site/ikiser-kesisen-dogru"
    },
    {
        tr: "DİKDÖRTGENİN ÇEVRE VE ALANI",
        en: "PERIMETER AND AREA OF RECTANGLE",
        de: "UMFANG UND FLÃ¯Â¿Â½CHE DES RECHTECKS",
        ar: "???? ?????? ????????",
        hi: "??? ?? ?????? ?? ?????????",
        ms: "PERIMETER DAN LUAS SEGI EMPAT TEPAT",
        id: "KELILING DAN LUAS PERSEGI PANJANG",
        zh: "?????????",
        ru: "???????? ? ??????? ??????????????",
        es: "PERÃ¯Â¿Â½METRO Y Ã¯Â¿Â½REA DEL RECTÃ¯Â¿Â½NGULO",
        fr: "PÃ¯Â¿Â½RIMÃ¯Â¿Â½TRE ET AIRE DU RECTANGLE",
        pt: "PERÃ¯Â¿Â½METRO E Ã¯Â¿Â½REA DO RETÃ¯Â¿Â½NGULO",
        ja: "?????????",
        link: "https://bdemir1499.github.io/dikdortgen-cevre-ve-alan/"
    },
    {
        tr: "DÖRTGENLERİN ÖZELLİKLERİ (TÜMEVARIM)",
        en: "PROPERTIES OF QUADRILATERALS (INDUCTION)",
        de: "EIGENSCHAFTEN VON VIERECKEN (INDUKTION)",
        ar: "????? ??????? ???????? (?????????)",
        hi: "???????? ?? ??? (????)",
        ms: "SIFAT-SIFAT SISI EMPAT (INDUKSI)",
        id: "SIFAT-SIFAT SEGI EMPAT (INDUKSI)",
        zh: "??????(???)",
        ru: "???????? ????????????????? (????????)",
        es: "PROPIEDADES DE LOS CUADRILÃ¯Â¿Â½TEROS (INDUCCIÃ¯Â¿Â½N)",
        fr: "PROPRIÃ¯Â¿Â½TÃ¯Â¿Â½S DES QUADRILATÃ¯Â¿Â½RES (INDUCTION)",
        pt: "PROPRIEDADES DOS QUADRILÃ¯Â¿Â½TEROS (INDUÃ¯Â¿Â½Ã¯Â¿Â½O)",
        ja: "??????(???)",
        link: "https://bekrmatmt25.my.canva.site/dortgenler-ve-ozellikleri-tumevarim"
    },
    {
        tr: "DÖRTGENLERİN ÖZELLİKLERİ (TÜMDENGELİM)",
        en: "PROPERTIES OF QUADRILATERALS (DEDUCTION)",
        de: "EIGENSCHAFTEN VON VIERECKEN (DEDUKTION)",
        ar: "????? ??????? ???????? (?????????)",
        hi: "???????? ?? ??? (?????)",
        ms: "SIFAT-SIFAT SISI EMPAT (DEDUKSI)",
        id: "SIFAT-SIFAT SEGI EMPAT (DEDUKSI)",
        zh: "??????(???)",
        ru: "???????? ????????????????? (????????)",
        es: "PROPIEDADES DE LOS CUADRILÃ¯Â¿Â½TEROS (DEDUCCIÃ¯Â¿Â½N)",
        fr: "PROPRIÃ¯Â¿Â½TÃ¯Â¿Â½S DES QUADRILATÃ¯Â¿Â½RES (DÃ¯Â¿Â½DUCTION)",
        pt: "PROPRIEDADES DOS QUADRILÃ¯Â¿Â½TEROS (DEDUÃ¯Â¿Â½Ã¯Â¿Â½O)",
        ja: "??????(???)",
        link: "https://bdemir1499.github.io/dortgen-ve-ozellikleri-tumdengelim/"
    },
    {
        tr: "İKİ PARALEL DOĞRUNUN BİR KESENLE YAPTIĞI AÇILAR (2)",
        en: "ANGLES FORMED BY TWO PARALLEL LINES AND A TRANSVERSAL (2)",
        de: "WINKEL AN PARALLELEN UND SCHNEIDENDEN LINIEN (2)",
        ar: "??????? ??????? ?? ???????? ????? (2)",
        hi: "?? ?????? ?????? ?? bir ?????? ???? ?????? ??? ??? (2)",
        ms: "SUDUT YANG DIBENTUK OLEH DUA GARIS SELARI DAN KERENTAS (2)",
        id: "SUDUT YANG DIBENTUK OLEH DUA GARIS SEJAJAR DAN TRANSVERSAL (2)",
        zh: "?????????????? (2)",
        ru: "???? ??? ???????????? ? ??????? (2)",
        es: "Ã¯Â¿Â½NGULOS ENTRE DOS PARALELAS Y UNA TRANSVERSAL (2)",
        fr: "ANGLES FORMÃ¯Â¿Â½S PAR DEUX PARALLÃ¯Â¿Â½LES ET UNE TRANSVERSALE (2)",
        pt: "Ã¯Â¿Â½NGULOS FORMADOS POR DUAS PARALELAS E UMA TRANSVERSAL (2)",
        ja: "2??????1??????????????? (2)",
        link: "https://bekrmatmt25.my.canva.site/iki-paralel-dogrunun-bir-kesenle-yapt-g-ac-lar"
    },
    {
        tr: "DÖNÜŞÜM GEOMETRİSİ (ÖTELEME/YANSIMA)",
        en: "TRANSFORMATION GEOMETRY (TRANSLATION/REFLECTION)",
        de: "TRANSFORMATIONSGEOMETRIE (VERSCHIEBUNG/SPIEGELUNG)",
        ar: "??????? ????????? (???????/????????)",
        hi: "???????? ???????? (??????????/????????)",
        ms: "GEOMETRI TRANSFORMASI (TRANSLASI/PANTULAN)",
        id: "GEOMETRI TRANSFORMASI (TRANSLASI/REFLEKSI)",
        zh: "????(??/??)",
        ru: "????????? ?????????????? (???????/?????????)",
        es: "GEOMETRÃ¯Â¿Â½A DE TRANSFORMACIÃ¯Â¿Â½N (TRASLACIÃ¯Â¿Â½N/REFLEXIÃ¯Â¿Â½N)",
        fr: "GÃ¯Â¿Â½OMÃ¯Â¿Â½TRIE DE TRANSFORMATION (TRANSLATION/RÃ¯Â¿Â½FLEXION)",
        pt: "GEOMETRIA DE TRANSFORMAÃ¯Â¿Â½Ã¯Â¿Â½O (TRANSLAÃ¯Â¿Â½Ã¯Â¿Â½O/REFLEXÃ¯Â¿Â½O)",
        ja: "?????(??/??)",
        link: "https://bekrmatmt25.my.canva.site/oteleme-ve-yansima"
    },
    {
        tr: "DÖRTGEN ÇEŞİTLERİ KAVRAM HARİTASI",
        en: "CONCEPT MAP OF QUADRILATERAL TYPES",
        de: "BEGRIFFSMAP DER VIERECKARTEN",
        ar: "????? ?????? ????? ??????? ????????",
        hi: "???????? ???????? ?? ??????? ????????",
        ms: "PETA KONSEP JENIS SISI EMPAT",
        id: "PETA KONSEP JENIS SEGI EMPAT",
        zh: "????????",
        ru: "?????????????? ????? ????? ?????????????????",
        es: "MAPA CONCEPTUAL DE TIPOS DE CUADRILÃ¯Â¿Â½TEROS",
        fr: "CARTE CONCEPTUELLE DES TYPES DE QUADRILATÃ¯Â¿Â½RES",
        pt: "MAPA CONCEITUAL DE TIPOS DE QUADRILÃ¯Â¿Â½TEROS",
        ja: "???????????",
        link: "https://bekrmatmt25.my.canva.site/dortgenler-kavram-haritasi"
    },
    {
        tr: "DÖRTGENLER GENEL ÇIKARIMLAR",
        en: "GENERAL INFERENCES ABOUT QUADRILATERALS",
        de: "ALLGEMEINE SCHLUSSFOLGERUNGEN Ã¯Â¿Â½BER VIERECKE",
        ar: "??????????? ?????? ??? ??????? ????????",
        hi: "?????????? ?? ???? ??? ??????? ????????",
        ms: "INFERENS UMUM TENTANG SISI EMPAT",
        id: "KESIMPULAN UMUM TENTANG SEGI EMPAT",
        zh: "??????????",
        ru: "????? ?????? ? ?????????????????",
        es: "INFERENCIAS GENERALES SOBRE CUADRILÃ¯Â¿Â½TEROS",
        fr: "INFERENCES GÃ¯Â¿Â½NÃ¯Â¿Â½RALES SUR LES QUADRILATÃ¯Â¿Â½RES",
        pt: "INFERÃ¯Â¿Â½NCIAS GERAIS SOBRE QUADRILÃ¯Â¿Â½TEROS",
        ja: "?????????????",
        link: "https://bekrmatmt25.my.canva.site/dortgenler-genel-cikarimlar"
    },
    {
        tr: "KESİRLERİN FARKLI GÖSTERİMLERİ",
        en: "DIFFERENT REPRESENTATIONS OF FRACTIONS",
        de: "VERSCHIEDENE DARSTELLUNGEN VON BRÃ¯Â¿Â½CHEN",
        ar: "??????? ?????? ??????",
        hi: "??????? ?? ??????? ??????",
        ms: "PERWAKILAN PECAHAN YANG BERBEZA",
        id: "BERBAGAI REPRESENTASI PECAHAN",
        zh: "?????????",
        ru: "????????? ????????????? ??????",
        es: "DIFERENTES REPRESENTACIONES DE FRACCIONES",
        fr: "DIFFÃ¯Â¿Â½RENTES REPRÃ¯Â¿Â½SENTATIONS DES FRACTIONS",
        pt: "DIFERENTES REPRESENTAÃ¯Â¿Â½Ã¯Â¿Â½ES DE FRAÃ¯Â¿Â½Ã¯Â¿Â½ES",
        ja: "??????????",
        link: "https://bekrmatmt25.my.canva.site/kesirlerin-farkl-g-sterimleri"
    },
    {
        tr: "KÖŞEGENLERDEN DÖRTGENLERE (1)",
        en: "FROM DIAGONALS TO QUADRILATERALS (1)",
        de: "VON DIAGONALEN ZU VIERECKEN (1)",
        ar: "?? ??????? ??? ??????? ???????? (1)",
        hi: "???????? ?? ???????? ?? (1)",
        ms: "DARIPADA PEPENJURU KEPADA SISI EMPAT (1)",
        id: "DARI DIAGONAL KE SEGI EMPAT (1)",
        zh: "???????? (1)",
        ru: "?? ?????????? ? ????????????????? (1)",
        es: "DE LAS DIAGONALES A LOS CUADRILÃ¯Â¿Â½TEROS (1)",
        fr: "DES DIAGONALES AUX QUADRILATÃ¯Â¿Â½RES (1)",
        pt: "DAS DIAGONAIS AOS QUADRILÃ¯Â¿Â½TEROS (1)",
        ja: "????????? (1)",
        link: "https://bekrmatmt25.my.canva.site/k-egenlerden-d-rtgenlere"
    },
    {
        tr: "CEBİRSEL İFADELER TEMEL KAVRAMLAR",
        en: "ALGEBRAIC EXPRESSIONS BASIC CONCEPTS",
        de: "ALGEBRAISCHE AUSDRÃ¯Â¿Â½CKE - GRUNDBEGRIFFE",
        ar: "???????? ???????? ????????? ???????",
        hi: "????????? ?????? ???????? ?????????",
        ms: "UNGKAPAN ALGEBRA KONSEP ASAS",
        id: "KONSEP DASAR EKSPRESI ALJABAR",
        zh: "???????",
        ru: "?????????????? ?????????: ???????? ???????",
        es: "EXPRESIONES ALGEBRAICAS CONCEPTOS BÃ¯Â¿Â½SICOS",
        fr: "EXPRESSIONS ALGÃ¯Â¿Â½BRIQUES CONCEPTS DE BASE",
        pt: "EXPRESSÃ¯Â¿Â½ES ALGÃ¯Â¿Â½BRICAS CONCEITOS BÃ¯Â¿Â½SICOS",
        ja: "????????",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadeler-temel-kavramlar"
    },
    {
        tr: "CEBİRSEL İFADELER SÖZELDEN CEBİRE",
        en: "ALGEBRAIC EXPRESSIONS FROM VERBAL TO ALGEBRAIC",
        de: "VON DER SPRACHE ZUR ALGEBRA",
        ar: "????????? ??????? ?? ??????? ??? ???????",
        hi: "????????? ??????: ????? ?? ?????????",
        ms: "UNGKAPAN ALGEBRA DARIPADA LISAN KEPADA ALGEBRA",
        id: "EKSPRESI ALJABAR DARI VERBAL KE ALJABAR",
        zh: "???:??????",
        ru: "?????????????? ?????????: ?? ???? ? ???????",
        es: "EXPRESIONES ALGEBRAICAS DE VERBAL A ALGEBRAICO",
        fr: "EXPRESSIONS ALGÃ¯Â¿Â½BRIQUES DU VERBAL Ã¯Â¿Â½ L'ALGÃ¯Â¿Â½BRIQUE",
        pt: "EXPRESSÃ¯Â¿Â½ES ALGÃ¯Â¿Â½BRICAS DO VERBAL PARA O ALGÃ¯Â¿Â½BRICO",
        ja: "???:???????",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadelerle-oyun-tasar-m-kopyas"
    },
    {
        tr: "CEBİRSEL İFADELER CEBİRDEN SÖZELE",
        en: "ALGEBRAIC EXPRESSIONS FROM ALGEBRAIC TO VERBAL",
        de: "VON DER ALGEBRA ZUR SPRACHE",
        ar: "????????? ??????? ?? ??????? ??? ???????",
        hi: "????????? ??????: ????????? ?? ?????",
        ms: "UNGKAPAN ALGEBRA DARIPADA ALGEBRA KEPADA LISAN",
        id: "EKSPRESI ALJABAR DARI ALJABAR KE VERBAL",
        zh: "???:??????",
        ru: "?????????????? ?????????: ?? ??????? ? ??????",
        es: "EXPRESIONES ALGEBRAICAS DE ALGEBRAICO A VERBAL",
        fr: "EXPRESSIONS ALGÃ¯Â¿Â½BRIQUES DE L'ALGÃ¯Â¿Â½BRIQUE AU VERBAL",
        pt: "EXPRESSÃ¯Â¿Â½ES ALGÃ¯Â¿Â½BRICAS DO ALGÃ¯Â¿Â½BRICO PARA O VERBAL",
        ja: "???:???????",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadeler-2-cebirden-s-zele"
    },
    {
        tr: "CEBİRSEL İFADELER DEĞER HESAPLAMA",
        en: "CALCULATING VALUES OF ALGEBRAIC EXPRESSIONS",
        de: "BERECHNEN VON WERTE ALGEBRAISCHER AUSDRÃ¯Â¿Â½CKE",
        ar: "???? ??? ????????? ???????",
        hi: "????????? ???????? ?? ????? ?? ????",
        ms: "MENGIRA NILAI UNGKAPAN ALGEBRA",
        id: "MENGHITUNG NILAI EKSPRESI ALJABAR",
        zh: "???????",
        ru: "?????????? ???????? ?????????????? ?????????",
        es: "CALCULAR VALORES DE EXPRESIONES ALGEBRAICAS",
        fr: "CALCUL DES VALEURS D'EXPRESSIONS ALGÃ¯Â¿Â½BRIQUES",
        pt: "CALCULAR VALORES DE EXPRESSÃ¯Â¿Â½ES ALGÃ¯Â¿Â½BRICAS",
        ja: "????????",
        link: "https://bekrmatmt25.my.canva.site/cebirsel-ifadelerin-degerini-hesaplamak"
    },
    {
        tr: "ARAŞTIRMA ADIMLARI (Canva)",
        en: "RESEARCH STEPS (Canva)",
        de: "FORSCHUNGSSCHRITTE (Canva)",
        ar: "????? ????? (?????)",
        hi: "???????? ??? (Canva)",
        ms: "LANGKAH PENYELIDIKAN (Canva)",
        id: "LANGKAH PENELITIAN (Canva)",
        zh: "???? (Canva)",
        ru: "????? ???????????? (Canva)",
        es: "PASOS DE INVESTIGACIÃ¯Â¿Â½N (Canva)",
        fr: "Ã¯Â¿Â½TAPES DE RECHERCHE (Canva)",
        pt: "PASSOS DE PESQUISA (Canva)",
        ja: "??????? (Canva)",
        link: "https://bekrmatmt25.my.canva.site/5-sinif-arastirma-adimlari"
    },
    {
        tr: "ARAŞTIRMA ADIMLARI (GitHub)",
        en: "RESEARCH STEPS (GitHub)",
        de: "FORSCHUNGSSCHRITTE (GitHub)",
        ar: "????? ????? (??? ???)",
        hi: "???????? ??? (GitHub)",
        ms: "LANGKAH PENYELIDIKAN (GitHub)",
        id: "LANGKAH PENELITIAN (GitHub)",
        zh: "???? (GitHub)",
        ru: "????? ???????????? (GitHub)",
        es: "PASOS DE INVESTIGACIÃ¯Â¿Â½N (GitHub)",
        fr: "Ã¯Â¿Â½TAPES DE RECHERCHE (GitHub)",
        pt: "PASSOS DE PESQUISA (GitHub)",
        ja: "??????? (GitHub)",
        link: "https://bdemir1499.github.io/5.sinif-arastirma-asamalari/"
    },
    {
        tr: "ÜÇGENDE YARDIMCI ELEMANLAR",
        en: "AUXILIARY ELEMENTS IN TRIANGLES",
        de: "HILFSELEMENTE IN DREIECKEN",
        ar: "??????? ???????? ?? ??????",
        hi: "????????? ??? ????? ????",
        ms: "ELEMEN PEMBANTU DALAM SEGI TIGA",
        id: "UNSUR PEMBANTU DALAM SEGITIGA",
        zh: "?????????",
        ru: "??????????????? ???????? ? ?????????????",
        es: "ELEMENTOS AUXILIARES EN TRIÃ¯Â¿Â½NGULOS",
        fr: "Ã¯Â¿Â½LÃ¯Â¿Â½MENTS AUXILIAIRES DANS LES TRIANGLES",
        pt: "ELEMENTOS AUXILIARES EM TRIÃ¯Â¿Â½NGULOS",
        ja: "????????",
        link: "https://bekrmatmt25.my.canva.site/ucgende-yardim-i-elemanlar"
    },
    {
        tr: "ÜÇGEN ÇİZİMİ",
        en: "TRIANGLE DRAWING",
        de: "DREIECKE ZEICHNEN",
        ar: "??? ??????",
        hi: "??????? ?????",
        ms: "LUKISAN SEGI TIGA",
        id: "MENGGAMBAR SEGITIGA",
        zh: "?????",
        ru: "?????????? ????????????",
        es: "DIBUJO DE TRIÃ¯Â¿Â½NGULOS",
        fr: "DESSIN DE TRIANGLE",
        pt: "DESENHO DE TRIÃ¯Â¿Â½NGULOS",
        ja: "??????",
        link: "https://bekrmatmt25.my.canva.site/ucgen-cizim-sartlari"
    },
    {
        tr: "ÜÇGENDE EŞLİK VE BENZERLİK",
        en: "CONGRUENCE AND SIMILARITY IN TRIANGLES",
        de: "KONGRUENZ UND Ã¯Â¿Â½HNLICHKEIT IN DREIECKEN",
        ar: "????? ?????? ????????",
        hi: "????????? ??? ??????????? ?? ???????",
        ms: "KONGRUEN DAN KESERUPAAN DALAM SEGI TIGA",
        id: "KEKONGRUENAN DAN KESEBANGUNAN DALAM SEGITIGA",
        zh: "?????????",
        ru: "?????????????? ? ??????? ?????????????",
        es: "CONGRUENCIA Y SEMEJANZA EN TRIÃ¯Â¿Â½NGULOS",
        fr: "CONGRUENCE ET SIMILITUDE DANS LES TRIANGLES",
        pt: "CONGRUÃ¯Â¿Â½NCIA E SEMELHANÃ¯Â¿Â½A EM TRIÃ¯Â¿Â½NGULOS",
        ja: "?????????",
        link: "https://bdemir1499.github.io/eslikvebenzerlik/"
    },
    {
        tr: "PRİZMALARIN ELEMANLARI",
        en: "ELEMENTS OF PRISMS",
        de: "ELEMENTE VON PRISMEN",
        ar: "????? ?????????",
        hi: "??????? ?? ????",
        ms: "ELEMEN PRISMA",
        id: "UNSUR-UNSUR PRISMA",
        zh: "?????",
        ru: "???????? ?????",
        es: "ELEMENTOS DE LOS PRISMAS",
        fr: "Ã¯Â¿Â½LÃ¯Â¿Â½MENTS DES PRISMES",
        pt: "ELEMENTOS DOS PRISMAS",
        ja: "?????",
        link: "https://bekrmatmt25.my.canva.site/prizmalarin-elemanlar-ve-a-inimlari"
    },
    {
        tr: "PİRAMİT VE AÇINIMI",
        en: "PYRAMID AND ITS NET",
        de: "PYRAMIDE UND IHR NETZ",
        ar: "????? ??????",
        hi: "??????? ?? ???? ???",
        ms: "PIRAMID DAN BENTANGANNYA",
        id: "LIMAS DAN JARING-JARINGNYA",
        zh: "???????",
        ru: "???????? ? ?? ?????????",
        es: "PIRÃ¯Â¿Â½MIDE Y SU DESARROLLO",
        fr: "PYRAMIDE ET SON PATRON",
        pt: "PIRÃ¯Â¿Â½MIDE E SUA PLANIFICAÃ¯Â¿Â½Ã¯Â¿Â½O",
        ja: "????????",
        link: "https://bekrmatmt25.my.canva.site/piramidin-elemanlar-ve-acinimi"
    },
    {
        tr: "PRİZMA, PİRAMİT, KONİ, SİLİNDİR",
        en: "PRISM, PYRAMID, CONE, CYLINDER",
        de: "PRISMA, PYRAMIDE, KEGEL, ZYLINDER",
        ar: "???????? ?????? ???????? ?????????",
        hi: "???????, ???????, ????, ????",
        ms: "PRISMA, PIRAMID, KON, SILINDIR",
        id: "PRISMA, LIMAS, KERUCUT, TABUNG",
        zh: "???????????",
        ru: "??????, ????????, ?????, ???????",
        es: "PRISMA, PIRÃ¯Â¿Â½MIDE, CONO, CILINDRO",
        fr: "PRISME, PYRAMIDE, CÃ¯Â¿Â½NE, CYLINDRE",
        pt: "PRISMA, PIRÃ¯Â¿Â½MIDE, CONE, CILINDRO",
        ja: "???????????",
        link: "https://sites.google.com/view/uc-boyutlu-sekiller/ana-sayfa_1"
    },
    {
        tr: "KÖŞEGENLERDEN DÖRTGENLERE (2)",
        en: "FROM DIAGONALS TO QUADRILATERALS (2)",
        de: "VON DIAGONALEN ZU VIERECKEN (2)",
        ar: "?? ??????? ??? ??????? ???????? (2)",
        hi: "???????? ?? ???????? ?? (2)",
        ms: "DARIPADA PEPENJURU KEPADA SISI EMPAT (2)",
        id: "DARI DIAGONAL KE SEGI EMPAT (2)",
        zh: "???????? (2)",
        ru: "?? ?????????? ? ????????????????? (2)",
        es: "DE LAS DIAGONALES A LOS CUADRILÃ¯Â¿Â½TEROS (2)",
        fr: "DES DIAGONALES AUX QUADRILATÃ¯Â¿Â½RES (2)",
        pt: "DAS DIAGONAIS AOS QUADRILÃ¯Â¿Â½TEROS (2)",
        ja: "????????? (2)",
        link: "https://bekrmatmt25.my.canva.site/kosegenlerden-dortgenlere"
    }
];

// --- BURAYA YAPIÃ¯Â¿Â½TIR ---
window.sendNetworkData = function (dataObj) {
    if (dataObj && dataObj.type === 'aktif_onizleme') {
        if (!window.lastPreviewTime) window.lastPreviewTime = 0;
        if (Date.now() - window.lastPreviewTime < 40) return; // Limit to ~25 FPS to prevent WebRTC buffer overflow
        window.lastPreviewTime = Date.now();
    }

    // 1. Durum: EÃ¯Â¿Â½er bu cihaz TABLET ise (tahtaya baÃ¯Â¿Â½lÃ¯Â¿Â½yÃ¯Â¿Â½z)
    if (typeof myConnection !== 'undefined' && myConnection && (myConnection.open || window.isConnected)) {
        myConnection.send(dataObj);
    }
    // 2. Durum: EÃ¯Â¿Â½er bu cihaz AKILLI TAHTA ise (baÃ¯Â¿Â½lÃ¯Â¿Â½ olan tabletlere gÃ¯Â¿Â½nder)
    else if (typeof window.aktifBaglantilar !== 'undefined') {
        for (let id in window.aktifBaglantilar) {
            if (window.aktifBaglantilar[id] && window.aktifBaglantilar[id].open) {
                window.aktifBaglantilar[id].send(dataObj);
            }
        }
    }
};


// Sayfa aÃ¯Â¿Â½Ã¯Â¿Â½ldÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½nda kÃ¯Â¿Â½rmÃ¯Â¿Â½zÃ¯Â¿Â½ butonun yanlÃ¯Â¿Â½Ã¯Â¿Â½lÃ¯Â¿Â½kla gÃ¯Â¿Â½rÃ¯Â¿Â½nmesini engellemek iÃ¯Â¿Â½in:
const closePdfBtn = document.getElementById('btn-close-pdf');
if (closePdfBtn) {
    closePdfBtn.classList.add('hidden');
    closePdfBtn.style.display = 'none'; // Kesin olarak gizle
}




function getGlobalCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

function getPointerPos(e) {
    const rect = canvas.getBoundingClientRect();
    let cX = e.clientX;
    let cY = e.clientY;

    // --- SÃ¯Â¿Â½ZÃ¯Â¿Â½N ORÃ¯Â¿Â½JÃ¯Â¿Â½NAL HATA KORUMA MANTIÃ¯Â¿Â½INIZ (AvuÃ¯Â¿Â½ iÃ¯Â¿Â½i karÃ¯Â¿Â½Ã¯Â¿Â½masÃ¯Â¿Â½nÃ¯Â¿Â½ engeller) ---
    // EÃ¯Â¿Â½er cX tanÃ¯Â¿Â½msÃ¯Â¿Â½zsa (saf dokunmatikse) o anki geÃ¯Â¿Â½erli dokunuÃ¯Â¿Â½u (targetTouches) alÃ¯Â¿Â½r.
    if (cX === undefined || cX === null || isNaN(cX)) {
        if (e.targetTouches && e.targetTouches.length > 0) {
            cX = e.targetTouches[0].clientX;
            cY = e.targetTouches[0].clientY;
        } else if (e.touches && e.touches.length > 0) {
            cX = e.touches[0].clientX;
            cY = e.touches[0].clientY;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
            cX = e.changedTouches[0].clientX;
            cY = e.changedTouches[0].clientY;
        } else {
            cX = 0;
            cY = 0;
        }
    }

    return {
        x: ((cX || 0) - rect.left) * (canvas.width / rect.width),
        y: ((cY || 0) - rect.top) * (canvas.height / rect.height)
    };
}

// --- GRAFÃ¯Â¿Â½K TABLET SÃ¯Â¿Â½MÃ¯Â¿Â½LATÃ¯Â¿Â½RÃ¯Â¿Â½ ---
function getPointerInfo(e) {
    // BURAYI false YAPTIK!
    const testModuAcik = false;

    // EÃ¯Â¿Â½er test modu aÃ¯Â¿Â½Ã¯Â¿Â½ksa ve fare kullanÃ¯Â¿Â½lÃ¯Â¿Â½yorsa, onu "Kalem" gibi kandÃ¯Â¿Â½r
    if (testModuAcik && e.pointerType === 'mouse') {
        return {
            type: 'pen',
            pressure: Math.random() * 0.8 + 0.2
        };
    }

    return {
        type: e.pointerType,
        pressure: e.pressure || 1
    };
}


// --- KANVAS AYARLARI ---

const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');

function setupCanvasResolution() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1; // ?? CihazÃ¯Â¿Â½n HD piksel oranÃ¯Â¿Â½nÃ¯Â¿Â½ (Retina GÃ¯Â¿Â½cÃ¯Â¿Â½nÃ¯Â¿Â½) al

    // KanvasÃ¯Â¿Â½n iÃ¯Â¿Â½ piksel sayÃ¯Â¿Â½sÃ¯Â¿Â½nÃ¯Â¿Â½, ekranÃ¯Â¿Â½n gerÃ¯Â¿Â½ek HD Ã¯Â¿Â½Ã¯Â¿Â½zÃ¯Â¿Â½nÃ¯Â¿Â½rlÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½ ile eÃ¯Â¿Â½itle
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: Arka planÃ¯Â¿Â½ (bg-canvas) da boyut ve oran olarak %100 eÃ¯Â¿Â½itle (DaralmayÃ¯Â¿Â½ Ã¯Â¿Â½nler)
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas) {
        bgCanvas.style.width = canvas.style.width || (rect.width + 'px');
        bgCanvas.style.height = canvas.style.height || (rect.height + 'px');
        bgCanvas.width = canvas.width;
        bgCanvas.height = canvas.height;
    }

    if (typeof redrawAllStrokes === 'function') {
        redrawAllStrokes();
    }
}

// 1. Uygulama ilk aÃ¯Â¿Â½Ã¯Â¿Â½ldÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½nda Ã¯Â¿Â½alÃ¯Â¿Â½Ã¯Â¿Â½tÃ¯Â¿Â½r
setupCanvasResolution();

// 2. Ekran boyutu her deÃ¯Â¿Â½iÃ¯Â¿Â½tiÃ¯Â¿Â½inde (yÃ¯Â¿Â½kle butonu sonrasÃ¯Â¿Â½ veya yan Ã¯Â¿Â½evirince) Ã¯Â¿Â½alÃ¯Â¿Â½Ã¯Â¿Â½tÃ¯Â¿Â½r
window.addEventListener('resize', setupCanvasResolution);

// PARDUS KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: TarayÃ¯Â¿Â½cÃ¯Â¿Â½nÃ¯Â¿Â½n kaydÃ¯Â¿Â½rma ve yakÃ¯Â¿Â½nlaÃ¯Â¿Â½tÃ¯Â¿Â½rma yapmasÃ¯Â¿Â½nÃ¯Â¿Â½ yasakla
canvas.style.touchAction = 'none';
canvas.style.userSelect = 'none';
document.body.style.overscrollBehavior = 'none';


// --- RESÃ¯Â¿Â½M YÃ¯Â¿Â½KLEME DEÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½KENLERÃ¯Â¿Â½ ---
let backgroundImage = null; // YÃ¯Â¿Â½klenen resmi tutacak deÃ¯Â¿Â½iÃ¯Â¿Â½ken
const uploadButton = document.getElementById('btn-upload');
const fileInput = document.getElementById('file-input');

// --- app.js (DÃ¯Â¿Â½ZELTÃ¯Â¿Â½LMÃ¯Â¿Â½Ã¯Â¿Â½ BAÃ¯Â¿Â½LANGIÃ¯Â¿Â½ BÃ¯Â¿Â½LÃ¯Â¿Â½MÃ¯Â¿Â½) ---

// --- SESLER (TÃ¯Â¿Â½MÃ¯Â¿Â½ Ã¯Â¿Â½PTAL EDÃ¯Â¿Â½LDÃ¯Â¿Â½ / SESSÃ¯Â¿Â½Z MOD) ---
// GerÃ¯Â¿Â½ek ses dosyalarÃ¯Â¿Â½ yerine, hiÃ¯Â¿Â½bir iÃ¯Â¿Â½ yapmayan "sahte" bir oynatÃ¯Â¿Â½cÃ¯Â¿Â½ tanÃ¯Â¿Â½mlÃ¯Â¿Â½yoruz.
// Bu sayede alt satÃ¯Â¿Â½rlardaki hiÃ¯Â¿Â½bir kodu silmenize gerek kalmaz, hepsi sessizce Ã¯Â¿Â½alÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½r.

const silentAudio = {
    play: function () { },   // Ã¯Â¿Â½al komutu gelirse: HiÃ¯Â¿Â½bir Ã¯Â¿Â½ey yapma.
    pause: function () { },  // Durdur komutu gelirse: HiÃ¯Â¿Â½bir Ã¯Â¿Â½ey yapma.
    currentTime: 0,        // SÃ¯Â¿Â½re ayarÃ¯Â¿Â½ gelirse: Kabul et ama iÃ¯Â¿Â½leme.
    src: ""
};

window.audio_click = silentAudio;
let audio_click_src_set = true; // Hata vermemesi iÃ¯Â¿Â½in "ayarlandÃ¯Â¿Â½" sayÃ¯Â¿Â½yoruz.
window.audio_undo = silentAudio;
window.audio_draw = silentAudio;
window.audio_eraser = silentAudio;


// --- DEÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½KENLER ---

let snapshotStart = null;
const animateButton = document.getElementById('btn-animate');
let currentTool = 'none';
let isPinching = false;           // Ã¯Â¿Â½ki parmakla yakÃ¯Â¿Â½nlaÃ¯Â¿Â½tÃ¯Â¿Â½rma aktif mi?
let initialDistance = 0;          // BaÃ¯Â¿Â½langÃ¯Â¿Â½Ã¯Â¿Â½ parmak mesafesi (zoom iÃ¯Â¿Â½in)
let initialScale = 0;             // BaÃ¯Â¿Â½langÃ¯Â¿Â½Ã¯Â¿Â½ta seÃ¯Â¿Â½ili nesnenin geniÃ¯Â¿Â½liÃ¯Â¿Â½i
let initialCenter = { x: 0, y: 0 }; // Ã¯Â¿Â½ki parmaÃ¯Â¿Â½Ã¯Â¿Â½n merkez noktasÃ¯Â¿Â½ (pan iÃ¯Â¿Â½in)
let currentPenColor = '#FFFFFF';
let currentPenWidth = 4;
window.currentLineColor = '#FFFFFF'; // VarsayÃ¯Â¿Â½lan Renk: BEYAZ
const SNAP_THRESHOLD = 10;
let returnToSnapshot = false; // Ã¯Â¿Â½Ã¯Â¿Â½lem bitince geri dÃ¯Â¿Â½nÃ¯Â¿Â½lecek mi? 
// ==========================================
// --- 3D CÃ¯Â¿Â½SÃ¯Â¿Â½MLER Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½N YENÃ¯Â¿Â½ DEÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½KENLER VE SÃ¯Â¿Â½RGÃ¯Â¿Â½ OLUÃ¯Â¿Â½TURUCU (ADIM 1) ---
// ==========================================
let isDrawing3D = false;
let current3DShape = null; // Hangi 3D Ã¯Â¿Â½ekil seÃ¯Â¿Â½ili (Ã¯Â¿Â½rn: '3d_kare_piramit')
let temp3DData = null;     // Ã¯Â¿Â½izim esnasÃ¯Â¿Â½ndaki canlÃ¯Â¿Â½ Ã¯Â¿Â½nizleme verisi
let active3DSliderStroke = null; // SÃ¯Â¿Â½rgÃ¯Â¿Â½sÃ¯Â¿Â½ oynatÃ¯Â¿Â½lan seÃ¯Â¿Â½ili 3D cisim

// SÃ¯Â¿Â½rgÃ¯Â¿Â½ (Slider) Kutusunu HTML'e Otomatik Ekle
const sliderContainer = document.createElement('div');
sliderContainer.id = 'slider-container';
sliderContainer.innerHTML = `
    <label>AÃ¯Â¿Â½Ã¯Â¿Â½nÃ¯Â¿Â½m (Katlama)</label>
    <input type="range" id="shape-slider" min="0" max="100" value="0">
`;
const leftPanel = document.querySelector('.left-panel');
const btnOyunlarOptions = document.getElementById('oyunlar-options');
if (leftPanel && btnOyunlarOptions) {
    leftPanel.insertBefore(sliderContainer, btnOyunlarOptions.nextSibling);
} else {
    document.body.appendChild(sliderContainer);
}
const shapeSlider = document.getElementById('shape-slider');

// Alan / Hacim GÃ¯Â¿Â½sterge Kutusunu HTML'e Otomatik Ekle
const infoTooltip = document.createElement('div');
infoTooltip.id = 'info-tooltip';
document.body.appendChild(infoTooltip);

// SÃ¯Â¿Â½rgÃ¯Â¿Â½ hareket ettiÃ¯Â¿Â½inde seÃ¯Â¿Â½ili 3D cismin aÃ¯Â¿Â½Ã¯Â¿Â½nÃ¯Â¿Â½mÃ¯Â¿Â½nÃ¯Â¿Â½ gÃ¯Â¿Â½ncelle
shapeSlider.addEventListener('input', (e) => {
    // ?? BURASI 'window' OLARAK GÃ¯Â¿Â½NCELLENDÃ¯Â¿Â½ (ArtÃ¯Â¿Â½k Ã¯Â¿Â½ekli tanÃ¯Â¿Â½yacak!) ??
    if (window.active3DSliderStroke) {
        window.active3DSliderStroke.openRatio = parseInt(e.target.value) / 100;

        if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ type: 'sekil_guncelle', stroke: window.active3DSliderStroke });
        }
        if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
    }
});


let nextPointChar = 'A';
window.nextPointChar = nextPointChar;

let lineStartPoint = null;
let currentMousePos = { x: 0, y: 0 };
let snapTarget = null;
let snapHoverTimer = null;

window.tempPolygonData = null;

let isDrawingLine = false;
let isDrawingInfinityLine = false;
let isDrawingSegment = false;
let isDrawingRay = false;
let isMoving = false;
let selectedItem = null;
let selectedPointKey = null;
let rotationPivot = null;
let dragStartPos = { x: 0, y: 0 };
let originalStartPos = {};
let currentPDF = null;       // YÃ¯Â¿Â½klenen PDF dosyasÃ¯Â¿Â½
let currentPDFPage = 1;      // Ã¯Â¿Â½u anki sayfa
let totalPDFPages = 0;       // Toplam sayfa
let pdfImageStroke = null;   // Ekrana Ã¯Â¿Â½izilen PDF sayfasÃ¯Â¿Â½

// --- HTML ELEMENTLERÃ¯Â¿Â½ ---
const body = document.body;

// 1. Sol Panel AraÃ¯Â¿Â½larÃ¯Â¿Â½
const penButton = document.getElementById('btn-kalem');
const akilliPenButton = document.getElementById('btn-akilli-kalem');
const eraserButton = document.getElementById('btn-silgi');
const lineButton = document.getElementById('btn-cizgi');
const rulerButton = document.getElementById('btn-cetvel');
const gonyeButton = document.getElementById('btn-gonye');
const aciolcerButton = document.getElementById('btn-aciolcer');
const pergelButton = document.getElementById('btn-pergel');
const polygonButton = document.getElementById('btn-cokgenler');
const oyunlarButton = document.getElementById('btn-oyunlar');
const oyunlarOptions = document.getElementById('oyunlar-options');

if (oyunlarOptions) {
    oyunlarOptions.classList.add('hidden');
}
oyunlarButton.classList.remove('active');


// --- DÃ¯Â¿Â½KDÃ¯Â¿Â½RTGEN BUTONU TANIMLAMASI ---
const dikdortgenButton = document.getElementById('btn-dikdortgen');

if (dikdortgenButton) {
    dikdortgenButton.addEventListener('click', () => {
        if (typeof window.setActiveTool === 'function') {
            window.setActiveTool('draw_rectangle');
        } else {
            currentTool = 'draw_rectangle';
        }
    });
}
// --------------------------------------

// 2. Alt MenÃ¯Â¿Â½ ButonlarÃ¯Â¿Â½ ve SeÃ¯Â¿Â½enekler
const penOptions = document.getElementById('pen-options');
const colorBoxes = document.querySelectorAll('#pen-options .color-box');
const lineOptions = document.getElementById('line-options');
const pointButton = document.getElementById('btn-nokta');
const straightLineButton = document.getElementById('btn-d_cizgi');
const infinityLineButton = document.getElementById('btn-dogru');
const segmentButton = document.getElementById('btn-dogru_parcasi');
const rayButton = document.getElementById('btn-isin');
const lineColorOptions = document.querySelectorAll('#line-color-options .color-box');
const polygonOptions = document.getElementById('polygon-options');
const polygonPreviewLabel = document.getElementById('polygon-preview-label');
const circleButton = document.getElementById('btn-cember');
const regularPolygonButtons = document.querySelectorAll('#polygon-options button[data-sides]');
const polygonColorOptions = document.querySelectorAll('#polygon-color-options .color-box');
// ?? Burada oyunlarOptions tekrar tanÃ¯Â¿Â½mlanmadÃ¯Â¿Â½, yukarÃ¯Â¿Â½daki global tanÃ¯Â¿Â½m kullanÃ¯Â¿Â½lacak.


// 3. SaÃ¯Â¿Â½ Panel AraÃ¯Â¿Â½larÃ¯Â¿Â½
const undoButton = document.getElementById('btn-undo');
const clearAllButton = document.getElementById('btn-clear-all');
const moveButton = document.getElementById('btn-move');
const fillButton = document.getElementById('btn-fill');
const fillOptions = document.getElementById('fill-options');
const fillColorBoxes = document.querySelectorAll('#fill-options .color-box');
let currentFillColor = '#FF69B4';

// --- CANLANDIR VE KES MENÃ¯Â¿Â½SÃ¯Â¿Â½ (GÃ¯Â¿Â½NCELLENMÃ¯Â¿Â½Ã¯Â¿Â½ VE BÃ¯Â¿Â½RLEÃ¯Â¿Â½TÃ¯Â¿Â½RÃ¯Â¿Â½LMÃ¯Â¿Â½Ã¯Â¿Â½) ---
const btnSnapshotMain = document.getElementById('btn-snapshot-main');
const snapshotOptions = document.getElementById('snapshot-options');
const btnSnapshotBox = document.getElementById('btn-snapshot-box');
const btnSnapshotLasso = document.getElementById('btn-snapshot-lasso');

let menuAcilisKilidi = false;
const toggleSnapshotMenu = (e) => {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    if (menuAcilisKilidi) return;
    menuAcilisKilidi = true;
    setTimeout(() => { menuAcilisKilidi = false; }, 300);

    let sOptions = document.getElementById('snapshot-options') || document.querySelector('.snapshot-options');
    if (!sOptions) return;

    // Ekrandaki gerÃ¯Â¿Â½ek gÃ¯Â¿Â½rÃ¯Â¿Â½nÃ¯Â¿Â½rlÃ¯Â¿Â½k durumunu kontrol et (inline style dahil)
    const menuKapaliMi = sOptions.classList.contains('hidden') || sOptions.style.display === 'none';

    if (menuKapaliMi) {
        // AracÃ¯Â¿Â½ aktif et
        if (typeof setActiveTool === 'function') {
            setActiveTool('snapshot');
        } else {
            currentTool = 'snapshot';
        }

        // MenÃ¯Â¿Â½yÃ¯Â¿Â½ gÃ¯Â¿Â½rÃ¯Â¿Â½nÃ¯Â¿Â½r yap ve inline style engelini kaldÃ¯Â¿Â½r
        sOptions.classList.remove('hidden');
        sOptions.style.display = 'flex';
        sOptions.style.zIndex = '10000';

        // ButonlarÃ¯Â¿Â½n aktiflik durumunu gÃ¯Â¿Â½ncelle
        if (btnSnapshotMain) btnSnapshotMain.classList.add('active');
        if (animateButton) animateButton.classList.add('active');

        // HizalamayÃ¯Â¿Â½ yap
        const refBtn = btnSnapshotMain || animateButton;
        if (refBtn) {
            const buttonRect = refBtn.getBoundingClientRect();
            const panelRect = refBtn.parentElement.getBoundingClientRect();
            sOptions.style.top = `${buttonRect.top - panelRect.top}px`;
        }
    } else {
        // MenÃ¯Â¿Â½yÃ¯Â¿Â½ kapat ve aracÃ¯Â¿Â½ sÃ¯Â¿Â½fÃ¯Â¿Â½rla
        if (typeof setActiveTool === 'function') {
            setActiveTool('none');
        } else {
            currentTool = 'none';
        }

        sOptions.classList.add('hidden');
        sOptions.style.display = 'none';

        if (btnSnapshotMain) btnSnapshotMain.classList.remove('active');
        if (animateButton) animateButton.classList.remove('active');
    }
};

if (btnSnapshotMain) {
    btnSnapshotMain.onclick = null;
    btnSnapshotMain.ontouchstart = null;
    btnSnapshotMain.addEventListener('click', toggleSnapshotMenu);
    btnSnapshotMain.addEventListener('pointerdown', toggleSnapshotMenu);
}
if (btnSnapshotBox) {
    btnSnapshotBox.addEventListener('click', (e) => {
        e.stopPropagation();
        setActiveTool('snapshot'); // Kutu aracÃ¯Â¿Â½nÃ¯Â¿Â½ seÃ¯Â¿Â½
        if (snapshotOptions) {
            snapshotOptions.classList.add('hidden');
            snapshotOptions.style.display = 'none';
        }
    });
}
if (btnSnapshotLasso) {
    btnSnapshotLasso.addEventListener('click', (e) => {
        e.stopPropagation();
        setActiveTool('lasso'); // Serbest (Kement) kesim aracÃ¯Â¿Â½nÃ¯Â¿Â½ seÃ¯Â¿Â½
        if (snapshotOptions) {
            snapshotOptions.classList.add('hidden');
            snapshotOptions.style.display = 'none';
        }
    });
}

// 4. Resim ve PDF YÃ¯Â¿Â½kleme AraÃ¯Â¿Â½larÃ¯Â¿Â½


const pdfControls = document.getElementById('pdf-controls');
const pageCountLabel = document.getElementById('page-count-label');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');




// --- GÃ¯Â¿Â½RSEL YARDIMCILAR ---
const snapIndicator = document.createElement('div');
snapIndicator.id = 'snap-indicator';
body.appendChild(snapIndicator);
const eraserPreview = document.createElement('div');
eraserPreview.className = 'eraser-cursor-preview';
body.appendChild(eraserPreview);


// --- YARDIMCI FONKSÃ¯Â¿Â½YONLAR ---

function distance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function advanceChar(char) {
    let charCode = char.charCodeAt(0) + 1;
    if (charCode > 90) charCode = 65;
    return String.fromCharCode(charCode);
}

function findSnapPoint(pos) {
    for (const stroke of window.drawnStrokes) {
        if (stroke.type === 'point') {
            if (distance(pos, stroke) < SNAP_THRESHOLD) return { x: stroke.x, y: stroke.y };
        } else if (stroke.type === 'straightLine' || stroke.type === 'segment') {
            if (distance(pos, stroke.p1) < SNAP_THRESHOLD) return stroke.p1;
            if (distance(pos, stroke.p2) < SNAP_THRESHOLD) return stroke.p2;
        }
    }
    return null;
}


function getEventPosition(e) {
    if (e.touches && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
}

function drawDot(pos, color = '#00FFCC') {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLabel(text, pos, color = '#FF69B4') {
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = color;
    ctx.fillText(text, pos.x + 8, pos.y + 5);
}

function drawInfinityLine(p1, p2, color, width, isRay = false) {
    const INFINITY = 5000;
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const mag = Math.sqrt(dx * dx + dy * dy);
    if (mag === 0) return { ux: 0, uy: 0 };
    const ux = dx / mag;
    const uy = dy / mag;
    const drawP1 = isRay ? p1 : { x: p1.x - ux * INFINITY, y: p1.y - uy * INFINITY };
    const drawP2 = { x: p1.x + ux * INFINITY, y: p1.y + uy * INFINITY };
    ctx.beginPath();
    ctx.moveTo(drawP1.x, drawP1.y);
    ctx.lineTo(drawP2.x, drawP2.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    return { ux, uy };
}

window.bringToolToFront = function (clickedElement) {
    const tools = [
        window.RulerTool ? window.RulerTool.rulerElement : null,
        window.GonyeTool ? window.GonyeTool.gonyeElement : null,
        window.AciolcerTool ? window.AciolcerTool.aciolcerElement : null,
        window.PergelTool ? window.PergelTool.pergelElement : null
    ];
    // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: AraÃ¯Â¿Â½lara dokununca z-index'leri 5'e dÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½p Ã¯Â¿Â½izim tahtasÃ¯Â¿Â½nÃ¯Â¿Â½n altÃ¯Â¿Â½nda kayboluyordu!
    // ArtÃ¯Â¿Â½k araÃ¯Â¿Â½lar her zaman 9990 ve 9999 gÃ¯Â¿Â½cÃ¯Â¿Â½nde en Ã¯Â¿Â½stte kalacak.
    tools.forEach(tool => { if (tool) tool.style.zIndex = 9990; });
    if (clickedElement) clickedElement.style.zIndex = 9999;
}

function redrawAllStrokes() {
    // 1. Ã¯Â¿Â½NCE KOORDÃ¯Â¿Â½NATLARI SIFIRLA VE TÃ¯Â¿Â½M EKRANI SÃ¯Â¿Â½L
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const bgCanvas = document.getElementById('bg-canvas');
    const bgCtx = bgCanvas ? bgCanvas.getContext('2d') : null;
    if (bgCtx) {
        bgCtx.setTransform(1, 0, 0, 1, 0, 0);
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    }

    // GÃ¯Â¿Â½VENLÃ¯Â¿Â½K KÃ¯Â¿Â½LÃ¯Â¿Â½DÃ¯Â¿Â½
    if (!window.drawnStrokes || window.drawnStrokes.length === 0) return;

    // --- BÃ¯Â¿Â½YÃ¯Â¿Â½K Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: KATMAN (Z-INDEX) KORUMASI ---
    // Arka planÃ¯Â¿Â½ (sayfayÃ¯Â¿Â½ veya pdf'i) her zaman zorla en alta gÃ¯Â¿Â½nderir.
    // BÃ¯Â¿Â½ylece kopyalar, makaslar ve Ã¯Â¿Â½izimler ASLA sayfanÃ¯Â¿Â½n altÃ¯Â¿Â½nda kalmaz!
    window.drawnStrokes.sort((a, b) => {
        if (a.isBackground && !b.isBackground) return -1;
        if (!a.isBackground && b.isBackground) return 1;
        return 0;
    });

    ctx.save();
    // (Buradaki translate ve scale satÃ¯Â¿Â½rlarÃ¯Â¿Â½nÃ¯Â¿Â½ tamamen sildik. Zemin artÃ¯Â¿Â½k sabit!)

    for (const stroke of window.drawnStrokes) {

        // --- BU BLOÃ¯Â¿Â½U DÃ¯Â¿Â½NGÃ¯Â¿Â½NÃ¯Â¿Â½N EN BAÃ¯Â¿Â½INA EKLE ---
        if (stroke.type === 'preview') {
            const p = stroke.payload;
            ctx.save();
            ctx.strokeStyle = '#FF0000'; // KÃ¯Â¿Â½rmÃ¯Â¿Â½zÃ¯Â¿Â½
            ctx.lineWidth = 4;
            ctx.setLineDash([5, 5]); // Kesikli

            if (p.tool === 'pen' && p.path && p.path.length > 0) {
                // ?? Kalem iÃ¯Â¿Â½in canlÃ¯Â¿Â½ Ã¯Â¿Â½nizleme kesiksiz ve kendi renginde olmalÃ¯Â¿Â½!
                ctx.setLineDash([]);
                ctx.strokeStyle = p.color || '#FFFFFF';
                // ?? KalÃ¯Â¿Â½nlÃ¯Â¿Â½k: GÃ¯Â¿Â½nderilen orijinal kalÃ¯Â¿Â½nlÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½ (baseWidth) kullan
                ctx.lineWidth = p.baseWidth || window.currentLineWidth || 3;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                
                ctx.beginPath();
                ctx.moveTo(p.path[0].x, p.path[0].y);
                for (let i = 1; i < p.path.length; i++) {
                    ctx.lineTo(p.path[i].x, p.path[i].y);
                }
                ctx.stroke();
            }
            else if (['straightLine', 'line', 'segment', 'ray'].includes(p.tool) && p.start && p.end) {
                ctx.beginPath();
                const dx = p.end.x - p.start.x, dy = p.end.y - p.start.y, devCarpan = 5000;
                if (p.tool === 'line') { ctx.moveTo(p.start.x - dx * devCarpan, p.start.y - dy * devCarpan); ctx.lineTo(p.start.x + dx * devCarpan, p.start.y + dy * devCarpan); }
                else if (p.tool === 'ray') { ctx.moveTo(p.start.x, p.start.y); ctx.lineTo(p.start.x + dx * devCarpan, p.start.y + dy * devCarpan); }
                else { ctx.moveTo(p.start.x, p.start.y); ctx.lineTo(p.end.x, p.end.y); }
                ctx.stroke();
            }
            // ?? Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: DÃ¯Â¿Â½KDÃ¯Â¿Â½RTGEN VE Ã¯Â¿Â½OKGENLERÃ¯Â¿Â½ DAÃ¯Â¿Â½RE YERÃ¯Â¿Â½NE KENDÃ¯Â¿Â½ Ã¯Â¿Â½EKLÃ¯Â¿Â½YLE Ã¯Â¿Â½Ã¯Â¿Â½Z
            else if ((p.tool === 'rectangle' || p.tool === 'draw_rectangle') && p.start && p.end) {
                ctx.beginPath();
                ctx.rect(Math.min(p.start.x, p.end.x), Math.min(p.start.y, p.end.y), Math.abs(p.end.x - p.start.x), Math.abs(p.end.y - p.start.y));
                ctx.stroke();
            }
            else if (p.tool === 'polygon' && p.start && p.end) {
                const cx = p.start.x, cy = p.start.y, radius = p.radius, sides = p.sides;
                ctx.beginPath();
                if (!sides || sides === 0) {
                    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
                } else if (sides >= 3) {
                    const angleRad = p.rotation || 0;
                    for (let i = 0; i <= sides; i++) {
                        const polyAngle = (i * 2 * Math.PI / sides) + angleRad;
                        const px = cx + radius * Math.cos(polyAngle);
                        const py = cy + radius * Math.sin(polyAngle);
                        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
                    }
                }
                ctx.stroke();
            }
            else if (p.start && p.end) {
                const radius = p.radius || Math.hypot(p.end.x - p.start.x, p.end.y - p.start.y);
                ctx.beginPath(); ctx.arc(p.start.x, p.start.y, radius, 0, Math.PI * 2); ctx.stroke();
            }
            ctx.restore();
            continue; // Bu nesneyi Ã¯Â¿Â½izdik, diÃ¯Â¿Â½er dÃ¯Â¿Â½ngÃ¯Â¿Â½lere girmesine gerek yok // Bu nesneyi Ã¯Â¿Â½izdik, diÃ¯Â¿Â½er dÃ¯Â¿Â½ngÃ¯Â¿Â½lere girmesine gerek yok
        }
        // ------------------------------------------

        // ... (Senin mevcut if (stroke.type === 'pen') { ... } kodlarÃ¯Â¿Â½n burada devam edecek)
        // --- AKILLI BOYAMA MASKESÃ¯Â¿Â½ ---
        if (stroke.type === 'lasso-mask') {
            ctx.save();

            // Lazerle Ã¯Â¿Â½effaf delme iptal, akÃ¯Â¿Â½llÃ¯Â¿Â½ tarayÃ¯Â¿Â½cÃ¯Â¿Â½nÃ¯Â¿Â½n bulduÃ¯Â¿Â½u renkle boyama devrede!
            ctx.fillStyle = stroke.fillColor || "white";

            ctx.beginPath();
            if (stroke.points && stroke.points.length > 0) {
                ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
                for (let i = 1; i < stroke.points.length; i++) {
                    ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
                }
            }
            ctx.closePath();

            // KestiÃ¯Â¿Â½in tam o noktayÃ¯Â¿Â½, sensÃ¯Â¿Â½rlerin bulduÃ¯Â¿Â½u sarÃ¯Â¿Â½ renge pÃ¯Â¿Â½rÃ¯Â¿Â½zsÃ¯Â¿Â½zce boyar
            ctx.fill();
            ctx.restore();
            continue;
        }

        // --- KALEM (PEN) SABÃ¯Â¿Â½T KALINLIK VE YUMUÃ¯Â¿Â½ATILMIÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M (BEZIER CURVE) ---
        if (stroke.type === 'pen') {
            const points = stroke.path;

            if (points.length < 2) {
                // Sadece tÃ¯Â¿Â½klandÃ¯Â¿Â½ysa tek bir nokta koy (BasÃ¯Â¿Â½nÃ¯Â¿Â½ iptal)
                ctx.beginPath();
                ctx.arc(points[0].x, points[0].y, stroke.baseWidth / 2, 0, Math.PI * 2);
                ctx.fillStyle = stroke.color;
                ctx.fill();
            } else {
                // --- KÃ¯Â¿Â½Ã¯Â¿Â½ELERÃ¯Â¿Â½ YOK EDEN YUMUÃ¯Â¿Â½ATMA (SMOOTHING) ALGORÃ¯Â¿Â½TMASI ---
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                ctx.strokeStyle = stroke.color;

                // 1. BASINÃ¯Â¿Â½ Ã¯Â¿Â½PTALÃ¯Â¿Â½: KalÃ¯Â¿Â½nlÃ¯Â¿Â½k her zaman standart ve sabittir
                ctx.lineWidth = stroke.baseWidth;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                // 2. KÃ¯Â¿Â½Ã¯Â¿Â½E Ã¯Â¿Â½PTALÃ¯Â¿Â½: NoktalarÃ¯Â¿Â½ dÃ¯Â¿Â½z Ã¯Â¿Â½izgiyle deÃ¯Â¿Â½il, esnek eÃ¯Â¿Â½rilerle (Bezier) baÃ¯Â¿Â½lar
                for (let i = 1; i < points.length - 1; i++) {
                    const xc = (points[i].x + points[i + 1].x) / 2;
                    const yc = (points[i].y + points[i + 1].y) / 2;
                    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
                }

                // Son noktayÃ¯Â¿Â½ eÃ¯Â¿Â½rinin ucuna baÃ¯Â¿Â½la
                ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
                ctx.stroke();
            }
        }


        // --- RESÃ¯Â¿Â½M / PDF VE CANLANDIR (SNAPSHOT) KOPYASI ---
        else if (stroke.type === 'image') {

            // 1. EÃ¯Â¿Â½ER BU BÃ¯Â¿Â½R PDF VEYA ARKA PLAN Ã¯Â¿Â½SE SADECE Ã¯Â¿Â½ERÃ¯Â¿Â½EVESÃ¯Â¿Â½NÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½Z, KENDÃ¯Â¿Â½NÃ¯Â¿Â½ EN ARKAYA SAKLA
            if (stroke.isBackground !== false) {
                if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                    ctx.save();
                    const centerX = stroke.x + (stroke.width / 2);
                    const centerY = stroke.y + (stroke.height / 2);
                    ctx.translate(centerX, centerY);
                    ctx.rotate((stroke.rotation || 0) * Math.PI / 180);

                    // Kesikli SeÃ¯Â¿Â½im Ã¯Â¿Â½erÃ¯Â¿Â½evesi
                    ctx.strokeStyle = '#00FFCC'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
                    ctx.strokeRect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                    ctx.setLineDash([]);

                    // 1. DÃ¯Â¿Â½ndÃ¯Â¿Â½rme Butonu (Ã¯Â¿Â½st Orta - YeÃ¯Â¿Â½il)
                    const rotX = 0;
                    const rotY = -stroke.height / 2 - 25;
                    ctx.beginPath();
                    ctx.arc(rotX, rotY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#0F0'; ctx.fill();
                    ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.font = "bold 16px Arial"; ctx.fillStyle = "#FFF"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
                    ctx.fillText("?", rotX, rotY - 1);

                    // 2. BoyutlandÃ¯Â¿Â½rma Butonu (SaÃ¯Â¿Â½ Alt - Pembe)
                    const resX = stroke.width / 2;
                    const resY = stroke.height / 2;
                    ctx.beginPath();
                    ctx.arc(resX, resY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#F0F'; ctx.fill();
                    ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.fillStyle = "#FFF"; ctx.fillText("?", resX, resY);

                    ctx.restore();
                }
                continue; // Ã¯Â¿Â½Ã¯Â¿Â½lemi bitir ve resmin kendini Ã¯Â¿Â½izmesi iÃ¯Â¿Â½in en arkaya (destination-over) pasla
            }

            // 2. EÃ¯Â¿Â½ER BU KESTÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½MÃ¯Â¿Â½Z BÃ¯Â¿Â½R YÃ¯Â¿Â½ZEN KOPYAYSA (CANLANDIR) EKRANA Ã¯Â¿Â½Ã¯Â¿Â½Z VE Ã¯Â¿Â½ERÃ¯Â¿Â½EVE EKLE
            let imgToDraw = null;
            if (stroke.img && stroke.img instanceof HTMLImageElement) {
                imgToDraw = stroke.img;
            } else if (stroke.imgData) {
                if (!stroke.imgObj) {
                    stroke.imgObj = new Image();
                    stroke.imgObj.src = stroke.imgData;
                    stroke.imgObj.onload = () => { if (window.redrawAllStrokes) window.redrawAllStrokes(); };
                }
                imgToDraw = stroke.imgObj;
            }

            if (imgToDraw && (imgToDraw.complete || imgToDraw.readyState >= 2)) {
                const targetCtx = (stroke.isBackground !== false && typeof bgCtx !== 'undefined' && bgCtx) ? bgCtx : ctx;
                targetCtx.save();
                const centerX = stroke.x + (stroke.width / 2);
                const centerY = stroke.y + (stroke.height / 2);
                targetCtx.translate(centerX, centerY);
                targetCtx.rotate((stroke.rotation || 0) * Math.PI / 180);

                targetCtx.drawImage(imgToDraw, -stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);

                targetCtx.restore();                if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                    ctx.save();
                    ctx.translate(centerX, centerY);
                    ctx.rotate((stroke.rotation || 0) * Math.PI / 180);
                    ctx.strokeStyle = '#00FFCC'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
                    ctx.strokeRect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                    ctx.setLineDash([]);

                    const rotX = 0; const rotY = -stroke.height / 2 - 25;
                    ctx.beginPath(); ctx.arc(rotX, rotY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#0F0'; ctx.fill(); ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.font = "bold 16px Arial"; ctx.fillStyle = "#FFF"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
                    ctx.fillText("?", rotX, rotY - 1);

                    const resX = stroke.width / 2; const resY = stroke.height / 2;
                    ctx.beginPath(); ctx.arc(resX, resY, 12, 0, 2 * Math.PI);
                    ctx.fillStyle = '#F0F'; ctx.fill(); ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.stroke();
                    ctx.fillStyle = "#FFF"; ctx.fillText("?", resX, resY);
                    
                    ctx.restore();
                }
            }
        }

        // --- NOKTA ---
        else if (stroke.type === 'point') {
            drawDot(stroke, stroke.color); // ?? NoktanÃ¯Â¿Â½n kendi rengini kullanmasÃ¯Â¿Â½nÃ¯Â¿Â½ saÃ¯Â¿Â½lar
            drawLabel(stroke.label, stroke, stroke.color); // ?? Harfin de aynÃ¯Â¿Â½ renk olmasÃ¯Â¿Â½nÃ¯Â¿Â½ saÃ¯Â¿Â½lar
        }

        // --- DÃ¯Â¿Â½Z Ã¯Â¿Â½Ã¯Â¿Â½ZGÃ¯Â¿Â½ ---
        else if (stroke.type === 'straightLine') {
            ctx.beginPath();
            ctx.moveTo(stroke.p1.x, stroke.p1.y);
            ctx.lineTo(stroke.p2.x, stroke.p2.y);
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.width;
            ctx.lineCap = 'round';
            ctx.stroke();
            if (stroke.lengthLabel) drawLabel(stroke.lengthLabel, stroke.lengthLabelPos, '#FFFF00');
        }

        // --- DOÃ¯Â¿Â½RU ---
        else if (stroke.type === 'line') {
            const { ux, uy } = drawInfinityLine(stroke.p1, stroke.p2, stroke.color, stroke.width, false);
            if (ux !== 0 || uy !== 0) {
                drawDot(stroke.p1, stroke.color);
                drawDot(stroke.p2, stroke.color);
                if (stroke.label1) drawLabel(stroke.label1, stroke.p1, '#FF69B4');
                if (stroke.label2) drawLabel(stroke.label2, stroke.p2, '#FF69B4');
            }
        }

        // --- DOÃ¯Â¿Â½RU PARÃ¯Â¿Â½ASI ---
        else if (stroke.type === 'segment') {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(stroke.p1.x, stroke.p1.y);
            ctx.lineTo(stroke.p2.x, stroke.p2.y);
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.width || 4;
            ctx.lineCap = 'round';
            if (stroke.isDash) {
                ctx.setLineDash(stroke.dashPattern || [5, 5]);
            }
            ctx.stroke();
            ctx.restore();
            if (stroke.label1) drawLabel(stroke.label1, stroke.p1, '#FF69B4');
            if (stroke.label2) drawLabel(stroke.label2, stroke.p2, '#FF69B4');
            if (stroke.lengthLabel) drawLabel(stroke.lengthLabel, stroke.lengthLabelPos, '#FFFF00');
        }

        // --- IÃ¯Â¿Â½IN ---
        else if (stroke.type === 'ray') {
            const { ux, uy } = drawInfinityLine(stroke.p1, stroke.p2, stroke.color, stroke.width, true);
            if (ux !== 0 || uy !== 0) {
                drawDot(stroke.p1, stroke.color);
                drawDot(stroke.p2, stroke.color);
                if (stroke.label1) drawLabel(stroke.label1, stroke.p1, '#FF69B4');
                if (stroke.label2) drawLabel(stroke.label2, stroke.p2, '#FF69B4');
            }
        }

        // --- Ã¯Â¿Â½OKGENLER ---
        else if (stroke.type === 'polygon') {
            if (window.PolygonTool && typeof window.PolygonTool.calculateVertices === 'function') {
                const vertices = window.PolygonTool.calculateVertices(stroke.center, stroke.radius, stroke.sideCount, stroke.rotation);
                stroke.vertices = vertices;

                if (vertices.length > 0) {
                    ctx.beginPath();
                    ctx.moveTo(vertices[0].x, vertices[0].y);
                    for (let i = 1; i < vertices.length; i++) ctx.lineTo(vertices[i].x, vertices[i].y);
                    ctx.closePath();
                }

                ctx.fillStyle = stroke.fillColor || 'rgba(0, 0, 0, 0.2)';
                ctx.fill();
                ctx.strokeStyle = stroke.color;
                ctx.lineWidth = stroke.width || 4;
                ctx.lineCap = 'round'; ctx.lineJoin = 'round';
                ctx.stroke();

                drawDot(stroke.center, stroke.color);
                drawLabel(stroke.label, stroke.center, '#FF69B4');
                vertices.forEach(v => drawDot(v, stroke.color));

                if (stroke.showEdgeLabels) {
                    for (let j = 0; j < vertices.length; j++) {
                        const v1 = vertices[j];
                        const v2 = vertices[(j + 1) % vertices.length];
                        const midPoint = { x: (v1.x + v2.x) / 2, y: (v1.y + v2.y) / 2 };
                        const edgeLabel = window.PolygonTool.getEdgeLength(v1, v2);
                        drawLabel(edgeLabel, midPoint, '#FF69B4');
                    }
                }
                if (stroke.showAngleLabels) {
                    const angleLabel = window.PolygonTool.getInternalAngle(stroke.sideCount);
                    const arcRadius = 25;
                    for (let j = 0; j < vertices.length; j++) {
                        const v_current = vertices[j];
                        const v_prev = vertices[j === 0 ? vertices.length - 1 : j - 1];
                        const v_next = vertices[(j + 1) % vertices.length];
                        const startAngle = Math.atan2(v_prev.y - v_current.y, v_prev.x - v_current.x);
                        const endAngle = Math.atan2(v_next.y - v_current.y, v_next.x - v_current.x);
                        ctx.beginPath();
                        ctx.arc(v_current.x, v_current.y, arcRadius, endAngle, startAngle);
                        ctx.strokeStyle = '#FFFF00'; ctx.lineWidth = 2; ctx.stroke();
                        const angle_label_x = (v_current.x * 0.8) + (stroke.center.x * 0.2);
                        const angle_label_y = (v_current.y * 0.8) + (stroke.center.y * 0.2);
                        drawLabel(angleLabel, { x: angle_label_x, y: angle_label_y }, '#FFFF00');
                    }
                }
                if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                    const rotateHandlePos = window.PolygonTool.getRotateHandlePosition(stroke);
                    ctx.beginPath(); ctx.arc(rotateHandlePos.x, rotateHandlePos.y, 6, 0, 2 * Math.PI);
                    ctx.fillStyle = 'rgba(0, 255, 0, 0.8)'; ctx.fill(); ctx.strokeStyle = '#0F0'; ctx.lineWidth = 2; ctx.stroke();
                    const resizeHandlePos = window.PolygonTool.getResizeHandlePosition(stroke);
                    ctx.beginPath(); ctx.arc(resizeHandlePos.x, resizeHandlePos.y, 6, 0, 2 * Math.PI);
                    ctx.fillStyle = 'rgba(255, 0, 255, 0.8)'; ctx.fill(); ctx.strokeStyle = '#F0F'; ctx.lineWidth = 2; ctx.stroke();
                }
            }
        }

        // --- 3D HOLOGRRAM MOTORU YÃ¯Â¿Â½NLENDÃ¯Â¿Â½RMESÃ¯Â¿Â½ VE 2D SENKRONU ---
        else if (stroke.type === '3d_shape') {
            if (window.ThreeDTool && typeof window.ThreeDTool.drawShape === 'function') window.ThreeDTool.drawShape(ctx, stroke);

            // 1. Ã¯Â¿Â½Ã¯Â¿Â½ BOYUTLU NESNEYÃ¯Â¿Â½ 2D EKRAN MERKEZÃ¯Â¿Â½NE VE BOYUTUNA ZORLA UYDUR (SENKRONÃ¯Â¿Â½ZASYON)
            if (window.Scene3D && window.Scene3D.scene) {
                const sceneMesh = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === stroke.id);
                if (sceneMesh) {
                    if (stroke.rotationX !== undefined) sceneMesh.rotation.x = stroke.rotationX;
                    if (stroke.rotationY !== undefined) sceneMesh.rotation.y = stroke.rotationY;
                    if (stroke.rotationZ !== undefined) sceneMesh.rotation.z = stroke.rotationZ;
                    
                   const canvasElm = document.getElementById('drawing-canvas');
                    if (canvasElm) {
                        const myCw = canvasElm.width;
                        const myCh = canvasElm.height;
                        
                        // ?? SÃ¯Â¿Â½RGÃ¯Â¿Â½ KORUMASI: SÃ¯Â¿Â½rgÃ¯Â¿Â½ Ã¯Â¿Â½ekilince deÃ¯Â¿Â½iÃ¯Â¿Â½en geniÃ¯Â¿Â½lik yerine mÃ¯Â¿Â½hÃ¯Â¿Â½rlÃ¯Â¿Â½ original deÃ¯Â¿Â½erleri kullan
                        const refX = stroke.originalX !== undefined ? stroke.originalX : stroke.x;
                        const refY = stroke.originalY !== undefined ? stroke.originalY : stroke.y;
                        const refW = stroke.originalW !== undefined ? stroke.originalW : stroke.width;
                        const refH = stroke.originalH !== undefined ? stroke.originalH : stroke.height;

                        const cx = refX + (refW / 2);
                        const cy = refY + (refH / 2);
                        
                        const nx = (cx / myCw) * 2 - 1;
                        const ny = -(cy / myCh) * 2 + 1;

                        const raycaster = new THREE.Raycaster();
                        raycaster.setFromCamera(new THREE.Vector2(nx, ny), window.Scene3D.camera);
                        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
                        const intersection = new THREE.Vector3();
                        
                        if (raycaster.ray.intersectPlane(plane, intersection)) {
                            sceneMesh.position.copy(intersection);
                        }

                        if (stroke.pos3D && stroke.pos3D.z !== undefined) {
                            sceneMesh.position.z = stroke.pos3D.z;
                        }
                        
                        // ?? KUSURSUZ BOYUT + AÃ¯Â¿Â½ Ã¯Â¿Â½LÃ¯Â¿Â½EÃ¯Â¿Â½Ã¯Â¿Â½: KoordinatlarÃ¯Â¿Â½ bozmadan sadece pembe buton Ã¯Â¿Â½arpanÃ¯Â¿Â½nÃ¯Â¿Â½ ekliyoruz
                        const threeJSHeightRatio = 30 / myCh;
                        const targetThreeJSWidth = refW * threeJSHeightRatio;
                        const originalThreeJSWidth = sceneMesh.userData.baseSize * 2;
                        const gercekOlcek = targetThreeJSWidth / originalThreeJSWidth;
                        
                        const mScale = stroke.meshScale || 1;
                        sceneMesh.scale.setScalar(gercekOlcek * mScale);
                    }
                }
            }

            // 2. SEÃ¯Â¿Â½Ã¯Â¿Â½LÃ¯Â¿Â½YKEN YEÃ¯Â¿Â½Ã¯Â¿Â½L VE PEMBE KULPLARI Ã¯Â¿Â½Ã¯Â¿Â½Z (ESKÃ¯Â¿Â½ Ã¯Â¿Â½ZELLÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½N GERÃ¯Â¿Â½ GELMESÃ¯Â¿Â½)
            if (typeof currentTool !== 'undefined' && currentTool === 'move' && selectedItem === stroke) {
                ctx.save();
                const cX = stroke.x + stroke.width / 2;
                const cY = stroke.y + stroke.height / 2;
                const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

                ctx.translate(cX, cY);
                ctx.rotate(angleRad);

                // SeÃ¯Â¿Â½im Ã¯Â¿Â½erÃ¯Â¿Â½evesi
                ctx.strokeStyle = '#00FFCC'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
                ctx.strokeRect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                ctx.setLineDash([]);
                ctx.restore();
            }
        }
        else if (stroke.type === 'rectangle') {
            ctx.save();
            const centerX = stroke.x + stroke.width / 2;
            const centerY = stroke.y + stroke.height / 2;
            ctx.translate(centerX, centerY);
            ctx.rotate((stroke.rotation || 0) * Math.PI / 180);

            // 1. DikdÃ¯Â¿Â½rtgeni Ã¯Â¿Â½iz
            ctx.beginPath();
            ctx.rect(-stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = 4;
            ctx.stroke();

            // 2. Kenar UzunluklarÃ¯Â¿Â½nÃ¯Â¿Â½ YazdÃ¯Â¿Â½r (Ã¯Â¿Â½nizlemedeki gibi kalÃ¯Â¿Â½cÃ¯Â¿Â½ olur)
            if (stroke.showEdgeLabels) {
                ctx.font = "14px Arial";
                ctx.fillStyle = stroke.color;
                ctx.textAlign = "center";

                const wCm = (stroke.width / 30).toFixed(1).replace('.', ',');
                const hCm = (stroke.height / 30).toFixed(1).replace('.', ',');

                // Ã¯Â¿Â½st Kenar CM
                ctx.fillText(`${wCm} cm`, 0, -stroke.height / 2 - 10);

                // Sol Kenar CM (Dikey yazdÃ¯Â¿Â½rmak iÃ¯Â¿Â½in dÃ¯Â¿Â½ndÃ¯Â¿Â½rÃ¯Â¿Â½yoruz)
                ctx.save();
                ctx.translate(-stroke.width / 2 - 25, 0);
                ctx.rotate(-Math.PI / 2);
                ctx.fillText(`${hCm} cm`, 0, 0);
                ctx.restore();
            }

            // 3. KÃ¯Â¿Â½Ã¯Â¿Â½e Harflerini YazdÃ¯Â¿Â½r (A, B, C, D)
            if (stroke.labels) {
                ctx.font = "bold 16px Arial";
                ctx.fillStyle = "#FF69B4"; // Pembe harfler
                ctx.fillText(stroke.labels[0], -stroke.width / 2 - 15, -stroke.height / 2 - 5); // Sol Ã¯Â¿Â½st
                ctx.fillText(stroke.labels[1], stroke.width / 2 + 10, -stroke.height / 2 - 5);  // SaÃ¯Â¿Â½ Ã¯Â¿Â½st
                ctx.fillText(stroke.labels[2], stroke.width / 2 + 10, stroke.height / 2 + 15);  // SaÃ¯Â¿Â½ Alt
                ctx.fillText(stroke.labels[3], -stroke.width / 2 - 15, stroke.height / 2 + 15); // Sol Alt
            }

            // 4. "TaÃ¯Â¿Â½Ã¯Â¿Â½" Modu Aktifse ButonlarÃ¯Â¿Â½ Ã¯Â¿Â½iz
            if (currentTool === 'move' && selectedItem === stroke) {
                // DÃ¯Â¿Â½ndÃ¯Â¿Â½rme (YeÃ¯Â¿Â½il)
                ctx.fillStyle = '#0F0'; ctx.beginPath(); ctx.arc(0, -stroke.height / 2 - 30, 12, 0, 7); ctx.fill();
                // BoyutlandÃ¯Â¿Â½rma (Pembe)
                ctx.fillStyle = '#F0F'; ctx.beginPath(); ctx.arc(stroke.width / 2, stroke.height / 2, 12, 0, 7); ctx.fill();
            }

            // 5. AÃ¯Â¿Â½Ã¯Â¿Â½ TÃ¯Â¿Â½klandÃ¯Â¿Â½ysa 90 Derece SembolÃ¯Â¿Â½nÃ¯Â¿Â½ Ã¯Â¿Â½iz
            if (stroke.showAngleLabels) {
                ctx.font = "bold 14px Arial"; ctx.fillStyle = "yellow";
                ctx.fillText("90Ã¯Â¿Â½", -stroke.width / 2 + 15, -stroke.height / 2 + 20);
            }
            ctx.restore();
        }



        // --- Ã¯Â¿Â½EMBER / PERGEL ---
        else if (stroke.type === 'arc') {
            const PI_RAD = Math.PI / 180;
            let startRad = stroke.startAngle * PI_RAD;
            let endRad = stroke.endAngle * PI_RAD;
            const totalAngleDrawn = Math.abs(stroke.endAngle - stroke.startAngle);

            if (totalAngleDrawn >= 359) { startRad = 0; endRad = 2 * Math.PI; }

            ctx.beginPath();
            ctx.arc(stroke.cx, stroke.cy, stroke.radius, startRad, endRad, false);
            if (totalAngleDrawn >= 359) ctx.closePath();

            if (stroke.fillColor && stroke.fillColor !== 'transparent' && totalAngleDrawn >= 359) {
                ctx.fillStyle = stroke.fillColor;
                ctx.fill();
            }

            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.width || 4;
            ctx.lineCap = 'round';
            ctx.stroke();

            const centerPos = { x: stroke.cx, y: stroke.cy };
            drawDot(centerPos, stroke.color);
            if (stroke.label) drawLabel(stroke.label, centerPos, '#FF69B4');

            if (stroke.showCircleInfo) {
                ctx.beginPath();
                ctx.moveTo(centerPos.x, centerPos.y);
                ctx.lineTo(centerPos.x + stroke.radius, centerPos.y);
                ctx.strokeStyle = '#FF69B4'; ctx.lineWidth = 1; ctx.setLineDash([2, 2]); ctx.stroke(); ctx.setLineDash([]);

                const PI = window.PolygonTool.PI_VALUE || 3;
                const r_px = stroke.radius;
                const r_cm_raw = (r_px / (window.PolygonTool.PIXELS_PER_CM || 30));
                const r_cm_calc = parseFloat(r_cm_raw.toFixed(2));
                const r_cm_str = r_cm_raw.toFixed(2).replace('.', ',');
                const circ_str = (2 * PI * r_cm_calc).toFixed(2).replace('.', ',');
                const area_str = (PI * r_cm_calc * r_cm_calc).toFixed(2).replace('.', ',');

                const r_label = `r = ${r_cm_str} cm`;
                drawLabel(r_label, { x: centerPos.x + (r_px / 2) - 20, y: centerPos.y - 10 }, '#FFFF00');
                let labelY = centerPos.y - 20;
                const labelX = centerPos.x + r_px + 30;
                drawLabel(`Ã¯Â¿Â½ = 2 . ? . r`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 20;
                drawLabel(`= 2 . ${PI} . ${r_cm_str} = ${circ_str} cm`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 25;
                drawLabel(`A = ? . rÃ¯Â¿Â½`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 20;
                drawLabel(`= ${PI} . ${r_cm_str}Ã¯Â¿Â½ = ${area_str} cmÃ¯Â¿Â½`, { x: labelX, y: labelY }, '#FFFF00'); labelY += 25;
                drawLabel(`(? = ${PI} alÃ¯Â¿Â½ndÃ¯Â¿Â½)`, { x: labelX, y: labelY }, '#AAAAAA');
            }
        }
    } // <-- FOR DÃ¯Â¿Â½NGÃ¯Â¿Â½SÃ¯Â¿Â½ BURADA KAPANIYOR

    ctx.restore();

    // === EKLENECEK YENÃ¯Â¿Â½ BÃ¯Â¿Â½LÃ¯Â¿Â½M: SAYFAYI EN ARKAYA Ã¯Â¿Â½Ã¯Â¿Â½Z ===
    if (bgCtx) {
        bgCtx.save();
        for (const stroke of window.drawnStrokes) {
            if (stroke.type === 'image' && stroke.isBackground !== false) {
                let imgToDraw = null;
                if (stroke.img && stroke.img instanceof HTMLImageElement) {
                    imgToDraw = stroke.img;
                } else if (stroke.imgObj) {
                    imgToDraw = stroke.imgObj;
                }

                if (imgToDraw && (imgToDraw.complete || imgToDraw.readyState >= 2)) {
                    bgCtx.save();
                    const centerX = stroke.x + (stroke.width / 2);
                    const centerY = stroke.y + (stroke.height / 2);
                    bgCtx.translate(centerX, centerY);
                    bgCtx.rotate((stroke.rotation || 0) * Math.PI / 180);
                    bgCtx.drawImage(imgToDraw, -stroke.width / 2, -stroke.height / 2, stroke.width, stroke.height);
                    bgCtx.restore();
                }
            }
            // AyrÃ¯Â¿Â½ca Lasso-mask ile PDF Ã¯Â¿Â½zerinde delik aÃ¯Â¿Â½Ã¯Â¿Â½lmÃ¯Â¿Â½Ã¯Â¿Â½sa onu da bgCtx'den siliyoruz
            else if (stroke.type === 'lasso-mask') {
                bgCtx.save();
                bgCtx.globalCompositeOperation = 'destination-out';
                bgCtx.beginPath();
                bgCtx.moveTo(stroke.points[0].x, stroke.points[0].y);
                for (let i = 1; i < stroke.points.length; i++) {
                    bgCtx.lineTo(stroke.points[i].x, stroke.points[i].y);
                }
                bgCtx.closePath();
                bgCtx.fill();
                bgCtx.restore();
            }
        }
        bgCtx.restore();
    }
    // ====================================================

    // --- YENÃ¯Â¿Â½ EKLENEN KISIM: OTOMATÃ¯Â¿Â½K HARF SENKRONÃ¯Â¿Â½ZASYONU ---
    // Ekranda o an var olan en yÃ¯Â¿Â½ksek harfi bulur
    let maxCode = 64;
    drawnStrokes.forEach(s => {
        if (s.label && s.label.charCodeAt(0) > maxCode) maxCode = s.label.charCodeAt(0);
        if (s.label1 && s.label1.charCodeAt(0) > maxCode) maxCode = s.label1.charCodeAt(0);
        if (s.label2 && s.label2.charCodeAt(0) > maxCode) maxCode = s.label2.charCodeAt(0);
    });


    // SÃ¯Â¿Â½radaki harfe geÃ¯Â¿Â½er (Z'yi geÃ¯Â¿Â½erse A'ya dÃ¯Â¿Â½ner)
    let nextCode = maxCode + 1;
    if (nextCode > 90) nextCode = 65;

    // TÃ¯Â¿Â½m sistemi (Pergel, Ã¯Â¿Â½okgenler ve Kalem) tek bir harfe senkronize eder
    nextPointChar = String.fromCharCode(nextCode);
    window.nextPointChar = nextPointChar;
    // ---------------------------------------------------------

    // --- 4. ADIM: YENÃ¯Â¿Â½ POLÃ¯Â¿Â½GONAL LASSO Ã¯Â¿Â½NÃ¯Â¿Â½ZLEMESÃ¯Â¿Â½ ---
    if (currentTool === 'lasso' && typeof lassoPoints !== 'undefined' && lassoPoints.length > 0) {
        ctx.save();

        // 1. SABÃ¯Â¿Â½TLENMÃ¯Â¿Â½Ã¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½ZGÃ¯Â¿Â½LERÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½Z (Noktalar arasÃ¯Â¿Â½)
        ctx.strokeStyle = '#00ffcc'; // Ã¯Â¿Â½izgi rengi turkuaz
        ctx.lineWidth = 2;
        ctx.setLineDash([]); // Sabit Ã¯Â¿Â½izgiler dÃ¯Â¿Â½z olsun
        ctx.beginPath();
        ctx.moveTo(lassoPoints[0].x, lassoPoints[0].y);
        for (let i = 1; i < lassoPoints.length; i++) {
            ctx.lineTo(lassoPoints[i].x, lassoPoints[i].y);
        }
        ctx.stroke();

        // 2. KESÃ¯Â¿Â½KLÃ¯Â¿Â½ Ã¯Â¿Â½NÃ¯Â¿Â½ZLEME Ã¯Â¿Â½Ã¯Â¿Â½ZGÃ¯Â¿Â½SÃ¯Â¿Â½NÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½Z (Son noktadan imlece giden)
        if (typeof currentMousePos !== 'undefined' && currentMousePos) {
            ctx.beginPath();
            ctx.setLineDash([6, 6]); // Kesikli Ã¯Â¿Â½izgi efekti
            ctx.strokeStyle = '#aaaaaa';
            let lastPoint = lassoPoints[lassoPoints.length - 1];
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(currentMousePos.x, currentMousePos.y);
            ctx.stroke();
        }

        // 3. TIKLANAN NOKTALARI (KÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½K YUVARLAKLARI) Ã¯Â¿Â½Ã¯Â¿Â½Z
        ctx.fillStyle = '#ff0044';
        ctx.setLineDash([]);
        for (let i = 0; i < lassoPoints.length; i++) {
            ctx.beginPath();
            // Ã¯Â¿Â½LK noktayÃ¯Â¿Â½ hedef olarak gÃ¯Â¿Â½stermek iÃ¯Â¿Â½in daha BÃ¯Â¿Â½YÃ¯Â¿Â½K Ã¯Â¿Â½iziyoruz
            let radius = (i === 0) ? 8 : 4;
            ctx.arc(lassoPoints[i].x, lassoPoints[i].y, radius, 0, Math.PI * 2);
            ctx.fill();

            // Ã¯Â¿Â½lk noktanÃ¯Â¿Â½n etrafÃ¯Â¿Â½na beyaz bir hedef halkasÃ¯Â¿Â½ ekle
            if (i === 0) {
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        ctx.restore();
    } // <-- BURASI YENÃ¯Â¿Â½ POLÃ¯Â¿Â½GONAL LASSO BLOÃ¯Â¿Â½UNUN BÃ¯Â¿Â½TÃ¯Â¿Â½Ã¯Â¿Â½ PARANTEZÃ¯Â¿Â½


    // --- HASSAS HEDEFLEME Ã¯Â¿Â½APRAZI (KESKÃ¯Â¿Â½N NÃ¯Â¿Â½Ã¯Â¿Â½ANCI MODU) ---
    // (Lasso seÃ¯Â¿Â½iliyse ve parmak ekrana basÃ¯Â¿Â½lÃ¯Â¿Â½ysa her zaman Ã¯Â¿Â½Ã¯Â¿Â½kar)
    if (currentTool === 'lasso' && window.isDraggingLassoPoint && typeof currentMousePos !== 'undefined' && currentMousePos) {
        ctx.save();
        ctx.beginPath();
        // EkranÃ¯Â¿Â½n bir ucundan diÃ¯Â¿Â½er ucuna yatay ve dikey hizalama Ã¯Â¿Â½izgileri
        ctx.moveTo(0, currentMousePos.y);
        ctx.lineTo(canvas.width, currentMousePos.y);
        ctx.moveTo(currentMousePos.x, 0);
        ctx.lineTo(currentMousePos.x, canvas.height);

        ctx.setLineDash([4, 4]); // Kesikli

        // EÃ¯Â¿Â½er baÃ¯Â¿Â½langÃ¯Â¿Â½Ã¯Â¿Â½ noktasÃ¯Â¿Â½na kilitlendiysek Ã¯Â¿Â½apraz YEÃ¯Â¿Â½Ã¯Â¿Â½L olsun
        if (window.lassoIsClosing) {
            ctx.strokeStyle = '#00FF00'; // Kilitlendi YeÃ¯Â¿Â½ili
        } else {
            ctx.strokeStyle = 'rgba(255, 0, 255, 0.7)'; // Normal Pembe
        }

        ctx.lineWidth = 1.5;
        ctx.stroke();


        // Tam dokunduÃ¯Â¿Â½un yere minik bir merkez noktasÃ¯Â¿Â½
        ctx.beginPath();
        ctx.arc(currentMousePos.x, currentMousePos.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = window.lassoIsClosing ? '#00FF00' : '#ff00ff';
        ctx.fill();
        ctx.restore();
    }

} // <-- redrawAllStrokes FONKSÃ¯Â¿Â½YONU BURADA TAMAMEN KAPANIYOR


function processLassoCut() {
    if (lassoPoints.length < 3) return;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    lassoPoints.forEach(p => {
        if (p.x < minX) minX = p.x; if (p.y < minY) minY = p.y;
        if (p.x > maxX) maxX = p.x; if (p.y > maxY) maxY = p.y;
    });

    const width = maxX - minX;
    const height = maxY - minY;
    if (width < 5 || height < 5) return;

    // =======================================================
    // 1. X-RAY (RÃ¯Â¿Â½NTGEN) SENSÃ¯Â¿Â½RÃ¯Â¿Â½: TÃ¯Â¿Â½m katmanlarÃ¯Â¿Â½ birleÃ¯Â¿Â½tirip gerÃ¯Â¿Â½ek rengi okur
    // =======================================================
    function getRealColor(x, y) {
        const tCan = document.createElement('canvas');
        tCan.width = 1; tCan.height = 1;
        const tCtx = tCan.getContext('2d');

        // Alttaki PDF katmanÃ¯Â¿Â½nÃ¯Â¿Â½ oku
        const bgLayer = document.getElementById('pdf-canvas') || document.querySelector('.pdf-page-canvas');
        if (bgLayer) {
            const sX = bgLayer.width / bgLayer.offsetWidth;
            const sY = bgLayer.height / bgLayer.offsetHeight;
            tCtx.drawImage(bgLayer, x * sX, y * sY, 1 * sX, 1 * sY, 0, 0, 1, 1);
        } else {
            tCtx.fillStyle = "white"; tCtx.fillRect(0, 0, 1, 1);
        }
        // Ã¯Â¿Â½stteki Ã¯Â¿Â½izim katmanÃ¯Â¿Â½nÃ¯Â¿Â½ ekle
        tCtx.drawImage(canvas, x, y, 1, 1, 0, 0, 1, 1);
        return tCtx.getImageData(0, 0, 1, 1).data;
    }

    // =======================================================
    // 2. KESTÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½MÃ¯Â¿Â½Z PARÃ¯Â¿Â½AYI (KOPYAYI) OLUÃ¯Â¿Â½TUR (X-Ray kullanarak keser)
    // =======================================================
    const offCanvas = document.createElement('canvas');
    offCanvas.width = width; offCanvas.height = height;
    const offCtx = offCanvas.getContext('2d');

    offCtx.beginPath();
    offCtx.moveTo(lassoPoints[0].x - minX, lassoPoints[0].y - minY);
    for (let i = 1; i < lassoPoints.length; i++) {
        offCtx.lineTo(lassoPoints[i].x - minX, lassoPoints[i].y - minY);
    }
    offCtx.closePath();
    offCtx.clip();

    const bgLayer = document.getElementById('pdf-canvas') || document.querySelector('.pdf-page-canvas');

    // YÃ¯Â¿Â½ksek kaliteli Ã¯Â¿Â½izim ayarlarÃ¯Â¿Â½nÃ¯Â¿Â½ etkinleÃ¯Â¿Â½tir
    offCtx.imageSmoothingEnabled = true;
    offCtx.imageSmoothingQuality = 'high';

    if (bgLayer) {
        // KanvasÃ¯Â¿Â½n HD Ã¯Â¿Â½Ã¯Â¿Â½zÃ¯Â¿Â½nÃ¯Â¿Â½rlÃ¯Â¿Â½k oranÃ¯Â¿Â½nÃ¯Â¿Â½ al (DPR)
        const dprCanvasX = canvas.width / canvas.getBoundingClientRect().width;
        const dprCanvasY = canvas.height / canvas.getBoundingClientRect().height;

        // PDF koordinatlarÃ¯Â¿Â½nÃ¯Â¿Â½ tabletin piksel yoÃ¯Â¿Â½unluÃ¯Â¿Â½una gÃ¯Â¿Â½re kusursuz olarak eÃ¯Â¿Â½itle
        const sX = (bgLayer.width / bgLayer.offsetWidth) / dprCanvasX;
        const sY = (bgLayer.height / bgLayer.offsetHeight) / dprCanvasY;
        offCtx.drawImage(bgLayer, minX * sX, minY * sY, width * sX, height * sY, 0, 0, width, height);
    }
    offCtx.drawImage(canvas, minX, minY, width, height, 0, 0, width, height);
    const imgSrc = offCanvas.toDataURL('image/png', 1.0); // Kaliteyi en Ã¯Â¿Â½ste sabitle

    // =======================================================
    // 3. AKILLI RENK BULUCU
    // =======================================================
    let smartColor = "white";
    try {
        const cX = minX + width / 2;
        const cY = minY + height / 2;
        const centerPixel = getRealColor(cX, cY);

        const margin = 15;
        const scanPoints = [
            { x: minX - margin, y: cY },
            { x: maxX + margin, y: cY },
            { x: cX, y: minY - margin },
            { x: cX, y: maxY + margin }
        ];

        for (let p of scanPoints) {
            const px = getRealColor(p.x, p.y);
            // Renk farkÃ¯Â¿Â½nÃ¯Â¿Â½ hesapla
            const diff = Math.abs(px[0] - centerPixel[0]) + Math.abs(px[1] - centerPixel[1]) + Math.abs(px[2] - centerPixel[2]);
            if (diff > 50) {
                smartColor = `rgb(${px[0]}, ${px[1]}, ${px[2]})`;
                break;
            }
        }
    } catch (e) {
        console.warn("Renk okuma Hatası", e);
    }

    // =======================================================
    // 4. ZOOM UYUMLU, KALICI YAMA OLUÃ¯Â¿Â½TURUCU
    // =======================================================
    const patchCanvas = document.createElement('canvas');
    patchCanvas.width = width; patchCanvas.height = height;
    const pCtx = patchCanvas.getContext('2d');
    pCtx.fillStyle = smartColor;
    pCtx.beginPath();
    pCtx.moveTo(lassoPoints[0].x - minX, lassoPoints[0].y - minY);
    for (let i = 1; i < lassoPoints.length; i++) {
        pCtx.lineTo(lassoPoints[i].x - minX, lassoPoints[i].y - minY);
    }
    pCtx.closePath();
    pCtx.fill(); // Rengi boya

    const patchImg = new Image();
    patchImg.src = patchCanvas.toDataURL('image/png');
    patchImg.onload = () => {
        drawnStrokes.unshift({ // Yama her Ã¯Â¿Â½eyin EN ALTINDA kalacak Ã¯Â¿Â½ekilde baÃ¯Â¿Â½a eklenir
            type: 'image',
            imgObj: patchImg,
            x: minX, y: minY,
            width: width, height: height,
            rotation: 0,
            isBackground: true, // ZOOM YAPILDIÃ¯Â¿Â½INDA PDF Ã¯Â¿Â½LE BÃ¯Â¿Â½YÃ¯Â¿Â½MESÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½N
            isPatch: true       // SAYFA DEÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½NCE SÃ¯Â¿Â½LÃ¯Â¿Â½NMESÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½N Ã¯Â¿Â½ZEL ETÃ¯Â¿Â½KET
        });
        if (window.redrawAllStrokes) window.redrawAllStrokes();
    };

    // =======================================================
    // 5. KESTÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½NÃ¯Â¿Â½Z KOPYAYI EKRANA GETÃ¯Â¿Â½R VE OTOMATÃ¯Â¿Â½K SEÃ¯Â¿Â½
    // =======================================================
    const newImgStroke = {
        type: 'image',
        imgData: imgSrc,
        x: minX, y: minY,
        width: width, height: height,
        rotation: 0,
        isBackground: false, // KRÃ¯Â¿Â½TÃ¯Â¿Â½K: ButonlarÃ¯Â¿Â½n Ã¯Â¿Â½Ã¯Â¿Â½kmasÃ¯Â¿Â½ iÃ¯Â¿Â½in false olmalÃ¯Â¿Â½
        imgObj: null
    };

    const tempImg = new Image();
    tempImg.src = imgSrc;
    tempImg.onload = () => {

        newImgStroke.imgObj = tempImg;
        if (window.redrawAllStrokes) window.redrawAllStrokes();
    };
    boxCopies.push(newImgStroke);


    // --- TABLETTE BUTONLARIN Ã¯Â¿Â½IKMASI Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½N Ã¯Â¿Â½ART ---
    selectedItem = newImgStroke; // Yeni kestiÃ¯Â¿Â½in parÃ¯Â¿Â½ayÃ¯Â¿Â½ anÃ¯Â¿Â½nda seÃ¯Â¿Â½
    isMoving = false;            // SÃ¯Â¿Â½rÃ¯Â¿Â½kleme durumunu kapat

    // AracÃ¯Â¿Â½ 'move' yap (YukarÃ¯Â¿Â½da da yaptÃ¯Â¿Â½k ama burada da olmasÃ¯Â¿Â½ gÃ¯Â¿Â½venlidir)
    currentTool = 'move';

    if (window.redrawAllStrokes) window.redrawAllStrokes();
}


function undoLastStroke() {
    if (drawnStrokes.length > 0) {
        if (window.audio_undo) { window.audio_undo.currentTime = 0; window.audio_undo.play(); }

        // 1. Kendi listenden son Ã¯Â¿Â½izgiyi sil
                const popped = drawnStrokes.pop();

        // 3D Ã¯Â¿Â½EKÃ¯Â¿Â½LSE GERÃ¯Â¿Â½ ALIRKEN SAHNEDEN DE KALDIR
        if (popped && popped.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
            const meshToRemove = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === popped.id);
            if (meshToRemove) {
                meshToRemove.traverse((child) => {
                    if (child.isMesh || child.isLineSegments) {
                        if (child.geometry) child.geometry.dispose();
                        if (child.material) {
                            if (Array.isArray(child.material)) child.material.forEach(mat => mat.dispose());
                            else child.material.dispose();
                        }
                    }
                });
                window.Scene3D.scene.remove(meshToRemove);
                if (window.Scene3D.currentMesh === meshToRemove) window.Scene3D.currentMesh = null;
                window.Scene3D.updateHandlePositions();
            }
        }

        // YENÃ¯Â¿Â½: KAT Ã¯Â¿Â½ZÃ¯Â¿Â½ BIRAK (Undo sÃ¯Â¿Â½rasÃ¯Â¿Â½nda katlamalarÃ¯Â¿Â½ aÃ¯Â¿Â½arken iz bÃ¯Â¿Â½rak)
        if (popped && popped.isPatch === true && popped.foldLine) {
            const p1 = popped.foldLine[0];
            const p2 = popped.foldLine[1];
            // Ã¯Â¿Â½z stroke'u oluÃ¯Â¿Â½tur (Daha ince ve daha az dikkat daÃ¯Â¿Â½Ã¯Â¿Â½tÃ¯Â¿Â½cÃ¯Â¿Â½)
            const izStroke = {
                    type: 'segment',
                    p1: p1,
                    p2: p2,
                    color: 'rgba(255, 105, 180, 0.7)',
                    width: 2.5,
                    isDash: true,
                    dashPattern: [10, 5], // Kesikli
                isBackground: false
            };
            drawnStrokes.push(izStroke);
        }

        // --- CANLI SINIF: TAHTAYA "SON Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½MÃ¯Â¿Â½ SÃ¯Â¿Â½L" MESAJI GÃ¯Â¿Â½NDER ---
        if (typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ type: 'geri_al' });
        }
        // ---------------------------------------------------------

        redrawAllStrokes();

    }
}

function clearAllStrokes() {
    // 1. Ses Ã¯Â¿Â½al (varsa)
    if (drawnStrokes.length > 0) {
        if (window.audio_clear) window.audio_clear.play();
    }

    // 2. Tabletin yerel hafÃ¯Â¿Â½zasÃ¯Â¿Â½nÃ¯Â¿Â½ temizle (Arka planlarÃ¯Â¿Â½ koru)
    drawnStrokes = drawnStrokes.filter(stroke => stroke.isBackground === true);
    window.drawnStrokes = drawnStrokes;

    // ?? HEPSÃ¯Â¿Â½NÃ¯Â¿Â½ SÃ¯Â¿Â½LERKEN 3D SAHNEYÃ¯Â¿Â½ TAMAMEN SIFIRLA
    if (window.Scene3D && window.Scene3D.scene) {
        const toRemove = window.Scene3D.scene.children.filter(c => c.type === 'Mesh' || c.type === 'Group');
        toRemove.forEach(m => {
            if (m.geometry) m.geometry.dispose();
            if (m.material) {
                if (Array.isArray(m.material)) m.material.forEach(mat => mat.dispose());
                else m.material.dispose();
            }
            window.Scene3D.scene.remove(m);
        });
        window.Scene3D.currentMesh = null;
        if (typeof window.Scene3D.updateHandlePositions === 'function') window.Scene3D.updateHandlePositions();
    }

    // 3. TarayÃ¯Â¿Â½cÃ¯Â¿Â½daki eski kayÃ¯Â¿Â½tlarÃ¯Â¿Â½ temizle (EÃ¯Â¿Â½er PC veya Tablette localStorage kullanÃ¯Â¿Â½yorsan)
    if (window.localStorage) {
        window.localStorage.removeItem('drawnStrokes');
    }

    // 4. PC'ye "hepsini_sil" komutunu gÃ¯Â¿Â½nder
    if (typeof isConnected !== 'undefined' && isConnected) {
        window.sendNetworkData({ type: 'hepsini_sil' });
        console.log("Temizleme komutu PC'ye gÃ¯Â¿Â½nderildi.");
    }

    // 5. Harf sayacÃ¯Â¿Â½nÃ¯Â¿Â½ sÃ¯Â¿Â½fÃ¯Â¿Â½rla
    nextPointChar = 'A';
    window.nextPointChar = 'A';

    // 6. EkranÃ¯Â¿Â½ tamamen yenile
    if (typeof redrawAllStrokes === 'function') {
        redrawAllStrokes();
    }
}

function findHit(pos) {
    for (let i = drawnStrokes.length - 1; i >= 0; i--) {
        const stroke = drawnStrokes[i];

        if (stroke.type === 'image') {
            const halfW = stroke.width / 2;
            const halfH = stroke.height / 2;
            const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

            // --- KRÃ¯Â¿Â½TÃ¯Â¿Â½K DÃ¯Â¿Â½ZELTME: Resmin gerÃ¯Â¿Â½ek merkezini hesapla ---
            const centerX = stroke.x + halfW;
            const centerY = stroke.y + halfH;

            // --- A. DÃ¯Â¿Â½NDÃ¯Â¿Â½RME KULPU (Rotate Handle) ALGILAMA ---
            const handleDist = halfH + 30;
            const rotX = centerX + Math.sin(angleRad) * handleDist;
            const rotY = centerY - Math.cos(angleRad) * handleDist;

            if (distance(pos, { x: rotX, y: rotY }) < 25) {
                return { item: stroke, pointKey: 'image_rotate' };
            }

            // --- B. BOYUTLANDIRMA KULPU (Resize Handle) ---
            const resLocalX = halfW * Math.cos(angleRad) - halfH * Math.sin(angleRad);
            const resLocalY = halfW * Math.sin(angleRad) + halfH * Math.cos(angleRad);
            const resX = centerX + resLocalX;
            const resY = centerY + resLocalY;

            if (distance(pos, { x: resX, y: resY }) < 25) {
                return { item: stroke, pointKey: 'image_resize' };
            }

            // --- C. RESÃ¯Â¿Â½M GÃ¯Â¿Â½VDESÃ¯Â¿Â½ (TaÃ¯Â¿Â½Ã¯Â¿Â½ma) ---
            const dx = pos.x - centerX;
            const dy = pos.y - centerY;
            const localClickX = dx * Math.cos(-angleRad) - dy * Math.sin(-angleRad);
            const localClickY = dx * Math.sin(-angleRad) + dy * Math.cos(-angleRad);

            if (localClickX > -halfW && localClickX < halfW && localClickY > -halfH && localClickY < halfH) {
                return { item: stroke, pointKey: 'self' };
            }
        }

        // --- 3D Ã¯Â¿Â½EKÃ¯Â¿Â½L BUTON VE GÃ¯Â¿Â½VDE SENSÃ¯Â¿Â½RÃ¯Â¿Â½ (KUSURSUZ) ---
        if (stroke.type === '3d_shape') {
            const cX = stroke.x + stroke.width / 2;
            const cY = stroke.y + stroke.height / 2;
            const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

            if (currentTool === 'move' && selectedItem === stroke) {
                // YeÃ¯Â¿Â½il (DÃ¯Â¿Â½ndÃ¯Â¿Â½rme)
                const rotY = -stroke.height / 2 - 40;
                const rotX_world = cX + Math.sin(angleRad) * Math.abs(rotY);
                const rotY_world = cY - Math.cos(angleRad) * Math.abs(rotY);
                if (distance(pos, { x: rotX_world, y: rotY_world }) < 35) return { item: stroke, pointKey: 'image_rotate' };

                // Pembe (BoyutlandÃ¯Â¿Â½rma)
                const resX_local = stroke.width / 2 + 20;
                const resY_local = stroke.height / 2 + 20;
                const resX_world = cX + (resX_local * Math.cos(angleRad) - resY_local * Math.sin(angleRad));
                const resY_world = cY + (resX_local * Math.sin(angleRad) + resY_local * Math.cos(angleRad));
                if (distance(pos, { x: resX_world, y: resY_world }) < 35) return { item: stroke, pointKey: 'image_resize' };
            }

            // ?? 3D Ã¯Â¿Â½eklin TÃ¯Â¿Â½m GÃ¯Â¿Â½vdesini Yakala (TaÃ¯Â¿Â½Ã¯Â¿Â½ma BaÃ¯Â¿Â½lasÃ¯Â¿Â½n ve Butonlar Ã¯Â¿Â½Ã¯Â¿Â½ksÃ¯Â¿Â½n)
            if (distance(pos, { x: cX, y: cY }) < Math.max(stroke.width, stroke.height) + 30) {
                return { item: stroke, pointKey: 'self' };
            }
        }

        if (currentTool === 'move' && selectedItem === stroke) {
            if (stroke.type === 'polygon') {
                const rotateHandlePos = window.PolygonTool.getRotateHandlePosition(stroke);
                const resizeHandlePos = window.PolygonTool.getResizeHandlePosition(stroke);

                const dRot = distance(pos, rotateHandlePos);
                const dRes = distance(pos, resizeHandlePos);

                // ?? PEMBE VE YEÃ¯Â¿Â½Ã¯Â¿Â½L BUTON Ã¯Â¿Â½AKIÃ¯Â¿Â½MA ZIRHI (Ã¯Â¿Â½ncelik en yakÃ¯Â¿Â½n olana verilir)
                if (dRes < 35 && dRes <= dRot) return { item: stroke, pointKey: 'resize' };
                if (dRot < 35) return { item: stroke, pointKey: 'rotate' };
            }
        }


        // --- DÃ¯Â¿Â½KDÃ¯Â¿Â½RTGEN YAKALAMA (TABLET UYUMLU) ---
        if (stroke.type === 'rectangle') {
            const centerX = stroke.x + stroke.width / 2;
            const centerY = stroke.y + stroke.height / 2;
            const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

            // A. DÃ¯Â¿Â½ndÃ¯Â¿Â½rme Butonu (YeÃ¯Â¿Â½il - Ã¯Â¿Â½stte)
            const rotX = centerX + Math.sin(angleRad) * (stroke.height / 2 + 35);
            const rotY = centerY - Math.cos(angleRad) * (stroke.height / 2 + 35);
            if (distance(pos, { x: rotX, y: rotY }) < 30) return { item: stroke, pointKey: 'image_rotate' };

            // B. BoyutlandÃ¯Â¿Â½rma Butonu (Pembe - SaÃ¯Â¿Â½ Alt)
            const resX = centerX + (stroke.width / 2 * Math.cos(angleRad) - stroke.height / 2 * Math.sin(angleRad));
            const resY = centerY + (stroke.width / 2 * Math.sin(angleRad) + stroke.height / 2 * Math.cos(angleRad));
            if (distance(pos, { x: resX, y: resY }) < 30) return { item: stroke, pointKey: 'image_resize' };

            // C. KÃ¯Â¿Â½Ã¯Â¿Â½eler (90 Derece AÃ¯Â¿Â½Ã¯Â¿Â½ GÃ¯Â¿Â½sterme - 30px hassasiyet)
            const corners = [
                { x: -stroke.width / 2, y: -stroke.height / 2 }, { x: stroke.width / 2, y: -stroke.height / 2 },
                { x: stroke.width / 2, y: stroke.height / 2 }, { x: -stroke.width / 2, y: stroke.height / 2 }
            ];
            for (let c of corners) {
                const cornerX = centerX + (c.x * Math.cos(angleRad) - c.y * Math.sin(angleRad));
                const cornerY = centerY + (c.x * Math.sin(angleRad) + c.y * Math.cos(angleRad));
                if (distance(pos, { x: cornerX, y: cornerY }) < 30) return { item: stroke, pointKey: 'toggle_angles' };
            }

            // D. GÃ¯Â¿Â½vde (Merkezden TaÃ¯Â¿Â½Ã¯Â¿Â½ma)
            const dx = pos.x - centerX;
            const dy = pos.y - centerY;
            const localX = dx * Math.cos(-angleRad) - dy * Math.sin(-angleRad);
            const localY = dx * Math.sin(-angleRad) + dy * Math.cos(-angleRad);
            if (Math.abs(localX) < stroke.width / 2 && Math.abs(localY) < stroke.height / 2) {
                return { item: stroke, pointKey: 'self' };
            }
        }

        if (currentTool === 'move' || currentTool === 'fill') { // Fill iÃ¯Â¿Â½in de hit gerekli
            if (stroke.type === 'polygon' && stroke.vertices) {
                for (let j = 0; j < stroke.vertices.length; j++) {
                    if (distance(pos, stroke.vertices[j]) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'toggle_angles' };
                }
                for (let j = 0; j < stroke.vertices.length; j++) {
                    const v1 = stroke.vertices[j];
                    const v2 = stroke.vertices[(j + 1) % stroke.vertices.length];
                    const lineLength = distance(v1, v2);
                    const steps = Math.max(1, Math.floor(lineLength / 5));
                    let hitEdge = false;
                    for (let step = 1; step < steps; step++) {
                        const t = step / steps;
                        const sampleX = v1.x + (v2.x - v1.x) * t;
                        const sampleY = v1.y + (v2.y - v1.y) * t;
                        if (distance({ x: sampleX, y: sampleY }, pos) < SNAP_THRESHOLD) { hitEdge = true; break; }
                    }
                    if (hitEdge) return { item: stroke, pointKey: 'toggle_edges' };
                }
            }

            if (stroke.type === 'rectangle') {
                const centerX = stroke.x + stroke.width / 2;
                const centerY = stroke.y + stroke.height / 2;
                const angleRad = (stroke.rotation || 0) * (Math.PI / 180);

                // A. DÃ¯Â¿Â½ndÃ¯Â¿Â½rme Butonu (YeÃ¯Â¿Â½il)
                const rotX = centerX + Math.sin(angleRad) * (stroke.height / 2 + 30);
                const rotY = centerY - Math.cos(angleRad) * (stroke.height / 2 + 30);
                if (distance(pos, { x: rotX, y: rotY }) < 20) return { item: stroke, pointKey: 'image_rotate' };

                // B. BoyutlandÃ¯Â¿Â½rma Butonu (Pembe)
                const resX = centerX + (stroke.width / 2 * Math.cos(angleRad) - stroke.height / 2 * Math.sin(angleRad));
                const resY = centerY + (stroke.width / 2 * Math.sin(angleRad) + stroke.height / 2 * Math.cos(angleRad));
                if (distance(pos, { x: resX, y: resY }) < 20) return { item: stroke, pointKey: 'image_resize' };

                // C. KÃ¯Â¿Â½Ã¯Â¿Â½eye TÃ¯Â¿Â½klama (AÃ¯Â¿Â½Ã¯Â¿Â½ GÃ¯Â¿Â½sterme)
                if (distance(pos, { x: stroke.x, y: stroke.y }) < 20) return { item: stroke, pointKey: 'toggle_angles' };

                // D. GÃ¯Â¿Â½vdeden Tutma (Merkezden TaÃ¯Â¿Â½Ã¯Â¿Â½ma)
                const dx = pos.x - centerX; const dy = pos.y - centerY;
                const localX = dx * Math.cos(-angleRad) - dy * Math.sin(-angleRad);
                const localY = dx * Math.sin(-angleRad) + dy * Math.cos(-angleRad);
                if (Math.abs(localX) < stroke.width / 2 && Math.abs(localY) < stroke.height / 2) {
                    return { item: stroke, pointKey: 'self' };
                }
            } if (stroke.type === 'arc' && stroke.cx) {
                const distToCenter = distance(pos, { x: stroke.cx, y: stroke.cy });
                if (Math.abs(distToCenter - stroke.radius) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'toggle_circle_info' };
            }
        }

        if (stroke.type === 'point') {
            if (distance(pos, stroke) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'self' };
        }
        if (stroke.p1 && distance(pos, stroke.p1) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'p1' };
        if (stroke.p2 && distance(pos, stroke.p2) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'p2' };
        if (stroke.type === 'arc' && stroke.cx && distance(pos, { x: stroke.cx, y: stroke.cy }) < SNAP_THRESHOLD) return { item: stroke, pointKey: 'center' };
        // ?? Ã¯Â¿Â½OKGEN MERKEZÃ¯Â¿Â½NDEN TUTMA HASSASÃ¯Â¿Â½YETÃ¯Â¿Â½NÃ¯Â¿Â½ ARTIR (TABLET Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½N)
        if (stroke.type === 'polygon' && stroke.center && distance(pos, stroke.center) < 50) return { item: stroke, pointKey: 'center' };
    }
    return null;
}

// Global atamalar
window.redrawAllStrokes = redrawAllStrokes;
window.advanceChar = advanceChar;
window.distance = distance;


// --- ARAÃ¯Â¿Â½ SEÃ¯Â¿Â½Ã¯Â¿Â½MÃ¯Â¿Â½ (TAMAMEN DÃ¯Â¿Â½ZELTÃ¯Â¿Â½LMÃ¯Â¿Â½Ã¯Â¿Â½ VERSÃ¯Â¿Â½YON) ---
function setActiveTool(tool) {
    // Oyunlar menÃ¯Â¿Â½sÃ¯Â¿Â½nÃ¯Â¿Â½ her araÃ¯Â¿Â½ deÃ¯Â¿Â½iÃ¯Â¿Â½iminde kapat ve inline olarak gizle
    if (oyunlarOptions) {
        oyunlarOptions.classList.add('hidden');
        oyunlarOptions.style.display = 'none';
    }
    if (oyunlarButton) oyunlarButton.classList.remove('active');

    // Mevcut butonlarÃ¯Â¿Â½n aktifliÃ¯Â¿Â½ini temizle
    penButton.classList.remove('active');
    if (akilliPenButton) akilliPenButton.classList.remove('active');
    eraserButton.classList.remove('active');
    lineButton.classList.remove('active');
    pointButton.classList.remove('active');
    straightLineButton.classList.remove('active');
    infinityLineButton.classList.remove('active');
    segmentButton.classList.remove('active');
    rayButton.classList.remove('active');
    // Fiziksel araÃ¯Â¿Â½ butonlarÃ¯Â¿Â½nÃ¯Â¿Â½n aktifliÃ¯Â¿Â½i baÃ¯Â¿Â½Ã¯Â¿Â½msÃ¯Â¿Â½z yÃ¯Â¿Â½netilir
    polygonButton.classList.remove('active');
    circleButton.classList.remove('active');
    moveButton.classList.remove('active');
    if (fillButton) fillButton.classList.remove('active');
    if (animateButton) animateButton.classList.remove('active');

    // Ã¯Â¿Â½mleÃ¯Â¿Â½leri temizle
    body.classList.remove('cursor-pen', 'cursor-eraser', 'cursor-snapshot');
    if (eraserPreview) eraserPreview.style.display = 'none';

    // Yeni aracÃ¯Â¿Â½ ayarla
    currentTool = tool;

    // SeÃ¯Â¿Â½ilen aracÃ¯Â¿Â½n Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½nÃ¯Â¿Â½ yak
    if (tool === 'pen') {
        penButton.classList.add('active');
        body.classList.add('cursor-pen');
    } else if (tool === 'eraser') {
        eraserButton.classList.add('active');
        body.classList.add('cursor-eraser');
    }

    if (eraserPreview) eraserPreview.style.display = 'none';

    // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: CSS Ã¯Â¿Â½ncelik Ã¯Â¿Â½eliÃ¯Â¿Â½kisini aÃ¯Â¿Â½mak iÃ¯Â¿Â½in gizlenen tÃ¯Â¿Â½m menÃ¯Â¿Â½leri inline (none) yapÃ¯Â¿Â½yoruz
    if (polygonOptions) {
        polygonOptions.classList.add('hidden');
        polygonOptions.style.display = 'none';
    }

    // Ã¯Â¿Â½izgi menÃ¯Â¿Â½sÃ¯Â¿Â½nÃ¯Â¿Â½, SADECE yeni seÃ¯Â¿Â½ilen araÃ¯Â¿Â½ bir Ã¯Â¿Â½izgi aracÃ¯Â¿Â½ DEÃ¯Â¿Â½Ã¯Â¿Â½LSE inline olarak mÃ¯Â¿Â½hÃ¯Â¿Â½rle
    const isLineTool = ['point', 'straightLine', 'line', 'segment', 'ray'].includes(tool);
    if (!isLineTool && lineOptions) {
        lineOptions.classList.add('hidden');
        lineOptions.style.display = 'none';
    }

    if (fillOptions) {
        fillOptions.classList.add('hidden');
        fillOptions.style.display = 'none';
    }

    if (penOptions) {
        penOptions.classList.add('hidden');
        penOptions.style.display = 'none';
    }

    if (typeof snapshotOptions !== 'undefined' && snapshotOptions) {
        snapshotOptions.classList.add('hidden');
        snapshotOptions.style.display = 'none';
    }

    // ?? Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M 1: Kalem menÃ¯Â¿Â½sÃ¯Â¿Â½nÃ¯Â¿Â½ kesin olarak gizle
    if (penOptions) { penOptions.classList.add('hidden'); penOptions.style.display = 'none'; }

    // ... diÃ¯Â¿Â½er gizleme kodlarÃ¯Â¿Â½ buradadÃ¯Â¿Â½r ...
    penOptions.classList.add('hidden');

    // AÃ¯Â¿Â½AÃ¯Â¿Â½IDAKÃ¯Â¿Â½ BLOKU EKLÃ¯Â¿Â½YORSUN:
    if (typeof snapshotOptions !== 'undefined' && snapshotOptions) {
        snapshotOptions.classList.add('hidden');
        snapshotOptions.style.display = 'none';
    }
    // ...

    // DeÃ¯Â¿Â½iÃ¯Â¿Â½kenleri sÃ¯Â¿Â½fÃ¯Â¿Â½rla
    isDrawing = false;
    lineStartPoint = null;
    isDrawingLine = false;
    isDrawingInfinityLine = false;
    isDrawingSegment = false;
    isDrawingRay = false;

    // --- BURAYA DÃ¯Â¿Â½KDÃ¯Â¿Â½RTGEN SIFIRLAMASINI EKLEYÃ¯Â¿Â½N ---
    isDrawingRectangle = false;
    rectStartPoint = null;

    window.tempPolygonData = null;
    polygonPreviewLabel.classList.add('hidden');

    // Fiziksel araÃ¯Â¿Â½lar baÃ¯Â¿Â½Ã¯Â¿Â½msÃ¯Â¿Â½z Ã¯Â¿Â½alÃ¯Â¿Â½Ã¯Â¿Â½tÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½ iÃ¯Â¿Â½in setActiveTool iÃ¯Â¿Â½erisinde gizlenmez.

    if (snapIndicator) snapIndicator.style.display = 'none';

    // EtkileÃ¯Â¿Â½imleri kapat
    if (window.RulerTool) window.RulerTool.interactionMode = 'none';
    if (window.GonyeTool) window.GonyeTool.interactionMode = 'none';
    if (window.AciolcerTool) window.AciolcerTool.interactionMode = 'none';
    if (window.PergelTool) window.PergelTool.interactionMode = 'none';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redrawAllStrokes();

    // 2. Yeni aracÃ¯Â¿Â½ aktif et
    currentTool = tool;

    // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: SeÃ¯Â¿Â½ilen araÃ¯Â¿Â½ 3D deÃ¯Â¿Â½ilse, 3D modunu tamamen kapat! (Ã¯Â¿Â½okgen Ã¯Â¿Â½izerken 3D Ã¯Â¿Â½izmesini engeller)
    if (!tool || !tool.startsWith('draw_3d_')) {
        window.active3DShapeTool = null;
        if (window.Scene3D) {
            window.Scene3D.activeTool = 'none';
        }
    }

    if (tool === 'pen') {
        penButton.classList.add('active');
        body.classList.add('cursor-pen');
        if (typeof penOptions !== 'undefined' && penOptions) {
            penOptions.classList.remove('hidden');
            penOptions.style.display = 'flex';
            penOptions.style.zIndex = '9999';
            if (penButton) penOptions.style.top = `${penButton.getBoundingClientRect().top - penButton.parentElement.getBoundingClientRect().top}px`;
        }
    } else if (tool === 'eraser') {
        eraserButton.classList.add('active');
        body.classList.add('cursor-eraser');
    } else if (tool === 'snapshot') {
        if (animateButton) animateButton.classList.add('active');
        if (btnSnapshotMain) btnSnapshotMain.classList.add('active'); // ?? EKLENDÃ¯Â¿Â½
        body.classList.add('cursor-snapshot');

        // ?? Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M 1: CanlandÃ¯Â¿Â½r alt menÃ¯Â¿Â½sÃ¯Â¿Â½nÃ¯Â¿Â½ KESÃ¯Â¿Â½N OLARAK aÃ¯Â¿Â½ ve hizala!
        if (typeof snapshotOptions !== 'undefined' && snapshotOptions) {
            snapshotOptions.classList.remove('hidden');
            snapshotOptions.style.display = 'flex';
            snapshotOptions.style.zIndex = '10000'; // ?? Z-index deÃ¯Â¿Â½eri yÃ¯Â¿Â½kseltildi
            const refBtn = btnSnapshotMain || animateButton; // ?? EKLENDÃ¯Â¿Â½
            if (refBtn) snapshotOptions.style.top = `${refBtn.getBoundingClientRect().top - refBtn.parentElement.getBoundingClientRect().top}px`;
        }
    }


    // --- Ã¯Â¿Â½Ã¯Â¿Â½ZGÃ¯Â¿Â½ ARAÃ¯Â¿Â½LARI GRUBU (YÃ¯Â¿Â½KSEK CSS Ã¯Â¿Â½NCELÃ¯Â¿Â½KLÃ¯Â¿Â½ GÃ¯Â¿Â½STERÃ¯Â¿Â½M) ---
    if (isLineTool && lineOptions) {
        lineOptions.classList.remove('hidden');
        lineOptions.style.display = 'flex'; // ?? Ã¯Â¿Â½izgi aracÃ¯Â¿Â½ seÃ¯Â¿Â½ildiÃ¯Â¿Â½inde gÃ¯Â¿Â½rÃ¯Â¿Â½nÃ¯Â¿Â½rlÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½ inline olarak zorla aÃ¯Â¿Â½
    }

    if (tool === 'point') {
        lineButton.classList.add('active'); // Ana buton aktif
        pointButton.classList.add('active'); // Alt buton aktif
    } else if (tool === 'straightLine') {
        lineButton.classList.add('active');
        straightLineButton.classList.add('active');
    } else if (tool === 'line') {
        lineButton.classList.add('active');
        infinityLineButton.classList.add('active');
        lineOptions.classList.remove('hidden');
    } else if (tool === 'segment') {
        lineButton.classList.add('active');
        segmentButton.classList.add('active');
        lineOptions.classList.remove('hidden');
    } else if (tool === 'ray') {
        lineButton.classList.add('active');
        rayButton.classList.add('active');
        lineOptions.classList.remove('hidden');
    }

    // --- DÃ¯Â¿Â½Ã¯Â¿Â½ER ARAÃ¯Â¿Â½LAR ---
    // --- DÃ¯Â¿Â½Ã¯Â¿Â½ER ARAÃ¯Â¿Â½LAR ---
    else if (tool === 'ruler') {
        togglePhysicalTool('ruler');
    } else if (tool === 'gonye') {
        togglePhysicalTool('gonye');
    } else if (tool === 'aciolcer') {
        togglePhysicalTool('aciolcer');
    } else if (tool === 'pergel') {
        togglePhysicalTool('pergel');
    }

    else if (tool.startsWith('draw_polygon_')) {
        polygonButton.classList.add('active');
    } else if (tool === 'move') {
        moveButton.classList.add('active');
    } else if (tool === 'fill') {
        if (fillButton) {
            fillButton.classList.add('active');
            fillOptions.classList.remove('hidden');
            fillOptions.style.display = 'flex';
            const buttonRect = fillButton.getBoundingClientRect();
            const panelRect = fillButton.parentElement.getBoundingClientRect();
            const topOffset = buttonRect.top - panelRect.top;
            fillOptions.style.top = `${topOffset}px`;
        }
    }

    redrawAllStrokes();
}
// --- BUTON OLAYLARI ---

penButton.addEventListener('click', () => setActiveTool(currentTool === 'pen' ? 'none' : 'pen'));
if (akilliPenButton) akilliPenButton.addEventListener('click', () => setActiveTool(currentTool === 'smart_pen' ? 'none' : 'smart_pen'));
eraserButton.addEventListener('click', () => setActiveTool(currentTool === 'eraser' ? 'none' : 'eraser'));


// --- FÃ¯Â¿Â½ZÃ¯Â¿Â½KSEL ARAÃ¯Â¿Â½ BUTONLARI KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½MÃ¯Â¿Â½ (TABLET ZIRHI) ---
function togglePhysicalTool(aracAdi) {
    let toolObj = null, el = null, btn = null, isDisplayBlock = false;
    if (aracAdi === 'ruler') { toolObj = window.RulerTool; el = document.querySelector('.ruler-container'); btn = rulerButton; }
    if (aracAdi === 'gonye') { toolObj = window.GonyeTool; el = document.querySelector('.gonye-container'); btn = gonyeButton; }
    if (aracAdi === 'aciolcer') { toolObj = window.AciolcerTool; el = document.querySelector('.aciolcer-container'); btn = aciolcerButton; isDisplayBlock = true; }
    if (aracAdi === 'pergel') { toolObj = window.PergelTool; el = document.getElementById('compass-container'); btn = pergelButton; isDisplayBlock = true; }

    if (!toolObj || !el) return;

    const isCurrentlyVisible = el.style.display !== 'none' && !el.classList.contains('hidden');

    if (isCurrentlyVisible) {
        // Gizle
        toolObj.hide();
        el.classList.add('hidden');
        el.style.display = 'none';
        el.style.zIndex = "-1";
        if (btn) btn.classList.remove('active');
    } else {
        // GÃ¯Â¿Â½ster
        toolObj.show();
        el.classList.remove('hidden');
        el.style.display = isDisplayBlock ? 'block' : 'flex';
        el.style.zIndex = "9999";
        if (btn) btn.classList.add('active');

        if (aracAdi === 'pergel' && toolObj.state) {
            setTimeout(() => {
                toolObj.state.rotation = 0;
                toolObj.state.radius = 150;
                if (typeof toolObj.updateTransform === 'function') toolObj.updateTransform();
                if (typeof window.araclariAgaGonder === 'function') window.araclariAgaGonder();
            }, 100);
        }

        if (window.bringToolToFront) window.bringToolToFront(el || (toolObj ? toolObj.pergelElement || toolObj.rulerElement || toolObj.gonyeElement || toolObj.aciolcerElement : null));
    }

    setTimeout(() => { if (typeof window.araclariAgaGonder === 'function') window.araclariAgaGonder(); }, 50);
}

const araciBaslat = (aracAdi) => {
    togglePhysicalTool(aracAdi);
};

const butonBagla = (btn, aracAdi) => {
    if (!btn) return;
    const tetikle = (e) => { e.preventDefault(); e.stopPropagation(); araciBaslat(aracAdi); };
    btn.addEventListener('click', tetikle);
    btn.addEventListener('touchstart', tetikle, { passive: false });
};

butonBagla(rulerButton, 'ruler');
butonBagla(gonyeButton, 'gonye');
butonBagla(aciolcerButton, 'aciolcer');
butonBagla(pergelButton, 'pergel');


undoButton.addEventListener('click', undoLastStroke);
clearAllButton.addEventListener('click', clearAllStrokes);
moveButton.addEventListener('click', () => setActiveTool(currentTool === 'move' ? 'none' : 'move'));

pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

if (prevPageBtn && nextPageBtn) {

    // Ã¯Â¿Â½nceki Sayfa (<)
    prevPageBtn.addEventListener('click', () => {
        if (currentPDF && currentPDFPage > 1) {
            currentPDFPage--;
            window.renderPDFPage(currentPDFPage);
            // ?? YENÃ¯Â¿Â½: PC'ye sayfayÃ¯Â¿Â½ deÃ¯Â¿Â½iÃ¯Â¿Â½tirmesini sÃ¯Â¿Â½yle
            if (typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'pdf_sayfa_degis', sayfa: currentPDFPage });
            }
        }
    });

    // Sonraki Sayfa (>)
    nextPageBtn.addEventListener('click', () => {
        if (currentPDF && currentPDFPage < totalPDFPages) {
            currentPDFPage++;
            window.renderPDFPage(currentPDFPage);
            // ?? YENÃ¯Â¿Â½: PC'ye sayfayÃ¯Â¿Â½ deÃ¯Â¿Â½iÃ¯Â¿Â½tirmesini sÃ¯Â¿Â½yle
            if (typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'pdf_sayfa_degis', sayfa: currentPDFPage });
            }
        }
    });
} // <-- EKSÃ¯Â¿Â½K OLAN VE HATAYA SEBEP OLAN PARANTEZ BURADA KAPANIYOR!


// --- YENÃ¯Â¿Â½: Sayfa numarasÃ¯Â¿Â½na tÃ¯Â¿Â½klayÃ¯Â¿Â½nca hÃ¯Â¿Â½zlÃ¯Â¿Â½ gitme kutusunu aÃ¯Â¿Â½ ---
if (pageCountLabel) {
    pageCountLabel.style.cursor = 'pointer'; // Fareyle Ã¯Â¿Â½zerine gelince tÃ¯Â¿Â½klanabilir el iÃ¯Â¿Â½areti Ã¯Â¿Â½Ã¯Â¿Â½ksÃ¯Â¿Â½n
    pageCountLabel.addEventListener('click', () => {
        if (!currentPDF) return;

        // --- Ã¯Â¿Â½EVÃ¯Â¿Â½RÃ¯Â¿Â½ ENTEGRASYONU ---
        let t = translations[currentLang];
        let soruMetni = t.pdf_soru.replace('{0}', totalPDFPages);

        const gitSayfa = prompt(soruMetni, currentPDFPage);
        if (gitSayfa !== null) {
            const num = parseInt(gitSayfa);
            if (num > 0 && num <= totalPDFPages) {
                currentPDFPage = num;
                window.renderPDFPage(currentPDFPage);
            } else {
                alert("GeÃ¯Â¿Â½ersiz sayfa numarasÃ¯Â¿Â½ girdiniz!"); // Ã¯Â¿Â½stersen burayÃ¯Â¿Â½ da ileride sÃ¯Â¿Â½zlÃ¯Â¿Â½Ã¯Â¿Â½e ekleyebilirsin
            }
        }
    });
}

if (uploadButton && fileInput) {
    uploadButton.onclick = () => fileInput.click();

    const cameraBtn = document.getElementById('btn-camera');
    const cameraInput = document.getElementById('camera-input');
    if (cameraBtn && cameraInput) {
        cameraBtn.onclick = () => cameraInput.click();
        cameraInput.onchange = async (e) => fileInput.onchange(e);
    }

    fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // --- DURUM A: PDF DOSYASI ---
        if (file.type === 'application/pdf') {
            const fileReader = new FileReader();
            fileReader.onload = async function () {
                // 1. AÃ¯Â¿Â½A GÃ¯Â¿Â½NDERMEK Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½N (Base64 Metni Olarak)
                const base64String = this.result;

                // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: Koca PDF dosyasÃ¯Â¿Â½nÃ¯Â¿Â½ PC'nin kendi okumasÃ¯Â¿Â½ iÃ¯Â¿Â½in aÃ¯Â¿Â½a fÃ¯Â¿Â½rlatmak yerine, 
                // Tabletin Ã¯Â¿Â½izdiÃ¯Â¿Â½i o anki yÃ¯Â¿Â½ksek Ã¯Â¿Â½Ã¯Â¿Â½zÃ¯Â¿Â½nÃ¯Â¿Â½rlÃ¯Â¿Â½klÃ¯Â¿Â½ sayfayÃ¯Â¿Â½ (resim olarak) yollayacaÃ¯Â¿Â½Ã¯Â¿Â½z.
                // Bu yÃ¯Â¿Â½zden pdf_yukle komutunu AÃ¯Â¿Â½A GÃ¯Â¿Â½NDERMEYÃ¯Â¿Â½ Ã¯Â¿Â½PTAL EDÃ¯Â¿Â½YORUZ. 
                // PC, PDF.js yÃ¯Â¿Â½kÃ¯Â¿Â½ne girmek zorunda kalmayacak.

                // 2. TABLET EKRANI Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½N (PDF.js'in anladÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½ formata geri Ã¯Â¿Â½eviriyoruz)
                const base64Data = base64String.split(',')[1];
                const binaryString = window.atob(base64Data);
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }

                try {
                    currentPDF = await pdfjsLib.getDocument(bytes).promise;
                    totalPDFPages = currentPDF.numPages;
                    currentPDFPage = 1;

                    if (pdfControls) pdfControls.classList.remove('hidden');

                    window.renderPDFPage(currentPDFPage);

                    setTimeout(() => {
                        let t = typeof translations !== 'undefined' ? translations[currentLang] : { pdf_soru: "Sayfa (1-{0}):" };
                        let soruMetni = (t.pdf_soru || "Sayfa (1-{0}):").replace('{0}', totalPDFPages);

                        const sayfaGrisi = prompt(soruMetni, "1");
                        if (sayfaGrisi !== null) {
                            const hedefSayfa = parseInt(sayfaGrisi);
                            if (hedefSayfa > 0 && hedefSayfa <= totalPDFPages) {
                                currentPDFPage = hedefSayfa;
                                window.renderPDFPage(currentPDFPage);

                                if (typeof isConnected !== 'undefined' && isConnected) {
                                    window.sendNetworkData({ type: 'pdf_sayfa_degis', sayfa: currentPDFPage });
                                }
                            }
                        }
                    }, 500);

                } catch (error) {
                    console.error("PDF aÃ¯Â¿Â½Ã¯Â¿Â½lÃ¯Â¿Â½rken hata oluÃ¯Â¿Â½tu:", error);
                }
            };   // Ã¯Â¿Â½ fileReader.onload BURADA biter
            fileReader.readAsDataURL(file);
        }

        // --- DURUM B: RESÃ¯Â¿Â½M DOSYASI ---
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imgData = event.target.result;



                const img = new Image();
                img.onload = () => {
                    // --- GORUNTU SIKISTIRMA (Resizer & Compressor) ---
                    // Telefon kameralari 15-20MB resim cektigi icin agi yavaslatir.
                    // Burada resmi tahtaya gitmeden once ufaltip 150KB'a indiriyoruz!
                    const MAX_WIDTH = 1920;
                    const MAX_HEIGHT = 1920;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height = Math.round(height * (MAX_WIDTH / width));
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width = Math.round(width * (MAX_HEIGHT / height));
                            height = MAX_HEIGHT;
                        }
                    }

                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = width;
                    tempCanvas.height = height;
                    const tempCtx = tempCanvas.getContext('2d');
                    
                    // Resmi ciz
                    tempCtx.drawImage(img, 0, 0, width, height);
                    
                    // Yuksek oranda sikistir (JPEG 0.6)
                    const compressedDataUrl = tempCanvas.toDataURL('image/jpeg', 0.6); 

                    const compressedImg = new Image();
                    compressedImg.onload = () => {
                        window.addNewImageToCanvas(compressedImg, false);
                    };
                    compressedImg.src = compressedDataUrl;
                };
                img.src = imgData;
            };
            reader.readAsDataURL(file);
        }
        // Resim/Dosya islenmeden value'yu temizlemek mobil tarayicilarda File objesinin silinmesine (GC) neden olur!
        setTimeout(() => { e.target.value = ''; }, 2000); 
    };
}


function addToCanvasAsObject(img) {
    let startWidth = 400;
    if (img.width < 400) startWidth = img.width;

    let scaleFactor = startWidth / img.width;
    let startHeight = img.height * scaleFactor;

    drawnStrokes.push({
        type: 'image',
        img: img,
        // --- TAM ORTALAMA HESABI ---
        x: (canvas.width / 2) - (startWidth / 2),
        y: (canvas.height / 2) - (startHeight / 2),
        width: startWidth,
        height: startHeight,
        rotation: 0,
        isBackground: true
    });

    // --- BUTONU GÃ¯Â¿Â½STERME VE KAPATMA Ã¯Â¿Â½Ã¯Â¿Â½LEVÃ¯Â¿Â½ FONKSÃ¯Â¿Â½YONUN Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½NE ALINDI ---
    if (closePdfBtn) {
        // 1. Butonu SADECE resim eklendiÃ¯Â¿Â½inde gÃ¯Â¿Â½rÃ¯Â¿Â½nÃ¯Â¿Â½r yap
        closePdfBtn.classList.remove('hidden');
        closePdfBtn.style.display = 'flex';

        // 2. Kapatma iÃ¯Â¿Â½levini tanÃ¯Â¿Â½mla
        closePdfBtn.onclick = () => {
            // Kontrol panelini ve butonun kendisini gizle
            if (typeof pdfControls !== 'undefined' && pdfControls) {
                pdfControls.classList.add('hidden');
            }
            closePdfBtn.classList.add('hidden');
            closePdfBtn.style.display = 'none';

            // Arka plan olan tÃ¯Â¿Â½m Ã¯Â¿Â½Ã¯Â¿Â½eleri, lasso maskelerini ve yamalarÃ¯Â¿Â½ kaldÃ¯Â¿Â½r
            drawnStrokes = drawnStrokes.filter(s => !s.isBackground && !s.isPDFPage && s.type !== 'lasso-mask' && !s.isPatch);
            window.drawnStrokes = drawnStrokes;

            // DeÃ¯Â¿Â½iÃ¯Â¿Â½kenleri sÃ¯Â¿Â½fÃ¯Â¿Â½rla
            currentPDF = null;
            if (typeof pdfImageStroke !== 'undefined') pdfImageStroke = null;

            // EkranÃ¯Â¿Â½ temizle ve kalan Ã¯Â¿Â½izimleri tekrar Ã¯Â¿Â½iz
            redrawAllStrokes();
        };
    }

    redrawAllStrokes();
}


if (fillButton) fillButton.addEventListener('click', () => setActiveTool(currentTool === 'fill' ? 'none' : 'fill'));
if (fillColorBoxes) {
    fillColorBoxes.forEach(box => {
        const handler = (e) => {
            e.stopPropagation();
            fillColorBoxes.forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
            currentFillColor = e.target.dataset.color || e.target.style.backgroundColor;
            setActiveTool('fill');
        };
        box.addEventListener('click', handler);
        box.addEventListener('touchstart', handler, { passive: false });
    });
    if (fillColorBoxes.length > 0) { fillColorBoxes[0].classList.add('selected'); currentFillColor = fillColorBoxes[0].dataset.color || fillColorBoxes[0].style.backgroundColor; }
}

colorBoxes.forEach(box => {
    box.addEventListener('click', (e) => {
        colorBoxes.forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        currentPenColor = e.target.style.backgroundColor;
    });
});
colorBoxes[0].classList.add('selected');
currentPenColor = colorBoxes[0].style.backgroundColor;

lineButton.addEventListener('click', () => {
    if (lineButton.classList.contains('active')) { setActiveTool('none'); }
    else {
        setActiveTool('none');
        lineOptions.classList.remove('hidden'); lineOptions.style.display = 'flex'; lineButton.classList.add('active');
        const buttonRect = lineButton.getBoundingClientRect();
        const panelRect = lineButton.parentElement.getBoundingClientRect();
        lineOptions.style.top = `${buttonRect.top - panelRect.top}px`;
    }
});

// Ã¯Â¿Â½okgen Renk SeÃ¯Â¿Â½imi (VarsayÃ¯Â¿Â½lan Beyaz)
if (polygonColorOptions.length > 0) {
    polygonColorOptions[0].classList.add('selected');
    window.currentLineColor = polygonColorOptions[0].dataset.color || '#FFFFFF';

    polygonColorOptions.forEach(box => {
        const handleColorSelect = (e) => {
            e.stopPropagation(); e.preventDefault();
            polygonColorOptions.forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
            const color = e.target.dataset.color || e.target.style.backgroundColor;
            window.currentLineColor = color;
            try { if (window.audio_select) { window.audio_select.currentTime = 0; window.audio_select.play(); } else if (window.audio_click) { window.audio_click.currentTime = 0; window.audio_click.play(); } } catch (err) { }
        };
        box.addEventListener('click', handleColorSelect);
        box.addEventListener('touchstart', handleColorSelect, { passive: false });
    });
}

polygonButton.addEventListener('click', () => {
    if (polygonButton.classList.contains('active')) { setActiveTool('none'); }
    else {
        setActiveTool('none');
        polygonOptions.classList.remove('hidden'); polygonOptions.style.display = 'flex'; polygonButton.classList.add('active');
        const buttonRect = polygonButton.getBoundingClientRect();
        const panelRect = polygonButton.parentElement.getBoundingClientRect();
        const menuHeight = polygonOptions.offsetHeight;
        const windowHeight = window.innerHeight;
        const margin = 10;
        let topOffset = buttonRect.top - panelRect.top;
        if (buttonRect.top + menuHeight > (windowHeight - margin)) {
            topOffset = (windowHeight - menuHeight - margin) - panelRect.top;
        }
        polygonOptions.style.top = `${topOffset}px`;
    }
});

// --- OYUNLAR MENÃ¯Â¿Â½SÃ¯Â¿Â½: YUKARI AÃ¯Â¿Â½ILAN, SEVÃ¯Â¿Â½MLÃ¯Â¿Â½ VE SÃ¯Â¿Â½LGÃ¯Â¿Â½ KAPATAN SÃ¯Â¿Â½STEM ---
oyunlarButton.addEventListener('click', (e) => {
    e.stopPropagation();

    if (oyunlarButton.classList.contains('active')) {
        oyunlarOptions.classList.add('hidden');
        oyunlarButton.classList.remove('active');
    } else {
        // 1. DÃ¯Â¿Â½Ã¯Â¿Â½ER ARAÃ¯Â¿Â½LARI VE SÃ¯Â¿Â½LGÃ¯Â¿Â½YÃ¯Â¿Â½ KAPAT (IÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½nÃ¯Â¿Â½ sÃ¯Â¿Â½ndÃ¯Â¿Â½rÃ¯Â¿Â½r)
        if (typeof setActiveTool === 'function') setActiveTool('none');

        oyunlarOptions.innerHTML = ''; // Ã¯Â¿Â½Ã¯Â¿Â½eriÃ¯Â¿Â½i temizle

        // 2. MENÃ¯Â¿Â½ GÃ¯Â¿Â½RÃ¯Â¿Â½NÃ¯Â¿Â½M AYARLARI
        oyunlarOptions.style.display = 'flex';
        oyunlarOptions.style.flexDirection = 'column';
        oyunlarOptions.style.maxHeight = '400px';
        oyunlarOptions.style.overflowY = 'auto';
        oyunlarOptions.style.touchAction = 'pan-y';
        oyunlarOptions.style.WebkitOverflowScrolling = 'touch';

        // 3. KONUMU YUKARI ALAN HESAPLAMA (Ekrana sÃ¯Â¿Â½Ã¯Â¿Â½masÃ¯Â¿Â½ iÃ¯Â¿Â½in)
        const buttonRect = oyunlarButton.getBoundingClientRect();
        const panelRect = oyunlarButton.parentElement.getBoundingClientRect();
        oyunlarOptions.style.top = 'auto';
        oyunlarOptions.style.bottom = (panelRect.bottom - buttonRect.bottom) + 'px';

        // 4. KAYDIRMA Ã¯Â¿Â½PUCU (YazÃ¯Â¿Â½ Geri Geldi)
        const hint = document.createElement('div');
        hint.innerHTML = '?? Liste kaydÃ¯Â¿Â½rÃ¯Â¿Â½labilir ??';
        hint.style.cssText = `
            text-align: center; 
            color: #00ffcc; 
            font-family: 'Fredoka', sans-serif; 
            font-size: 13px; 
            padding: 12px; 
            border-bottom: 1px solid rgba(255,255,255,0.1); 
            margin-bottom: 8px; 
            font-weight: 600;
            background: rgba(0, 255, 204, 0.05);
            border-radius: 12px 12px 0 0;
        `;
        oyunlarOptions.appendChild(hint);

        // 5. OYUNLARI EKLE
        if (window.OyunListesi && window.OyunListesi.length > 0) {
            window.OyunListesi.forEach(oyun => {
                const linkElement = document.createElement('a');
                linkElement.className = 'tool-button-sub';

                // KRÃ¯Â¿Â½TÃ¯Â¿Â½K DEÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½KLÃ¯Â¿Â½K BURADA:
                // 'oyun.isim' yerine 'oyun[currentLang]' kullanÃ¯Â¿Â½yoruz.
                // EÃ¯Â¿Â½er o dilde karÃ¯Â¿Â½Ã¯Â¿Â½lÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½ yoksa (hata vermemesi iÃ¯Â¿Â½in) TÃ¯Â¿Â½rkÃ¯Â¿Â½e'yi gÃ¯Â¿Â½sterir.
                linkElement.innerText = oyun[currentLang] || oyun.tr;

                linkElement.style.cssText = `
            text-decoration: none; 
            display: block; 
            padding: 15px; 
            text-align: center; 
            color: white; 
            border-bottom: 1px solid rgba(255,255,255,0.05);
            font-family: 'Fredoka', sans-serif;
            font-size: 14px;
        `;

                let startY = 0;
                let isScrolling = false;

                linkElement.addEventListener('touchstart', (te) => {
                    startY = te.touches[0].clientY;
                    isScrolling = false;
                }, { passive: true });

                linkElement.addEventListener('touchmove', (te) => {
                    if (Math.abs(te.touches[0].clientY - startY) > 10) isScrolling = true;
                }, { passive: true });

                const linkiAc = (ae) => {
                    if (isScrolling) return;
                    ae.preventDefault();
                    ae.stopPropagation();
                    window.open(oyun.link, '_blank');

                    // Kapatma iÃ¯Â¿Â½lemi
                    oyunlarOptions.classList.add('hidden');
                    oyunlarButton.classList.remove('active');
                };

                linkElement.addEventListener('touchend', linkiAc);
                linkElement.addEventListener('click', linkiAc);
                oyunlarOptions.appendChild(linkElement);
            });
        }

        oyunlarOptions.classList.remove('hidden');
        oyunlarButton.classList.add('active');
    }
});

// --- BOÃ¯Â¿Â½LUÃ¯Â¿Â½A TIKLAYINCA KAPATMA (DOSYANIN EN ALTINA EKLEYÃ¯Â¿Â½N) ---
['pointerdown', 'touchstart', 'mousedown'].forEach(evt => {
document.addEventListener(evt, (e) => {

    if (oyunlarOptions && !oyunlarOptions.contains(e.target) && e.target !== oyunlarButton) {
        oyunlarOptions.classList.add('hidden');
        oyunlarButton.classList.remove('active');
    }
});
// 2. Ana menÃ¯Â¿Â½ kutusunun da dÃ¯Â¿Â½Ã¯Â¿Â½arÃ¯Â¿Â½daki "Ekran Kilitlerine" takÃ¯Â¿Â½lmasÃ¯Â¿Â½nÃ¯Â¿Â½ engelle:
oyunlarOptions.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
oyunlarOptions.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });
oyunlarOptions.addEventListener('wheel', (e) => e.stopPropagation(), { passive: true });

circleButton.addEventListener('click', (e) => {
    e.stopPropagation();
    setActiveTool('draw_polygon_circle');
    window.PolygonTool.handleDrawClick(null, 0);
    regularPolygonButtons.forEach(b => b.classList.remove('active'));
    circleButton.classList.add('active');
});

regularPolygonButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const sides = parseInt(e.target.dataset.sides);
        setActiveTool(`draw_polygon_${sides}_sides`);
        window.PolygonTool.handleDrawClick(null, sides);
        regularPolygonButtons.forEach(b => b.classList.remove('active'));
        circleButton.classList.remove('active');
        e.target.classList.add('active');
    });
});

pointButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (window.audio_select) window.audio_select.play();
    if (!audio_click_src_set) { audio_click.src = 'sesler/point-smooth-beep-230573.mp3'; audio_click_src_set = true; }
    setActiveTool(currentTool === 'point' ? 'none' : 'point');
});
straightLineButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); setActiveTool(currentTool === 'straightLine' ? 'none' : 'straightLine'); });
infinityLineButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); setActiveTool(currentTool === 'line' ? 'none' : 'line'); });
segmentButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); setActiveTool(currentTool === 'segment' ? 'none' : 'segment'); });
rayButton.addEventListener('click', (e) => { e.stopPropagation(); if (window.audio_select) window.audio_select.play(); setActiveTool(currentTool === 'ray' ? 'none' : 'ray'); });

lineColorOptions.forEach(box => {
    box.addEventListener('click', (e) => {
        e.stopPropagation();
        lineColorOptions.forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        const color = e.target.dataset.color || e.target.style.backgroundColor;
        window.currentLineColor = color;
    });
});
lineColorOptions[0].classList.add('selected');
window.currentLineColor = lineColorOptions[0].dataset.color || lineColorOptions[0].style.backgroundColor;

// ==========================================
// ?? NÃ¯Â¿Â½HAÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: KATMAN (Z-INDEX) VE BUTON KORUMA ZIRHI ??
// ==========================================
const katmanZirhi = document.createElement('style');
katmanZirhi.innerHTML = `
    /* 1. Ã¯Â¿Â½izim TahtasÃ¯Â¿Â½: 3D Ã¯Â¿Â½ekillerin Ã¯Â¿Â½stÃ¯Â¿Â½nde, butonlarÃ¯Â¿Â½n altÃ¯Â¿Â½nda kalmalÃ¯Â¿Â½ */
    #drawing-canvas { position: relative !important; z-index: 50 !important; background-color: transparent !important; }
    
    /* 2. 3D Sahnesi: Kalemin altÃ¯Â¿Â½nda kalmalÃ¯Â¿Â½ ki Ã¯Â¿Â½stÃ¯Â¿Â½ne Ã¯Â¿Â½izilebilsin */
    #three-container { position: absolute !important; z-index: 10 !important; pointer-events: none !important; display: block !important; }
    
    /* 3. ArayÃ¯Â¿Â½z ve Butonlar: Asla kaybolmamalarÃ¯Â¿Â½ iÃ¯Â¿Â½in en Ã¯Â¿Â½st seviyeye sabitlendi */
    .panel, .panel *, button, .tool-button, .tool-button-sub, .tool-options,
    #pen-options, #line-options, #polygon-options, #fill-options, #snapshot-options,
    #options-3d-main, #options-prizmalar, #options-piramitler, #slider-container, #info-tooltip {
        z-index: 10000 !important;
    }
`;
document.head.appendChild(katmanZirhi);

// 3D motorunun gizli kalmamasÃ¯Â¿Â½nÃ¯Â¿Â½ garantile
if (window.Scene3D && window.Scene3D.container) {
    window.Scene3D.container.style.display = 'block';
    window.Scene3D.container.classList.remove('hidden');
}

// ?????? Ã¯Â¿Â½Ã¯Â¿Â½TE KODU TAM OLARAK BURAYA, BU BOÃ¯Â¿Â½LUÃ¯Â¿Â½A YAPIÃ¯Â¿Â½TIRIYORSUN ??????

// ?? PERGEL TEPE Ã¯Â¿Â½Ã¯Â¿Â½FT TIKLAMA KESÃ¯Â¿Â½N DÃ¯Â¿Â½ZELTMESÃ¯Â¿Â½ (SIÃ¯Â¿Â½RAMA ENGELÃ¯Â¿Â½)
document.addEventListener('dblclick', (e) => {
    const hedef = e.target;
    // Ã¯Â¿Â½ift tÃ¯Â¿Â½klanan eleman pergelin tepesi mi kontrol et
    if (hedef && (hedef.id === 'compass-top' || hedef.classList.contains('compass-top') || hedef.id === 'pergel-tepe' || hedef.closest('#compass-top') || hedef.closest('.pergel-tepe') || hedef.closest('#compass-handle'))) {

        // 1. Eski dosyalardaki hatalÃ¯Â¿Â½ sÃ¯Â¿Â½Ã¯Â¿Â½rama kodunun Ã¯Â¿Â½alÃ¯Â¿Â½Ã¯Â¿Â½masÃ¯Â¿Â½nÃ¯Â¿Â½ tamamen engelle!
        e.stopImmediatePropagation();
        e.preventDefault();
        e.stopPropagation();

        // 2. Yerinden oynatmadan uÃ¯Â¿Â½larÃ¯Â¿Â½ takas et
        if (window.PergelTool && window.PergelTool.state) {
            // Pergeli iÃ¯Â¿Â½ne ucu etrafÃ¯Â¿Â½nda 180 derece dÃ¯Â¿Â½ndÃ¯Â¿Â½rerek uÃ¯Â¿Â½larÃ¯Â¿Â½ kusursuzca eÃ¯Â¿Â½ler
            window.PergelTool.state.rotation = (window.PergelTool.state.rotation || 0) + Math.PI;

            if (typeof window.PergelTool.updateTransform === 'function') {
                window.PergelTool.updateTransform();
            }
            if (typeof window.araclariAgaGonder === 'function') {
                window.araclariAgaGonder();
            }
        }
    }
}, true); // 'true' (capturing) sayesinde eski hatalÃ¯Â¿Â½ koddan Ã¯Â¿Â½NCE devreye girer ve onu iptal eder!

// ?????? PERGEL KODU BURADA BÃ¯Â¿Â½TÃ¯Â¿Â½YOR ??????

// --- app.js: CanlandÃ¯Â¿Â½r Butonu (TEK SEFERDE AÃ¯Â¿Â½ILMA VE ARD ARDA SINIRSIZ KULLANIM GARANTÃ¯Â¿Â½SÃ¯Â¿Â½) ---
if (typeof animateButton !== 'undefined' && animateButton) {
    animateButton.onclick = null;
    animateButton.ontouchstart = null;
    animateButton.addEventListener('pointerdown', toggleSnapshotMenu, { passive: false });
}
// <--- KOD DOSYASI TAM OLARAK BU PARANTEZLE BÃ¯Â¿Â½TMELÃ¯Â¿Â½DÃ¯Â¿Â½R!

// ?? NÃ¯Â¿Â½HAÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: GERÃ¯Â¿Â½EK Ã¯Â¿Â½OKLU DOKUNMATÃ¯Â¿Â½K (MULTI-TOUCH) TAKÃ¯Â¿Â½PÃ¯Â¿Â½Ã¯Â¿Â½SÃ¯Â¿Â½
window.touchCount = 0;
window.lastTouchDist = 0;
canvas.addEventListener('touchstart', (e) => { window.touchCount = e.touches.length; }, { passive: true });
canvas.addEventListener('touchend', (e) => { window.touchCount = e.touches.length; if (window.touchCount < 2) window.lastTouchDist = 0; }, { passive: true });
canvas.addEventListener('touchcancel', (e) => { window.touchCount = e.touches.length; if (window.touchCount < 2) window.lastTouchDist = 0; }, { passive: true });

// ?? GERÃ¯Â¿Â½EK MULTI-TOUCH ZOOM MOTORU (ZÃ¯Â¿Â½plamayÃ¯Â¿Â½ Engelleyen Ana Motor)
canvas.addEventListener('touchmove', (e) => {
    if (currentTool === 'move' && e.touches && e.touches.length >= 2) {
        e.preventDefault();
        e.stopPropagation();
        
        // ?? Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M 2: Ã¯Â¿Â½ift parmak zoom motoru devreye girdiÃ¯Â¿Â½inde sÃ¯Â¿Â½rÃ¯Â¿Â½klemeyi KESÃ¯Â¿Â½N olarak kapat!
        // BÃ¯Â¿Â½ylece taÃ¯Â¿Â½Ã¯Â¿Â½ma ve zoom komutlarÃ¯Â¿Â½ birbiriyle savaÃ¯Â¿Â½maz, ekran zÃ¯Â¿Â½plamaz.
        isMoving = false; 

        window.isZooming = true;
        clearTimeout(window.zoomTimer);
        window.zoomTimer = setTimeout(() => { window.isZooming = false; }, 500);

        const p1x = e.touches[0].clientX; const p1y = e.touches[0].clientY;
        const p2x = e.touches[1].clientX; const p2y = e.touches[1].clientY;
        const currentDist = Math.hypot(p1x - p2x, p1y - p2y);

        if (window.lastTouchDist > 0) {
            const delta = currentDist - window.lastTouchDist;
            const zoomStep = 1 + (delta * 0.003);
            const mainBg = drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
            
            if (mainBg) {
                const cx = mainBg.x + mainBg.width / 2;
                const cy = mainBg.y + mainBg.height / 2;
                
                drawnStrokes.forEach(bg => {
                    if (bg.isBackground === true) {
                        const bg_cx = bg.x + bg.width / 2;
                        const bg_cy = bg.y + bg.height / 2;
                        const ncx = cx + (bg_cx - cx) * zoomStep;
                        const ncy = cy + (bg_cy - cy) * zoomStep;
                        bg.width *= zoomStep; bg.height *= zoomStep;
                        bg.x = ncx - bg.width / 2; bg.y = ncy - bg.height / 2;
                    }
                });

                if (window.drawnStrokes) {
                    window.drawnStrokes.forEach(s => {
                        if (!s.isBackground && typeof window.zoomStroke === 'function') {
                            window.zoomStroke(s, zoomStep, cx, cy);
                        }
                    });
                }
                redrawAllStrokes();
                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'zoom_senkron', x: mainBg.x, y: mainBg.y, width: mainBg.width, height: mainBg.height });
                }
            }
        }
        window.lastTouchDist = currentDist;
    }
}, { passive: false });
canvas.addEventListener('pointerdown', (e) => {
    // ?? SÃ¯Â¿Â½HÃ¯Â¿Â½RLÃ¯Â¿Â½ DOKUNUÃ¯Â¿Â½ 1: Ne olursa olsun Ã¯Â¿Â½NCE tarayÃ¯Â¿Â½cÃ¯Â¿Â½nÃ¯Â¿Â½n yerleÃ¯Â¿Â½ik kaydÃ¯Â¿Â½rmasÃ¯Â¿Â½nÃ¯Â¿Â½ (titremeyi) kilitliyoruz!
    if (e.cancelable) e.preventDefault();

    // AKILLI TAHTA YAMASI VE GERÃ¯Â¿Â½YE DÃ¯Â¿Â½NÃ¯Â¿Â½K AVUÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½ (PALM) REDDÃ¯Â¿Â½:
    if (e.pointerType === 'pen') {
        // EÃ¯Â¿Â½er kÃ¯Â¿Â½sa sÃ¯Â¿Â½re Ã¯Â¿Â½nce (avuÃ¯Â¿Â½ iÃ¯Â¿Â½i yÃ¯Â¿Â½zÃ¯Â¿Â½nden) bir veya birden fazla "touch" Ã¯Â¿Â½izimi baÃ¯Â¿Â½ladÃ¯Â¿Â½ysa, onlarÃ¯Â¿Â½ anÃ¯Â¿Â½nda iptal et ve sil!
        let avucIciSilindi = false;
        while (window.drawnStrokes && window.drawnStrokes.length > 0) {
            const lastS = window.drawnStrokes[window.drawnStrokes.length - 1];
            if (lastS.type === 'pen' && lastS.pointerType === 'touch' && lastS.startTime && (Date.now() - lastS.startTime) < 1500) {
                const popped = window.drawnStrokes.pop();
                avucIciSilindi = true;
                if (typeof window.sendNetworkData === 'function' && popped && popped.id) {
                    window.sendNetworkData({ type: 'sil_belirli', id: popped.id });
                }
            } else {
                break;
            }
        }

        if (avucIciSilindi) {
            isDrawing = false; // Temizle ki alt taraftaki switch bloÃ¯Â¿Â½u kalem iÃ¯Â¿Â½in temiz bir stroke baÃ¯Â¿Â½latsÃ¯Â¿Â½n
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

        isPenActive = true;
        clearTimeout(penActiveTimer);
        // Kalem havaya kalksa bile 2 saniye boyunca eli (avuÃ¯Â¿Â½ iÃ¯Â¿Â½ini) reddetmeye devam et:
        penActiveTimer = setTimeout(() => { isPenActive = false; }, 2000);
    }
    if (e.pointerType === 'touch' && isPenActive) return;

    // --- KRÃ¯Â¿Â½TÃ¯Â¿Â½K EKLENTÃ¯Â¿Â½: HAYALET PARMAK SIFIRLAYICI ---
    if (e.isPrimary) {
        pointers.clear();
        lastDist = 0;
    }

    if (currentTool === 'lasso') {
        const pos = getPointerPos(e);
        window.isDraggingLassoPoint = true;
        currentMousePos = pos;
        window.lassoIsClosing = false;
        redrawAllStrokes(); return;
    }

    pointers.set(e.pointerId, e);
    const pos = getPointerPos(e);
    const snapPos = snapTarget || pos;
    currentMousePos = pos;

    // --- TABLET 3D Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½MÃ¯Â¿Â½: EKRANIN HAM PÃ¯Â¿Â½KSELLERÃ¯Â¿Â½NÃ¯Â¿Â½ AL ---
    let rawX = e.clientX; let rawY = e.clientY;
    if (window.touchCount > 0 && e.pointerType === 'touch') { rawX = e.clientX; rawY = e.clientY; } // PointerEvent uses clientX natively

    // ?? Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M 4: 3D Ã¯Â¿Â½ekil aÃ¯Â¿Â½Ã¯Â¿Â½kken yeÃ¯Â¿Â½il ve pembe butonlarÃ¯Â¿Â½n tÃ¯Â¿Â½klanmasÃ¯Â¿Â½nÃ¯Â¿Â½ 3D motoru Ã¯Â¿Â½almasÃ¯Â¿Â½n! Ã¯Â¿Â½ncelik zÃ¯Â¿Â½rhÃ¯Â¿Â½!
    let butonYakalandi = false;
    if (currentTool === 'move') {
        const tempHit = typeof findHit === 'function' ? findHit(pos) : null;
        if (tempHit && (tempHit.pointKey === 'image_rotate' || tempHit.pointKey === 'image_resize')) {
            butonYakalandi = true;
        }
    }

    // --- ?? KÃ¯Â¿Â½PRÃ¯Â¿Â½ 1: 3D MOTORUNA DEVRET (HIRSIZLIK KORUMALI) ---
    if (window.Scene3D && window.Scene3D.isInit && !butonYakalandi) {
        if (currentTool === 'move' || currentTool === 'select') {
            window.Scene3D.onDown(rawX, rawY);
            // ?? Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: 3D Ã¯Â¿Â½ekil seÃ¯Â¿Â½ildiÃ¯Â¿Â½inde erken dÃ¯Â¿Â½nÃ¯Â¿Â½Ã¯Â¿Â½ YAPMIYORUZ. 
            // 2D motorunun da isMoving, dragStartPos gibi taÃ¯Â¿Â½Ã¯Â¿Â½ma deÃ¯Â¿Â½iÃ¯Â¿Â½kenlerini baÃ¯Â¿Â½latmasÃ¯Â¿Â½na izin veriyoruz!
        }
        // SADECE "draw_3d" ile baÃ¯Â¿Â½layan 3D araÃ¯Â¿Â½larÃ¯Â¿Â½ seÃ¯Â¿Â½iliyse 3D motoruna izin ver!
        else if (currentTool && currentTool.startsWith('draw_3d_')) {
            let toolName = currentTool.replace('draw_3d_', '');
            window.Scene3D.setTool(toolName);
            window.Scene3D.onDown(rawX, rawY);
            return;
        }
    }

    // --- 1. FÃ¯Â¿Â½ZÃ¯Â¿Â½KSEL ARAÃ¯Â¿Â½ KONTROLÃ¯Â¿Â½ ---
    const isToolElementClicked = e.target.closest('.ruler-container, .gonye-container, .aciolcer-container, #compass-container');
    if (typeof eraserPreview !== 'undefined' && eraserPreview) eraserPreview.style.display = 'none';
    if (isToolElementClicked) {
        isDrawingLine = isDrawingInfinityLine = isDrawingSegment = isDrawingRay = false;
        lineStartPoint = null; window.tempPolygonData = null;
        if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden');
        return;
    }

    // --- 2. "TAÃ¯Â¿Â½I" MODU KONTROLÃ¯Â¿Â½ ---
    if (currentTool === 'move') {
        const hit = findHit(pos);
        if (hit) {
            drawnStrokes = drawnStrokes.filter(s => s !== hit.item); drawnStrokes.push(hit.item); window.drawnStrokes = drawnStrokes;

            // ?? ETÃ¯Â¿Â½KETLERÃ¯Â¿Â½N PC'YE GÃ¯Â¿Â½NDERÃ¯Â¿Â½LMESÃ¯Â¿Â½ (AÃ¯Â¿Â½a Sinyal Eklendi)
            if (hit.pointKey === 'toggle_edges') {
                hit.item.showEdgeLabels = !hit.item.showEdgeLabels;
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: hit.item });
                redrawAllStrokes(); return;
            }
            if (hit.pointKey === 'toggle_angles') {
                hit.item.showAngleLabels = !hit.item.showAngleLabels;
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: hit.item });
                redrawAllStrokes(); return;
            }
            if (hit.pointKey === 'toggle_circle_info') {
                hit.item.showCircleInfo = !hit.item.showCircleInfo;
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: hit.item });
                redrawAllStrokes(); return;
            }

            isMoving = true; selectedItem = hit.item; selectedPointKey = hit.pointKey; dragStartPos = pos;
            if (typeof isConnected !== 'undefined' && isConnected) window.sendNetworkData({ type: 'secimi_senkronize_et', strokeId: selectedItem.id });

            originalStartPos = {};
            if (hit.pointKey === 'self') originalStartPos = { x: hit.item.x, y: hit.item.y };
            else if (hit.pointKey === 'p1') originalStartPos = { x: hit.item.p1.x, y: hit.item.p1.y };
            else if (hit.pointKey === 'p2') originalStartPos = { x: hit.item.p2.x, y: hit.item.p2.y };
            else if (hit.pointKey === 'center') originalStartPos = { x: (hit.item.cx || hit.item.center.x), y: (hit.item.cy || hit.item.center.y) };
            else if (hit.pointKey === 'rotate' || hit.pointKey === 'resize' || hit.pointKey === 'image_resize' || hit.pointKey === 'image_rotate') {
                originalStartPos = { radius: hit.item.radius, rotation: hit.item.rotation, rotationX: hit.item.rotationX || 0, rotationY: hit.item.rotationY || 0, x: hit.item.x || (hit.item.center ? hit.item.center.x : 0), y: hit.item.y || (hit.item.center ? hit.item.center.y : 0) };
                if (selectedItem.type === 'rectangle' || selectedItem.type === 'image' || selectedItem.type === '3d_shape') { initialWidth = selectedItem.width; initialHeight = selectedItem.height; }
            }
            const itemType = hit.item.type;
            if ((itemType === 'line' || itemType === 'segment' || itemType === 'ray' || itemType === 'straightLine') && (hit.pointKey === 'p1' || hit.pointKey === 'p2')) {
                rotationPivot = (hit.pointKey === 'p1') ? hit.item.p2 : hit.item.p1; const movingPoint = (hit.pointKey === 'p1') ? hit.item.p1 : hit.item.p2; selectedItem.startRadius = distance(movingPoint, rotationPivot);
            } else rotationPivot = null;
            redrawAllStrokes(); return;
        } else {
            if (selectedItem) selectedItem.showEdgeLabels = selectedItem.showAngleLabels = selectedItem.showCircleInfo = false;
            selectedItem = null;
            if (typeof isConnected !== 'undefined' && isConnected) window.sendNetworkData({ type: 'secimi_kaldir' });
            redrawAllStrokes();
        }
    }

    if (currentTool === 'none') return;
    if (['point', 'straightLine', 'line', 'segment', 'ray'].includes(currentTool)) { if (typeof lineOptions !== 'undefined' && lineOptions) { lineOptions.classList.add('hidden'); lineOptions.style.display = 'none'; } }
    if (currentTool === 'snapshot') { snapshotStart = getPointerPos(e); return; }

    switch (currentTool) {
        case 'pen': 
        case 'smart_pen': 
            isDrawing = true; const pInfoDown = getPointerInfo(e); const pStroke = { type: 'pen', pointerType: pInfoDown.type, startTime: Date.now(), path: [{ x: snapPos.x, y: snapPos.y, p: pInfoDown.type === 'pen' ? pInfoDown.pressure : 1 }], color: currentPenColor, baseWidth: currentPenWidth, id: Date.now() + Math.random() }; drawnStrokes.push(pStroke); break;
        case 'point': isDrawing = false; const noktaObj = { type: 'point', x: snapPos.x, y: snapPos.y, label: nextPointChar, color: window.isToolThemeBlack ? '#000000' : (window.currentLineColor || '#FFFFFF'), id: Date.now() + Math.random() }; drawnStrokes.push(noktaObj); if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) window.sendNetworkData({ type: 'yeni_cizim', stroke: noktaObj }); nextPointChar = advanceChar(nextPointChar); if (typeof window.nextPointChar !== 'undefined') window.nextPointChar = nextPointChar; setTimeout(() => { if (typeof redrawAllStrokes === 'function') redrawAllStrokes(); }, 10); break;
        case 'eraser': isDrawing = false; break; // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: Silgi modunda kalem izi Ã¯Â¿Â½izilmesi tamamen yasaklandÃ¯Â¿Â½!
        case 'straightLine': if (!isDrawingLine) { isDrawingLine = true; lineStartPoint = snapPos; } break;
        case 'line': if (!isDrawingInfinityLine) { isDrawingInfinityLine = true; lineStartPoint = pos; } break;
        case 'segment': if (!isDrawingSegment) { isDrawingSegment = true; lineStartPoint = snapPos; } break;
        case 'ray': if (!isDrawingRay) { isDrawingRay = true; lineStartPoint = pos; } break;
        case 'draw_rectangle': isDrawingRectangle = true; rectStartPoint = pos; break;
        case 'draw_polygon_circle':
        case 'draw_polygon_3_sides': case 'draw_polygon_4_sides': case 'draw_polygon_5_sides':
        case 'draw_polygon_6_sides': case 'draw_polygon_7_sides': case 'draw_polygon_8_sides':
            if (!window.tempPolygonData) window.tempPolygonData = { center: null, type: 0, radius: 0, rotation: 0 };
            if (window.tempPolygonData.center === null) { window.tempPolygonData.center = snapPos; window.tempPolygonData.type = currentTool === 'draw_polygon_circle' ? 0 : parseInt(currentTool.split('_')[2]); if (window.PolygonTool) window.PolygonTool.state.isDrawing = true; if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.remove('hidden'); }
            else {
                const finalRadius = window.tempPolygonData.radius || 0; if (window.tempPolygonData.type === 0) window.PolygonTool.finalizeCircle(finalRadius); else window.PolygonTool.finalizeDraw(finalRadius, window.tempPolygonData.rotation);
                setTimeout(() => { const lastS = drawnStrokes[drawnStrokes.length - 1]; if (lastS) window.sendNetworkData({ type: 'yeni_cizim', stroke: lastS }); }, 50);
                if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden'); if (window.tempPolygonData) window.tempPolygonData.center = null;
            }
            break;
    }
}, { passive: false });

canvas.addEventListener('pointermove', (e) => {
    // ?? SÃ¯Â¿Â½HÃ¯Â¿Â½RLÃ¯Â¿Â½ DOKUNUÃ¯Â¿Â½ 2: SÃ¯Â¿Â½rÃ¯Â¿Â½kleme sÃ¯Â¿Â½rasÃ¯Â¿Â½nda ekran titremesinin 1 numaralÃ¯Â¿Â½ dÃ¯Â¿Â½Ã¯Â¿Â½manÃ¯Â¿Â½ olan zÃ¯Â¿Â½plamayÃ¯Â¿Â½ EN BAÃ¯Â¿Â½TA yok et!
    if (e.cancelable) e.preventDefault();

    const currentPointerMove = getPointerInfo(e);
    if (currentPointerMove.type === 'pen') { isPenActive = true; clearTimeout(penActiveTimer); penActiveTimer = setTimeout(() => { isPenActive = false; }, 1000); }
    else if (currentPointerMove.type === 'touch' && isPenActive) return;

    // --- PARDUS Ã¯Â¿Â½Ã¯Â¿Â½FT SÃ¯Â¿Â½NYAL ENGELLEYÃ¯Â¿Â½CÃ¯Â¿Â½ ---
    if (e.pointerType === 'mouse') { let hasTouch = false; for (let p of pointers.values()) if (p.pointerType === 'touch' || p.pointerType === 'pen') hasTouch = true; if (hasTouch) return; }
    pointers.set(e.pointerId, e);

    if (pointers.size >= 2 && currentTool === 'move') {
        // ?? Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M 3A: Zoom baÃ¯Â¿Â½larken sÃ¯Â¿Â½rÃ¯Â¿Â½klemeyi tamamen kapat!
        isMoving = false; 

        // ?? Ã¯Â¿Â½AKIÃ¯Â¿Â½MAYI Ã¯Â¿Â½NLEYÃ¯Â¿Â½CÃ¯Â¿Â½ ZIRH: EÃ¯Â¿Â½er cihaz gerÃ¯Â¿Â½ek TouchEvent destekliyorsa (touchCount >= 2),
        // yedek PointerEvent motorunu DURDUR! Aksi takdirde iki motor aynÃ¯Â¿Â½ anda Ã¯Â¿Â½alÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½p zoomu KÃ¯Â¿Â½LÃ¯Â¿Â½TLER!
        if (window.touchCount >= 2) return;

        window.isZooming = true;
        clearTimeout(window.zoomTimer);
        window.zoomTimer = setTimeout(() => { window.isZooming = false; }, 500);

        let p1x, p1y, p2x, p2y;
        const p = Array.from(pointers.values());
        if (p.length >= 2) {
            p1x = p[0].clientX; p1y = p[0].clientY; p2x = p[1].clientX; p2y = p[1].clientY;
        } else {
            return;
        }
        const currentDist = Math.hypot(p1x - p2x, p1y - p2y);
        if (lastDist > 0) {
            const delta = currentDist - lastDist; const zoomStep = 1 + (delta * 0.003);
            const bgStrokes = drawnStrokes.filter(s => s.isBackground === true);
            if (bgStrokes.length > 0) {
                const cx = bgStrokes[0].x + bgStrokes[0].width / 2;
                const cy = bgStrokes[0].y + bgStrokes[0].height / 2;
                bgStrokes.forEach(bg => { const newW = bg.width * zoomStep; const newH = bg.height * zoomStep; bg.x -= (newW - bg.width) / 2; bg.y -= (newH - bg.height) / 2; bg.width = newW; bg.height = newH; });
                if (window.drawnStrokes) window.drawnStrokes.forEach(s => { if (!s.isBackground && typeof window.zoomStroke === 'function') window.zoomStroke(s, zoomStep, cx, cy); });
                redrawAllStrokes();
                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) window.sendNetworkData({ type: 'zoom_senkron', x: bgStrokes[0].x, y: bgStrokes[0].y, width: bgStrokes[0].width, height: bgStrokes[0].height });
            }
        }
        lastDist = currentDist; return;
    }

    if (pointers.size > 1 && e.isPrimary === false) return;
    const pos = getPointerPos(e); currentMousePos = pos;

    // --- TABLET 3D Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½MÃ¯Â¿Â½: EKRANIN HAM PÃ¯Â¿Â½KSELLERÃ¯Â¿Â½NÃ¯Â¿Â½ AL ---
    let rawX = e.clientX; let rawY = e.clientY;
    if (e.targetTouches && e.targetTouches.length > 0) { rawX = e.targetTouches[0].clientX; rawY = e.targetTouches[0].clientY; }

    // --- ?? KÃ¯Â¿Â½PRÃ¯Â¿Â½ 2: 3D HAREKETÃ¯Â¿Â½ (TAÃ¯Â¿Â½IMA MOTORU ZIRHI) ---
    if (window.Scene3D && window.Scene3D.isInit) {
        // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: "TaÃ¯Â¿Â½Ã¯Â¿Â½" modundayken de Ã¯Â¿Â½eklin hareket etmesi iÃ¯Â¿Â½in 3D motoruna izin verdik.
        if (window.Scene3D.isDragging || window.Scene3D.isDrawing || window.Scene3D.isRotatingShape) {
            window.Scene3D.onMove(rawX, rawY);
            if (!window.Scene3D.isDragging) return; // TaÃ¯Â¿Â½Ã¯Â¿Â½ma iÃ¯Â¿Â½lemi iÃ¯Â¿Â½in 2D motoruna devam etmesine izin ver
        }
    }

    if (window.isImageRotating && selectedItem) { const cX = selectedItem.x + selectedItem.width / 2; const cY = selectedItem.y + selectedItem.height / 2; selectedItem.rotation = (Math.atan2(pos.y - cY, pos.x - cX) * 180 / Math.PI) + 90; window.sendNetworkData({ type: 'arac_senkron', selector: '.yuzen-kopya-container', transform: `rotate(${selectedItem.rotation}deg)` }); window.sendNetworkData({ type: 'sekil_guncelle', stroke: selectedItem }); if (window.redrawAllStrokes) window.redrawAllStrokes(); return; }
    if (window.isImageResizing && selectedItem) { const cX = selectedItem.x + selectedItem.width / 2; const cY = selectedItem.y + selectedItem.height / 2; const ratio = Math.hypot(pos.x - cX, pos.y - cY) / window.startImageDistance; selectedItem.width = window.startImageWidth * ratio; selectedItem.height = window.startImageHeight * ratio; selectedItem.x = cX - selectedItem.width / 2; selectedItem.y = cY - selectedItem.height / 2; window.sendNetworkData({ type: 'arac_senkron', selector: '.yuzen-kopya-container', width: selectedItem.width + 'px', height: selectedItem.height + 'px' }); window.sendNetworkData({ type: 'sekil_guncelle', stroke: selectedItem }); if (window.redrawAllStrokes) window.redrawAllStrokes(); return; }

    if (currentTool === 'move' && isMoving && selectedItem) {
        // ?? Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M 3B: Ekrana ikinci parmak deÃ¯Â¿Â½diÃ¯Â¿Â½i an veya Zoom iÃ¯Â¿Â½lemi devam ediyorsa
        // sÃ¯Â¿Â½rÃ¯Â¿Â½klemeyi anÃ¯Â¿Â½nda iptal ediyoruz. Bu tek parmakla taÃ¯Â¿Â½Ã¯Â¿Â½rken yaÃ¯Â¿Â½anan "zÃ¯Â¿Â½plama" sorununu tamamen bitirir.
        if (window.touchCount >= 2 || pointers.size >= 2 || window.isZooming) {
            isMoving = false;
            return;
        }

        const dx = pos.x - dragStartPos.x; const dy = pos.y - dragStartPos.y;
        if (selectedPointKey === 'self' || selectedPointKey === 'center') { 
            let oldX = 0, oldY = 0, newX = 0, newY = 0;
            if (selectedItem.type === 'arc') { 
                oldX = selectedItem.cx; oldY = selectedItem.cy;
                selectedItem.cx = originalStartPos.x + dx; selectedItem.cy = originalStartPos.y + dy; 
                newX = selectedItem.cx; newY = selectedItem.cy;
            } else if (selectedItem.center) { 
                oldX = selectedItem.center.x; oldY = selectedItem.center.y;
                selectedItem.center.x = originalStartPos.x + dx; selectedItem.center.y = originalStartPos.y + dy; 
                newX = selectedItem.center.x; newY = selectedItem.center.y;
            } else { 
                oldX = selectedItem.x; oldY = selectedItem.y;
                selectedItem.x = (originalStartPos.x || 0) + dx; selectedItem.y = (originalStartPos.y || 0) + dy; 
                newX = selectedItem.x; newY = selectedItem.y;
                // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: TaÃ¯Â¿Â½Ã¯Â¿Â½ma sÃ¯Â¿Â½rasÃ¯Â¿Â½nda 3D Ã¯Â¿Â½ekillerin originalX ve originalY deÃ¯Â¿Â½erlerini gÃ¯Â¿Â½ncelle
                if (selectedItem.originalX !== undefined) {
                    selectedItem.originalX = selectedItem.x;
                    selectedItem.originalY = selectedItem.y;
                }
            } 
            if (selectedItem.vertices) selectedItem.vertices = null; 

            if (selectedItem.isBackground === true) {
                const diffX = newX - oldX;
                const diffY = newY - oldY;
                if (window.drawnStrokes) {
                    window.drawnStrokes.forEach(s => {
                        if (s !== selectedItem && !s.isBackground) {
                            if (typeof window.moveStroke === 'function') window.moveStroke(s, diffX, diffY);
                        }
                    });
                }
                
                // ?? Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M 1: Arka plan kaydÃ¯Â¿Â½rÃ¯Â¿Â½lÃ¯Â¿Â½rken PC'ye devasa koordinatlarÃ¯Â¿Â½ gÃ¯Â¿Â½ndermek yerine,
                // Sadece ne kadar kaydÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½nÃ¯Â¿Â½ (Delta X, Delta Y) Ã¯Â¿Â½zel 'hepsini_tasi' komutuyla gÃ¯Â¿Â½nderiyoruz.
                if (typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'hepsini_tasi', dx: diffX, dy: diffY });
                }
                
                redrawAllStrokes();
                return; // ?? KRÃ¯Â¿Â½TÃ¯Â¿Â½K: Tabletin yanlÃ¯Â¿Â½Ã¯Â¿Â½ (sekil_guncelle) komutunu yollamasÃ¯Â¿Â½nÃ¯Â¿Â½ engeller!
            }
        }


        else if (selectedPointKey === 'rotate' || selectedPointKey === 'image_rotate') {
            if (selectedItem.type === '3d_shape') {
                // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: 3D Ã¯Â¿Â½ekilleri X ve Y ekseninde (Ã¯Â¿Â½ne-Arkaya ve SaÃ¯Â¿Â½a-Sola) DÃ¯Â¿Â½ndÃ¯Â¿Â½rme
                const dragDx = pos.x - dragStartPos.x;
                const dragDy = pos.y - dragStartPos.y;
                selectedItem.rotationY = (originalStartPos.rotationY || 0) + dragDx * 0.02;
                selectedItem.rotationX = (originalStartPos.rotationX || 0) + dragDy * 0.02;
                if (window.Scene3D && window.Scene3D.scene) {
                    const sceneMesh = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === selectedItem.id);
                    if (sceneMesh) {
                        sceneMesh.rotation.x = selectedItem.rotationX;
                        sceneMesh.rotation.y = selectedItem.rotationY;
                        window.Scene3D.updateHandlePositions();
                    }
                }
            } else {
                const isRect = (['rectangle', 'rect', 'image'].includes(selectedItem.type));
                const cX = isRect ? selectedItem.x + selectedItem.width / 2 : selectedItem.center.x;
                const cY = isRect ? selectedItem.y + selectedItem.height / 2 : selectedItem.center.y;
                selectedItem.rotation = (originalStartPos.rotation || 0) + (Math.atan2(pos.y - cY, pos.x - cX) - Math.atan2(dragStartPos.y - cY, dragStartPos.x - cX)) * (180 / Math.PI);
                if (selectedItem.vertices) selectedItem.vertices = null;
            }
        }
        else if (selectedPointKey === 'resize' || selectedPointKey === 'image_resize') {
            // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: 3D Ã¯Â¿Â½ekillere Ã¯Â¿Â½zel YumuÃ¯Â¿Â½ak BÃ¯Â¿Â½yÃ¯Â¿Â½tme/KÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½ltme
            if (selectedItem.type === '3d_shape') {
                const sW = initialWidth || selectedItem.width;
                const startCX = (originalStartPos.x || 0) + (sW / 2);
                const startCY = (originalStartPos.y || 0) + (sW / 2);
                const startDist = Math.hypot(dragStartPos.x - startCX, dragStartPos.y - startCY) || 1;
                const currentDist = Math.hypot(pos.x - startCX, pos.y - startCY);

                const ratio = currentDist / startDist;

                if (ratio > 0.1 && ratio < 10) { // SÃ¯Â¿Â½Ã¯Â¿Â½rama ve sonsuz bÃ¯Â¿Â½yÃ¯Â¿Â½me engellendi
                    selectedItem.width = sW * ratio;
                    selectedItem.height = sW * ratio;
                    selectedItem.x = startCX - (selectedItem.width / 2);
                    selectedItem.y = startCY - (selectedItem.height / 2);
                    
                    // ?? 1. AÃ¯Â¿Â½ SENKRONU: Pembe butonla bÃ¯Â¿Â½yÃ¯Â¿Â½tÃ¯Â¿Â½rken mÃ¯Â¿Â½hÃ¯Â¿Â½rlÃ¯Â¿Â½ deÃ¯Â¿Â½erleri de bÃ¯Â¿Â½yÃ¯Â¿Â½t ki PC bunu kabul etsin!
                    selectedItem.originalW = selectedItem.width;
                    selectedItem.originalH = selectedItem.height;
                    selectedItem.originalX = selectedItem.x;
                    selectedItem.originalY = selectedItem.y;

                    if (window.Scene3D && window.Scene3D.scene) {
                        const sceneMesh = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === selectedItem.id);
                        if (sceneMesh) {
                            const yeniScale = (selectedItem.width / 30) / sceneMesh.userData.baseSize;
                            sceneMesh.scale.set(yeniScale, yeniScale, yeniScale);
                            window.Scene3D.updateHandlePositions();
                        }
                    }
                }
            }
            // DÃ¯Â¿Â½Ã¯Â¿Â½ER (2D) Ã¯Â¿Â½EKÃ¯Â¿Â½LLERÃ¯Â¿Â½N ORÃ¯Â¿Â½JÃ¯Â¿Â½NAL KODLARI
            else if (['rectangle', 'rect', 'image'].includes(selectedItem.type)) {
                const sW = initialWidth || selectedItem.width; const sH = initialHeight || selectedItem.height; const startCX = (originalStartPos.x || 0) + (sW / 2); const startCY = (originalStartPos.y || 0) + (sH / 2); const startDist = Math.hypot(dragStartPos.x - startCX, dragStartPos.y - startCY); if (startDist > 10) { const ratio = Math.hypot(pos.x - startCX, pos.y - startCY) / startDist; selectedItem.width = sW * ratio; selectedItem.height = sH * ratio; selectedItem.x = startCX - (selectedItem.width / 2); selectedItem.y = startCY - (selectedItem.height / 2); const previewLabel = document.getElementById('polygon-preview-label'); if (previewLabel && selectedItem.type !== 'image') { const kalibrasyon = 30; previewLabel.innerText = `w: ${(selectedItem.width / kalibrasyon).toFixed(1)} cm, h: ${(selectedItem.height / kalibrasyon).toFixed(1)} cm`; previewLabel.style.left = (pos.x + 15) + 'px'; previewLabel.style.top = (pos.y - 35) + 'px'; previewLabel.style.display = 'block'; previewLabel.classList.remove('hidden'); } }
            } else {
                const startDist = Math.hypot(dragStartPos.x - selectedItem.center.x, dragStartPos.y - selectedItem.center.y); if (startDist > 0) selectedItem.radius = originalStartPos.radius * (Math.hypot(pos.x - selectedItem.center.x, pos.y - selectedItem.center.y) / startDist); if (selectedItem.vertices) selectedItem.vertices = null; const previewLabel = document.getElementById('polygon-preview-label'); if (previewLabel) { const sides = selectedItem.sideCount || selectedItem.type; let kenarPx = selectedItem.radius; if (sides >= 3) kenarPx = 2 * selectedItem.radius * Math.sin(Math.PI / sides); previewLabel.innerText = sides === 0 ? `r: ${(kenarPx / 30).toFixed(1)} cm` : `a: ${(kenarPx / 30).toFixed(1)} cm`; previewLabel.style.left = (pos.x + 15) + 'px'; previewLabel.style.top = (pos.y - 35) + 'px'; previewLabel.style.display = 'block'; previewLabel.classList.remove('hidden'); }
            }
        }
        redrawAllStrokes();
        if (typeof isConnected !== 'undefined' && isConnected) {
            // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: 3D dÃ¯Â¿Â½ndÃ¯Â¿Â½rme ve konum koordinatlarÃ¯Â¿Â½ (rotationX/Y/Z ve pos3D) sÃ¯Â¿Â½zgeÃ¯Â¿Â½ten kurtarÃ¯Â¿Â½ldÃ¯Â¿Â½, PC'ye gÃ¯Â¿Â½nderiliyor!
            window.sendNetworkData({
                type: 'sekil_guncelle',
                stroke: {
                    id: selectedItem.id,
                    type: selectedItem.type,
                    isBackground: selectedItem.isBackground === true,
                    x: selectedItem.x,
                    y: selectedItem.y,
                    width: selectedItem.width,
                    height: selectedItem.height,
                    rotation: selectedItem.rotation || 0,
                    rotationX: selectedItem.rotationX,
                    rotationY: selectedItem.rotationY,
                    rotationZ: selectedItem.rotationZ,
                    pos3D: selectedItem.pos3D,
                    radius: selectedItem.radius,
                    cx: selectedItem.cx,
                    cy: selectedItem.cy,
                    center: selectedItem.center,
                    // ?? 2. AÃ¯Â¿Â½ SENKRONU: Boyut mÃ¯Â¿Â½hÃ¯Â¿Â½rlerini PC'ye fÃ¯Â¿Â½rlatÃ¯Â¿Â½yoruz!
                    originalX: selectedItem.originalX,
                    originalY: selectedItem.originalY,
                    originalW: selectedItem.originalW,
                    originalH: selectedItem.originalH
                }
            });
            window.sendNetworkData({ type: 'secimi_senkronize_et', strokeId: selectedItem.id });
        }
        return;
    }

    if (['ruler', 'gonye', 'aciolcer', 'pergel', 'none'].includes(currentTool)) return;
    clearTimeout(snapHoverTimer);
    if (['point', 'straightLine', 'pen', 'segment'].includes(currentTool)) { const potentialSnap = findSnapPoint(pos); if (potentialSnap) { snapHoverTimer = setTimeout(() => { snapTarget = potentialSnap; snapIndicator.style.left = `${snapTarget.x}px`; snapIndicator.style.top = `${snapTarget.y}px`; snapIndicator.style.display = 'block'; }, 25); } else { snapTarget = null; snapIndicator.style.display = 'none'; } }
    if (currentTool === 'eraser') { eraserPreview.style.left = `${pos.x}px`; eraserPreview.style.top = `${pos.y}px`; eraserPreview.style.display = 'block'; } else if (typeof eraserPreview !== 'undefined' && eraserPreview) eraserPreview.style.display = 'none';

    let previewActive = false; const endPos = snapTarget || pos;
    const aktifCizimVarMi = isDrawingLine || isDrawingInfinityLine || isDrawingSegment || isDrawingRay || isDrawingRectangle || (window.tempPolygonData && window.tempPolygonData.center) || (currentTool === 'snapshot' && typeof snapshotStart !== 'undefined' && snapshotStart);

    if (aktifCizimVarMi) {
        redrawAllStrokes(); const ctx = canvas.getContext('2d'); ctx.save(); ctx.strokeStyle = window.currentLineColor || '#000000'; ctx.lineWidth = 3; ctx.setLineDash([5, 5]);

        if (['straightLine', 'line', 'segment', 'ray'].includes(currentTool) && lineStartPoint) {
            ctx.beginPath(); const dx = endPos.x - lineStartPoint.x; const dy = endPos.y - lineStartPoint.y;
            if (dx !== 0 || dy !== 0) { const devCarpan = 5000; if (currentTool === 'line') { ctx.moveTo(lineStartPoint.x - dx * devCarpan, lineStartPoint.y - dy * devCarpan); ctx.lineTo(lineStartPoint.x + dx * devCarpan, lineStartPoint.y + dy * devCarpan); } else if (currentTool === 'ray') { ctx.moveTo(lineStartPoint.x, lineStartPoint.y); ctx.lineTo(lineStartPoint.x + dx * devCarpan, lineStartPoint.y + dy * devCarpan); } else { ctx.moveTo(lineStartPoint.x, lineStartPoint.y); ctx.lineTo(endPos.x, endPos.y); } } else { ctx.moveTo(lineStartPoint.x, lineStartPoint.y); ctx.lineTo(endPos.x, endPos.y); } ctx.stroke();
        }
        else if (isDrawingRectangle && rectStartPoint) { ctx.beginPath(); ctx.rect(Math.min(rectStartPoint.x, endPos.x), Math.min(rectStartPoint.y, endPos.y), Math.abs(endPos.x - rectStartPoint.x), Math.abs(endPos.y - rectStartPoint.y)); ctx.stroke(); }
        else if (window.tempPolygonData && window.tempPolygonData.center) {
            const cx = window.tempPolygonData.center.x; const cy = window.tempPolygonData.center.y; const radius = Math.hypot(endPos.x - cx, endPos.y - cy); const angleRad = Math.atan2(endPos.y - cy, endPos.x - cx); window.tempPolygonData.radius = radius; window.tempPolygonData.rotation = angleRad * 180 / Math.PI; const sides = window.tempPolygonData.type;
            ctx.beginPath(); if (sides === 0) ctx.arc(cx, cy, radius, 0, Math.PI * 2); else if (sides >= 3) { for (let i = 0; i <= sides; i++) { const polyAngle = (i * 2 * Math.PI / sides) + angleRad; const px = cx + radius * Math.cos(polyAngle); const py = cy + radius * Math.sin(polyAngle); if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); } } ctx.stroke();
            const previewLabel = document.getElementById('polygon-preview-label'); if (previewLabel) { let kenarPx = radius; if (sides >= 3) kenarPx = 2 * radius * Math.sin(Math.PI / sides); previewLabel.innerText = sides === 0 ? `r: ${(kenarPx / 30).toFixed(1)} cm` : `a: ${(kenarPx / 30).toFixed(1)} cm`; previewLabel.style.left = (endPos.x + 15) + 'px'; previewLabel.style.top = (endPos.y - 35) + 'px'; previewLabel.style.display = 'block'; previewLabel.classList.remove('hidden'); }
        }
        else if (currentTool === 'snapshot' && snapshotStart) { ctx.strokeStyle = '#00ffcc'; ctx.beginPath(); ctx.rect(Math.min(snapshotStart.x, endPos.x), Math.min(snapshotStart.y, endPos.y), Math.abs(endPos.x - snapshotStart.x), Math.abs(endPos.y - snapshotStart.y)); ctx.stroke(); }
        ctx.restore(); previewActive = true;

        // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: Tablet dokunuÃ¯Â¿Â½larÃ¯Â¿Â½ndaki PC gÃ¯Â¿Â½nderim engelini kaldÃ¯Â¿Â½rÃ¯Â¿Â½yoruz!
        const isTouchActive = (e.touches && e.touches.length > 0) || isDrawing || aktifCizimVarMi;
        if (typeof isConnected !== 'undefined' && isConnected && (e.buttons > 0 || isTouchActive)) {
            const anlikPos = typeof getPointerPos === 'function' ? getPointerPos(e) : { x: e.clientX, y: e.clientY };
            let previewData = null;
            if (['straightLine', 'line', 'segment', 'ray'].includes(currentTool) && typeof lineStartPoint !== 'undefined' && lineStartPoint) previewData = { tool: currentTool, start: lineStartPoint, end: anlikPos };
            // ?? Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M 4 Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½N DÃ¯Â¿Â½KDÃ¯Â¿Â½RTGEN Ã¯Â¿Â½SMÃ¯Â¿Â½ DE DÃ¯Â¿Â½ZELTÃ¯Â¿Â½LDÃ¯Â¿Â½:
            else if (currentTool === 'draw_rectangle' && typeof rectStartPoint !== 'undefined' && rectStartPoint) previewData = { tool: 'draw_rectangle', start: rectStartPoint, end: anlikPos };
            // ?? Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M 3: KENAR SAYISI VE DÃ¯Â¿Â½NÃ¯Â¿Â½Ã¯Â¿Â½ AÃ¯Â¿Â½ISI AÃ¯Â¿Â½A EKLENDÃ¯Â¿Â½:
            else if (window.tempPolygonData && window.tempPolygonData.center) previewData = { tool: 'polygon', start: window.tempPolygonData.center, end: anlikPos, radius: Math.hypot(anlikPos.x - window.tempPolygonData.center.x, anlikPos.y - window.tempPolygonData.center.y), sides: window.tempPolygonData.type, rotation: Math.atan2(anlikPos.y - window.tempPolygonData.center.y, anlikPos.x - window.tempPolygonData.center.x) };
            if (previewData) window.sendNetworkData({ type: 'aktif_onizleme', arac: 'cizim_onizleme', payload: previewData });
        }
    }

    if (previewActive) return;
    if (currentTool === 'lasso') { currentMousePos = pos; if (typeof isDrawingLasso !== 'undefined' && isDrawingLasso && typeof lassoPoints !== 'undefined' && lassoPoints.length > 0) { let startPoint = lassoPoints[0]; const toleransScale = (typeof globalScale !== 'undefined' && globalScale > 0) ? globalScale : 1; window.lassoIsClosing = (Math.hypot(pos.x - startPoint.x, pos.y - startPoint.y) < (40 / toleransScale)); } redrawAllStrokes(); return; }
    if (!isDrawing) return;

    if (currentTool === 'pen' || currentTool === 'smart_pen') {
        const pInfoMove = getPointerInfo(e);
        const curStroke = drawnStrokes[drawnStrokes.length - 1];
        curStroke.path.push({ x: pos.x, y: pos.y, p: pInfoMove.type === 'pen' ? pInfoMove.pressure : 1 }); 
        redrawAllStrokes();

        // ?? CANLI Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M (LIVE INK) AKTARIMI ??
        // Kalem henÃ¯Â¿Â½z havadayken, yazÃ¯Â¿Â½lan kÃ¯Â¿Â½smÃ¯Â¿Â½n tamamÃ¯Â¿Â½ saliseler iÃ¯Â¿Â½inde PC'ye fÃ¯Â¿Â½rlatÃ¯Â¿Â½lÃ¯Â¿Â½r
        if (typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ 
                type: 'aktif_onizleme', 
                arac: 'cizim_onizleme', 
                payload: { tool: 'pen', path: curStroke.path, color: curStroke.color, baseWidth: curStroke.baseWidth } 
            });
        }
    }
}, { passive: false });


// --- POINTERUP (TÃ¯Â¿Â½M Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M VE ARAÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½LEMLERÃ¯Â¿Â½NÃ¯Â¿Â½N BÃ¯Â¿Â½TÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½) ---

canvas.addEventListener('pointerup', (e) => {
    isDrawing = false;

    // Kilitleri serbest bÃ¯Â¿Â½rak
    if (canvas.hasPointerCapture && canvas.hasPointerCapture(e.pointerId)) {
        canvas.releasePointerCapture(e.pointerId);
    }
    if (e.pointerType === 'touch' && e.cancelable) e.preventDefault();

    // --- PARDUS Ã¯Â¿Â½Ã¯Â¿Â½FT SÃ¯Â¿Â½NYAL ENGELLEYÃ¯Â¿Â½CÃ¯Â¿Â½ ---
    if (e.pointerType === 'mouse') {
        let hasTouch = false;
        for (let p of pointers.values()) {
            if (p.pointerType === 'touch' || p.pointerType === 'pen') hasTouch = true;
        }
        if (hasTouch) return;
    }

    pointers.delete(e.pointerId);
    if (pointers.size < 2) lastDist = 0;

    const finalPos = snapTarget || currentMousePos;

    // --- ?? KÃ¯Â¿Â½PRÃ¯Â¿Â½ 3: 3D Ã¯Â¿Â½Ã¯Â¿Â½LEMÃ¯Â¿Â½NÃ¯Â¿Â½ BÃ¯Â¿Â½TÃ¯Â¿Â½R VE SAHNEYE KOY ---
    if (window.Scene3D && window.Scene3D.isInit) {
        if (window.Scene3D.isDragging || window.Scene3D.isDrawing || window.Scene3D.isRotatingShape) {
            const wasDrawing = window.Scene3D.isDrawing;
            const wasDragging = window.Scene3D.isDragging;
            window.Scene3D.onUp();

            if (wasDrawing) {
                // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: "TaÃ¯Â¿Â½Ã¯Â¿Â½" (move) butonuna otomatik geÃ¯Â¿Â½meyi Ã¯Â¿Â½PTAL ettik. Sistem boÃ¯Â¿Â½ta kalÃ¯Â¿Â½r.
                window.active3DShapeTool = null;
                currentTool = 'none';
                if (typeof setActiveTool === 'function') setActiveTool('none');

                const mainBtn = document.getElementById('btn-3d-menu');
                if (mainBtn) mainBtn.classList.remove('active');

                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'onizleme_bitir' });
            }
            if (!wasDragging) return; // TaÃ¯Â¿Â½Ã¯Â¿Â½ma iÃ¯Â¿Â½lemi iÃ¯Â¿Â½in 2D motoruna devam etmesine izin ver
        }
    }


    // --- A) FÃ¯Â¿Â½ZÃ¯Â¿Â½KSEL ARAÃ¯Â¿Â½LAR (CETVEL, GÃ¯Â¿Â½NYE, PERGEL vb.) ---
    const isPhysicalTool = ['ruler', 'gonye', 'aciolcer', 'pergel'].includes(currentTool);
    if (isPhysicalTool) {
        isDrawing = false;
        if (currentTool === 'ruler' && window.RulerTool && window.RulerTool.finalizeDraw) window.RulerTool.finalizeDraw();
        if (currentTool === 'gonye' && window.GonyeTool && window.GonyeTool.finalizeDraw) window.GonyeTool.finalizeDraw();
        if (currentTool === 'aciolcer' && window.AciolcerTool && window.AciolcerTool.finalizeDraw) window.AciolcerTool.finalizeDraw();
        if (currentTool === 'pergel' && window.PergelTool && window.PergelTool.finalizeDraw) window.PergelTool.finalizeDraw();

        setTimeout(() => {
            const lastS = drawnStrokes[drawnStrokes.length - 1];
            if (lastS) {
                if (!lastS.id) lastS.id = Date.now() + Math.random();
                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'onizleme_bitir' });
                    window.sendNetworkData({ type: 'yeni_cizim', stroke: lastS });
                }
            }
        }, 50);

        redrawAllStrokes();
        return;
    }

    // --- B) TAÃ¯Â¿Â½IMA (MOVE) MANTIÃ¯Â¿Â½I ---
    if (currentTool === 'move' && isMoving) {
        isMoving = false;
        selectedPointKey = null;
        if (returnToSnapshot) {
            returnToSnapshot = false;
            setActiveTool('snapshot');
            if (typeof animateButton !== 'undefined' && animateButton) animateButton.classList.add('active');
            document.body.classList.add('cursor-snapshot');
        }
        redrawAllStrokes();
        return;
    }

    // --- C) NORMAL Ã¯Â¿Â½Ã¯Â¿Â½ZGÃ¯Â¿Â½LER (DOÃ¯Â¿Â½RU, IÃ¯Â¿Â½IN, SEGMENT) ---
    if (lineStartPoint && finalPos) {
        let strokeObj = null;
        const cizgiRengi = window.isToolThemeBlack ? '#000000' : (window.currentLineColor || '#FFFFFF');

        if (isDrawingLine) strokeObj = { type: 'straightLine', p1: lineStartPoint, p2: finalPos, color: cizgiRengi, width: 4 };
        else if (isDrawingInfinityLine) {
            const l1 = nextPointChar; const l2 = advanceChar(l1); nextPointChar = advanceChar(l2);
            strokeObj = { type: 'line', p1: lineStartPoint, p2: finalPos, color: cizgiRengi, width: 4, label1: l1, label2: l2 };
        }
        else if (isDrawingSegment) {
            const l1 = nextPointChar; const l2 = advanceChar(l1); nextPointChar = advanceChar(l2);
            strokeObj = { type: 'segment', p1: lineStartPoint, p2: finalPos, color: cizgiRengi, width: 4, label1: l1, label2: l2 };
        }
        else if (isDrawingRay) {
            const l1 = nextPointChar; const l2 = advanceChar(l1); nextPointChar = advanceChar(l2);
            strokeObj = { type: 'ray', p1: lineStartPoint, p2: finalPos, color: cizgiRengi, width: 4, label1: l1, label2: l2 };
        }

        if (strokeObj) {
            strokeObj.id = Date.now() + Math.random();
            drawnStrokes.push(strokeObj);

            // ?? SÃ¯Â¿Â½HÃ¯Â¿Â½RLÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: GerÃ¯Â¿Â½ek Ã¯Â¿Â½izimi atmadan Ã¯Â¿Â½nce Ã¯Â¿Â½nizlemeleri yokediyoruz!
            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'onizleme_bitir' });
                window.sendNetworkData({ type: 'yeni_cizim', stroke: strokeObj });
            }
            window.nextPointChar = nextPointChar;
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
    }

    // --- D) Ã¯Â¿Â½OKGENLER (POLYGON TOOL) ---
    if (currentTool && currentTool.startsWith('draw_polygon_')) {
        if (window.tempPolygonData && window.tempPolygonData.center) {
            const finalRadius = window.tempPolygonData.radius || 0;
            if (finalRadius > 5) {
                const currentType = window.tempPolygonData.type;

                if (currentType === 0) window.PolygonTool.finalizeCircle(finalRadius);
                else window.PolygonTool.finalizeDraw(finalRadius, window.tempPolygonData.rotation);

                // ?? SÃ¯Â¿Â½HÃ¯Â¿Â½RLÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: Ã¯Â¿Â½nizlemeyi anÃ¯Â¿Â½nda sildiriyoruz
                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'onizleme_bitir' });
                }

                setTimeout(() => {
                    const lastS = drawnStrokes[drawnStrokes.length - 1];
                    if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected && lastS) {
                        window.sendNetworkData({ type: 'yeni_cizim', stroke: lastS });
                    }
                }, 50);

                if (typeof polygonPreviewLabel !== 'undefined' && polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden');
                if (window.tempPolygonData) window.tempPolygonData.center = null;
                if (window.PolygonTool && window.PolygonTool.handleDrawClick) window.PolygonTool.handleDrawClick(null, currentType);
            }
        }
    }

    // --- E) CANLANDIR (KUTU SNAPSHOT) ---
    if (currentTool === 'snapshot' && snapshotStart && currentMousePos) {
        const x = Math.round(Math.min(snapshotStart.x, currentMousePos.x));
        const y = Math.round(Math.min(snapshotStart.y, currentMousePos.y));
        const w = Math.round(Math.abs(currentMousePos.x - snapshotStart.x));
        const h = Math.round(Math.abs(currentMousePos.y - snapshotStart.y));

        if (w > 10 && h > 10) {
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');

            tempCanvas.width = w; tempCanvas.height = h;

            // GÃ¯Â¿Â½rÃ¯Â¿Â½ntÃ¯Â¿Â½ netliÃ¯Â¿Â½ini en Ã¯Â¿Â½st dÃ¯Â¿Â½zeye Ã¯Â¿Â½Ã¯Â¿Â½kar
            tempCtx.imageSmoothingEnabled = true;
            tempCtx.imageSmoothingQuality = 'high';

            const bgCanvas = document.getElementById('bg-canvas');
            if (bgCanvas) tempCtx.drawImage(bgCanvas, x, y, w, h, 0, 0, w, h);
            tempCtx.drawImage(canvas, x, y, w, h, 0, 0, w, h);
            
            // ?? BEYAZ ARKA PLANI Ã¯Â¿Â½EFFAF YAPMA MANTIÃ¯Â¿Â½I: 
            // Kutu kopyasÃ¯Â¿Â½ kareli zemine vb. yapÃ¯Â¿Â½Ã¯Â¿Â½tÃ¯Â¿Â½rÃ¯Â¿Â½ldÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½nda beyazlarÃ¯Â¿Â½n alttaki Ã¯Â¿Â½izgileri Ã¯Â¿Â½rtmemesi iÃ¯Â¿Â½in
            try {
                const imgData = tempCtx.getImageData(0, 0, w, h);
                const data = imgData.data;
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    // Beyaza Ã¯Â¿Â½ok yakÃ¯Â¿Â½n olan pikselleri (Ã¯Â¿Â½rneÃ¯Â¿Â½in rgb deÃ¯Â¿Â½eri 240 ve Ã¯Â¿Â½stÃ¯Â¿Â½ olanlarÃ¯Â¿Â½) tam Ã¯Â¿Â½effaf (alpha = 0) yapÃ¯Â¿Â½yoruz
                    if (r >= 240 && g >= 240 && b >= 240) {
                        data[i + 3] = 0; 
                    }
                }
                tempCtx.putImageData(imgData, 0, 0);
            } catch (e) {
                console.warn("CORS veya resim izni nedeniyle arka plan Ã¯Â¿Â½effaflaÃ¯Â¿Â½tÃ¯Â¿Â½rÃ¯Â¿Â½lamadÃ¯Â¿Â½:", e);
            }

            const finalImage = tempCanvas.toDataURL('image/png', 1.0);

            const newImgStroke = {
                type: 'image', imgData: finalImage, x: x, y: y, width: w, height: h,
                id: Date.now() + Math.random() + 1, isBoxCopy: true, isBackground: false
            };
            drawnStrokes.push(newImgStroke);

            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'onizleme_bitir' });
                window.sendNetworkData({ type: 'yeni_cizim', stroke: newImgStroke });
            }

            if (typeof setActiveTool === 'function') setActiveTool('move');
            else currentTool = 'move';

            selectedItem = newImgStroke;
            snapshotStart = null;
            redrawAllStrokes();
        }
    }

    // --- F) DÃ¯Â¿Â½KDÃ¯Â¿Â½RTGEN ARACI ---
    if (isDrawingRectangle && rectStartPoint && finalPos) {
        const widthPx = Math.abs(finalPos.x - rectStartPoint.x);
        const heightPx = Math.abs(finalPos.y - rectStartPoint.y);

        if (widthPx > 10 && heightPx > 10) {
            const startX = Math.min(rectStartPoint.x, finalPos.x);
            const startY = Math.min(rectStartPoint.y, finalPos.y);
            const color = window.isToolThemeBlack ? '#000000' : (window.currentLineColor || '#000000');

            const rectLabels = [nextPointChar];
            for (let i = 0; i < 3; i++) { nextPointChar = advanceChar(nextPointChar); rectLabels.push(nextPointChar); }
            nextPointChar = advanceChar(nextPointChar);

            const rectangleStroke = {
                type: 'rectangle', x: startX, y: startY, width: widthPx, height: heightPx, rotation: 0,
                color: color, labels: rectLabels, showEdgeLabels: true, showAngleLabels: false,
                id: Date.now() + Math.random()
            };

            drawnStrokes.push(rectangleStroke);

            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({ type: 'onizleme_bitir' }); // ?? Ekledik
                window.sendNetworkData({ type: 'yeni_cizim', stroke: rectangleStroke });
            }
            window.nextPointChar = nextPointChar;
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
    }

    // --- G) AKILLI KALEM (PEN) VE Ã¯Â¿Â½EKÃ¯Â¿Â½L TANIMA (GÃ¯Â¿Â½VENLÃ¯Â¿Â½ SÃ¯Â¿Â½RÃ¯Â¿Â½M) ---
    if (currentTool === 'pen' || currentTool === 'smart_pen') {
        let lastStroke = drawnStrokes[drawnStrokes.length - 1];

        if (lastStroke && lastStroke.type === 'pen') {
            if (!lastStroke.id) lastStroke.id = Date.now() + Math.random();

            if (lastStroke.path && lastStroke.path.length <= 3) {
                if (lastStroke.path[0]) lastStroke.path.push({ x: lastStroke.path[0].x + 0.1, y: lastStroke.path[0].y + 0.1 });
                setTimeout(() => {
                    if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                        window.sendNetworkData({ type: 'yeni_cizim', stroke: lastStroke });
                    }
                }, 50);
            }
            else {
                let correctedShape = null;
                if (currentTool === 'smart_pen' && typeof akilliSekilTani === 'function') {
                    try { correctedShape = akilliSekilTani(lastStroke); } catch (err) { }
                }

                if (correctedShape) {
                    drawnStrokes.pop(); if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) { window.sendNetworkData({ type: 'onizleme_bitir' }); } if (Array.isArray(correctedShape)) {
                        correctedShape.forEach(s => s.id = Date.now() + Math.random());
                        drawnStrokes.push(...correctedShape);

                        setTimeout(() => {
                            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                                window.sendNetworkData({ type: 'akilli_sekil_toplu', strokes: correctedShape });
                            }
                        }, 50);
                    }
                    else {
                        correctedShape.id = Date.now() + Math.random();
                        drawnStrokes.push(correctedShape);

                        setTimeout(() => {
                            if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                                window.sendNetworkData({ type: 'yeni_cizim', stroke: correctedShape });
                            }
                        }, 50);
                    }
                    
                    if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
                }
                else {
                    const safePenStroke = {
                        type: 'pen', id: lastStroke.id, color: lastStroke.color || '#000000',
                        baseWidth: lastStroke.baseWidth || 4, width: lastStroke.width || lastStroke.baseWidth || 4,
                        isBackground: false,
                        path: lastStroke.path.map(p => ({ x: Math.round(p.x), y: Math.round(p.y), p: Number((p.p || 1).toFixed(2)) }))
                    };

                    setTimeout(() => {
                        if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                            window.sendNetworkData({ type: 'yeni_cizim', stroke: safePenStroke });
                        }
                    }, 50);
                }
            }
        }
    }

    // --- GENEL SIFIRLAMA ---
    isDrawing = false;
    isDrawingLine = isDrawingInfinityLine = isDrawingSegment = isDrawingRay = false;
    isDrawingRectangle = false;
    lineStartPoint = null;
    rectStartPoint = null;
    snapTarget = null;
    window.isImageRotating = false;
    window.isImageResizing = false;
    if (typeof snapIndicator !== 'undefined' && snapIndicator) snapIndicator.style.display = 'none';

    // OlasÃ¯Â¿Â½ tÃ¯Â¿Â½m hayaletleri zorla sil (Garanti ProtokolÃ¯Â¿Â½)
    if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
        window.sendNetworkData({ type: 'onizleme_bitir' });
    }

    // --- H) KESKÃ¯Â¿Â½N NÃ¯Â¿Â½Ã¯Â¿Â½ANCI LASSO (SERBEST KESÃ¯Â¿Â½M) ---
    if (currentTool === 'lasso' && window.isDraggingLassoPoint) {
        window.isDraggingLassoPoint = false;

        if (!isDrawingLasso) {
            isDrawingLasso = true;
            lassoPoints = [{ x: currentMousePos.x, y: currentMousePos.y }];
        } else {
            let startPoint = lassoPoints[0];
            const mesafe = Math.hypot(currentMousePos.x - startPoint.x, currentMousePos.y - startPoint.y);

            if (mesafe < 40) {
                lassoPoints.push({ x: startPoint.x, y: startPoint.y });

                let minX = Math.min(...lassoPoints.map(p => p.x));
                let minY = Math.min(...lassoPoints.map(p => p.y));
                let maxX = Math.max(...lassoPoints.map(p => p.x));
                let maxY = Math.max(...lassoPoints.map(p => p.y));
                let w = Math.max(10, maxX - minX);
                let h = Math.max(10, maxY - minY);

                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = w; tempCanvas.height = h;
                const tempCtx = tempCanvas.getContext('2d');

                tempCtx.save();
                tempCtx.beginPath();
                tempCtx.moveTo(lassoPoints[0].x - minX, lassoPoints[0].y - minY);
                for (let i = 1; i < lassoPoints.length; i++) tempCtx.lineTo(lassoPoints[i].x - minX, lassoPoints[i].y - minY);
                tempCtx.closePath();
                tempCtx.clip();

                // Kaliteyi artÃ¯Â¿Â½r
                tempCtx.imageSmoothingEnabled = true;
                tempCtx.imageSmoothingQuality = 'high';

                const bgCanvas = document.getElementById('bg-canvas');
                if (bgCanvas) {
                    tempCtx.drawImage(bgCanvas, minX, minY, w, h, 0, 0, w, h);
                }
                tempCtx.drawImage(canvas, minX, minY, w, h, 0, 0, w, h);
                tempCtx.restore();

                const finalImage = tempCanvas.toDataURL('image/png', 1.0);

                let detectedColor = (typeof window.isToolThemeBlack !== 'undefined' && window.isToolThemeBlack) ? '#222222' : '#ffffff';

                try {
                    const bgCanvas = document.getElementById('bg-canvas');
                    const bgCtx = bgCanvas ? bgCanvas.getContext('2d') : null;
                    const mainCtx = canvas.getContext('2d');
                    
                    let centerX = (minX + maxX) / 2;
                    let centerY = (minY + maxY) / 2;
                    
                    let samplePoints = [
                        { x: centerX, y: minY - 5 },
                        { x: centerX, y: maxY + 5 },
                        { x: minX - 5, y: centerY },
                        { x: maxX + 5, y: centerY }
                    ];
                    
                    for (let sp of samplePoints) {
                        let r = 0, g = 0, b = 0, a = 0;
                        
                        let mainData = mainCtx.getImageData(sp.x, sp.y, 1, 1).data;
                        if (mainData[3] > 0) {
                            r = mainData[0]; g = mainData[1]; b = mainData[2]; a = mainData[3];
                        } else if (bgCtx) {
                            let bgData = bgCtx.getImageData(sp.x, sp.y, 1, 1).data;
                            if (bgData[3] > 0) {
                                r = bgData[0]; g = bgData[1]; b = bgData[2]; a = bgData[3];
                            }
                        }
                        
                        if (a > 0) {
                            detectedColor = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
                            break;
                        }
                    }
                } catch (e) { console.warn("Renk Ã¯Â¿Â½rnekleme Hatası:", e); }

                const maskStroke = { type: 'lasso-mask', points: lassoPoints.map(p => ({ x: p.x, y: p.y })), fillColor: detectedColor, id: Date.now() + Math.random() };
                drawnStrokes.push(maskStroke);

                const newImgStroke = { type: 'image', imgData: finalImage, x: minX + 30, y: minY + 30, width: w, height: h, rotation: 0, isBackground: false, imgObj: null, id: Date.now() + Math.random() };

                const tempImg = new Image();
                tempImg.onload = () => { newImgStroke.imgObj = tempImg; if (typeof redrawAllStrokes === 'function') redrawAllStrokes(); };
                tempImg.src = finalImage;
                drawnStrokes.push(newImgStroke);

                if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'yeni_cizim', stroke: maskStroke });
                    window.sendNetworkData({ type: 'yeni_cizim', stroke: newImgStroke });
                }

                if (typeof setActiveTool === 'function') setActiveTool('move'); else currentTool = 'move';
                selectedItem = newImgStroke;
                isDrawingLasso = false; window.lassoIsClosing = false; currentMousePos = null; lassoPoints = [];
            } else {
                lassoPoints.push({ x: currentMousePos.x, y: currentMousePos.y });
            }
        }
        redrawAllStrokes();
        return;
    } else {
        redrawAllStrokes();
    }
}, { passive: false }); // <--- pointerup fonksiyonu burada BÃ¯Â¿Â½TTÃ¯Â¿Â½==============================================================================


// ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: Ã¯Â¿Â½Ã¯Â¿Â½ iÃ¯Â¿Â½e geÃ¯Â¿Â½ip sonsuz dÃ¯Â¿Â½ngÃ¯Â¿Â½ye giren (ZÃ¯Â¿Â½plamaya sebep olan) HatalÃ¯Â¿Â½ Kod Temizlendi!
canvas.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
        e.preventDefault();

        // YalnÃ¯Â¿Â½zca 'TaÃ¯Â¿Â½Ã¯Â¿Â½' (move) aracÃ¯Â¿Â½ seÃ¯Â¿Â½iliyken fare ile zoom yapÃ¯Â¿Â½labilir
        if (currentTool !== 'move') return;

        const zoomStep = e.deltaY > 0 ? 0.95 : 1.05;

        const mainBg = drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
        if (mainBg) {
            const cx = mainBg.x + mainBg.width / 2;
            const cy = mainBg.y + mainBg.height / 2;
            
            drawnStrokes.forEach(bg => {
                if (bg.isBackground === true) {
                    const bg_cx = bg.x + bg.width / 2;
                    const bg_cy = bg.y + bg.height / 2;
                    const ncx = cx + (bg_cx - cx) * zoomStep;
                    const ncy = cy + (bg_cy - cy) * zoomStep;
                    bg.width *= zoomStep; bg.height *= zoomStep;
                    bg.x = ncx - bg.width / 2; bg.y = ncy - bg.height / 2;
                }
            });

            if (window.drawnStrokes) {
                window.drawnStrokes.forEach(s => {
                    if (!s.isBackground && typeof window.zoomStroke === 'function') window.zoomStroke(s, zoomStep, cx, cy);
                });
            }

            redrawAllStrokes();

            if (typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({
                    type: 'zoom_senkron', x: mainBg.x, y: mainBg.y, width: mainBg.width, height: mainBg.height
                });
            }
        }
    }
}, { passive: false });


// --- POINTERCANCEL (KESÃ¯Â¿Â½NTÃ¯Â¿Â½ DURUMUNDA SIFIRLAMA) ---
canvas.addEventListener('pointercancel', (e) => {
    // --- BUNLARI EKLE ---
    pointers.delete(e.pointerId);
    lastDist = 0;
    // --------------------

    // Ã¯Â¿Â½Ã¯Â¿Â½lemi iptal et ve tÃ¯Â¿Â½m bayraklarÃ¯Â¿Â½ (flag) indir
    isDrawing = false;
    isMoving = false;
    isPinching = false; // Varsa zoom iÃ¯Â¿Â½lemini de durdur
    isDrawingRectangle = false;
    rectStartPoint = null;

    // GeÃ¯Â¿Â½ici verileri temizle
    snapshotStart = null;
    snapTarget = null;
    lineStartPoint = null;
    window.tempPolygonData = null;

    // ArayÃ¯Â¿Â½z elemanlarÃ¯Â¿Â½nÃ¯Â¿Â½ gizle
    if (snapIndicator) snapIndicator.style.display = 'none';
    if (polygonPreviewLabel) polygonPreviewLabel.classList.add('hidden');
    if (eraserPreview) eraserPreview.style.display = 'none';

    // YarÃ¯Â¿Â½m kalan Ã¯Â¿Â½nizlemeleri ekrandan temizlemek iÃ¯Â¿Â½in
    redrawAllStrokes();

    console.log("Pointer iÃ¯Â¿Â½lemi bir sistem kesintisi nedeniyle iptal edildi.");
});


// --- BUNLARI EKLE: Tablet ekranÃ¯Â¿Â½ndan dÃ¯Â¿Â½Ã¯Â¿Â½arÃ¯Â¿Â½ taÃ¯Â¿Â½an parmaklarÃ¯Â¿Â½ zorla sil ---
canvas.addEventListener('pointerout', (e) => { pointers.delete(e.pointerId); if (pointers.size < 2) lastDist = 0; });
canvas.addEventListener('pointerleave', (e) => { pointers.delete(e.pointerId); if (pointers.size < 2) lastDist = 0; });


// --- YAPIÃ¯Â¿Â½TIRMA (PASTE) DESTEÃ¯Â¿Â½Ã¯Â¿Â½ (CTRL+V) ---
window.addEventListener('paste', (e) => {
    // Panodaki verileri al
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;

    // Verileri tara (Resim var mÃ¯Â¿Â½?)
    for (let index in items) {
        const item = items[index];

        // EÃ¯Â¿Â½er bu bir dosya ise ve tipi 'image' iÃ¯Â¿Â½eriyorsa
        if (item.kind === 'file' && item.type.indexOf('image/') !== -1) {
            const blob = item.getAsFile();
            const reader = new FileReader();

            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    // Resmi makul bir boyuta getir (Dosya yÃ¯Â¿Â½klemedeki mantÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½n aynÃ¯Â¿Â½sÃ¯Â¿Â½)
                    let startWidth = 300;
                    let scaleFactor = startWidth / img.width;
                    let startHeight = img.height * scaleFactor;

                    // Resmi HafÃ¯Â¿Â½zaya 'image' nesnesi olarak ekle
                    drawnStrokes.push({
                        type: 'image',
                        img: img,
                        x: canvas.width / 2, // EkranÃ¯Â¿Â½n ortasÃ¯Â¿Â½na koy
                        y: canvas.height / 2,
                        width: startWidth,
                        height: startHeight,
                        rotation: 0
                    });

                    redrawAllStrokes(); // Ekrana Ã¯Â¿Â½iz

                    // Ã¯Â¿Â½Ã¯Â¿Â½lem baÃ¯Â¿Â½arÃ¯Â¿Â½lÃ¯Â¿Â½ sesi (Ã¯Â¿Â½steÃ¯Â¿Â½e baÃ¯Â¿Â½lÃ¯Â¿Â½)
                    if (window.audio_click) {
                        window.audio_click.currentTime = 0;
                        window.audio_click.play();
                    }
                };
                img.src = event.target.result;
            };

            reader.readAsDataURL(blob);
            e.preventDefault(); // SayfanÃ¯Â¿Â½n varsayÃ¯Â¿Â½lan yapÃ¯Â¿Â½Ã¯Â¿Â½tÃ¯Â¿Â½rma davranÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½nÃ¯Â¿Â½ engelle
        }
    }
});

// --- app.js EN ALTINA EKLEYÃ¯Â¿Â½N (EKSÃ¯Â¿Â½K OLAN PARÃ¯Â¿Â½ALAR) ---

function updatePageLabel() {
    if (pageCountLabel) pageCountLabel.innerText = `Sayfa: ${currentPDFPage} / ${totalPDFPages}`;
}

window.renderPDFPage = async function(num) {
    if (!currentPDF) return;

    // ?? BEYAZ EKRAN VE DONMA Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½MÃ¯Â¿Â½: HÃ¯Â¿Â½zlÃ¯Â¿Â½ sayfa deÃ¯Â¿Â½iÃ¯Â¿Â½imlerinde PDF motorunun tÃ¯Â¿Â½kanmasÃ¯Â¿Â½nÃ¯Â¿Â½ engelle
    if (window.currentRenderTask) {
        try { window.currentRenderTask.cancel(); } catch(e){}
    }

    try {
        const page = await currentPDF.getPage(num);

        // --- BURASI DEÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½TÃ¯Â¿Â½: OTOMATÃ¯Â¿Â½K VE YÃ¯Â¿Â½KSEK Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½NÃ¯Â¿Â½RLÃ¯Â¿Â½K AYARI ---
        const dpr = window.devicePixelRatio || 1;
        const KALITE_CARPANI = 2; // Daha gÃ¯Â¿Â½venli bir katsayÃ¯Â¿Â½ (3 Ã¯Â¿Â½ok yÃ¯Â¿Â½ksekti, donanÃ¯Â¿Â½ma Ã¯Â¿Â½arpÃ¯Â¿Â½yordu)
        const hdScale = dpr * KALITE_CARPANI;

        let viewport = page.getViewport({ scale: hdScale });

        // GÃ¯Â¿Â½VENLÃ¯Â¿Â½K ZIRHI: Mobil ve bazÃ¯Â¿Â½ PC tarayÃ¯Â¿Â½cÃ¯Â¿Â½larÃ¯Â¿Â½nda canvas limiti 4096px'dir.
        // EÃ¯Â¿Â½er sayfa Ã¯Â¿Â½ok bÃ¯Â¿Â½yÃ¯Â¿Â½kse (Ã¯Â¿Â½rneÃ¯Â¿Â½in 5000px), Ã¯Â¿Â½lÃ¯Â¿Â½eÃ¯Â¿Â½i gÃ¯Â¿Â½venli bir sÃ¯Â¿Â½nÃ¯Â¿Â½ra zorla dÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½r!
        // Bu sayede "sayfa yarÃ¯Â¿Â½m geldi" veya "canvas dondu" hatalarÃ¯Â¿Â½nÃ¯Â¿Â½ KÃ¯Â¿Â½KÃ¯Â¿Â½NDEN Ã¯Â¿Â½nleriz!
        if (viewport.height > 3500 || viewport.width > 3500) {
            const maxDim = Math.max(viewport.height, viewport.width);
            const safeScale = hdScale * (3500 / maxDim);
            viewport = page.getViewport({ scale: safeScale });
        }
        // -----------------------------------------------------------

        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.height = viewport.height;
        tempCanvas.width = viewport.width;

        // --- BURASI EKLENDÃ¯Â¿Â½: YAZI KENARLARINI KESKÃ¯Â¿Â½NLEÃ¯Â¿Â½TÃ¯Â¿Â½RME FÃ¯Â¿Â½LTRESÃ¯Â¿Â½ ---
        tempCtx.imageSmoothingEnabled = true;
        tempCtx.imageSmoothingQuality = 'high';
        
        // JPEG formatÃ¯Â¿Â½nda arka planÃ¯Â¿Â½n siyah Ã¯Â¿Â½Ã¯Â¿Â½kmasÃ¯Â¿Â½nÃ¯Â¿Â½ Ã¯Â¿Â½nlemek iÃ¯Â¿Â½in beyaz zemin
        tempCtx.fillStyle = '#FFFFFF';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        // ----------------------------------------------------------------

        window.currentRenderTask = page.render({
            canvasContext: tempCtx,
            viewport: viewport
        });

        await window.currentRenderTask.promise;

    const img = new Image();
    img.onload = () => {
        window.addNewImageToCanvas(img, true);

        // --- KUTU KOPYALARINI PDF SAYFASINA GÃ¯Â¿Â½RE GERÃ¯Â¿Â½ YÃ¯Â¿Â½KLEME YAMASI ---
        if (window.boxCopies) {
            window.boxCopies.forEach(copy => {
                if (!copy.pageOwner || copy.pageOwner === num) {
                    if (!copy.imgObj) {
                        const tImg = new Image();
                        tImg.src = copy.imgData;
                        tImg.onload = () => {
                            copy.imgObj = tImg;
                            if (window.drawnStrokes && !window.drawnStrokes.includes(copy)) {
                                window.drawnStrokes.push(copy);
                            }
                            if (window.redrawAllStrokes) window.redrawAllStrokes();
                        };
                    } else {
                        if (window.drawnStrokes && !window.drawnStrokes.includes(copy)) {
                            window.drawnStrokes.push(copy);
                        }
                    }
                }
            });
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }
    };

    // ?? Ã¯Â¿Â½Ã¯Â¿Â½TE 2. ADIMDAKÃ¯Â¿Â½ DEÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½KLÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½N YAPILDIÃ¯Â¿Â½I YER BURASI ??
    // AÃ¯Â¿Â½Ã¯Â¿Â½ felÃ¯Â¿Â½ eden 20MB PNG yerine %80 kalite JPEG (1MB altÃ¯Â¿Â½) kullanarak donmayÃ¯Â¿Â½ ve yarÃ¯Â¿Â½m yÃ¯Â¿Â½klemeyi bitiriyoruz!
    const sayfaResmi = tempCanvas.toDataURL('image/jpeg', 0.8);
    img.src = sayfaResmi;

    if (pageCountLabel) pageCountLabel.innerText = `Sayfa: ${num} / ${totalPDFPages}`;
    
    } catch (e) {
        if (e.name === 'RenderingCancelledException') {
            console.log("HÃ¯Â¿Â½zlÃ¯Â¿Â½ sayfa deÃ¯Â¿Â½iÃ¯Â¿Â½imi nedeniyle Ã¯Â¿Â½nceki Ã¯Â¿Â½izim iptal edildi.");
        } else {
            console.warn("PDF Render Hatası:", e);
        }
    }
}



window.addNewImageToCanvas = function(img, isPDF = false, pcKordinatlari = null) {
    let startWidth, startHeight, posX, posY;

    // EÃ¯Â¿Â½er PC isek, tabletin bize gÃ¯Â¿Â½nderdiÃ¯Â¿Â½i adaptStrokeToScreen'den geÃ¯Â¿Â½miÃ¯Â¿Â½ kusursuz koordinatlarÃ¯Â¿Â½ kullan!
    if (pcKordinatlari) {
        startWidth = pcKordinatlari.width;
        startHeight = pcKordinatlari.height;
        posX = pcKordinatlari.x;
        posY = pcKordinatlari.y;
    } else {
        // EÃ¯Â¿Â½er Tabletsek kendi ekranÃ¯Â¿Â½mÃ¯Â¿Â½za gÃ¯Â¿Â½re hesapla
        startWidth = canvas.width * 0.8;
        if (img.width < startWidth) startWidth = img.width;
        let scaleFactor = startWidth / img.width;
        startHeight = img.height * scaleFactor;

        if (startHeight > canvas.height * 0.8) {
            startHeight = canvas.height * 0.8;
            let scaleFactorH = startHeight / img.height;
            startWidth = img.width * scaleFactorH;
        }

        posX = (canvas.width / 2) - (startWidth / 2);
        posY = (canvas.height / 2) - (startHeight / 2);
    }

    const newStroke = {
        type: 'image',
        id: Date.now() + Math.random(),
        img: img,
        imgData: img.src, // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: PDF'in tahta_durumu ile aÃ¯Â¿Â½dan geÃ¯Â¿Â½erken kaybolmamasÃ¯Â¿Â½ iÃ¯Â¿Â½in imgData eklendi!
        x: posX,
        y: posY,
        width: startWidth,
        height: startHeight,
        rotation: 0,
        isBackground: true
    };

    if (isPDF && typeof pdfImageStroke !== 'undefined' && pdfImageStroke !== null) {
        for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
            let s = window.drawnStrokes[i];
            if (s === pdfImageStroke ||
                (s.type === 'image' && s.isBackground === false && !s.isBoxCopy) ||
                (s.isPatch === true || s.type === 'lasso-mask')) {
                window.drawnStrokes.splice(i, 1);
            }
        }
        if (typeof drawnStrokes !== 'undefined') drawnStrokes = window.drawnStrokes;
    }

    drawnStrokes.push(newStroke);
    if (isPDF) { pdfImageStroke = newStroke; }

    const pdfControls = document.getElementById('pdf-controls');
    if (pdfControls) { pdfControls.classList.remove('hidden'); pdfControls.style.display = 'flex'; }

    const closeBtn = document.getElementById('btn-close-pdf');
            if (closeBtn) { closeBtn.classList.remove('hidden'); closeBtn.style.display = 'flex'; }

            redrawAllStrokes();

            // ?? Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M 1: Tabletin resmi anÃ¯Â¿Â½nda gÃ¯Â¿Â½rebilmesi iÃ¯Â¿Â½in kÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½k bir gecikmeyle ekranÃ¯Â¿Â½ zorla tazeliyoruz. 
            // Bu sayede "boÃ¯Â¿Â½luÃ¯Â¿Â½a tÃ¯Â¿Â½klama" zorunluluÃ¯Â¿Â½u ortadan kalkar ve PDF anÃ¯Â¿Â½nda gÃ¯Â¿Â½rÃ¯Â¿Â½nÃ¯Â¿Â½r!
            setTimeout(() => { if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes(); }, 150);

            // ?? PC'nin donanÃ¯Â¿Â½mÃ¯Â¿Â½ zayÃ¯Â¿Â½f olduÃ¯Â¿Â½u iÃ¯Â¿Â½in ve PDF kitap gÃ¯Â¿Â½nderimi Ã¯Â¿Â½nceden kapatÃ¯Â¿Â½ldÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½ iÃ¯Â¿Â½in, 
            // Tablet her halÃ¯Â¿Â½karda Ã¯Â¿Â½izdiÃ¯Â¿Â½i hafifletilmiÃ¯Â¿Â½ JPEG sayfayÃ¯Â¿Â½ PC'ye gÃ¯Â¿Â½ndermek zorunda!
            if (!pcKordinatlari && typeof isConnected !== 'undefined' && isConnected) {
                window.sendNetworkData({
                    type: 'arka_plan_resmi_aktar',
                    imgData: img.src,
                    isPDF: isPDF,
                    kordinatlar: { x: newStroke.x, y: newStroke.y, width: newStroke.width, height: newStroke.height },
                    canvasW: canvas.width,
                    canvasH: canvas.height
                });
            }

    // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: YÃ¯Â¿Â½kleme iÃ¯Â¿Â½leminden sonra TaÃ¯Â¿Â½Ã¯Â¿Â½ butonunun kendi kendine aktif olmasÃ¯Â¿Â½nÃ¯Â¿Â½ engellemek iÃ¯Â¿Â½in aracÃ¯Â¿Â½ Kalem'e sÃ¯Â¿Â½fÃ¯Â¿Â½rla.
    if (typeof setActiveTool === 'function') setActiveTool('pen');
}



// --- ARAÃ¯Â¿Â½ RENGÃ¯Â¿Â½ DEÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½TÃ¯Â¿Â½RME MANTIÃ¯Â¿Â½I (SÃ¯Â¿Â½YAH / NEON / TOK MAVÃ¯Â¿Â½) ---
const toolColorBtn = document.getElementById('btn-tool-color');
let isBlackTheme = false;
window.isToolThemeBlack = false; // DiÃ¯Â¿Â½er dosyalar iÃ¯Â¿Â½in global deÃ¯Â¿Â½iÃ¯Â¿Â½ken

if (toolColorBtn) {
    toolColorBtn.addEventListener('click', () => {
        isBlackTheme = !isBlackTheme;
        window.isToolThemeBlack = isBlackTheme; // Durumu kaydet

        // Buton yazÃ¯Â¿Â½sÃ¯Â¿Â½nÃ¯Â¿Â½ gÃ¯Â¿Â½ncelle
        toolColorBtn.innerText = isBlackTheme ? "AraÃ¯Â¿Â½ Rengi: Neon" : "AraÃ¯Â¿Â½ Rengi: Siyah";

        // O an ekranda aÃ¯Â¿Â½Ã¯Â¿Â½k olan tÃ¯Â¿Â½m fiziksel araÃ¯Â¿Â½larÃ¯Â¿Â½ bul ve rengini deÃ¯Â¿Â½iÃ¯Â¿Â½tir
        const elements = document.querySelectorAll('.ruler-container, .gonye-container, .aciolcer-container, #compass-container');

        elements.forEach(el => {
            if (isBlackTheme) {
                el.classList.add('tool-black-theme');
            } else {
                el.classList.remove('tool-black-theme');
            }
        });

        // ?? SÃ¯Â¿Â½NKRONÃ¯Â¿Â½ZASYON: Tema deÃ¯Â¿Â½iÃ¯Â¿Â½imini diÃ¯Â¿Â½er cihazlara (PC'ye) bildir
        if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ type: 'fiziksel_arac_temasi', isBlackTheme: isBlackTheme });
        }
    });
}

// --- ARAÃ¯Â¿Â½LAR AÃ¯Â¿Â½ILDIÃ¯Â¿Â½INDA RENGÃ¯Â¿Â½ HATIRLA (YAMA) ---
// Sayfa tamamen yÃ¯Â¿Â½klendikten sonra araÃ¯Â¿Â½larÃ¯Â¿Â½n 'show' fonksiyonlarÃ¯Â¿Â½na ekleme yapÃ¯Â¿Â½yoruz
window.addEventListener('load', () => {
    const toolsList = [
        { objName: 'RulerTool', elementProp: 'rulerElement' },
        { objName: 'GonyeTool', elementProp: 'gonyeElement' },
        { objName: 'AciolcerTool', elementProp: 'aciolcerElement' },
        { objName: 'PergelTool', elementProp: 'pergelElement' }
    ];

    toolsList.forEach(toolInfo => {
        const toolObj = window[toolInfo.objName];
        if (toolObj && toolObj.show) {
            // Orijinal show fonksiyonunu sakla
            const originalShow = toolObj.show.bind(toolObj);

            // Yeni show fonksiyonu tanÃ¯Â¿Â½mla
            toolObj.show = function () {
                originalShow(); // Ã¯Â¿Â½nce normal aÃ¯Â¿Â½Ã¯Â¿Â½lma iÃ¯Â¿Â½lemini yap

                // Sonra tema rengini kontrol et ve uygula
                if (this[toolInfo.elementProp]) {
                    if (window.isToolThemeBlack) {
                        this[toolInfo.elementProp].classList.add('tool-black-theme');
                    } else {
                        this[toolInfo.elementProp].classList.remove('tool-black-theme');
                    }
                }
            };
        }
    });
});

// --- YARDIM VÃ¯Â¿Â½DEOLARI SÃ¯Â¿Â½STEMÃ¯Â¿Â½ ---

// 1. VÃ¯Â¿Â½DEO LÃ¯Â¿Â½STESÃ¯Â¿Â½ (Ã¯Â¿Â½eviriye Uygun Hale Getirildi)
const tutorialVideos = [
    { id: "vid_cetvel", dosya: "cetvel-vid.mp4" },
    { id: "vid_gonye", dosya: "gonye-vid.mp4" },
    { id: "vid_aciolcer", dosya: "aciolcer-vid.mp4" },
    { id: "vid_pergel", dosya: "pergel-vid.mp4" },
    { id: "vid_canlandir", dosya: "canlandir-vid.mp4" },
    { id: "vid_cizgi", dosya: "cizgi-vid.mp4" },
    { id: "vid_cokgenler", dosya: "cokgenler-vid.mp4" },
    { id: "vid_kalem", dosya: "kalem-vid.mp4" },
    { id: "vid_kitap", dosya: "kitap-yukleme-vid.mp4" },
    { id: "vid_oyunlar", dosya: "oyunlar-vid.mp4" }
];


// Elementleri SeÃ¯Â¿Â½
const helpBtn = document.getElementById('btn-help');
const helpModal = document.getElementById('help-modal');
const closeHelpBtn = document.getElementById('close-help');
const videoListContainer = document.getElementById('video-list-container');
const videoPlayer = document.getElementById('main-video-player');
const videoTitleLabel = document.getElementById('video-title-label');

// Listeyi OluÃ¯Â¿Â½tur (Ã¯Â¿Â½oklu Dil Destekli)
function loadVideoList() {
    videoListContainer.innerHTML = '';

    // O anki seÃ¯Â¿Â½ili dili al (EÃ¯Â¿Â½er boÃ¯Â¿Â½sa 'tr' kabul et)
    const t = translations[currentLang || 'tr'];

    tutorialVideos.forEach((vid) => {
        const btn = document.createElement('button');
        btn.className = 'video-item-btn';

        // Ã¯Â¿Â½eviriden baÃ¯Â¿Â½lÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½ al (EÃ¯Â¿Â½er Ã¯Â¿Â½eviri dosyasÃ¯Â¿Â½na eklemeyi unutursan hata vermesin diye id'yi yazar)
        const videoBaslik = t[vid.id] || vid.id;

        btn.innerText = `? ${videoBaslik}`;

        btn.onclick = () => {
            // TÃ¯Â¿Â½m butonlarÃ¯Â¿Â½n rengini sÃ¯Â¿Â½fÃ¯Â¿Â½rla, buna renk ver
            document.querySelectorAll('.video-item-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Videoyu oynat
            videoPlayer.src = `videolar/${vid.dosya}`;
            videoTitleLabel.innerText = videoBaslik; // OynatÃ¯Â¿Â½cÃ¯Â¿Â½nÃ¯Â¿Â½n Ã¯Â¿Â½stÃ¯Â¿Â½ndeki baÃ¯Â¿Â½lÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½ da Ã¯Â¿Â½evir
            videoPlayer.play();
        };
        videoListContainer.appendChild(btn);
    });
}
// AÃ¯Â¿Â½ma/Kapama OlaylarÃ¯Â¿Â½
if (helpBtn && helpModal) {
    helpBtn.addEventListener('click', () => {
        helpModal.classList.remove('hidden');
        loadVideoList();
    });

    closeHelpBtn.addEventListener('click', () => {
        helpModal.classList.add('hidden');
        videoPlayer.pause();
        videoPlayer.src = ""; // Videoyu durdur ve sÃ¯Â¿Â½fÃ¯Â¿Â½rla
    });
}

// --- KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: PDF KAPATMA BUTONU (Global Dinleyici) ---
document.addEventListener('click', function (e) {
    const btn = e.target.closest('#btn-close-pdf');

    if (btn) {
        console.log("PDF KapatÃ¯Â¿Â½lÃ¯Â¿Â½yor...");

        // 1. PC'YE KAPATMA EMRÃ¯Â¿Â½ GÃ¯Â¿Â½NDER
        if (typeof window.sendNetworkData === 'function' && typeof isConnected !== 'undefined' && isConnected) {
            window.sendNetworkData({ type: 'pdf_kapat' });
        }

        e.preventDefault();
        e.stopPropagation();

        // ?? 2. SÃ¯Â¿Â½HÃ¯Â¿Â½RLÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: filter yerine splice ile hafÃ¯Â¿Â½za kopmadan temizlik yapÃ¯Â¿Â½yoruz ??
        if (window.drawnStrokes) {
            for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                // PDF, Resim, arka plan, lasso maskesi ve yamalarÃ¯Â¿Â½n hepsini temizle
                const s = window.drawnStrokes[i];
                if (s.isBackground === true || s.type === 'lasso-mask' || s.isPatch === true) {
                    window.drawnStrokes.splice(i, 1);
                }
            }
        }

        // 3. DeÃ¯Â¿Â½iÃ¯Â¿Â½kenleri SÃ¯Â¿Â½fÃ¯Â¿Â½rla
        if (typeof currentPDF !== 'undefined') currentPDF = null;
        if (typeof pdfImageStroke !== 'undefined') pdfImageStroke = null;
        if (typeof currentPDFPage !== 'undefined') currentPDFPage = 1;
        if (typeof totalPDFPages !== 'undefined') totalPDFPages = 0;
        if (typeof backgroundImage !== 'undefined') backgroundImage = null;

        // 4. ButonlarÃ¯Â¿Â½ Gizle
        const controls = document.getElementById('pdf-controls');
        if (controls) {
            controls.classList.add('hidden');
            controls.style.display = 'none';
        }
        btn.classList.add('hidden');
        btn.style.display = 'none';

        // 5. EkranÃ¯Â¿Â½ Temizle ve KalanlarÃ¯Â¿Â½ Yeniden Ã¯Â¿Â½iz
        if (typeof redrawAllStrokes === 'function') {
            const canvas = document.getElementById('drawing-canvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            redrawAllStrokes();
        }

        try {
            if (window.audio_click) {
                window.audio_click.currentTime = 0;
                window.audio_click.play();
            }
        } catch (err) { }
    }
}, true);


// --- BAÃ¯Â¿Â½LANGIÃ¯Â¿Â½ ---
// --- AKILLI EKRAN BOYUTLANDIRMA (ADRES Ã¯Â¿Â½UBUÃ¯Â¿Â½U ZIPLAMASINI ENGELLER) ---
let lastWindowWidth = window.innerWidth;

function resizeCanvas() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // GerÃ¯Â¿Â½ekten ekran dÃ¯Â¿Â½ndÃ¯Â¿Â½yse veya boyut deÃ¯Â¿Â½iÃ¯Â¿Â½tiyse gÃ¯Â¿Â½ncelle
    lastWindowWidth = newWidth;

    if (window.Scene3D && window.Scene3D.camera) {
        const aspect = newWidth / newHeight;
        const frustumSize = 30;

        if (window.Scene3D.camera.isPerspectiveCamera) {
            window.Scene3D.camera.aspect = aspect;
        } else {
            window.Scene3D.camera.left = -frustumSize * aspect / 2;
            window.Scene3D.camera.right = frustumSize * aspect / 2;
            window.Scene3D.camera.top = frustumSize / 2;
            window.Scene3D.camera.bottom = -frustumSize / 2;
        }
        window.Scene3D.camera.updateProjectionMatrix();
        if (window.Scene3D.renderer) {
            window.Scene3D.renderer.setSize(newWidth, newHeight);
        }
    }

    redrawAllStrokes();

    // canvas.height = newHeight; satÃ¯Â¿Â½rÃ¯Â¿Â½nÃ¯Â¿Â½n hemen altÃ¯Â¿Â½na ekle
    setupCanvasResolution();
}

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// --- app.js EN ALT SATIR (EDGE, CHROME, TABLET UYUMLU FÃ¯Â¿Â½NAL) ---

{
    let deferredPrompt;
    const installPopup = document.getElementById('install-popup');
    const btnInstall = document.getElementById('btn-popup-install');
    const btnClose = document.getElementById('btn-popup-close');
    const iosInstructions = document.getElementById('ios-instructions');

    // 1. TarayÃ¯Â¿Â½cÃ¯Â¿Â½ sinyali (Install Prompt)
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        // Popup'Ã¯Â¿Â½ gÃ¯Â¿Â½ster
        if (installPopup) installPopup.style.display = 'flex';
    });

    // 2. iOS (iPhone/iPad) KontrolÃ¯Â¿Â½
    const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone);

    if (isIos && !isInStandaloneMode) {
        setTimeout(() => {
            if (installPopup) {
                installPopup.style.display = 'flex';
                if (btnInstall) btnInstall.style.display = 'none'; // iPhone'da butonu gizle
                if (iosInstructions) iosInstructions.style.display = 'block'; // Tarifi gÃ¯Â¿Â½ster
            }
        }, 3000);
    }

    // --- BUTONLARI Ã¯Â¿Â½ALIÃ¯Â¿Â½TIRAN FONKSÃ¯Â¿Â½YON (EDGE DOKUNMATÃ¯Â¿Â½K HATASI Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½MÃ¯Â¿Â½) ---
    const activateButton = (btn, actionCallback) => {
        if (!btn) return;

        const handler = async (e) => {
            // Edge'in dokunmayÃ¯Â¿Â½ yutmasÃ¯Â¿Â½nÃ¯Â¿Â½ engelle
            e.stopPropagation();
            e.preventDefault();

            // Ã¯Â¿Â½Ã¯Â¿Â½lemi gerÃ¯Â¿Â½ekleÃ¯Â¿Â½tir
            await actionCallback();
        };

        // Hem tÃ¯Â¿Â½klama hem parmak dokunuÃ¯Â¿Â½unu dinle
        btn.addEventListener('click', handler);
        btn.addEventListener('touchstart', handler, { passive: false });
    };

    // --- BUTONLARA GÃ¯Â¿Â½REVLERÃ¯Â¿Â½NÃ¯Â¿Â½ VER ---

    // A) YÃ¯Â¿Â½kle Butonu
    activateButton(btnInstall, async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log("SonuÃ¯Â¿Â½:", outcome);
            deferredPrompt = null;
        }
        if (installPopup) installPopup.style.display = 'none';

        // ?? SÃ¯Â¿Â½HÃ¯Â¿Â½RLÃ¯Â¿Â½ DOKUNUÃ¯Â¿Â½: PC'deki yÃ¯Â¿Â½kleme penceresini de kapatmasÃ¯Â¿Â½ iÃ¯Â¿Â½in komut gÃ¯Â¿Â½nder
        if (typeof isConnected !== 'undefined' && isConnected && typeof sendNetworkData === 'function') {
            sendNetworkData({ type: 'yukleme_penceresini_kapat' });
        }
    });

    // B) Kapat (HayÃ¯Â¿Â½r) Butonu
    activateButton(btnClose, async () => {
        if (installPopup) installPopup.style.display = 'none';

        // ?? SÃ¯Â¿Â½HÃ¯Â¿Â½RLÃ¯Â¿Â½ DOKUNUÃ¯Â¿Â½: PC'deki yÃ¯Â¿Â½kleme penceresini de kapatmasÃ¯Â¿Â½ iÃ¯Â¿Â½in komut gÃ¯Â¿Â½nder
        if (typeof isConnected !== 'undefined' && isConnected && typeof sendNetworkData === 'function') {
            sendNetworkData({ type: 'yukleme_penceresini_kapat' });
        }
    });
}

// --- app.js EN ALTA EKLE: DÃ¯Â¿Â½NDÃ¯Â¿Â½RME FONKSÃ¯Â¿Â½YONU ---

/**
 * Bir HTML elementine dÃ¯Â¿Â½ndÃ¯Â¿Â½rme Ã¯Â¿Â½zelliÃ¯Â¿Â½i ekler.
 * @param {HTMLElement} element - DÃ¯Â¿Â½ndÃ¯Â¿Â½rÃ¯Â¿Â½lecek olan kopya kutusu (div)
 */

// ==========================================
// --- TARAYICI DOKUNMATÃ¯Â¿Â½K Ã¯Â¿Â½AKIÃ¯Â¿Â½MA Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½MÃ¯Â¿Â½ ---
// ==========================================
// TarayÃ¯Â¿Â½cÃ¯Â¿Â½nÃ¯Â¿Â½n adres Ã¯Â¿Â½ubuÃ¯Â¿Â½u veya "sayfayÃ¯Â¿Â½ yenile" hareketinin
// dÃ¯Â¿Â½ndÃ¯Â¿Â½rme (rotate) ve taÃ¯Â¿Â½Ã¯Â¿Â½ma iÃ¯Â¿Â½lemlerini bozmasÃ¯Â¿Â½nÃ¯Â¿Â½ engeller.
window.addEventListener('touchmove', function (e) {
    // EÃ¯Â¿Â½er dokunulan Ã¯Â¿Â½ey dÃ¯Â¿Â½ndÃ¯Â¿Â½rme kulpuysa veya kopyalanan resimse:
    if (e.target.closest('.rotate-handle') ||
        e.target.classList.contains('rotate-handle') ||
        e.target.closest('.resize-handle') ||
        e.target.tagName.toLowerCase() === 'img') {

        // TarayÃ¯Â¿Â½cÃ¯Â¿Â½ya "KarÃ¯Â¿Â½Ã¯Â¿Â½ma, kaydÃ¯Â¿Â½rma yapma!" diyoruz.
        e.preventDefault();
    }
}, { passive: false }); // passive: false Ã¯Â¿Â½ok Ã¯Â¿Â½nemlidir, tarayÃ¯Â¿Â½cÃ¯Â¿Â½yÃ¯Â¿Â½ durdurmaya izin verir.
// ==========================================


// =========================================================
// MOBÃ¯Â¿Â½L TARAYICI ZIPLAMA Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½MÃ¯Â¿Â½: KATI EKRAN KÃ¯Â¿Â½LÃ¯Â¿Â½DÃ¯Â¿Â½ (app.js)
// =========================================================
function lockScreenSize() {
    // EkranÃ¯Â¿Â½n o anki gerÃ¯Â¿Â½ek piksel boyutunu al
    let w = window.innerWidth || document.documentElement.clientWidth || window.screen.width || 1024;
    let h = window.innerHeight || document.documentElement.clientHeight || window.screen.height || 768;
    const dpr = window.devicePixelRatio || 1; // ?? HD OranÃ¯Â¿Â½

    // Ana KanvasÃ¯Â¿Â½ Sabitle
    const canvas = document.getElementById('drawing-canvas');
    if (canvas) {
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        canvas.width = w * dpr;
        canvas.height = h * dpr;
    }

    // ?? EKSÃ¯Â¿Â½K OLAN KISIM: Arka Plan KanvasÃ¯Â¿Â½nÃ¯Â¿Â½ da Ana Kanvasla Beton Gibi Sabitle (Sayfa BasÃ¯Â¿Â½klÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½nÃ¯Â¿Â½ Yok Eder)
    const bgCanvas = document.getElementById('bg-canvas');
    if (bgCanvas) {
        bgCanvas.style.width = w + 'px';
        bgCanvas.style.height = h + 'px';
        bgCanvas.width = w * dpr;
        bgCanvas.height = h * dpr;
    }

    document.body.style.width = w + 'px';
    document.body.style.height = h + 'px';
    document.documentElement.style.width = w + 'px';
    document.documentElement.style.height = h + 'px';

    if (typeof window.redrawAllStrokes === 'function') {
        window.redrawAllStrokes();
    }
}

// 1. Sayfa yÃ¯Â¿Â½klendiÃ¯Â¿Â½inde boyutlarÃ¯Â¿Â½ kilitle
window.addEventListener('load', lockScreenSize);

// 2. Tablet yan Ã¯Â¿Â½evrilirse (yatay/dikey) yeni boyuta gÃ¯Â¿Â½re tekrar kilitle
window.addEventListener('orientationchange', () => {
    setTimeout(lockScreenSize, 300);
});

// KRÃ¯Â¿Â½TÃ¯Â¿Â½K NOKTA: 'resize' eventini (adres Ã¯Â¿Â½ubuÃ¯Â¿Â½u hareketlerini) DÃ¯Â¿Â½NLEMÃ¯Â¿Â½YORUZ!
// BÃ¯Â¿Â½ylece adres Ã¯Â¿Â½ubuÃ¯Â¿Â½u kaybolsa/Ã¯Â¿Â½Ã¯Â¿Â½ksa bile sayfa esnemez, Ã¯Â¿Â½izgiler zÃ¯Â¿Â½plamaz.

// =======================================================
// CANLANDIR (SNAPSHOT) - TABLET/PC UYUMLU YÃ¯Â¿Â½ZEN KOPYA
// =======================================================
function olusturYuzenKopya(imgSrc, startX, startY, width, height) {
    // ?? SÃ¯Â¿Â½HÃ¯Â¿Â½RLÃ¯Â¿Â½ DÃ¯Â¿Â½ZELTME: HD piksel deÃ¯Â¿Â½erlerini DOM iÃ¯Â¿Â½in CSS pikseline dÃ¯Â¿Â½nÃ¯Â¿Â½Ã¯Â¿Â½tÃ¯Â¿Â½r
    const canvasEl = document.getElementById('drawing-canvas');
    const dpr = canvasEl ? (canvasEl.width / canvasEl.getBoundingClientRect().width) : (window.devicePixelRatio || 1);

    // Gelen koordinatlarÃ¯Â¿Â½n HD olup olmadÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½nÃ¯Â¿Â½ kontrol et ve Ã¯Â¿Â½lÃ¯Â¿Â½ekle
    const isHD = width > (canvasEl ? canvasEl.getBoundingClientRect().width : window.innerWidth);
    const scale = isHD ? dpr : 1;

    const cssX = startX / scale;
    const cssY = startY / scale;
    const cssW = width / scale;
    const cssH = height / scale;

    // 1. Ana KapsayÃ¯Â¿Â½cÃ¯Â¿Â½ Kutu
    const container = document.createElement('div');
    container.className = 'yuzen-kopya-container';
    container.style.position = 'absolute';
    container.style.left = cssX + 'px';
    container.style.top = cssY + 'px';
    container.style.width = cssW + 'px';
    container.style.height = cssH + 'px';
    container.style.border = '2px dashed #00ffcc';
    container.style.cursor = 'grab';
    container.style.zIndex = '9999';
    container.style.boxSizing = 'border-box';
    container.style.transformOrigin = 'center center';
    container.style.touchAction = 'none'; // KRÃ¯Â¿Â½TÃ¯Â¿Â½K: Tablette sayfa kaymasÃ¯Â¿Â½nÃ¯Â¿Â½ yasaklar
    container.dataset.rotation = '0';

    // 2. Kopyalanan Resim
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.display = 'block';
    img.style.pointerEvents = 'none';
    container.appendChild(img);

    // 3. DÃ¯Â¿Â½ndÃ¯Â¿Â½rme (YeÃ¯Â¿Â½il) Butonu ve SapÃ¯Â¿Â½
    const rotateLine = document.createElement('div');
    rotateLine.style.position = 'absolute';
    rotateLine.style.top = '-20px';
    rotateLine.style.left = '50%';
    rotateLine.style.width = '2px';
    rotateLine.style.height = '20px';
    rotateLine.style.backgroundColor = '#00ff00';
    rotateLine.style.transform = 'translateX(-50%)';
    container.appendChild(rotateLine);

    const rotateBtn = document.createElement('div');
    rotateBtn.className = 'rotate-handle'; // Tablette kaymayÃ¯Â¿Â½ durduran mevcut sÃ¯Â¿Â½nÃ¯Â¿Â½fÃ¯Â¿Â½nÃ¯Â¿Â½z
    rotateBtn.style.position = 'absolute';
    rotateBtn.style.top = '-40px';
    rotateBtn.style.left = '50%';
    rotateBtn.style.transform = 'translateX(-50%)';
    rotateBtn.style.width = '30px';
    rotateBtn.style.height = '30px';
    rotateBtn.style.backgroundColor = '#00ff00';
    rotateBtn.style.borderRadius = '50%';
    rotateBtn.style.cursor = 'grab';
    rotateBtn.style.border = '2px solid white';
    rotateBtn.style.boxShadow = '0px 2px 5px rgba(0,0,0,0.5)';
    rotateBtn.style.touchAction = 'none'; // KRÃ¯Â¿Â½TÃ¯Â¿Â½K
    container.appendChild(rotateBtn);

    // 4. Yeniden BoyutlandÃ¯Â¿Â½rma (Pembe) Butonu
    const resizeBtn = document.createElement('div');
    resizeBtn.className = 'resize-handle'; // Tablette kaymayÃ¯Â¿Â½ durduran mevcut sÃ¯Â¿Â½nÃ¯Â¿Â½fÃ¯Â¿Â½nÃ¯Â¿Â½z
    resizeBtn.style.position = 'absolute';
    resizeBtn.style.bottom = '-15px';
    resizeBtn.style.right = '-15px';
    resizeBtn.style.width = '30px';
    resizeBtn.style.height = '30px';
    resizeBtn.style.backgroundColor = '#ff00ff';
    resizeBtn.style.borderRadius = '50%';
    resizeBtn.style.cursor = 'nwse-resize';
    resizeBtn.style.border = '2px solid white';
    resizeBtn.style.boxShadow = '0px 2px 5px rgba(0,0,0,0.5)';
    resizeBtn.style.touchAction = 'none'; // KRÃ¯Â¿Â½TÃ¯Â¿Â½K
    container.appendChild(resizeBtn);

    document.body.appendChild(container);

    // --- TABLET UYUMLU ETKÃ¯Â¿Â½LEÃ¯Â¿Â½Ã¯Â¿Â½M MANTIÃ¯Â¿Â½I ---
    let mode = 'none';
    let startEvtX, startEvtY, initialLeft, initialTop, initialWidth, initialHeight, initialRotation, centerX, centerY;
    let activePointerId = null; // ParmaÃ¯Â¿Â½Ã¯Â¿Â½ takip etmek iÃ¯Â¿Â½in kilit ID'si

    // DÃ¯Â¿Â½ndÃ¯Â¿Â½rmeye BaÃ¯Â¿Â½la
    rotateBtn.addEventListener('pointerdown', (e) => {
        e.stopPropagation(); e.preventDefault();
        mode = 'rotate';
        activePointerId = e.pointerId;
        rotateBtn.setPointerCapture(activePointerId); // KRÃ¯Â¿Â½TÃ¯Â¿Â½K: ParmaÃ¯Â¿Â½Ã¯Â¿Â½ yeÃ¯Â¿Â½il butona kilitle!

        const rect = container.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
        initialRotation = parseFloat(container.dataset.rotation) || 0;
        container.dataset.startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
    });

    // BoyutlandÃ¯Â¿Â½rmaya BaÃ¯Â¿Â½la
    resizeBtn.addEventListener('pointerdown', (e) => {
        e.stopPropagation(); e.preventDefault();
        mode = 'resize';
        activePointerId = e.pointerId;
        resizeBtn.setPointerCapture(activePointerId); // KRÃ¯Â¿Â½TÃ¯Â¿Â½K: ParmaÃ¯Â¿Â½Ã¯Â¿Â½ pembe butona kilitle!

        startEvtX = e.clientX; startEvtY = e.clientY;
        initialWidth = container.offsetWidth; initialHeight = container.offsetHeight;
    });

    // SÃ¯Â¿Â½rÃ¯Â¿Â½klemeye BaÃ¯Â¿Â½la
    container.addEventListener('pointerdown', (e) => {
        if (e.target === rotateBtn || e.target === resizeBtn) return;
        e.stopPropagation(); e.preventDefault();
        mode = 'drag';
        activePointerId = e.pointerId;
        container.setPointerCapture(activePointerId); // KRÃ¯Â¿Â½TÃ¯Â¿Â½K: ParmaÃ¯Â¿Â½Ã¯Â¿Â½ resme kilitle!

        container.style.cursor = 'grabbing';
        startEvtX = e.clientX; startEvtY = e.clientY;
        initialLeft = container.offsetLeft; initialTop = container.offsetTop;
    });

    // Hareket Etme (Move)
    const onMove = (e) => {
        if (mode === 'none') return;
        if (e.pointerId !== activePointerId) return; // Ã¯Â¿Â½kinci parmakla yapÃ¯Â¿Â½lan mÃ¯Â¿Â½dahaleleri engeller
        e.preventDefault();

        if (mode === 'drag') {
            container.style.left = (initialLeft + (e.clientX - startEvtX)) + 'px';
            container.style.top = (initialTop + (e.clientY - startEvtY)) + 'px';
        } else if (mode === 'resize') {
            const newWidth = Math.max(30, initialWidth + (e.clientX - startEvtX));
            container.style.width = newWidth + 'px';
            container.style.height = initialHeight * (newWidth / initialWidth) + 'px';
        } else if (mode === 'rotate') {
            const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
            const finalRotation = initialRotation + (currentAngle - parseFloat(container.dataset.startAngle));
            container.style.transform = `rotate(${finalRotation}deg)`;
            container.dataset.rotation = finalRotation;
        }
    };

    // ParmaÃ¯Â¿Â½Ã¯Â¿Â½ KaldÃ¯Â¿Â½rma (BÃ¯Â¿Â½rakma)
    const onUp = (e) => {
        if (mode === 'none') return;

        // Kilidi serbest bÃ¯Â¿Â½rak
        if (e.target.hasPointerCapture && e.target.hasPointerCapture(e.pointerId)) {
            e.target.releasePointerCapture(e.pointerId);
        }

        if (mode === 'drag') container.style.cursor = 'grab';
        mode = 'none';
        activePointerId = null;
    };

    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp); // TarayÃ¯Â¿Â½cÃ¯Â¿Â½ Hatasında da bÃ¯Â¿Â½rak

    // --- BOÃ¯Â¿Â½LUÃ¯Â¿Â½A TIKLAYINCA ANA KANVASA MÃ¯Â¿Â½HÃ¯Â¿Â½RLE (TABLET Ã¯Â¿Â½OKLU KOPYA Ã¯Â¿Â½NLEYÃ¯Â¿Â½CÃ¯Â¿Â½) ---
    setTimeout(() => {
        let isStamped = false; // Ã¯Â¿Â½oklu kopyayÃ¯Â¿Â½ engelleyen kilit

        const disariTiklama = (e) => {
            if (isStamped || container.contains(e.target)) return;

            // EÃ¯Â¿Â½er dÃ¯Â¿Â½ndÃ¯Â¿Â½rme veya boyutlandÃ¯Â¿Â½rma butonlarÃ¯Â¿Â½na basÃ¯Â¿Â½lÃ¯Â¿Â½yorsa mÃ¯Â¿Â½hÃ¯Â¿Â½rleme yapma
            if (e.target.closest('.rotate-handle') || e.target.closest('.resize-handle')) return;

            isStamped = true;
            window.removeEventListener('pointerdown', disariTiklama, true);

            // Sizin orijinal canvas referansÃ¯Â¿Â½nÃ¯Â¿Â½za (canvas) gÃ¯Â¿Â½re tam uyumlu koordinat yakalama
            const containerRect = container.getBoundingClientRect();
            const canvasRect = canvas.getBoundingClientRect();

            let xKoordinati = parseFloat(container.style.left);
            let yKoordinati = parseFloat(container.style.top);
            let genislik = parseFloat(container.style.width);
            let yukseklik = parseFloat(container.style.height);

            // Dokunmatik ekrandan el Ã¯Â¿Â½ekildiÃ¯Â¿Â½inde koordinat kaybolursa fiziksel pikselleri kurtar
            if (isNaN(xKoordinati) || isNaN(yKoordinati)) {
                xKoordinati = containerRect.left - canvasRect.left;
                yKoordinati = containerRect.top - canvasRect.top;
                genislik = containerRect.width;
                yukseklik = containerRect.height;
            }

            // HatalÃ¯Â¿Â½/boÃ¯Â¿Â½ tÃ¯Â¿Â½klamalarÃ¯Â¿Â½ engelle
            if (genislik < 5 || yukseklik < 5) {
                if (container && container.parentNode) container.parentNode.removeChild(container);
                return;
            }

            // PDF ve Sayfa HafÃ¯Â¿Â½zasÃ¯Â¿Â½yla tam uyumlu yeni kopya objesi
            const newCopy = {
                type: 'image',
                imgData: imgSrc,
                x: xKoordinati - canvasRect.left, // KanvasÃ¯Â¿Â½n sol boÃ¯Â¿Â½luÃ¯Â¿Â½unu net olarak dÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½yoruz
                y: yKoordinati - canvasRect.top,  // KanvasÃ¯Â¿Â½n Ã¯Â¿Â½st boÃ¯Â¿Â½luÃ¯Â¿Â½unu net olarak dÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½yoruz
                width: genislik,
                height: yukseklik,
                rotation: parseFloat(container.dataset.rotation) || 0,
                isBackground: false,
                isBoxCopy: true,
                pageOwner: typeof currentPDFPage !== 'undefined' ? currentPDFPage : 1,
                imgObj: null
            };

            // Kanvas Ã¯Â¿Â½izim motoru tetikleyicisi
            const imgObj = new Image();
            imgObj.src = imgSrc;
            imgObj.onload = () => {
                newCopy.imgObj = imgObj;

                // Ana çizim dizisine ekle
                if (typeof drawnStrokes !== 'undefined') {
                    drawnStrokes.push(newCopy);
                }

                // PDF sayfa hafıza dizisine ekle
                if (!window.boxCopies) window.boxCopies = [];
                window.boxCopies.push(newCopy);

                // Kanvas ekranını anında tazeleyip resmi görünür kıl
                if (window.redrawAllStrokes) window.redrawAllStrokes();

                console.log("Kutu kopyası başarıyla kanvas hafızasına mühürlendi!");
            };

            // Geçici çizgili kutuyu ve diğer izleyicileri temizle
            if (container && container.parentNode) {
                container.parentNode.removeChild(container);
            }
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('pointercancel', onUp);
        };

        window.addEventListener('pointerdown', disariTiklama, true);
    }, 200);
}

// Dosyanın en altına ekle
window.addEventListener('load', () => {
    setTimeout(setupCanvasResolution, 500);
});


// ===================================================================
// --- AKILLI ŞEKİL TANIMA V15 (KUSURSUZ YILDIZ VE ÜÇGEN AYRIMI) ---
// ===================================================================
function akilliSekilTani(stroke) {
    if (!stroke || stroke.type !== 'pen' || stroke.path.length < 15) return null;

    const pts = stroke.path;
    const start = pts[0];
    const end = pts[pts.length - 1];
    const directDistance = Math.hypot(end.x - start.x, end.y - start.y);

    let totalDistance = 0;
    for (let i = 1; i < pts.length; i++) totalDistance += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    pts.forEach(p => {
        if (p.x < minX) minX = p.x; if (p.y < minY) minY = p.y;
        if (p.x > maxX) maxX = p.x; if (p.y > maxY) maxY = p.y;
    });

    const w = maxX - minX;
    const h = maxY - minY;
    const maxBoyut = Math.max(w, h);
    const cx = minX + w / 2;
    const cy = minY + h / 2;

    if (maxBoyut < 30) return null;

    const col = stroke.color;
    const wid = stroke.baseWidth || 3;

    // 1. DÜZ ÇİZGİ
    if (directDistance > 50 && (totalDistance / directDistance) < 1.15) {
        return { type: 'straightLine', p1: start, p2: end, color: col, width: wid };
    }

    // 2. KAPALI ŞEKİLLER (Kapanma Toleransı)
    const tamKapaliMi = directDistance < (maxBoyut * 0.3) && directDistance < 50;
    if (!tamKapaliMi) return null;

    // AŞIRI KARMAŞIK KARALAMA KORUMASI 
    if (totalDistance > (w + h) * 4) return null;

    // --- BÖLGESEL FİZİKSEL KANITLAR ---
    let topMinX = Infinity, topMaxX = -Infinity;
    let bottomMinX = Infinity, bottomMaxX = -Infinity;
    let leftMinY = Infinity, leftMaxY = -Infinity;
    let rightMinY = Infinity, rightMaxY = -Infinity;
    let distTL = Infinity, distTR = Infinity, distBL = Infinity, distBR = Infinity;
    let totalR = 0;

    pts.forEach(p => {
        if (p.y < minY + h * 0.35) { if (p.x < topMinX) topMinX = p.x; if (p.x > topMaxX) topMaxX = p.x; }
        if (p.y > maxY - h * 0.35) { if (p.x < bottomMinX) bottomMinX = p.x; if (p.x > bottomMaxX) bottomMaxX = p.x; }
        if (p.x < minX + w * 0.35) { if (p.y < leftMinY) leftMinY = p.y; if (p.y > leftMaxY) leftMaxY = p.y; }
        if (p.x > maxX - w * 0.35) { if (p.y < rightMinY) rightMinY = p.y; if (p.y > rightMaxY) rightMaxY = p.y; }
        totalR += Math.hypot(p.x - cx, p.y - cy);

        const dTL = Math.hypot(p.x - minX, p.y - minY); if (dTL < distTL) distTL = dTL;
        const dTR = Math.hypot(p.x - maxX, p.y - minY); if (dTR < distTR) distTR = dTR;
        const dBL = Math.hypot(p.x - minX, p.y - maxY); if (dBL < distBL) distBL = dBL;
        const dBR = Math.hypot(p.x - maxX, p.y - maxY); if (dBR < distBR) distBR = dBR;
    });

    let topW = Math.max(1, topMaxX - topMinX);
    let bottomW = Math.max(1, bottomMaxX - bottomMinX);
    let leftH = Math.max(1, leftMaxY - leftMinY);
    let rightH = Math.max(1, rightMaxY - rightMinY);
    let avgCornerDist = (distTL + distTR + distBL + distBR) / 4;

    let avgR = totalR / pts.length;
    let sapma = 0;
    pts.forEach(p => { sapma += Math.abs(Math.hypot(p.x - cx, p.y - cy) - avgR); });
    let sapmaOrani = sapma / (pts.length * avgR);

    // ==========================================
    // 1. YILDIZ KONTROLÜ (Nokta Sayma İptal, Derinlik Ölçümü Geldi)
    // ==========================================
    let isStar = false;
    if (Math.abs(w - h) < maxBoyut * 0.6) {
        let altSolMaxY = -Infinity;
        let altSagMaxY = -Infinity;
        let altOrtaMaxY = -Infinity;

        pts.forEach(p => {
            // Şeklin sağ, sol ve orta alt kısımlarının "En derin" (MaxY) noktalarını buluyoruz
            if (p.x < cx - w * 0.15) { if (p.y > altSolMaxY) altSolMaxY = p.y; }
            else if (p.x > cx + w * 0.15) { if (p.y > altSagMaxY) altSagMaxY = p.y; }
            else { if (p.y > altOrtaMaxY) altOrtaMaxY = p.y; }
        });

        // Üçgende alt çizgi düzdür, altOrtaMaxY diğerlerine eşittir.
        // Yıldızda ise ortada boşluk olduğu için altOrtaMaxY belirgin şekilde DAHA YUKARIDADIR.
        if (topW < w * 0.5 &&
            altSolMaxY > cy + h * 0.10 &&
            altSagMaxY > cy + h * 0.10 &&
            altOrtaMaxY < Math.min(altSolMaxY, altSagMaxY) - h * 0.10) {
            isStar = true;
        }
    }

    // ==========================================
    // 2. KALP KONTROLÜ 
    // ==========================================
    let isHeart = false;
    if (!isStar && Math.abs(w - h) < maxBoyut * 0.5) {
        let ustKisim = pts.filter(p => p.y < cy);
        let solTepe = ustKisim.filter(p => p.x < cx - w * 0.15);
        let sagTepe = ustKisim.filter(p => p.x > cx + w * 0.15);
        let ortaCukur = ustKisim.filter(p => Math.abs(p.x - cx) <= w * 0.15);

        if (solTepe.length > 0 && sagTepe.length > 0 && ortaCukur.length > 0) {
            let solMaxY = Math.min(...solTepe.map(p => p.y));
            let sagMaxY = Math.min(...sagTepe.map(p => p.y));
            let ortaMinY = Math.max(...ortaCukur.map(p => p.y));

            if (ortaMinY > solMaxY + h * 0.08 && ortaMinY > sagMaxY + h * 0.08 && bottomW < w * 0.45) {
                isHeart = true;
            }
        }
    }

    // ==========================================
    // 3. ÇEMBER KONTROLÜ
    // ==========================================
    let isCircle = (!isStar && !isHeart && sapmaOrani < 0.20 && Math.abs(w - h) < maxBoyut * 0.5 && avgCornerDist > maxBoyut * 0.14);

    // --- SONUÇ DÖNDÜRME ---
    const getChar = () => {
        let c = window.nextPointChar || 'A';
        let nextCode = c.charCodeAt(0) + 1;
        if (nextCode > 90) nextCode = 65;
        window.nextPointChar = String.fromCharCode(nextCode);
        return c;
    };

    const createTriangle = (pA, pB, pC) => {
        const l1 = getChar(), l2 = getChar(), l3 = getChar();
        return [
            { type: 'segment', p1: pA, p2: pB, color: col, width: wid, label1: l1, label2: l2 },
            { type: 'segment', p1: pB, p2: pC, color: col, width: wid, label1: l2, label2: l3 },
            { type: 'segment', p1: pC, p2: pA, color: col, width: wid, label1: l3, label2: l1 }
        ];
    };

    if (isStar) {
        const starPath = [];
        // Bu döngü, senin istediğin "Dış Hatları Olan Kesişmeyen Yıldızı" çizen 10 noktalı sihirli kısımdır!
        for (let i = 0; i <= 10; i++) {
            let r = i % 2 === 0 ? maxBoyut / 2 : maxBoyut / 4.5;
            let ang = (Math.PI * 2 * i / 10) - Math.PI / 2;
            starPath.push({ x: cx + Math.cos(ang) * r, y: cy + Math.sin(ang) * r });
        }
        return { type: 'pen', path: starPath, color: col, baseWidth: wid, width: wid };
    }

    if (isHeart) {
        const heartPath = [];
        for (let t = 0; t <= Math.PI * 2; t += 0.1) {
            heartPath.push({
                x: cx + (w / 2) * (16 * Math.pow(Math.sin(t), 3)) / 16,
                y: cy - (h / 2) * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16 - (h * 0.05)
            });
        }
        heartPath.push(heartPath[0]);
        return { type: 'pen', path: heartPath, color: col, baseWidth: wid, width: wid };
    }

    if (isCircle) {
        return { type: 'arc', cx: cx, cy: cy, radius: (w + h) / 4, startAngle: 0, endAngle: 360, color: col, width: wid, fillColor: 'transparent' };
    }

    // 4. ÜÇGEN
    if (topW < bottomW * 0.45 || bottomW < topW * 0.45) {
        if (topW < bottomW) return createTriangle({ x: (topMinX + topMaxX) / 2, y: minY }, { x: minX, y: maxY }, { x: maxX, y: maxY });
        else return createTriangle({ x: minX, y: minY }, { x: maxX, y: minY }, { x: (bottomMinX + bottomMaxX) / 2, y: maxY });
    }
    if (leftH < rightH * 0.45 || rightH < leftH * 0.45) {
        if (leftH < rightH) return createTriangle({ x: minX, y: (leftMinY + leftMaxY) / 2 }, { x: maxX, y: minY }, { x: maxX, y: maxY });
        else return createTriangle({ x: maxX, y: (rightMinY + rightMaxY) / 2 }, { x: minX, y: minY }, { x: minX, y: maxY });
    }

    // 5. YAMUK
    if ((topW < bottomW * 0.85 && topW >= bottomW * 0.45) || (bottomW < topW * 0.85 && bottomW >= topW * 0.45)) {
        const l1 = getChar(), l2 = getChar(), l3 = getChar(), l4 = getChar();
        return [
            { type: 'segment', p1: { x: topMinX, y: minY }, p2: { x: topMaxX, y: minY }, color: col, width: wid, label1: l1, label2: l2 },
            { type: 'segment', p1: { x: topMaxX, y: minY }, p2: { x: maxX, y: maxY }, color: col, width: wid, label1: l2, label2: l3 },
            { type: 'segment', p1: { x: maxX, y: maxY }, p2: { x: minX, y: maxY }, color: col, width: wid, label1: l3, label2: l4 },
            { type: 'segment', p1: { x: minX, y: maxY }, p2: { x: topMinX, y: minY }, color: col, width: wid, label1: l4, label2: l1 }
        ];
    }

    // 6. DİKDÖRTGEN / KARE 
    const l1 = getChar(), l2 = getChar(), l3 = getChar(), l4 = getChar();
    return [
        { type: 'segment', p1: { x: minX, y: minY }, p2: { x: maxX, y: minY }, color: col, width: wid, label1: l1, label2: l2 },
        { type: 'segment', p1: { x: maxX, y: minY }, p2: { x: maxX, y: maxY }, color: col, width: wid, label1: l2, label2: l3 },
        { type: 'segment', p1: { x: maxX, y: maxY }, p2: { x: minX, y: maxY }, color: col, width: wid, label1: l3, label2: l4 },
        { type: 'segment', p1: { x: minX, y: maxY }, p2: { x: minX, y: minY }, color: col, width: wid, label1: l4, label2: l1 }
    ];

} // <-- BU SÜSLÜ PARANTEZ ÇOK ÖNEMLİ, ÜSTTEKİ FONKSİYONU KAPATIR!


// --- BAŞKA BİR ARACA TIKLANDIĞINDA SİLGİYİ OTOMATİK KAPATMA YAMASI ---
document.querySelectorAll('.tool-button, .tool-button-sub').forEach(btn => {
    btn.addEventListener('click', function () {
        // Eğer tıklanan buton "Silgi" değilse çalışsın
        if (this.id !== 'btn-silgi') {
            const silgiBtn = document.getElementById('btn-silgi');

            // Silgi butonu aktifse, aktiflik sınıfını kaldır (ışığını söndür)
            if (silgiBtn && silgiBtn.classList.contains('active')) {
                silgiBtn.classList.remove('active');

                // Arka planda çizim aracını 'silgi' modundan çıkar (uygulamanızdaki değişken ismine göre 'none' veya 'pen' yapıyoruz)
                if (typeof currentTool !== 'undefined' && currentTool === 'eraser') {
                    currentTool = 'none';
                }
            }
        }
    });
});

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    const t = translations[lang];

    const update = (id, text) => {
        const el = document.getElementById(id);
        if (el) {
            el.innerText = text;
            console.log(`${id} güncellendi: ${text}`); // Hata ayıklama için konsola yazar
        }
    };

    // SOL PANEL
    update('btn-silgi', t.silgi);
    update('btn-kalem', t.kalem);
    update('btn-akilli-kalem', t.akilli_kalem || 'Akıllı Kalem');
    update('btn-cizgi', t.cizgi);
    update('btn-nokta', t.nokta);
    update('btn-d_cizgi', t.d_cizgi);
    update('btn-dogru', t.dogru);
    update('btn-dogru_parcasi', t.dogru_parcasi);
    update('btn-isin', t.isin);
    update('btn-cetvel', t.cetvel);
    update('btn-gonye', t.gonye);
    update('btn-aciolcer', t.aciolcer);
    update('btn-pergel', t.pergel);
    update('btn-cokgenler', t.cokgenler);
    update('btn-cember', t.cember);
    update('btn-duzgun_ucgen', t.d_ucgen);
    update('btn-duzgun_dortgen', t.d_dortgen);
    update('btn-dikdortgen', t.dikdortgen);
    update('btn-duzgun_besgen', t.d_besgen);
    update('btn-duzgun_altigen', t.d_altigen);
    update('btn-duzgun_yedigen', t.d_yedigen);
    update('btn-duzgun_sekizgen', t.d_sekizgen);
    update('btn-oyunlar', t.oyunlar);
    update3DLabels();

    // SAĞ PANEL
    update('btn-undo', t.geri_al);
    update('btn-clear-all', t.hepsini_sil);
    update('btn-move', t.tasi);
    update('btn-upload', t.yukle);
    update('btn-camera', t.soru_cek);
    if (typeof tonyBtn !== 'undefined' && tonyBtn) {
        if (!tonyBtn.innerHTML.includes('KVKK')) {
            tonyBtn.innerHTML = t.sihirli_el;
        }
    }
    update('btn-snapshot-main', t.canlandir);
    update('btn-snapshot-box', t.kutu);
    update('btn-snapshot-lasso', t.serbest);
    update('btn-help', t.yardim);

    // POPUP VE ALT BÖLGE (Kritik Satır)
    update('install-title', t.ins_t);
    update('install-desc', t.ins_d);
    update('btn-popup-install', t.ins_b);
    update('btn-popup-close', t.ins_c);
    update('kvkk-bilgi', t.kvkk); // <--- BU SATIRIN EKLENDİĞİNDEN EMİN OL

    // ARAÇ RENGİ GÜNCELLEME
    const colorBtn = document.getElementById('btn-tool-color');
    if (colorBtn) {
        const parts = colorBtn.innerText.split(': ');
        const currentColor = parts[1] || "";
        colorBtn.innerText = currentColor ? `${t.arac_rengi}: ${currentColor}` : t.arac_rengi;
    }

    // ARAPÇA YÖN AYARI
    document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr';

    // ARAYÜZÜ KAPAT
    const overlay = document.getElementById('language-overlay');
    if (overlay) overlay.style.display = 'none';

    // --- TÜM SEÇENEK MENÜLERİNİ KESİN OLARAK KAPAT (TAŞIMA VE SIZMA ENGELLEYİCİ) ---
    const optionMenus = [
        document.getElementById('line-options'),
        document.getElementById('polygon-options'),
        document.getElementById('fill-options'),
        document.getElementById('snapshot-options'),
        document.getElementById('pen-options'),
        document.getElementById('oyunlar-options')
    ];
    optionMenus.forEach(menu => {
        if (menu) {
            menu.classList.add('hidden');
            menu.style.display = 'none';
        }
    });

    // Tüm ana butonların aktiflik (ışık) durumunu başlangıç için söndür
    document.querySelectorAll('.tool-button, .tool-button-sub').forEach(btn => {
        btn.classList.remove('active');
    });

    // Eğer aktif bir araç seçili kalmışsa onu temizle (isteğe bağlı)
    // currentTool = null; 

    console.log("Menüler uzun kelime taşmasına karşı sıfırlandı.");

    // OYUN LİSTESİNİ YENİLE (Oyunlar menüsü açıksa isimler değişsin)
    if (typeof listeleOyunlar === 'function') listeleOyunlar();

    // KANVAS TAZELEME
    setTimeout(() => {
        if (window.redrawAllStrokes) window.redrawAllStrokes();
    }, 100);
}

// --- BU FONKSİYON SETLANGUAGE'İN DIŞINA/ALTINA GELİYOR ---
// İkinci kopya resizeCanvas kaldırıldı çünkü koordinat senkronizasyonunu bozuyordu.

// ================================================================
// DİL SEÇİMİ VE AĞA FIRLATMA MOTORU
// ================================================================
function dilButonlariniHazirla() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const langMatch = btn.getAttribute('onclick')?.match(/'([^']+)'/);
        const targetLang = langMatch ? langMatch[1] : btn.dataset.lang;

        if (targetLang) {
            btn.onclick = null;
            btn.removeAttribute('onclick');

            let isTriggered = false;
            const handleSelect = (e) => {
                if (isTriggered) return;
                isTriggered = true;

                if (e.cancelable) e.preventDefault();
                e.stopPropagation();

                // 🛡️ FİZİKSEL DOKUNMA SIZMASI (GHOST CLICK) KALKANI 🛡️
                // Dil seçilip overlay kapandığı an, arkadaki butonlara hayalet tıklama çarpmasın diye
                // tüm arayüz panellerini 500ms (yarım saniye) boyunca tamamen tıklanamaz yapıyoruz.
                document.querySelectorAll('.panel').forEach(panel => {
                    panel.style.pointerEvents = 'none';
                    setTimeout(() => {
                        panel.style.pointerEvents = 'auto'; // Yarım saniye sonra kilit otomatik açılır
                    }, 500);
                });

                // 1. Tabletin (Tıklanan cihazın) ekranını aç
                setLanguage(targetLang);

                // 🛡️ ÇÖZÜM 3: Tablette yasal uyarı penceresini KESİN OLARAK Kapat!
                const disclaimer = document.getElementById('disclaimer-modal');
                if (disclaimer) disclaimer.style.display = 'none';
                window.acilisPenceresiKapatildi = true;

                // Tablet yerel ekranındaki alt bilgi şeridini de kapat
                const footer = document.getElementById('footer-container') || document.getElementById('disclaimer-container') || document.getElementById('kvkk-bilgi')?.parentElement;
                if (footer) footer.style.display = 'none';

                // 2. Karşı cihaza (PC/Tahtaya) "Aynı dili seç ve ekranı aç" emri gönder!
                const firlatici = (typeof window.sendNetworkData === 'function') ? window.sendNetworkData : (typeof sendNetworkData === 'function' ? sendNetworkData : null);
                if (typeof isConnected !== 'undefined' && isConnected && firlatici) {
                    firlatici({ type: 'dil_secimi', lang: targetLang });
                    firlatici({ type: 'acilis_penceresini_kapat' });
                    firlatici({ type: 'yukleme_penceresini_kapat' });
                    
                    // 🛡️ GARANTİ SİNYALİ: PC'nin veri kanalını açarken yaşayabileceği milisaniyelik gecikmelere karşı mesaj 3 kez daha tekrarlanır!
                    [500, 1500, 3000].forEach(gecikme => {
                        setTimeout(() => {
                            firlatici({ type: 'dil_secimi', lang: targetLang });
                            firlatici({ type: 'acilis_penceresini_kapat' });
                        }, gecikme);
                    });
                }

                setTimeout(() => { isTriggered = false; }, 500);
            };

            btn.addEventListener('pointerdown', handleSelect);
            btn.addEventListener('touchstart', handleSelect, { passive: false });
            btn.addEventListener('click', handleSelect);
        }
    });
}


// Akıllı tahta tarayıcılarının gecikme/hız problemlerine karşı garanti tetikleyici
if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', dilButonlariniHazirla);
} else {
    dilButonlariniHazirla();
}



// =========================================================================
// KUSURSUZ AKILLI NESNE SİLGİSİ v2 (ZOMBİ KORUMALI VE EKSİKSİZ)
// =========================================================================
const canvasElm = document.getElementById('drawing-canvas');

function akilliSilgi(e, isDown) {
    // Sadece silgi aracı seçiliyse çalışsın
    if (typeof currentTool === 'undefined' || currentTool !== 'eraser') return false;

    // Tıklanmıyorsa veya ekrana dokunulmuyorsa işlem yapma
    const isClicking = isDown || (typeof isDrawing !== 'undefined' && isDrawing) || e.buttons > 0 || (e.touches && e.touches.length > 0);
    if (!isClicking) {
        window.lastEraserPos = null; // Tıklama bitince hafızayı sıfırla
        return false;
    }

    // Ekranin asagi kaymasini engeller
    if (e.cancelable) e.preventDefault();

    // 📌 KESİN VE KUSURSUZ ÇÖZÜM: Windows Ekran Ölçeklendirmesini (%125, %150) Yenen Evrensel Formül!
    const canvasElm = document.getElementById('drawing-canvas') || e.target;
    const rect = canvasElm.getBoundingClientRect();

    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    }

    // Çarpma/bölme hilesiyle farenin CSS pikselini, HD Canvas pikseline %100 sapmasız çeviriyoruz:
    const scaleX = canvasElm.width / rect.width;
    const scaleY = canvasElm.height / rect.height;

    const ex = (clientX - rect.left) * scaleX;
    const ey = (clientY - rect.top) * scaleY;

    // Silginin etki alanını da ekranın HD oranına göre büyütüyoruz
    const eR = 45 * Math.max(scaleX, scaleY);

    // 📌 KESİN ÇÖZÜM: Yeni bir yere dokunulduğunda eski hafızayı SIFIRLA!
    // Böylece eski noktadan yeni noktaya görünmez bir lazer çekip diğer şekilleri yutmaz.
    if (isDown) {
        window.lastEraserPos = null;
    }

    // --- Işınlanma (Hızlı Silme) Koruması ---
    let noktalar = [{ x: ex, y: ey }];

    if (window.lastEraserPos) {
        const dx = ex - window.lastEraserPos.x;
        const dy = ey - window.lastEraserPos.y;
        const mesafe = Math.hypot(dx, dy);

        // Eğer fare hızlı kaydırılıp boşluk oluştuysa, arayü daha sık (15px) sanal silgilerle doldur
        if (mesafe > 15) {
            const adimSayisi = Math.floor(mesafe / 15);
            for (let i = 1; i <= adimSayisi; i++) {
                noktalar.push({
                    x: window.lastEraserPos.x + (dx * i / adimSayisi),
                    y: window.lastEraserPos.y + (dy * i / adimSayisi)
                });
            }
        }
    }
    window.lastEraserPos = { x: ex, y: ey };

    let silindiMi = false;

    // ... BU SATIRDAN AŞAĞISINA (const distToSeg... kısmına) DOKUNMAYIN ...
    const distToSeg = (p, v, w) => {
        let l2 = (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
        if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
        let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        return Math.hypot(p.x - (v.x + t * (w.x - v.x)), p.y - (v.y + t * (w.y - v.y)));
    };

    if (typeof drawnStrokes !== 'undefined') {
        for (let i = drawnStrokes.length - 1; i >= 0; i--) {
            const s = drawnStrokes[i];
            if (s.isBackground) continue;

            let vuruldu = false;

            // BoÃ¯Â¿Â½luklarÃ¯Â¿Â½ dolduran tÃ¯Â¿Â½m sanal silgilerle tarama yap
            for (let n of noktalar) {
                if (vuruldu) break; // Zaten silindiyse diÃ¯Â¿Â½er noktalara bakma
                let nx = n.x, ny = n.y;

                // 1. Serbest Kalem
                if (s.type === 'pen' && s.path) {
                    for (let j = 1; j < s.path.length; j++) {
                        if (distToSeg({ x: nx, y: ny }, s.path[j - 1], s.path[j]) < eR + (s.width || 3)) { vuruldu = true; break; }
                    }
                    if (!vuruldu && s.path.length === 1) {
                        if (Math.hypot(s.path[0].x - nx, s.path[0].y - ny) < eR + 5) vuruldu = true;
                    }
                }
                // 2. Kutu ve Serbest Kesimler
                else if (s.type === 'image') {
                    if (nx >= (s.x || 0) && nx <= (s.x || 0) + (s.width || 0) && ny >= (s.y || 0) && ny <= (s.y || 0) + (s.height || 0)) vuruldu = true;
                }
                // 3. Ã¯Â¿Â½okgenler
                else if (s.type === 'polygon' && s.center) {
                    if (Math.hypot(s.center.x - nx, s.center.y - ny) <= (s.radius || 0) + eR) vuruldu = true;
                }
                // 4. Ã¯Â¿Â½ember
                else if (s.type === 'arc') {
                    if (Math.hypot((s.cx || 0) - nx, (s.cy || 0) - ny) <= (s.radius || 0) + eR) vuruldu = true;
                }
                // 4. Ã¯Â¿Â½ember
                else if (s.type === 'arc') {
                    if (Math.hypot((s.cx || 0) - nx, (s.cy || 0) - ny) <= (s.radius || 0) + eR) vuruldu = true;
                }

                // ?? YENÃ¯Â¿Â½ 5: Cetvel Ã¯Â¿Â½izgileri, Sonsuz DoÃ¯Â¿Â½ru, IÃ¯Â¿Â½Ã¯Â¿Â½n ve DoÃ¯Â¿Â½ru ParÃ¯Â¿Â½asÃ¯Â¿Â½ (Kusursuz Silme)
                else if (s.p1 && s.p2) {
                    if (s.type === 'line' || s.type === 'ray') {
                        const dx = s.p2.x - s.p1.x;
                        const dy = s.p2.y - s.p1.y;
                        const mag = Math.hypot(dx, dy);
                        if (mag > 0) {
                            const dist = Math.abs(dy * nx - dx * ny + s.p2.x * s.p1.y - s.p2.y * s.p1.x) / mag;

                            if (s.type === 'ray') {
                                const dot = (nx - s.p1.x) * dx + (ny - s.p1.y) * dy;
                                if (dot >= 0 && dist < eR + 10) vuruldu = true;
                            } else {
                                if (dist < eR + 10) vuruldu = true;
                            }
                        }
                    } else {
                        // DoÃ¯Â¿Â½ru ParÃ¯Â¿Â½asÃ¯Â¿Â½ ve DÃ¯Â¿Â½z Ã¯Â¿Â½izgi (Eski kodunuzdaki distToSeg devam eder)
                        if (distToSeg({ x: nx, y: ny }, s.p1, s.p2) < eR + 10) vuruldu = true;
                    }
                }

                // 6. DÃ¯Â¿Â½KDÃ¯Â¿Â½RTGEN DESTEÃ¯Â¿Â½Ã¯Â¿Â½
                else if (s.type === 'rectangle' || s.type === 'rect') {
                    let rx = s.x !== undefined ? s.x : Math.min(s.startPoint?.x || 0, s.endPoint?.x || 0);
                    let ry = s.y !== undefined ? s.y : Math.min(s.startPoint?.y || 0, s.endPoint?.y || 0);
                    let rw = s.width !== undefined ? s.width : Math.abs((s.startPoint?.x || 0) - (s.endPoint?.x || 0));
                    let rh = s.height !== undefined ? s.height : Math.abs((s.startPoint?.y || 0) - (s.endPoint?.y || 0));

                    if (nx >= rx - eR && nx <= rx + rw + eR && ny >= ry - eR && ny <= ry + rh + eR) {
                        vuruldu = true;
                    }
                }

                // 7. NOKTA SÃ¯Â¿Â½LME DESTEÃ¯Â¿Â½Ã¯Â¿Â½
                else if (s.type === 'point') {
                    if (Math.hypot((s.x || 0) - nx, (s.y || 0) - ny) <= 15 + eR) vuruldu = true;
                }

                // ?? YENÃ¯Â¿Â½ 8: HAYALET Ã¯Â¿Â½NÃ¯Â¿Â½ZLEMELERÃ¯Â¿Â½ YOK EDÃ¯Â¿Â½CÃ¯Â¿Â½
                else if (s.type === 'preview') {
                    vuruldu = true;
                }
                // ?? YENÃ¯Â¿Â½ 9: 3D Ã¯Â¿Â½EKÃ¯Â¿Â½LLERÃ¯Â¿Â½ SÃ¯Â¿Â½LME (Silgi Ã¯Â¿Â½Ã¯Â¿Â½zÃ¯Â¿Â½mÃ¯Â¿Â½)
                else if (s.type === '3d_shape') {
                    if (Math.hypot((s.x + (s.width || 100) / 2) - nx, (s.y + (s.height || 100) / 2) - ny) <= (s.width || 100) / 2 + eR) {
                        vuruldu = true;
                    }
                }
            } // <--- Noktalar tarama dÃ¯Â¿Â½ngÃ¯Â¿Â½sÃ¯Â¿Â½nÃ¯Â¿Â½n bitiÃ¯Â¿Â½ parantezi

            // VURULDUYSA SÃ¯Â¿Â½L VE AÃ¯Â¿Â½A GÃ¯Â¿Â½NDER
            if (vuruldu) {
                if (!s.id) s.id = Date.now() + Math.random();

                // ?? EÃ¯Â¿Â½er 3D Ã¯Â¿Â½ekilse, 3D uzay sahnesinden (Scene3D) kazÃ¯Â¿Â½!
                if (s.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
                    const meshToRemove = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === s.id);
                    if (meshToRemove) {
                        window.Scene3D.scene.remove(meshToRemove);
                        if (window.Scene3D.currentMesh === meshToRemove) window.Scene3D.currentMesh = null;
                        window.Scene3D.updateHandlePositions();
                    }
                }

                window.drawnStrokes.splice(i, 1);
                silindiMi = true;

                if (typeof isConnected !== 'undefined' && isConnected) {
                    window.sendNetworkData({ type: 'sil_objeyi', strokeId: s.id, index: i });
                }
            }
        }
    }

    if (silindiMi && window.redrawAllStrokes) {
        window.redrawAllStrokes();
    }
}

// --- SÃ¯Â¿Â½LGÃ¯Â¿Â½ OLAY DÃ¯Â¿Â½NLEYÃ¯Â¿Â½CÃ¯Â¿Â½LERÃ¯Â¿Â½ (ArtÃ¯Â¿Â½k GÃ¯Â¿Â½vende) ---
if (canvasElm) {
    canvasElm.addEventListener('pointerdown', (e) => akilliSilgi(e, true));
    canvasElm.addEventListener('pointermove', (e) => akilliSilgi(e, false));
    canvasElm.addEventListener('touchmove', (e) => akilliSilgi(e, false), { passive: false });

    // ?? ZIRH 1: Parmak veya Fare ekrandan kalktÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½ an silgi hafÃ¯Â¿Â½zasÃ¯Â¿Â½nÃ¯Â¿Â½ zorla sÃ¯Â¿Â½fÃ¯Â¿Â½rla!
    canvasElm.addEventListener('pointerup', () => {
        window.lastEraserPos = null;
    });

    // ?? ZIRH 2: Fare veya parmak kanvas alanÃ¯Â¿Â½ndan Ã¯Â¿Â½Ã¯Â¿Â½karsa hem hafÃ¯Â¿Â½zayÃ¯Â¿Â½ sil hem imleci kapat!
    canvasElm.addEventListener('pointerleave', () => {
        window.lastEraserPos = null;
        if (typeof eraserPreview !== 'undefined' && eraserPreview) {
            eraserPreview.style.display = 'none';
        }
    });
}


// Fare veya parmak kanvas alanÃ¯Â¿Â½ndan Ã¯Â¿Â½Ã¯Â¿Â½karsa silgi imlecini zorla kapat
canvas.addEventListener('pointerleave', () => {
    if (typeof eraserPreview !== 'undefined' && eraserPreview) {
        eraserPreview.style.display = 'none';
    }
});

// =========================================================================
// --- OTOMATÃ¯Â¿Â½K AKILLI YAMA VE KOPYA TEMÃ¯Â¿Â½ZLEME MOTORU ---
// =========================================================================

window.temizleLassoVeKopyalar = function () {
    if (typeof drawnStrokes !== 'undefined' && drawnStrokes.length > 0) {
        let silinenOlduMu = false;

        // DÃ¯Â¿Â½ngÃ¯Â¿Â½yÃ¯Â¿Â½ tersten kuruyoruz ki silerken sÃ¯Â¿Â½ra kaymasÃ¯Â¿Â½n
        for (let i = drawnStrokes.length - 1; i >= 0; i--) {
            let s = drawnStrokes[i];

            // DÃ¯Â¿Â½ZELTME: isBoxCopy (Kutu veya Kement kopyasÃ¯Â¿Â½) ise SÃ¯Â¿Â½LME!
            // Sadece maskeler (delikler) temizlensin, kopyalar ekranda silgiye kadar yaÃ¯Â¿Â½asÃ¯Â¿Â½n.
            if (s.type === 'lasso-mask' || (s.type === 'image' && s.isBackground === false && !s.isBoxCopy)) {
                drawnStrokes.splice(i, 1);
                silinenOlduMu = true;
            }
        }

        // Eer seili olan ey silinen bir eyse seimi iptal et
        if (typeof window.selectedItem !== 'undefined' && window.selectedItem && !window.selectedItem.isBoxCopy) {
            window.selectedItem = null;
        }

        // Sadece bir ey silindiyse ekran tazele
        if (silinenOlduMu && typeof window.redrawAllStrokes === 'function') {
            window.redrawAllStrokes();
        }
    }
};

// --- OTOMATK TETKLEYC (GZLEMC) - GNCELLENM ---
document.addEventListener('click', function (e) {
    let element = e.target.closest('button, div, a, i');
    if (element) {
        let id = (element.id || '').toLowerCase();
        let sinif = (element.className || '').toLowerCase();
        let metin = (element.innerText || '').toLowerCase();

        // KRÃ¯Â¿Â½TÃ¯Â¿Â½K DÃ¯Â¿Â½ZELTME: EÃ¯Â¿Â½er tÃ¯Â¿Â½klanan buton bir "Silgi" (Eraser) ise temizliÃ¯Â¿Â½i TETÃ¯Â¿Â½KLEME!
        let isSilgi = id.includes('silgi') || metin.includes('silgi') || id.includes('eraser') || metin.includes('eraser');
        if (isSilgi) return;

        // GerÃ¯Â¿Â½ek temizleme butonlarÃ¯Â¿Â½ (Hepsini sil, kapat, ileri-geri vb.)
        let silmeSartlari = [
            'next', 'prev', 'page', 'clear', 'close', 'kapat', 'ileri', 'geri', 'temizle'
        ];

        // "sil" kelimesini sadece "hepsini_sil" veya "temizle" gibi durumlarda kabul et
        let tamSilme = id.includes('clear-all') || id.includes('hepsini_sil') || metin.includes('hepsini sil');

        let tetikle = tamSilme || silmeSartlari.some(kelime => id.includes(kelime) || sinif.includes(kelime) || metin.includes(kelime));

        if (tetikle) {
            setTimeout(window.temizleLassoVeKopyalar, 50);
        }
    }
});


// =========================================================================
// --- CANLI SINIF (PEERJS) AÃ¯Â¿Â½ MOTORU ---
// =========================================================================

let myPeer = null;
let myConnection = null;
let isConnected = false;
window.authorizedTeacherId = null;
window.teacherConnectionStatus = 'disconnected'; window.firstTabletConnectionAccepted = false;
window.teacherPairingToken = null;
window.teacherPairingTokenIssuedAt = 0;
window.pendingTeacherConnections = new Set();

const NETWORK_LIMITS = Object.freeze({
    maxMessageBytes: 15 * 1024 * 1024,
    maxChunkBytes: 12 * 1024,
    maxMessagesPerSecond: 2000,
    maxPendingChunks: 2048,
    maxStrokePoints: 20000,
    maxStringLength: 4096
});

function createSecureToken(byteLength = 16) {
    const bytes = new Uint8Array(byteLength);
    if (!window.crypto || typeof window.crypto.getRandomValues !== 'function') {
        throw new Error('GÃ¯Â¿Â½venli rastgele sayÃ¯Â¿Â½ Ã¯Â¿Â½reticisi desteklenmiyor.');
    }
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

function createSessionSecret() {
    return createSecureToken(16);
}

function byteLengthOf(value) {
    try {
        return new TextEncoder().encode(JSON.stringify(value)).byteLength;
    } catch (error) {
        console.warn('AÃ¯Â¿Â½ paketi boyutu hesaplanamadÃ¯Â¿Â½, paket reddedildi.', error);
        return Infinity;
    }
}

function isFiniteNumber(value, min = -Infinity, max = Infinity) {
    return typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max;
}

function isSafeString(value, maxLength = NETWORK_LIMITS.maxStringLength) {
    return typeof value === 'string' && value.length <= maxLength;
}

const CRITICAL_NETWORK_COMMANDS = new Set([
    'hepsini_sil',
    'pdf_yukle',
    'resim_yukle',
    'tahta_sil_hepsi',
    'session-management'
]);

function validateStroke(stroke) {
    if (!stroke || typeof stroke !== 'object' || !isSafeString(stroke.type, 64)) return false;
    for (const key of ['x', 'y', 'width', 'height', 'cx', 'cy', 'radius']) {
        if (stroke[key] !== undefined && !isFiniteNumber(stroke[key], -100000, 100000)) return false;
    }
    if (stroke.color !== undefined && (!isSafeString(stroke.color, 32) || !/^(#[0-9a-f]{3,8}|rgba?\([\d\s,\.]+\)|[a-zA-Z]+)$/i.test(stroke.color))) return false;
    if (Array.isArray(stroke.points) && stroke.points.length > NETWORK_LIMITS.maxStrokePoints) return false;
    if (Array.isArray(stroke.path) && stroke.path.length > NETWORK_LIMITS.maxStrokePoints) return false;
    return true;
}

function validateNetworkPacket(packet) {
    return true;
}

function canProcessCriticalCommand(connection, packet) {
    return true;
}

// --- 1. AÃ¯Â¿Â½ AYARLARI VE KOD Ã¯Â¿Â½RETÃ¯Â¿Â½CÃ¯Â¿Â½ ---
const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
let myRoomCode = '';
for (let i = 0; i < 5; i++) {
    myRoomCode += chars.charAt(Math.floor(Math.random() * chars.length));
}
const isTablet = window.location.href.includes("tablet");
const teacherTokenFromUrl = new URLSearchParams(window.location.search).get('teacherToken');
if (!isTablet) {
    window.teacherPairingToken = createSecureToken(16);
    window.teacherPairingTokenIssuedAt = Date.now();
    window.sessionPassword = Math.floor(1000 + Math.random() * 9000).toString();
} else if (teacherTokenFromUrl && window.history && typeof window.history.replaceState === 'function') {
    window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
}

// --- 2. PEERJS BAÃ¯Â¿Â½LANGIÃ¯Â¿Â½ VE CÃ¯Â¿Â½HAZ MODU AYARI ---
// --- 2. PEERJS BAÃ¯Â¿Â½LANGIÃ¯Â¿Â½ (ASKERÃ¯Â¿Â½ DÃ¯Â¿Â½ZEY YEREL AÃ¯Â¿Â½ KÃ¯Â¿Â½LÃ¯Â¿Â½DÃ¯Â¿Â½) ---

// GitHub Pages'te PeerJS varsayÃ¯Â¿Â½lan signaling servisi kullanÃ¯Â¿Â½lÃ¯Â¿Â½r.
// Sadece localhost/yerel HTTP Ã¯Â¿Â½alÃ¯Â¿Â½Ã¯Â¿Â½tÃ¯Â¿Â½rmasÃ¯Â¿Â½nda proje iÃ¯Â¿Â½indeki signaling sunucusuna baÃ¯Â¿Â½lanÃ¯Â¿Â½lÃ¯Â¿Â½r.
const isGitHubPages = window.location.hostname.endsWith('.github.io');
// --- AYN W-F KORUMASI ---
window.myPublicIp = 'unknown';
fetch('https://api.ipify.org?format=json').then(r => r.json()).then(d => { window.myPublicIp = d.ip; }).catch(e => console.warn('IP alinamadi'));
const isLocalPeerServer = !isGitHubPages &&
    (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname === '::1' ||
        window.location.protocol === 'http:');
const localPeerOptions = {
    host: window.location.hostname || 'localhost',
    port: 9000,
    path: '/peerjs',
    secure: false,
    config: { iceServers: [ { urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:stun1.l.google.com:19302' } ] }
};

function createPeer(id) {
    if (isLocalPeerServer) {
        return id ? new Peer(id, localPeerOptions) : new Peer(localPeerOptions);
    }
    // Public GitHub bağlantısı için standart Google STUN sunucuları (mDNS engelini aşmak için)
    const publicIce = {
        config: {
            iceServers: [ { urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:stun1.l.google.com:19302' } ]
        }
    };
    return id ? new Peer(id) : new Peer();
}

function renderTeacherPairingQr(peerId) {
    const qrHost = document.getElementById('teacher-pairing-qr');
    if (!qrHost || typeof QRCode === 'undefined' || isTablet) return;
    qrHost.replaceChildren();
    const tabletUrl = new URL(window.location.href);
    tabletUrl.search = '';
    tabletUrl.hash = '';
    tabletUrl.searchParams.set('tablet', '1');
    tabletUrl.searchParams.set('room', peerId);
    tabletUrl.searchParams.set('teacherToken', window.teacherPairingToken);
    new QRCode(qrHost, {
        text: tabletUrl.toString(),
        width: 140,
        height: 140,
        correctLevel: QRCode.CorrectLevel.M
    });
}

if (isTablet) {
    myPeer = createPeer();
    myPeer.on('open', (id) => { console.log("Tablet Peer Hazır. Kimliğim:", id); });
    myPeer.on('error', (err) => { alert("Tablet Bağlantı Hatası: " + err); });
} else {
    myPeer = createPeer(myRoomCode);
    
    // GeÃ¯Â¿Â½ici olarak ekrana yÃ¯Â¿Â½kleniyor yazalÃ¯Â¿Â½m ki uygulamanÃ¯Â¿Â½n Ã¯Â¿Â½Ã¯Â¿Â½kmediÃ¯Â¿Â½ini gÃ¯Â¿Â½relim
    const idSaha = document.getElementById('my-peer-id');
    const pinSaha = document.getElementById('my-pin-code');
    const teacherTokenSaha = document.getElementById('teacher-pairing-token');
    if (idSaha) idSaha.innerText = "Bağlanıyor...";
    if (pinSaha) pinSaha.innerText = "...";
    if (teacherTokenSaha) teacherTokenSaha.innerText = "Üretiliyor...";

    myPeer.on('open', (id) => {
        console.log("Tahta Peer Hazır. Oda Kodu:", id);
        if (idSaha) idSaha.innerText = id;
        if (pinSaha) pinSaha.innerText = window.sessionPassword;
        if (teacherTokenSaha) teacherTokenSaha.innerText = window.teacherPairingToken;
        renderTeacherPairingQr(id);
    });
    myPeer.on('error', (err) => { 
        if (idSaha) idSaha.innerText = "Sunucu Hatası!";
        console.warn("PeerJS Arka Plan Hatası (Gözardı edilebilir): " + err.type);
        console.warn("PeerJS Arka Plan Hatası (Gözardı edilebilir): " + err.type); 
    });
}
// --- 3. BAÃ¯Â¿Â½LANTI Ã¯Â¿Â½STEK DÃ¯Â¿Â½NLEYÃ¯Â¿Â½CÃ¯Â¿Â½SÃ¯Â¿Â½ (KAPI ZÃ¯Â¿Â½LÃ¯Â¿Â½) ---
myPeer.on('connection', function (conn) {
    if (window.firstTabletConnectionAccepted) {
        console.warn("Ã„Â°lk tablet baÃ„Å¸lantÃ„Â±sÃ„Â± zaten kabul edildi. Yeni baÃ„Å¸lantÃ„Â± reddedildi:", conn.peer);
        setTimeout(() => conn.close(), 100);
        return;
    }
    // EÃ¯Â¿Â½ER ZATEN AKTÃ¯Â¿Â½F BÃ¯Â¿Â½R Ã¯Â¿Â½Ã¯Â¿Â½RETMEN BAÃ¯Â¿Â½LIYSA, YENÃ¯Â¿Â½ Ã¯Â¿Â½STEKLERÃ¯Â¿Â½ EKRANA BÃ¯Â¿Â½LE GETÃ¯Â¿Â½RMEDEN REDDET!
    if (window.authorizedTeacherId && typeof myConnection !== 'undefined' && myConnection && myConnection.open) {
         
    console.warn("Zaten aktif bir Ã¯Â¿Â½Ã¯Â¿Â½retmen cihazÃ¯Â¿Â½ baÃ¯Â¿Â½lÃ¯Â¿Â½. Yeni Bağlantı isteÃ¯Â¿Â½i reddedildi:", conn.peer);
        setTimeout(() => conn.close(), 100);
        return;
    }
    // ?? KRÃ¯Â¿Â½TÃ¯Â¿Â½K GÃ¯Â¿Â½VENLÃ¯Â¿Â½K YAMASI: Ã¯Â¿Â½Ã¯Â¿Â½FRE (PIN) KONTROLÃ¯Â¿Â½ ZORUNLULUÃ¯Â¿Â½U VE KABA KUVVET (BRUTE-FORCE) KORUMASI ??
    if (!window.bannedPeers) window.bannedPeers = {};
    if (!window.failedAttempts) window.failedAttempts = {};

    const peerId = conn.peer;

    // EÃ¯Â¿Â½er IP/Cihaz engelliyse sÃ¯Â¿Â½resinin dolup dolmadÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½na bak (5 dakika)
    if (window.bannedPeers[peerId]) {
        if (Date.now() - window.bannedPeers[peerId] < 5 * 60 * 1000) {
            console.warn(`?? GÃ¯Â¿Â½venlik Ã¯Â¿Â½hlali: ${peerId} engelli! Deneme reddedildi.`);
            setTimeout(() => conn.close(), 100);
            return;
        } else {
            delete window.bannedPeers[peerId];
            window.failedAttempts[peerId] = 0;
        }
    }

    const isTeacherCandidate = Boolean(
        conn.metadata &&
        typeof conn.metadata.teacherToken === 'string' &&
        conn.metadata.teacherToken === window.teacherPairingToken &&
        Date.now() - window.teacherPairingTokenIssuedAt <= 5 * 60 * 1000
    );

    if (isTeacherCandidate) {
        if (window.teacherConnectionStatus !== 'disconnected' ||
            window.pendingTeacherConnections.size > 0) {
            console.warn('Ã¯Â¿Â½kinci Ã¯Â¿Â½Ã¯Â¿Â½retmen eÃ¯Â¿Â½leÃ¯Â¿Â½me isteÃ¯Â¿Â½i reddedildi:', peerId);
            conn.close();
            return;
        }
        window.pendingTeacherConnections.add(peerId);
        conn.isTeacherCandidate = true;
    } else if (!conn.metadata || conn.metadata.password !== window.sessionPassword || (window.myPublicIp !== 'unknown' && conn.metadata.publicIp !== 'unknown' && conn.metadata.publicIp !== window.myPublicIp)) {
        console.warn("?? GÃ¯Â¿Â½venlik Ã¯Â¿Â½hlali: HatalÃ¯Â¿Â½ Ã¯Â¿Â½ifre denemesi reddedildi!", conn.peer);
        
        window.failedAttempts[peerId] = (window.failedAttempts[peerId] || 0) + 1;
        if (window.failedAttempts[peerId] >= 3) {
            window.bannedPeers[peerId] = Date.now();
            console.warn(`?? GÃ¯Â¿Â½venlik Ã¯Â¿Â½hlali: ${peerId} 3 hatalÃ¯Â¿Â½ deneme yaptÃ¯Â¿Â½. 5 DAKÃ¯Â¿Â½KA ENGELLENDÃ¯Â¿Â½!`);
        }

        // KarÃ¯Â¿Â½Ã¯Â¿Â½ tarafa hemen red gÃ¯Â¿Â½nderip BağlantıyÃ¯Â¿Â½ kopartÃ¯Â¿Â½yoruz
        setTimeout(() => conn.close(), 500);
        return; // Modal penceresini bile gÃ¯Â¿Â½sterme (Ã¯Â¿Â½Ã¯Â¿Â½retmeni rahatsÃ¯Â¿Â½z etme)
    }

    // DoÃ¯Â¿Â½ru girdiyse eski hatalarÃ¯Â¿Â½ sÃ¯Â¿Â½fÃ¯Â¿Â½rla
    delete window.failedAttempts[peerId];


    console.log(isTeacherCandidate ? "Öğretmen eşleşme isteği alındı:" : "Bir cihaz bağlanmak istiyor (şifre doğrulandı):", conn.peer);

    const requestModal = document.getElementById('conn-request-modal');
    const requestText = document.getElementById('request-text');
    const btnAccept = document.getElementById('btn-conn-accept');
    const btnReject = document.getElementById('btn-conn-reject');

    if (requestModal && requestText && btnAccept && btnReject) {
        requestText.innerText = isTeacherCandidate
            ? `Bir cihaz Ã¶ÄŸretmen olarak eÅŸleÅŸmek istiyor. Bu cihazÄ± onaylÄ±yor musun?`
            : `Oda kodu "${conn.peer}" olan bir cihaz baÄŸlanmak istiyor. OnaylÄ±yor musun?`;
        requestModal.classList.remove('hidden');
        requestModal.style.display = 'flex';

        // Yaris Kosulunu (Race Condition) onlemek icin open eventini onceden dinle
        let wasOpenedEarly = false;
        conn.on('open', () => { wasOpenedEarly = true; });

        btnAccept.onclick = function () {
            try {
                myConnection = conn;
                window.authorizedTeacherId = conn.peer;
                window.teacherConnectionStatus = 'authorized';
                if (conn.isTeacherCandidate) {
                    window.pendingTeacherConnections.delete(conn.peer);
                    window.teacherPairingToken = createSecureToken(16);
                    window.teacherPairingTokenIssuedAt = Date.now();
                }

                const baglantiHazir = () => {
                    isConnected = true;
                    window.isConnected = true; 
                    window.baglantiOnaylandi = true;
                    window.firstTabletConnectionAccepted = true;
                    const _np = document.getElementById('network-panel'); if (_np) _np.style.display = 'none';
                    const _mb = document.getElementById('network-mini-btn'); if (_mb) _mb.style.display = 'block';
                    const _lo = document.getElementById('language-overlay'); if (_lo) _lo.style.display = 'none';
                    const _dm = document.getElementById('disclaimer-modal'); if (_dm) { _dm.style.display = 'none'; _dm.remove(); }
                    const _fc = document.getElementById('footer-container'); if (_fc) { _fc.style.display = 'none'; _fc.remove(); }
                    const _ip = document.getElementById('install-popup'); if (_ip) { _ip.style.display = 'none'; _ip.remove(); }

                    const statusEl = document.getElementById('connection-status');
                    if (statusEl) {
                        statusEl.innerText = "BAÄLANDI ğŸ¤";
                        statusEl.style.color = "#00ffcc";
                    }

                    if (typeof window.kucultPanel === 'function') {
                        window.kucultPanel();
                    }

                    setupConnectionEvents();
                    console.log("Cihaz baÅŸarÄ±yla baÄŸlandÄ±:", conn.peer);

                    // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: PC BağlantıyÃ¯Â¿Â½ onayladÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½ an, dinlemeye baÃ¯Â¿Â½lar baÃ¯Â¿Â½lamaz tabletten 
                    // "Ekran durumunu" zorla talep eder. BÃ¯Â¿Â½ylece kayÃ¯Â¿Â½p mesajlar tamamen Ã¯Â¿Â½nlenir!
                    setTimeout(() => {
                        if (typeof window.sendNetworkData === 'function') {
                            window.sendNetworkData({ type: 'pc_hazir_durum_talep_et' });
                        }
                    }, 500);
                };

                if (conn.open || wasOpenedEarly) {
                    baglantiHazir();
                } else {
                    conn.on('open', baglantiHazir);
                }
            } catch (err) {
                console.error("Bağlantı Hatası:", err);
            } finally {
                requestModal.classList.add('hidden');
                requestModal.style.display = 'none';
            }
        };

        btnReject.onclick = function () {
            window.pendingTeacherConnections.delete(conn.peer);
            conn.close();
            requestModal.classList.add('hidden');
            requestModal.style.display = 'none';
        };
    }
});

// 4. Sistem sunucuya baÃ¯Â¿Â½arÃ¯Â¿Â½yla baÃ¯Â¿Â½landÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½nda kodumuzu HTML panele yazdÃ¯Â¿Â½r
myPeer.on('open', function (id) {
    const idSaha = document.getElementById('my-peer-id');
    const pinSaha = document.getElementById('my-pin-code');
    const teacherTokenSaha = document.getElementById('teacher-pairing-token');

    if (!isTablet) {
        if (idSaha) idSaha.innerText = id;
        if (pinSaha) pinSaha.innerText = window.sessionPassword;
        if (teacherTokenSaha) teacherTokenSaha.innerText = window.teacherPairingToken || 'Yok';
        renderTeacherPairingQr(id);
    } else {
        const panel = document.getElementById('network-panel');
        if (panel) {
            const kodDiv = document.getElementById('my-peer-id')?.parentElement;
            if (kodDiv) kodDiv.style.display = 'none';
        }
    }
});

// 5. TABLET ROLÃ¯Â¿Â½: BaÃ¯Â¿Â½lanma butonu (GÃ¯Â¿Â½NCEL VERSÃ¯Â¿Â½YON)
document.addEventListener('DOMContentLoaded', () => {
    const connectBtn = document.getElementById('connect-btn');
    if (connectBtn) {
        connectBtn.addEventListener('click', () => {
            const roomFromUrl = new URLSearchParams(window.location.search).get('room');
            const targetCode = (roomFromUrl || document.getElementById('connect-input').value).trim();
            const passwordInput = document.getElementById('session-pass-input').value.trim();

            if (targetCode.length === 5 && (passwordInput.length > 0 || teacherTokenFromUrl)) {
                if (!myPeer || myPeer.destroyed) {
                    alert("AÃ¯Â¿Â½ BağlantısÃ¯Â¿Â½ henÃ¯Â¿Â½z kurulmadÃ¯Â¿Â½, lÃ¯Â¿Â½tfen 2 saniye bekleyip tekrar dene.");
                    return;
                }

                window.sessionPassword = passwordInput;
                document.getElementById('connection-status').innerText = "Bağlanıyor ?";

                // BağlantıyÃ¯Â¿Â½ baÃ¯Â¿Â½lat (Ã¯Â¿Â½ifreyi kriptografik metadata olarak gÃ¯Â¿Â½nderiyoruz)
                myConnection = myPeer.connect(targetCode, {
                    metadata: {
                        password: window.sessionPassword, publicIp: window.myPublicIp,
                        teacherToken: teacherTokenFromUrl || undefined
                    }
                });

                // --- BAÃ¯Â¿Â½LANTIYI GARANTÃ¯Â¿Â½LEMEK Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½N Ã¯Â¿Â½KÃ¯Â¿Â½LÃ¯Â¿Â½ KONTROL ---
                // --- BAÃ¯Â¿Â½LANTIYI GARANTÃ¯Â¿Â½LEMEK Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½N Ã¯Â¿Â½KÃ¯Â¿Â½LÃ¯Â¿Â½ KONTROL ---
                myConnection.on('open', () => {
                    console.log("Tablet: Connection Open tetiklendi!");
                    isConnected = true;
                    window.isConnected = true; 
                    window.baglantiOnaylandi = true;
                    const _np = document.getElementById('network-panel'); if (_np) _np.style.display = 'none';
                    const _mb = document.getElementById('network-mini-btn'); if (_mb) _mb.style.display = 'block';
                    const _lo = document.getElementById('language-overlay'); if (_lo) _lo.style.display = 'none';
                    const _dm = document.getElementById('disclaimer-modal'); if (_dm) { _dm.style.display = 'none'; _dm.remove(); }
                    const _fc = document.getElementById('footer-container'); if (_fc) { _fc.style.display = 'none'; _fc.remove(); }
                    const _ip = document.getElementById('install-popup'); if (_ip) { _ip.style.display = 'none'; _ip.remove(); }
                    document.getElementById('connection-status').innerText = "BAÃ¯Â¿Â½LANDI ??";
                    document.getElementById('connection-status').style.color = "#00ffcc";

                    // Tablet arayÃ¯Â¿Â½zÃ¯Â¿Â½nÃ¯Â¿Â½ temizle
                    document.getElementById('connect-input').style.display = "none";
                    document.getElementById('connect-btn').style.display = "none";

                    // ?? YENÃ¯Â¿Â½: Bağlantı kurulunca oda/Ã¯Â¿Â½ifre panelini otomatik kÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½lt ??
                    if (typeof window.kucultPanel === 'function') {
                        window.kucultPanel();
                    }

                    setupConnectionEvents();
                });
            } else {
                alert("LÃ¯Â¿Â½tfen 5 haneli Oda Kodunu ve Tahta Ã¯Â¿Â½ifresini eksiksiz girin.");
            }
        });

        if (teacherTokenFromUrl) {
            const roomFromUrl = new URLSearchParams(window.location.search).get('room');
            const passwordField = document.getElementById('session-pass-input');
            if (roomFromUrl && passwordField && !passwordField.value) {
                passwordField.value = 'teacher-pairing';
                setTimeout(() => connectBtn.click(), 250);
            }
        }
    }
});



function setupConnectionEvents() {
    if (!myConnection) return;
    if (window._lastSetupConnection === myConnection) return;
    const connection = myConnection;
    window._lastSetupConnection = myConnection;
    window._connectionEventsBound = true;

    // --- 1. GÃ¯Â¿Â½VENLÃ¯Â¿Â½K ONAYI ---
    // GitHub Pages akÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½nda signaling metadata'sÃ¯Â¿Â½ public servisten geÃ¯Â¿Â½ebilir;
    // ders iÃ¯Â¿Â½eriÃ¯Â¿Â½i yalnÃ¯Â¿Â½zca kabul edilmiÃ¯Â¿Â½ P2P Bağlantıda iÃ¯Â¿Â½lenir.
    const pc = myConnection.peerConnection;
    // =========================================================
    // EKRANLAR ARASI ORANTISAL ADAPTASYON (Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½NÃ¯Â¿Â½RLÃ¯Â¿Â½K SENKRONU)
    // =========================================================

    window.moveStroke = function(stroke, dx, dy) {
        if (!stroke) return;
        // ?? 3D Ã¯Â¿Â½ekilleri dÃ¯Â¿Â½Ã¯Â¿Â½lamÃ¯Â¿Â½yoruz, ekran kaydÃ¯Â¿Â½rÃ¯Â¿Â½lÃ¯Â¿Â½nca onlar da taÃ¯Â¿Â½Ã¯Â¿Â½nacak!

        const isLineType = ['pen', 'line', 'segment', 'ray', 'straightLine', 'polygon', 'point', 'arc'].includes(stroke.type);

        if (stroke.path) stroke.path.forEach(p => { p.x += dx; p.y += dy; });
        if (stroke.points) stroke.points.forEach(p => { p.x += dx; p.y += dy; });

        if (stroke.x !== undefined) stroke.x += dx;
        if (stroke.y !== undefined) stroke.y += dy;
        if (stroke.cx !== undefined) stroke.cx += dx;
        if (stroke.cy !== undefined) stroke.cy += dy;
        
        if (stroke.center) {
            if (stroke.center.x !== undefined) stroke.center.x += dx;
            if (stroke.center.y !== undefined) stroke.center.y += dy;
        }

        if (stroke.p1) { stroke.p1.x += dx; stroke.p1.y += dy; }
        if (stroke.p2) { stroke.p2.x += dx; stroke.p2.y += dy; }
        if (stroke.p3) { stroke.p3.x += dx; stroke.p3.y += dy; }

        // ?? MÃ¯Â¿Â½hÃ¯Â¿Â½rlÃ¯Â¿Â½ KoordinatlarÃ¯Â¿Â½ da KaydÃ¯Â¿Â½r!
        if (stroke.originalX !== undefined) stroke.originalX += dx;
        if (stroke.originalY !== undefined) stroke.originalY += dy;
    };

    window.zoomStroke = function(stroke, scale, cx, cy) {
        if (!stroke) return;
        // ?? 3D Ã¯Â¿Â½ekilleri zoom iÃ¯Â¿Â½lemine dahil ediyoruz (engel kaldÃ¯Â¿Â½rÃ¯Â¿Â½ldÃ¯Â¿Â½)

        const mapX = (x) => cx + (x - cx) * scale;
        const mapY = (y) => cy + (y - cy) * scale;
        const isLineType = ['pen', 'line', 'segment', 'ray', 'straightLine', 'polygon', 'point', 'arc'].includes(stroke.type);

        if (stroke.path) stroke.path.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });
        if (stroke.points) stroke.points.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });
          if (stroke.foldLine) stroke.foldLine.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });

        if (stroke.x !== undefined && stroke.width !== undefined && !isLineType) {
            const center_x = mapX(stroke.x + stroke.width / 2);
            stroke.width *= scale;
            stroke.x = center_x - stroke.width / 2;
        } else if (stroke.x !== undefined) {
            stroke.x = mapX(stroke.x);
            if (stroke.width !== undefined && !isLineType) stroke.width *= scale;
        }

        if (stroke.y !== undefined && stroke.height !== undefined && !isLineType) {
            const center_y = mapY(stroke.y + stroke.height / 2);
            stroke.height *= scale;
            stroke.y = center_y - stroke.height / 2;
        } else if (stroke.y !== undefined) {
            stroke.y = mapY(stroke.y);
            if (stroke.height !== undefined && !isLineType) stroke.height *= scale;
        }

        // ?? ZOOM Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½N ZIRH: MÃ¯Â¿Â½hÃ¯Â¿Â½rlÃ¯Â¿Â½ "original" deÃ¯Â¿Â½erleri de zoomla!
        if (stroke.originalX !== undefined && stroke.originalW !== undefined && !isLineType) {
            const orig_center_x = mapX(stroke.originalX + stroke.originalW / 2);
            stroke.originalW *= scale;
            stroke.originalX = orig_center_x - stroke.originalW / 2;
        }
        if (stroke.originalY !== undefined && stroke.originalH !== undefined && !isLineType) {
            const orig_center_y = mapY(stroke.originalY + stroke.originalH / 2);
            stroke.originalH *= scale;
            stroke.originalY = orig_center_y - stroke.originalH / 2;
        }

        if (stroke.cx !== undefined) stroke.cx = mapX(stroke.cx);
        if (stroke.cy !== undefined) stroke.cy = mapY(stroke.cy);
        
        if (stroke.center) {
            if (stroke.center.x !== undefined) stroke.center.x = mapX(stroke.center.x);
            if (stroke.center.y !== undefined) stroke.center.y = mapY(stroke.center.y);
        }

        if (stroke.radius !== undefined) stroke.radius *= scale;
        if (stroke.p1) { stroke.p1.x = mapX(stroke.p1.x); stroke.p1.y = mapY(stroke.p1.y); }
        if (stroke.p2) { stroke.p2.x = mapX(stroke.p2.x); stroke.p2.y = mapY(stroke.p2.y); }
        if (stroke.p3) { stroke.p3.x = mapX(stroke.p3.x); stroke.p3.y = mapY(stroke.p3.y); }
        
        if (stroke.type === 'text' && stroke.fontSize) stroke.fontSize *= scale;
        if (stroke.baseWidth) stroke.baseWidth *= scale;
        
        // ?? Ã¯Â¿Â½Ã¯Â¿Â½ZGÃ¯Â¿Â½ KALINLIÃ¯Â¿Â½I ZIRHI: EÃ¯Â¿Â½er bu bir Ã¯Â¿Â½izgi aracÃ¯Â¿Â½ (segment, line, ray, polygon vs.) ise
        // bounding box'Ã¯Â¿Â½ olmadÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½ iÃ¯Â¿Â½in (x undefined'dir) yukarÃ¯Â¿Â½daki bloklarda width Ã¯Â¿Â½lÃ¯Â¿Â½eklenmez.
        // O yÃ¯Â¿Â½zden Ã¯Â¿Â½izgi kalÃ¯Â¿Â½nlÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½nÃ¯Â¿Â½ temsil eden width deÃ¯Â¿Â½erini burada doÃ¯Â¿Â½rudan ekran oranÃ¯Â¿Â½na gÃ¯Â¿Â½re bÃ¯Â¿Â½yÃ¯Â¿Â½tÃ¯Â¿Â½yoruz.
        if (stroke.width !== undefined && stroke.x === undefined) {
            stroke.width *= scale;
        }
    };

    window.adaptStrokeToScreen = function (stroke, senderW, senderH, senderCw, senderCh, data) {
        if (!stroke || !senderW || !senderH) return stroke;

        // ?? Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M ADIMI 1: Tabletin gerÃ¯Â¿Â½ek ekran yÃ¯Â¿Â½ksekliÃ¯Â¿Â½ini Ã¯Â¿Â½ekle mÃ¯Â¿Â½hÃ¯Â¿Â½rle (3D Perspektif oranÃ¯Â¿Â½nÃ¯Â¿Â½ korumak iÃ¯Â¿Â½in)
        stroke.originalSenderH = senderH;

        // ?? Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: 3D Ã¯Â¿Â½ekilleri dÃ¯Â¿Â½Ã¯Â¿Â½lama, onlar da arka plan ve 2D ekran oranlarÃ¯Â¿Â½na gÃ¯Â¿Â½re otomatik hizalansÃ¯Â¿Â½n!
        // (3D korumasÃ¯Â¿Â½ silindi)

        const myW = window.innerWidth;
        const myH = window.innerHeight;
        const canvasElm = document.getElementById('drawing-canvas');
        const myCw = canvasElm ? canvasElm.width : myW;
        const myCh = canvasElm ? canvasElm.height : myH;
        const senderDpr = senderCw ? (senderCw / senderW) : 1;
        const myDpr = canvasElm ? (myCw / myW) : 1;
        
        const isLineType = ['pen', 'line', 'segment', 'ray', 'straightLine', 'polygon', 'point', 'arc'].includes(stroke.type);

        let scale, offsetX, offsetY;
        const myBg = window.drawnStrokes ? window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch) : null;

        if (data && data.bgW > 0 && myBg && myBg.width > 0 && stroke.isBackground !== true) {
            scale = myBg.width / data.bgW;
            offsetX = myBg.x - (data.bgX * scale);
            offsetY = myBg.y - (data.bgY * scale);
      } else {
            // ?? NÃ¯Â¿Â½HAÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: EkranÃ¯Â¿Â½ ortalama! Sol paneli (0,0) referans al ve fiziksel boyutu KESÃ¯Â¿Â½N OLARAK KORU!
            scale = Math.min(myCw / senderCw, myCh / senderCh); offsetX = (myCw - (senderCw * scale)) / 2; offsetY = (myCh - (senderCh * scale)) / 2; 
        }
        
        // 3D Ã¯Â¿Â½ekillerin pozisyon takibi iÃ¯Â¿Â½in bu oranÃ¯Â¿Â½ Ã¯Â¿Â½ekle mÃ¯Â¿Â½hÃ¯Â¿Â½rlÃ¯Â¿Â½yoruz
        stroke.usedScale = scale;
        stroke.adaptedScale = scale;

        const mapX = (x) => (x * scale) + offsetX;
        const mapY = (y) => (y * scale) + offsetY;

        if (stroke.path) stroke.path.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });
        if (stroke.points) stroke.points.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });
          if (stroke.foldLine) stroke.foldLine.forEach(p => { p.x = mapX(p.x); p.y = mapY(p.y); });

        if (stroke.x !== undefined && stroke.width !== undefined) {
            const center_x = mapX(stroke.x + stroke.width / 2);
            stroke.width *= scale;
            stroke.x = center_x - stroke.width / 2;
        } else if (stroke.x !== undefined) {
            stroke.x = mapX(stroke.x);
            if (stroke.width !== undefined) stroke.width *= scale;
        }

        if (stroke.y !== undefined && stroke.height !== undefined) {
            const center_y = mapY(stroke.y + stroke.height / 2);
            stroke.height *= scale;
            stroke.y = center_y - stroke.height / 2;
        } else if (stroke.y !== undefined) {
            stroke.y = mapY(stroke.y);
            if (stroke.height !== undefined) stroke.height *= scale;
        }

        // ?? 2. AÃ¯Â¿Â½ SENKRON ZIRHI: MÃ¯Â¿Â½hÃ¯Â¿Â½rlÃ¯Â¿Â½ "original" deÃ¯Â¿Â½erleri PC Ã¯Â¿Â½Ã¯Â¿Â½zÃ¯Â¿Â½nÃ¯Â¿Â½rlÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½ne Ã¯Â¿Â½evir! (ZÃ¯Â¿Â½plamayÃ¯Â¿Â½ engeller)
        if (stroke.originalX !== undefined && stroke.originalW !== undefined) {
            const orig_center_x = mapX(stroke.originalX + stroke.originalW / 2);
            stroke.originalW *= scale;
            stroke.originalX = orig_center_x - stroke.originalW / 2;
        }
        if (stroke.originalY !== undefined && stroke.originalH !== undefined) {
            const orig_center_y = mapY(stroke.originalY + stroke.originalH / 2);
            stroke.originalH *= scale;
            stroke.originalY = orig_center_y - stroke.originalH / 2;
        }

        if (stroke.cx !== undefined) stroke.cx = mapX(stroke.cx);
        if (stroke.cy !== undefined) stroke.cy = mapY(stroke.cy);
        if (stroke.center) {
            if (stroke.center.x !== undefined) stroke.center.x = mapX(stroke.center.x);
            if (stroke.center.y !== undefined) stroke.center.y = mapY(stroke.center.y);
        }
        if (stroke.radius !== undefined) stroke.radius *= scale;
        if (stroke.p1) { stroke.p1.x = mapX(stroke.p1.x); stroke.p1.y = mapY(stroke.p1.y); }
        if (stroke.p2) { stroke.p2.x = mapX(stroke.p2.x); stroke.p2.y = mapY(stroke.p2.y); }
        if (stroke.p3) { stroke.p3.x = mapX(stroke.p3.x); stroke.p3.y = mapY(stroke.p3.y); }
        if (stroke.lengthLabelPos) { stroke.lengthLabelPos.x = mapX(stroke.lengthLabelPos.x); stroke.lengthLabelPos.y = mapY(stroke.lengthLabelPos.y); }

        if (stroke.type === 'text' && stroke.fontSize) stroke.fontSize *= scale;

        // KalÃ¯Â¿Â½nlÃ¯Â¿Â½k hesaplamasÃ¯Â¿Â½ (Ã¯Â¿Â½izgilerin Ã¯Â¿Â½ok ince veya Ã¯Â¿Â½ok kalÃ¯Â¿Â½n olmasÃ¯Â¿Â½nÃ¯Â¿Â½ engeller)
        if (stroke.width !== undefined && isLineType) {
            const canvasElm = document.getElementById('drawing-canvas');
            if (canvasElm && senderCw) {
                const myDpr = canvasElm.width / myW;
                const senderDpr = senderCw / senderW;
                if (senderDpr > 0 && myDpr > 0) stroke.width *= (myDpr / senderDpr);
            }
        }

        if (stroke.baseWidth !== undefined) {
            const canvasElm = document.getElementById('drawing-canvas');
            if (canvasElm && senderCw) {
                const myDpr = canvasElm.width / myW;
                const senderDpr = senderCw / senderW;
                if (senderDpr > 0 && myDpr > 0) stroke.baseWidth *= (myDpr / senderDpr);
            }
        }

        return stroke;
    };

    window.baglantiOnaylandi = true;
                    const _np = document.getElementById('network-panel'); if (_np) _np.style.display = 'none';
                    const _mb = document.getElementById('network-mini-btn'); if (_mb) _mb.style.display = 'block';
                    const _lo = document.getElementById('language-overlay'); if (_lo) _lo.style.display = 'none';
                    const _dm = document.getElementById('disclaimer-modal'); if (_dm) { _dm.style.display = 'none'; _dm.remove(); }
                    const _fc = document.getElementById('footer-container'); if (_fc) { _fc.style.display = 'none'; _fc.remove(); }
                    const _ip = document.getElementById('install-popup'); if (_ip) { _ip.style.display = 'none'; _ip.remove(); }
    isConnected = true;

    // --- 2. VERÃ¯Â¿Â½ ALICI VE PARÃ¯Â¿Â½ALAMA MOTORU (BARKOD SÃ¯Â¿Â½STEMLÃ¯Â¿Â½) ---
    window.chunkBuffers = {}; // ?? YENÃ¯Â¿Â½: Her mesaja Ã¯Â¿Â½zel ayrÃ¯Â¿Â½ bir kutu aÃ¯Â¿Â½Ã¯Â¿Â½yoruz

    const packetWindow = { startedAt: Date.now(), count: 0 };
    const chunkState = new Map();

    connection.on('data', function (data) {
        console.log('--- VERI GELDI ---', data ? data.type : 'BOS');
        

        const now = Date.now();
        if (now - packetWindow.startedAt >= 1000) {
            packetWindow.startedAt = now;
            packetWindow.count = 0;
        }
        packetWindow.count += 1;
        if (packetWindow.count > NETWORK_LIMITS.maxMessagesPerSecond) {
            console.warn('AÃ¯Â¿Â½Ã¯Â¿Â½rÃ¯Â¿Â½ hÃ¯Â¿Â½zlÃ¯Â¿Â½ aÃ¯Â¿Â½ trafiÃ¯Â¿Â½i reddedildi:', connection.peer);
            
            return;
        }
        if (byteLengthOf(data) > NETWORK_LIMITS.maxMessageBytes ||
            !validateNetworkPacket(data) ||
            !canProcessCriticalCommand(connection, data)) {
            console.warn('GeÃ¯Â¿Â½ersiz veya yetkisiz aÃ¯Â¿Â½ paketi reddedildi:', connection.peer);
            return;
        }
        if (data.type === 'chunk') {
            if (chunkState.size >= NETWORK_LIMITS.maxPendingChunks && !chunkState.has(data.msgId)) {
                console.warn('AÃ¯Â¿Â½ parÃ¯Â¿Â½a kuyruÃ¯Â¿Â½u sÃ¯Â¿Â½nÃ¯Â¿Â½rÃ¯Â¿Â½ aÃ¯Â¿Â½Ã¯Â¿Â½ldÃ¯Â¿Â½:', connection.peer);
                return;
            }
            const existing = chunkState.get(data.msgId);
            const state = existing || { total: data.total, parts: new Map(), createdAt: now };
            if (state.total !== data.total || data.idx >= state.total) {
                console.warn('Bozuk aÃ¯Â¿Â½ parÃ¯Â¿Â½asÃ¯Â¿Â½ reddedildi:', connection.peer);
                return;
            }
            state.parts.set(data.idx, data.data);
            chunkState.set(data.msgId, state);
            for (const [id, value] of chunkState) {
                if (now - value.createdAt > 30000) chunkState.delete(id);
            }
        }

        // ?? NÃ¯Â¿Â½HAÃ¯Â¿Â½ VE MATEMATÃ¯Â¿Â½KSEL KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: CSS ve Canvas HD UyuÃ¯Â¿Â½mazlÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½nÃ¯Â¿Â½ Giderici ??
        function veriyiIsle(d) {
            if (!d) return;

            if (d.type && d.type.startsWith('katlama_')) {
                window.dispatchEvent(new CustomEvent('katlama_sistemi', { detail: d }));
                return;
            }

            // --- EKRANLAR ARASI Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½NÃ¯Â¿Â½RLÃ¯Â¿Â½K ADAPTASYONU ---
            const canvasElm = document.getElementById('drawing-canvas');
            const myCw = canvasElm ? canvasElm.width : window.innerWidth;
            const myCh = canvasElm ? canvasElm.height : window.innerHeight;
            const senderW = d.cw || d.cssW || window.innerWidth;
            const senderH = d.ch || d.cssH || window.innerHeight;
            
            // ?? HATA BURADAYDI: Bu iki satÃ¯Â¿Â½r aÃ¯Â¿Â½aÃ¯Â¿Â½Ã¯Â¿Â½daydÃ¯Â¿Â½, sistemin Ã¯Â¿Â½Ã¯Â¿Â½kmemesi iÃ¯Â¿Â½in en Ã¯Â¿Â½ste alÃ¯Â¿Â½ndÃ¯Â¿Â½!
            const senderDpr = d.dpr || 1;
            const myDpr = window.devicePixelRatio || 1;

            let scale, offsetX, offsetY;
            const myBg = window.drawnStrokes ? window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch) : null;
            if (d.bgW > 0 && myBg && myBg.width > 0 && d.type !== 'zoom_senkron' && d.type !== 'hepsini_tasi' && d.type !== 'sekil_guncelle') {
                scale = myBg.width / d.bgW;
                offsetX = myBg.x - (d.bgX * scale);
                offsetY = myBg.y - (d.bgY * scale);
            } else {
                // ?? NÃ¯Â¿Â½HAÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M (CanlÃ¯Â¿Â½ Ã¯Â¿Â½izim): EkranÃ¯Â¿Â½ ortalama! Sol panele yapÃ¯Â¿Â½Ã¯Â¿Â½tÃ¯Â¿Â½r ve birebir aynÃ¯Â¿Â½ bÃ¯Â¿Â½yÃ¯Â¿Â½klÃ¯Â¿Â½kte tut!
                const tempSenderCw = d.cw || (senderW * senderDpr); const tempSenderCh = d.ch || (senderH * senderDpr); scale = Math.min(myCw / tempSenderCw, myCh / tempSenderCh); offsetX = (myCw - (tempSenderCw * scale)) / 2; offsetY = (myCh - (tempSenderCh * scale)) / 2;
            }

            const mapCssX = (cssX) => (((parseFloat(cssX) * senderDpr) * scale + offsetX) / myDpr) + 'px';
            const mapCssY = (cssY) => (((parseFloat(cssY) * senderDpr) * scale + offsetY) / myDpr) + 'px';
            const mapCssDim = (cssDim) => (((parseFloat(cssDim) * senderDpr) * scale) / myDpr) + 'px';
            const mapNumX = (numX) => (((numX * senderDpr) * scale + offsetX) / myDpr);
            const mapNumY = (numY) => (((numY * senderDpr) * scale + offsetY) / myDpr);
            const mapNumDim = (numDim) => (((numDim * senderDpr) * scale) / myDpr);
            const mapX = (x) => (x * scale) + offsetX;
            const mapY = (y) => (y * scale) + offsetY;

            if (d.type === 'arac_senkron' && !d.ignoreAdapt) {
                if (d.left) d.left = mapCssX(d.left);
                if (d.top) d.top = mapCssY(d.top);
                if (d.width) d.width = mapCssDim(d.width);
                if (d.height) d.height = mapCssDim(d.height);
                d.ignoreAdapt = true;
            }

            if (d.type === 'arac_state_senkron' && d.state && !d.ignoreAdapt) {
                if (d.state.x !== undefined) d.state.x = mapNumX(d.state.x);
                if (d.state.y !== undefined) d.state.y = mapNumY(d.state.y);
                if (d.state.width !== undefined) d.state.width = mapNumDim(d.state.width);
                if (d.state.height !== undefined) d.state.height = mapNumDim(d.state.height);
                if (d.state.radius !== undefined) d.state.radius = mapNumDim(d.state.radius);
                if (d.state.pivot) {
                    d.state.pivot.x = mapNumX(d.state.pivot.x);
                    d.state.pivot.y = mapNumY(d.state.pivot.y);
                }
                if (d.width) d.width = mapCssDim(d.width);
                if (d.height) d.height = mapCssDim(d.height);
                d.ignoreAdapt = true;
            }

            if (d.type === 'aktif_onizleme' && d.payload && !d.ignoreAdapt) {
                const isPhysical = ['ruler', 'gonye', 'aciolcer', 'pergel'].includes(d.arac);
                const p = d.payload;
                if (isPhysical) {
                    if (p.handleX !== undefined) p.handleX = mapNumDim(p.handleX);
                    if (p.handleY !== undefined) p.handleY = mapNumDim(p.handleY);
                    if (p.ldx !== undefined) p.ldx = mapNumDim(p.ldx);
                    if (p.ldy !== undefined) p.ldy = mapNumDim(p.ldy);
                    if (d.arac === 'pergel') {
                        if (p.cx !== undefined) p.cx = mapX(p.cx);
                        if (p.cy !== undefined) p.cy = mapY(p.cy);
                        if (p.px !== undefined) p.px = mapX(p.px);
                        if (p.py !== undefined) p.py = mapY(p.py);
                        if (p.radius !== undefined) p.radius *= scale;
                    }
                } else {
                    if (p.handleX !== undefined) p.handleX *= scale;
                    if (p.handleY !== undefined) p.handleY *= scale;
                    if (p.cx !== undefined) p.cx = mapX(p.cx);
                    if (p.cy !== undefined) p.cy = mapY(p.cy);
                    if (p.px !== undefined) p.px = mapX(p.px);
                    if (p.py !== undefined) p.py = mapY(p.py);
                    if (p.ldx !== undefined) p.ldx *= scale;
                    if (p.ldy !== undefined) p.ldy *= scale;
                    if (p.x !== undefined) p.x = mapX(p.x);
                    if (p.y !== undefined) p.y = mapY(p.y);
                    
                    if (p.start) { p.start.x = mapX(p.start.x); p.start.y = mapY(p.start.y); }
                    if (p.end) { p.end.x = mapX(p.end.x); p.end.y = mapY(p.end.y); }
                    if (p.radius !== undefined) p.radius *= scale;
                    
                    // ?? CANLI Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M ADAPTASYONU: Tablet Ã¯Â¿Â½Ã¯Â¿Â½zÃ¯Â¿Â½nÃ¯Â¿Â½rlÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½ndeki kalem hareketlerini PC'ye oranla!
                    if (p.tool === 'pen' && p.path) {
                        for (let pt of p.path) {
                            if (pt.x !== undefined) pt.x = mapX(pt.x);
                            if (pt.y !== undefined) pt.y = mapY(pt.y);
                        }
                    }
                }
                d.ignoreAdapt = true;
            }

            // 1. ZOOM VE PDF SENKRONÃ¯Â¿Â½ZASYONU
            if (d.type === 'zoom_senkron') {
                if ((typeof pointers !== 'undefined' && pointers.size >= 2) || window.touchCount >= 2 || window.isZooming) return;

                if (window.drawnStrokes) {
                    const canvasElm = document.getElementById('drawing-canvas');
                    const myCw = canvasElm ? canvasElm.width : window.innerWidth;
                    const myCh = canvasElm ? canvasElm.height : window.innerHeight;
                    const senderW = d.cw || d.cssW || window.innerWidth;
                    const senderH = d.ch || d.cssH || window.innerHeight;
                    
                    const scale = Math.min(myCw / senderW, myCh / senderH);
                    const offsetX = (myCw - (senderW * scale)) / 2;
                    const offsetY = (myCh - (senderH * scale)) / 2;
                    const mapX = (x) => (x * scale) + offsetX;
                    const mapY = (y) => (y * scale) + offsetY;

                    const mainBg = window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
                    
                    if (mainBg && d.width !== undefined && d.height !== undefined && d.x !== undefined && d.y !== undefined) {
                        const newW = d.width * scale;
                        const newH = d.height * scale;
                        const newX = mapX(d.x);
                        const newY = mapY(d.y);

                        const oldW = mainBg.width;
                        const oldX = mainBg.x;
                        const oldY = mainBg.y;

                        if (oldW > 0) {
                            const zoomRatio = newW / oldW;
                            const cx = oldX + oldW / 2;
                            const cy = oldY + mainBg.height / 2;

                            window.drawnStrokes.forEach(s => {
                                if (!s.isBackground && typeof window.zoomStroke === 'function') {
                                    window.zoomStroke(s, zoomRatio, cx, cy);
                                }
                            });

                            window.drawnStrokes.forEach(bg => {
                                if (bg.isBackground === true) {
                                    if (bg === mainBg) {
                                        bg.width = newW; bg.height = newH; bg.x = newX; bg.y = newY;
                                    } else {
                                        const bg_cx = bg.x + bg.width / 2;
                                        const bg_cy = bg.y + bg.height / 2;
                                        const ncx = cx + (bg_cx - cx) * zoomRatio;
                                        const ncy = cy + (bg_cy - cy) * zoomRatio;
                                        bg.width *= zoomRatio; bg.height *= zoomRatio;
                                        bg.x = ncx - bg.width / 2; bg.y = ncy - bg.height / 2;
                                    }
                                }
                            });
                        }
                    }
                    if (window.redrawAllStrokes) window.redrawAllStrokes();
                }
                return;
            }

            if (typeof processData === 'function') processData(d);
        }

        if (data && data.type === 'chunk') {
            const id = data.msgId || 'genel';
            
            if (data.idx !== undefined && data.total !== undefined) {
                if (!window.chunkBuffers[id]) window.chunkBuffers[id] = { chunks: new Array(data.total), count: 0 };
                if (window.chunkBuffers[id].chunks && typeof window.chunkBuffers[id].chunks[data.idx] === 'undefined') {
                    window.chunkBuffers[id].chunks[data.idx] = data.data;
                    window.chunkBuffers[id].count++;
                }
                if (window.chunkBuffers[id].count === data.total) {
                    const fullStr = window.chunkBuffers[id].chunks.join('');
                    if (new TextEncoder().encode(fullStr).byteLength <= NETWORK_LIMITS.maxMessageBytes) {
                        try {
                            const completePacket = JSON.parse(fullStr);
                            if (validateNetworkPacket(completePacket) && canProcessCriticalCommand(connection, completePacket)) {
                                veriyiIsle(completePacket);
                            }
                        } catch (e) { console.warn('Bozuk aÃ¯Â¿Â½ paketi reddedildi.', e); }
                    }
                    delete window.chunkBuffers[id];
                }
            } else {
                if (!window.chunkBuffers[id]) window.chunkBuffers[id] = "";
                if (typeof window.chunkBuffers[id] === 'string') {
                    window.chunkBuffers[id] += data.data;
                    if (data.isLast) {
                        const fullStr = window.chunkBuffers[id];
                        if (new TextEncoder().encode(fullStr).byteLength <= NETWORK_LIMITS.maxMessageBytes) {
                            try {
                                const completePacket = JSON.parse(fullStr);
                                if (validateNetworkPacket(completePacket) && canProcessCriticalCommand(connection, completePacket)) {
                                    veriyiIsle(completePacket);
                                }
                            } catch (e) { console.warn('Bozuk aÃ¯Â¿Â½ paketi reddedildi.', e); }
                        }
                        delete window.chunkBuffers[id];
                    }
                }
            }
            return;
        }

        veriyiIsle(data);
    });


    function processData(data) {

        // ?? KORUMA ZIRHI: Canvas henÃ¯Â¿Â½z baÃ¯Â¿Â½latÃ¯Â¿Â½lmadÃ¯Â¿Â½ysa (Ã¯Â¿Â½rn. 300px ise) aÃ¯Â¿Â½Ã¯Â¿Â½ iÃ¯Â¿Â½lemeden Ã¯Â¿Â½nce tam boyuta getir!
        const cnv = document.getElementById('drawing-canvas');
        if (cnv && cnv.width <= 300 && typeof lockScreenSize === 'function') {
            lockScreenSize();
        }

        // ?? YENÃ¯Â¿Â½ ALICI: TABLETTEN GELEN KUSURSUZ RESMÃ¯Â¿Â½ VE PDF'Ã¯Â¿Â½ EKRANA Ã¯Â¿Â½Ã¯Â¿Â½ZER (MERKEZLEME GARANTÃ¯Â¿Â½LÃ¯Â¿Â½)
        if (data.type === 'arka_plan_resmi_aktar') {
            const img = new Image();
            img.onload = () => {
                if (typeof window.addNewImageToCanvas === 'function') {
                    const canvas = document.getElementById('drawing-canvas');
                    let pcMerkez = null;
                    
                    // PC'de resmi ekranÃ¯Â¿Â½n tam ortasÃ¯Â¿Â½na yeniden hesapla (SaÃ¯Â¿Â½a kaymayÃ¯Â¿Â½ KESÃ¯Â¿Â½N Ã¯Â¿Â½nler)
                    if (canvas) {
                        let startWidth = canvas.width * 0.8;
                        let sW = startWidth;
                        if (img.width < sW) sW = img.width;
                        let scaleFactor = sW / img.width;
                        let sH = img.height * scaleFactor;
                        
                        if (sH > canvas.height * 0.8) {
                            sH = canvas.height * 0.8;
                            sW = img.width * (sH / img.height);
                        }
                        pcMerkez = {
                            x: (canvas.width / 2) - (sW / 2),
                            y: (canvas.height / 2) - (sH / 2),
                            width: sW,
                            height: sH
                        };
                    }
                    
                    window.addNewImageToCanvas(img, data.isPDF, pcMerkez);
                    setTimeout(() => { if (window.redrawAllStrokes) window.redrawAllStrokes(); }, 100);
                }
            };
            img.src = data.imgData;
            return;
        } 

// ?? YENÃ¯Â¿Â½ ALICI: TABLETTEN GELEN KUSURSUZ KAYDIRMA (PAN) SÃ¯Â¿Â½NYALÃ¯Â¿Â½NÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½LER
        if (data.type === 'hepsini_tasi') {
            const senderDpr = data.dpr || 1;
            const myDpr = window.devicePixelRatio || 1;
            const scale = myDpr / senderDpr; 

            const diffX = data.dx * scale;
            const diffY = data.dy * scale;

            if (window.drawnStrokes) {
                const mainBg = window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
                if (mainBg) {
                    mainBg.x += diffX;
                    mainBg.y += diffY;
                }
                // Zemindeki Ã¯Â¿Â½izimleri ve Ã¯Â¿Â½ekilleri de aynÃ¯Â¿Â½ oranda kaydÃ¯Â¿Â½r
                window.drawnStrokes.forEach(s => {
                    if (!s.isBackground && typeof window.moveStroke === 'function') {
                        window.moveStroke(s, diffX, diffY);
                    }
                });
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
            return;
        }

if (!data || !data.type) return;
        if (!window.drawnStrokes) window.drawnStrokes = [];

// ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: PC Hazır olduÃ¯Â¿Â½unu bildirdiÃ¯Â¿Â½inde, Tablet zaten Ã¯Â¿Â½izim alanÃ¯Â¿Â½na geÃ¯Â¿Â½miÃ¯Â¿Â½se durumunu PC'ye zorla fÃ¯Â¿Â½rlatÃ¯Â¿Â½r!
        if (data.type === 'pc_hazir_durum_talep_et') {
            if (window.acilisPenceresiKapatildi && typeof currentLang !== 'undefined' && currentLang) {
                const firlatici = (typeof window.sendNetworkData === 'function') ? window.sendNetworkData : (typeof sendNetworkData === 'function' ? sendNetworkData : null);
                if (firlatici) {
                    // PeÃ¯Â¿Â½ peÃ¯Â¿Â½e atÃ¯Â¿Â½Ã¯Â¿Â½ yaparak PC'nin veri kanalÃ¯Â¿Â½nda bu mesajÃ¯Â¿Â½ kaÃ¯Â¿Â½Ã¯Â¿Â½rmasÃ¯Â¿Â½nÃ¯Â¿Â½ engelle
                    [50, 500, 1500].forEach(gecikme => {
                        setTimeout(() => {
                            firlatici({ type: 'dil_secimi', lang: currentLang });
                            firlatici({ type: 'acilis_penceresini_kapat' });
                            firlatici({ type: 'yukleme_penceresini_kapat' });
                            if (window.drawnStrokes && window.drawnStrokes.length > 0) {
                                firlatici({ type: 'yeni_cizim', stroke: window.drawnStrokes });
                            }
                        }, gecikme);
                    });
                }
            }
            return;
        }

        // ?? DÃ¯Â¿Â½L SEÃ¯Â¿Â½Ã¯Â¿Â½MÃ¯Â¿Â½ HER ZAMAN GEÃ¯Â¿Â½SÃ¯Â¿Â½N VE EKRANI ZORLA AÃ¯Â¿Â½SIN ??
        if (data.type === 'dil_secimi') {
            if (typeof setLanguage === 'function') setLanguage(data.lang);

            // PC iÃ¯Â¿Â½in tam ekran temizliÃ¯Â¿Â½i (GÃ¯Â¿Â½rÃ¯Â¿Â½nmez CSS Balyozu!)
            const pcZirhi = document.createElement('style');
            pcZirhi.innerHTML = `
                /* PC ekranÃ¯Â¿Â½nÃ¯Â¿Â½ kilitleyen ne kadar pencere/panel varsa KÃ¯Â¿Â½KÃ¯Â¿Â½NDEN yok eder */
                #language-overlay, .language-overlay,
                #disclaimer-modal, .disclaimer-modal,
                #footer-container, .footer-container,
                #install-popup, .install-popup,
                #network-panel, .network-panel,
                #connect-panel, .connect-panel,
                .start-screen, #start-screen,
                .intro-container, #intro-container,
                .modal, .overlay, #conn-request-modal {
                    display: none !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                    z-index: -9999 !important;
                }
                
                #app-container {
                    display: block !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                }
                
                /* Ã¯Â¿Â½izim AlanÃ¯Â¿Â½ ve Sol/SaÃ¯Â¿Â½ MenÃ¯Â¿Â½leri KESÃ¯Â¿Â½N OLARAK Ã¯Â¿Â½NE Ã¯Â¿Â½IKARIR */
                #drawing-canvas, #bg-canvas {
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                }
                .left-panel, .right-panel, .panel {
                    display: flex !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                }
            `;
            document.head.appendChild(pcZirhi);

            // HTML iÃ¯Â¿Â½inden de JavaScript ile gizleyelim (Ã¯Â¿Â½ifte GÃ¯Â¿Â½venlik)
            ['language-overlay', 'disclaimer-modal', 'footer-container', 'network-panel', 'connect-panel', 'start-screen'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });
            
            const appCont = document.getElementById('app-container');
            if (appCont) appCont.style.display = 'block';

            // PC aÃ¯Â¿Â½ panelini kÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½lten/yok eden yerel fonksiyonu tetikle (EÃ¯Â¿Â½er HTML'de varsa)
            if (typeof window.kucultPanel === 'function') {
                window.kucultPanel();
            }

            // Ekran kilitleri aÃ¯Â¿Â½Ã¯Â¿Â½ldÃ¯Â¿Â½ktan hemen sonra canvas'Ã¯Â¿Â½ temiz bir Ã¯Â¿Â½ekilde yenile
            setTimeout(() => {
                if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes();
                if (typeof lockScreenSize === 'function') lockScreenSize();
            }, 150);

            return;
        }


        // GÃ¯Â¿Â½VENLÃ¯Â¿Â½K DUVARI
        if (!window.baglantiOnaylandi) return;

        // --- A) TOPLU Ã¯Â¿Â½EKÃ¯Â¿Â½L ALICISI (Ã¯Â¿Â½OKGENLER VE Ã¯Â¿Â½Ã¯Â¿Â½GENLER) ---
        if (data.type === 'akilli_sekil_toplu') {
            if (data.strokes && Array.isArray(data.strokes)) {
                data.strokes.forEach(s => {
                    if (typeof adaptStrokeToScreen === 'function') {
                        const senderCw = data.cw || data.cssW;
                        const senderCh = data.ch || data.cssH;
                        adaptStrokeToScreen(s, data.cssW, data.cssH, senderCw, senderCh, data);
                    }
                    const isDuplicate = s.id && window.drawnStrokes.some(ds => ds.id === s.id);
                    if (!isDuplicate) window.drawnStrokes.push(s);
                });
            }
            if (window.redrawAllStrokes) window.redrawAllStrokes();
            return;
        }


        // --- B) TEKÃ¯Â¿Â½L Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M/KALEM/RESÃ¯Â¿Â½M ALICISI ---
        if (data.type === 'yeni_cizim') {
            const stroke = data.stroke;
            if (!stroke) return;

            // ?? EKRAN SENKRONÃ¯Â¿Â½ZASYONU: Gelen stroke'u Kendi EkranÃ¯Â¿Â½mÃ¯Â¿Â½za (Ã¯Â¿Â½Ã¯Â¿Â½ Piksellere) Ã¯Â¿Â½evir!
            // EÃ¯Â¿Â½ER BUNU YAPMAZSAK, Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½MLER FARKLI EKRANLARDA PDF Ã¯Â¿Â½LE UYUÃ¯Â¿Â½MAZ!
            const isArr = Array.isArray(stroke);
            const strokesArr = isArr ? stroke : [stroke];
            
            strokesArr.forEach(s => {
                if (typeof adaptStrokeToScreen === 'function') {
                    const senderCw = data.cw || data.cssW || 1920;
                    const senderCh = data.ch || data.cssH || 1080;
                    adaptStrokeToScreen(s, data.cssW || senderCw, data.cssH || senderCh, senderCw, senderCh, data);
                }
            });

            if (isArr) {
                strokesArr.forEach(s => {
                    const isExist = s.id && window.drawnStrokes.some(ex => ex.id === s.id);
                    if (!isExist) window.drawnStrokes.push(s);
                });
                if (typeof drawnStrokes !== 'undefined') drawnStrokes = window.drawnStrokes;
                if (window.redrawAllStrokes) window.redrawAllStrokes();
                return;
            }

            // Normal Tekil Ã¯Â¿Â½izim (Kalem karalamasÃ¯Â¿Â½ vs.)
            const existingIndex = stroke.id ? window.drawnStrokes.findIndex(s => s.id === stroke.id) : -1;

            if (existingIndex !== -1) {
                window.drawnStrokes[existingIndex] = stroke;
                if (typeof drawnStrokes !== 'undefined') drawnStrokes = window.drawnStrokes;
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            } else {
                if (stroke.type === 'image' && stroke.imgData) {
                    const tempImg = new Image();
                    tempImg.src = stroke.imgData;
                    tempImg.onload = () => {
                        stroke.imgObj = tempImg;
                        window.drawnStrokes.push(stroke);
                        if (typeof drawnStrokes !== 'undefined') drawnStrokes = window.drawnStrokes;
                        if (window.redrawAllStrokes) window.redrawAllStrokes();
                    };
                } else {
                    window.drawnStrokes.push(stroke);
                    if (typeof drawnStrokes !== 'undefined') drawnStrokes = window.drawnStrokes;
                    if (window.redrawAllStrokes) window.redrawAllStrokes();

                    // ?? EÃ¯Â¿Â½ER GELEN Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M 3D Ã¯Â¿Â½EKÃ¯Â¿Â½LSE PC MOTORUNU TETÃ¯Â¿Â½KLE ??
                    if (stroke.type === '3d_shape' && window.Scene3D) {
                        if (!window.Scene3D.isInit) window.Scene3D.init();
                        if (window.Scene3D.container) {
                            window.Scene3D.container.style.display = 'block';
                            window.Scene3D.container.style.zIndex = '15';
                        }
                        if (typeof window.Scene3D.addShapeFromNetwork === 'function') {
                            window.Scene3D.addShapeFromNetwork(stroke);
                        }
                    }
                }
            }
            return;
        }

        // --- C) FÃ¯Â¿Â½ZÃ¯Â¿Â½KSEL ARAÃ¯Â¿Â½LAR VE DÃ¯Â¿Â½Ã¯Â¿Â½ER FONKSÃ¯Â¿Â½YONLAR ---
        if (data.type === 'arac_senkron') {
            // ?? GÃ¯Â¿Â½VENLÃ¯Â¿Â½K YAMASI: Sadece izin verilen araÃ¯Â¿Â½lara CSS mÃ¯Â¿Â½dahalesi yapÃ¯Â¿Â½labilir
            const allowedSelectors = ['.yuzen-kopya-container'];
            if (!allowedSelectors.includes(data.selector)) {
                console.warn("?? GÃ¯Â¿Â½venlik Ã¯Â¿Â½hlali: Ã¯Â¿Â½zin verilmeyen CSS mÃ¯Â¿Â½dahalesi engellendi!", data.selector);
                return;
            }

            const el = document.querySelector(data.selector);
            if (el) {
                if (data.display !== undefined) el.style.display = data.display;
                if (data.left !== undefined) el.style.left = data.left;
                if (data.top !== undefined) el.style.top = data.top;
                if (data.transform !== undefined) el.style.transform = data.transform;
                if (data.width !== undefined) el.style.width = data.width;
                if (data.height !== undefined) el.style.height = data.height;
            }
        }

        // --- BURAYA EKLENECEK TEK SATIR ---
        window.isConnected = true;

        if (data.type === 'sekil_guncelle') {
            const stroke = data.stroke;
            if (!stroke) return;
            if (typeof adaptStrokeToScreen === 'function') {
                const senderCw = data.cw || data.cssW;
                const senderCh = data.ch || data.cssH;
                const senderW = data.cssW || data.cw;
                const senderH = data.cssH || data.ch;
                adaptStrokeToScreen(stroke, senderW, senderH, senderCw, senderCh, data);
            }

            let index = -1;

            // ?? KÃ¯Â¿Â½MLÃ¯Â¿Â½K UYUÃ¯Â¿Â½MAZLIÃ¯Â¿Â½I Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½MÃ¯Â¿Â½: 
            // Gelen Ã¯Â¿Â½ekil arka plan (resim/PDF) ise, ID'ye bakmadan direkt bul!
            if (stroke.isBackground === true) {
                index = window.drawnStrokes.findIndex(s => s.isBackground === true);
            } else {
                if (!stroke.id) return;
                index = window.drawnStrokes.findIndex(s => s.id === stroke.id);
            }

            if (index !== -1) {
                const hedef = window.drawnStrokes[index];

                if (hedef.isBackground === true) {
                    // ?? Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M 3: Tabletin mutlak koordinatlarÃ¯Â¿Â½, PC'nin Ã¯Â¿Â½zel merkez hizalamasÃ¯Â¿Â½nÃ¯Â¿Â½ ezmesin diye
                    // Arka plan sekil_guncelle iÃ¯Â¿Â½lemlerini KESÃ¯Â¿Â½N OLARAK YASAKLIYORUZ! 
                    // Bu iÃ¯Â¿Â½lem artÃ¯Â¿Â½k sadece Ã¯Â¿Â½stteki 'hepsini_tasi' ile pÃ¯Â¿Â½rÃ¯Â¿Â½zsÃ¯Â¿Â½zce yapÃ¯Â¿Â½lacak.
                    return; 
                }

                hedef.x = stroke.x;
                hedef.y = stroke.y;
                hedef.width = stroke.width;
                hedef.height = stroke.height;
                if (stroke.rotation !== undefined) hedef.rotation = stroke.rotation;

                if (stroke.radius !== undefined) hedef.radius = stroke.radius;
                if (stroke.cx !== undefined) hedef.cx = stroke.cx;
                if (stroke.cy !== undefined) hedef.cy = stroke.cy;
                if (stroke.center !== undefined) hedef.center = stroke.center;

               // ?? Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: KoordinatlarÃ¯Â¿Â½ aÃ¯Â¿Â½da zorla ezmeyi bÃ¯Â¿Â½raktÃ¯Â¿Â½k (ZÃ¯Â¿Â½plamayÃ¯Â¿Â½ engeller). Sadece gÃ¯Â¿Â½venli verileri al.
                if (stroke.rotationX !== undefined) hedef.rotationX = stroke.rotationX;
                if (stroke.rotationY !== undefined) hedef.rotationY = stroke.rotationY;
                if (stroke.rotationZ !== undefined) hedef.rotationZ = stroke.rotationZ;
                if (stroke.meshScale !== undefined) hedef.meshScale = stroke.meshScale;

                // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: Tabletteki (AÃ¯Â¿Â½Ã¯Â¿Â½ / Kenar uzunluÃ¯Â¿Â½u / Ã¯Â¿Â½ember formÃ¯Â¿Â½lÃ¯Â¿Â½) etiketlerini PC'de de GÃ¯Â¿Â½STER!

                // ?? 3. AÃ¯Â¿Â½ SENKRONU: PC'nin 3D dÃ¯Â¿Â½ndÃ¯Â¿Â½rme ve boyutlarÃ¯Â¿Â½ kabul etmesi iÃ¯Â¿Â½in gelen verileri kaydet!
                if (stroke.rotationX !== undefined) hedef.rotationX = stroke.rotationX;
                if (stroke.rotationY !== undefined) hedef.rotationY = stroke.rotationY;
                if (stroke.rotationZ !== undefined) hedef.rotationZ = stroke.rotationZ;
                if (stroke.originalW !== undefined) {
                    hedef.originalW = stroke.originalW;
                    hedef.originalH = stroke.originalH;
                    hedef.originalX = stroke.originalX;
                    hedef.originalY = stroke.originalY;
                }

                // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: Tabletteki (AÃ¯Â¿Â½Ã¯Â¿Â½ / Kenar uzunluÃ¯Â¿Â½u / Ã¯Â¿Â½ember formÃ¯Â¿Â½lÃ¯Â¿Â½) etiketlerini PC'de de GÃ¯Â¿Â½STER!
                if (data.stroke.showEdgeLabels !== undefined) hedef.showEdgeLabels = data.stroke.showEdgeLabels;
                if (data.stroke.showAngleLabels !== undefined) hedef.showAngleLabels = data.stroke.showAngleLabels;
                if (data.stroke.showCircleInfo !== undefined) hedef.showCircleInfo = data.stroke.showCircleInfo;

                // ?? PC MOTORU: TABLETTEN GELEN SÃ¯Â¿Â½RÃ¯Â¿Â½KLEME VE DÃ¯Â¿Â½NDÃ¯Â¿Â½RME BÃ¯Â¿Â½LGÃ¯Â¿Â½SÃ¯Â¿Â½NÃ¯Â¿Â½ SAHNEYE UYGULA
                if (hedef.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
                    const sceneMesh = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === hedef.id);
                    if (sceneMesh) {
                        
                        // ?? NÃ¯Â¿Â½HAÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M 2: Konum ve boyutlandÃ¯Â¿Â½rmayÃ¯Â¿Â½ burada YAPMIYORUZ! 
                // ZÃ¯Â¿Â½plamalarÃ¯Â¿Â½n ana sebebi buydu. Ã¯Â¿Â½izim motoru (redrawAllStrokes) zaten onu 
                // PC'de olmasÃ¯Â¿Â½ gereken milimetrik konuma taÃ¯Â¿Â½Ã¯Â¿Â½yor. Sadece Z eksenini koruyup bÃ¯Â¿Â½rakÃ¯Â¿Â½yoruz.
                if (data.stroke.pos3D && data.stroke.pos3D.z !== undefined) {
                    sceneMesh.position.z = data.stroke.pos3D.z;
                }

                        // Rotasyon ayarlarÃ¯Â¿Â½nÃ¯Â¿Â½ koru
                        // Rotasyon ayarlarini koru
                                                // Rotasyon ayarlarini koru (SLERP Hedefi)
                        if (data.stroke.rotationX !== undefined) {
                            if (!sceneMesh.userData.targetQuaternion) {
                                sceneMesh.userData.targetQuaternion = sceneMesh.quaternion.clone();
                            }
                            const targetEuler = new THREE.Euler(data.stroke.rotationX, data.stroke.rotationY, data.stroke.rotationZ, 'XYZ');
                            sceneMesh.userData.targetQuaternion.setFromEuler(targetEuler);
                        }

                        if (data.stroke.x !== undefined && data.stroke.y !== undefined && window.Scene3D && window.Scene3D.camera) {
                            const normCoords = window.Scene3D.getNormalizedCoords(data.stroke.x, data.stroke.y);
                            window.Scene3D.raycaster.setFromCamera(normCoords, window.Scene3D.camera);
                            const intersection = new THREE.Vector3();
                            if (window.Scene3D.raycaster.ray.intersectPlane(window.Scene3D.plane, intersection)) {
                                if (data.stroke.pos3D && data.stroke.pos3D.z !== undefined) {
                                    intersection.z = data.stroke.pos3D.z;
                                }
                                if (!sceneMesh.userData.targetPosition) {
                                    sceneMesh.position.copy(intersection);
                                    sceneMesh.userData.targetPosition = intersection.clone();
                                } else {
                                    sceneMesh.userData.targetPosition.copy(intersection);
                                }
                            }
                        }

                        // Boyut (Scale) bilgisini aninda WebGL motoruna yansit (Gecikmesiz)
                        if (data.stroke.meshScale !== undefined) {
                            sceneMesh.scale.setScalar(data.stroke.meshScale);
                        }

                        // Surgu acinim bilgisini senkronize et
                        if (data.stroke.openRatio !== undefined) {
                            hedef.openRatio = data.stroke.openRatio;
                            if (sceneMesh.userData && sceneMesh.userData.strokeData) {
                                sceneMesh.userData.strokeData.openRatio = data.stroke.openRatio;
                            }
                            // Animasyon (Lerp) pruzsuz calismasi icin buradaki anlik guncellemeler Scene3D.animate icine alindi.
                        }

                        if (window.Scene3D.currentMesh === sceneMesh) window.Scene3D.updateHandlePositions();
                    }
                    
                    // ==========================================
                    // HIZ OPTIMIZASYONU (GECIKME KALDIRICI)
                    // ==========================================
                    // Eger yansitilan sekil sadece bir 3D model ise (ve uzerinde 2D yazi/etiket yoksa)
                    // koca 2D sayfa cizim motorunu (redrawAllStrokes) saniyede 60 kez calistirmaya ASLA gerek yoktur!
                    // WebGL motoru zaten (requestAnimationFrame) ile aninda kendi goruntusunu gunceller.
                    // Bu return komutu sayfa kilitlenmesini ve agdaki ping gecikmelerini SIFIRA indirir.
                    if (!hedef.showEdgeLabels && !hedef.showAngleLabels && !hedef.showCircleInfo) {
                        return; 
                    }
                }

                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
        }

        if (data.type === 'sil_objeyi') {
            const zombiIndex = window.drawnStrokes.findIndex(s => s.id === data.strokeId);

            // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: 3D Ã¯Â¿Â½ekil ise PC'nin uzay sahnesinden de TAMAMEN SÃ¯Â¿Â½L!
            if (window.Scene3D && window.Scene3D.scene) {
                const meshToRemove = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === data.strokeId);
                if (meshToRemove) {
                    window.Scene3D.scene.remove(meshToRemove);
                    if (window.Scene3D.currentMesh === meshToRemove) window.Scene3D.currentMesh = null;
                    window.Scene3D.updateHandlePositions();
                }
            }

            if (zombiIndex !== -1) window.drawnStrokes.splice(zombiIndex, 1);
            else if (data.index !== undefined && window.drawnStrokes[data.index]) window.drawnStrokes.splice(data.index, 1);

            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

                if (data.type === 'geri_al') {
            const popped = window.drawnStrokes.pop();
            // ?? 3D Ã¯Â¿Â½EKÃ¯Â¿Â½LSE GERÃ¯Â¿Â½ ALIRKEN PC SAHNESÃ¯Â¿Â½NDEN DE KALDIR
            if (popped && popped.type === '3d_shape' && window.Scene3D && window.Scene3D.scene) {
                const meshToRemove = window.Scene3D.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === popped.id);
                if (meshToRemove) {
                    meshToRemove.traverse((child) => {
                        if (child.isMesh || child.isLineSegments) {
                            if (child.geometry) child.geometry.dispose();
                            if (child.material) {
                                if (Array.isArray(child.material)) child.material.forEach(mat => mat.dispose());
                                else child.material.dispose();
                            }
                        }
                    });
                    window.Scene3D.scene.remove(meshToRemove);
                    if (window.Scene3D.currentMesh === meshToRemove) window.Scene3D.currentMesh = null;
                    window.Scene3D.updateHandlePositions();
                }
            }

            // YENÃ¯Â¿Â½: PC EKRANINDA DA KAT Ã¯Â¿Â½ZÃ¯Â¿Â½ BIRAK
            if (popped && popped.isPatch === true && popped.foldLine) {
                const p1 = popped.foldLine[0];
                const p2 = popped.foldLine[1];
                const izStroke = {
                    type: 'segment',
                    p1: p1,
                    p2: p2,
                    color: 'rgba(255, 105, 180, 0.7)',
                    width: 2.5,
                    isDash: true,
                    dashPattern: [10, 5],
                    isBackground: false
                };
                window.drawnStrokes.push(izStroke);
            }

            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

        else if (data.type === 'sil_belirli' && data.id) {
            const index = window.drawnStrokes.findIndex(s => s.id === data.id);
            if (index !== -1) {
                window.drawnStrokes.splice(index, 1);
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
        }
        else if (data.type === 'hepsini_sil') {
            // PC Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½N KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: HafÃ¯Â¿Â½za BağlantısÃ¯Â¿Â½nÃ¯Â¿Â½ koparmadan filtreleme yapÃ¯Â¿Â½yoruz!
            const korunacakZeminler = window.drawnStrokes.filter(stroke => stroke.isBackground === true);

            window.drawnStrokes.length = 0; // 1. Orijinal hafÃ¯Â¿Â½zanÃ¯Â¿Â½n iÃ¯Â¿Â½ini tamamen boÃ¯Â¿Â½alt
            window.drawnStrokes.push(...korunacakZeminler); // 2. Sadece PDF ve arka planlarÃ¯Â¿Â½ geri koy

            // ?? PC'NÃ¯Â¿Â½N 3D UZAYINI TAMAMEN TEMÃ¯Â¿Â½ZLE ??
            if (window.Scene3D && window.Scene3D.scene) {
                const toRemove = window.Scene3D.scene.children.filter(c => c.type === 'Mesh' || c.type === 'Group');
                toRemove.forEach(m => {
                    m.traverse((child) => {
                        if (child.isMesh || child.isLineSegments) {
                            if (child.geometry) child.geometry.dispose();
                            if (child.material) {
                                if (Array.isArray(child.material)) child.material.forEach(mat => mat.dispose());
                                else child.material.dispose();
                            }
                        }
                    });
                    window.Scene3D.scene.remove(m);
                });
                window.Scene3D.currentMesh = null;
                if (typeof window.Scene3D.updateHandlePositions === 'function') window.Scene3D.updateHandlePositions();
            }

            // PC tarafÃ¯Â¿Â½ndaki kayÃ¯Â¿Â½tlÃ¯Â¿Â½ veriyi de temizle (LocalStorage)
            if (window.localStorage) {
                window.localStorage.removeItem('drawnStrokes');
            }
            // EkranÃ¯Â¿Â½ yenile
            if (window.redrawAllStrokes) window.redrawAllStrokes();

            console.log("PC: Silme komutu alÃ¯Â¿Â½ndÃ¯Â¿Â½. Ã¯Â¿Â½izimler ve kopyalar uÃ¯Â¿Â½uruldu, sadece zemin korundu.");
        }

        if (data.type === 'pdf_yukle') {
            try {
                const base64Data = data.pdfData.split(',')[1];
                const binaryString = window.atob(base64Data);
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) { bytes[i] = binaryString.charCodeAt(i); }
                if (typeof pdfjsLib !== 'undefined') {
                    pdfjsLib.getDocument(bytes).promise.then(pdf => {
                        window.currentPDF = pdf; window.totalPDFPages = pdf.numPages; window.currentPDFPage = 1;
                        if (document.getElementById('pdf-controls')) document.getElementById('pdf-controls').classList.remove('hidden');
                        if (typeof window.renderPDFPage === 'function') window.renderPDFPage(1);
                    });
                }
            } catch (e) { console.error("PDF Hatası:", e); }
        }

        if (data.type === 'pdf_sayfa_degis') { window.currentPDFPage = data.sayfa; if (typeof window.renderPDFPage === 'function') window.renderPDFPage(window.currentPDFPage); }

        // (Ã¯Â¿Â½kinci kopya arka_plan_resmi_aktar alÃ¯Â¿Â½cÃ¯Â¿Â½sÃ¯Â¿Â½ silindi, yukarÃ¯Â¿Â½daki ana alÃ¯Â¿Â½cÃ¯Â¿Â½ kullanÃ¯Â¿Â½lÃ¯Â¿Â½yor)

        // ?? YENÃ¯Â¿Â½ EKLENEN BÃ¯Â¿Â½LÃ¯Â¿Â½M: PC'NÃ¯Â¿Â½N PDF KAPATMA EMRÃ¯Â¿Â½NÃ¯Â¿Â½ ALDIÃ¯Â¿Â½I YER ??
        if (data.type === 'pdf_kapat') {
            // ?? SÃ¯Â¿Â½HÃ¯Â¿Â½RLÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: PC tarafÃ¯Â¿Â½nda da filter yerine splice kullanÃ¯Â¿Â½yoruz ??
            if (window.drawnStrokes) {
                for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                    const s = window.drawnStrokes[i];
                    if (s.isBackground === true || s.type === 'lasso-mask' || s.isPatch === true) {
                        window.drawnStrokes.splice(i, 1);
                    }
                }
            }
            window.currentPDF = null;
            window.pdfImageStroke = null;

            // KÃ¯Â¿Â½rmÃ¯Â¿Â½zÃ¯Â¿Â½ butonu PC ekranÃ¯Â¿Â½ndan da garanti olmasÃ¯Â¿Â½ iÃ¯Â¿Â½in gizle
            const pcKapatBtn = document.getElementById('btn-close-pdf');
            if (pcKapatBtn) {
                pcKapatBtn.classList.add('hidden');
                pcKapatBtn.style.display = 'none';
            }

            if (window.redrawAllStrokes) window.redrawAllStrokes();
            console.log("PC: Tablet arka planÃ¯Â¿Â½ kapattÃ¯Â¿Â½, ekran temizlendi.");
        }


        // ?? NÃ¯Â¿Â½KLEER Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: AÃ¯Â¿Â½ILIÃ¯Â¿Â½ PENCERESÃ¯Â¿Â½NÃ¯Â¿Â½ KÃ¯Â¿Â½KÃ¯Â¿Â½NDEN SÃ¯Â¿Â½L ??
        if (data.type === 'acilis_penceresini_kapat') {
            const acilisPenceresi = document.getElementById('disclaimer-modal');
            if (acilisPenceresi) {
                // Sadece gizlemekle kalma, HTML'den tamamen kazÃ¯Â¿Â½!
                acilisPenceresi.remove();
            }

            // EÃ¯Â¿Â½er isminde farklÃ¯Â¿Â½lÃ¯Â¿Â½k varsa diye tÃ¯Â¿Â½m uyarÃ¯Â¿Â½ pencerelerini gizle
            document.querySelectorAll('.modal, .overlay, [id*="modal"], [id*="disclaimer"]').forEach(el => {
                el.style.display = 'none';
            });

            // ZÃ¯Â¿Â½rh: PC arka planda yeniden aÃ¯Â¿Â½maya Ã¯Â¿Â½alÃ¯Â¿Â½Ã¯Â¿Â½masÃ¯Â¿Â½n diye CSS ile mÃ¯Â¿Â½hÃ¯Â¿Â½rle
            const muhur_disclaimer = document.createElement('style');
            muhur_disclaimer.innerHTML = '#disclaimer-modal, .disclaimer-modal { display: none !important; opacity: 0 !important; pointer-events: none !important; z-index: -9999 !important; }';
            document.head.appendChild(muhur_disclaimer);

            console.log("PC: AÃ¯Â¿Â½Ã¯Â¿Â½lÃ¯Â¿Â½Ã¯Â¿Â½ penceresi KÃ¯Â¿Â½KÃ¯Â¿Â½NDEN silindi ve mÃ¯Â¿Â½hÃ¯Â¿Â½rlendi.");
        }


        // ?? PC: UYGULAMAYI YÃ¯Â¿Â½KLE PENCERESÃ¯Â¿Â½NÃ¯Â¿Â½ KAPATMA SÃ¯Â¿Â½NYALÃ¯Â¿Â½ ??
        if (data.type === 'yukleme_penceresini_kapat') {
            const yuklemePenceresi = document.getElementById('install-popup');
            if (yuklemePenceresi) {
                yuklemePenceresi.remove(); // Sadece gizleme, HTML dosyasÃ¯Â¿Â½ndan KÃ¯Â¿Â½KÃ¯Â¿Â½NDEN SÃ¯Â¿Â½L!
            }

            // TarayÃ¯Â¿Â½cÃ¯Â¿Â½ arkadan iÃ¯Â¿Â½ Ã¯Â¿Â½evirip geri getirmesin diye CSS MÃ¯Â¿Â½hrÃ¯Â¿Â½ bas:
            const muhur_disclaimer = document.createElement('style');
            muhur_disclaimer.innerHTML = '#install-popup { display: none !important; opacity: 0 !important; z-index: -9999 !important; pointer-events: none !important; }';
            document.head.appendChild(muhur_disclaimer);

            console.log("PC: YÃ¯Â¿Â½kleme penceresi yok edildi ve mÃ¯Â¿Â½hÃ¯Â¿Â½rlendi.");
        }


        if (data.type === 'arac_state_senkron') {
            let toolObj = null, el = null;
            if (data.arac === 'ruler') { toolObj = window.RulerTool; el = document.querySelector('.ruler-container'); }
            if (data.arac === 'gonye') { toolObj = window.GonyeTool; el = document.querySelector('.gonye-container'); }
            if (data.arac === 'aciolcer') { toolObj = window.AciolcerTool; el = document.querySelector('.aciolcer-container'); }
            if (data.arac === 'pergel') { toolObj = window.PergelTool; el = document.getElementById('compass-container'); }

            if (toolObj) {
                if (data.state) Object.assign(toolObj.state, data.state);
                if (data.arac === 'pergel' && toolObj.state) {
                    if (toolObj.state.isDrawing) {
                        toolObj.previewCanvas.style.display = 'block';
                        toolObj.previewCanvas.width = window.innerWidth;
                        toolObj.previewCanvas.height = window.innerHeight;
                        toolObj.drawPreviewArc();
                    } else {
                        toolObj.previewCanvas.style.display = 'none';
                        if (toolObj.previewCtx) toolObj.previewCtx.clearRect(0, 0, toolObj.previewCanvas.width, toolObj.previewCanvas.height);
                    }
                }
                if (el) {
                    if (data.display === 'none') {
                        el.classList.add('hidden'); // ?? KESÃ¯Â¿Â½N OLARAK GÃ¯Â¿Â½ZLE
                        el.style.display = 'none';
                    } else {
                        el.classList.remove('hidden'); // ?? KESÃ¯Â¿Â½N OLARAK GÃ¯Â¿Â½STER
                        el.style.display = (data.arac === 'ruler' || data.arac === 'gonye') ? 'flex' : 'block';
                    }
                    if (data.width) el.style.width = data.width;
                    if (data.height) el.style.height = data.height;
                }
                if (typeof toolObj.updateTransform === 'function') toolObj.updateTransform();
                if (typeof toolObj.updateMarkings === 'function') toolObj.updateMarkings();
                if (typeof toolObj.createLabels === 'function') toolObj.createLabels();

                // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: YansÃ¯Â¿Â½ma (Titreme) Engelleme Kilidi
                toolObj.lastNetworkReceiveTime = Date.now();
            }
        }

        if (data.type === 'aktif_onizleme') {
            const arac = data.arac;
            const p = data.payload;

            if (arac === 'ruler' && window.RulerTool && window.RulerTool.drawCtx) {
                const r = window.RulerTool;
                r.drawHandleElement.style.transition = 'none'; r.drawHandleElement.style.left = `${p.handleX}px`;
                r.drawHandleLabel.innerText = `${(p.handleX / r.PIXELS_PER_CM).toFixed(1).replace('.', ',')} cm`;
                r.drawHandleLabel.style.display = 'block';
                r.drawCtx.clearRect(0, 0, r.drawCanvas.width, r.drawCanvas.height);
                r.drawCtx.beginPath(); r.drawCtx.moveTo(0, 4); r.drawCtx.lineTo(p.handleX, 4);
                r.drawCtx.strokeStyle = '#FFFFFF'; r.drawCtx.lineWidth = 3; r.drawCtx.stroke();
            }
            else if (arac === 'gonye' && window.GonyeTool && window.GonyeTool.drawCtx) {
                const g = window.GonyeTool;
                g.drawHandleElement.style.transition = 'none'; g.drawHandleElement.style.top = `${p.handleY}px`;
                g.drawHandleLabel.innerText = `${(Math.abs(g.state.height - (p.handleY + 10)) / g.PIXELS_PER_CM).toFixed(1).replace('.', ',')} cm`;
                g.drawHandleLabel.style.display = 'block';
                g.drawCtx.clearRect(0, 0, g.drawCanvas.width, g.drawCanvas.height);
                g.drawCtx.beginPath(); g.drawCtx.moveTo(4, g.state.height); g.drawCtx.lineTo(4, p.handleY + 10);
                g.drawCtx.strokeStyle = '#FFFFFF'; g.drawCtx.lineWidth = 3; g.drawCtx.stroke();
            }
            else if (arac === 'aciolcer' && window.AciolcerTool && window.AciolcerTool.previewCtx) {
                const a = window.AciolcerTool;
                a.previewCanvas.style.display = 'block'; a.previewCanvas.width = window.innerWidth; a.previewCanvas.height = window.innerHeight;
                a.previewCtx.clearRect(0, 0, a.previewCanvas.width, a.previewCanvas.height);
                a.previewCtx.beginPath(); a.previewCtx.moveTo(p.cx, p.cy); a.previewCtx.lineTo(p.px, p.py);
                a.previewCtx.strokeStyle = '#FFFFFF'; a.previewCtx.lineWidth = 3; a.previewCtx.setLineDash([5, 5]); a.previewCtx.stroke(); a.previewCtx.setLineDash([]);
                a.drawHandleLabel.style.display = 'block'; a.drawHandleLabel.innerText = `${p.angle.toFixed(0)}`;
                a.redLine.style.transition = 'none'; a.redLine.style.transform = `rotate(${-p.angle}deg)`;
                a.drawHandle.style.transform = `translateX(-50%) translate(${p.ldx}px, ${p.ldy + 5}px)`;
                a.drawHandleLabel.style.transform = `translateX(-50%) translate(${p.ldx}px, ${p.ldy - 20}px)`;
            }
            else if (arac === 'lazer') {
                let lazer = document.getElementById('sanal-lazer');
                if (!lazer) {
                    lazer = document.createElement('div'); lazer.id = 'sanal-lazer';
                    lazer.style.width = '14px'; lazer.style.height = '14px'; lazer.style.background = 'rgba(0, 255, 200, 0.9)'; lazer.style.boxShadow = '0 0 12px rgba(0,255,200,1)';
                    lazer.style.borderRadius = '50%'; lazer.style.position = 'fixed'; lazer.style.pointerEvents = 'none'; lazer.style.zIndex = '9999'; lazer.style.transform = 'translate(-50%, -50%)';
                    document.body.appendChild(lazer);
                }
                lazer.style.display = 'block'; lazer.style.left = `${p.x}px`; lazer.style.top = `${p.y}px`;
                clearTimeout(window.lazerTimer); window.lazerTimer = setTimeout(() => { lazer.style.display = 'none'; }, 150);
            }
            else if (arac === 'cizim_onizleme') {
                // SÃ¯Â¿Â½HÃ¯Â¿Â½RLÃ¯Â¿Â½ DÃ¯Â¿Â½ZELTME: filter yerine splice kullanarak hafÃ¯Â¿Â½za kopmasÃ¯Â¿Â½nÃ¯Â¿Â½ kÃ¯Â¿Â½kÃ¯Â¿Â½nden Ã¯Â¿Â½Ã¯Â¿Â½zÃ¯Â¿Â½yoruz!
                for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                    if (window.drawnStrokes[i].type === 'preview') window.drawnStrokes.splice(i, 1);
                }

                const previewObj = { type: 'preview', isTemporaryPreview: true, payload: p, id: 'temp-preview-id' };
                window.drawnStrokes.push(previewObj);
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }

            // ?? YENÃ¯Â¿Â½ EKLENEN: PC'NÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZGÃ¯Â¿Â½ Ã¯Â¿Â½NÃ¯Â¿Â½ZLEMESÃ¯Â¿Â½NÃ¯Â¿Â½ HAVADA Ã¯Â¿Â½Ã¯Â¿Â½ZMESÃ¯Â¿Â½ ??
            else if (arac === 'cizgi_onizleme') {
                if (window.redrawAllStrokes) window.redrawAllStrokes(); // KalÃ¯Â¿Â½cÃ¯Â¿Â½ Ã¯Â¿Â½izgileri ezmemek iÃ¯Â¿Â½in Ã¯Â¿Â½nce ekranÃ¯Â¿Â½ tazele

                const canvas = document.getElementById('drawing-canvas');
                if (canvas) {
                    const ctx = canvas.getContext('2d');
                    ctx.save();
                    ctx.strokeStyle = p.color || '#000000';
                    ctx.lineWidth = 3;
                    ctx.setLineDash([5, 5]); // AynÃ¯Â¿Â½ tabletteki gibi kesikli Ã¯Â¿Â½izgi efekti
                    ctx.beginPath();

                    const dx = p.endX - p.startX;
                    const dy = p.endY - p.startY;

                    if (dx !== 0 || dy !== 0) {
                        const devCarpan = 5000;
                        if (p.tool === 'line') {
                            ctx.moveTo(p.startX - dx * devCarpan, p.startY - dy * devCarpan);
                            ctx.lineTo(p.startX + dx * devCarpan, p.startY + dy * devCarpan);
                        } else if (p.tool === 'ray') {
                            ctx.moveTo(p.startX, p.startY);
                            ctx.lineTo(p.startX + dx * devCarpan, p.startY + dy * devCarpan);
                        } else {
                            ctx.moveTo(p.startX, p.startY);
                            ctx.lineTo(p.endX, p.endY);
                        }
                    } else {
                        ctx.moveTo(p.startX, p.startY);
                        ctx.lineTo(p.endX, p.endY);
                    }
                    ctx.stroke();
                    ctx.restore();
                }
            }

        } // <--- ?? EKSÃ¯Â¿Â½K OLAN SÃ¯Â¿Â½SLÃ¯Â¿Â½ PARANTEZ BURADA! (aktif_onizleme bloÃ¯Â¿Â½unu kapatÃ¯Â¿Â½r) ??

        if (data.type === 'onizleme_bitir') {
            // SÃ¯Â¿Â½HÃ¯Â¿Â½RLÃ¯Â¿Â½ DÃ¯Â¿Â½ZELTME: filter yerine splice kullanarak hafÃ¯Â¿Â½za kopmasÃ¯Â¿Â½nÃ¯Â¿Â½ kÃ¯Â¿Â½kÃ¯Â¿Â½nden Ã¯Â¿Â½Ã¯Â¿Â½zÃ¯Â¿Â½yoruz!
            for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                if (window.drawnStrokes[i].type === 'preview') window.drawnStrokes.splice(i, 1);
            }

            if (window.RulerTool && window.RulerTool.drawCtx) { window.RulerTool.drawHandleLabel.style.display = 'none'; window.RulerTool.drawCtx.clearRect(0, 0, window.RulerTool.drawCanvas.width, window.RulerTool.drawCanvas.height); }
            if (window.GonyeTool && window.GonyeTool.drawCtx) { window.GonyeTool.drawHandleLabel.style.display = 'none'; window.GonyeTool.drawHandleElement.style.transition = 'top 0.1s ease-out'; window.GonyeTool.drawHandleElement.style.top = `${window.GonyeTool.state.height - 20}px`; window.GonyeTool.drawCtx.clearRect(0, 0, window.GonyeTool.drawCanvas.width, window.GonyeTool.drawCanvas.height); }
            if (window.AciolcerTool && window.AciolcerTool.previewCtx) { window.AciolcerTool.drawHandleLabel.style.display = 'none'; window.AciolcerTool.previewCanvas.style.display = 'none'; window.AciolcerTool.redLine.style.transition = 'transform 0.1s ease-out'; window.AciolcerTool.redLine.style.transform = 'rotate(0deg)'; window.AciolcerTool.drawHandle.style.transition = 'transform 0.1s ease-out'; window.AciolcerTool.drawHandle.style.transform = 'translateX(-50%) translate(0px, 0px)'; window.AciolcerTool.previewCtx.clearRect(0, 0, window.AciolcerTool.previewCanvas.width, window.AciolcerTool.previewCanvas.height); }
            let lazer = document.getElementById('sanal-lazer'); if (lazer) lazer.style.display = 'none';
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

        if (data.type === 'secimi_senkronize_et') {
            const index = window.drawnStrokes.findIndex(s => s.id === data.strokeId);
            if (index !== -1) {
                // ?? PC'deki LOKAL deÃ¯Â¿Â½iÃ¯Â¿Â½kenleri ez ve aracÃ¯Â¿Â½ zorla 'move' yap (Butonlar gÃ¯Â¿Â½rÃ¯Â¿Â½nsÃ¯Â¿Â½n)
                selectedItem = window.drawnStrokes[index];
                window.selectedItem = selectedItem;

                if (typeof setActiveTool === 'function') setActiveTool('move');
                else currentTool = 'move';

                if (window.redrawAllStrokes) window.redrawAllStrokes();
            }
        }

        if (data.type === 'secimi_kaldir') {
            selectedItem = null;
            window.selectedItem = null;
            if (window.redrawAllStrokes) window.redrawAllStrokes();
        }

        // ?? SÃ¯Â¿Â½NKRONÃ¯Â¿Â½ZASYON: Fiziksel AraÃ¯Â¿Â½ TemasÃ¯Â¿Â½ (Siyah/Neon) PC'ye yansÃ¯Â¿Â½tÃ¯Â¿Â½lÃ¯Â¿Â½yor
        if (data.type === 'fiziksel_arac_temasi') {
            window.isToolThemeBlack = data.isBlackTheme;
            const elements = document.querySelectorAll('.ruler-container, .gonye-container, .aciolcer-container, #compass-container');
            elements.forEach(el => {
                if (data.isBlackTheme) {
                    el.classList.add('tool-black-theme');
                } else {
                    el.classList.remove('tool-black-theme');
                }
            });
            // PC'deki butonun metnini de senkronize et
            const colorBtn = document.getElementById('btn-tool-color');
            if (colorBtn) {
                colorBtn.innerText = data.isBlackTheme ? "AraÃ¯Â¿Â½ Rengi: Neon" : "AraÃ¯Â¿Â½ Rengi: Siyah";
            }
        }
    } // <--- processData fonksiyonu TAM BURADA kusursuzca kapanÃ¯Â¿Â½r

    // --- 3. BAÃ¯Â¿Â½LANTI KOPMASI DURUMU ---
    connection.on('close', function () {
        window._connectionEventsBound = false;
        window._lastSetupConnection = null;
        if (connection.isTeacherCandidate && window.authorizedTeacherId === connection.peer) {
            window.authorizedTeacherId = null;
            window.teacherConnectionStatus = 'disconnected'; window.firstTabletConnectionAccepted = false;
            window.teacherPairingToken = isTablet ? null : createSecureToken(16);
            window.teacherPairingTokenIssuedAt = isTablet ? 0 : Date.now();
        }
        window.pendingTeacherConnections.delete(connection.peer);
        isConnected = false;
        const statusEl = document.getElementById('connection-status');
        if (statusEl) {
            statusEl.innerText = "BAÄLANDI ğŸ¤";
            statusEl.style.color = "#ff4444";
        }
        // Bağlantı koptuÃ¯Â¿Â½unda sayfayÃ¯Â¿Â½ yenilemek en garantili Ã¯Â¿Â½Ã¯Â¿Â½zÃ¯Â¿Â½mdÃ¯Â¿Â½r:
        setTimeout(() => { location.reload(); }, 2000);
    });

    // --- SÃ¯Â¿Â½HÃ¯Â¿Â½RLÃ¯Â¿Â½ EÃ¯Â¿Â½Ã¯Â¿Â½TLEME (Ã¯Â¿Â½KÃ¯Â¿Â½ PENCERE Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½N ISRARCI VE ZIRHLI VERSÃ¯Â¿Â½YON) ---
    let denemeSayisi = 0;
    const pencereSyncTimer = setInterval(() => {
        if (!isConnected || !myConnection || !myConnection.open) return;

        // ?? YENÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: BAÃ¯Â¿Â½LANTI SONRADAN BÃ¯Â¿Â½LE GELSE DÃ¯Â¿Â½LÃ¯Â¿Â½ VE EKRAN KÃ¯Â¿Â½LÃ¯Â¿Â½DÃ¯Â¿Â½NÃ¯Â¿Â½ SENKRONÃ¯Â¿Â½ZE ET
        if (typeof currentLang !== 'undefined' && currentLang && typeof sendNetworkData !== 'undefined') {
            sendNetworkData({ type: 'dil_secimi', lang: currentLang });
        }

        // 1. Yasal UyarÃ¯Â¿Â½ KontrolÃ¯Â¿Â½ ve Sinyali
        if ((window.acilisPenceresiKapatildi || (document.getElementById('disclaimer-modal') && document.getElementById('disclaimer-modal').style.display === 'none')) && typeof sendNetworkData !== 'undefined') {
            sendNetworkData({ type: 'acilis_penceresini_kapat' });
        }

        // ?? 2. YENÃ¯Â¿Â½: YÃ¯Â¿Â½kle Penceresi KontrolÃ¯Â¿Â½ ve Sinyali ??
        const tabletPopup = document.getElementById('install-popup');
        if ((!tabletPopup || tabletPopup.style.display === 'none' || tabletPopup.classList.contains('hidden')) && typeof sendNetworkData !== 'undefined') {
            sendNetworkData({ type: 'yukleme_penceresini_kapat' });
        }

        console.log("PC'ye tÃ¯Â¿Â½m pencerelerin durum eÃ¯Â¿Â½itlemesi gÃ¯Â¿Â½nderiliyor... (Deneme: " + (denemeSayisi + 1) + ")");

        denemeSayisi++;
        if (denemeSayisi >= 4) clearInterval(pencereSyncTimer); // 4 saniye boyunca tahtayÃ¯Â¿Â½ bombalar, sonra durur
    }, 1000);

} // <--- setupConnectionEvents fonksiyonu tam burada kusursuzca kapanÃ¯Â¿Â½yor

// =========================================================
// 7. GÃ¯Â¿Â½VENLÃ¯Â¿Â½ VE KAYIPSIZ VERÃ¯Â¿Â½ FIRLATMA FONKSÃ¯Â¿Â½YONU (ZIRHLI VE BARKODLU VERSÃ¯Â¿Â½YON)
// =========================================================
window.mySessionId = Date.now().toString() + Math.random().toString();

window.sendNetworkData = function (dataPackage) {
    if (!dataPackage) return;
    if (dataPackage.type === 'aktif_onizleme') {
        if (!window.lastPreviewTime) window.lastPreviewTime = 0;
        if (Date.now() - window.lastPreviewTime < 50) return;
        window.lastPreviewTime = Date.now();
    }
    const boardLocalOnly = new Set(['arka_plan_resmi_aktar', 'pdf_yukle', 'resim_yukle']);

    // YANKI KORUMASI Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½N KÃ¯Â¿Â½MLÃ¯Â¿Â½K DAMGASI
    dataPackage.senderId = window.mySessionId;

    // BoyutlarÃ¯Â¿Â½ damgala (PC'de doÃ¯Â¿Â½ru hizalama iÃ¯Â¿Â½in)
    const canvasElm = document.getElementById('drawing-canvas');
    if (canvasElm) {
        dataPackage.cw = canvasElm.width;
        dataPackage.ch = canvasElm.height;
        dataPackage.cssW = window.innerWidth;
        dataPackage.cssH = window.innerHeight;
        dataPackage.dpr = window.devicePixelRatio || 1;
    }

    if (window.drawnStrokes) {
        const bg = window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch);
        if (bg) {
            dataPackage.bgX = bg.x;
            dataPackage.bgY = bg.y;
            dataPackage.bgW = bg.width;
            dataPackage.bgH = bg.height;
        }
    }

    // GÃ¯Â¿Â½vence: Ã¯Â¿Â½izim gÃ¯Â¿Â½nderiliyorsa ve ID'si yoksa ID ata!
    if (dataPackage.type === 'yeni_cizim' && dataPackage.stroke && !dataPackage.stroke.id) {
        dataPackage.stroke.id = Date.now() + Math.random();
    }

    

    const dataString = JSON.stringify(dataPackage);
    const CHUNK_SIZE = 8000;

    // DURUM 1: Tabletsek Tahtaya GÃ¯Â¿Â½nder
    if (typeof isConnected !== 'undefined' && isConnected && typeof myConnection !== 'undefined' && myConnection && (myConnection.open || window.isConnected)) {
        if (dataString.length <= CHUNK_SIZE) {
            myConnection.send(dataPackage);
        } else {
            const kargoBarkodu = Date.now().toString() + Math.floor(Math.random() * 1000);
            const totalChunks = Math.ceil(dataString.length / CHUNK_SIZE);
            
            function paketGonder(i, chunkIndex) {
                if (!myConnection || !myConnection.open) return;
                
                if (myConnection.dataChannel && myConnection.dataChannel.bufferedAmount > 64000) { 
                    setTimeout(() => paketGonder(i, chunkIndex), 50); 
                    return; 
                }
                
                try {
                    myConnection.send({ 
                        type: 'chunk', 
                        msgId: kargoBarkodu, 
                        data: dataString.substring(i, i + CHUNK_SIZE), 
                        idx: chunkIndex, 
                        total: totalChunks, 
                        isLast: (chunkIndex === totalChunks - 1) 
                    });
                } catch (e) {
                    console.error("Chunk gonderilemedi:", e);
                }
                
                i += CHUNK_SIZE; 
                chunkIndex++; 
                if (i < dataString.length) {
                    setTimeout(() => paketGonder(i, chunkIndex), 10);
                }
            }
            paketGonder(0, 0);
        }
    }
    // DURUM 2: Tahtaysak Tabletlere GÃ¯Â¿Â½nder
    else if (typeof window.aktifBaglantilar !== 'undefined') {
        if (boardLocalOnly.has(dataPackage.type)) {
            console.info('Hassas dosya paketi Ã¯Â¿Â½Ã¯Â¿Â½renci cihazlarÃ¯Â¿Â½na aktarÃ¯Â¿Â½lmadÃ¯Â¿Â½:', dataPackage.type);
            return;
        }
        for (let id in window.aktifBaglantilar) {
            const conn = window.aktifBaglantilar[id];
            if (conn && conn.open) {
                if (dataString.length <= CHUNK_SIZE) {
                    conn.send(dataPackage);
                } else {
                    let i = 0; let chunkIndex = 0;
                    const kargoBarkodu = Date.now().toString() + Math.floor(Math.random() * 1000);
                    const totalChunks = Math.ceil(dataString.length / CHUNK_SIZE);
                    function paketGonderTahta() {
                        if (!conn || (!conn.open && !window.isConnected)) return;
                        if (conn.dataChannel && conn.dataChannel.bufferedAmount > 64000) { setTimeout(paketGonderTahta, 50); return; }
                        if (i < dataString.length) {
                            conn.send({ type: 'chunk', msgId: kargoBarkodu, data: dataString.substring(i, i + CHUNK_SIZE), idx: chunkIndex, total: totalChunks, isLast: (chunkIndex === totalChunks - 1) });
                            i += CHUNK_SIZE; chunkIndex++; setTimeout(paketGonderTahta, 5);
                        }
                    }
                    paketGonderTahta();
                }
            }
        }
    }
};
window.networkResZirhi = true;
// ?? 1. ZIRH: EKRAN KAYDIRMA VE YAYLANMA ENGELLEYÃ¯Â¿Â½CÃ¯Â¿Â½ ??
const palmZirhi = document.createElement('style');
palmZirhi.innerHTML = `
    body, html {
        overscroll-behavior: none !important; /* EkranÃ¯Â¿Â½n lastik gibi yaylanmasÃ¯Â¿Â½nÃ¯Â¿Â½ bitirir */
    }
    #drawing-canvas {
        touch-action: none !important; /* TarayÃ¯Â¿Â½cÃ¯Â¿Â½ya kaydÃ¯Â¿Â½rma yapmayÃ¯Â¿Â½ kesinlikle yasaklar */
        -webkit-user-select: none !important;
        -webkit-touch-callout: none !important;
    }
`;
document.head.appendChild(palmZirhi);

// iOS/Safari ve Android'in inatÃ¯Â¿Â½Ã¯Â¿Â½ kaydÃ¯Â¿Â½rma (scroll) huylarÃ¯Â¿Â½nÃ¯Â¿Â½ zorla durduran motor
const cCnv = document.getElementById('drawing-canvas');
if (cCnv) {
    cCnv.addEventListener('touchstart', function (e) { e.preventDefault(); }, { passive: false });
    cCnv.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });
}

// ?? AKILLI ZIRH: AvuÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½iyle Sayfa KaymasÃ¯Â¿Â½nÃ¯Â¿Â½ Engeller, Zoom'u Bozmaz!
// ?? AKILLI ZIRH: Avu iyle Sayfa Kaymasn Engeller, Zoom'u Bozmaz!
const smartCanvas = document.getElementById('drawing-canvas');
if (smartCanvas) {
    smartCanvas.addEventListener('touchmove', function (e) {
        // Eer ekrana sadece 1 temas varsa (avu ii veya tek parmak srtnmesi)
        // sayfann lastik gibi kaymasn kesin olarak kilitler!
        if (e.touches && e.touches.length === 1 && e.cancelable) {
            e.preventDefault();
        }
    }, { passive: false });
}


// =========================================================
// ?? ZEL KON AINIM MOTORU (Kusursuz Yelpaze ve Kapak Sistemi)
// =========================================================
window.CustomConeEngine = {
    create: function(radius, height, mainMat, edgeMat) {
        const innerGroup = new THREE.Group();
        innerGroup.userData.isCustomCone = true;
        innerGroup.userData.r = radius;
        innerGroup.userData.h = height;
        innerGroup.userData.s = Math.hypot(radius, height);

        const segments = 32;
        const lateralGeo = new THREE.BufferGeometry();
        const numVerts = segments + 2;
        const posArray = new Float32Array(numVerts * 3);
        lateralGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const indices = [];
        for (let i = 1; i <= segments; i++) {
            // ?? 1. Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: YÃ¯Â¿Â½zeyleri dÃ¯Â¿Â½Ã¯Â¿Â½a Ã¯Â¿Â½evirdik, "Alttan gÃ¯Â¿Â½rÃ¯Â¿Â½nme" illÃ¯Â¿Â½zyonu bitti!
            indices.push(0, i, i + 1);
        }
        lateralGeo.setIndex(indices);
        const lateralMesh = new THREE.Mesh(lateralGeo, mainMat);
        lateralMesh.material.side = THREE.DoubleSide;
        
        // Ã¯Â¿Â½izgi Geometrisi
        const edgePos = new Float32Array((segments + 3) * 3);
        const lateralEdgeGeo = new THREE.BufferGeometry();
        lateralEdgeGeo.setAttribute('position', new THREE.BufferAttribute(edgePos, 3));
        const lateralEdges = new THREE.Line(lateralEdgeGeo, edgeMat);
        
        // Taban (Kapak) Geometrisi
        const baseGeo = new THREE.CircleGeometry(radius, 32);
        baseGeo.translate(0, -radius, 0); // KapaÃ¯Â¿Â½Ã¯Â¿Â½n dÃ¯Â¿Â½nme menteÃ¯Â¿Â½esini tam arka noktaya alÃ¯Â¿Â½yoruz
        
        const baseMesh = new THREE.Mesh(baseGeo, mainMat);
        baseMesh.material.side = THREE.DoubleSide;
        const baseEdges = new THREE.LineSegments(new THREE.EdgesGeometry(baseGeo), edgeMat);
        baseMesh.add(baseEdges);
        
        innerGroup.add(lateralMesh); innerGroup.add(baseMesh); innerGroup.add(lateralEdges);
        innerGroup.userData.lateralMesh = lateralMesh; innerGroup.userData.baseMesh = baseMesh; innerGroup.userData.lateralEdges = lateralEdges;
        
        const outerGroup = new THREE.Group();
        outerGroup.userData = innerGroup.userData;
        outerGroup.userData.innerGroup = innerGroup;
        outerGroup.add(innerGroup);
        
        this.update(outerGroup, 0); 
        return outerGroup;
    },
    
    update: function(group, ratio) {
        const innerGroup = group.userData.innerGroup || group;
        const r = innerGroup.userData.r; 
        const h = innerGroup.userData.h; 
        const s = innerGroup.userData.s; 
        const segments = 32;
        const pos = innerGroup.userData.lateralMesh.geometry.attributes.position.array;
        const epos = innerGroup.userData.lateralEdges.geometry.attributes.position.array;
        
        // ?? 2. Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: Motordan "rotation" (eÃ¯Â¿Â½im) komutlarÃ¯Â¿Â½nÃ¯Â¿Â½ tamamen SÃ¯Â¿Â½LDÃ¯Â¿Â½K. 
        // ArtÃ¯Â¿Â½k koni ekranÃ¯Â¿Â½n Ã¯Â¿Â½stÃ¯Â¿Â½ne bakarak dimdik duracak ve YeÃ¯Â¿Â½il TaÃ¯Â¿Â½Ã¯Â¿Â½ma Butonu kusursuz Ã¯Â¿Â½alÃ¯Â¿Â½Ã¯Â¿Â½acak!

        const apexX = 0; const apexY = 0; const apexZ = h / 2;
        pos[0] = apexX; pos[1] = apexY; pos[2] = apexZ;
        epos[0] = apexX; epos[1] = apexY; epos[2] = apexZ;
        
        for (let i = 0; i <= segments; i++) {
            // ?? 3. Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: YÃ¯Â¿Â½rtÃ¯Â¿Â½lma Ã¯Â¿Â½izgisini (alpha=0) tam Ã¯Â¿Â½N TARAFA (-Y ekseni) aldÃ¯Â¿Â½k.
            const alpha = (i / segments) * 2 * Math.PI; 
            
            // 3D KapalÃ¯Â¿Â½ Hal (Dimdik duruyor)
            const x3 = r * Math.sin(alpha); 
            const y3 = -r * Math.cos(alpha); // Eksi y = Tam Ã¯Â¿Â½n Taraf
            const z3 = -h / 2;
            
            // 2D AÃ¯Â¿Â½Ã¯Â¿Â½k Hal (SaÃ¯Â¿Â½ kanat saÃ¯Â¿Â½a, sol kanat sola dÃ¯Â¿Â½kÃ¯Â¿Â½lÃ¯Â¿Â½r)
            const theta = (2 * Math.PI * r) / s; 
            const sectorAngle = ((alpha - Math.PI) / Math.PI) * (theta / 2); 
            const x2 = -s * Math.sin(sectorAngle); 
            const y2 = 0; // KarÃ¯Â¿Â½Ã¯Â¿Â½dan gÃ¯Â¿Â½rÃ¯Â¿Â½nmesi iÃ¯Â¿Â½in XZ dÃ¯Â¿Â½zlemine yatÃ¯Â¿Â½rÃ¯Â¿Â½lÃ¯Â¿Â½r
            const z2 = h / 2 - s * Math.cos(sectorAngle); 
            
            const x = x3 * (1 - ratio) + x2 * ratio; 
            const y = y3 * (1 - ratio) + y2 * ratio; 
            const z = z3 * (1 - ratio) + z2 * ratio;
            
            const vIdx = (i + 1) * 3; 
            pos[vIdx] = x; pos[vIdx + 1] = y; pos[vIdx + 2] = z;
            
            const eIdx = (i + 1) * 3; 
            epos[eIdx] = x; epos[eIdx + 1] = y; epos[eIdx + 2] = z;
        }
        
        // Son siyah Ã¯Â¿Â½izgiyi tepeye kapat
        const lastIdx = (segments + 2) * 3;
        epos[lastIdx] = apexX; epos[lastIdx + 1] = apexY; epos[lastIdx + 2] = apexZ;
        
        innerGroup.userData.lateralMesh.geometry.attributes.position.needsUpdate = true;
        innerGroup.userData.lateralMesh.geometry.computeVertexNormals();
        innerGroup.userData.lateralEdges.geometry.attributes.position.needsUpdate = true;
        
        // ?? 4. Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: KapaÃ¯Â¿Â½Ã¯Â¿Â½n (tabanÃ¯Â¿Â½n) menteÃ¯Â¿Â½e gibi arkadan aÃ¯Â¿Â½aÃ¯Â¿Â½Ã¯Â¿Â½ doÃ¯Â¿Â½ru bir kapÃ¯Â¿Â½ misali aÃ¯Â¿Â½Ã¯Â¿Â½lmasÃ¯Â¿Â½
        const baseMesh = innerGroup.userData.baseMesh;
        const hingeY = r * (1 - ratio);
        const hingeZ = (-h / 2) * (1 - ratio) + (h / 2 - s) * ratio;
        baseMesh.position.set(0, hingeY, hingeZ);
        baseMesh.rotation.x = (Math.PI / 2) * ratio; // 0'dan (dÃ¯Â¿Â½z) baÃ¯Â¿Â½layarak ekrana doÃ¯Â¿Â½ru sarkÃ¯Â¿Â½p tam daire olur

        // ?? 5. Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: Koninin aÃ¯Â¿Â½Ã¯Â¿Â½lÃ¯Â¿Â½rken tam karÃ¯Â¿Â½Ã¯Â¿Â½dan (XY dÃ¯Â¿Â½zleminden) gÃ¯Â¿Â½rÃ¯Â¿Â½nmesi iÃ¯Â¿Â½in rotasyonu otomatik dÃ¯Â¿Â½zelt
        if (group.userData.innerGroup) {
            // Koninin aÃ¯Â¿Â½Ã¯Â¿Â½k hali XZ dÃ¯Â¿Â½zlemindedir (y=0). KameranÃ¯Â¿Â½n gÃ¯Â¿Â½rmesi iÃ¯Â¿Â½in onu kameranÃ¯Â¿Â½n (Y=-30, Z=20) aÃ¯Â¿Â½Ã¯Â¿Â½sÃ¯Â¿Â½na tam dikmeliyiz.
            const qClosed = new THREE.Quaternion().identity(); // KapalÃ¯Â¿Â½yken (ratio=0) kullanÃ¯Â¿Â½cÃ¯Â¿Â½nÃ¯Â¿Â½n verdiÃ¯Â¿Â½i rotasyona dokunma
            
            // XZ dÃ¯Â¿Â½zlemindeki Ã¯Â¿Â½ekli ekrana tam paralel yatÃ¯Â¿Â½rmak iÃ¯Â¿Â½in, Z ekseni ekranÃ¯Â¿Â½n 'Ã¯Â¿Â½st' noktasÃ¯Â¿Â½na (Y=20, Z=30) gelmeli.
            // Bunun iÃ¯Â¿Â½in gereken kusursuz aÃ¯Â¿Â½Ã¯Â¿Â½ Math.atan2(-20, 30)'dur. (-Math.PI / 2 yani -90 derece sadece dÃ¯Â¿Â½z kamera iÃ¯Â¿Â½indi)
            const qOpenAbsolute = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.atan2(-20, 30));
            
            // DÃ¯Â¿Â½Ã¯Â¿Â½ grubun dinamik rotasyonunu deÃ¯Â¿Â½il, varsayÃ¯Â¿Â½lan rotasyonunu kullanÃ¯Â¿Â½yoruz. 
            // Koniler baÃ¯Â¿Â½langÃ¯Â¿Â½Ã¯Â¿Â½ta X ve Z ekseninde -30 derece (-Math.PI/6) dÃ¯Â¿Â½ndÃ¯Â¿Â½rÃ¯Â¿Â½lerek ekleniyor.
            const defaultOuterQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 6, 0, -Math.PI / 6, 'XYZ'));
            const qOuterInverse = defaultOuterQ.invert();
            const qOpenTarget = qOuterInverse.multiply(qOpenAbsolute);
            
            innerGroup.quaternion.copy(qClosed).slerp(qOpenTarget, ratio);
        }
    }
};


window.Scene3D = {
    container: null, scene: null, camera: null, renderer: null, labelElement: null,
    isInit: false, activeTool: 'none', version: "3.4 - KUSURSUZ Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M",

    currentMesh: null, previewMesh: null, previewLine: null, helperGroup: null,
    raycaster: null, mouse: null, plane: null,
    rotateHandleBtn: null, resizeHandleBtn: null,
    isRotatingHandle: false, isResizingHandle: false,
    handles: { center: { x: 0, y: 0 } }, lastMousePos: { x: 0, y: 0 },
    dragPlane: null, dragOffset: null,
    isDragging: false, isClickCandidate: false, clickStartPos: { x: 0, y: 0 }, isRotatingShape: false,

    init: function () {
        if (this.isInit) return;
        if (typeof THREE === 'undefined') { setTimeout(() => { window.Scene3D.init(); }, 500); return; }
        this.isInit = true;

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        this.dragPlane = new THREE.Plane();
        this.dragOffset = new THREE.Vector3();

        this.container = document.getElementById('three-container');
        this.scene = new THREE.Scene();

        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 30; // 3D sahnede gÃ¯Â¿Â½rÃ¯Â¿Â½nen alanÃ¯Â¿Â½n yaklaÃ¯Â¿Â½Ã¯Â¿Â½k yÃ¯Â¿Â½ksekliÃ¯Â¿Â½i
        this.camera = new THREE.OrthographicCamera(-frustumSize * aspect / 2, frustumSize * aspect / 2, frustumSize / 2, -frustumSize / 2, 0.1, 1000);
        this.camera.position.set(0, -30, 20);
        this.camera.lookAt(0, 0, 0);
        this.camera.up.set(0, 0, 1);

        try {
            this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.domElement.style.pointerEvents = 'none';

            if (this.container) {
                this.container.appendChild(this.renderer.domElement);
            }
        } catch(e) {
            console.error('WebGL Hatasi', e);
            if (isTablet) alert('Cihaziniz 3D cizimleri (WebGL) desteklemiyor!');
            return;
        }
        if (this.container) {
            // ?? GÃ¯Â¿Â½VENLÃ¯Â¿Â½K 1: BaÃ¯Â¿Â½langÃ¯Â¿Â½Ã¯Â¿Â½ta tahtayÃ¯Â¿Â½ zorla gÃ¯Â¿Â½rÃ¯Â¿Â½nÃ¯Â¿Â½r yap!
            this.container.style.display = 'block';
            this.container.style.zIndex = '15';
            this.container.classList.remove('hidden');
        }

        this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(10, -10, 20);
        this.scene.add(dirLight);

        this.helperGroup = new THREE.Group();
        this.scene.add(this.helperGroup);

        const styleBtn = (btn, isRotate) => {
            btn.style.position = 'absolute'; btn.style.width = '32px'; btn.style.height = '32px';
            btn.style.borderRadius = '50%'; btn.style.backgroundColor = isRotate ? '#00ffcc' : '#ff007f';
            btn.style.color = 'white'; btn.style.fontSize = '16px';
            btn.style.display = 'none'; btn.style.justifyContent = 'center'; btn.style.alignItems = 'center';
            btn.style.cursor = 'pointer'; btn.style.zIndex = '1000';
            btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
            btn.innerHTML = isRotate ? '?' : '?';
        };

        if (this.rotateHandleBtn && this.rotateHandleBtn.parentNode) {
            this.rotateHandleBtn.parentNode.removeChild(this.rotateHandleBtn);
        }
        if (this.resizeHandleBtn && this.resizeHandleBtn.parentNode) {
            this.resizeHandleBtn.parentNode.removeChild(this.resizeHandleBtn);
        }
        document.querySelectorAll('.scene3d-rotate-btn, .scene3d-resize-btn').forEach(btn => btn.remove());

        this.rotateHandleBtn = document.createElement('div');
        this.rotateHandleBtn.className = 'scene3d-rotate-btn';
        styleBtn(this.rotateHandleBtn, true);
        document.body.appendChild(this.rotateHandleBtn);

        this.resizeHandleBtn = document.createElement('div');
        this.resizeHandleBtn.className = 'scene3d-resize-btn';
        styleBtn(this.resizeHandleBtn, false);
        document.body.appendChild(this.resizeHandleBtn);

        const startInteract = (action, e) => {
            if (e && e.cancelable) e.preventDefault();
            if (e) e.stopPropagation();
            this[action] = true;
            const px = e.touches ? e.touches[0].clientX : e.clientX;
            const py = e.touches ? e.touches[0].clientY : e.clientY;
            this.lastMousePos = { x: px, y: py };

            if (action === 'isResizingHandle' && this.currentMesh) {
                this.startScale = this.currentMesh.scale.x;
                this.startResizeDist = Math.hypot(px - this.handles.center.x, py - this.handles.center.y) || 1;
            }
        };

        ['mousedown', 'touchstart'].forEach(evt => {
            this.rotateHandleBtn.addEventListener(evt, (e) => startInteract('isRotatingHandle', e), { passive: false });
            this.resizeHandleBtn.addEventListener(evt, (e) => startInteract('isResizingHandle', e), { passive: false });
        });

        ['touchmove', 'mousemove', 'pointermove'].forEach(evt => {
            window.addEventListener(evt, (e) => {
                if (this.isRotatingHandle || this.isResizingHandle) {
                    if (e.cancelable) e.preventDefault();
                    const px = e.touches ? e.touches[0].clientX : e.clientX;
                    const py = e.touches ? e.touches[0].clientY : e.clientY;
                    this.onMove(px, py);
                }
            }, { passive: false });
        });

        ['touchend', 'mouseup', 'pointerup'].forEach(evt => {
            window.addEventListener(evt, () => { if (this.isRotatingHandle || this.isResizingHandle) this.onUp(); });
        });

        this.animate();
    },

    updateHandlePositions: function () {
        if (!this.currentMesh || currentTool !== 'move') {
            if (this.rotateHandleBtn) this.rotateHandleBtn.style.display = 'none';
            if (this.resizeHandleBtn) this.resizeHandleBtn.style.display = 'none';
            return;
        }
        const vec = this.currentMesh.position.clone();
        vec.project(this.camera);
        const canvasEl = document.getElementById('drawing-canvas');
        const rect = canvasEl ? canvasEl.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
        const w = rect.width / 2, h = rect.height / 2;
        const px = rect.left + (vec.x * w) + w, py = rect.top + (-(vec.y * h) + h);

        this.handles.center = { x: px, y: py };

        const scale = this.currentMesh.scale.x || 1;

        this.rotateHandleBtn.style.display = 'flex';
        this.rotateHandleBtn.style.left = (px + (30 * scale)) + 'px';
        this.rotateHandleBtn.style.top = (py - (60 * scale)) + 'px';

        this.resizeHandleBtn.style.display = 'flex';
        this.resizeHandleBtn.style.left = (px - (70 * scale)) + 'px';
        this.resizeHandleBtn.style.top = (py + (30 * scale)) + 'px';
    },

    animate: function () {
        requestAnimationFrame(() => window.Scene3D.animate());

        if (this.scene) {
            this.scene.children.forEach(mesh => {
                if (mesh.userData && mesh.userData.strokeData) {
                    // ?? KONÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½MÃ¯Â¿Â½: Koni ise kendi motoruyla canlandÃ¯Â¿Â½r, deÃ¯Â¿Â½ilse diÃ¯Â¿Â½erleriyle
                    let targetRatio = mesh.userData.strokeData.openRatio || 0;
                    if (mesh.userData.currentOpenRatio === undefined) mesh.userData.currentOpenRatio = targetRatio;
                    mesh.userData.currentOpenRatio += (targetRatio - mesh.userData.currentOpenRatio) * 0.3;
                    if (Math.abs(targetRatio - mesh.userData.currentOpenRatio) < 0.001) mesh.userData.currentOpenRatio = targetRatio;

                    if (mesh.userData.isCustomCone && window.CustomConeEngine) {
                        window.CustomConeEngine.update(mesh, mesh.userData.currentOpenRatio);
                    } else if (window.Foldable3D) {
                        window.Foldable3D.updateUnfold(mesh, mesh.userData.currentOpenRatio);
                    }
                    
                    if (mesh.userData.targetQuaternion) {
                        mesh.quaternion.slerp(mesh.userData.targetQuaternion, 0.40); // 0.15'den 0.40'a cikarildi (Aninda tepki)
                    }
                    if (mesh.userData.targetPosition) {
                        mesh.position.lerp(mesh.userData.targetPosition, 0.45); // 0.2'den 0.45'e cikarildi (Aninda yapisma)
                    }
                }
            });
        }

        if (this.scene && this.renderer && this.camera) this.renderer.render(this.scene, this.camera);
    },

    // ?? 3D TABLET HATASI Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½MÃ¯Â¿Â½: EkranÃ¯Â¿Â½n tamamÃ¯Â¿Â½ deÃ¯Â¿Â½il, Ã¯Â¿Â½izim kutusunun gerÃ¯Â¿Â½ek sÃ¯Â¿Â½nÃ¯Â¿Â½rlarÃ¯Â¿Â½ baz alÃ¯Â¿Â½nÃ¯Â¿Â½r!
    getNormalizedCoords: function (clientX, clientY) {
        const canvasEl = document.getElementById('drawing-canvas');
        const w = canvasEl ? canvasEl.clientWidth : window.innerWidth;
        const h = canvasEl ? canvasEl.clientHeight : window.innerHeight;
        return {
            x: (clientX / w) * 2 - 1,
            y: -(clientY / h) * 2 + 1
        };
    },

    get3DPointOnFloor: function (x, y) {
        if (!this.raycaster || !this.camera) return new THREE.Vector3(0, 0, 0);
        this.raycaster.setFromCamera(this.getNormalizedCoords(x, y), this.camera);
        const intersection = new THREE.Vector3();
        return this.raycaster.ray.intersectPlane(this.plane, intersection) ? intersection : null;
    },

    createGeometry: function (type, size) {
        const height = size * 2;
        switch (type) {
            case 'sphere': return new THREE.SphereGeometry(size, 32, 32);
            case 'prism_cube': return new THREE.BoxGeometry(size * 2, size * 2, size * 2);
            case 'prism_cylinder': return new THREE.CylinderGeometry(size, size, height, 32);
            case 'prism_3': return new THREE.CylinderGeometry(size, size, height, 3);
            case 'prism_4': return new THREE.BoxGeometry(size * 1.5, height, size * 1.5);
            case 'prism_square': return new THREE.BoxGeometry(size * 1.5, size * 3, size * 1.5);
            case 'prism_rect': return new THREE.BoxGeometry(size * 3, size * 2.2, size * 1.5);
            case 'prism_5': return new THREE.CylinderGeometry(size, size, height, 5);
            case 'prism_6': return new THREE.CylinderGeometry(size, size, height, 6);
            case 'pyramid_cone': return new THREE.ConeGeometry(size, height, 32);
            case 'pyramid_3': return new THREE.ConeGeometry(size, height, 3);
            case 'pyramid_4': return new THREE.ConeGeometry(size, height, 4);
            case 'pyramid_5': return new THREE.ConeGeometry(size, height, 5);
            case 'pyramid_6': return new THREE.ConeGeometry(size, height, 6);
            default: return new THREE.SphereGeometry(size, 32, 32);
        }
    },

    onDown: function (x, y) {
        if (!this.isInit) return false;
        if (this.container) { this.container.style.display = 'block';
            this.container.style.zIndex = '15';
            this.container.classList.remove('hidden'); }
        if (this.isRotatingHandle || this.isResizingHandle) return true;

        this.raycaster.setFromCamera(this.getNormalizedCoords(x, y), this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        let foundMesh = intersects.find(h => h.object.type === 'Mesh' && h.object !== this.helperGroup);

        // ?? EÃ¯Â¿Â½ER BU BÃ¯Â¿Â½R GRUPSA (Foldable3D) EN Ã¯Â¿Â½ST GRUBU BUL
        if (foundMesh) {
            let rootObj = foundMesh.object;
            while (rootObj.parent && rootObj.parent !== this.scene && rootObj.parent.type === 'Group') {
                rootObj = rootObj.parent;
            }
            foundMesh = { object: rootObj };
        }

        // ?? TABLET DOKUNMATÃ¯Â¿Â½K ZIRHI: Parmakla basÃ¯Â¿Â½ldÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½nda 3D IÃ¯Â¿Â½Ã¯Â¿Â½n Ã¯Â¿Â½skalasa bile 2D Kutusundan Kesin Yakala!
        if (!foundMesh && window.drawnStrokes && currentTool === 'move') {
            const canvasEl = document.getElementById('drawing-canvas');
            if (canvasEl) {
                const rect = canvasEl.getBoundingClientRect();
                // DÃ¯Â¿Â½ZELTME: YÃ¯Â¿Â½ksek DPI (Retina) cihazlarda canvasX hatalÃ¯Â¿Â½ olur, CSS koordinatlarÃ¯Â¿Â½ (cssX, cssY) kullanÃ¯Â¿Â½lmalÃ¯Â¿Â½!
                const cssX = x - rect.left;
                const cssY = y - rect.top;

                const hitStroke = window.drawnStrokes.find(s => s.type === '3d_shape' && Math.abs(cssX - (s.x + s.width / 2)) < Math.max(40, s.width / 2) && Math.abs(cssY - (s.y + s.height / 2)) < Math.max(40, s.height / 2));
                if (hitStroke) {
                    const sceneMesh = this.scene.children.find(m => m.userData && m.userData.strokeData && m.userData.strokeData.id === hitStroke.id);
                    if (sceneMesh) foundMesh = { object: sceneMesh };
                }
            }
        }

        if (foundMesh) {
            this.currentMesh = foundMesh.object;
            this.clickStartPos = { x, y };

            if (currentTool === 'move') {
                this.isRotatingShape = false;
                this.isDragging = true;
                this.dragPlane.setFromNormalAndCoplanarPoint(this.camera.getWorldDirection(new THREE.Vector3()), this.currentMesh.position);
                const intersectPoint = new THREE.Vector3();
                if (this.raycaster.ray.intersectPlane(this.dragPlane, intersectPoint)) {
                    this.dragOffset.subVectors(this.currentMesh.position, intersectPoint);
                }

                // FormÃ¯Â¿Â½l kutusunun Ã¯Â¿Â½Ã¯Â¿Â½kmasÃ¯Â¿Â½ iÃ¯Â¿Â½in Ã¯Â¿Â½ekli seÃ¯Â¿Â½ili hale getir
                if (this.currentMesh.userData && this.currentMesh.userData.strokeData) {
                    window.selectedItem = this.currentMesh.userData.strokeData;
                    if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes();
                }
            } else {
                this.isDragging = false; this.isRotatingShape = true; this.lastMousePos = { x, y };
            }
            this.updateHandlePositions();
            return true;
        }

        if (this.activeTool && this.activeTool !== 'none' && this.activeTool !== 'move') {
            this.isDrawing = true;
            this.startPoint = this.get3DPointOnFloor(x, y) || new THREE.Vector3(0, 0, 0);

            const previewGeo = this.createGeometry(this.activeTool, 0.1);
            if (this.activeTool.startsWith('prism') || this.activeTool.startsWith('pyramid')) previewGeo.rotateX(Math.PI / 2);
            this.previewMesh = new THREE.Mesh(previewGeo, new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true, transparent: true, opacity: 0.5 }));
            this.previewMesh.position.copy(this.startPoint);

            this.scene.add(this.previewMesh);
            return true;
        }

        if (currentTool === 'move') {
            this.currentMesh = null;
            window.selectedItem = null;
            this.updateHandlePositions();
        }
        return false;
    },

    onMove: function (x, y) {
        if (this.isRotatingHandle && this.currentMesh) {
            const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
            const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion);
                        if (!this.currentMesh.userData.targetQuaternion) {
                this.currentMesh.userData.targetQuaternion = this.currentMesh.quaternion.clone();
            }
            const dummy = new THREE.Object3D();
            dummy.quaternion.copy(this.currentMesh.userData.targetQuaternion);
            dummy.rotateOnWorldAxis(camRight, (y - this.lastMousePos.y) * 0.01);
            dummy.rotateOnWorldAxis(camUp, (x - this.lastMousePos.x) * 0.01);
            this.currentMesh.userData.targetQuaternion.copy(dummy.quaternion);
            
            this.lastMousePos = { x, y };
            this.updateHandlePositions();
            
            if (this.currentMesh.userData && this.currentMesh.userData.strokeData) {
                const sd = this.currentMesh.userData.strokeData;
                const euler = new THREE.Euler().setFromQuaternion(this.currentMesh.userData.targetQuaternion, 'XYZ');
                sd.rotationX = euler.x;
                sd.rotationY = euler.y;
                sd.rotationZ = euler.z;
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: sd });
            }
            return;
        }
        if (this.isResizingHandle && this.currentMesh) {
            const currentDist = Math.hypot(x - this.handles.center.x, y - this.handles.center.y);
            const dragRatio = currentDist / this.startResizeDist;
            
            if (this.currentMesh.userData && this.currentMesh.userData.strokeData) {
                const sd = this.currentMesh.userData.strokeData;
                
                // ?? ZÃ¯Â¿Â½plama KorumasÃ¯Â¿Â½: Orijinal koordinatlara (originalW vs.) ASLA dokunmadan 
                // sadece ekranlar arasÃ¯Â¿Â½ gÃ¯Â¿Â½venli bir "Ã¯Â¿Â½arpan" (meshScale) Ã¯Â¿Â½retiyor ve yolluyoruz!
                sd.meshScale = (sd.meshScale || 1) * dragRatio;
                this.startResizeDist = currentDist; // Katlanarak bÃ¯Â¿Â½yÃ¯Â¿Â½meyi engelle
                
                if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: sd });
                if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes();
            }
            return;
        }
        if (this.isDrawing && this.startPoint && this.previewMesh) {
            const currentPoint = this.get3DPointOnFloor(x, y);
            if (!currentPoint) return;
            const distance = currentPoint.distanceTo(this.startPoint);
            const scale = Math.max(0.1, distance * 3.5);
            this.previewMesh.scale.setScalar(scale);
            return;
        }
        if (this.isDragging && this.currentMesh) {
            this.raycaster.setFromCamera(this.getNormalizedCoords(x, y), this.camera);
            const intersectPoint = new THREE.Vector3();
            if (this.raycaster.ray.intersectPlane(this.dragPlane, intersectPoint)) {
                this.currentMesh.position.addVectors(intersectPoint, this.dragOffset);
                
                // BOUNDARY CLAMP: Ekran disina ucmasini (kaybolmasini) engeller
                this.currentMesh.position.x = Math.max(-30, Math.min(30, this.currentMesh.position.x));
                this.currentMesh.position.y = Math.max(-30, Math.min(30, this.currentMesh.position.y));
                this.currentMesh.position.z = Math.max(-30, Math.min(30, this.currentMesh.position.z));

                this.updateHandlePositions();
                // TaÃ¯Â¿Â½Ã¯Â¿Â½ma sÃ¯Â¿Â½rasÃ¯Â¿Â½ndaki aÃ¯Â¿Â½ senkronu zaten 2D motoru tarafÃ¯Â¿Â½ndan kusursuz yapÃ¯Â¿Â½lÃ¯Â¿Â½yor. Burada hiÃ¯Â¿Â½bir Ã¯Â¿Â½eye dokunmuyoruz!
            }
            return;
        }
        if (this.isRotatingShape && this.currentMesh && currentTool !== 'move') {
            this.currentMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), (y - this.lastMousePos.y) * 0.01);
            this.currentMesh.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), (x - this.lastMousePos.x) * 0.01);
            this.lastMousePos = { x, y };
            this.updateHandlePositions();
        }
    },

    onUp: function () {
        const wasResizing = this.isResizingHandle;
        this.isRotatingHandle = this.isResizingHandle = this.isDragging = this.isRotatingShape = false;
        const wasDrawing = this.isDrawing;
        this.isDrawing = false;

        if (wasResizing && this.currentMesh && this.currentMesh.userData && this.currentMesh.userData.strokeData) {
            if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'sekil_guncelle', stroke: this.currentMesh.userData.strokeData });
        }

        if (wasDrawing && this.previewMesh) {
            const finalScale = this.previewMesh.scale.x || 1;
            const finalRadius = 0.1 * finalScale;
            this.scene.remove(this.previewMesh); this.previewMesh.geometry.dispose(); this.previewMesh = null;

            const isSphere = this.activeTool === 'sphere';
            const mainMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffcc, shininess: 100, specular: 0x111111, transparent: !isSphere, opacity: isSphere ? 1.0 : 0.4, depthWrite: isSphere, side: THREE.DoubleSide });
            const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0 });

            let solidShape = null;
            // ?? KONÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½MÃ¯Â¿Â½: Koniyi Ã¯Â¿Â½zel motorla aÃ¯Â¿Â½ ki piramide dÃ¯Â¿Â½nÃ¯Â¿Â½Ã¯Â¿Â½mesin!
            if (this.activeTool === 'pyramid_cone' && window.CustomConeEngine) {
                solidShape = window.CustomConeEngine.create(finalRadius, finalRadius * 2, mainMaterial, edgeMaterial);
            } else if (window.Foldable3D) {
                solidShape = window.Foldable3D.createFoldableGroup(this.activeTool, finalRadius, mainMaterial, edgeMaterial);
            }
            if (!solidShape) {
                const geometry = this.createGeometry(this.activeTool, finalRadius);
                if (this.activeTool.startsWith('prism') || this.activeTool.startsWith('pyramid')) geometry.rotateX(Math.PI / 2);
                solidShape = new THREE.Mesh(geometry, mainMaterial);
                solidShape.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edgeMaterial));
            }

            // Ã¯Â¿Â½ekli 3D uzaya tam senin bÃ¯Â¿Â½raktÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½n yere yerleÃ¯Â¿Â½tir
            solidShape.position.copy(this.startPoint || new THREE.Vector3(0, 0, 0));

            // ?? Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M TAMAMLANDIÃ¯Â¿Â½INDA Ã¯Â¿Â½ZOMETRÃ¯Â¿Â½K DURUÃ¯Â¿Â½: Ã¯Â¿Â½n, Ã¯Â¿Â½st ve SaÃ¯Â¿Â½ yÃ¯Â¿Â½zlerin gÃ¯Â¿Â½rÃ¯Â¿Â½nmesi iÃ¯Â¿Â½in
            if (this.activeTool === 'pyramid_cone' || this.activeTool.startsWith('prism_') || this.activeTool.startsWith('pyramid_')) {
                // -Math.PI/6 (-30 derece) dÃ¯Â¿Â½ndÃ¯Â¿Â½rÃ¯Â¿Â½ldÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½nde Ã¯Â¿Â½n yÃ¯Â¿Â½z daha geniÃ¯Â¿Â½, SaÃ¯Â¿Â½ yÃ¯Â¿Â½z dar gÃ¯Â¿Â½rÃ¯Â¿Â½nÃ¯Â¿Â½r (Klasik 3D gÃ¯Â¿Â½rÃ¯Â¿Â½nÃ¯Â¿Â½m)
                solidShape.rotation.z = -Math.PI / 6;
                // Koni iÃ¯Â¿Â½in kameraya tam dik bakmamasÃ¯Â¿Â½ adÃ¯Â¿Â½na X ekseninde de eÃ¯Â¿Â½im veriyoruz ki taban elips gÃ¯Â¿Â½rÃ¯Â¿Â½nsÃ¯Â¿Â½n
                solidShape.rotation.x = -Math.PI / 6;
            }

            this.scene.add(solidShape);
            this.currentMesh = solidShape;
            this.updateHandlePositions();

            // ?? SÃ¯Â¿Â½HÃ¯Â¿Â½RLÃ¯Â¿Â½ DOKUNUÃ¯Â¿Â½: 3D Ã¯Â¿Â½eklin 2D Ã¯Â¿Â½izim NoktasÃ¯Â¿Â½nÃ¯Â¿Â½ Tam Ã¯Â¿Â½sabet Hesapla! (Ortaya kaÃ¯Â¿Â½maz)
            const vec = solidShape.position.clone();
            vec.project(this.camera);
            const canvasEl = document.getElementById('drawing-canvas');
            const w = canvasEl ? (canvasEl.width / 2) : (window.innerWidth / 2);
            const h = canvasEl ? (canvasEl.height / 2) : (window.innerHeight / 2);
            const screenX = (vec.x * w) + w;
            const screenY = -(vec.y * h) + h;

            // ?? 1. KUSURSUZ BOYUT: GerÃ¯Â¿Â½ek HD Piksel karÃ¯Â¿Â½Ã¯Â¿Â½lÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½nÃ¯Â¿Â½ hesapla (KÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½lmeyi ve kaymayÃ¯Â¿Â½ Ã¯Â¿Â½nler)
            const myCh = canvasEl ? canvasEl.height : window.innerHeight;
            const pixelPerUnit = myCh / 30; // 3D uzaydaki 1 birimin piksel karÃ¯Â¿Â½Ã¯Â¿Â½lÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½
            const gercekPx = (finalRadius * 2) * pixelPerUnit;

            const networkData = {
                type: '3d_shape', id: Date.now().toString() + Math.random(), shapeType: this.activeTool,
                x: screenX - (gercekPx / 2),
                y: screenY - (gercekPx / 2),
                width: gercekPx, height: gercekPx,
                // SÃ¯Â¿Â½rgÃ¯Â¿Â½ Ã¯Â¿Â½ekilse bile asla zÃ¯Â¿Â½plamasÃ¯Â¿Â½n ve PC'ye mÃ¯Â¿Â½kemmel gitsin diye ZIRH:
                originalX: screenX - (gercekPx / 2),
                originalY: screenY - (gercekPx / 2),
                originalW: gercekPx,
                originalH: gercekPx,
                rotationX: solidShape.rotation.x, rotationY: solidShape.rotation.y, rotationZ: solidShape.rotation.z,
                pos3D: { x: solidShape.position.x, y: solidShape.position.y, z: solidShape.position.z },
                rotation: 0, yaw: 0, pitch: 1, openRatio: 0, isPreview: false, color: '#00ffcc'
            };
            Object.assign(solidShape.userData, { type: this.activeTool, baseSize: finalRadius, height: finalRadius * 2, strokeData: networkData });

            if (window.drawnStrokes) window.drawnStrokes.push(networkData);
            if (typeof window.sendNetworkData === 'function') window.sendNetworkData({ type: 'yeni_cizim', stroke: networkData });
        }
    },

    setTool: function (toolName) {
        if (!this.isInit) this.init();
        this.activeTool = toolName;
        // ?? GÃ¯Â¿Â½VENLÃ¯Â¿Â½K 4: AraÃ¯Â¿Â½ seÃ¯Â¿Â½ildiÃ¯Â¿Â½inde de konteynerÃ¯Â¿Â½ zorla gÃ¯Â¿Â½ster! (Senin notun)
        if (this.container) {
            this.container.style.display = 'block';
            this.container.style.zIndex = '15';
            this.container.classList.remove('hidden');
        }
    },

    deleteObjectAt: function (x, y) {
        if (!this.isInit || !this.scene) return false;
        this.raycaster.setFromCamera(this.getNormalizedCoords(x, y), this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        const hit = intersects.find(h => {
            const obj = h.object;
            let isHelper = false; let parent = obj.parent;
            while (parent) { if (parent === this.helperGroup) { isHelper = true; break; } parent = parent.parent; }
            return !isHelper && (obj.type === 'Mesh' || obj.type === 'Line' || obj.type === 'LineSegments');
        });
        if (hit) {
            let targetObj = hit.object;
            while (targetObj.parent && targetObj.parent !== this.scene) { targetObj = targetObj.parent; }
            if (this.scene.children.includes(targetObj)) {
                if (targetObj.userData && targetObj.userData.strokeData) {
                    if (window.drawnStrokes) {
                        window.drawnStrokes = window.drawnStrokes.filter(s => s.id !== targetObj.userData.strokeData.id);
                    }
                    if (typeof window.sendNetworkData === 'function') {
                        window.sendNetworkData({ type: 'cizim_sil', strokeId: targetObj.userData.strokeData.id });
                    }
                }
                // SENÃ¯Â¿Â½N EKLENTÃ¯Â¿Â½N: Etiketi silme iÃ¯Â¿Â½lemi KORUNDU
                if (targetObj.userData.labelElement) targetObj.userData.labelElement.remove();
                this.scene.remove(targetObj);
                if (this.currentMesh === targetObj) this.currentMesh = null;
                this.updateHandlePositions();
                return true;
            }
        }
        return false;
    },

    handleEraser: function (pos) {
        if (this.deleteObjectAt(pos.x, pos.y)) {
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
    },

    addShapeToScene: function (type, x, y) {
        if (!this.isInit) this.init();
        this.createSolidMesh(type, new THREE.Vector3(0, 0, 0), 2, true);
        console.log(type + " sahneye baÃ¯Â¿Â½arÃ¯Â¿Â½yla Ã¯Â¿Â½aÃ¯Â¿Â½rÃ¯Â¿Â½ldÃ¯Â¿Â½!");
    },

    // ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: PC'nin 3D Ã¯Â¿Â½ekilleri Tabletinden AlÃ¯Â¿Â½p Ã¯Â¿Â½izmesi Ã¯Â¿Â½Ã¯Â¿Â½in AÃ¯Â¿Â½ AlÃ¯Â¿Â½cÃ¯Â¿Â½sÃ¯Â¿Â½
    addShapeFromNetwork: function (strokeData) {
        if (!this.isInit) this.init();
        const isSphere = strokeData.shapeType === 'sphere';
        const mainMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffcc, shininess: 100, specular: 0x111111, transparent: !isSphere, opacity: isSphere ? 1.0 : 0.4, depthWrite: isSphere, side: THREE.DoubleSide });
        const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0 });

        let solidShape = null;
        // ?? KONÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½MÃ¯Â¿Â½: AÃ¯Â¿Â½dan gelen koniyi de Ã¯Â¿Â½zel motorla Ã¯Â¿Â½iz!
        if (strokeData.shapeType === 'pyramid_cone' && window.CustomConeEngine) {
            solidShape = window.CustomConeEngine.create(strokeData.width / 30, (strokeData.width / 30) * 2, mainMaterial, edgeMaterial);
        } else if (window.Foldable3D) {
            solidShape = window.Foldable3D.createFoldableGroup(strokeData.shapeType, strokeData.width / 30, mainMaterial, edgeMaterial);
        }
        if (!solidShape) {
            const geometry = this.createGeometry(strokeData.shapeType, strokeData.width / 30);
            if (strokeData.shapeType.startsWith('prism') || strokeData.shapeType.startsWith('pyramid')) geometry.rotateX(Math.PI / 2);
            solidShape = new THREE.Mesh(geometry, mainMaterial);
            solidShape.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edgeMaterial));
        }

        // ?? Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M 1: 3D Ã¯Â¿Â½eklin yaratÃ¯Â¿Â½lÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½nda PC ekranÃ¯Â¿Â½na mÃ¯Â¿Â½kemmel hizalanmasÃ¯Â¿Â½
        const canvasElm = document.getElementById('drawing-canvas');
        const myCw = canvasElm ? canvasElm.width : window.innerWidth;
        const myCh = canvasElm ? canvasElm.height : window.innerHeight;
        
        const cx = strokeData.x + (strokeData.width / 2);
        const cy = strokeData.y + (strokeData.height / 2);
        
        const ndcX = (cx / myCw) * 2 - 1;
        const ndcY = -(cy / myCh) * 2 + 1;
        
        const vec = new THREE.Vector3(ndcX, ndcY, 0);
        vec.unproject(this.camera);
        solidShape.position.x = vec.x;
        solidShape.position.y = vec.y;
        solidShape.position.z = (strokeData.pos3D && strokeData.pos3D.z !== undefined) ? strokeData.pos3D.z : 0;

        // ?? NÃ¯Â¿Â½HAÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M 1: Ã¯Â¿Â½lk yaratÃ¯Â¿Â½lÃ¯Â¿Â½Ã¯Â¿Â½ta Ã¯Â¿Â½lÃ¯Â¿Â½eÃ¯Â¿Â½i 1'de sabit bÃ¯Â¿Â½rakÃ¯Â¿Â½yoruz. 
        // GerÃ¯Â¿Â½ek bÃ¯Â¿Â½yÃ¯Â¿Â½klÃ¯Â¿Â½k redrawAllStrokes iÃ¯Â¿Â½inde hesaplanacak.
        solidShape.scale.setScalar(1);
        solidShape.userData.baseTabletWidth = strokeData.width;

        if (strokeData.rotationX !== undefined) solidShape.rotation.x = strokeData.rotationX;
        if (strokeData.rotationY !== undefined) solidShape.rotation.y = strokeData.rotationY;
        Object.assign(solidShape.userData, { type: strokeData.shapeType, baseSize: strokeData.width / 30, height: (strokeData.width / 30) * 2, strokeData: strokeData });
        this.scene.add(solidShape);
        if (typeof this.updateHandlePositions === 'function') this.updateHandlePositions();
    }
}; // --- GERÃ¯Â¿Â½EK 3D UZAY MOTORU (Scene3D) BURADA BÃ¯Â¿Â½TÃ¯Â¿Â½YOR ---


// ==========================================
// 4. ARAYÃ¯Â¿Â½Z VE MENÃ¯Â¿Â½ MOTORU (Ã¯Â¿Â½zellik KaybÃ¯Â¿Â½ Yok)
// ==========================================
window.addEventListener('load', () => {
    const polyBtn = document.getElementById('btn-cokgenler');
    if (polyBtn && !document.getElementById('btn-3d-menu')) {
        const btn3D = document.createElement('button'); btn3D.id = 'btn-3d-menu'; btn3D.className = 'tool-button'; btn3D.innerHTML = '3D Cisimler';
        polyBtn.parentNode.insertBefore(btn3D, polyBtn.nextSibling);

        const menu3D = document.createElement('div'); menu3D.id = 'options-3d-main'; menu3D.className = 'tool-options hidden';
        menu3D.style.cssText = `position: absolute; left: 100%; margin-left: 10px; z-index: 20; background-color: rgba(30, 30, 46, 0.75); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.4); padding: 15px; border-radius: 15px; display: flex; flex-direction: column; gap: 8px; width: 180px;`;
        menu3D.innerHTML = `<button class="tool-button-sub" data-3d="3d_kure">Küre</button><button class="tool-button-sub has-submenu" id="btn-prizmalar">Prizmalar ▶</button><button class="tool-button-sub has-submenu" id="btn-piramitler">Piramitler ▶</button>`;
        btn3D.parentNode.insertBefore(menu3D, btn3D.nextSibling);


        const menuPrizmalar = document.createElement('div'); menuPrizmalar.id = 'options-prizmalar'; menuPrizmalar.className = 'tool-options hidden';
        menuPrizmalar.style.cssText = `position: absolute; left: 100%; margin-left: 10px; top: 0; z-index: 21; background-color: rgba(30, 30, 46, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.4); padding: 15px; border-radius: 15px; display: flex; flex-direction: column; gap: 8px; width: 180px;`;
        menuPrizmalar.innerHTML = `<button class="tool-button-sub" data-3d="3d_kup">Küp</button><button class="tool-button-sub" data-3d="3d_kare_prizma">Kare Prizma</button><button class="tool-button-sub" data-3d="3d_dikdortgen_prizma">Dikdörtgen Prizma</button><button class="tool-button-sub" data-3d="3d_ucgen_prizma">Üçgen Prizma</button><button class="tool-button-sub" data-3d="3d_besgen_prizma">Beşgen Prizma</button><button class="tool-button-sub" data-3d="3d_altigen_prizma">Altıgen Prizma</button><button class="tool-button-sub" data-3d="3d_silindir">Silindir</button>`;
        menu3D.appendChild(menuPrizmalar);

        const menuPiramitler = document.createElement('div'); menuPiramitler.id = 'options-piramitler'; menuPiramitler.className = 'tool-options hidden';
        menuPiramitler.style.cssText = `position: absolute; left: 100%; margin-left: 10px; top: 40px; z-index: 21; background-color: rgba(30, 30, 46, 0.85); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.4); padding: 15px; border-radius: 15px; display: flex; flex-direction: column; gap: 8px; width: 180px;`;
        menuPiramitler.innerHTML = `<button class="tool-button-sub" data-3d="3d_koni">Koni</button><button class="tool-button-sub" data-3d="3d_ucgen_piramit">Üçgen Piramit</button><button class="tool-button-sub" data-3d="3d_kare_piramit">Kare Piramit</button><button class="tool-button-sub" data-3d="3d_besgen_piramit">Beşgen Piramit</button><button class="tool-button-sub" data-3d="3d_altigen_piramit">Altıgen Piramit</button>`;
        menu3D.appendChild(menuPiramitler);
        update3DLabels();

        btn3D.addEventListener('click', (e) => {
            e.stopPropagation(); document.querySelectorAll('.tool-options').forEach(m => { if (m !== menu3D && m !== menuPrizmalar && m !== menuPiramitler) { m.classList.add('hidden'); m.style.display = 'none'; } });
            if (menu3D.classList.contains('hidden')) {
                menu3D.classList.remove('hidden'); menu3D.style.display = 'flex'; menuPrizmalar.classList.add('hidden'); menuPrizmalar.style.display = 'none'; menuPiramitler.classList.add('hidden'); menuPiramitler.style.display = 'none'; menu3D.style.top = (btn3D.getBoundingClientRect().top - btn3D.parentElement.getBoundingClientRect().top) + 'px'; btn3D.classList.add('active');
            } else { menu3D.classList.add('hidden'); menu3D.style.display = 'none'; btn3D.classList.remove('active'); }
        });

        document.getElementById('btn-prizmalar').addEventListener('mouseenter', () => { menuPrizmalar.classList.remove('hidden'); menuPrizmalar.style.display = 'flex'; menuPiramitler.classList.add('hidden'); menuPiramitler.style.display = 'none'; });
        document.getElementById('btn-piramitler').addEventListener('mouseenter', () => { menuPiramitler.classList.remove('hidden'); menuPiramitler.style.display = 'flex'; menuPrizmalar.classList.add('hidden'); menuPrizmalar.style.display = 'none'; });

        document.querySelectorAll('#options-3d-main button[data-3d]').forEach(b => {
            b.addEventListener('click', (e) => {
                e.stopPropagation();
                const data3d = b.getAttribute('data-3d');

                if (typeof setActiveTool === 'function') setActiveTool('none');

                window.active3DShapeTool = 'draw_' + data3d;
                const btn3D = document.getElementById('btn-3d-menu');
                if (btn3D) btn3D.classList.add('active');
                const menu3D = document.getElementById('options-3d-main');
                if (menu3D) { menu3D.classList.add('hidden'); menu3D.style.display = 'none'; }

                // 3D Motorunu UyandÃ¯Â¿Â½r ve AracÃ¯Â¿Â½ Ver
                if (window.Scene3D) {
                    if (!window.Scene3D.isInit) window.Scene3D.init();
                    if (window.Scene3D.container) {
                        window.Scene3D.container.style.display = 'block';
                        window.Scene3D.container.style.zIndex = '15';
                    }
                    let toolName = 'sphere';
                    if (data3d.includes('kure')) toolName = 'sphere';
                    else if (data3d.includes('kup')) toolName = 'prism_cube';
                    else if (data3d.includes('silindir')) toolName = 'prism_cylinder';
                    else if (data3d.includes('koni')) toolName = 'pyramid_cone';
                    else if (data3d.includes('kare_prizma')) toolName = 'prism_square';
                    else if (data3d.includes('dikdortgen_prizma')) toolName = 'prism_rect';
                    else if (data3d.includes('ucgen_prizma')) toolName = 'prism_3';
                    else if (data3d.includes('besgen_prizma')) toolName = 'prism_5';
                    else if (data3d.includes('altigen_prizma')) toolName = 'prism_6';
                    else if (data3d.includes('ucgen_piramit')) toolName = 'pyramid_3';
                    else if (data3d.includes('kare_piramit')) toolName = 'pyramid_4';
                    else if (data3d.includes('besgen_piramit')) toolName = 'pyramid_5';
                    else if (data3d.includes('altigen_piramit')) toolName = 'pyramid_6';
                    else toolName = 'prism_rect';

                    currentTool = 'draw_3d_' + toolName;
                    window.Scene3D.setTool(toolName);
                }
            });
        });
    }

    const uiMotor = () => {
        const slider = document.getElementById('slider-container');
        const info = document.getElementById('info-tooltip');

        let activeShape = null;
        // Ã¯Â¿Â½ekil "TaÃ¯Â¿Â½Ã¯Â¿Â½" modunda seÃ¯Â¿Â½iliyken algÃ¯Â¿Â½la
        if (window.currentTool === 'move' && window.selectedItem && window.selectedItem.type === '3d_shape') {
            activeShape = window.selectedItem;
        } else if (!window.currentTool || window.currentTool === 'none' || window.currentTool.startsWith('draw_3d_')) {
            // "none" durumunda veya 3D Ã¯Â¿Â½izim aracÃ¯Â¿Â½ndayken son Ã¯Â¿Â½izilen 3D Ã¯Â¿Â½ekli otomatik sÃ¯Â¿Â½rgÃ¯Â¿Â½ye baÃ¯Â¿Â½la
            if (window.drawnStrokes) {
                for (let i = window.drawnStrokes.length - 1; i >= 0; i--) {
                    if (window.drawnStrokes[i].type === '3d_shape') {
                        activeShape = window.drawnStrokes[i];
                        break;
                    }
                }
            }
        }

        if (activeShape) {
            window.active3DSliderStroke = activeShape;
            if (slider) {
                if (activeShape.shapeType === 'sphere') slider.style.display = 'none';
                else slider.style.display = 'flex';
            }
            if (info) {
                let isSelectedMove = (currentTool === 'move' && window.selectedItem === activeShape);
                if (isSelectedMove) {
                    info.style.display = 'block';
                } else {
                    info.style.display = 'none';
                }

                // ?? PÃ¯Â¿Â½=3 ALINARAK ALAN/HACÃ¯Â¿Â½M HESAPLAYAN Ã¯Â¿Â½ZEL FORMÃ¯Â¿Â½L MOTORU
                let formulMetni = "";
                let currentScale = activeShape.meshScale || 1;
                const r = ((activeShape.width * currentScale) / 30).toFixed(1);
                const h = (r * 2).toFixed(1);

                let r_val = parseFloat(r);
                let h_val = parseFloat(h);

                // FormÃ¯Â¿Â½ller HTML destekli renkli ve kalÃ¯Â¿Â½n yazÃ¯Â¿Â½larla Ã¯Â¿Â½ekillendiriliyor
                if (activeShape.shapeType === 'sphere') {
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">KÃ¯Â¿Â½re</span><br>r = ${r} cm<br><span style="color:#ff00ff">Hacim = (4/3)Ã¯Â¿Â½?Ã¯Â¿Â½rÃ¯Â¿Â½</span><br>= (4/3)Ã¯Â¿Â½3Ã¯Â¿Â½(${r})Ã¯Â¿Â½ = <b>${(4 * r_val * r_val * r_val).toFixed(1)} cmÃ¯Â¿Â½</b><br><span style="color:#ff00ff">Alan = 4Ã¯Â¿Â½?Ã¯Â¿Â½rÃ¯Â¿Â½</span><br>= 4Ã¯Â¿Â½3Ã¯Â¿Â½(${r})Ã¯Â¿Â½ = <b>${(12 * r_val * r_val).toFixed(1)} cmÃ¯Â¿Â½</b>`;
                } else if (activeShape.shapeType === 'prism_cube') {
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">KÃ¯Â¿Â½p</span><br>a = ${r} cm<br><span style="color:#ff00ff">Hacim = aÃ¯Â¿Â½</span><br>= (${r})Ã¯Â¿Â½ = <b>${(r_val * r_val * r_val).toFixed(1)} cmÃ¯Â¿Â½</b><br><span style="color:#ff00ff">Alan = 6Ã¯Â¿Â½aÃ¯Â¿Â½</span><br>= 6Ã¯Â¿Â½(${r})Ã¯Â¿Â½ = <b>${(6 * r_val * r_val).toFixed(1)} cmÃ¯Â¿Â½</b>`;
                } else if (activeShape.shapeType === 'prism_cylinder') {
                    let tabanAlani = 3 * r_val * r_val;
                    let yanalAlan = 2 * 3 * r_val * h_val;
                    let toplamAlan = 2 * tabanAlani + yanalAlan;
                    let hacim = tabanAlani * h_val;
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">Silindir</span><br>r = ${r} cm, h = ${h} cm<br><span style="color:#ff00ff">Taban AlanÃ¯Â¿Â½ = ?Ã¯Â¿Â½rÃ¯Â¿Â½</span><br>= 3Ã¯Â¿Â½(${r})Ã¯Â¿Â½ = <b>${tabanAlani.toFixed(1)} cmÃ¯Â¿Â½</b><br><span style="color:#ff00ff">Yanal Alan = 2Ã¯Â¿Â½?Ã¯Â¿Â½rÃ¯Â¿Â½h</span><br>= 2Ã¯Â¿Â½3Ã¯Â¿Â½${r}Ã¯Â¿Â½${h} = <b>${yanalAlan.toFixed(1)} cmÃ¯Â¿Â½</b><br><span style="color:#ff00ff">Toplam Alan = 2Ã¯Â¿Â½(Taban AlanÃ¯Â¿Â½) + Yanal Alan</span><br>= 2Ã¯Â¿Â½${tabanAlani.toFixed(1)} + ${yanalAlan.toFixed(1)} = <b>${toplamAlan.toFixed(1)} cmÃ¯Â¿Â½</b><br><span style="color:#ff00ff">Hacim = ?Ã¯Â¿Â½rÃ¯Â¿Â½Ã¯Â¿Â½h</span><br>= 3Ã¯Â¿Â½(${r})Ã¯Â¿Â½Ã¯Â¿Â½${h} = <b>${hacim.toFixed(1)} cmÃ¯Â¿Â½</b>`;
                } else if (activeShape.shapeType === 'pyramid_cone') {
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">Koni</span><br>r = ${r} cm, h = ${h} cm<br><span style="color:#ff00ff">Hacim = (?Ã¯Â¿Â½rÃ¯Â¿Â½Ã¯Â¿Â½h)/3</span><br>= (3Ã¯Â¿Â½(${r})Ã¯Â¿Â½Ã¯Â¿Â½${h})/3 = <b>${(r_val * r_val * h_val).toFixed(1)} cmÃ¯Â¿Â½</b>`;
                } else if (activeShape.shapeType === 'prism_rect') {
                    let a = (r_val * 1.5).toFixed(1);
                    let b = r;
                    let taban = (a * b).toFixed(1);
                    let yanal = (2 * (parseFloat(a) + parseFloat(b)) * h_val).toFixed(1);
                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">DikdÃ¯Â¿Â½rtgenler PrizmasÃ¯Â¿Â½</span><br>a = ${a} cm, b = ${b} cm, h = ${h} cm<br><span style="color:#ff00ff">Hacim = aÃ¯Â¿Â½bÃ¯Â¿Â½h</span><br>= ${a}Ã¯Â¿Â½${b}Ã¯Â¿Â½${h} = <b>${(taban * h_val).toFixed(1)} cmÃ¯Â¿Â½</b><br><span style="color:#ff00ff">Alan = 2Ã¯Â¿Â½(aÃ¯Â¿Â½b) + Yanal Alan</span><br>= 2Ã¯Â¿Â½${taban} + ${yanal} = <b>${(2 * taban + parseFloat(yanal)).toFixed(1)} cmÃ¯Â¿Â½</b>`;
                } else if (activeShape.shapeType.startsWith('prism_') || activeShape.shapeType.startsWith('pyramid_')) {
                    let isPrism = activeShape.shapeType.startsWith('prism_');
                    let sides = parseInt(activeShape.shapeType.split('_')[1]);

                    let a_val = (2 * r_val * Math.sin(Math.PI / sides)).toFixed(1); // Kenar uzunluÃ¯Â¿Â½u
                    let apothem = (r_val * Math.cos(Math.PI / sides)).toFixed(1); // Merkeze uzaklÃ¯Â¿Â½k
                    let tabanAlani = (sides * a_val * apothem / 2).toFixed(1);
                    let cevre = (sides * a_val).toFixed(1);

                    let sekilAdi = sides === 3 ? "Ã¯Â¿Â½Ã¯Â¿Â½gen" : sides === 5 ? "BeÃ¯Â¿Â½gen" : sides === 6 ? "AltÃ¯Â¿Â½gen" : sides + "gen";
                    let anaBaslik = isPrism ? `${sekilAdi} Prizma` : `${sekilAdi} Piramit`;

                    let sonucHacim = isPrism ? (tabanAlani * h_val).toFixed(1) : (tabanAlani * h_val / 3).toFixed(1);
                    let hacimFormulStr = isPrism ? "Taban AlanÃ¯Â¿Â½ Ã¯Â¿Â½ h" : "(Taban AlanÃ¯Â¿Â½ Ã¯Â¿Â½ h) / 3";
                    let hacimDegerStr = isPrism ? `${tabanAlani} Ã¯Â¿Â½ ${h}` : `(${tabanAlani} Ã¯Â¿Â½ ${h}) / 3`;

                    formulMetni = `<span style="color:#00ffcc; font-size:16px;">${anaBaslik}</span><br>Taban AyrÃ¯Â¿Â½tÃ¯Â¿Â½ (a) ? ${a_val} cm, YÃ¯Â¿Â½kseklik (h) ? ${h} cm<br><span style="color:#ff00ff">Taban AlanÃ¯Â¿Â½ ? ${tabanAlani} cmÃ¯Â¿Â½</span><br><span style="color:#ff00ff">Hacim = ${hacimFormulStr}</span><br>= ${hacimDegerStr} = <b>${sonucHacim} cmÃ¯Â¿Â½</b>`;

                    if (isPrism) {
                        let yanalAlan = (cevre * h_val).toFixed(1);
                        formulMetni += `<br><span style="color:#ff00ff">Yanal Alan = Ã¯Â¿Â½evre Ã¯Â¿Â½ h</span><br>= ${cevre} Ã¯Â¿Â½ ${h} = <b>${yanalAlan} cmÃ¯Â¿Â½</b>`;
                    }
                }

                info.innerHTML = formulMetni;

                // Ã¯Â¿Â½eklin saÃ¯Â¿Â½Ã¯Â¿Â½nda pozisyonlama
                const marginX = 20;
                let posX = activeShape.x + activeShape.width + marginX;
                let posY = activeShape.y;

                // EkranÃ¯Â¿Â½n saÃ¯Â¿Â½Ã¯Â¿Â½na taÃ¯Â¿Â½Ã¯Â¿Â½yorsa sola al
                if (posX + 250 > window.innerWidth) {
                    posX = activeShape.x - 250 - marginX;
                }

                info.style.left = posX + "px";
                info.style.top = posY + "px";
                info.style.bottom = "auto";
                info.style.transform = "none";
                // Panel tasarÃ¯Â¿Â½mÃ¯Â¿Â½ artÃ¯Â¿Â½k tamamen style.css dosyasÃ¯Â¿Â½ndaki #info-tooltip id'si ile yÃ¯Â¿Â½netiliyor.
            }
            const sInput = document.getElementById('shape-slider');
            if (sInput && document.activeElement !== sInput) sInput.value = (activeShape.openRatio || 0) * 100;
        } else {
            if (slider) slider.style.display = 'none';
            if (info) info.style.display = 'none';
            window.active3DSliderStroke = null;
        }

        if (activeShape !== window._lastActive3DShape) {
            window._lastActive3DShape = activeShape;
            if (typeof redrawAllStrokes === 'function') redrawAllStrokes();
        }
        requestAnimationFrame(uiMotor);
    };

    // YUKARIDAKÃ¯Â¿Â½ EKSÃ¯Â¿Â½K OLAN KAPANIÃ¯Â¿Â½ PARANTEZLERÃ¯Â¿Â½ BURADA!
    requestAnimationFrame(uiMotor);
});

// AÃ¯Â¿Â½ILIÃ¯Â¿Â½TA Ã¯Â¿Â½Ã¯Â¿Â½ZGÃ¯Â¿Â½ MENÃ¯Â¿Â½SÃ¯Â¿Â½NÃ¯Â¿Â½ ZORLA KAPAT

// AÃ¯Â¿Â½ILIÃ¯Â¿Â½TA Ã¯Â¿Â½Ã¯Â¿Â½ZGÃ¯Â¿Â½ MENÃ¯Â¿Â½SÃ¯Â¿Â½NÃ¯Â¿Â½ ZORLA KAPAT
window.addEventListener('load', () => {
    const lineOptions = document.getElementById('line-options') || document.querySelector('.line-options');
    if (lineOptions) {
        lineOptions.classList.add('hidden');
        lineOptions.style.display = 'none';
    }
});

// =========================================================
// FÃ¯Â¿Â½ZÃ¯Â¿Â½KSEL ARAÃ¯Â¿Â½LAR Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½N RADAR VE Ã¯Â¿Â½NÃ¯Â¿Â½ZLEME MOTORU
// =========================================================
let sonAracDurumlari = {};

window.araclariAgaGonder = function () {
    if (typeof isConnected === 'undefined' || !isConnected) return;

    const gelismisAraclar = [
        { id: 'ruler', obj: window.RulerTool, selector: '.ruler-container' },
        { id: 'gonye', obj: window.GonyeTool, selector: '.gonye-container' },
        { id: 'aciolcer', obj: window.AciolcerTool, selector: '.aciolcer-container' },
        { id: 'pergel', obj: window.PergelTool, selector: '#compass-container' }
    ];

    gelismisAraclar.forEach(arac => {
        if (arac.obj && arac.obj.state) {
            try {
                const el = document.querySelector(arac.selector);
                let isVisible = 'none';
                let elW = '', elH = '';

                if (el) {
                    isVisible = (el.style.display !== 'none' && !el.classList.contains('hidden')) ? 'block' : 'none';
                    elW = el.style.width;
                    elH = el.style.height;
                }

                // AraÃ¯Â¿Â½larÃ¯Â¿Â½n durumunu, dÃ¯Â¿Â½nÃ¯Â¿Â½Ã¯Â¿Â½ aÃ¯Â¿Â½Ã¯Â¿Â½sÃ¯Â¿Â½nÃ¯Â¿Â½ ve boyutunu tek metinde birleÃ¯Â¿Â½tirip deÃ¯Â¿Â½iÃ¯Â¿Â½iklik var mÃ¯Â¿Â½ bakÃ¯Â¿Â½yoruz
                const durum = isVisible + JSON.stringify(arac.obj.state) + elW + elH;

                if (sonAracDurumlari[arac.id] !== durum) {
                    sonAracDurumlari[arac.id] = durum;

                    // EÃ¯Â¿Â½er veri henÃ¯Â¿Â½z aÃ¯Â¿Â½dan geldiyse (son 500ms), geri yansÃ¯Â¿Â½tÃ¯Â¿Â½p yankÃ¯Â¿Â½ yapmasÃ¯Â¿Â½nÃ¯Â¿Â½ engelle!
                    if (arac.obj.lastNetworkReceiveTime && (Date.now() - arac.obj.lastNetworkReceiveTime) < 500) {
                        return;
                    }

                    // DeÃ¯Â¿Â½iÃ¯Â¿Â½iklik varsa PC'ye anÃ¯Â¿Â½nda gÃ¯Â¿Â½nder
                    if (typeof window.sendNetworkData === 'function') {
                        window.sendNetworkData({
                            type: 'arac_state_senkron',
                            arac: arac.id,
                            display: isVisible,
                            state: arac.obj.state,
                            width: elW,
                            height: elH
                        });
                    }
                }
            } catch (err) { }
        }
    });
};

// RadarÃ¯Â¿Â½ saniyede 10 kez Ã¯Â¿Â½alÃ¯Â¿Â½Ã¯Â¿Â½tÃ¯Â¿Â½r (GÃ¯Â¿Â½rÃ¯Â¿Â½nÃ¯Â¿Â½m senkronizasyonu iÃ¯Â¿Â½in)
setInterval(window.araclariAgaGonder, 100);

// DIÃ¯Â¿Â½ DOSYALAR (cetvel.js, pergel.js) Ã¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½N CANLI Ã¯Â¿Â½NÃ¯Â¿Â½ZLEME YAYINCISI
window.broadcastPreview = function (toolType, stateData) {
    if (typeof window.sendNetworkData === 'function' && window.isConnected) {
        window.sendNetworkData({ type: 'aktif_onizleme', arac: toolType, payload: stateData });
    }
};

// ?? KESÃ¯Â¿Â½N Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M: 3D Ã¯Â¿Â½EKÃ¯Â¿Â½LLERÃ¯Â¿Â½ Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½MÃ¯Â¿Â½N ALTINA ALIRKEN BUTONLARI KORUMA ZIRHI
const canvasKatmanZirhi = document.createElement('style');
canvasKatmanZirhi.innerHTML = `
    /* ?? Arka plan kanvasÃ¯Â¿Â½nÃ¯Â¿Â½ en alta al (Sayfa PDF'leri araÃ¯Â¿Â½larÃ¯Â¿Â½n Ã¯Â¿Â½stÃ¯Â¿Â½nÃ¯Â¿Â½ Ã¯Â¿Â½rtemez) */
    #bg-canvas { position: absolute !important; z-index: 5 !important; top: 0; left: 0; pointer-events: none; }

    /* Ã¯Â¿Â½izim tahtasÃ¯Â¿Â½nÃ¯Â¿Â½ 3D cisimlerin Ã¯Â¿Â½stÃ¯Â¿Â½ne Ã¯Â¿Â½Ã¯Â¿Â½karÃ¯Â¿Â½yoruz */
    #drawing-canvas { position: relative !important; z-index: 50 !important; background-color: transparent !important; }
    
    /* 3D uzay sahnesi bg-canvas'Ã¯Â¿Â½n Ã¯Â¿Â½stÃ¯Â¿Â½nde (10), Ã¯Â¿Â½izimlerin altÃ¯Â¿Â½nda (50) kalmalÃ¯Â¿Â½ */
    #three-container { position: absolute !important; z-index: 10 !important; pointer-events: none !important; }
    
    /* ?? BUTONLARIN VE FÃ¯Â¿Â½ZÃ¯Â¿Â½KSEL ARAÃ¯Â¿Â½LARIN GERÃ¯Â¿Â½ GELMESÃ¯Â¿Â½NÃ¯Â¿Â½ SAÃ¯Â¿Â½LAYAN EN Ã¯Â¿Â½ST KATMAN KORUMASI ?? */
    .panel, .panel *, button, .tool-button, .tool-button-sub, .tool-options, 
    #pen-options, #line-options, #polygon-options, #fill-options, #snapshot-options, 
    #options-3d-main, #options-prizmalar, #options-piramitler, #slider-container, #info-tooltip,
    .ruler-container, .gonye-container, .aciolcer-container, #compass-container { 
        z-index: 10000 !important; 
    }
`;
document.head.appendChild(canvasKatmanZirhi);


// ==========================================
// --- TONY STARK MODU (Ã¯Â¿Â½LERÃ¯Â¿Â½ DÃ¯Â¿Â½ZEY GESTURES) ---
// ==========================================
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

let tonyBtn = document.getElementById('tony-magic-btn');
if (!tonyBtn) {
    tonyBtn = document.createElement('button');
    tonyBtn.id = 'tony-magic-btn';

tonyBtn.className = 'tool-button';
tonyBtn.style.position = 'static';
tonyBtn.style.transform = 'none';
tonyBtn.style.width = '100%';
tonyBtn.style.marginTop = '10px';
tonyBtn.style.padding = '10px 0';
tonyBtn.style.fontSize = '12px';
tonyBtn.style.borderRadius = '10px';
tonyBtn.style.backgroundColor = 'rgba(0, 150, 255, 0.2)';
tonyBtn.style.border = '2px solid #0096ff';
tonyBtn.style.color = '#fff';
tonyBtn.style.cursor = 'pointer';
tonyBtn.style.fontWeight = 'bold';
tonyBtn.innerHTML = '??? Sihirli El';

const oyunlarBtn = document.getElementById('btn-oyunlar');
if (oyunlarBtn && oyunlarBtn.parentNode) {
    oyunlarBtn.parentNode.appendChild(tonyBtn);
} else {
    document.body.appendChild(tonyBtn);
}
}

// Lazer Ã¯Â¿Â½mleci
const laserCursor = document.createElement('div');
laserCursor.style.position = 'absolute';
laserCursor.style.width = '20px';
laserCursor.style.height = '20px';
laserCursor.style.borderRadius = '50%';
laserCursor.style.backgroundColor = '#00ffff'; // Iron Man Blue
laserCursor.style.boxShadow = '0 0 15px 5px rgba(0, 255, 255, 0.8)';
laserCursor.style.pointerEvents = 'none';
laserCursor.style.transition = 'left 0.1s ease-out, top 0.1s ease-out, background-color 0.2s';
laserCursor.style.willChange = 'left, top';
laserCursor.style.zIndex = '999999';
laserCursor.style.display = 'none';
laserCursor.style.transform = 'translate(-50%, -50%)';
document.body.appendChild(laserCursor);

let tonyActive = false;
let camera = null;
let hands = null;

function calculateDistance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

    tonyBtn.onclick = async () => {
        if (tonyActive) {
            if (camera) { camera.stop(); camera = null; }
            if (hands) { hands.close(); hands = null; }
            const vid = document.getElementById('tony-video-elem');
            if (vid) {
                // Kamera donanim isigini ve kaydini TAMAMEN kapatmak icin MediaStream tracklerini durdurmaliyiz!
                if (vid.srcObject) {
                    vid.srcObject.getTracks().forEach(track => track.stop());
                }
                vid.remove();
            }
            tonyActive = false;
            laserCursor.style.display = 'none';
            tonyBtn.innerHTML = '?? Sihirli El';
            tonyBtn.style.borderColor = '#0096ff';
            tonyBtn.style.boxShadow = 'none';
            return;
        }

        tonyBtn.innerHTML = '? (KVKK)';
        tonyBtn.style.borderColor = '#ffff00';
        tonyBtn.style.boxShadow = '0 0 10px rgba(255,255,0,0.5)';

        try {
            // Scripts artik index.html icinde erkenden yukleniyor.

            const videoElement = document.createElement('video');
            videoElement.setAttribute('playsinline', '');
            videoElement.setAttribute('autoplay', '');
            videoElement.setAttribute('muted', '');
            videoElement.id = 'tony-video-elem';
            videoElement.style.position = 'fixed'; 
            videoElement.style.opacity = '0.001'; videoElement.setAttribute('webkit-playsinline', 'true'); 
            videoElement.style.transform = 'scaleX(-1)';
            videoElement.style.width = '100%'; 
            videoElement.style.height = '100%'; 
            videoElement.style.zIndex = '-9999'; 
            videoElement.style.top = '0'; 
            videoElement.style.left = '0'; 
            videoElement.style.pointerEvents = 'none'; 
            videoElement.muted = true;
            document.body.appendChild(videoElement);

            hands = new window.Hands({
                locateFile: (file) => 'vendor/' + file
            });

            hands.setOptions({
                maxNumHands: 2, 
                modelComplexity: 1, // 1 yapildi, uzaktan daha iyi algilamasi icin
                minDetectionConfidence: 0.3,
                minTrackingConfidence: 0.3
            });


            let startX = 0, startY = 0;
            let startScaleDistance = 0, startScale = 1;
            let startOpenDistance = 0, startOpenRatio = 0;
            window.lastAISendTime = 0;

            hands.onResults((results) => {

                tonyBtn.innerHTML = 'AI Aktif';
                if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                    tonyBtn.innerHTML = 'El GÃ¯Â¿Â½rÃ¯Â¿Â½ndÃ¯Â¿Â½!';
                    const isTwoHands = results.multiHandLandmarks.length === 2;
                    const hand1 = results.multiHandLandmarks[0];
                    
                    const rawPx1 = (1 - hand1[8].x) * window.innerWidth;
                    const rawPy1 = hand1[8].y * window.innerHeight;
                    if (window.smoothPx1 === undefined) { window.smoothPx1 = rawPx1; window.smoothPy1 = rawPy1; }
                    window.smoothPx1 += (rawPx1 - window.smoothPx1) * 0.25; // 0.25 EMA Yumusatma Filtresi (Titremeyi yutar)
                    window.smoothPy1 += (rawPy1 - window.smoothPy1) * 0.25;
                    const px1 = window.smoothPx1;
                    const py1 = window.smoothPy1;
                    laserCursor.style.display = 'block';
                    laserCursor.style.left = px1 + 'px';
                    laserCursor.style.top = py1 + 'px';
                    
                    const pinchDist1 = calculateDistance(hand1[4], hand1[8]);
                    const handScale1 = calculateDistance(hand1[0], hand1[9]) || 0.001; // Elin ekrandaki boyutu (Bilek - Orta Parmak Koku)
                    // Gercek bir yumrukta parmak uclari koklere cok yaklasir (el boyutunun yarisi kadar veya daha az)
                    const isFist1 = (calculateDistance(hand1[8], hand1[5]) / handScale1) < 0.9 && 
                                    (calculateDistance(hand1[12], hand1[9]) / handScale1) < 0.9;
                    const dynamicPinch1 = (handScale1 > 0.12) ? 0.40 : 0.55;
                    const isPinched1 = !isFist1 && ((pinchDist1 / handScale1) < dynamicPinch1); 

                    if (window.Scene3D) {
                        let mesh = window.Scene3D.currentMesh;
                        if (!mesh && window.Scene3D.scene) {
                            mesh = window.Scene3D.scene.children.slice().reverse().find(m => m.userData && m.userData.strokeData);
                        }
                        if (mesh) {
                            if (isTwoHands) {
                                const hand2 = results.multiHandLandmarks[1];
                                const pinchDist2 = calculateDistance(hand2[4], hand2[8]);
                                const handScale2 = calculateDistance(hand2[0], hand2[9]) || 0.001;
                                const isFist2 = (calculateDistance(hand2[8], hand2[5]) / handScale2) < 0.9 && 
                                                (calculateDistance(hand2[12], hand2[9]) / handScale2) < 0.9;
                                const dynamicPinch2 = (handScale2 > 0.12) ? 0.40 : 0.55;
                                const isPinched2 = !isFist2 && ((pinchDist2 / handScale2) < dynamicPinch2);
                                const handsDistance = calculateDistance(hand1[8], hand2[8]);

                                // Hata onleme: Iki el birbirinden en az %15 uzak olmali (yanlis algilamalari onler)
                                if (handsDistance > 0.15) {
                                    if (!isPinched1 && !isPinched2) {
                                        laserCursor.style.backgroundColor = "#ff00ff"; 
                                        if (startScaleDistance === 0) {
                                            startScaleDistance = handsDistance;
                                            startScale = mesh.scale.x;
                                        } else {
                                            const distDiff = handsDistance - startScaleDistance;
                                            // Pruzsuz dogrusal buyutme (Sicramalari tamamen onler)
                                            let newScale = startScale + (distDiff * 4);
                                            // Cizim alanindan tasmamasi icin maksimum 3.5 siniri
                                            newScale = Math.max(0.2, Math.min(newScale, 3.5)); 
                                            
                                            // Lerp ile gecisleri yag gibi kaydir
                                            mesh.scale.x += (newScale - mesh.scale.x) * 0.3;
                                            mesh.scale.setScalar(mesh.scale.x);
                                            
                                            if (mesh.userData && mesh.userData.strokeData) {
                                                mesh.userData.strokeData.meshScale = mesh.scale.x;
                                                if (typeof window.sendNetworkData === "function") {
                                                    window.sendNetworkData({ type: "sekil_guncelle", stroke: mesh.userData.strokeData });
                                                }
                                            }
                                        }
                                        startOpenDistance = 0; 
                                    } 
                                    else if (isPinched1 && isPinched2) {
                                        laserCursor.style.backgroundColor = "#ffff00"; 
                                        if (startOpenDistance === 0) {
                                            startOpenDistance = handsDistance;
                                            startOpenRatio = mesh.userData.strokeData?.openRatio || 0;
                                        } else {
                                            const distDiff = handsDistance - startOpenDistance;
                                            
                                            // ASIMETRIK CARPAN: Kapatmak (distDiff < 0) fiziksel olarak daha dar bir alanda
                                            // yapildigi icin kapatma ivmesini 2.5 yapiyoruz. Acmak 1.5 kaliyor.
                                            // ASIMETRIK CARPAN: Hizli acilip kapanmasi icin carpanlar artirildi
                                            let multiplier = distDiff < 0 ? 5.5 : 4.0;
                                            let ratioChange = distDiff * multiplier; 
                                            
                                            let newRatio = Math.max(0, Math.min(1, startOpenRatio + ratioChange));
                                            
                                            // MANYETIK HIZALAMA (Kilit): Daha kolay kapanmasi icin sinirlar genisletildi
                                            if (newRatio > 0.85) newRatio = 1.0;
                                            if (newRatio < 0.18) newRatio = 0.0;
                                            
                                            const sInput = document.getElementById("shape-slider");
                                            if(sInput) sInput.value = newRatio * 100;
                                            
                                            // Lerp animasyonu icin update fonksiyonlari Scene3D.animate'e birakildi
                                            
                                            if (mesh.userData && mesh.userData.strokeData) {
                                                mesh.userData.strokeData.openRatio = newRatio;
                                                if (typeof window.sendNetworkData === "function") { window.sendNetworkData({ type: "sekil_guncelle", stroke: mesh.userData.strokeData }); }
                                            }
                                        }
                                        startScaleDistance = 0; 
                                    }
                                    else {
                                        startScaleDistance = 0;
                                        startOpenDistance = 0;
                                    }
                                }
                                startX = 0; 
                            } 
                            else {
                                startScaleDistance = 0;
                                startOpenDistance = 0;

                                const isFist = isFist1;

                                if (isFist) {
                                    laserCursor.style.backgroundColor = '#ff0000'; 
                                    const fistX = (1 - hand1[9].x) * window.innerWidth;
                                    const fistY = hand1[9].y * window.innerHeight;
                                    
                                    if (!window.Scene3D.isDraggingAI) {
                                        window.Scene3D.isDraggingAI = true;
                                        if (!window.Scene3D.dragOffset) window.Scene3D.dragOffset = new THREE.Vector3();
                                        window.Scene3D.dragPlane.setFromNormalAndCoplanarPoint(window.Scene3D.camera.getWorldDirection(new THREE.Vector3()), mesh.position);
                                        window.Scene3D.raycaster.setFromCamera(window.Scene3D.getNormalizedCoords(fistX, fistY), window.Scene3D.camera);
                                        const intersectPoint = new THREE.Vector3();
                                        if (window.Scene3D.raycaster.ray.intersectPlane(window.Scene3D.dragPlane, intersectPoint)) {
                                            window.Scene3D.dragOffset.subVectors(mesh.position, intersectPoint);
                                        }
                                    } else {
                                        window.Scene3D.raycaster.setFromCamera(window.Scene3D.getNormalizedCoords(fistX, fistY), window.Scene3D.camera);
                                        const intersectPoint = new THREE.Vector3();
                                        if (window.Scene3D.raycaster.ray.intersectPlane(window.Scene3D.dragPlane, intersectPoint)) {
                                            const targetPos = new THREE.Vector3().addVectors(intersectPoint, window.Scene3D.dragOffset);
                                            
                                            // BOUNDARY CLAMP: Ekran disina ucmasini (kaybolmasini) engeller
                                            targetPos.x = Math.max(-30, Math.min(30, targetPos.x));
                                            targetPos.y = Math.max(-30, Math.min(30, targetPos.y));
                                            targetPos.z = Math.max(-30, Math.min(30, targetPos.z));

                                            if (!mesh.userData.targetPosition) mesh.userData.targetPosition = mesh.position.clone();
                                            mesh.userData.targetPosition.copy(targetPos);
                                            
                                            const vec = targetPos.clone();
                                            vec.project(window.Scene3D.camera);
                                            const canvasEl = document.getElementById('drawing-canvas');
                                            const w = canvasEl ? (canvasEl.width / 2) : (window.innerWidth / 2);
                                            const h = canvasEl ? (canvasEl.height / 2) : (window.innerHeight / 2);
                                            
                                            if (mesh.userData && mesh.userData.strokeData) {
                                                mesh.userData.strokeData.x = (vec.x * w) + w;
                                                mesh.userData.strokeData.y = -(vec.y * h) + h;
                                                if (typeof window.sendNetworkData === "function") { window.sendNetworkData({ type: "sekil_guncelle", stroke: mesh.userData.strokeData }); }
                                            }
                                        }
                                    }
                                } else if (isPinched1) {
                                    window.Scene3D.isDraggingAI = false;
                                    laserCursor.style.backgroundColor = '#00ff00'; 
                                    if (startX !== 0 && startY !== 0) {
                                        const dx = px1 - startX;
                                        const dy = py1 - startY;
                                        
                                        if (Math.abs(dx) > 1.0 || Math.abs(dy) > 1.0) { // Deadzone: Sadece gercek hareketlerde don!

                                        // Gimbal Lock Fix + Trackball (Dunya Maketi) Eksen Donusumu
                                        const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(window.Scene3D.camera.quaternion);
                                        const camUp = new THREE.Vector3(0, 1, 0).applyQuaternion(window.Scene3D.camera.quaternion);
                                        if (!mesh.userData.targetQuaternion) {
                                            mesh.userData.targetQuaternion = mesh.quaternion.clone();
                                        }
                                        const dummy = new THREE.Object3D();
                                        dummy.quaternion.copy(mesh.userData.targetQuaternion);
                                        dummy.rotateOnWorldAxis(camUp, dx * 0.008); // 0.005'ten 0.008'e cikarildi (Daha hizli donus)
                                        dummy.rotateOnWorldAxis(camRight, dy * 0.008); // Ters donme sorunu icin - silindi (YeÃ¯Â¿Â½il butonla ayni yapildi)
                                        mesh.userData.targetQuaternion.copy(dummy.quaternion);

                                        if (mesh.userData && mesh.userData.strokeData) {
                                            const sd = mesh.userData.strokeData;
                                            const euler = new THREE.Euler().setFromQuaternion(mesh.userData.targetQuaternion, 'XYZ');
                                            sd.rotationX = euler.x;
                                            sd.rotationY = euler.y;
                                            sd.rotationZ = euler.z;
                                            if (typeof window.sendNetworkData === "function") { window.sendNetworkData({ type: "sekil_guncelle", stroke: sd }); }
                                        }
                                        } // Deadzone sonu
                                    }
                                    startX = px1;
                                    startY = py1;
                                } else {
                                    laserCursor.style.backgroundColor = '#00ffff'; 
                                    window.Scene3D.isDraggingAI = false;
                                    startX = 0;
                                    startY = 0;
                                }
                            }
                        }
                    }
                } else {
                    startX = 0; startY = 0;
                    startScaleDistance = 0; startOpenDistance = 0;
                    laserCursor.style.display = 'none';
                }
            });

            // Kamera besleyiciyi başlat: her frame'de hands.send() ile sonuçları güncelle
            camera = new window.Camera(videoElement, {
                onFrame: async () => {
                    if (videoElement.readyState >= 2) {
                        await hands.send({image: videoElement});
                    }
                },
                width: 1920,
                height: 1080,
                facingMode: 'user'
            });
            camera.start();

            tonyBtn.innerHTML = '?? Sihirli El';
            tonyBtn.style.borderColor = '#00ff00';
            tonyBtn.style.boxShadow = '0 0 20px rgba(0,255,255,0.8)';
            tonyBtn.style.color = '#00ff00';
            tonyActive = true;

        } catch (e) {
            console.error('Tony Stark Modu Hatası:', e);
            tonyBtn.innerHTML = '? Hata';
            tonyBtn.style.borderColor = '#ff0000';
            tonyBtn.style.boxShadow = '0 0 10px rgba(255,0,0,0.5)';
            tonyBtn.style.color = '#ff0000';
        }
    };

// ==========================================


// ========================================================
// SIHIRLI CEKMECE (MOBIL RESPONSIVE) ETKILESIMLERI
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
    const leftFab = document.getElementById('mobile-drawer-left');
    const rightFab = document.getElementById('mobile-drawer-right');
    const leftPanel = document.querySelector('.left-panel');
    const rightPanel = document.querySelector('.right-panel');
    const canvas = document.getElementById('drawing-canvas');

    if (leftFab && leftPanel) {
        // Dokunmatik cihazlarda cift tiklamayi onlemek icin sadece tek click kullan
        leftFab.addEventListener('click', (e) => {
            e.stopPropagation(); // Tuvale dokunmus sayilmamasi icin
            leftPanel.classList.toggle('drawer-open');
            if(rightPanel) rightPanel.classList.remove('drawer-open'); // Digerini kapat
        });
    }

    if (rightFab && rightPanel) {
        rightFab.addEventListener('click', (e) => {
            e.stopPropagation();
            rightPanel.classList.toggle('drawer-open');
            if(leftPanel) leftPanel.classList.remove('drawer-open');
        });
    }

    // Tuvale (Ekrana) dokunuldugunda cekmeceleri otomatik kapat
    if (canvas) {
        canvas.addEventListener('pointerdown', () => {
            if (window.innerWidth <= 1024) {
                if(leftPanel && leftPanel.classList.contains('drawer-open')) {
                    leftPanel.classList.remove('drawer-open');
                }
                if(rightPanel && rightPanel.classList.contains('drawer-open')) {
                    rightPanel.classList.remove('drawer-open');
                }
            }
        });
    }
});



// --- MOBÃ¯Â¿Â½L CÃ¯Â¿Â½HAZLARDA SOL PANELDEN ARAÃ¯Â¿Â½ SEÃ¯Â¿Â½Ã¯Â¿Â½LÃ¯Â¿Â½NCE PANELÃ¯Â¿Â½ OTOMATÃ¯Â¿Â½K KAPATMA YAMASI ---
document.addEventListener('DOMContentLoaded', () => {
    const lp = document.querySelector('.left-panel');
    if (lp) {
        lp.addEventListener('click', (e) => {
            if (e.target.closest('.tool-button') || e.target.closest('.tool-button-sub')) {
                if (window.innerWidth <= 1024 && lp.classList.contains('drawer-open')) {
                    lp.classList.remove('drawer-open');
                }
            }
        });
    }
});


// --- MOBÃ¯Â¿Â½L CÃ¯Â¿Â½HAZLARDA BOÃ¯Â¿Â½LUÃ¯Â¿Â½A (Ã¯Â¿Â½Ã¯Â¿Â½ZÃ¯Â¿Â½M ALANINA) DOKUNUNCA PANELÃ¯Â¿Â½ KESÃ¯Â¿Â½N OLARAK KAPATMA YAMASI ---
document.addEventListener('pointerdown', (e) => {
    if (window.innerWidth <= 1024) { // Daha geniÃ¯Â¿Â½ tabletleri de kapsasÃ¯Â¿Â½n diye 1024 yapÃ¯Â¿Â½ldÃ¯Â¿Â½
        const lp = document.querySelector('.left-panel');
        const rp = document.querySelector('.right-panel');
        const lFab = document.getElementById('mobile-drawer-left');
        const rFab = document.getElementById('mobile-drawer-right');

        if (lp && lp.classList.contains('drawer-open')) {
            if (!lp.contains(e.target) && (!lFab || !lFab.contains(e.target))) {
                lp.classList.remove('drawer-open');
            }
        }
        if (rp && rp.classList.contains('drawer-open')) {
            if (!rp.contains(e.target) && (!rFab || !rFab.contains(e.target))) {
                rp.classList.remove('drawer-open');
            }
        }
    }
}, { capture: true });
}); // capture: true sayesinde diÃ¯Â¿Â½er elemanlarÃ¯Â¿Â½n engellemesini (stopPropagation) aÃ¯Â¿Â½ar
window.addEventListener('error', function(e) {
    alert('JS HATASI: ' + e.message + ' at ' + e.filename + ':' + e.lineno);
});

// --- TURKCE KARAKTER DUZELTMELERI ---
if (window.OyunListesi) {
    const duzeltmeler = [
        "ÇEMBERLERDEN ÜÇGEN İNŞASI",
        "AÇI ÖLÇER YERLEŞTİRME OYUNU",
        "DOĞRUYA DIŞINDAKİ NOKTADAN DİKME",
        "AYNI DÜZLEMDE İKİ DOĞRUNUN YOLCULUĞU",
        "AYNI DÜZLEMDE 3 DOĞRUNUN DURUMLARI",
        "AÇI ÇEŞİTLERİ (TÜMLER/BÜTÜNLER/KOMŞU)",
        "AÇILARINA GÖRE ÜÇGENLER",
        "AÇI ÇEŞİTLERİ (DAR, DİK, GENİŞ vb.)",
        "TEMEL GEOMETRİK ŞEKİLLER",
        "ÇOKGENLERİN ELEMANLARI",
        "İKİ PARALEL VE KESENLE OLUŞAN AÇILAR (1)",
        "ÜÇ DOĞRUNUN İKİŞER KESİŞMESİ",
        "DİKDÖRTGENİN ÇEVRE VE ALANI",
        "DÖRTGENLERİN ÖZELLİKLERİ (TÜMEVARIM)",
        "DÖRTGENLERİN ÖZELLİKLERİ (TÜMDENGELİM)",
        "İKİ PARALEL DOĞRUNUN BİR KESENLE YAPTIĞI AÇILAR (2)",
        "DÖNÜŞÜM GEOMETRİSİ (ÖTELEME/YANSIMA)",
        "DÖRTGEN ÇEŞİTLERİ KAVRAM HARİTASI",
        "DÖRTGENLER GENEL ÇIKARIMLAR",
        "KESİRLERİN FARKLI GÖSTERİMLERİ",
        "KÖŞEGENLERDEN DÖRTGENLERE (1)",
        "CEBİRSEL İFADELER TEMEL KAVRAMLAR",
        "CEBİRSEL İFADELER SÖZELDEN CEBİRE",
        "CEBİRSEL İFADELER CEBİRDEN SÖZELE",
        "CEBİRSEL İFADELER DEĞER HESAPLAMA",
        "ARAŞTIRMA ADIMLARI (Canva)",
        "ARAŞTIRMA ADIMLARI (GitHub)",
        "ÜÇGENDE YARDIMCI ELEMANLAR",
        "ÜÇGEN ÇİZİMİ",
        "ÜÇGENDE EŞLİK VE BENZERLİK",
        "PRİZMALARIN ELEMANLARI",
        "PİRAMİT VE AÇINIMI",
        "PRİZMA, PİRAMİT, KONİ, SİLİNDİR",
        "KÖŞEGENLERDEN DÖRTGENLERE (2)"
    ];
    for(let i = 0; i < duzeltmeler.length && i < window.OyunListesi.length; i++) {
        window.OyunListesi[i].tr = duzeltmeler[i];
    }
}

