const { restartCron } = require('../cron');
const { ARRAY_FREQUENCIES } = require('../../utils/constants')

const getFrequency = async () => {
  const durationIndex = (process.env['DURATION_CRON_INDEX']) ? parseInt(process.env['DURATION_CRON_INDEX']) : 0;
  return { minutes: ARRAY_FREQUENCIES[durationIndex] };
};

const setFrequency = async (minutes) => {
  process.env['DURATION_CRON_INDEX'] = ARRAY_FREQUENCIES.indexOf(minutes)
  const restarted = await restartCron();
  return { minutes, restarted };
};

module.exports = {
  getFrequency,
  setFrequency
};
