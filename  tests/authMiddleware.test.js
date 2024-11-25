// tests/authMiddleware.test.js
const request = require('supertest');
const app = require('../index');

describe('Auth Middleware', () => {
  it('should authenticate a valid token', async () => {
    const token = 'valid-token';
    const response = await request(app)
      .get('/api/users/1')
      .set("Authorization", token);

    expect(response.status).toBe(200);
  });

  it('should return 401 for invalid token', async () => {
    const token = 'invalid-token';
    const response = await request(app)
      .get('/api/users/1')
      .set("Authorization", token);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Access denied!');
  });

  it('should return 400 for missing token', async () => {
    const response = await request(app)
      .get('/api/users/1');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid token!');
  });
});