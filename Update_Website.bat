@echo off
echo ===================================================
echo     AUTO-UPDATING WEBSITE TO GITHUB AND VERCEL
echo ===================================================
echo.
echo Scanning for recent changes...

:: Add all changed files to git
git add .

:: Commit with a generic auto-generated message containing the date and time
git commit -m "Auto-update website changes %date% %time%"

:: Push changes to GitHub (which triggers Vercel automatically)
echo.
echo Pushing changes to GitHub...
git push

echo.
echo ===================================================
echo DONE! Your changes have been sent to GitHub.
echo Vercel is now deploying your updated website.
echo It will be live in about 1-2 minutes!
echo ===================================================
pause
