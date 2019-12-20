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
  },
  components: {
  }
};