@echo off
setlocal
cd /d "%~dp0"

echo ==========================================
echo   Mokost Anime Center v0.6 - Instalador
echo ==========================================
echo.

where cargo >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Falta Rust/Cargo.
  echo Instala los requisitos oficiales de Tauri 2 para Windows:
  echo https://v2.tauri.app/start/prerequisites/
  echo.
  pause
  exit /b 1
)

if not exist "src-tauri\icons\icon.ico" (
  echo [ERROR] Falta src-tauri\icons\icon.ico.
  echo El paquete esta incompleto. Vuelve a extraer el ZIP.
  pause
  exit /b 1
)

where cargo-tauri >nul 2>nul
if errorlevel 1 (
  echo [Mokost] Instalando Tauri CLI...
  cargo install tauri-cli --version "^2.0.0" --locked
  if errorlevel 1 (
    echo [ERROR] No se pudo instalar Tauri CLI.
    pause
    exit /b 1
  )
)

echo [Mokost] Compilando instalador NSIS...
echo [INFO] La primera vez Tauri puede descargar las herramientas de empaquetado.
cargo tauri build --bundles nsis
if errorlevel 1 (
  echo.
  echo [ERROR] La compilacion del instalador fallo.
  echo Copia desde la primera linea que diga "error:" y mandamela.
  pause
  exit /b 1
)

echo.
echo ==========================================
echo LISTO
echo Busca el instalador en:
echo src-tauri\target\release\bundle\nsis\
echo ==========================================
pause
