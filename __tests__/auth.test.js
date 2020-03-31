const { getUser, getAgent } = require('../db/data-helper');

const request = require('supertest');
const app = require('../lib/app');

describe('auth routes', () => { 
  it('signs up a user', async() => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'will@will.com',
        password: 'willWasHere',
        profilePhotoUrl: 'cat.jpg'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'will@will.com',
          profilePhotoUrl: expect.any(String),
          __v:0 
        });
      });
  });
});

