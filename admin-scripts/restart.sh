#! /bin/bash

source functions.sh

SCRIPT_PATH="$(dirname "$0")"
# Sets up the paths to the frontend, database, and backend folders
FRONTEND_PATH="$SCRIPT_PATH"/../frontend
DATABASE_PATH="$SCRIPT_PATH"/../database
BACKEND_PATH="$SCRIPT_PATH"/../backend

case "$1" in
    backend)
        echo "Restarting Backend"
        echo "------------------"
        build_jar $BACKEND_PATH
        restart_image $SCRIPT_PATH backend
        ;;
    frontend)
        echo "Restarting Frontend"
        echo "------------------"
        restart_image $SCRIPT_PATH frontend
        ;;
    database)
        echo "Restarting Database"
        echo "------------------"
        restart_image $SCRIPT_PATH database
        ;;
    all)
        echo "Restarting All Images"
        echo "------------------"
        build_jar
        (cd "$SCRIPT_PATH/.." && docker-compose restart)
        ;;
    *)
        help
        ;;
esac
