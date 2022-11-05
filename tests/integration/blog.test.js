// const supertest = require('supertest');
// const app = require('../../index.js')
// const fixtures = require('../fixtures/blogs')
// const mongoose = require ("mongoose");
// const {BlogModel, blogState} = require('../../Models/blogsModel')



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
// describe("Test for Blog GET '/blogs' requests", () => {

//     it("should get all published blog", async () => {
//           const response = await supertest(app).get('/blogs')
//           .set('content-type', 'application/json')
//           .send(fixtures.validBlog1)
//         expect(response.status).toBe(200);
//         expect(response.headers['content-type']).toContain("application/json");
//         expect(response.body.count).toBe(2);
//         expect(response.body.status).toBeTruthy()
//         expect(response.body.blogs.every(blog => blog.state === blogStates.published)).toBeTruthy()
//     })

// })


// describe("  To create blog with Post '/blogs' requests", () => {

//     it("should create a blog", async () => {
//         const request = await supertest(app).post('/blogs')
//         .send(fixtures.validBlog)
//         expect(request.status).toBe(200);
//         expect(request.headers['content-type']).toContain("application/json");
//         expect(request.body.count).toBe(2);
//         expect(request.body.status).toBeTruthy()
//         expect(request.body.blogs.every(blog => blog.state === blogStates.published)).toBeTruthy()
//     })

// })