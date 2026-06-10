@echo off
title Servidor de La Norma Express
echo ===================================================
echo   Iniciando el servidor de La Norma Express
echo ===================================================
echo.
cd /d "%~dp0"
echo Directorio actual: %cd%
echo.
echo Ejecutando 'node server.js'...
echo.
node server.js
if %errorlevel% neq 0 (
    echo.
    echo ERROR: No se pudo iniciar el servidor. Asegurate de tener Node.js instalado.
)
echo.
pause
