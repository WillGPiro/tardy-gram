const { getAgent, getUser, getGrams, getGram, getComments } = require('../db/data-helper');
const request = require('supertest');
const app = require('../lib/app');

describe('grams routes', () => {

  it('creates a gram', async() => {
    const user = await getUser({ username: 'test@test.com' });
    
    return getAgent()
      .post('/api/v1/grams')
      .send({
        photoURL: 'http://placekitten.com/200/300',
        caption: 'Just adorable',
        tags: ['#catlyfe, #killwithcute'],
        author: user._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: user._id,
          photoURL: 'http://placekitten.com/200/300',
          caption: 'Just adorable',
          tags: ['#catlyfe, #killwithcute'],
          author: expect.any(String),
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

  it('gets a gram by id', async() => {
    const user = await getUser({ username: 'test@test.com' });
    const gram = await getGram({ author: user._id });
    const comments = await getComments({ gram: gram._id });
    
    return getAgent()
      .get(`/api/v1/grams/${gram._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...gram,
          author: user._id,
          comments: expect.arrayContaining(comments)
        });
      });
  });

  it('updates a gram by id', async() => {
    const user = await getUser({ username: 'test@test.com' });
    const gram = await getGram({ author: user._id });
    
    return getAgent()
      .delete(`/api/v1/grams/${gram._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...gram,
          caption: 'I should have never said that #sorry'
        });
      });
  });
});

