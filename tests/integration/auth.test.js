const request = require('supertest');
const app = require('../../index')
const fixtures = require('../fixtures/user')
const mongoose = require ('mongoose')


beforeAll(async () => {
    mongoose.connect('mongodb://localhost:27017')
     mongoose.connection.on(  'connected', async ()=> {
        console.log('Mongoose Connected')
     })
     mongoose.connection.on('error', ()=> {
        console.log('connection failed')
     });
    })
afterAll(async () => {
    await mongoose.connection.close()
})


describe('Signup', () => {
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
        expect(response.body).toHaveProperty("token")
    })

    it("should not log user in successfully due to invalid email", async () => {
        const response = await request(app).post("/login").send(fixtures.invalidEmailLogin)
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("error")
    })

    it("should not log user in successfully due to invalid password", async () => {
        const response = await request(app).post("/login").send(fixtures.invalidPasswordLogin)
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("error")
        })

})