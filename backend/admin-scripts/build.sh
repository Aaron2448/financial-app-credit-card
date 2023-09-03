#! /bin/bash

SCRIPT_PATH="$(dirname "$0")"
echo "Building .jar file"
(cd "$SCRIPT_PATH"/.. && mvn clean package -DskipTests 1> /dev/null)