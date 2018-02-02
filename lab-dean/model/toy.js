'use strict';

const Customer = require('./customer.js');
const mongoose = require('mongoose');

const Toy = mongoose.Schema({
  'toy_id' : { type: String },
  'toyName' : { type: String },
  'maker' : { type: String},
  'customer': {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'customer'},
}, { timestamps: true});

Toy.pre('save', function() {
  Customer.findById(this._id)
    .then(customer => {
      customer.toys = [...new Set(customer.toys).add(this._id)];
      Customer.findByIdAndUpdate(this._id, { toys: customer.toys });
    })
    .then(next)
    .catch(() => next(new Error('Validation error. Failed to save toy.')));
});


Toy.post('remove', function(doc, next) {
  Customer.findById(doc._id)
    .then(customer => {
      customer.toys = customer.toys.filter(a => a.toString() !== doc._id.toString);
      Customer.findByIdAndUpdate(this._id, { toys: customer.toys });
    })
    .then(next)
    .catch(next);
});

module.exports = mongoose.model('toys', Toy);