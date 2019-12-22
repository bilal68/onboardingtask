const cron = require("node-cron");
const axios = require('axios');
const { logger } = require('../../utils/logger');
const Rate = require("../../models/Rate");
const { ARRAY_FREQUENCIES, RATES_API_URL } = require('../../utils/constants');

let task = null;

const startCron = async () => {
  const durationIndex = (process.env['DURATION_CRON_INDEX']) ? parseInt(process.env['DURATION_CRON_INDEX']) : 0;
  const frequency = ARRAY_FREQUENCIES[durationIndex];
  logger.info(`Running CRON for min(s):${frequency} @ ${new Date()}`);
  await fetchRates();
  task = await cron.schedule(`*/${frequency} * * * *`, async () => {
    logger.info(`Running CRON for min(s):${frequency} @ ${new Date()}`);
    await fetchRates();
  });
  return true;
};


const fetchRates = async () => {
  return await axios.get(RATES_API_URL).then(async (response) => {
    return await persistRate(response.data.USD);
  }).catch(err => { logger.error(err); return false });
};

const persistRate = async (dataUSD) => {
  const rate = new Rate({ currencyName: 'US Dollar', symbol: dataUSD.symbol, price: dataUSD.last });
  return await rate.save().then(doc => true).catch(err => false);
}

const stopCron = async () => {
  if (task)
    task.destroy();
};

const restartCron = async () => {
  await stopCron();
  return await startCron();
};

module.exports = {
  startCron,
  stopCron,
  restartCron,
  fetchRates,
  persistRate
};
