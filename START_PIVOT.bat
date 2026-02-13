@echo off
cd /d %~dp0
title PIVOT - Lanzador
echo.
echo  Iniciando PIVOT... 
echo.
node serve.js
if %errorlevel% neq 0 (
    echo.
    echo  [!] Hubo un problema. Asegurate de tener Node instalado.
    echo  Si la ventana no abre, escribe esto en Chrome: http://localhost:8080
    pause
)
