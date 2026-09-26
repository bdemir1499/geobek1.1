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
                    const senderCw = data.cw || data.cssW;
                    const senderCh = data.ch || data.cssH;
                    adaptStrokeToScreen(s, data.cssW, data.cssH, senderCw, senderCh, data);
                }
            });

            // EÃ¯Â¿Â½er veride bir anormallik olup dizi (array) gelirse diye gÃ¯Â¿Â½venlik Ã¯Â¿Â½nlemi
            if (isArr) {
                strokesArr.forEach(s => {
                    const isExist = s.id && window.drawnStrokes.some(ex => ex.id === s.id);
                    if (!isExist) window.drawnStrokes.push(s);
                });
                if (window.redrawAllStrokes) window.redrawAllStrokes();
                return;
            }

            // Normal Tekil Ã¯Â¿Â½izim (Kalem karalamasÃ¯Â¿Â½ vs.)
            const existingIndex = stroke.id ? window.drawnStrokes.findIndex(s => s.id === stroke.id) : -1;

            if (existingIndex !== -1) {
                window.drawnStrokes[existingIndex] = stroke;
                if (window.redrawAllStrokes) window.redrawAllStrokes();
            } else {
                if (stroke.type === 'image' && stroke.imgData) {
                    const tempImg = new Image();
                    tempImg.src = stroke.imgData;
                    tempImg.onload = () => {
                        stroke.imgObj = tempImg;
                        window.drawnStrokes.push(stroke);
                        if (window.redrawAllStrokes) window.redrawAllStrokes();
                    };
                } else {
                    window.drawnStrokes.push(stroke);
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
        if (denemeSayisi >= 10) clearInterval(pencereSyncTimer); // 4 saniye boyunca tahtayÃ¯Â¿Â½ bombalar, sonra durur
    }, 1000);

} // <--- setupConnectionEvents fonksiyonu tam burada kusursuzca kapanÃ¯Â¿Â½yor
