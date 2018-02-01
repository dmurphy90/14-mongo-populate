'use strict';

const Customer = require('../model/customer.js');
const bodyParser = require('body-parser').json();
const debug = require('debug')('http:Route-Toys');
const errorHandler = require('../lib/error-handler.js');

module.exports = function(router) {
  router.route('/customer/:_id?')
    .get((req, res) => {
      if(req.params._id) {
        debug('Finding a specific customer');
        return Customer.findById(req.params._id)
          .then(customer => res.status(200).json(customer))
          .catch(err => errorHandler(err, res));
      }

      debug('Finding all customers');
      return Customer.find()
        .then(customers => customers.map(a => ({_id: a._id, name: a.name})))
        .then(ids => res.status(200).json(ids))
        .catch(err => errorHandler(err, res));
    })

    .post(bodyParser, (req, res) => {
      debug('Creating a customer');
      new Customer(req.body).save()
        .then(customer => res.status(201).json(customer))
        .catch(err => errorHandler(err, res));
    })

    .put(bodyParser, (req, res) => {
      debug('Updating customer');
      return Customer.findByIdAndUpdate(req.params._id, req.body)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })

    .delete((req, res) => {
      debug('Deleting customer');
      return Customer.findByIdAndRemove(req.params._id)
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    });
};