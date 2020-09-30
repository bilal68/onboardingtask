const httpStatus = require("http-status")
const { getData } = require("../../services/feed")

exports.get = async (req, res, next) => {
  try {
    const response = await getData(req.body.rangeStart, req.body.rangeEnd)
    return res.json({
      responseCode: httpStatus.OK,
      responseMessage: "OK",
      response: response,
    })
  } catch (error) {
    res.json({
      responseCode: 404,
      responseMessage: "Failure",
      response: {
        error: {
          message: error,
        },
      },
    })
  }
}
