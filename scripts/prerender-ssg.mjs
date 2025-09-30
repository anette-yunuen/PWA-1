import { writeFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'


const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Acerca (SSG) — Yucadiax PWA</title>
<link rel="manifest" href="/manifest.webmanifest" />
<meta name="theme-color" content="#12b886" />
<style>body{margin:0;font-family:system-ui;background:#0b1b2b;color:#e7f5ff} .card{max-width:760px;margin:40px auto;background:#0f253a;border:1px solid #11314d;border-radius:16px;padding:20px}</style>
</head>
<body>
<div class="card">
<h1>Acerca (SSG)</h1>
<p>Esta página fue generada del lado del servidor en el momento del build (SSG) y se sirve como HTML estático.</p>
<p>Fecha de generación: ${new Date().toISOString()}</p>
<p>Al entrar directamente a <code>/ssg/</code> sin JS verás este contenido totalmente renderizado.</p>
<p><a href="/">Volver al Home</a></p>
</div>
</body>
</html>`


const out = 'dist/ssg/index.html'
await mkdir(dirname(out), { recursive: true })
await writeFile(out, html)
console.log('[SSG] Escribí', out)