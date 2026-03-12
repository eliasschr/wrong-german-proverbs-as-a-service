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

for _ in {1..30}; do
  if curl -fsS "http://127.0.0.1:${PORT}/healthz" >/dev/null 2>&1; then
    break
  fi

  if ! kill -0 "$PID" >/dev/null 2>&1; then
    echo "Server exited unexpectedly"
    cat /tmp/wgps-smoke.log
    exit 1
  fi

  sleep 0.2
done

curl -fsS "http://127.0.0.1:${PORT}/" >/dev/null
curl -fsS "http://127.0.0.1:${PORT}/api" >/dev/null
curl -fsS "http://127.0.0.1:${PORT}/healthz" >/dev/null
curl -fsS "http://127.0.0.1:${PORT}/get" >/dev/null
curl -fsS "http://127.0.0.1:${PORT}/no" >/dev/null

echo "Smoke test passed"
