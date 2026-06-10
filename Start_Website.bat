@echo off
echo Starting the Realtor Guide Premium Website...
echo This might take a few seconds to compile...
echo.

:: Check if node modules are installed
if not exist node_modules (
    echo Installing dependencies for the first time...
    call npm install
)

:: Start the Next.js development server and open browser
echo Starting local server on http://localhost:3000
start http://localhost:3000
call npm run dev
