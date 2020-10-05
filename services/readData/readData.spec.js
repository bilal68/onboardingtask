const { readData } = require("./readData.service")
jest.mock("./readData.service")

describe("readData FUNC TEST", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it("it should return error -> wrong file", async () => {
    readData.mockImplementation(() =>
      Promise.resolve({
        responseCode: 404,
        responseMessage: "Failure",
        response: {
          error: {
            message: "File not found",
          },
        },
      })
    )
    const result = await readData(
      "2015-06-15T00:00:00",
      "2015-07-15T23:59:59",
      "./bitcoin5555.csv"
    )
    expect(result.responseCode).toBe(404)
  })

  it("it should return some object", async () => {
    readData.mockImplementation(() =>
      Promise.resolve({
        time: "1483228740",
        close: "968.29",
        high: "968.29",
        low: "968.29",
        open: "968.29",
        volume: "12993",
      })
    )
    const result = await readData(
      "2017-06-15T00:00:00",
      "2019-07-15T23:59:59",
      "./bitcoin1.csv"
    )
    expect(result).toEqual(
      expect.objectContaining({
        time: expect.any(String),
        close: expect.any(String),
        high: expect.any(String),
        low: expect.any(String),
        open: expect.any(String),
        volume: expect.any(String),
      })
    )
  })
})
