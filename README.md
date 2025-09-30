# Yucadiax PWA 


## Criterios 
- **Splash + Home**: `src/components/Splash.jsx` (transición) y `src/pages/Home.jsx` (responsive + acción de notificación).
- **CSR y SSG**: `src/pages/Tasks.jsx` (CSR con datos); `scripts/prerender-ssg.mjs` genera `/ssg/index.html` (SSG = server-side en build).
- **Datos locales / remotos / offline**: fetch a JSONPlaceholder (remoto), IndexedDB con `idb` (local/offline), Cache API vía `sw.js`.
- **Notificaciones**: `Home.jsx` pide permiso y dispara `ServiceWorkerRegistration.showNotification`.
- **Dispositivo**: `src/pages/Device.jsx` usa Cámara (getUserMedia), GPS (geolocation), Acelerómetro (devicemotion).


## Requisitos
- Node 18+


## Instalación
```bash
npm i
npm run dev