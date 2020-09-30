const httpStatus = require("http-status")
const { Request } = require("jest-express/lib/request")
const { Response } = require("jest-express/lib/response")
const toBeType = require("jest-tobetype")

expect.extend(toBeType)

const { ValidationError } = require("express-validation")

describe("API testing", () => {
  test("it should validate the route /feed", async () => {
    // const response = await new Request("/feed", {
    //   method: "POST",
    // })
    // expect(response.responseCode).toBe(200)
  })
})
