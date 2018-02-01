'use strict';

const Customer = require('./customer.js');
const mongoose = require('mongoose');

const Toy = mongoose.Schema({
  'toy_id' : { type: String },
  'name' : { type: String },
  'maker' : { type: String},
  'customer': {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'customer'},
}, { timestamps: true});

Toy.pre('save', function() {
  Customer.findById(this.customer)
    .then(customer => {
      customer.toys = [...new Set(customer.toys).add(this._id)];

      customer.save();
    })
    .then(next)
    .catch(() => next(new Error('Validation error. Failed to save toy.')));
});

// This does not work yet, wait for Scott to fix
// Toy.post('remove', function(doc, next) {
//   Customer.findById(doc.customer)
//     .then(customer => {
//       customer.toys = customer.toys.filter(a => doc._id !== a);
//       customer.save();
//     })
//     .then(next)
//     .catch(next);
// });

module.exports = mongoose.model('toys', Toy);