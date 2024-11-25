// tests/userController.test.js
const request = require('supertest');
const app = require('../index');
const User = require('../models/User');

describe('User Controller', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should get user profile', async () => {
    const user = new User({ name: 'John Doe', email: 'john@example.com' });
    await user.save();

    const response = await request(app)
      .get(`/api/users/${user._id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('John Doe');
  });

  it('should return 404 for invalid user id', async () => {
    const response = await request(app)
      .get('/api/users/invalidid');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found!');
  });
});