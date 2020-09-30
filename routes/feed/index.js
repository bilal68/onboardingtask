const express = require("express")
const router = express.Router()
const { validate } = require("express-validation")

const controller = require("./feed.controller")
const { post } = require("./feed.validator")
const Joi = require("joi")
const middleware = require("../../middlewares/middleware")
/* GET data from CSV . */

router.post("/", middleware(post.joiSchema), controller.get)

module.exports = router
