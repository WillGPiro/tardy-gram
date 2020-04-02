const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Gram = require('../models/Gram');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Gram
      .create({ ...req.body, user: req.user._id })
      .then(gram => res.send(gram))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Gram
      .find()
      .then(grams => res.send(grams))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Gram
      .findById(req.params.id)
      .populate('user._id')
      .populate('comments')
      .then(gram => res.send(gram))
      .catch(next);
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    Gram
      .findOneAndUpdate({
        _id: req.params.id,
        author: req.user._id
      }, req.body, { new: true })
      .then(gram => res.send(gram))
      .catch(next);
  });






