const moment = require("moment")
const _ = require("lodash")
const httpStatus = require("http-status")
const { readData } = require("../readData/readData.service")
const { DATE_TIME_FORMAT } = require("./feed.constants")

const getData = async (rangeStart, rangeEnd, filePath) => {
  console.log("getData====>Actual")
  try {
    if (!moment(rangeStart).isValid() || !moment(rangeEnd).isValid())
      throw new Error("Date is in-valid")
    const start = moment(rangeStart)
    const end = moment(rangeEnd)
    const result = await readData(start, end, filePath)
    if (result.length <= 0) return []

    if (end.diff(start, "hour") <= 24) {
      const groupedData = _.groupBy(result, (o) => moment(o.dateTime).hours())
      return await responseFormatter(groupedData, start, end)
    } else {
      const groupedData = _.groupBy(result, (o) =>
        moment(o.dateTime).format("YYYY-MM-DD")
      )
      return await responseFormatter(groupedData, start, end, true)
    }
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
  return {
    responseCode: httpStatus.OK,
    responseMessage: "OK",
    response: response,
  }
}
module.exports = {
  getData,
  responseFormatter,
}
