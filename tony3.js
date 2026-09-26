    tonyBtn.onclick = async () => {
        if (tonyActive) {
            if (camera) { camera.stop(); camera = null; }
            if (hands) { hands.close(); hands = null; }
            const vid = document.getElementById('tony-video-elem');
            if (vid) { vid.remove(); }
            tonyActive = false;
            laserCursor.style.display = 'none';
            tonyBtn.innerHTML = '🤖 Sihirli El';
            tonyBtn.style.borderColor = '#0096ff';
            tonyBtn.style.boxShadow = 'none';
            return;
        }

        tonyBtn.innerHTML = '⏳ (KVKK)';
        tonyBtn.style.borderColor = '#ffff00';
        tonyBtn.style.boxShadow = '0 0 10px rgba(255,255,0,0.5)';

        try {
            await loadScript('mediapipe/camera_utils.js');
            await loadScript('mediapipe/hands.js');

            const videoElement = document.createElement('video');
            videoElement.setAttribute('playsinline', '');
            videoElement.setAttribute('autoplay', '');
            videoElement.setAttribute('muted', '');
            videoElement.id = 'tony-video-elem';
            videoElement.style.position = 'fixed'; 
            videoElement.style.opacity = '0.15'; 
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
                modelComplexity: 0,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            });

            let startX = 0, startY = 0;
            let startScaleDistance = 0, startScale = 1;
            let startOpenDistance = 0, startOpenRatio = 0;

            hands.onResults((results) => {
                tonyBtn.innerHTML = 'AI Aktif';
                if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                    tonyBtn.innerHTML = 'El Göründü!';
                    const isTwoHands = results.multiHandLandmarks.length === 2;
                    const hand1 = results.multiHandLandmarks[0];
                    
                    const px1 = (1 - hand1[8].x) * window.innerWidth;
                    const py1 = hand1[8].y * window.innerHeight;
                    laserCursor.style.display = 'block';
                    laserCursor.style.left = px1 + 'px';
                    laserCursor.style.top = py1 + 'px';
                    
                    const pinchDist1 = calculateDistance(hand1[4], hand1[8]);
                    const isPinched1 = pinchDist1 < 0.12; 

                    if (window.Scene3D) {
                        let mesh = window.Scene3D.currentMesh;
                        if (!mesh && window.Scene3D.scene) {
                            mesh = window.Scene3D.scene.children.slice().reverse().find(m => m.userData && m.userData.strokeData);
                        }
                        if (mesh) {
                            if (isTwoHands) {
                                const hand2 = results.multiHandLandmarks[1];
                                const pinchDist2 = calculateDistance(hand2[4], hand2[8]);
                                const isPinched2 = pinchDist2 < 0.12;
                                const handsDistance = calculateDistance(hand1[8], hand2[8]);

                                if (isPinched1 && isPinched2) {
                                    laserCursor.style.backgroundColor = '#ff00ff'; 
                                    if (startScaleDistance === 0) {
                                        startScaleDistance = handsDistance;
                                        startScale = mesh.scale.x;
                                    } else {
                                        const scaleFactor = handsDistance / startScaleDistance;
                                        let newScale = startScale * scaleFactor;
                                        newScale = Math.max(0.2, Math.min(newScale, 10)); 
                                        mesh.scale.setScalar(newScale);
                                        
                                        if (mesh.userData && mesh.userData.strokeData) {
                                            mesh.userData.strokeData.meshScale = newScale;
                                            if (typeof window.sendNetworkData === 'function') {
                                                window.sendNetworkData({ type: 'sekil_guncelle', stroke: mesh.userData.strokeData });
                                            }
                                        }
                                    }
                                    startOpenDistance = 0; 
                                } 
                                else if (!isPinched1 && !isPinched2) {
                                    laserCursor.style.backgroundColor = '#ffff00'; 
                                    if (startOpenDistance === 0) {
                                        startOpenDistance = handsDistance;
                                        startOpenRatio = mesh.userData.strokeData?.openRatio || 0;
                                    } else {
                                        const distDiff = handsDistance - startOpenDistance;
                                        let ratioChange = distDiff * 2; 
                                        let newRatio = Math.max(0, Math.min(1, startOpenRatio + ratioChange));
                                        
                                        const sInput = document.getElementById('shape-slider');
                                        if(sInput) sInput.value = newRatio * 100;
                                        
                                        if (mesh.userData.isCustomCone && window.CustomConeEngine) {
                                            window.CustomConeEngine.update(mesh, newRatio);
                                        } else if (window.Foldable3D) {
                                            window.Foldable3D.updateUnfold(mesh, newRatio);
                                        }
                                        
                                        if (mesh.userData && mesh.userData.strokeData) {
                                            mesh.userData.strokeData.openRatio = newRatio;
                                            if (typeof window.sendNetworkData === 'function') {
                                                window.sendNetworkData({ type: 'sekil_guncelle', stroke: mesh.userData.strokeData });
                                            }
                                        }
                                    }
                                    startScaleDistance = 0; 
                                }
                                startX = 0; 
                            } 
                            else {
                                startScaleDistance = 0;
                                startOpenDistance = 0;

                                if (isPinched1) {
                                    laserCursor.style.backgroundColor = '#00ff00'; 
                                    if (startX !== 0 && startY !== 0) {
                                        const dx = px1 - startX;
                                        const dy = py1 - startY;

                                        mesh.rotation.y += dx * -0.005;
                                        mesh.rotation.x += dy * 0.005;

                                        if (mesh.userData && mesh.userData.strokeData) {
                                            const sd = mesh.userData.strokeData;
                                            sd.rotationX = mesh.rotation.x;
                                            sd.rotationY = mesh.rotation.y;
                                            sd.rotationZ = mesh.rotation.z;
                                            if (typeof window.sendNetworkData === 'function') {
                                                window.sendNetworkData({ type: 'sekil_guncelle', stroke: sd });
                                            }
                                        }
                                    }
                                    startX = px1;
                                    startY = py1;
                                } else {
                                    laserCursor.style.backgroundColor = '#00ffff'; 
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

            camera = new window.Camera(videoElement, {
                onFrame: async () => {
                    await hands.send({image: videoElement});
                },
                width: 640,
                height: 480,
                facingMode: 'user'
            });

            camera.start();

            tonyBtn.innerHTML = '🤖 Sihirli El';
            tonyBtn.style.borderColor = '#00ff00';
            tonyBtn.style.boxShadow = '0 0 20px rgba(0,255,255,0.8)';
            tonyBtn.style.color = '#00ff00';
            tonyActive = true;

        } catch (e) {
            console.error('Tony Stark Modu Hatası:', e);
            tonyBtn.innerHTML = '❌ Hata';
            tonyBtn.style.borderColor = '#ff0000';
            tonyBtn.style.boxShadow = '0 0 10px rgba(255,0,0,0.5)';
            tonyBtn.style.color = '#ff0000';
        }
    };
