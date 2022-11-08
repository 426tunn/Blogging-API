const request = require('supertest');
const app = require('../../index.js')
const fixtures = require('../fixtures/blogs')
const {blog, blogStates} = require('../../Models/blogsModel')
const mongoose = require('mongoose');



beforeAll(async () => {
    mongoose.connect('mongodb://localhost:27017')
     mongoose.connection.on('connected', ()=> {
        console.log('Mongoose Connected')
     })
     mongoose.connection.on('error', ()=> {
        console.log('connection failed')
     });
    })
afterAll(async () => {
    await mongoose.connection.close()
})

describe("Test for Blog GET '/blog' requests", () => {

    
       it("should get all published blog", async () => {      
          const response = await request(app).get('/blog')
          .set('content-type', 'application/json')
          .send(fixtures.validBlog)
          console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain("application/json");
        expect(response.body).toContain(author);
    })

})


describe("  To create blog with Post '/blogs' requests", () => {
  
    it("should create a blog", async () => {
        const response = await request(app).post('/blog')
        .send(fixtures.cretedBlog)
        .set("Authorization", `Bearer ${userToken}`);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain("application/json");
        expect(response.body.status).toBeTruthy()
        expect(response.body.blog.read_count).toBe(0);
    })

})



describe("  To update state blog with Post '/blog' requests", () => {

    it("should update state a blog", async () => {
        const response = await request(app).patch('/blog')
        .send(fixtures.updatedBlog)
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain("application/json");
        expect(response.body.status).toBeTruthy()
        expect(response.body.blog.state).toBe(blogStates.published);
    })

})


describe("  To delete blog with Post '/blogs' requests", () => {

    it("should delete a blog", async () => {
        const response = await request(app).delete('/blog')
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
    })

})


