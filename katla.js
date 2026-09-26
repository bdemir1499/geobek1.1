// Akıllı Katlama v3.1 - Geobek
// Çapraz Katlama, Arka Plan / Ön Plan Ayrımı ve Gerçek Zamanlı Senkronizasyon

window.isKatlaActive = false;
let katlamaOverlayCanvas = null;
let katlamaOverlayCtx = null;
let currentBgImg = null;
let currentFgImg = null;
let currentCaptureRect = null;

let isDrawingBox = false;
let isFolding = false;
let startX, startY, currentBox = null;
let foldStart = null;
let foldCurrent = null;

// Ağ parçalama (chunking) için ID
let syncImgId = null;

function screenToCanvasCoords(screenObj) {
    const canvasElm = document.getElementById('drawing-canvas');
    if (!canvasElm) return screenObj;
    
    // AĞ SENKRONİZASYONU İÇİN NİHAİ KUSURSUZ ÇÖZÜM:
    // Geobek, PC ve Tablet'te resmi farklı x,y noktalarına merkezler. 
    // Bu yüzden koordinatları ekranın sol üst köşesine göre değil, 
    // ARKA PLAN RESMİNE (Zemine) göre hesaplamalıyız!
    const myBg = window.drawnStrokes ? window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch) : null;
    const dpr = window.devicePixelRatio || 1;
    
    if (myBg && myBg.width > 0) {
        // Çizim tuvalindeki değerler dpr ile çarpılmış halde tutuluyor, bu yüzden dpr'a bölerek CSS piksellerini buluyoruz:
        const bgX = myBg.x / dpr;
        const bgY = myBg.y / dpr;
        const bgW = myBg.width / dpr;
        const bgH = myBg.height / dpr;
        
        let netObj = {
            relX: (screenObj.x - bgX) / bgW,
            relY: (screenObj.y - bgY) / bgH,
            isRel: true
        };
        if (screenObj.w !== undefined) {
            netObj.relW = screenObj.w / bgW;
            netObj.relH = screenObj.h / bgH;
        }
        return netObj;
    } else {
        // Arka plan yoksa, zorunlu olarak doğrudan CSS piksellerini gönder
        let netObj = { x: screenObj.x, y: screenObj.y, isRel: false };
        if (screenObj.w !== undefined) {
            netObj.w = screenObj.w;
            netObj.h = screenObj.h;
        }
        return netObj;
    }
}

