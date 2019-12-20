const httpStatus = require('http-status');
const { latest, list } = require('../../../services/rate');

/**
 * rates
 * @public
 */
exports.latest = async (req, res, next) => {
  res.status(httpStatus.OK);
  const response = await latest();
  return res.json({
    responseCode: httpStatus.OK,
    responseMessage: 'OK',
    response: response
  });
};

exports.list = async (req, res, next) => {
  res.status(httpStatus.OK);
  const { from, to } = req.query;

  const response = await list(from, to);
  return res.json({
    responseCode: httpStatus.OK,
    responseMessage: 'OK',
    response: response
  });
};
