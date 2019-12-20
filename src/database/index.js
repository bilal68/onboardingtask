const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;

// Connect to Live MongoDb or Test
const connect = async (mongo_db_uri, args) => {
  if (process.env.NODE_ENV === 'test') {
    const mockgoose = new Mockgoose(mongoose);
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