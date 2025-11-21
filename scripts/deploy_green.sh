#!/usr/bin/env bash
set -e

APP_NAME="pwa-frontend"
COLOR="green"
PORT="5002"   # puerto host

echo "=== Despliegue GREEN (${APP_NAME}-${COLOR}) en puerto ${PORT} ==="

sudo docker build -t ${APP_NAME}:${COLOR} .

sudo docker stop ${APP_NAME}-${COLOR} 2>/dev/null || true
sudo docker rm ${APP_NAME}-${COLOR} 2>/dev/null || true

sudo docker run -d \
  --name ${APP_NAME}-${COLOR} \
  -p ${PORT}:80 \
  ${APP_NAME}:${COLOR}

echo "Contenedor ${APP_NAME}-${COLOR} desplegado en puerto ${PORT}"
