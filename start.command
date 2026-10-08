#!/usr/bin/env sh
# Launch Mirror Hour locally (macOS / Linux). Requires Node.js 18+.
cd "$(dirname "$0")"
PORT="${PORT:-5173}"
( sleep 1; (command -v open >/dev/null && open "http://localhost:$PORT/") || (command -v xdg-open >/dev/null && xdg-open "http://localhost:$PORT/") ) >/dev/null 2>&1 &
exec node server.mjs "$PORT"
