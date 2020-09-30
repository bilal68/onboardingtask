const moment = require("moment")
const _ = require("lodash")
const fs = require("fs")
const parse = require("csv-parse")
const { unix } = require("moment")
const staticBasePath = "./bitcoin1.csv"

const getData = async (rangeStart, rangeEnd, filePath = staticBasePath) => {
  try {
    const start = moment(rangeStart)
    const end = moment(rangeEnd)

    const result = await readFile(
      start,
      end,
      filePath
    )
    if (end.diff(start, "hour") <= 24) {
      const groupedData = _.groupBy(result, (o) => moment(o.dateTime).hours())
      return (response = {
        count: Object.keys(groupedData).length,
        firstObject: groupedData[Object.keys(groupedData)[0]],
        lastObject:
          groupedData[
            Object.keys(groupedData)[Object.keys(groupedData).length - 1]
          ],
      })
    } else {
      console.log(result, (o) => moment(o.time).format("MMM DD YYYY"))
      const groupedData = _.groupBy(result, (o) => o.time)
      console.log(groupedData[0])
      return (response = {
        count: Object.keys(groupedData).length,
        firstObject: groupedData[Object.keys(groupedData)[0]],
        lastObject:
          groupedData[
            Object.keys(groupedData)[Object.keys(groupedData).length - 1]
          ],
      })
    }
    // if (result) {
    //   return (response = {
    //     count: result.length,
    //     firstObject: result[0],
    //     lastObject: result[result.length - 1],
    //   })
    // }
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
        const rowDateTime = moment.unix(csvrow[0])
        // console.log(rowDateTime)
        // console.log(start)
        // console.log(rowDateTime >= start &&
        //     rowDateTime <= end)
        if (rowDateTime >= start && rowDateTime <= end) {
          csvData.push({
            time: csvrow[0],
            close: csvrow[1],
            high: csvrow[2],
            low: csvrow[3],
            open: csvrow[4],
            volume: csvrow[5],
            dateTime: rowDateTime,
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
}