function canvasToScreenCoords(networkObj) {
    const canvasElm = document.getElementById('drawing-canvas');
    if (!canvasElm) return networkObj;
    
    const myBg = window.drawnStrokes ? window.drawnStrokes.find(s => s.isBackground === true && !s.isPatch) : null;
    const dpr = window.devicePixelRatio || 1;
    
    if (networkObj.isRel && myBg && myBg.width > 0) {
        const bgX = myBg.x / dpr;
        const bgY = myBg.y / dpr;
        const bgW = myBg.width / dpr;
        const bgH = myBg.height / dpr;
        
        let screenObj = {
            x: bgX + (networkObj.relX * bgW),
            y: bgY + (networkObj.relY * bgH)
        };
        if (networkObj.relW !== undefined) {
            screenObj.w = networkObj.relW * bgW;
            screenObj.h = networkObj.relH * bgH;
        }
        return screenObj;
    } else {
        let screenObj = { x: networkObj.x || 0, y: networkObj.y || 0 };
        if (networkObj.w !== undefined) {
            screenObj.w = networkObj.w;
            screenObj.h = networkObj.h;
        }
        return screenObj;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Katla Butonunu Ekle
    // (Kaldırıldı)
    // 1. Katla Butonunu Canlandır Menüsüne Ekle
    const katlaBtn = document.createElement('button');
    katlaBtn.id = 'btn-katla';
    katlaBtn.className = 'tool-button-sub';
    katlaBtn.title = 'Akıllı Katlama';
    katlaBtn.innerHTML = 'Katla ✂️';
    
    const snapshotOptions = document.getElementById('snapshot-options');
    if (snapshotOptions) {
        snapshotOptions.appendChild(katlaBtn);
        }

    // 2. Stilleri Ekle
    const style = document.createElement('style');
    style.textContent = `
        #katla-box { position: absolute; border: 2px dashed #ff00ff; background: rgba(255,0,255,0.1); pointer-events: none; z-index: 9999; }
        .katla-active { cursor: crosshair !important; }
        .btn-katla-active { background-color: #ff00ff !important; color: white; }
        #katlama-overlay { position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 10000; touch-action: none; pointer-events: auto; }
        .katlama-ui { position: absolute; top: 20px; left: 50%; transform: translateX(-50%); z-index: 10001; display: flex; gap: 10px; }
        .katlama-ui button { padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 8px; border: none; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.3); }
        #btn-katla-iptal { background-color: #ff4444; color: white; }
        #btn-katla-tamam { background-color: #44cc44; color: white; }
    `;
    document.head.appendChild(style);

    // 1.5. Geobek araç değişimini dinleyip Katla'yı kapatma (Başka araca geçilirse Katla iptal olsun)
    if (typeof window.setActiveTool === 'function' && !window.katlaHooked) {
        const originalSetActiveTool = window.setActiveTool;
        window.setActiveTool = function(toolId) {
            if (toolId !== 'none' && toolId !== 'snapshot' && window.isKatlaActive) {
                // Kullanıcı katlamayı bitirmeden (örn: Serbest Kesim) başka araca geçerse, otomatik olarak 'Katlanmış Bırak' yap.
                if (typeof foldStart !== 'undefined' && foldStart && typeof foldCurrent !== 'undefined' && foldCurrent) {
                    katlanmisBirak(foldStart, foldCurrent);
                    if (typeof agSenkronizeEt === 'function') agSenkronizeEt('iptal');
                }
                iptalEt();
            }
            originalSetActiveTool(toolId);
        };
        window.katlaHooked = true;
    }

    if (typeof seffafBtn !== 'undefined') {
        seffafBtn.addEventListener('click', () => {
            if (!window.isKatlaActive && typeof window.setActiveTool === 'function') {
                window.setActiveTool('snapshot');
            }
            window.isKatlaActive = !window.isKatlaActive;
                        
            if (window.isKatlaActive) {
                seffafBtn.classList.add('btn-katla-active');
                katlaBtn.classList.remove('btn-katla-active');
                document.body.classList.add('katla-active');
                if (typeof window.setActiveTool === 'function') window.setActiveTool('none');
            } else {
                iptalEt();
            }
        });
    }

    katlaBtn.addEventListener('click', () => {
                if (typeof seffafBtn !== 'undefined') {
            seffafBtn.classList.remove('btn-katla-active');
        }
        if (!window.isKatlaActive && typeof window.setActiveTool === 'function') {
            window.setActiveTool('snapshot');
        }
        window.isKatlaActive = !window.isKatlaActive;
        if (window.isKatlaActive) {
            katlaBtn.classList.add('btn-katla-active');
            document.body.classList.add('katla-active');
            if (typeof window.setActiveTool === 'function') window.setActiveTool('none');
        } else {
            iptalEt();
            katlaBtn.classList.remove('btn-katla-active');
            document.body.classList.remove('katla-active');
        }
    });

    // 3. Etkileşimler (Kutu Çizimi)
    document.addEventListener('pointerdown', (e) => {
        if (!window.isKatlaActive || e.target.closest('.ui-container') || e.target.closest('.panel') || e.target.closest('.katlama-ui')) return;
        
        // Eğer zaten katlama ekranındaysak, katlama hareketini başlat
        if (katlamaOverlayCanvas) {
            e.stopPropagation();
            isFolding = true;
            foldStart = { x: e.clientX, y: e.clientY };
            foldCurrent = { x: e.clientX, y: e.clientY };
            return;
        }

        e.stopPropagation(); 
        isDrawingBox = true;
        startX = e.clientX;
        startY = e.clientY;
        
        currentBox = document.createElement('div');
        currentBox.id = 'katla-box';
        currentBox.style.left = startX + 'px';
        currentBox.style.top = startY + 'px';
        document.body.appendChild(currentBox);
    }, { capture: true });

    document.addEventListener('pointermove', (e) => {
        if (isFolding && katlamaOverlayCanvas) {
            e.stopPropagation();
            foldCurrent = { x: e.clientX, y: e.clientY };
            cizKatlamaAnimasyonu(currentBgImg, currentFgImg, currentCaptureRect, foldStart, foldCurrent);
            agSenkronizeEt('guncelle', foldStart, foldCurrent);
            return;
        }

        if (!isDrawingBox || !currentBox) return;
        e.stopPropagation();
        const width = Math.abs(e.clientX - startX);
        const height = Math.abs(e.clientY - startY);
        currentBox.style.width = width + 'px';
        currentBox.style.height = height + 'px';
        currentBox.style.left = Math.min(startX, e.clientX) + 'px';
        currentBox.style.top = Math.min(startY, e.clientY) + 'px';
    }, { capture: true });

    document.addEventListener('pointerup', async (e) => {
        if (isFolding) {
            e.stopPropagation();
            isFolding = false;
            // KULLANICI İSTEĞİ: Kalemi kaldırdığı an onay beklemeden doğrudan katlanmış bırak ve art arda katlama için sıfırla!
            if (foldStart && foldCurrent) {
                katlanmisBirak(foldStart, foldCurrent);
                if (typeof agSenkronizeEt === 'function') agSenkronizeEt('iptal');
                // Art arda katlama yapabilmesi için tool'u kapatmadan sadece overlay'i sıfırla
                sifirlaKatlama();
            } else {
                iptalEt();
            }
            return;
        }

        if (!isDrawingBox || !currentBox) return;
        e.stopPropagation();
        isDrawingBox = false;
        
        const rect = currentBox.getBoundingClientRect();
        currentBox.remove();
        currentBox = null;

        if (rect.width < 50 || rect.height < 50) return;

        // Html2Canvas yerine anında Canvas Cropping kullanıyoruz (Çok daha performanslı ve Katmanları ayırabiliyoruz!)
        const canvasElm = document.getElementById('drawing-canvas');
        const bgCanvas = document.getElementById('bg-canvas');
        if (!canvasElm) return;

        try {
            const tempBg = document.createElement('canvas');
            tempBg.width = rect.width; tempBg.height = rect.height;
            const tempFg = document.createElement('canvas');
            tempFg.width = rect.width; tempFg.height = rect.height;

            const canvasRect = canvasElm.getBoundingClientRect();
            // CROP FIX: Zoom ve Pan durumlarında doğru pikseli almak için dpr yerine gerçek canvas oranını (scaleX/Y) kullanıyoruz!
            const scaleX = canvasElm.width / canvasRect.width;
            const scaleY = canvasElm.height / canvasRect.height;
            
            const sx = (rect.left - canvasRect.left) * scaleX;
            const sy = (rect.top - canvasRect.top) * scaleY;
            const sw = rect.width * scaleX;
            const sh = rect.height * scaleY;

            // AKILLI BAKMA (Smart Sampling): Zemin rengini bulmak için kutunun 5px dışından 4 farklı noktaya bak!
            let detectedBgColor = document.body.style.backgroundColor || '#ffffff';
            try {
                const ctxD = canvasElm.getContext('2d');
                const pts = [
                    { x: rect.left + rect.width / 2, y: rect.top - 5 }, // Üst orta
                    { x: rect.left + rect.width / 2, y: rect.top + rect.height + 5 }, // Alt orta
                    { x: rect.left - 5, y: rect.top + rect.height / 2 }, // Sol orta
                    { x: rect.left + rect.width + 5, y: rect.top + rect.height / 2 } // Sağ orta
                ];
                
                for (let pt of pts) {
                    const sx_s = (pt.x - canvasRect.left) * scaleX * dpr;
                    const sy_s = (pt.y - canvasRect.top) * scaleY * dpr;
                    if (sx_s >= 0 && sx_s < canvasElm.width && sy_s >= 0 && sy_s < canvasElm.height) {
                        const p = ctxD.getImageData(sx_s, sy_s, 1, 1).data;
                        if (p[3] > 250) { 
                            detectedBgColor = `rgba(${p[0]}, ${p[1]}, ${p[2]}, 1)`;
                            break;
                        } else if (bgCanvas) {
                            const bgP = bgCanvas.getContext('2d').getImageData(sx_s, sy_s, 1, 1).data;
                            if (bgP[3] > 250) {
                                detectedBgColor = `rgba(${bgP[0]}, ${bgP[1]}, ${bgP[2]}, 1)`;
                                break;
                            }
                        }
                    }
                }
            } catch (e) {
                console.warn("Akıllı renk okuma başarısız:", e);
            }

            // ZEMİNİ (Delik kısmını) AKILLI RENK İLE DOLDUR
            {
                tempBg.getContext('2d').fillStyle = detectedBgColor;
            tempBg.getContext('2d').fillRect(0, 0, rect.width, rect.height);
            }
            // PDF vs. çizmeyi iptal ediyoruz çünkü kullanıcı "o renge boyasın" dedi, yani DÜZ RENK istiyor!
            
            // OPAQUE FLAP: Kağıdın arkasını görebilmemiz için şeffaf değil, opak olması lazım!
            // Zemin rengini kağıdın bazı olarak alıyoruz (beyaz/akıllı renk):
            {
                tempFg.getContext('2d').fillStyle = detectedBgColor;
            tempFg.getContext('2d').fillRect(0, 0, rect.width, rect.height);
            
            // Eğer varsa, PDF kalıntılarını (veya arka planı) yaprağa bas (sadece yaprakta kalsın)
            if (bgCanvas) {
                tempFg.getContext('2d').drawImage(bgCanvas, sx, sy, sw, sh, 0, 0, rect.width, rect.height);
            }
            // Sonra üzerine çizimleri ekliyoruz:
                        }
            tempFg.getContext('2d').drawImage(canvasElm, sx, sy, sw, sh, 0, 0, rect.width, rect.height);

            const bgStr = tempBg.toDataURL('image/png');
            const fgStr = tempFg.toDataURL('image/png');
            
            currentCaptureRect = { x: rect.left, y: rect.top, w: rect.width, h: rect.height };

            // İki resmi paralel yükle
            Promise.all([
                new Promise(res => { currentBgImg = new Image(); currentBgImg.onload = res; currentBgImg.src = bgStr; }),
                new Promise(res => { currentFgImg = new Image(); currentFgImg.onload = res; currentFgImg.src = fgStr; })
            ]).then(() => {
                baslatKatlamaEkrani();
                agSenkronizeEt('basla', null, null, bgStr, fgStr, currentCaptureRect);
            });
        } catch (err) {
            console.error("Kesim hatası:", err);
        }
    }, { capture: true });

    // 4. Ağ Dinleyicisi (PC veya diğer tabletler için)
    window.addEventListener('katlama_sistemi', (e) => {
        const d = e.detail;
        // YANKI (ECHO) KORUMASI: Kendi gönderdiğimiz veriyi işlemeyiz!
        if (!d || (d.senderId && window.mySessionId && d.senderId === window.mySessionId)) return;
        
        if (d.type === 'katlama_basla_chunk') {
            if (!window.kChunks) window.kChunks = {};
            if (!window.kChunks[d.imgId]) window.kChunks[d.imgId] = { chunks: new Array(d.total), count: 0, isBg: d.isBg, isFg: d.isFg };
            const cObj = window.kChunks[d.imgId];
            if (!cObj.chunks[d.index]) {
                cObj.chunks[d.index] = d.chunk;
                cObj.count++;
            }
            if (cObj.count === d.total) {
                const fullImg = cObj.chunks.join('');
                delete window.kChunks[d.imgId];
                
                if (cObj.isBg) {
                    currentBgImg = new Image();
                    currentBgImg.src = fullImg;
                } else if (cObj.isFg) {
                    currentFgImg = new Image();
                    currentFgImg.onload = () => {
                        currentCaptureRect = canvasToScreenCoords(d.rect);
                        // Fg (ön plan) en son gelir, gelince ekranı başlat
                        baslatKatlamaEkrani(true); 
                    };
                    currentFgImg.src = fullImg;
                }
            }
        }
        else if (d.type === 'katlama_guncelle') {
            if (katlamaOverlayCanvas) {
                cizKatlamaAnimasyonu(currentBgImg, currentFgImg, currentCaptureRect, canvasToScreenCoords(d.foldStart), canvasToScreenCoords(d.foldCurrent));
            }
        }
        else if (d.type === 'katlama_iptal') {
            iptalEt(true);
        }
        else if (d.type === 'katlama_tamamla') {
            katIziBirak(canvasToScreenCoords(d.foldStart), canvasToScreenCoords(d.foldCurrent));
            iptalEt(true);
        }
    });
});

