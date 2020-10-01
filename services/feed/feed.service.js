const moment = require("moment")
const _ = require("lodash")
const fs = require("fs")
const parse = require("csv-parse")
const staticBasePath = "./bitcoin.csv"

const getData = async (rangeStart, rangeEnd, filePath) => {
  try {
    const start = moment(rangeStart)
    const end = moment(rangeEnd)

    const result = await readFile(start, end, filePath)
    if (result.length <= 0) return []
    return {
      response: {
        count: result.length,
        firstObject: result[0],
        lastObject: result[result.length - 1],
      },
    }
  } catch (error) {
    throw new Error(error)
  }
}

const readFile = async (start, end, filePath = staticBasePath) => {
  const csvData = []
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(parse({ delimiter: "," }))
      .on("data", function (csvrow) {
        const rowDateTime = moment.unix(csvrow[0])
        if (rowDateTime >= start && rowDateTime <= end) {
          csvData.push({
            time: csvrow[0],
            close: csvrow[1],
            high: csvrow[2],
            low: csvrow[3],
            open: csvrow[4],
            volume: csvrow[5]
          })
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
  readFile
}
