const express = require("express")
const router = express.Router()
const { validate } = require("express-validation")

const controller = require("./feed.controller")
const { post } = require("./feed.validator")
const middleware = require("../../middlewares/middleware")
/* GET data from CSV . */

router.post("/", validate(post.joiSchema), controller.get)
// router.route("/").post(validate(post.joiSchema), controller.get) //===>>this needs to be working

module.exports = router
