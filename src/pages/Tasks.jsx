import React, { useEffect, useState } from 'react'
import { useOnline } from '../utils/online'
import { putTasks, getAllTasks } from '../utils/db'


// JSONPlaceholder (sin API key) como fuente remota
const REMOTE = 'https://jsonplaceholder.typicode.com/todos?_limit=10'


export default function Tasks(){
const online = useOnline()
const [tasks, setTasks] = useState([])
const [source, setSource] = useState('')


useEffect(() => { (async () => {
try {
if (online) {
const res = await fetch(REMOTE)
const data = await res.json()
setTasks(data)
setSource('remoto (JSONPlaceholder) + cache IDB')
await putTasks(data)
} else {
const cached = await getAllTasks()
setTasks(cached)
setSource('offline (IndexedDB)')
}
} catch (e){
const cached = await getAllTasks()
setTasks(cached)
setSource('fallback (IndexedDB)')
}
})() }, [online])


return (
<div className="card">
<h2>Tareas (CSR)</h2>
<p>Fuente actual: <strong>{source || 'cargando…'}</strong></p>
<ul>
{tasks.map(t => (
<li key={t.id}>
<input type="checkbox" defaultChecked={!!t.completed} readOnly/>
{' '}{t.title}
</li>
))}
</ul>
</div>
)
}