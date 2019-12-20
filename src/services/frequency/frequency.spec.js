/* eslint-disable arrow-body-style */
const httpStatus = require('http-status');
const service = require('./frequency.service');


describe('Service - rate', () => {

  beforeEach(() => { });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return the frequency', () => {
    return service.getFrequency().then((response) => {
      expect(response).toBeObject();
      expect(response).toContainKey('minutes');
    });
  });
});