function baslatKatlamaEkrani(isRemote = false) {
    if (katlamaOverlayCanvas) katlamaOverlayCanvas.remove();
    const ui = document.querySelector('.katlama-ui');
    if (ui) ui.remove();

    katlamaOverlayCanvas = document.createElement('canvas');
    katlamaOverlayCanvas.id = 'katlama-overlay';
    
    const dpr = window.devicePixelRatio || 1;
    katlamaOverlayCanvas.width = window.innerWidth * dpr;
    katlamaOverlayCanvas.height = window.innerHeight * dpr;
    
    // PDF ve diğer nesnelerin altında kalmaması için css z-index ayarı:
    katlamaOverlayCanvas.style.position = 'absolute';
    katlamaOverlayCanvas.style.top = '0';
    katlamaOverlayCanvas.style.left = '0';
    katlamaOverlayCanvas.style.width = window.innerWidth + 'px';
    katlamaOverlayCanvas.style.height = window.innerHeight + 'px';
    katlamaOverlayCanvas.style.zIndex = '10000';
    katlamaOverlayCanvas.style.pointerEvents = 'auto';
    katlamaOverlayCanvas.style.touchAction = 'none';
    
    document.body.appendChild(katlamaOverlayCanvas);
    katlamaOverlayCtx = katlamaOverlayCanvas.getContext('2d');
    katlamaOverlayCtx.scale(dpr, dpr);

    // İlk anda hiçbir şey çizmene gerek yok, çünkü alttaki canvaslar zaten gösteriyor.
    // Kullanıcı ekrana dokunup hareket ettirdiğinde cizKatlamaAnimasyonu çağrılacak.
    // DİKKAT: Yeni UI kuralları gereği, onay ekranı (.katlama-ui) oluşturulmuyor. 
    // Katlama doğrudan pointerup ile uygulanacak.
}

