#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-3000}"

node index.js > /tmp/wgps-smoke.log 2>&1 &
PID=$!

cleanup() {
  kill "$PID" >/dev/null 2>&1 || true
  wait "$PID" 2>/dev/null || true
}
trap cleanup EXIT

sleep 1

curl -fsS "http://127.0.0.1:${PORT}/" >/dev/null
curl -fsS "http://127.0.0.1:${PORT}/healthz" >/dev/null
curl -fsS "http://127.0.0.1:${PORT}/get" >/dev/null

echo "Smoke test passed"
