#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/frontend"
DEFAULT_BACKEND_PORT=5000
DEFAULT_FRONTEND_PORT=3000

log() {
  echo "[run] $1" >&2
}

is_port_in_use() {
  local port="$1"
  lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1
}

pid_on_port() {
  local port="$1"
  lsof -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null | head -n 1
}

is_project_process() {
  local pid="$1"
  local cmd
  cmd="$(ps -p "$pid" -o command= 2>/dev/null || true)"
  [[ "$cmd" == *"$PROJECT_ROOT"* ]] || [[ "$cmd" == *"nodemon server.js"* ]] || [[ "$cmd" == *"react-scripts start"* ]]
}

next_free_port() {
  local port="$1"
  while is_port_in_use "$port"; do
    port=$((port + 1))
  done
  echo "$port"
}

ensure_port_for_service() {
  local requested_port="$1"
  local service_name="$2"
  local resolved_port="$requested_port"

  if is_port_in_use "$requested_port"; then
    local existing_pid
    existing_pid="$(pid_on_port "$requested_port")"

    if [[ -n "$existing_pid" ]] && is_project_process "$existing_pid"; then
      log "$service_name port $requested_port is used by existing project process (PID $existing_pid). Killing and restarting."
      kill "$existing_pid" >/dev/null 2>&1 || true
      sleep 1
      if is_port_in_use "$requested_port"; then
        log "Port $requested_port is still busy after kill. Finding another port."
        resolved_port="$(next_free_port "$requested_port")"
      fi
    else
      resolved_port="$(next_free_port "$requested_port")"
      log "$service_name port $requested_port is occupied by another app. Switching to port $resolved_port."
    fi
  fi

  echo "$resolved_port"
}

cleanup() {
  log "Shutting down backend and frontend..."
  [[ -n "${BACKEND_PID:-}" ]] && kill "$BACKEND_PID" >/dev/null 2>&1 || true
  [[ -n "${FRONTEND_PID:-}" ]] && kill "$FRONTEND_PID" >/dev/null 2>&1 || true
}

trap cleanup EXIT INT TERM

if ! command -v brew >/dev/null 2>&1; then
  echo "Homebrew is required to manage MongoDB service."
  exit 1
fi

if [[ ! -f "$BACKEND_DIR/.env" ]]; then
  echo "Missing backend/.env. Run ./scripts/setup_mac.sh first."
  exit 1
fi

if [[ ! -f "$FRONTEND_DIR/.env" ]]; then
  echo "Missing frontend/.env. Run ./scripts/setup_mac.sh first."
  exit 1
fi

BACKEND_PORT="$(grep -E '^PORT=' "$BACKEND_DIR/.env" | cut -d'=' -f2 || true)"
BACKEND_PORT="${BACKEND_PORT:-$DEFAULT_BACKEND_PORT}"
FRONTEND_PORT="${FRONTEND_PORT:-$DEFAULT_FRONTEND_PORT}"

BACKEND_PORT="$(ensure_port_for_service "$BACKEND_PORT" "Backend" | tail -n 1 | tr -d '[:space:]')"
FRONTEND_PORT="$(ensure_port_for_service "$FRONTEND_PORT" "Frontend" | tail -n 1 | tr -d '[:space:]')"

log "Ensuring MongoDB service is running"
brew services start mongodb/brew/mongodb-community@7.0 >/dev/null || true

log "Starting backend on port $BACKEND_PORT"
cd "$BACKEND_DIR"
PORT="$BACKEND_PORT" npm run dev &
BACKEND_PID=$!

sleep 2

log "Starting frontend on port $FRONTEND_PORT"
cd "$FRONTEND_DIR"
PORT="$FRONTEND_PORT" npm run dev &
FRONTEND_PID=$!

log "Project is running"
echo "Frontend: http://localhost:$FRONTEND_PORT"
echo "Backend health: http://localhost:$BACKEND_PORT/api/health"
echo "Press Ctrl+C to stop both servers"

wait "$BACKEND_PID" "$FRONTEND_PID"
