#!/usr/bin/env bash
set -e

echo "=== Cambiando tráfico de la PWA a GREEN ==="

sudo rm -f /etc/nginx/conf.d/pwa-active.conf
sudo ln -s /etc/nginx/conf.d/pwa-green.conf /etc/nginx/conf.d/pwa-active.conf

sudo nginx -t
sudo systemctl reload nginx

echo "Tráfico apuntando a GREEN (http://127.0.0.1:5002)"
