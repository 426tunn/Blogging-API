const supertest = require('supertest');
const db = require('../database');
const app = require('../../app')
const fixtures = require('../fixtures/user')
// const bcrypt = require ("bcrypt")



// beforeAll(async () =>{
//     await db.connect();
// })

// afterAll(async () => {
//     await db.disconnect();
// });

describe('Signup post request successful', ()=> {


    it("should register user successfully", async ()=> {
        const request = await supertest(app).post("/signup").send(fixtures.validUser);
        // expect("aaaa").toBe("aaaa");
         expect(request.headers['content-type']).toContain("application/json");
    })
})