const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const Todo = require('../models/Todo');

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
});

afterEach(async () => {
  await Todo.deleteMany();
});

describe('Todo API', () => {
  test('POST /api/todos - create a todo', async () => {
    const payload = {
      title: 'Test Todo',
      description: 'This is a test todo',
      completed: false,
    };

    const res = await request(app)
      .post('/api/todos')
      .send(payload);

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(payload);
  });

  test('GET /api/todos - get all todos', async () => {
    await Todo.create([
      { title: 'Todo 1', description: 'First todo' },
      { title: 'Todo 2', description: 'Second todo' },
    ]);

    const res = await request(app).get('/api/todos');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  test('PUT /api/todos/:id - update a todo', async () => {
    const todo = await Todo.create({
      title: 'Old Title',
      description: 'Old Description',
      completed: false,
    });

    const res = await request(app)
      .put('/api/todos/' + todo._id)
      .send({ title: 'New Title', completed: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
    expect(res.body.title).toBe('New Title');
  });

  test('DELETE /api/todos/:id - delete a todo', async () => {
    const todo = await Todo.create({
      title: 'To be deleted',
    });

    const res = await request(app).delete('/api/todos/' + todo._id);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Todo deleted successfully' });
    expect(await Todo.countDocuments()).toBe(0);
  });
});
