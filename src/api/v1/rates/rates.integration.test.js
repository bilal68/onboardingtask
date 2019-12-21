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

  it('should integrate api /rates/latest', async () => {
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

  it('should integrate api /rates', async () => {
    return await request(app)
      .get(`/api/v1/rates?from=2019-12-20T07:40:17Z&to=2019-12-20T08:40:17Z`)
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

  it('should fail api /rates', async () => {
    return await request(app)
      .get(`/api/v1/rates`)
      .send(body)
      .expect(httpStatus.BAD_REQUEST)
      .then((res) => {
        expect(res.body).toBeObject();
        expect(res.body).toHaveProperty('responseCode');
        expect(res.body).toHaveProperty('responseMessage');
        expect(res.body.responseCode).toBe(400);
        expect(res.body.responseMessage).not.toBe(undefined);
        const { response } = res.body;
        expect(response).toBeObject();
        expect(response).toHaveProperty('errors');
        expect(response.errors).toBeArray();
        expect(response.errors[0].errorCode).toEqual('api:v1:rates:validationError');
      });
  });
});
