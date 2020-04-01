const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  photoURL: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    require
  }]
});

module.exports = mongoose.model('Post', schema);
