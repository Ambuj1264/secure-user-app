const request = require('supertest');
const app = require('../index');
const User = require('../models/User');

describe('Auth Controller', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully!');
  });

  it('should login a user', async () => {
    const user = new User({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
    await user.save();

    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'john@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should return 404 for invalid email', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'invalid@example.com', password: 'password123' });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found!');
  });

  it('should return 400 for invalid password', async () => {
    const user = new User({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
    await user.save();

    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'john@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid credentials!');
  });
});