const httpStatus = require('http-status');
const { latest } = require('../../../services/rate');

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
