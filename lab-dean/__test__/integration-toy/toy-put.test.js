'use strict';

const server = require('../../lib/server.js');
const superagent = require('superagent');
require('jest');

describe('PUT /api/v1/toy', function() {
  beforeAll(() => server.start());
  afterAll(() => server.stop());

  this.mockToy = {name: 'alabama man', maker: 'cinco'};
  this.mockToyTwo = {name: 'wild wacky action bike', maker:'acme'};
  let test;

  beforeAll(() => {
    return superagent.post(':4000/api/v1/toy')
      .send(this.mockToy)
      .then(res => {
        test = res.body;
        this.repsonse = res;
      })
      .then(() => {
        console.log('test', test);
        return superagent.put(`:4000/api/v1/toy/${test._id}`)
          .send(this.mockToyTwo)  
          .then(res => this.resTwo = res);
      });
  });

  describe('Valid request and response', () => {
    it('Should respond with a status code of 204', () => {
      expect(this.resTwo.status).toEqual(204);
    });
    it('Should create a new toy object with a name, maker, and _id property', () => {
      console.log('test2', test);
      expect(test).toHaveProperty('name');
      expect(test).toHaveProperty('maker');
      expect(test).toHaveProperty('_id');
    });
  });

  describe('Invalid request and response', () => {
    beforeAll(() => {
      return superagent.put(`:4000/api/v1/note/tim`)
        .send(this.mockToytwo)
        .catch(res => this.testRes = res);
    });
    it('Should respond with a status code of 204', () => {
      expect(this.testRes.status).toEqual(404);
    });
  });
});