// Model
const Rate = require("../../models/Rate");

const latest = async () => {
  return await Rate.findOne().sort({ createdAt: -1 });
};

const list = async (queryParams) => {
  const { from, to, pageNumber, pageSize, sort } = queryParams;
  const skip = (pageNumber - 1) * pageSize;
  const sortOrder = sort === 'desc' ? -1 : 1;
  const rates = await Rate.find().skip(skip).limit(pageSize).sort({ createdAt: sortOrder });;
  return { rates, from, to };
};

module.exports = {
  latest,
  list
};
