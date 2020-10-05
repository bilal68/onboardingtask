const Joi = require("joi")
const moment = require("moment")
const post = {
  name: "feed",
  path: "/feed",
  type: "post",
  joiSchema: Joi.object({
    rangeStart: Joi.date().required(),
    rangeEnd: Joi.date().required(),
  }),
}

module.exports = { post }
