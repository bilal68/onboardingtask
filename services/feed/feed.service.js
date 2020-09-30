const moment = require("moment")

const fs = require("fs")
const parse = require("csv-parse")
const staticBasePath = "./bitcoin.csv"

const getData = async (rangeStart, rangeEnd, filePath = staticBasePath) => {
  try {
    const start = moment(rangeStart).unix()
    const end = moment(rangeEnd).unix()

    const result = await readFile(start, end, filePath)
    if (result) {
      return (response = {
        count: result.length,
        firstObject: result[0],
        lastObject: result[result.length - 1],
      })
    }
  } catch (error) {
    throw new Error(error)
  }
}

const readFile = async (start, end, filePath) => {
  const csvData = []
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(parse({ delimiter: "," }))
      .on("data", function (csvrow) {
        if (csvrow[0] > start && csvrow[0] <= end) {
          csvData.push(csvrow)
        }
      })
      .on("end", function () {
        resolve(csvData)
      })
      .on("error", (error) => reject(error))
  })
}

module.exports = {
  getData,
}
