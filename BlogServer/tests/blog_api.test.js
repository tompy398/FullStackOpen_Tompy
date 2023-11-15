const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const Blog = require('../models/blog')

const api = supertest(app)

beforeEach( async () => {
    await Blog.deleteMany({})

    let blogObj = new Blog(helper.initialBlogs[0])
    await blogObj.save()
    blogObj = new Blog(helper.initialBlogs[1])
    await blogObj.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map( r => r.url )
    expect(contents).toContain(
        'Site 2'
    )
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Example 3',
        author: 'John Moe',
        url: 'Site 3',
        likes: 50
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.url)
    expect(contents).toContain(
        'Site 3'
    )
})

test('blog without url is not added', async () => {
    const newBlog = {
    }
    
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(async () => {
    await mongoose.connection.close()
})