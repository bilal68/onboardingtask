/* eslint-disable arrow-body-style */
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../..');

describe('API /api/v1/frequency', () => {
  let body = {};

  // let server, agent;
  // beforeEach((done) => {
  //   server = app.listen(4000, (err) => {
  //     if (err) return done(err);
  //     agent = request.agent(server);
  //     done();
  //   });
  //   body = {};
  // });

  // afterEach((done) => {
  //   return server && server.close(done);
  // });

  afterAll(() => { }, 1000);

  it('GET: should integrate api /frequency', async () => {
    return await request(app)
      .get('/api/v1/frequency')
      .send(body)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('responseCode');
        expect(res.body).toHaveProperty('responseMessage');
        expect(res.body.responseCode).toBe(200);
        expect(res.body.responseMessage).not.toBe(undefined);
      });
  });

  it('POST: should integrate api /frequency', async () => {
    return await request(app)
      .post('/api/v1/frequency')
      .send(body)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body).toHaveProperty('responseCode');
        expect(res.body).toHaveProperty('responseMessage');
        expect(res.body.responseCode).toBe(200);
        expect(res.body.responseMessage).not.toBe(undefined);
      });
  });

  it('POST: should fail api /frequency', async () => {
    return request(app)
      .post(`/api/v1/frequency?minutes=415`)
      .expect(httpStatus.BAD_REQUEST)
      .then((res) => {
        console.log(`RES: ${res}`)
        expect(res.body).toHaveProperty('responseCode');
        expect(res.body).toHaveProperty('responseMessage');
        expect(res.body.responseCode).toBe(400);
        expect(res.body.responseMessage).not.toBe(undefined);
        const { response } = res.body;
        expect(response).toBeObject();
        expect(response).toHaveProperty('errors');
        expect(response.errors).toBeArray();
        expect(response.errors[0].errorCode).toEqual('api:v1:frequency:validationError');
      });
  });
});
