const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.get('/:url', (request, response, next) => {
    const url = request.params.url

    Blog.findOne({ 'url': url })
        .then(result => {
            console.log(result[0])
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

blogsRouter.delete('/:url', (request, response, next) => {
    const url = request.params.url

    // Not going to care which one is deleted lol
    Blog.findOneAndDelete({ 'url': url })
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

blogsRouter.put('/:url', (request, response, next) => {
    const url = request.params.url
    const content = request.body

    // 3rd Parameter with { new: true } is required to get modified Obj
    Blog.findOneAndUpdate({ "url": url }, content, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter