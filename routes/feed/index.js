const express = require("express")
const router = express.Router()
const validate = require("express-validation")

const controller = require("./feed.controller")
const { post } = require("./feed.validator")
/* GET data from CSV . */

// router.post("/", controller.get)
router.route("/").post(validate(post.joiSchema), controller.post) //===>>this needs to be working

// router.post("/", function (req, res, next) {
//   try {
//     const csvData = []
//     const start = moment(req.body.rangeStart).unix()
//     const end = moment(req.body.rangeEnd).unix()

//     fs.createReadStream(staticBasePath)
//       .pipe(parse({ delimiter: "," }))
//       .on("data", function (csvrow) {
//         console.log(csvrow[0] > start && csvrow[0] <= end)
//         if (csvrow[0] > start && csvrow[0] <= end) {
//           csvData.push(csvrow)
//         }
//       })
//       .on("end", function () {
//         return res.json({
//           responseCode: 200,
//           responseMessage: "Success",
//           response: {
//             count: csvData.length,
//             firstObject: csvData[0],
//             lastObject: csvData[csvData.length - 1],
//           },
//         })
//       })
//   } catch (error) {
//     return res.json({
//       responseCode: 404,
//       responseMessage: "Failure",
//       response: {
//         error: {
//           message: "<Reason of error>",
//         },
//       },
//     })
//   }
// })

module.exports = router
