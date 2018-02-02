'use strict';

const Toy = require('../model/toy.js');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler.js');
const debug = require('debug')('http:Route-Toys');

module.exports = function(router) {

  router.route('/toy/:_id?')
    .get((req, res) => {
    
      if(req.params._id) {
        debug('Finding a specific toy');
        return Toy.findById(req.params._id)
          .then(toy => res.status(200).json(toy))
          .catch(err => errorHandler(err, res));
      }
      debug('Finding all the toys');
      return Toy.find()
        .then(toys => toys.map(toy => toy._id)) 
        .then(toys => res.status(200).json(toys))
        .catch(err => errorHandler(err, res));
    })

    .post(bodyParser, (req, res) => {
      debug('Creating a toy');
      new Toy(req.body).save()
        .then(toy => res.status(201).json(toy))
        .catch(err => errorHandler(err, res));
    })

    .put(bodyParser, (req, res) => {
      debug('Updating a toy');
      return Toy.findByIdAndUpdate(req.params._id, req.body)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })

    .delete((req, res) => {
      debug('Deleting a toy');
      if(!req.params._id) errorHandler(new Error('Validation Error: ID required to delete item.'), res);
      return Toy.findById(req.params._id)
        .then(toy => toy.remove())
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};