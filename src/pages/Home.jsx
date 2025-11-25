import React, { useEffect } from 'react'


export default function Home(){
useEffect(() => {
// Pedir permiso de notificaciones al entrar (demostración)
if ('Notification' in window && Notification.permission === 'default') {
Notification.requestPermission()
}
}, [])


// Enviar notificación de prueba
const sendNotification = async () => {
  if (!('serviceWorker' in navigator) || !('Notification' in window)) return;
  if (Notification.permission !== 'granted') {
    const p = await Notification.requestPermission();
    if (p !== 'granted') return;
  }
  const reg = await navigator.serviceWorker.ready;

  const tag = `demo-${Date.now()}`; 
  await reg.showNotification('Notificación nueva: ' + new Date().toLocaleTimeString(), {
    body: 'Notificación de prueba Yucadiax',
    icon: '/icons/icon-192.svg',
    tag,
    requireInteraction: false,
    timestamp: Date.now()
  });
};



return (
<div className="grid">
<section className="card">
<h2>Bienvenido </h2>
<p>Esta PWA cumple: Splash+Home, CSR+SSG, offline, notificaciones y APIs de dispositivo.</p>
<button className="btn" onClick={sendNotification}>Probar Notificación</button>
</section>
<section className="card">
<h3>Instalación como App</h3>
<p>Aún no disponible</p>
</section>
</div>
)
}