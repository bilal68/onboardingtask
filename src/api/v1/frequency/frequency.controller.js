const httpStatus = require('http-status');
const { getFrequency, setFrequency } = require('../../../services/frequency');

/**
 * frequency
 * @public
 */
exports.get = async (req, res, next) => {
  res.status(httpStatus.OK);
  const response = await getFrequency();
  return res.json({
    responseCode: httpStatus.OK,
    responseMessage: 'OK',
    response: response
  });
};


exports.post = async (req, res, next) => {
  res.status(httpStatus.OK);
  const minutes = parseInt(req.query['minutes'])
  const response = await setFrequency(minutes);
  return res.json({
    responseCode: httpStatus.OK,
    responseMessage: 'OK',
    response: response
  });
};
