/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../../../src');

describe('GET /api/v1/rates', () => {
  let body;

  beforeEach(() => {
    body = {};
  });

  afterEach(() => { });

  it('should integrate api /rates', async () => {
    return await request(app)
      .get('/api/v1/rates/latest')
      .send(body)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).toBeObject();
        expect(res.body).toHaveProperty('responseCode');
        expect(res.body).toHaveProperty('responseMessage');
        expect(res.body.responseCode).toBe(200);
        expect(res.body.responseMessage).not.toBe(undefined);
      });
  });
});
