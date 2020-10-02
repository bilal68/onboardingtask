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
  // response: {
  //   200: {
  //     description: "OK",
  //     body: {
  //       responseCode: 200,
  //       responseMessage: Joi.string().required(),
  //       response: {},
  //     },
  //   },
  //   400: {
  //     message: "Error Response",
  //     errorCode: 400,
  //   },
  // },
}

module.exports = { post }
