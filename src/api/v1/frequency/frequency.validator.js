const Joi = require('joi');
const { ARRAY_FREQUENCIES } = require('../../../utils/constants')

const get = {
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

const post = {
  name: 'rates',
  path: '/api/v1/frequency',
  type: 'get',
  joiSchema: {
    query:
      Joi.object({
        minutes: Joi.number().integer().valid(ARRAY_FREQUENCIES).default(ARRAY_FREQUENCIES[0])
      })
    ,
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

module.exports = { get, post }
