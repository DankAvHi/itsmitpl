#!/usr/bin/env bash
set -euo pipefail

PROJECT=itsmitpl

dc() {
  local env=$1; shift
  local envfile=.env; [ "$env" = dev ] && envfile=.env.development.local
  docker compose --env-file "$envfile" -f docker-compose.yaml -f "docker-compose.$env.yaml" "$@"
}

ensure_stopped() {
  if [ -n "$(docker compose -p "$PROJECT" ps -q --status running)" ]; then
    echo "Уже запущено. Сначала: $0 stop" >&2; exit 1
  fi
}

case "${1:-}" in
  dev|prod) ensure_stopped; dc "$1" up -d --build ;;
  services) ensure_stopped; dc dev up -d --build postgres migrate proxy ;;
  seed)     dc "${2:?usage: $0 seed dev|prod}" run --rm --build seed ;;
  stop)     docker compose -p "$PROJECT" down --remove-orphans ;;
  *) echo "Usage: $0 {dev|prod|services|seed <dev|prod>|stop}"; exit 1 ;;
esac
