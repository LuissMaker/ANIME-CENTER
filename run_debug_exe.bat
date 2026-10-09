@echo off
setlocal
cd /d "%~dp0"
set RUST_BACKTRACE=1
set "EXE=src-tauri\target\debug\mokost-anime-center.exe"
if not exist "%EXE%" (
  echo No existe todavia: %EXE%
  echo Ejecuta primero run_tauri_dev.bat para compilar la version DEBUG.
  pause
  exit /b 1
)
echo Ejecutando directamente:
echo %EXE%
echo.
"%EXE%"
set EXITCODE=%ERRORLEVEL%
echo.
echo La aplicacion termino con codigo %EXITCODE%.
pause
exit /b %EXITCODE%
