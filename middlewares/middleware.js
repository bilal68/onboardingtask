const Joi = require("joi")
const middleware = function (schema) {
  return (req, res, next) => {
    let myObj = {
      username: req.body.rangeStart,
      password: req.body.rangeEnd,
    }
    const { error } = schema.validate(req.body)
    const valid = error == null

    if (valid) {
      next()
    } else {
      const { details } = error
      const message = details.map((i) => i.message).join(",")

      console.log("error", message)
      res.status(422).json({ error: message })
    }
  }
}
module.exports = middleware
