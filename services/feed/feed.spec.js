const service = require("./feed.service")
const moment = require("moment")

describe("getdata FUNC TEST", () => {
  it("it should return some response object", async () => {
    const result = await service.getData(
      "2017-06-15T00:00:00",
      "2020-07-15T23:59:59",
      "./bitcoin1.csv"
    )
    expect(typeof result).toBe("object")
  })

  it("it should return empty array", async () => {
    const result = await service.getData(
      "2015-06-15T00:00:00",
      "2015-07-15T23:59:59",
      "./bitcoin1.csv"
    )
    expect(typeof result).toBe("object")
  })
})

describe("readFile FUNC TEST", () => {
  const start = moment("2016-06-15T00:00:00")
  const end = moment("2020-07-15T23:59:59")
  it("it should return an array of some length", async () => {
    const result = await service.readFile(start, end, "./bitcoin1.csv")
    expect(typeof result).toBe("object")
    expect(result).toContainEqual(
      expect.objectContaining({
        time: expect.anything(),
        close: expect.anything(),
        high: expect.anything(),
        low: expect.anything(),
        open: expect.anything(),
        volume: expect.anything(),
      })
    )
  })
})
