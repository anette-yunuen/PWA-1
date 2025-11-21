#!/usr/bin/env bash
set -e

APP_NAME="pwa-frontend"
COLOR="blue"
PORT="5001"   # puerto host

echo "=== Despliegue BLUE (${APP_NAME}-${COLOR}) en puerto ${PORT} ==="

# Build de la imagen
sudo docker build -t ${APP_NAME}:${COLOR} .

# Parar/eliminar contenedor anterior si existe
sudo docker stop ${APP_NAME}-${COLOR} 2>/dev/null || true
sudo docker rm ${APP_NAME}-${COLOR} 2>/dev/null || true

# Levantar contenedor en puerto 5001 -> 80 dentro del contenedor
sudo docker run -d \
  --name ${APP_NAME}-${COLOR} \
  -p ${PORT}:80 \
  ${APP_NAME}:${COLOR}

echo "Contenedor ${APP_NAME}-${COLOR} desplegado en puerto ${PORT}"
