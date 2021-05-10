const { readData } = require("./readData.service")
jest.mock("./readData.service")

describe("readData FUNC TEST", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  const errorObject = {
    responseCode: 404,
    responseMessage: "Failure",
    response: {
      error: {
        message: "File not found",
      },
    },
  }
  it("it should return error -> wrong file", async () => {
    readData.mockImplementation(() => Promise.reject(errorObject))
    await expect(
      readData(
        "2015-06-15T00:00:00",
        "2015-07-15T23:59:59",
        "./bitcoin5555.csv"
      )
    ).rejects.toEqual(errorObject)
  })

  it("it should return some object", async () => {
    const rowDataFromcsv = {
      time: "1483228740",
      close: "968.29",
      high: "968.29",
      low: "968.29",
      open: "968.29",
      volume: "12993",
    }
    readData.mockImplementation(() => Promise.resolve(rowDataFromcsv))
    const result = await readData(
      "2017-06-15T00:00:00",
      "2019-07-15T23:59:59",
      "./bitcoin1.csv"
    )
    expect(result).toEqual(rowDataFromcsv)
  })
})