function sifirlaKatlama() {
    if (katlamaOverlayCanvas) {
        katlamaOverlayCanvas.remove();
        katlamaOverlayCanvas = null;
    }
    currentBgImg = null;
    currentFgImg = null;
    currentCaptureRect = null;
    foldStart = null;
    foldCurrent = null;
    isFolding = false;
    isDrawingBox = false;
    if (currentBox) {
        currentBox.remove();
        currentBox = null;
    }
}

function iptalEt(isRemote = false) {
    window.isKatlaActive = false;
    const katlaBtn = document.getElementById('btn-katla');
    if (katlaBtn) katlaBtn.classList.remove('btn-katla-active');
    const seffafBtn = document.getElementById('btn-seffaf-katla');
    if (seffafBtn) seffafBtn.classList.remove('btn-katla-active');
        document.body.classList.remove('katla-active');

    if (katlamaOverlayCanvas) {
        katlamaOverlayCanvas.remove();
        katlamaOverlayCanvas = null;
    }
    const ui = document.querySelector('.katlama-ui');
    if (ui) ui.remove();
    currentBgImg = null;
    currentFgImg = null;
    currentCaptureRect = null;
    foldStart = null;
    foldCurrent = null;
    
    // GÜVENLİK (KİLİTLENMEYİ ÖNLEME): Katlama işlemi bittiğinde veya iptal edildiğinde state değişkenlerini sıfırla.
    // Aksi halde pointerup event'leri e.stopPropagation() ile yutulur ve "tüm butonlar kilitlenir".
    isFolding = false;
    isDrawingBox = false;
    if (currentBox) {
        currentBox.remove();
        currentBox = null;
    }
}

