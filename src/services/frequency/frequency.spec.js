/* eslint-disable arrow-body-style */
const httpStatus = require('http-status');
const service = require('./frequency.service');


describe('Service - frequency', () => {

  beforeEach(() => { });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return the frequency', () => {
    process.env.DURATION_CRON_INDEX = '0';
    return service.getFrequency().then((response) => {
      expect(response).toBeObject();
      expect(response).toContainKey('minutes');
    });
  });

  it('should return the frequency without evn', () => {
    return service.getFrequency().then((response) => {
      expect(response).toBeObject();
      expect(response).toContainKey('minutes');
    });
  });


  it('should set the frequency', () => {
    return service.setFrequency(15).then((response) => {
      expect(response).toBeObject();
      expect(response).toContainKey('minutes');
    });
  });



});
