# Etapa 1: build de la PWA con Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos solo package*.json para aprovechar caché
COPY package*.json ./

RUN npm ci

# Copiamos el resto del código fuente
COPY . .

# Construimos la app de producción (sale en /app/dist)
RUN npm run build

# Etapa 2: Nginx sirviendo archivos estáticos
FROM nginx:alpine

# Quitamos la configuración por defecto
RUN rm /etc/nginx/conf.d/default.conf

# Copiamos nuestra config para servir la PWA como SPA
COPY nginx/frontend.conf /etc/nginx/conf.d/default.conf

# Copiamos el build de Vite al directorio público de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
