const path = require('path');

// import .env variables
require('dotenv-safe').config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo_db_uri: process.env.MONGO_DB_URI,
  mongo_db_args: { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  swagger_url: process.env.SWAGGER_SERVER_URL,
  serviceName: 'search4ex-service',
  http: {
    timeout: 5000,
    responseType: 'json',
    responseEncoding: 'utf8',
    retries: 3
  }
};
