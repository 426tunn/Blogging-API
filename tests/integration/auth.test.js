// const supertest = require('supertest');
// const db = require('../database');
// const app = require('../../app')
// const fixtures = require('../fixtures/user')
// const bcrypt = require ("bcrypt")



// beforeAll(async () =>{
//     await db.connect();
// })

// afterAll(async () => {
//     await db.disconnect();
// });

// describe('Signup post request successful', ()=> {


//     it("should register user successfully", async ()=> {
//         const request = await supertest(app).post("/signup").send(fixtures.validUser);
//         // expect("aaaa").toBe("aaaa");
//          expect(request.headers['content-type']).toContain("application/json");
//     })
// })



const request = require('supertest')
const { connect } = require('../database')
const UserModel = require('../../Models/userModel')
const app = require('../../index');

describe('Auth: Signup', () => {
    // let conn;

    // beforeAll(async () => {
    //     conn = await connect()
    // })

    // afterEach(async () => {
    //     await conn.cleanup()
    // })

    // afterAll(async () => {
    //     await conn.disconnect()
    // })

    it('should signup a user', async () => {
        const response = await request(app).post('/signup')
        .set('content-type', 'application/json')
        .send({ 
            email: 'mscofield@ymail.com',
            first_name: "mike",
            last_name: "scofield",
            password: 'poiuytrewq'
        })

        expect(response.status).toBe(201)
        expect(response.body.user).toHaveProperty('first_name')
        expect(response.body.user).toHaveProperty('last_name')
        expect(response.body.user).toHaveProperty('email')        
    })


    // it('should login a user', async () => {
    //     // create user in out db
    //     const user = await UserModel.create({ username: 'tobi', password: '123456'});

    //     // login user
    //     const response = await request(app)
    //     .post('/login')
    //     .set('content-type', 'application/json')
    //     .send({ 
    //         email: 'tunde@gmail.com',
    //         password: '1234sjs56'
    //     });


    //     expect(response.status).toBe(200)
    //     expect(response.body).toHaveProperty('token')      
    // })
})