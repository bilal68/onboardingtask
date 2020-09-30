const Joi = require("joi")

const post = {
  name: "feed",
  path: "/",
  type: "post",
  joiSchema: {
    query: Joi.object({
        rangeStart: Joi.string().required()
    }),
    body: {},
    response: {
      200: {
        description: "OK",
        body: {
          responseCode: 200,
          responseMessage: Joi.string().required(),
          response: {},
        },
      },
      400: {
        message: "Error Response",
        errorCode: 400,
      },
    },
  },
}

module.exports = { post }
