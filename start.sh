#!/usr/bin/env bash

set -e

PROJECT_NAME=$(basename "$PWD")

check_active_containers() {
    local running_containers
    running_containers=$(docker ps --filter "label=com.docker.compose.project=${PROJECT_NAME}" --filter "status=running" -q)

    if [ -not -z "$running_containers" ]; then
        echo "❌ Error: A Docker Compose is already running for this project!"
        echo "Please stop it first using: ./launch.sh stop"
        exit 1
    fi
}

case "$1" in
    dev)
        check_active_containers
        echo "Starting DEVELOPMENT compose..."
        docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d
        ;;

    prod)
        check_active_containers
        echo "Starting PRODUCTION compose..."
        docker compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build
        ;;

    stop)
        echo "Stopping ALL composes for this project..."
        docker compose -f docker-compose.yaml -f docker-compose.dev.yaml -f docker-compose.prod.yaml down
        ;;

    *)
        echo "Usage: $0 {dev|prod|stop}"
        echo "  ./launch.sh dev   - Starts dev environment (if nothing is running)"
        echo "  ./launch.sh prod  - Starts prod environment (if nothing is running)"
        echo "  ./launch.sh stop  - Stops running environment"
        exit 1
        ;;
esac
