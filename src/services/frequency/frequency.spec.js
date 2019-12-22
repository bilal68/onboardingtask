/* eslint-disable arrow-body-style */
const service = require('./frequency.service');
const db = require('../../database/index')


describe('Service - frequency', () => {

  beforeEach(() => {
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return the frequency', async () => {
    process.env.DURATION_CRON_INDEX = '0';
    return await service.getFrequency().then((response) => {
      expect(response).toBeObject();
      expect(response).toContainKey('minutes');
    });
  });

  it('should return the frequency without evn', async () => {
    return await service.getFrequency().then((response) => {
      expect(response).toBeObject();
      expect(response).toContainKey('minutes');
    });
  });

  it('should set the frequency', async (done) => {
    db.connect().then(() => done()).catch(done);
    return await service.setFrequency(15).then(async (response) => {
      expect(response).toBeObject();
      expect(response).toContainKey('minutes');

      db.disconnect().then(() => done()).catch(done);
    });
  });
});
