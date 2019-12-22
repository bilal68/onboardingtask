/* eslint-disable arrow-body-style */
const MockReq = require('mock-express-request');
const MockRes = require('mock-express-response');
const httpStatus = require('http-status');
const { getFrequency, setFrequency } = require('../../../services/frequency');
const controller = require('./frequency.controller');

jest.mock('../../../services/frequency');


describe('Test frequency', () => {
  const req = new MockReq();
  const res = new MockRes();

  beforeEach(() => { });

  afterEach(() => { jest.resetAllMocks() });

  it('should do unit test for frequency', () => {
    getFrequency.mockImplementation(() => Promise.resolve({}));
    const status = jest.spyOn(res, 'status');
    const json = jest.spyOn(res, 'json');
    return controller.get(req, res).then(() => {
      expect(status).toBeCalledWith(httpStatus.OK);
      expect(json).toBeCalledWith(expect.objectContaining({
        responseCode: httpStatus.OK,
        responseMessage: expect.any(String),
        response: expect.any(Object)
      }));
    });
  });

  it('should do unit test for frequency', () => {
    setFrequency.mockImplementation(() => Promise.resolve({}));
    const status = jest.spyOn(res, 'status');
    const json = jest.spyOn(res, 'json');
    return controller.post(req, res).then(() => {
      expect(status).toBeCalledWith(httpStatus.OK);
      expect(json).toBeCalledWith(expect.objectContaining({
        responseCode: httpStatus.OK,
        responseMessage: expect.any(String),
        response: expect.any(Object)
      }));
    });
  });

});
