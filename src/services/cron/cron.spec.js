/* eslint-disable arrow-body-style */
const httpStatus = require('http-status');
const service = require('./cron.service');
const db = require('../../database/index')


describe('Service - cron', () => {

  beforeEach((done) => {
    db.connect().then(() => done()).catch(done);
  });

  afterEach((done) => {
    db.disconnect().then(() => done()).catch(done);
    jest.resetAllMocks();
  });

  it('should fetch rate in cron', async () => {
    return await service.fetchRates().then((result) => {
      expect(result).toBeTrue();
    });
  });

  it('should save rate', async () => {
    const sampleDataUsd = { last: 7163.3, symbol: "$" }
    return await service.persistRate(sampleDataUsd).then((result) => {
      expect(result).toBeTrue();
    })
  });

});
