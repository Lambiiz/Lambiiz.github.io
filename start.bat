@echo off
rem Launch Mirror Hour locally (Windows). Requires Node.js 18+.
cd /d "%~dp0"
start "" http://localhost:5173/
node server.mjs 5173
