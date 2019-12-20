const Joi = require('joi');

module.exports = {
  name: 'rates',
  path: '/api/v1/frequency',
  type: 'get',
  joiSchema: {
    body: {},
    response: {
      200: {
        description: 'OK',
        body: {
          responseCode: 200,
          responseMessage: Joi.string().required(),
          response: {}
        }
      },
      400: {
        message: 'Error Response',
        errorCode: 400
      }
    }
  }
};
