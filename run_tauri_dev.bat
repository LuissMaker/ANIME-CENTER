@echo off
setlocal
cd /d "%~dp0"
title Mokost Anime Center - Tauri DEV
set RUST_BACKTRACE=1

echo ============================================================
echo  MOKOST ANIME CENTER v0.6 FASE 6 - MODO DESARROLLO
echo ============================================================
echo.

where cargo >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Rust/Cargo no esta disponible en PATH.
  echo Ejecuta build_windows.bat o reinstala Rust.
  pause
  exit /b 1
)

where cargo-tauri >nul 2>nul
if errorlevel 1 (
  echo [INFO] Tauri CLI no aparece como cargo-tauri. Probando cargo tauri...
  cargo tauri --version >nul 2>nul
  if errorlevel 1 (
    echo [ERROR] Falta Tauri CLI.
    echo Ejecuta: cargo install tauri-cli --version "^2"
    pause
    exit /b 1
  )
)

echo [OK] Iniciando la app. Esta ventana debe permanecer abierta.
echo [OK] Cuando termine de compilar debe aparecer Mokost Anime Center.
echo.

cargo tauri dev --no-watch
set EXITCODE=%ERRORLEVEL%

echo.
echo ============================================================
if "%EXITCODE%"=="0" (
  echo La aplicacion se cerro normalmente.
) else (
  echo [ERROR] Tauri termino con codigo %EXITCODE%.
  echo Copia las ultimas lineas de esta ventana si necesitas que lo revise.
)
echo ============================================================
pause
exit /b %EXITCODE%