function katIziBirak(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;

    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;

    // Perpendicular vector
    const nx = -dy;
    const ny = dx;

    let lineStartX = midX + nx * 1000;
    let lineStartY = midY + ny * 1000;
    let lineEndX = midX - nx * 1000;
    let lineEndY = midY - ny * 1000;

    // KESİN ÇÖZÜM: Kat izini sadece seçili alanın (currentCaptureRect) içinde kalacak şekilde sınırla!
    if (currentCaptureRect) {
        const left = currentCaptureRect.x;
        const right = currentCaptureRect.x + currentCaptureRect.w;
        const top = currentCaptureRect.y;
        const bottom = currentCaptureRect.y + currentCaptureRect.h;

        let points = [];
        
        // 1. Sol kenar kesişimi (x = left)
        if (nx !== 0) {
            let t = (left - midX) / nx;
            let y = midY + ny * t;
            if (y >= top && y <= bottom) points.push({x: left, y: y});
        }
        // 2. Sağ kenar kesişimi (x = right)
        if (nx !== 0) {
            let t = (right - midX) / nx;
            let y = midY + ny * t;
            if (y >= top && y <= bottom) points.push({x: right, y: y});
        }
        // 3. Üst kenar kesişimi (y = top)
        if (ny !== 0) {
            let t = (top - midY) / ny;
            let x = midX + nx * t;
            if (x >= left && x <= right) points.push({x: x, y: top});
        }
        // 4. Alt kenar kesişimi (y = bottom)
        if (ny !== 0) {
            let t = (bottom - midY) / ny;
            let x = midX + nx * t;
            if (x >= left && x <= right) points.push({x: x, y: bottom});
        }

        // Aynı noktaları temizle (köşelerden geçerse çift nokta çıkabilir)
        let uniquePoints = [];
        for (let p of points) {
            if (!uniquePoints.some(up => Math.abs(up.x - p.x) < 0.1 && Math.abs(up.y - p.y) < 0.1)) {
                uniquePoints.push(p);
            }
        }

        if (uniquePoints.length === 2) {
            lineStartX = uniquePoints[0].x;
            lineStartY = uniquePoints[0].y;
            lineEndX = uniquePoints[1].x;
            lineEndY = uniquePoints[1].y;
        } else {
            return; // Eğer çizgi kutunun dışındaysa (veya kesişmiyorsa) hiç iz çizme!
        }
    }

    // Çizgiyi sisteme stroke olarak ekle
    if (window.drawnStrokes) {
        const dpr = window.devicePixelRatio || 1;
        const bgLayerObj = {
            type: 'segment',
            p1: {x: lineStartX * dpr, y: lineStartY * dpr},
            p2: {x: lineEndX * dpr, y: lineEndY * dpr},
            color: '#aaaaaa',
            width: 3 * dpr, // Çizgi kalınlığını da dpr ile çarpalım ki tablette ince kalmasın
            label1: '',
            label2: '',
            id: Date.now() + Math.random()
        };
        window.drawnStrokes.push(bgLayerObj);
        if (typeof window.redrawAllStrokes === 'function') {
            window.redrawAllStrokes();
        }
    }
}

