const moment = require("moment")

const fs = require("fs")
const parse = require("csv-parse")
const staticBasePath = "./bitcoin1.csv"

const getData = async (rangeStart, rangeEnd) => {
    console.log('in get data')
  try {
    const csvData = []
    const start = moment(rangeStart).unix()
    const end = moment(rangeEnd).unix()

    return new Promise((resolve, reject) => {
      fs.createReadStream(staticBasePath)
        .pipe(parse({ delimiter: "," }))
        .on("data", function (csvrow) {
          // console.log(csvrow[0] > start && csvrow[0] <= end)
          if (csvrow[0] > start && csvrow[0] <= end) {
            csvData.push(csvrow)
          }
        })
        .on("end", function () {
          resolve({
            response: {
              count: csvData.length,
              firstObject: csvData[0],
              lastObject: csvData[csvData.length - 1],
            },
          })
        })
    })
  } catch (error) {
    reject(new Error(error))
  }
}

module.exports = {
  getData,
}
