let { getData } = require("./feed.service")
jest.mock("./feed.service")

describe("getdata FUNC TEST", () => {
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
    getData.mockImplementation(() =>
      Promise.resolve({
        responseCode: 404,
        responseMessage: "Failure",
        response: {
          error: {
            message: "Date is in-valid",
          },
        },
      })
    )
    const result = await getData("", "2015-07-15T23:59:59")
    expect(result.responseCode).toBe(404)
    expect(result.responseMessage).toBe("Failure")
  })

  it("it should return error -> wrong end date", async () => {
    getData.mockImplementation(() =>
      Promise.resolve({
        responseCode: 404,
        responseMessage: "Failure",
        response: {
          error: {
            message: "Date is in-valid",
          },
        },
      })
    )
    const result = await getData("2015-06-15T00:00:00", "")
    expect(result.responseCode).toBe(404)
    expect(result.responseMessage).toBe("Failure")
  })
})
