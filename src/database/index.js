/* istanbul ignore file */
const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const { logger } = require('../utils/logger')

// Connect to Live MongoDb or Test
const connect = async (mongo_db_uri, args) => {
  if (process.env.NODE_ENV === 'test') {
    mockgoose.prepareStorage().then(() => {
      mongoose.connect(mongo_db_uri, args)
        .then(() => logger.info("MongoDb Connected for test..."))
        .catch(err => logger.error(err));
    })
  } else {
    await mongoose.connect(mongo_db_uri, args)
      .then(() => logger.info("MongoDb Connected..."))
      .catch(err => logger.error(err));
  }
};

const disconnect = async () => await mongoose.disconnect();


module.exports = { connect, disconnect };