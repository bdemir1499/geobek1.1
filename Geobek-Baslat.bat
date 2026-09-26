@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
    echo Node.js bulunamadi. Node.js LTS kurup bu dosyayi tekrar calistirin.
    pause
    exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
    echo npm bulunamadi. Node.js LTS kurulumunu kontrol edin.
    pause
    exit /b 1
)

if not exist "node_modules\express\package.json" (
    echo Yerel bagimliliklar kuruluyor...
    call npm install --no-audit --no-fund
    if errorlevel 1 (
        echo npm install basarisiz oldu.
        pause
        exit /b 1
    )
)

echo Geobek yerel sunucusu baslatiliyor...
start "Geobek Sunucu" /b cmd /c "node server.js > geobek-server.log 2>&1"
timeout /t 2 /nobreak >nul
start "" "http://localhost:3000/"
echo Tahta tarayicida acildi. Sunucu gunlugu: geobek-server.log
exit /b 0
