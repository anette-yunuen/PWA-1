import { openDB } from 'idb'


const DB_NAME = 'as-pwa-db'
const DB_VERSION = 1


export const getDB = () => openDB(DB_NAME, DB_VERSION, {
upgrade(db){
if (!db.objectStoreNames.contains('tasks')) db.createObjectStore('tasks', { keyPath: 'id' })
}
})


export async function putTasks(tasks){
const db = await getDB()
const tx = db.transaction('tasks', 'readwrite')
for (const t of tasks) await tx.store.put(t)
await tx.done
}


export async function getAllTasks(){
const db = await getDB()
return db.getAll('tasks')
}