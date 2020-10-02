const moment = require("moment")
const fs = require("fs")
const parse = require("csv-parse")
const staticBasePath = "./bitcoin.csv"

const readData = async (start, end, filePath = staticBasePath) => {
  try {
    if (!fs.existsSync(filePath)) throw new Error("File not exist")
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
              volume: csvrow[5],
            })
          }
        })
        .on("end", function () {
          resolve(csvData)
        })
        .on("error", (error) => reject(error))
    })
  } catch (error) {
    return {
      responseCode: 404,
      responseMessage: "Failure",
      response: {
        error: {
          message: error.message,
        },
      },
    }
  }
}

module.exports = {
  readData,
}
