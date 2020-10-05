let { getData, responseFormatter } = require("./feed.service")
const {
  groupedDataDaywise,
  groupedDataHourwise,
  respnseOfDataFormatter,
} = require("../../utils/dummyData")
const { get } = require("../../routes/feed/feed.controller")
jest.mock("./feed.service")

describe("getdata FUNC TEST", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  const errorObject = {
    responseCode: 404,
    responseMessage: "Failure",
    response: {
      error: {
        message: "Date is in-valid",
      },
    },
  }
  it("it should return some response object", async () => {
    getData.mockImplementation(() =>
      Promise.resolve({
        responseCode: 200,
        responseMessage: "OK",
        response: {
          count: 483541,
          firstObject: {
            time: "1483228740",
            close: "968.29",
            high: "968.29",
            low: "968.29",
            open: "968.29",
            volume: "0",
          },
          lastObject: {
            time: "1512241140",
            close: "10909.5",
            high: "10944.5",
            low: "10905",
            open: "10948",
            volume: "3281928",
          },
        },
      })
    )
    const result = await getData(
      "2017-06-15T00:00:00",
      "2019-07-15T23:59:59",
      "./bitcoin1.csv"
    )
    expect(result.responseCode).toBe(200)
    expect(typeof result).toBe("object")
    expect(result.response).toHaveProperty("count")
    expect(result.response).toHaveProperty("firstObject")
    expect(result.response).toHaveProperty("lastObject")
  })

  it("it should return error -> wrong start date", async () => {
    getData.mockImplementation(() => Promise.reject(errorObject))
    await expect(getData("", "2015-07-15T23:59:59")).rejects.toEqual(
      errorObject
    )
  })

  it("it should return error -> wrong end date", async () => {
    getData.mockImplementation(() => Promise.reject(errorObject))
    await expect(getData("2015-06-15T00:00:00", "")).rejects.toEqual(
      errorObject
    )
  })
})

describe("responseFormatter FUNC TEST", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  const start = "2016-06-15T00:00:00"
  const end = "2020-07-15T23:59:59"
  it("it should return formatted day wise grouped data", async () => {
    responseFormatter.mockImplementation(() =>
      Promise.resolve(respnseOfDataFormatter)
    )
    const result = await responseFormatter(groupedDataDaywise, start, end, true)
    expect(typeof result).toBe("object")
    expect(result.response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ intervalStart: expect.any(String) }),
        expect.objectContaining({ intervalEnd: expect.any(String) }),
        expect.objectContaining({ count: expect.any(Number) }),
        expect.objectContaining({
          firstObject: expect.objectContaining({
            time: expect.any(String),
            close: expect.any(String),
            high: expect.any(String),
            low: expect.any(String),
            open: expect.any(String),
            volume: expect.any(String),
          }),
        }),
        expect.objectContaining({
          lastObject: expect.objectContaining({
            time: expect.any(String),
            close: expect.any(String),
            high: expect.any(String),
            low: expect.any(String),
            open: expect.any(String),
            volume: expect.any(String),
          }),
        }),
      ])
    )
  })

  it("it should return formatted hour wise grouped data", async () => {
    responseFormatter.mockImplementation(() =>
      Promise.resolve(respnseOfDataFormatter)
    )
    const result = await responseFormatter(groupedDataHourwise, start, end)
    expect(typeof result).toBe("object")
    expect(result.response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ intervalStart: expect.any(String) }),
        expect.objectContaining({ intervalEnd: expect.any(String) }),
        expect.objectContaining({ count: expect.any(Number) }),
        expect.objectContaining({
          firstObject: expect.objectContaining({
            time: expect.any(String),
            close: expect.any(String),
            high: expect.any(String),
            low: expect.any(String),
            open: expect.any(String),
            volume: expect.any(String),
          }),
        }),
        expect.objectContaining({
          lastObject: expect.objectContaining({
            time: expect.any(String),
            close: expect.any(String),
            high: expect.any(String),
            low: expect.any(String),
            open: expect.any(String),
            volume: expect.any(String),
          }),
        }),
      ])
    )
  })

  it("it should return empty array", async () => {
    responseFormatter.mockImplementation(() => Promise.resolve([]))
    const result = await responseFormatter({}, start, end)
    expect(result).toEqual([])
  })
})
