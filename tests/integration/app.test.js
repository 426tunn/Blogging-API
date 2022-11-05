const supertest = require('supertest');
const app = require('../../index.js')
const mongoose = require ("mongoose")



beforeAll( () =>{
    mongoose.connect('mongodb://localhost:27017')
    mongoose.connection.on("connected", ()=> {
       console.log('Mongoose Connected')
    });
    mongoose.connection.on('error', (err)=> {
       console.log('Connection Failed', err)
    });
})

afterAll( () => {
    mongoose.connection.close()
});


describe("Application works", () => {
    it("should get the homepage route '/' request successfully", async () => {
        const request = await supertest(app).get("/");
        expect(request.status).toBe(200);
        expect(request.headers['content-type']).toContain("application/json");
    })
});
