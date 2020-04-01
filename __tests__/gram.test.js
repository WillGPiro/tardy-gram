const { getAgent, getUser } = require('../db/data-helper');

describe('grams routes', () => {
  it('creates a gram', async() => {
    const user = await getUser({ username: 'test@test.com' });

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


});

