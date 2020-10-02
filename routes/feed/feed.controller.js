const { getData } = require("../../services/feed")

exports.get = async (req, res, next) => {
  const response = await getData(req.body.rangeStart, req.body.rangeEnd)
  return res.json(response)
}