function katlanmisBirak(p1, p2) {
    if (!katlamaOverlayCanvas || !window.drawnStrokes) return;
    
    let cropX = 0;
    let cropY = 0;
    let cropW = window.innerWidth;
    let cropH = window.innerHeight;

    // Kırpma alanı hesapla: Orijinal kutu ve katlama eksenine göre yansımasının sınırlarını bul
    if (currentCaptureRect && p1 && p2) {
        const reflectPoint = (x, y, pA, pB) => {
            const dx = pB.x - pA.x;
            const dy = pB.y - pA.y;
            const a = (dx * dx - dy * dy) / (dx * dx + dy * dy);
            const b = 2 * dx * dy / (dx * dx + dy * dy);
            return {
                x: a * (x - pA.x) + b * (y - pA.y) + pA.x,
                y: b * (x - pA.x) - a * (y - pA.y) + pA.y
            };
        };

        const r = currentCaptureRect;
        const pts = [
            {x: r.x, y: r.y}, {x: r.x + r.w, y: r.y},
            {x: r.x + r.w, y: r.y + r.h}, {x: r.x, y: r.y + r.h}
        ];

        for (let i = 0; i < 4; i++) {
            pts.push(reflectPoint(pts[i].x, pts[i].y, p1, p2));
        }

        let minX = Math.min(...pts.map(p => p.x));
        let maxX = Math.max(...pts.map(p => p.x));
        let minY = Math.min(...pts.map(p => p.y));
        let maxY = Math.max(...pts.map(p => p.y));

        minX = Math.floor(Math.max(0, minX - 20)); // Padding
        minY = Math.floor(Math.max(0, minY - 20));
        maxX = Math.ceil(Math.min(window.innerWidth, maxX + 20));
        maxY = Math.ceil(Math.min(window.innerHeight, maxY + 20));

        cropX = minX;
        cropY = minY;
        cropW = maxX - minX;
        cropH = maxY - minY;
    }

    // YENİ: Sadece katlanan bölgeyi (crop box) kapsayan minik bir canvas oluştur
    const dpr = window.devicePixelRatio || 1;
    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = cropW * dpr;
    cropCanvas.height = cropH * dpr;
    const cCtx = cropCanvas.getContext('2d');
    cCtx.scale(dpr, dpr);
    
    // Tüm ekranı çiz ama -cropX ve -cropY ofseti ile kaydır, böylece sadece istediğimiz alan canvas'a sığar
    cCtx.drawImage(katlamaOverlayCanvas, -cropX, -cropY, window.innerWidth, window.innerHeight);
    const dataUrl = cropCanvas.toDataURL('image/png');

    // Resim yaması (patch) oluştur
          let f1 = {x: p1.x, y: p1.y};
      let f2 = {x: p2.x, y: p2.y};
      if (currentCaptureRect && p1 && p2) {
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2;
              const nx = -dy; const ny = dx;
              const left = currentCaptureRect.x; const right = currentCaptureRect.x + currentCaptureRect.w;
              const top = currentCaptureRect.y; const bottom = currentCaptureRect.y + currentCaptureRect.h;
              let pts = [];
              if (nx !== 0) {
                  let t = (left - midX) / nx; let y = midY + ny * t; if (y >= top && y <= bottom) pts.push({x: left, y: y});
                  t = (right - midX) / nx; y = midY + ny * t; if (y >= top && y <= bottom) pts.push({x: right, y: y});
              }
              if (ny !== 0) {
                  let t = (top - midY) / ny; let x = midX + nx * t; if (x >= left && x <= right) pts.push({x: x, y: top});
                  t = (bottom - midY) / ny; x = midX + nx * t; if (x >= left && x <= right) pts.push({x: x, y: bottom});
              }
              let uPts = [];
              for (let p of pts) {
                  if (!uPts.some(up => Math.abs(up.x - p.x) < 0.1 && Math.abs(up.y - p.y) < 0.1)) uPts.push(p);
              }
              if (uPts.length === 2) { f1 = uPts[0]; f2 = uPts[1]; }
          }
      }
      
      const patchObj = { 
          type: 'image', imgData: dataUrl, 
          x: cropX * dpr, 
          y: cropY * dpr, 
          width: cropW * dpr, 
          height: cropH * dpr, 
          rotation: 0, 
          isBackground: false, 
          isPatch: true,
          foldLine: [{x: f1.x * dpr, y: f1.y * dpr}, {x: f2.x * dpr, y: f2.y * dpr}],
          id: Date.now() + Math.random().toString() 
      };
    
    // Geobek çizim geçmişine ekle
    window.drawnStrokes.push(patchObj);
    
    // Diğer cihazlarla senkronize et
    if (typeof window.sendNetworkData === 'function') {
        window.sendNetworkData({ type: 'yeni_cizim', stroke: patchObj });
    }
    
    // Ekranı tazele
    if (typeof window.redrawAllStrokes === 'function') {
        window.redrawAllStrokes();
    }
}

