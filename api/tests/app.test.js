const request = require('supertest');
const app = require('../app');

describe('Pruebas de integración de la API', () => {
  test('GET /health debe responder 200 y status ok', async () => {
    const res = await request(app).get('/health');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('service', 'yucadiax-api');
  });

  test('GET /api/tasks debe regresar un arreglo', async () => {
    const res = await request(app).get('/api/tasks');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/tasks debe crear una nueva tarea', async () => {
    const newTitle = 'Tarea creada desde test';

    const res = await request(app)
      .post('/api/tasks')
      .send({ title: newTitle });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', newTitle);
    expect(res.body).toHaveProperty('done', false);
  });
});
