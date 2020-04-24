const request = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

describe("server", function () {
    describe("/", function () {
        beforeEach(async () => {
            await db("users").truncate()
            })
        it("should return 500 on not logged in", function () {
            return request(server)
            .get("/")
            .then (res => {
                expect(res.status).toBe(500)
            })
        })
    })
    
})

