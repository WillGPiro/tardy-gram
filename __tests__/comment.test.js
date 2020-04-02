const { getAgent, getUser, getGram, getComment } = require('../db/data-helper');

describe('comment routes', () => {

  it('creates a comment', async() => {
    const user = await getUser({ username: 'test@test.com' });
    const gram = await getGram({ user: user._id });
    return getAgent()
      .post('/api/v1/comments')
      .send({
        gram: gram._id,
        comment: 'This lab was tough!' 
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          commentBy: user._id,
          gram: gram._id,
          comment: 'This lab was tough!',
          __v: 0
        });
      });
  });

  it('deletes a gram', async() => {
    const comment = await getComment();
    return getAgent()
      .delete(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual(comment);
      });
  });
});

