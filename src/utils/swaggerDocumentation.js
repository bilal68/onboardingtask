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