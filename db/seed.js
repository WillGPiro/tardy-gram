const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Gram = require('../lib/models/Gram');
const Comment = require('../lib/models/Comment');


//Create a single known user with known info. 
module.exports = async({ usersToCreate = 5, gramsToCreate = 50, commentsToCreate = 100 } = {}) => {
  const loggedInUser =  await User.create({
    username: 'test@test.com',
    password: 'password',
    profilePhotoUrl: 'cat.jpeg'
  });

  //Make one less random user. 
  
  const users =  await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.email(),
    password: chance.animal(),
    profilePhotoUrl: chance.name()
  })));

  const grams = await Gram.create([...Array(gramsToCreate)].map(() => ({
    user: chance.weighted([loggedInUser, ...users], [2, ...users.map(() => 1)])._id,
    photoURL: chance.sentence,
    caption: chance.url,
    tags: [chance.name],
    author: chance.weighted([loggedInUser, ...users], [2, ...users.map(() => 1)])._id,
  })));

  await Comment.create([...Array(commentsToCreate)].map(() => ({
    commentBy: chance.weighted([loggedInUser, ...users], [2, ...users.map(() => 1)])._id,
    gram: chance.pickone(grams),
    comment: chance.sentence()
  })));
};

