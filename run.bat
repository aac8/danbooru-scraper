@echo off
cd /d "%~dp0"
echo Current directory: %CD%
echo Checking for index.js...
if exist index.js (
    echo index.js found
) else (
    echo index.js not found!
    pause
    exit
)
echo Checking Node modules...
if exist node_modules (
    echo Node modules found
) else (
    echo Node modules not found! Please run install.bat first
    pause
    exit
)
echo Starting Danbooru Scraper...
cls
node index.js
pause