@echo off
title Realtor Guide Website Server
color 0A

echo.
echo  ============================================
echo    Realtor Guide - Starting Website...
echo  ============================================
echo.

:: Kill any existing Node.js processes to free port 3000
echo  Clearing existing servers...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 1 /nobreak >nul

:: Start the server in background and wait 3 seconds before opening browser
echo  Starting server on http://localhost:3000
echo.
start "" /b cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:3000"

:: Run the server (pure HTML - no Next.js)
node "%~dp0server.js"

pause
