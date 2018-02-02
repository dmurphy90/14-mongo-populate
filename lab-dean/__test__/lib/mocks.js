'use strict';

const faker = require('faker');
const Customer = require('../../model/customer.js');
const Toy = require('../../model/toy.js');

const mock = module.exports = {};

// Customer Mocks - One, Many, RemoveAll
mock.customer = {};

mock.customer.createOne = () => new Customer({ name: faker.name.firstName() }).save();

mock.customer.createMany = n =>
  Promise.all(new Array(n).fill(0).map(mock.customer.createOne));

mock.customer.removeAll = () => Promise.all([Customer.remove()]);


// Toy Mocks - One, Many, RemoveAll
mock.toy = {};

mock.toy.createOne = () => {
  let result = {};

  return mock.customer.createOne()
    .then(customer => {
      result.customer = customer;
      return new Toy({
        toyName: faker.commerce.productName(),
        maker: faker.company.companyName(),
        customer: customer._id.toString(),
      }).save();
    })
    .then(toy => result.toy = toy)
    .then(() => result);
};

mock.toy.createMany = n => {
  let result = {};

  return mock.customer.createOne()
    .then(customer => {
      result.customer = customer;
      let toyProms = new Array(n).fill(0).map(() => new Toy({
        toyName: faker.commerce.productName(),
        maker: faker.company.companyName(),
        customer: customer._id.toString(),
      }).save());
      return Promise.all(toyProms);
    })
    .then(toys => result.toys = toys)
    .then(() => result);
};

mock.toy.removeAll = () => Promise.all([Toy.remove()]);