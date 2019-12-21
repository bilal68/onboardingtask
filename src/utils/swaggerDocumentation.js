const API_SERVER_URL = require('../config/vars').swagger_url

module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Search4Ex',
    description: 'Searchmetrics code assessment test API',
    termsOfService: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    contact: {
      name: 'Naeem',
      email: 'naeemark@gmail.com',
      url: 'https://www.linkedin.com/in/naeemark'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: API_SERVER_URL,
      description: 'API-Server'
    }
  ],
  security: [
    {
      ApiKeyAuth: []
    }
  ],
  tags: [
    {
      name: 'GET/POST operations'
    }
  ],
  paths: {
    '/api/v1/rates/latest': {
      get: {
        tags: ['Rates'],
        description: 'Get Latest Rates',
        operationId: 'getLatestRate',
        responses: {
          '200': {
            description: 'Latest rate was obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Latest Rate'
                }
              }
            }
          }
        }
      },
    },
    '/api/v1/rates': {
      get: {
        tags: ['Rates'],
        description: 'Get Rates by Duration',
        operationId: 'getRateByDuration',
        parameters: [
          {
            name: 'from',
            in: 'query',
            required: true,
            schema: {
              type: 'string',
              format: 'date-time',
              default: '2018-03-20T09:12:28Z'
            }
          },
          {
            name: 'to',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
              format: 'date-time',
              default: '2018-03-25T09:12:28Z'
            }
          },
          {
            name: 'sort',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
              enum: ['desc', 'asc'],
              default: 'desc'
            },
          },
          {
            name: 'pageNumber',
            in: 'query',
            required: false,
            schema: {
              type: 'integer',
              default: 1
            },
          },
          {
            name: 'pageSize',
            description: 'The number of items to return. *Min:10, Max:100*',
            in: 'query',
            required: false,
            schema: {
              type: 'integer',
              minimum: 10,
              maximum: 100,
              default: 20
            },
          }
        ],
        responses: {
          '200': {
            description: 'Users were obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Rates by Duration'
                }
              }
            }
          },
          '400': {
            description: 'Missing parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'some parameter missing',
                  errorCode: 'missing_parameters'
                }
              }
            }
          }
        }
      },
    },
    '/api/v1/frequency': {
      get: {
        tags: ['Cron Frequency'],
        description: 'Get Sync Frequency',
        operationId: 'getFrequency',
        responses: {
          '200': {
            description: 'Frequency was obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Frequency'
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Cron Frequency'],
        description: 'Sets Frequency',
        operationId: 'setFrequency',
        parameters: [{
          name: 'minutes',
          in: 'query',
          schema: {
            type: 'integer',
            enum: [1, 2, 3, 5, 10, 15, 30, 45],
            default: 5
          },
          required: true
        }],
        responses: {
          '200': {
            description: 'New frequency is set to the cron'
          },
          '400': {
            description: 'Invalid parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Invalid values provided',
                  errorCode: 'invalid_parameters'
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      'Latest Rate': {
        type: 'object',
        properties: {
          responseCode: { type: 'integer', example: 200 },
          responseMessage: { type: 'string' },
          response: { $ref: '#/components/schemas/Rate' }
        }
      },
      'Rates by Duration': {
        type: 'object',
        properties: {
          responseCode: { type: 'integer', example: 200 },
          responseMessage: { type: 'string' },
          response: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Rate'
            }
          }
        }
      },
      Rate: {
        type: 'object',
        properties: {
          currencyName: {
            type: 'String',
            description: 'Name of currency',
            example: 'US Dollar'
          },
          symbol: {
            type: 'String',
            description: 'Symbol of currency',
            example: '$'
          },
          price: {
            type: 'Double',
            description: 'Exchange price for ONE bitcoin',
            example: 7871.80
          },
          createdAt: {
            type: 'Timestamp',
            description: 'Database object creation time',
            example: '2019-12-20T14:58:45.505Z'
          },
          id: {
            type: 'String',
            description: 'database id for the object',
            example: '5dfce1a58154eb97993bf570'
          },
        }
      },
      Frequency: {
        type: 'object',
        properties: {
          minutes: {
            type: 'integer',
            description: 'Number of minutes',
            example: 10
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          },
          errorCode: {
            type: 'string'
          }
        }
      }
    },
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key'
      }
    }
  }
};