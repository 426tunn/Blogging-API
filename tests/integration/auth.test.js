// const supertest = require('supertest');
// const app = require('../../index.js')
// const fixtures = require('../fixtures/user')
// const mongoose = require ("mongoose")



// beforeAll( () =>{
//     mongoose.connect('mongodb://localhost:27017')
//     mongoose.connection.on("connected", ()=> {
//        console.log('Mongoose Connected')
//     });
//     mongoose.connection.on('error', (err)=> {
//        console.log('Connection Failed', err)
//     });
// })

// afterAll(async () => {
//     mongoose.connection.close()
// });

// describe('Signup post request successful', ()=> {
    
//     it("should register user successfully", async ()=> {
//         const request = await supertest(app).post("/signup")
//         .set('content-type', 'application/json')
//         .send(fixtures.validUser);
//         expect(request.status).toBe(200);
//          expect(request.headers['content-type']).toContain("application/json");
//          expect(request.body.user.email).toEqual(fixtures.valid.email);
//          expect(request.body.user.first_name).toEqual(fixtures.valid.first_name);
//          expect(request.body.user.last_name).toEqual(fixtures.valid.last_name);
//          expect(await bcrypt.compare(fixtures.valid.password, request.body.user.password)).toBeTruthy();
//     })

    
//     it("should not register user successfully due to no firstname", async () => {
//         const request = await supertest(app).post("/signup").send(fixtures.noFirstname);
//         expect(request.status).toBe(500);
//         expect(request.headers['content-type']).toContain("application/json");
//         expect(request.body.user).toBeUndefined();
//     })

//     it("should not register user successfully due to no lastname", async () => {
//         const request = await supertest(app).post("/signup").send(fixtures.noLastname);
//         // console.log(request.text)
//         expect(request.status).toBe(500);
//         expect(request.headers['content-type']).toContain("application/json");
//         expect(request.body.user).toBeUndefined();
//     })

//     it("should not register user successfully due to no email", async () => {
//         const request = await supertest(app).post("/signup").send(fixtures.noEmail);
//         expect(request.status).toBe(400);
//     })

//     it("should not register user successfully due to invalid email", async () => {
//         const request = await supertest(app).post("/signup").send(fixtures.invalidEmail);
//         // console.log(request.text)
//         expect(request.status).toBe(500);
//         expect(request.headers['content-type']).toContain("application/json");
//         expect(request.body.user).toBeUndefined();
//     })

//     it("should not register user successfully due to no password", async () => {
//         const request = await supertest(app).post("/signup").send(fixtures.noPassword);
//         expect(request.status).toBe(400);
//     })
// })




// describe("Login Authentication '/auth/login' POST request", () => {
//     it("should log user in successfully", async () => {
//         const request = await supertest(app).post("/auth/login").send(fixtures.valid)
//         // expect(request.status).toBe(200);
//         expect(request.headers['content-type']).toContain("application/json");
//         expect(request.body).toHaveProperty('token');
//     })

//     it("should not log user in successfully due to invalid email", async () => {
//         const request = await supertest(app).post("/auth/login").send(fixtures.invalidEmailLogin)
//         expect(request.status).toBe(404);
//         expect(request.headers['content-type']).toContain("text/html; charset=utf-8");
//     })

//     it("should not log user in successfully due to invalid password", async () => {
//         const request = await supertest(app).post("/auth/login").send(fixtures.invalidPasswordLogin)
//         expect(request.status).toBe(404);
//         expect(request.headers['content-type']).toContain("text/html; charset=utf-8");
//     })
// })