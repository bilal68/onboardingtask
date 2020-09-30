const service = require("./feed.service")

describe("GET DATA FUNC TEST", () => {
  it("it should return some response object", async () => {
    const result = await service.getData(
      "2016-06-15T00:00:00",
      "2017-07-15T23:59:59",
      './bitcoin1.csv'
    )
    expect(typeof result).toBe("object")
    expect(result.response).toHaveProperty("count")
  })
})
