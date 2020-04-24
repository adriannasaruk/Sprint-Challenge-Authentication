const request = require("supertest")
const server = require("../api/server")
const therouter = require("./auth-router")
const db = require("../database/dbConfig")


describe("router", function () {
    describe("/register", function () {
        beforeEach(async () => {
            await db("users").truncate()
        })
        it("should return 201 on success", function () {
            let user = {username: "adrian", password: "Hello"}
            return request(server)
            .post('/register')
            .send(user)
            .then(res => {
                expect(res.status).toBe(201)
                
            })
        })

    })
        describe("/login", function () {
            it("should return 201 on success", function () {
                return request(server)
                .post('/login')
                .then(res => {
                    expect(res.status).toBe(500)
                    
                })
            })
        })
})

