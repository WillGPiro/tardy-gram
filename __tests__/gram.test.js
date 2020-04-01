const { getAgent, getUser, getGrams } = require('../db/data-helper');
const request = require('supertest');
const app = require('../lib/app');
console.log('==========', getGrams);
describe('grams routes', () => {
  it('creates a gram', async() => {
    const user = await getUser({ username: 'test@test.com' });
    console.log('=====00======', user);
    return getAgent()
      .post('/api/v1/grams')
      .send({
        photoURL: 'http://placekitten.com/200/300',
        caption: 'Just adorable',
        tags: ['#catlyfe, #killwithcute']
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: user._id,
          photoURL: 'http://placekitten.com/200/300',
          caption: 'Just adorable',
          tags: ['#catlyfe, #killwithcute'],
          __v: 0
        });
      });
  });

  it('gets all grams', async() => {
    const grams = await getGrams();
    return request(app)
      .get('/api/v1/grams')
      .then(res => {
        expect(res.body).toEqual(grams);
      });
  });




});

