'use strict';
 
const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

describe('POST /api/v1/toy', function() {
  beforeAll(() => server.start());
  afterAll(() => server.stop());

  this.mockToy = {name: 'alabama man', maker: 'cinco'};

  describe('Valid request and response', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/toy')
        .send(this.mockToy)
        .then(res => this.response = res);
    });


    it('Should respond with a status code of 201', () => {
      expect(this.response.status).toEqual(201);
    });
    it('Should create a new toy object with a name, maker, and _id property', () => {
      expect(this.response.body).toHaveProperty('name');
      expect(this.response.body).toHaveProperty('maker');
      expect(this.response.body).toHaveProperty('_id');
    });
  });

  describe('Invalid request and response', () => {
    it('Should respond with a status code of 404', () => {
      return superagent.post(':4000/api/v1/nope')
        .send(this.mockToy)
        .catch(err => {
          expect(err.status).toEqual(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('Should respond with a status of 400', () => {
      return superagent.post(':4000/api/v1/toy')
        .send({})
        .catch(err => expect(err.status).toEqual(400));
    });
  });
});