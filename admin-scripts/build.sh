#! /bin/bash

source functions.sh

SCRIPT_PATH="$(dirname "$0")"
# Sets up the paths to the frontend, database, and backend folders
FRONTEND_PATH="$SCRIPT_PATH"/../frontend
DATABASE_PATH="$SCRIPT_PATH"/../database
BACKEND_PATH="$SCRIPT_PATH"/../backend

case "$1" in
    backend)
        echo "Building Backend"
        echo "------------------"
        build_jar $BACKEND_PATH
        build_image $SCRIPT_PATH backend
        ;;
    frontend)
        echo "Building Frontend"
        echo "------------------"
        build_image $SCRIPT_PATH frontend
        ;;
    database)
        echo "Building Database"
        echo "------------------"
        build_image $SCRIPT_PATH database
        ;;
    all)
        echo "Building All Images"
        echo "------------------"
        build_jar
        (cd "$SCRIPT_PATH/.." && docker-compose up -d --build)
        ;;
    *)
        help
        ;;
esac