function getReflectionMatrix(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len2 = dx * dx + dy * dy;
    if (len2 === 0) return [1, 0, 0, 1, 0, 0];

    const nx = dx;
    const ny = dy;
    const px = (p1.x + p2.x) / 2;
    const py = (p1.y + p2.y) / 2;

    const a = (ny * ny - nx * nx) / len2;
    const b = (-2 * nx * ny) / len2;
    
    const tx = px - px * a - py * b;
    const ty = py - px * b + py * a;

    return [a, b, b, -a, tx, ty];
}

function cizKatlamaAnimasyonu(bgImg, fgImg, rect, foldStart, foldCurrent) {
    if (!katlamaOverlayCtx) return;
    const ctx = katlamaOverlayCtx;
    const cw = katlamaOverlayCanvas.width;
    const ch = katlamaOverlayCanvas.height;

    ctx.clearRect(0, 0, cw, ch);
    
    const dx = foldCurrent.x - foldStart.x;
    const dy = foldCurrent.y - foldStart.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 1) {
        ctx.drawImage(fgImg, rect.x, rect.y, rect.w, rect.h);
        return;
    }

    const midX = foldStart.x + dx / 2;
    const midY = foldStart.y + dy / 2;
    const nx = dx / dist;
    const ny = dy / dist;
    const angle = Math.atan2(ny, nx);
    
    // 1. ZEMİN (Delik / P1 Tarafı)
    ctx.save();
    ctx.beginPath();
    ctx.translate(midX, midY);
    ctx.rotate(angle);
    ctx.rect(-cw*2, -ch*2, cw*2, ch*4); // P1 (kalkan kısım boşluğu)
    ctx.clip();
    ctx.rotate(-angle);
    ctx.translate(-midX, -midY);
    ctx.drawImage(bgImg, rect.x, rect.y, rect.w, rect.h);
    ctx.restore();

    // 2. KATLANAN YAPRAK (Flap / P2 Tarafı)
    ctx.save();
    ctx.beginPath();
    ctx.translate(midX, midY);
    ctx.rotate(angle);
    ctx.rect(0, -ch*2, cw*2, ch*4); // P2 (yaprağın düştüğü kısım)
    ctx.clip();
    ctx.rotate(-angle);
    ctx.translate(-midX, -midY);

    // Yansıma (Flip)
    const [a, b, c, d, tx, ty] = getReflectionMatrix(foldStart, foldCurrent);
    ctx.transform(a, b, c, d, tx, ty);
    
    // 3D Gölge (Katlanan yaprağın havada durduğunu belli eder)
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = -nx * 10;
    ctx.shadowOffsetY = -ny * 10;
    
    ctx.drawImage(fgImg, rect.x, rect.y, rect.w, rect.h);
    
    // Gölgeyi kapat (sonraki çizimleri etkilememesi için)
    ctx.shadowColor = "transparent";
    
    // SİYAH KUTU HATASI ÇÖZÜMÜ: fillRect'in rengini vermediğim için varsayılan siyaha boyuyordu!
    // Arka yüz buzlu cam efekti (Sadece kağıdın arka yüzeyine uygulanır)
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    ctx.globalCompositeOperation = 'source-over'; // Eski haline getir
    
    ctx.restore();
}

