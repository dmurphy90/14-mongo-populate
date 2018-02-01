'use strict';

const server = require('../../lib/server.js');
const superagent = require('superagent');
require('jest');

describe('DELETE /api/v1/toy', function () {
  beforeAll(() => server.start());
  afterAll(() => server.stop());

  this.mockToy = {name: 'alabama man', maker: 'cinco'};
  let test;

  beforeAll(() => {
    return superagent.post(':4000/api/v1/toy')
      .send(this.mockToy)
      .then(res => {
        test = res.body;
        this.response = res;
      })
      .then(() => {
        return superagent.delete(`:4000/api/v1/toy/${test._id}`)
          .then(res => this.testRes = res);
      });
  });

  describe('Valid request and response', () => {
    it('Should respond with a status code of 204', () => {
      expect(this.testRes.status).toEqual(204);
      expect(this.testRes.body).toEqual({});
    });
  });

  describe('Invalid request and reponse', () => {
    it('Should respond with a status code of 404 with a bad request path', () => {
      return superagent.delete(':4000/api/v1/toy/tim')
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
    it('Should respond with a status code of 404 with a bad request body', () => {
      return superagent.delete(':4000/api/v1/toy')
        .send({})
        .catch(err => expect(err.status).toEqual(404));
    });
  });
});