document.addEventListener('DOMContentLoaded', () => {
    // 1. Butonu Canlandır menüsünün içine ekle
    const snapshotOptions = document.getElementById('snapshot-options');
    if (snapshotOptions) {
        const dilimleBtn = document.createElement('button');
        dilimleBtn.id = 'btn-dilimle';
        dilimleBtn.className = 'tool-button-sub';
        dilimleBtn.innerHTML = 'Dilimle 🍕';
        snapshotOptions.appendChild(dilimleBtn);

        // Stil (Seçim Kutusu ve Buton Durumu için)
        const style = document.createElement('style');
        style.textContent = `
            #dilimle-box { position: absolute; border: 2px dashed #ff00ff; background: rgba(255, 0, 255, 0.1); pointer-events: none; z-index: 9999; }
            .btn-dilimle-active { background-color: #ff00ff !important; color: #fff !important; font-weight: bold; }
        `;
        document.head.appendChild(style);

        // State değişkenleri
        let isDilimleActive = false;
        let isDrawingDilimleBox = false;
        let dilimleBox = null;
        let startX = 0, startY = 0;

        // Tool seçildiğinde diğerlerini kapat
        dilimleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.activeTool = 'none';
            if (typeof window.kucultPanel === 'function') window.kucultPanel(); // paneli küçült
            
            // Diğer modları kapat (Katla, Çizim vs)
            if (window.isKatlaActive) { 
                window.isKatlaActive = false; 
                document.body.classList.remove('katla-active'); 
                const katlaBtn = document.getElementById('btn-katla');
                if (katlaBtn) katlaBtn.classList.remove('btn-katla-active');
            }
            
            isDilimleActive = true;
            
            document.querySelectorAll('.tool-button, .tool-button-sub').forEach(b => b.classList.remove('active', 'btn-katla-active', 'btn-dilimle-active'));
            dilimleBtn.classList.add('btn-dilimle-active');
            const mainBtn = document.getElementById('btn-snapshot-main');
            if (mainBtn) mainBtn.classList.add('btn-dilimle-active');
            
            snapshotOptions.classList.add('hidden'); // Menüyü kapat
        });

        document.addEventListener('pointerdown', (e) => {
            if (!isDilimleActive) return;
            // UI elementlerine tıklamaları yoksay
            if (e.target.closest('.panel, .network-panel, .tool-button, .tool-button-sub')) return;

            isDrawingDilimleBox = true;
            startX = e.clientX;
            startY = e.clientY;

            dilimleBox = document.createElement('div');
            dilimleBox.id = 'dilimle-box';
            dilimleBox.style.left = startX + 'px';
            dilimleBox.style.top = startY + 'px';
            dilimleBox.style.width = '0px';
            dilimleBox.style.height = '0px';
            document.body.appendChild(dilimleBox);
        });

        document.addEventListener('pointermove', (e) => {
            if (!isDrawingDilimleBox || !dilimleBox) return;
            const currentX = e.clientX;
            const currentY = e.clientY;

            const minX = Math.min(startX, currentX);
            const minY = Math.min(startY, currentY);
            const w = Math.abs(currentX - startX);
            const h = Math.abs(currentY - startY);

            dilimleBox.style.left = minX + 'px';
            dilimleBox.style.top = minY + 'px';
            dilimleBox.style.width = w + 'px';
            dilimleBox.style.height = h + 'px';
        });

        document.addEventListener('pointerup', async (e) => {
            if (!isDrawingDilimleBox || !dilimleBox) return;
            isDrawingDilimleBox = false;

            const rect = dilimleBox.getBoundingClientRect();
            dilimleBox.remove();
            dilimleBox = null;

            if (rect.width < 30 || rect.height < 30) {
                // Sadece boşluğa tıklandıysa (çok küçük seçim) araçtan çık
                isDilimleActive = false;
                dilimleBtn.classList.remove('btn-dilimle-active');
                const mainBtn = document.getElementById('btn-snapshot-main');
                if (mainBtn) mainBtn.classList.remove('btn-dilimle-active');
                return; // İptal
            }

            const canvasElm = document.getElementById('drawing-canvas');
            const bgCanvas = document.getElementById('bg-canvas');
            if (!canvasElm || !bgCanvas) return;

            // Crop (Kırpma) işlemi için hazırlık
            const canvasRect = canvasElm.getBoundingClientRect();
            const scaleX = canvasElm.width / canvasRect.width;
            const scaleY = canvasElm.height / canvasRect.height;
            
            const sx = (rect.left - canvasRect.left) * scaleX;
            const sy = (rect.top - canvasRect.top) * scaleY;
            const sw = rect.width * scaleX;
            const sh = rect.height * scaleY;

            // Akıllı Seçim (Smart Trim): Boşlukları ve arkaplanı at, sadece ana şekli bul
            const trimCanvas = document.createElement('canvas');
            trimCanvas.width = sw;
            trimCanvas.height = sh;
            const tCtx = trimCanvas.getContext('2d', { willReadFrequently: true });
            tCtx.drawImage(bgCanvas, sx, sy, sw, sh, 0, 0, sw, sh);
            tCtx.drawImage(canvasElm, sx, sy, sw, sh, 0, 0, sw, sh);

            const imgData = tCtx.getImageData(0, 0, sw, sh);
            const data = imgData.data;
            let minX = sw, minY = sh, maxX = 0, maxY = 0;
            let found = false;
            
            // Üst sol köşeyi arkaplan rengi referansı olarak kabul et
            const bgR = data[0], bgG = data[1], bgB = data[2], bgA = data[3];

            for (let y = 0; y < sh; y++) {
                for (let x = 0; x < sw; x++) {
                    const i = (y * sw + x) * 4;
                    const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
                    
                    // Farklı bir renk veya şeffaf olmayan bir alan var mı?
                    const isDiff = Math.abs(r-bgR)>25 || Math.abs(g-bgG)>25 || Math.abs(b-bgB)>25 || Math.abs(a-bgA)>25;
                    const isNotWhite = r < 240 || g < 240 || b < 240;
                    
                    if ((a > 20 && isNotWhite) || (isDiff && a > 20)) {
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                        found = true;
                    }
                }
            }

            let finalSx = sx, finalSy = sy, finalSw = sw, finalSh = sh;
            let finalScreenLeft = rect.left, finalScreenTop = rect.top, finalScreenW = rect.width, finalScreenH = rect.height;

            if (found && maxX > minX && maxY > minY) {
                // Şekli tam oturtmak için 4px padding payı bırak
                minX = Math.max(0, minX - 4);
                minY = Math.max(0, minY - 4);
                maxX = Math.min(sw, maxX + 4);
                maxY = Math.min(sh, maxY + 4);
                
                finalSx = sx + minX;
                finalSy = sy + minY;
                finalSw = maxX - minX;
                finalSh = maxY - minY;
                
                finalScreenLeft = rect.left + (minX / scaleX);
                finalScreenTop = rect.top + (minY / scaleY);
                finalScreenW = finalSw / scaleX;
                finalScreenH = finalSh / scaleY;
            }

            // ARKA PLAN RENGİNİ BULMA (Akıllı Boyama için çerçeveden 5px dışarıya bak)
            const sampleX = Math.max(0, finalSx - 5);
            const sampleY = Math.max(0, finalSy + (finalSh / 2));
            const ctxRef = bgCanvas.getContext('2d');
            let bgStyle = '#ffffff'; // default
            try {
                const px = ctxRef.getImageData(sampleX, sampleY, 1, 1).data;
                if (px[3] > 0) {
                    bgStyle = `rgba(${px[0]}, ${px[1]}, ${px[2]}, ${px[3]/255})`;
                } else {
                    bgStyle = document.body.style.backgroundColor || '#ffffff';
                }
            } catch(e) {}

            // KULLANICIYA SOR: Nasıl dilimlensin?
            const isPieSlicing = confirm("Şekil yuvarlak (Pasta/Pizza) gibi merkezden mi dilimlensin?\n\n- [Tamam]'a basarsanız: Pasta Dilimi\n- [İptal]'e basarsanız: Dikey Çubuk Dilimi (Dikdörtgen)");

            // 3D AKILLI ALGILAMA (Pasta seçildiyse ve şekil basıksa)
            const aspectRatio = Math.max(finalSw, finalSh) / Math.min(finalSw, finalSh);
            const is3D = isPieSlicing && (aspectRatio > 1.02); // Genişlik/Yükseklik farkı %2'ten fazlaysa 3D kabul et

            // "Boşluk Örtüsü" oluşturucu
            const addCoverStroke = () => {
                const coverCanvas = document.createElement('canvas');
                coverCanvas.width = finalSw;
                coverCanvas.height = finalSh;
                const coverCtx = coverCanvas.getContext('2d');
                coverCtx.fillStyle = bgStyle;
                if (isPieSlicing) {
                    coverCtx.beginPath();
                    coverCtx.ellipse(finalSw/2, finalSh/2, (finalSw/2) + 2, (finalSh/2) + 2, 0, 0, Math.PI * 2);
                    coverCtx.fill();
                } else {
                    coverCtx.fillRect(0, 0, finalSw, finalSh);
                }
                const coverImg = new Image();
                coverImg.onload = () => {
                    const coverStroke = {
                        type: 'image',
                        imgData: coverCanvas.toDataURL('image/png'),
                        x: finalScreenLeft,
                        y: finalScreenTop,
                        width: finalScreenW,
                        height: finalScreenH,
                        rotation: 0,
                        isBackground: false,
                        imgObj: coverImg,
                        id: Date.now() + Math.random() + "_cover"
                    };
                    if (window.drawnStrokes) window.drawnStrokes.push(coverStroke);
                    if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes();
                    if (typeof window.sendNetworkData === 'function') {
                        window.sendNetworkData({ type: 'yeni_cizim', stroke: { ...coverStroke, imgObj: null } });
                    }
                };
                coverImg.src = coverCanvas.toDataURL('image/png');
            };

            // 3D Öne Yatırma Animasyonu ve Kesme İşlemi
            const performSlicing = (dilimSayisi, targetSw, targetSh, sliceSourceCanvas) => {
                let targetScreenW = finalScreenW * (targetSw / finalSw);
                let targetScreenH = finalScreenH * (targetSh / finalSh);
                let targetScreenTop = finalScreenTop - (targetScreenH - finalScreenH); // Yukarı doğru büyüdü
                let targetScreenLeft = finalScreenLeft;

                for (let i = 0; i < dilimSayisi; i++) {
                    const tempCanvas = document.createElement('canvas');
                    let imgDataUrl;
                    let strokeW, strokeH, strokeX, strokeY;

                    if (isPieSlicing) {
                        tempCanvas.width = targetSw;
                        tempCanvas.height = targetSh;
                        const ctx = tempCanvas.getContext('2d');
                        
                        const centerX = targetSw / 2;
                        const centerY = targetSh / 2;
                        
                        // Açı hesaplamaları (Saat 12 yönünden başla)
                        const startAngle = (i * 2 * Math.PI) / dilimSayisi - (Math.PI / 2);
                        const endAngle = ((i + 1) * 2 * Math.PI) / dilimSayisi - (Math.PI / 2);
                        
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(centerX, centerY);
                        ctx.ellipse(centerX, centerY, (targetSw/2) + 2, (targetSh/2) + 2, 0, startAngle, endAngle);
                        ctx.closePath();
                        ctx.clip(); // Perspektif (elips) dilim alanı
                        
                        ctx.drawImage(sliceSourceCanvas, 0, 0, targetSw, targetSh);
                        ctx.restore();
                        
                        // Görsel olarak dilimlerin ayrıldığını belli etmek için hafif offset
                        const midAngle = (startAngle + endAngle) / 2;
                        const offsetX = Math.cos(midAngle) * 15;
                        const offsetY = Math.sin(midAngle) * 15;
                        
                        // KESİN KIRPMA (Şeffaf alanları ve ARKA PLANI at)
                        const sliceImgDataObj = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
                        const sliceImgData = sliceImgDataObj.data;
                        let sMinX = tempCanvas.width, sMinY = tempCanvas.height, sMaxX = 0, sMaxY = 0;
                        let sFound = false;
                        for (let y = 0; y < tempCanvas.height; y++) {
                            for (let x = 0; x < tempCanvas.width; x++) {
                                const idx = (y * tempCanvas.width + x) * 4;
                                
                                // Chroma Key (Yeşil Perde)
                                if (sliceImgData[idx+3] > 0) {
                                    const isBg = Math.abs(sliceImgData[idx]-bgR) <= 25 && Math.abs(sliceImgData[idx+1]-bgG) <= 25 && Math.abs(sliceImgData[idx+2]-bgB) <= 25;
                                    if (isBg) sliceImgData[idx+3] = 0;
                                }

                                if (sliceImgData[idx+3] > 0) {
                                    if (x < sMinX) sMinX = x;
                                    if (x > sMaxX) sMaxX = x;
                                    if (y < sMinY) sMinY = y;
                                    if (y > sMaxY) sMaxY = y;
                                    sFound = true;
                                }
                            }
                        }
                        ctx.putImageData(sliceImgDataObj, 0, 0);

                        if (sFound && sMaxX > sMinX && sMaxY > sMinY) {
                            const croppedW = sMaxX - sMinX;
                            const croppedH = sMaxY - sMinY;
                            const croppedCanvas = document.createElement('canvas');
                            croppedCanvas.width = croppedW;
                            croppedCanvas.height = croppedH;
                            croppedCanvas.getContext('2d').drawImage(tempCanvas, sMinX, sMinY, croppedW, croppedH, 0, 0, croppedW, croppedH);
                            
                            imgDataUrl = croppedCanvas.toDataURL('image/png');
                            strokeW = croppedW / scaleX;
                            strokeH = croppedH / scaleY;
                            strokeX = targetScreenLeft + (sMinX / scaleX) + offsetX;
                            strokeY = targetScreenTop + (sMinY / scaleY) + offsetY;
                        } else {
                            continue;
                        }
                    } else {
                        // --- DİKDÖRTGEN (BAR) DİLİMLEME ---
                        const sliceRealW = targetSw / dilimSayisi;
                        const sliceScreenW = targetScreenW / dilimSayisi;
                        
                        tempCanvas.width = sliceRealW;
                        tempCanvas.height = targetSh;
                        const ctx = tempCanvas.getContext('2d');
                        
                        ctx.drawImage(sliceSourceCanvas, (i * sliceRealW), 0, sliceRealW, targetSh, 0, 0, sliceRealW, targetSh);
                        
                        imgDataUrl = tempCanvas.toDataURL('image/png');
                        strokeW = sliceScreenW;
                        strokeH = targetScreenH;
                        strokeX = targetScreenLeft + (i * sliceScreenW) + (i * 8); // 8px boşluk
                        strokeY = targetScreenTop;
                    }

                    // Tahtaya Ekle
                    const img = new Image();
                    img.onload = () => {
                        const stroke = {
                            type: 'image',
                            imgData: imgDataUrl,
                            x: strokeX,
                            y: strokeY,
                            width: strokeW,
                            height: strokeH,
                            rotation: 0,
                            isBackground: false,
                            imgObj: img,
                            id: Date.now() + Math.random() + i
                        };
                        if (window.drawnStrokes) window.drawnStrokes.push(stroke);
                        if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes();
                        if (typeof window.sendNetworkData === 'function') {
                            window.sendNetworkData({ type: 'yeni_cizim', stroke: { ...stroke, imgObj: null } });
                        }
                    };
                    img.src = imgDataUrl;
                }

                // Moddan çıkış
                isDilimleActive = false;
                dilimleBtn.classList.remove('btn-dilimle-active');
                const mainBtn = document.getElementById('btn-snapshot-main');
                if (mainBtn) mainBtn.classList.remove('btn-dilimle-active');
            };

            // Orijinal görünümü hazırlıyoruz
            const sourceCanvas = document.createElement('canvas');
            sourceCanvas.width = finalSw;
            sourceCanvas.height = finalSh;
            sourceCanvas.getContext('2d').drawImage(bgCanvas, finalSx, finalSy, finalSw, finalSh, 0, 0, finalSw, finalSh);
            sourceCanvas.getContext('2d').drawImage(canvasElm, finalSx, finalSy, finalSw, finalSh, 0, 0, finalSw, finalSh);

            if (is3D) {
                addCoverStroke(); // Eski pastayı gizle (Akıllı örtü ile boşluğu boyar)

                // 1. Pastanın sadece ÜST yüzeyini (Oval kısmını) tahmin edip kopyalıyoruz
                const topRadiusX = finalSw / 2;
                const topRadiusY = finalSw * 0.25; // 3D izometrik çizimlerde standart üst yüzey basıklığı
                
                const topCanvas = document.createElement('canvas');
                topCanvas.width = finalSw;
                topCanvas.height = topRadiusY * 2;
                const topCtx = topCanvas.getContext('2d');
                
                topCtx.beginPath();
                topCtx.ellipse(topRadiusX, topRadiusY, topRadiusX, topRadiusY, 0, 0, Math.PI * 2);
                topCtx.clip();
                topCtx.drawImage(sourceCanvas, 0, 0, finalSw, finalSh, 0, 0, finalSw, finalSh);

                // 2. Animasyon için ekrana geçici resmi ekle
                const animImg = document.createElement('img');
                animImg.src = topCanvas.toDataURL();
                animImg.style.position = 'absolute';
                animImg.style.left = finalScreenLeft + 'px';
                animImg.style.top = finalScreenTop + 'px';
                animImg.style.width = finalScreenW + 'px';
                animImg.style.height = (finalScreenH * (topRadiusY * 2 / finalSh)) + 'px';
                animImg.style.zIndex = '10000';
                animImg.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
                animImg.style.transformOrigin = 'bottom center';
                document.body.appendChild(animImg);

                // 3. Kesme işlemi için matematiksel olarak dikleştirilmiş (Kusursuz Daire) halini oluştur
                const targetSize = finalSw; // Genişlik kadar yükseklik (Tam Daire)
                const flatCanvas = document.createElement('canvas');
                flatCanvas.width = targetSize;
                flatCanvas.height = targetSize;
                const fCtx = flatCanvas.getContext('2d');
                fCtx.scale(1, targetSize / (topRadiusY * 2)); // Dikey olarak uzatıp tam daire yap
                fCtx.drawImage(topCanvas, 0, 0);

                // CSS Animasyonunu tetikle (Öne yatırıp tam daireye çevir)
                setTimeout(() => {
                    animImg.style.transform = `scaleY(${targetSize / (topRadiusY * 2)})`;
                }, 50);

                // Animasyon bitince sor ve kes
                setTimeout(() => {
                    const dilimStr = prompt("Kesirler için Kaç Dilim Olacak?", "4");
                    if (!dilimStr) {
                        animImg.remove();
                        if (window.drawnStrokes) window.drawnStrokes.pop(); // Cover'ı geri al
                        if (typeof window.redrawAllStrokes === 'function') window.redrawAllStrokes();
                        return;
                    }
                    const dilimSayisi = parseInt(dilimStr, 10);
                    if (!isNaN(dilimSayisi) && dilimSayisi >= 2 && dilimSayisi <= 100) {
                        performSlicing(dilimSayisi, targetSize, targetSize, flatCanvas);
                    }
                    animImg.remove();
                }, 650);

            } else {
                // 2D Normal Kesme (Madeni para veya Çubuk)
                const dilimStr = prompt("Kesirler için Kaç Dilim Olacak?", "4");
                if (!dilimStr) return;
                const dilimSayisi = parseInt(dilimStr, 10);
                if (!isNaN(dilimSayisi) && dilimSayisi >= 2 && dilimSayisi <= 100) {
                    addCoverStroke(); // Sormadan eklemiyoruz ki iptal edilirse silmekle uğraşmayalım
                    performSlicing(dilimSayisi, finalSw, finalSh, sourceCanvas);
                }
            }
        });
    }
});
