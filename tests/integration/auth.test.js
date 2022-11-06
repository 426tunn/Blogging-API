const request = require('supertest');
const app = require('../../index')
const fixtures = require('../fixtures/user')
const UserModel = require('../../Models/userModel')
const { connect } = require('../database')


describe('Auth: Signup', () => {
    let conn;

    beforeAll(async () => {
        conn = await connect()
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should signup a user', async () => {
        const response = await request(app).post('/signup')
        .set('content-type', 'application/json')
        .send(fixtures.validUser)

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('message')
            expect(response.body).toHaveProperty('user')      
    })
})


describe("Login Authentication '/login' POST request", () => {
    it("should log user in successfully", async () => {
        const response = await request(app).post("/login").send(fixtures.validLogin)
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
        expect(response.body.user).toHaveProperty("token")  
    })

    it("should not log user in successfully due to invalid email", async () => {
        const response = await request(app).post("/login").send(fixtures.invalidEmailLogin)
        expect(response.status).toBe(404);
        
    })

    it("should not log user in successfully due to invalid password", async () => {
        const request = await request(app).post("/login").send(fixtures.invalidPasswordLogin)
        expect(request.status).toBe(404);
        })
})