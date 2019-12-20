// Model
const Rate = require("../../models/Rate");

const latest = async () => {
  return await Rate.findOne().sort({ createdAt: -1 });
};


module.exports = {
  latest
};
