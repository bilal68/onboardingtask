const moment = require("moment")
const _ = require("lodash")
const fs = require("fs")
const parse = require("csv-parse")
const staticBasePath = "./bitcoin.csv"
const { DATE_TIME_FORMAT } = require("./feed.constants")

const getData = async (rangeStart, rangeEnd, filePath) => {
  try {
    const start = moment(rangeStart)
    const end = moment(rangeEnd)

    const result = await readFile(start, end, filePath)
    if (end.diff(start, "hour") <= 24) {
      const groupedData = _.groupBy(result, (o) => moment(o.dateTime).hours())
      const finalRes = await responseFormatter(groupedData, start, end)
      return finalRes
    } else {
      const groupedData = _.groupBy(result, (o) =>
        moment(o.dateTime).format("YYYY-MM-DD")
      )
      const finalRes = await responseFormatter(groupedData, start, end, true)
      return finalRes
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

const responseFormatter = async (groupedData, start, end, dayWise = false) => {
  const response = []
  if (Object.keys(groupedData).length > 0) {
    for (let key in groupedData) {
      const obj = {
        intervalStart: dayWise
          ? moment(key).startOf("day").format(DATE_TIME_FORMAT)
          : moment(start)
              .set({ hour: key, minute: 0, second: 0 })
              .format(DATE_TIME_FORMAT),
        intervalEnd: dayWise
          ? moment(key).endOf("day").format(DATE_TIME_FORMAT)
          : moment(end)
              .set({ hour: key, minute: 59, second: 59 })
              .format(DATE_TIME_FORMAT),
        count: groupedData[key].length,
        firstObject: groupedData[key][0],
        lastObject: groupedData[key][Object.keys(groupedData[key]).length - 1],
      }
      response.push(obj)
    }
  }
  return response
}

module.exports = {
  getData,
  readFile,
  responseFormatter,
}
