/* eslint-disable arrow-body-style */
const MockReq = require('mock-express-request');
const MockRes = require('mock-express-response');
const httpStatus = require('http-status');
const { latest, list } = require('../../../services/rate');
const controller = require('./rates.controller');

jest.mock('../../../services/rate');

describe('Test Rate', () => {

  const req = new MockReq();
  const res = new MockRes();

  beforeEach(() => { });

  afterEach(() => { jest.resetAllMocks() });

  it('should do unit test for latest rate', () => {
    latest.mockImplementation(() => Promise.resolve({}));
    const status = jest.spyOn(res, 'status');
    const json = jest.spyOn(res, 'json');
    return controller.latest(req, res).then(() => {
      expect(status).toBeCalledWith(httpStatus.OK);
      expect(json).toBeCalledWith(expect.objectContaining({
        responseCode: httpStatus.OK,
        responseMessage: expect.any(String),
        response: expect.any(Object)
      }));
    });
  });

  it('should do unit test for rates', () => {
    list.mockImplementation(() => Promise.resolve([]));
    const status = jest.spyOn(res, 'status');
    const json = jest.spyOn(res, 'json');
    return controller.list(req, res).then(() => {
      expect(status).toBeCalledWith(httpStatus.OK);
      expect(json).toBeCalledWith(expect.objectContaining({
        responseCode: httpStatus.OK,
        responseMessage: expect.any(String),
        response: expect.any(Array)
      }));
    });
  });

});
