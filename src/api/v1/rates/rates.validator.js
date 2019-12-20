const Joi = require('joi');

const latestRatesValidator = {
  name: 'rates',
  path: '/api/v1/rates',
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
        description: 'Error Response',
        body: {
          responseCode: 400,
          responseMessage: Joi.string().required(),
          response: {
            errors: Joi.array().items(Joi.object().keys({
              errorCode: Joi.string().required(),
              errorTitle: Joi.string().required(),
              errorDescription: Joi.string().required(),
              errorDebugDescription: Joi.string()
            }))
          }
        }
      }
    }
  }
};

const ratesValidator = {
  name: 'rates',
  path: '/api/v1/rates',
  type: 'get',
  joiSchema: {
    query: Joi.object({
      from: Joi.date().iso().required(),
      to: Joi.date().iso().greater(Joi.ref('from')).required(),
      pageNumber: Joi.number().integer().default(1).min(1),
      pageSize: Joi.number().integer().min(10).max(100).default(20),
      sort: Joi.string().valid(['desc', 'asc']).default('desc')
    }),
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
        description: 'Error Response',
        body: {
          responseCode: 400,
          responseMessage: Joi.string().required(),
          response: {
            errors: Joi.array().items(Joi.object().keys({
              errorCode: Joi.string().required(),
              errorTitle: Joi.string().required(),
              errorDescription: Joi.string().required(),
              errorDebugDescription: Joi.string()
            }))
          }
        }
      }
    }
  }
};


module.exports = {
  latestRatesValidator, ratesValidator
};
