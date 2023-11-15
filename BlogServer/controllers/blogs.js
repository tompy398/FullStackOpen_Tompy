const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:url', async (request, response, next) => {
    const url = request.params.url

    const blog = await Blog.findOne({ 'url': url })
    console.log(blog[0])
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.url) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const blogObj = new Blog(request.body)
    try {
        const savedBlog = await blogObj.save()
        response.status(201).json(savedBlog)
    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:url', async (request, response, next) => {
    const url = request.params.url
    try {
        await Blog.findOneAndDelete({ 'url': url })
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

blogsRouter.put('/:url', async (request, response, next) => {
    const url = request.params.url
    const content = request.body

    try {
        // 3rd Parameter with { new: true } is required to get modified Obj
        const updatedBlog = await Blog.findOneAndUpdate({ 'url': url }, content, { new: true })
        response.json(updatedBlog)
    } catch (error) {
        next(error)
    }
    
    
})

module.exports = blogsRouter