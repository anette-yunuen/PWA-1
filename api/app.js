const express = require('express');

const app = express();
app.use(express.json());

// "Base de datos" en memoria
const tasks = [
  { id: 1, title: 'Tarea de ejemplo', done: false },
];

// Endpoint API 
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'yucadiax-api' });
});

// Lista de tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Obtener una task por id
app.get('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(task);
});

// Crear una nueva task
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'title is required' });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    done: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

module.exports = app;
