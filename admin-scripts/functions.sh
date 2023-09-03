#! /bin/bash

SCRIPT_PATH="$(dirname "$0")"
BACKEND_PATH="$SCRIPT_PATH"/../backend

build_jar() {
    (cd "$BACKEND_PATH"/admin-scripts && ./build.sh)
}

build_image() {
    echo "Building: Image"
    (cd "$1/.." && docker-compose up -d --build "$2")
}

down_image() {
    echo "Downing: Images"
    (cd "$1/.." && docker-compose down -v)
}

restart_image() {
    echo "Restarting: Image"
    (cd "$1/.." && docker-compose restart "$2")
}

help() {
    echo "Usage: ./build.sh [SERVICE]"
    echo "{Action} Docker images for a specific service or all services."
    echo ""
    echo "SERVICE:"
    echo "    backend      {Action} the backend Docker image."
    echo "    frontend     {Action} the frontend Docker image."
    echo "    database     {Action} the database Docker image."
    echo "    all          {Action} all Docker images."
    echo ""
    exit 0
}