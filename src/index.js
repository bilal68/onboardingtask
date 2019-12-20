const async = require('async');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const app = require('./config/express');
const startupBoot = require('./boot');
const { logger } = require('./utils/logger');
const { startCron } = require('./services/cron');
const { mongo_db_uri, mongo_db_args } = require('./config/vars');
const database = require('./database')

// Connect to Database
database.connect(mongo_db_uri, mongo_db_args)

const startupTasks = [];
startupBoot.forEach((boot) => {
  startupTasks.push(async.apply(boot, app));
});

async.waterfall(startupTasks, (err) => {
  if (err) {
    logger.error('Unable to start server - please restart the service', err);
    process.exit(1);
  }
});

// starts cron-job to fetch data
startCron();

/**
* Exports express
* @public
*/
module.exports = app;