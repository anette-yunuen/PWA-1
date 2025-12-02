import React, { useEffect, useRef, useState } from 'react'


export default function Device(){
const videoRef = useRef(null)
const canvasRef = useRef(null)
const [pos, setPos] = useState(null)
const [motion, setMotion] = useState(null)


// Para Cámara
const startCamera = async () => {
try {
const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
videoRef.current.srcObject = stream
await videoRef.current.play()
} catch(err){ alert('No se pudo acceder a la cámaraa: ' + err.message) }
}


const captureFrame = () => {
const v = videoRef.current, c = canvasRef.current
if (!v || !c) return
c.width = v.videoWidth; c.height = v.videoHeight
const ctx = c.getContext('2d')
ctx.drawImage(v, 0, 0)
}

// Para GPS
const getLocation = () => {
if (!('geolocation' in navigator)) return alert('Geoloc no soportada')
navigator.geolocation.getCurrentPosition(p => setPos(p.coords), err => alert(err.message))
}


// Para Acelerómetro 
useEffect(() => {
const handler = (e) => {
setMotion({ x: e.accelerationIncludingGravity?.x, y: e.accelerationIncludingGravity?.y, z: e.accelerationIncludingGravity?.z })
}
window.addEventListener('devicemotion', handler)
return () => window.removeEventListener('devicemotion', handler)
}, [])


return (
<div className="grid">
<section className="card">
<h2>Cámara</h2>
<div style={{display:'grid', gap:8}}>
<video ref={videoRef} playsInline style={{width:'100%', borderRadius:12, background:'#000'}} />
<div>
<button className="btn" onClick={startCamera}>Iniciar cámara</button>{' '}
<button className="btn secondary" onClick={captureFrame}>Capturar frame</button>
</div>
<canvas ref={canvasRef} style={{width:'100%', borderRadius:12, background:'#111'}} />
</div>
</section>


<section className="card">
<h2>Ubicación (GPS)</h2>
<button className="btn" onClick={getLocation}>Obtener ubicación</button>
{pos && (
<p>Lat: {pos.latitude.toFixed(5)}, Lng: {pos.longitude.toFixed(5)} — <a href={`https://maps.google.com/?q=${pos.latitude},${pos.longitude}`} target="_blank">Ver en mapa</a></p>
)}
</section>


<section className="card">
<h2>Acelerómetro</h2>
<p>x: {motion?.x?.toFixed?.(2) ?? '—'} | y: {motion?.y?.toFixed?.(2) ?? '—'} | z: {motion?.z?.toFixed?.(2) ?? '—'}</p>
</section>
</div>
)
}
