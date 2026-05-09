const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user.model');
const Note = require('../src/models/note.model');
const jwt = require('jsonwebtoken');

jest.mock('../src/models/user.model');
jest.mock('../src/models/note.model');
jest.mock('jsonwebtoken');

describe('Notes API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  test('blocks unauthenticated access to notes list', async () => {
    const res = await request(app).get('/api/notes');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });

  test('forbids reading another user note when not admin', async () => {
    jwt.verify.mockReturnValue({ id: 'u1' });
    User.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue({ _id: 'u1', role: 'user', email: 'alice@example.com' })
    });
    Note.findById.mockResolvedValue({
      _id: 'n1',
      owner: 'u2',
      title: 'Private',
      content: 'Not yours'
    });

    const res = await request(app)
      .get('/api/notes/n1')
      .set('Authorization', 'Bearer valid-token');

    expect(res.status).toBe(403);
    expect(res.body.message).toBe('Forbidden');
  });
});
