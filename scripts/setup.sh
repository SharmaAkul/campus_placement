#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/frontend"
BREW_BIN="/opt/homebrew/bin/brew"

log() {
  echo "[setup] $1"
}

require_macos() {
  if [[ "$(uname -s)" != "Darwin" ]]; then
    echo "This setup script currently supports macOS only."
    exit 1
  fi
}

ensure_xcode_clt() {
  if xcode-select -p >/dev/null 2>&1; then
    log "Xcode Command Line Tools already installed"
    return
  fi

  log "Installing Xcode Command Line Tools (this may open a system prompt)"
  xcode-select --install || true
  echo "Complete the Xcode Command Line Tools installation, then re-run: ./scripts/setup.sh"
  exit 1
}

ensure_homebrew() {
  if command -v brew >/dev/null 2>&1; then
    log "Homebrew already installed"
    return
  fi

  log "Installing Homebrew"
  NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

  if [[ -x "$BREW_BIN" ]]; then
    eval "$("$BREW_BIN" shellenv)"
  fi

  if ! command -v brew >/dev/null 2>&1; then
    echo "Homebrew installation succeeded but brew is not on PATH."
    echo "Run: eval \"\$($BREW_BIN shellenv)\""
    echo "Then re-run: ./scripts/setup.sh"
    exit 1
  fi
}

ensure_formula() {
  local formula="$1"
  if brew list --formula | grep -q "^${formula}$"; then
    log "$formula already installed"
  else
    log "Installing $formula"
    brew install "$formula"
  fi
}

ensure_mongodb() {
  if brew list --formula | grep -q '^mongodb-community@7.0$'; then
    log "mongodb-community@7.0 already installed"
  else
    log "Installing MongoDB Community 7.0"
    brew tap mongodb/brew
    brew install mongodb-community@7.0
  fi
}

configure_env_files() {
  if [[ ! -f "$BACKEND_DIR/.env" ]]; then
    cp "$BACKEND_DIR/.env.example" "$BACKEND_DIR/.env"
    log "Created backend/.env from template"
  else
    log "backend/.env already exists"
  fi

  if [[ ! -f "$FRONTEND_DIR/.env" ]]; then
    cp "$FRONTEND_DIR/.env.example" "$FRONTEND_DIR/.env"
    log "Created frontend/.env from template"
  else
    log "frontend/.env already exists"
  fi

  # Use 5001 by default to avoid common macOS conflicts on 5000.
  sed -i '' 's/^PORT=.*/PORT=5001/' "$BACKEND_DIR/.env"
  sed -i '' 's#^REACT_APP_API_URL=.*#REACT_APP_API_URL=http://localhost:5001/api#' "$FRONTEND_DIR/.env"
  log "Configured ports: backend 5001, frontend API -> localhost:5001"
}

install_dependencies() {
  log "Installing backend dependencies"
  cd "$BACKEND_DIR"
  npm install

  log "Installing frontend dependencies"
  cd "$FRONTEND_DIR"
  npm install
}

start_mongo() {
  log "Starting MongoDB service"
  brew services start mongodb/brew/mongodb-community@7.0 >/dev/null || true
}

seed_database() {
  log "Seeding MongoDB with demo data"
  cd "$BACKEND_DIR"
  npm run seed
}

main() {
  log "Starting full setup for CampusConnect Placement Portal"
  require_macos
  ensure_xcode_clt
  ensure_homebrew
  ensure_formula git
  ensure_formula node
  ensure_mongodb
  start_mongo
  configure_env_files
  install_dependencies
  seed_database
  log "Setup completed successfully"
  echo "Run project with: ./scripts/run_project.sh"
}

main "$@"