function agSenkronizeEt(action, p1 = null, p2 = null, bgStr = null, fgStr = null, rect = null) {
    if (typeof isConnected !== 'undefined' && isConnected && typeof sendNetworkData === 'function') {
        let logicalP1 = p1 ? screenToCanvasCoords(p1) : null;
        let logicalP2 = p2 ? screenToCanvasCoords(p2) : null;
        let logicalRect = rect ? screenToCanvasCoords(rect) : null;

        if (action === 'basla' && bgStr && fgStr) {
            const chunkSize = 16000;
            
            // BG Gönder
            let bgId = 'bg_' + Date.now();
            let totalBg = Math.ceil(bgStr.length / chunkSize);
            for (let i = 0; i < totalBg; i++) {
                window.sendNetworkData({
                    type: 'katlama_basla_chunk', imgId: bgId,
                    chunk: bgStr.substring(i * chunkSize, (i + 1) * chunkSize),
                    index: i, total: totalBg, rect: logicalRect, isBg: true
                });
            }
            
            // FG Gönder
            let fgId = 'fg_' + Date.now();
            let totalFg = Math.ceil(fgStr.length / chunkSize);
            for (let i = 0; i < totalFg; i++) {
                window.sendNetworkData({
                    type: 'katlama_basla_chunk', imgId: fgId,
                    chunk: fgStr.substring(i * chunkSize, (i + 1) * chunkSize),
                    index: i, total: totalFg, rect: logicalRect, isFg: true
                });
            }
        } else {
            window.sendNetworkData({
                type: 'katlama_' + action,
                foldStart: logicalP1,
                foldCurrent: logicalP2
            });
        }
    }
}

