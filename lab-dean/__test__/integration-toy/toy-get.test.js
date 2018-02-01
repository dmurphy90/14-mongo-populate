'use strict';

const server = require('../../lib/server.js');
const superagent = require('superagent');
require('jest');

describe('GET /api/v1/toy', function () {
  beforeAll(() => server.start());
  afterAll(() => server.stop());

  this.mockToy = {name: 'alabama man', maker: 'cinco'};
  this.mockToyTwo = {name: 'wild wacky action bike', maker:'acme'};
  
  beforeAll(() => {
    return superagent.post(':4000/api/v1/toy')
      .send(this.mockToy)
      .then(() => {
        return superagent.post(':4000/api/v1/toy')
          .send(this.mockToy2)
          .then(res => {
            this.response = res;
          });
      });
  });

  describe('Valid request and response for GET all', () => {
    beforeAll(() => {
      return superagent.get(':4000/api/v1/toy')
        .then(res => this.response = res);
    });
    it('Should respond with a status code of 200 on a valid request', () => {
      expect(this.response.status).toEqual(200);
    });
    it('Should return an array of 2 toy objects and match their names', () => {
      expect(this.response.body[0]).toMatch(/[a-f]/);
    });
  });

  describe('Valid request and response for GET one', () => {
    let test;
    beforeAll(() => {
      return superagent.post(':4000/api/v1/toy')
        .send(this.mockToy)
        .then(res => {
          test = res.body;
          this.repsonse = res;
        })
        .then(() => {
          return superagent.get(`:4000/api/v1/toy/${test._id}`)
            .then(res => this.response = res);
        });
    });
    it('Should respond with a status code of 200', () => {
      expect(this.response.status).toBe(200);
    });
    it('Should return an object with the correct name and maker', () => {
      expect(test.name).toMatch(/alabama/);
      expect(test.maker).toMatch(/cinco/);
    });
  });

  describe('Invalid request and response for GET all', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/toy')
        .send(this.mockToy)
        .then(res => this.response = res)
        .then(() => {
          return superagent.get(`:4000/api/v1/nope`)
            .catch(err => this.res = err);
        });
    });
    it('Should respond with a status code of 404', () => {
      expect(this.res.status).toEqual(404);
    });
  });

  describe('Invalid request and response for GET one', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/toy')
        .send(this.mockToy)
        .then(res => this.response = res)
        .then(() => {
          return superagent.get(`:4000/api/v1/note/blerp`)
            .catch(err => this.res = err);
        });
    });
    it('Should respond with a status code of 404', () => {
      expect(this.res.status).toBe(404);
    });
  });
});