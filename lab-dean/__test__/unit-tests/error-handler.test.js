'use strict';

const test = require('../../lib/error-handler.js');
require('jest');

describe('Error Handler', function () {
  this.validate = new Error('Validation error: Cannot create toy object, name and maker required.');
  this.res = { status: function(status){this.statusCode = status; return this; }, send: function(msg){this.message = msg; return this;}};
  this.enoent = new Error('enoent');
  this.pathError = new Error('path error');
  this.fail = new Error('fail');
  this.objectId = new Error('objectid failed');
  this.duplicate = new Error('duplicate key');

  it('Should respond with a status of 400 on a validation error', () => {
    let errRes = test(this.validate, this.res);
    expect(errRes.statusCode).toEqual(400);
  });
  it('Should respond with a status of 404 on an enoent error', () => {
    let errRes = test(this.enoent, this.res);
    expect(errRes.statusCode).toEqual(404);
  });
  it('Should respond with a status of 404 on a path error', () => {
    let errRes = test(this.pathError, this.res);
    expect(errRes.statusCode).toEqual(404);
  });
  it('Should respond with a status of 500 on a fail error', () => {
    let errRes = test(this.fail, this.res);
    expect(errRes.statusCode).toEqual(500);
  });
  it('Should respond with a status of 404 on an object ID error', () => {
    let errRes = test(this.objectId, this.res);
    expect(errRes.statusCode).toEqual(404);
  });
  it('Should respond with a status of 409 on a duplicate error', () => {
    let errRes = test(this.duplicate, this.res);
    expect(errRes.statusCode).toEqual(409);
  });
});