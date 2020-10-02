const { readData } = require("./readData.service")
jest.mock("./readData.service")

describe("readData FUNC TEST", () => {
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