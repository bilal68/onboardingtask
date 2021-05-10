var express = require("express")
var router = express.Router()

const feed = require("./feed")
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" })
})
router.use("/feed", feed)

module.exports = router
