const moment = require("moment")
const _ = require("lodash")
const httpStatus = require("http-status")
const { readData } = require("../readData/readData.service")

const getData = async (rangeStart, rangeEnd, filePath) => {
  console.log("getData====>Actual")
  try {
    if (!moment(rangeStart).isValid() || !moment(rangeEnd).isValid())
      throw new Error("Date is in-valid")
    const start = moment(rangeStart)
    const end = moment(rangeEnd)
    const result = await readData(start, end, filePath)
    if (result.length <= 0) return []
    return {
      responseCode: httpStatus.OK,
      responseMessage: "OK",
      response: {
        count: result.length,
        firstObject: result[0],
        lastObject: result[result.length - 1],
      },
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

module.exports = {
  getData,
}
