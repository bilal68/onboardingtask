const service = require("./feed.service")

describe("getdata FUNC TEST", () => {
  it("it should return some response object", async () => {
    const result = await service.getData(
      "2017-06-15T00:00:00",
      "2019-07-15T23:59:59",
      "./bitcoin1.csv"
    )
    expect(result.responseCode).toBe(200)
    expect(typeof result).toBe("object")
    expect(result.response).toHaveProperty("count")
  })

  it("it should return error -> wrong file", async () => {
    const result = await service.getData(
      "2015-06-15T00:00:00",
      "2015-07-15T23:59:59",
      "./bitcoin5555.csv"
    )
    expect(result.responseCode).toBe(404)
  })

})
