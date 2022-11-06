const request = require('supertest');
const app = require('../../index.js')
const fixtures = require('../fixtures/blogs')

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
describe("Test for Blog GET '/blog' requests", () => {

    it("should get all published blog", async () => {
          const response = await request(app).get('/blog')
          .set('content-type', 'application/json')
          .send(fixtures.validBlog1)
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain("application/json");
        expect(response.body.status).toBeTruthy()
        expect(response.body.blogs.every(blog => blog.state === blogStates.published)).toBeTruthy()
    })

})


describe("  To create blog with Post '/blogs' requests", () => {

    it("should create a blog", async () => {
        const response = await request(app).post('/blog')
        .send(fixtures.validBlog1)
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain("application/json");
        expect(response.body.status).toBeTruthy()
        expect(response.body.blog.read_count).toBe(0);
        expect(response.body.blog.state).toBe(blogStates.draft);
        expect(response.body.blogs.every(blog => blog.state === blogStates.drsft)).toBeTruthy()
    })

})



describe("  To update state blog with Post '/blog' requests", () => {

    it("should create a blog", async () => {
        const response = await request(app).patch('/blog')
        .send(fixtures.validBlog2)
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain("application/json");
        expect(response.body.status).toBeTruthy()
        expect(response.body.blog.read_count).toBe(0);
        expect(response.body.blog.state).toBe(blogStates.published);
        expect(response.body.blogs.every(blog => blog.state === blogStates.published)).toBeTruthy()
    })

})


describe("  To delete blog with Post '/blogs' requests", () => {

    it("should delete a blog", async () => {
        const response = await request(app).delete('/blog')
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message')
    })

})


