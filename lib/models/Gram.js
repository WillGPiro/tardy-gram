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
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

schema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'gram'
});

schema.statics.top10Comments = function() {
  return this
    .model('Comment')
    .aggregate([
      {
        '$lookup': {
          'from': 'comments', 
          'localField': '_id', 
          'foreignField': 'gram', 
          'as': 'comments'
        }
      }, {
        '$project': {
          '_id': true, 
          'user': true, 
          'photoURL': true, 
          'caption': true, 
          'numComments': {
            '$size': '$comments'
          }
        }
      }, {
        '$sort': {
          'numComments': -1
        }
      }, {
        '$limit': 10
      }
    ]);
};


module.exports = mongoose.model('Gram', schema);
