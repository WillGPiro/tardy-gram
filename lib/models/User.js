const mongoose = require('mongoose');
const { hashSync, compare } = require('bcryptjs');
const { sign, verify } = require('jsonwebtoken');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  profilePhotoUrl: {
    type: String,
    required: false
  }, 
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash;
    }
  }
});

//Hash password.
schema.virtual('password').set(function(password) {
  const hash = hashSync(password, Number (process.env.SALT_ROUNDS) || 14);
  this.passwordHash = hash;
});

schema.statics.authorize = async function({ username, password }) {
  const user = await this.findOne({ username });
  if(!user) {
    const error = new Error('Invalid username/password');
    error.status = 401;
    throw error;
  }
  //If we have a matching user use employ bcrypt compare matching password. 
  const matchingPasswords = await compare(password, user.passwordHash);
  if(!matchingPasswords) {
    const error = new Error('Invalid username/password');
    error.status = 403;
    throw error;
  }
  
  return user;
};
//Ensure user stays logged in with authToken. Exp. in 24 hrs. 
schema.methods.authToken = function() {
  const token = sign({ payload: this.toJSON() }, process.env.APP_SECRET, {
    expiresIn: '24h'
  });

  return token;
};

module.exports = mongoose.model('User', schema);

