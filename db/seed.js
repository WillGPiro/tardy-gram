const chance = require('chance').Chance();
const User = require('../lib/models/User');


//Create a single known user with known info. 
module.exports = async({ usersToCreate = 5 } = {}) => {
  await User.create({
    username: 'test@test.com',
    password: 'password',
    profilePhotoUrl: 'cat.jpeg'
  });

  //Make one less random user. 
  await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.email(),
    password: chance.animal(),
    profilePhotoUrl: chance.name()
  })));
};

