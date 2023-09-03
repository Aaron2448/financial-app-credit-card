#! /bin/bash

source functions.sh

SCRIPT_PATH="$(dirname "$0")"

(cd "$SCRIPT_PATH/" && down_image $SCRIPT_PATH)
(cd "$SCRIPT_PATH/" && ./build.sh all)
