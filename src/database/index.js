/* istanbul ignore file */
const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

// Connect to Live MongoDb or Test
const connect = async (mongo_db_uri, args) => {
  if (process.env.NODE_ENV === 'test') {
    mockgoose.prepareStorage().then(() => {
      mongoose.connect(mongo_db_uri, args)
        .then(() => console.log("MongoDb Connected for test..."))
        .catch(err => console.log(err));
    })
  } else {
    await mongoose.connect(mongo_db_uri, args)
      .then(() => console.log("MongoDb Connected..."))
      .catch(err => console.log(err));
  }
};

const disconnect = async () => await mongoose.disconnect();


module.exports = { connect, disconnect };