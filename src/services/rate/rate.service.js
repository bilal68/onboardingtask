// Model
const Rate = require("../../models/Rate");

const latest = async () => {
  return await Rate.findOne().sort({ createdAt: -1 });
};

const list = async (from, to) => {
  const rates = await Rate.find().sort({ createdAt: -1 });;
  return { rates, from, to };
};

module.exports = {
  latest,
  list
};
