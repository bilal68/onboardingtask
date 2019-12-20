const cron = require("node-cron");
const axios = require('axios');
const Rate = require("../../models/Rate");
const { ARRAY_FREQUENCIES, RATES_API_URL } = require('../../utils/constants');

let task = null;

const startCron = async () => {
  const durationIndex = (process.env['DURATION_CRON_INDEX']) ? parseInt(process.env['DURATION_CRON_INDEX']) : 0;
  const frequency = ARRAY_FREQUENCIES[durationIndex];
  console.log(`Running CRON for min(s):${frequency} @ ${new Date()}`);
  await fetchRates();
  task = cron.schedule(`*/${frequency} * * * *`, async () => {
    console.log(`Running CRON for min(s):${frequency} @ ${new Date()}`);
    await fetchRates();
  });
  return true;
};

const fetchRates = async () => {
  axios.get(RATES_API_URL).then(response => {
    const usd = response.data.USD;
    const rate = new Rate({ currencyName: 'US Dollar', symbol: usd.symbol, price: usd.last });
    rate.save(err => {
      if (err) console.log(`Error persisting rate @ ${new Date()} \n ${err}`);
    });
  }).catch(err => console.log(err));
};

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
  restartCron
};
