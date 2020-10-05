var createError = require("http-errors")
var express = require("express")
var logger = require("morgan")
const bodyParser = require("body-parser")

var indexRouter = require("./routes/index")
var app = express()

// body-parser setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(logger("dev"))

app.use("/", indexRouter)
// catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

})

module.exports = app
