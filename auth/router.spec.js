const request = require("supertest")
const server = require("../api/server")
const therouter = require("./auth-router")
const db = require("../database/dbConfig")


describe("server", function () {
    describe("/api/auth/register", function () {
        beforeEach(async () => {
            await db("users").truncate()
        })
        it("should return 201 on success", function () {
            let user = {username: "adrian", password: "Hello"}
            return request(server)
            .post('/api/auth/register')
            .send(user)
            .then(res => {
                expect(res.status).toBe(201);
                expect(res.body.message).toBe("You are registered")
            })
        })
    })

        
    describe("/login", function () {
        it("should return 201 on success", function () {
            let user = {username: "adrian", password: "Hello"}
            return request(server)
            .post('/api/auth/register')
            .send(user)
            .then(request(server)
            .post('/api/auth/login')
            .send(user)
            .then(res => {
                expect(res.body.message).toBe("Welcome!")
                expect(res.status).toBe(200);
                
            })
        )})
    })
})

describe("server", function () {
    describe("/api/jokes", function () {
        beforeEach(async () => {
            await db("users").truncate()
            })
        it("should return 400 if I'm not logged in", function () {
            return request(server)
            .get("/api/jokes")
            .then (res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe("please provide credentials")
            })
        })
    })
})

