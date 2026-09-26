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

            if (rect.width < 30 || rect.height < 30) return; // Çok küçükse iptal (yanlış tıklama)

            const dilimStr = prompt("Kesirler için Kaç Dilim Olacak?", "4");
            if (!dilimStr) return;
            const dilimSayisi = parseInt(dilimStr, 10);
            if (isNaN(dilimSayisi) || dilimSayisi < 2 || dilimSayisi > 100) {
                alert("Lütfen 2 ile 100 arasında geçerli bir sayı girin.");
                return;
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

            // DİKDÖRTGEN Mİ PASTA MI? (Oran %15'e kadar yakınsa Kare/Daire kabul et ve Pasta (Pie) dilimle, yoksa Yatay Kesir (Bar) dilimle)
            const aspectDiff = Math.abs(finalSw - finalSh) / Math.max(finalSw, finalSh);
            const isPieSlicing = aspectDiff < 0.15;

            // Her bir dilimi üret ve ekrana ekle
            for (let i = 0; i < dilimSayisi; i++) {
                const tempCanvas = document.createElement('canvas');
                let imgDataUrl;
                let strokeW, strokeH, strokeX, strokeY;

                if (isPieSlicing) {
                    // --- PASTA DİLİMİ (PIE SLICING) ---
                    tempCanvas.width = finalSw;
                    tempCanvas.height = finalSh;
                    const ctx = tempCanvas.getContext('2d');
                    
                    const centerX = finalSw / 2;
                    const centerY = finalSh / 2;
                    const radius = Math.max(finalSw, finalSh) / 2;
                    
                    // Açı hesaplamaları (Saat 12 yönünden başla)
                    const startAngle = (i * 2 * Math.PI) / dilimSayisi - (Math.PI / 2);
                    const endAngle = ((i + 1) * 2 * Math.PI) / dilimSayisi - (Math.PI / 2);
                    
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(centerX, centerY);
                    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                    ctx.closePath();
                    ctx.clip(); // Sadece bu üçgenimsi alanı göster
                    
                    ctx.drawImage(bgCanvas, finalSx, finalSy, finalSw, finalSh, 0, 0, finalSw, finalSh);
                    ctx.drawImage(canvasElm, finalSx, finalSy, finalSw, finalSh, 0, 0, finalSw, finalSh);
                    ctx.restore();
                    
                    // Görsel olarak dilimlerin ayrıldığını belli etmek için hafif offset
                    const midAngle = (startAngle + endAngle) / 2;
                    const offsetX = Math.cos(midAngle) * 15; // 15px dışa doğru it
                    const offsetY = Math.sin(midAngle) * 15;
                    
                    imgDataUrl = tempCanvas.toDataURL('image/png');
                    strokeW = finalScreenW;
                    strokeH = finalScreenH;
                    strokeX = finalScreenLeft + offsetX;
                    strokeY = finalScreenTop + offsetY;

                } else {
                    // --- DİKDÖRTGEN (BAR) KESİR DİLİMLEME ---
                    const sliceRealW = finalSw / dilimSayisi;
                    const sliceScreenW = finalScreenW / dilimSayisi;
                    
                    tempCanvas.width = sliceRealW;
                    tempCanvas.height = finalSh;
                    const ctx = tempCanvas.getContext('2d');
                    
                    ctx.drawImage(bgCanvas, finalSx + (i * sliceRealW), finalSy, sliceRealW, finalSh, 0, 0, sliceRealW, finalSh);
                    ctx.drawImage(canvasElm, finalSx + (i * sliceRealW), finalSy, sliceRealW, finalSh, 0, 0, sliceRealW, finalSh);
                    
                    imgDataUrl = tempCanvas.toDataURL('image/png');
                    strokeW = sliceScreenW;
                    strokeH = finalScreenH;
                    strokeX = finalScreenLeft + (i * sliceScreenW) + (i * 8); // Her dilimi sağa doğru 8px aralıkla ayır
                    strokeY = finalScreenTop;
                }

                // Dilimi Image Objesi olarak Tahtaya Ekle
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
                    
                    // Öğrencilerin ekranına da gönder
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
        });
    }
});
