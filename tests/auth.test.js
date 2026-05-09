const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../src/models/user.model');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  test('registers a new user and returns token', async () => {
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashed-pass');
    User.create.mockResolvedValue({
      _id: 'u1',
      email: 'alice@example.com',
      name: 'Alice',
      role: 'user'
    });
    jwt.sign.mockReturnValue('token-123');

    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Alice', email: 'alice@example.com', password: 'Password@123' });

    expect(res.status).toBe(201);
    expect(res.body.token).toBe('token-123');
    expect(res.body.user.email).toBe('alice@example.com');
    expect(User.findOne).toHaveBeenCalledWith({ email: 'alice@example.com' });
  });

  test('rejects login for invalid password', async () => {
    User.findOne.mockResolvedValue({
      _id: 'u1',
      email: 'alice@example.com',
      name: 'Alice',
      password: 'stored-hash',
      role: 'user'
    });
    bcrypt.compare.mockResolvedValue(false);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'alice@example.com', password: 'wrong-pass' });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('invalid credentials');
  });
});
