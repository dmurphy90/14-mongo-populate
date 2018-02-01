'use strict';

const mongoose = require('mongoose');

const Customer = mongoose.Schema({
  'name' : { type: String },
  'toys' : [{type: mongoose.Schema.Types.ObjectId, ref: 'toy'}],
});

module.exports = mongoose.model('customers', Customer);