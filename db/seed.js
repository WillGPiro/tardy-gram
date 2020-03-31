const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Note = require('../lib/models/Note');

//Create a single known user with known info. 
module.exports = async({ usersToCreate = 5, notesToCreate = 100 } = {}) => {
  const loggedInUser = await User.create({
    username: 'test@test.com',
    password: 'password',
    profilePhotoUrl: 'cat.jpeg'
  });

  //Make one less random user. 
  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    email: chance.email(),
    password: chance.animal()
  })));

