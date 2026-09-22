@echo off
setlocal enabledelayedexpansion

echo =======================================================
echo   DKM AL-MUHAJIRIN - ANDROID APK BUILDER
echo   Jl. Maskoki Raya Perumnas 2 Kayuringin Jaya Bekasi
echo =======================================================
echo.

echo [1/4] Memeriksa Java Development Kit (JDK)...
where java >nul 2>nul
if %errorlevel% neq 0 (
    echo [PERINGATAN] Java JDK belum terdeteksi di PATH sistem Anda.
    echo.
    echo Pilihan Solusi:
    echo  A. Buka proyek langsung di Android Studio dengan perintah:
    echo     npx cap open android
    echo     lalu klik menu: Build ^> Build Bundle(s) / APK(s) ^> Build APK(s)
    echo.
    echo  B. Atau instal OpenJDK 17 via Terminal PowerShell:
    echo     winget install Microsoft.OpenJDK.17
    echo.
    echo  C. Atau manfaatkan fitur Auto-Build di GitHub Actions:
    echo     Buka https://github.com/SHEILPIAN/DKM/actions lalu download file APK!
    echo.
    pause
    exit /b 1
)

echo [✓] Java JDK terdeteksi.
echo.

echo [2/4] Menjalankan Next.js Static Export ^& Capacitor Sync...
call npm run build:static
if %errorlevel% neq 0 (
    echo [ERROR] Gagal melakukan build web assets Next.js.
    pause
    exit /b 1
)
echo [✓] Web assets berhasil disinkronkan ke Android.
echo.

echo [3/4] Melakukan kompilasi file APK menggunakan Gradle...
cd android
call gradlew.bat assembleDebug
if %errorlevel% neq 0 (
    echo [ERROR] Kompilasi Gradle gagal. Silakan buka di Android Studio (npx cap open android) untuk memeriksa SDK Android Anda.
    cd ..
    pause
    exit /b 1
)
cd ..
echo [✓] Kompilasi Gradle berhasil!
echo.

echo =======================================================
echo   SUKSES! File APK telah berhasil dibuat di:
echo   android\app\build\outputs\apk\debug\app-debug.apk
echo =======================================================
echo.
echo Membuka folder output APK...
explorer.exe "android\app\build\outputs\apk\debug"

pause
