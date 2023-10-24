require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

/*
    GET ✅
    POST ✅
    DEL ✅
    PUT ✅
*/
// Best to assume url is UNIQUE

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

app.delete('/api/blogs/:url', (request, response, next) => {
    const url = request.params.url

    // Not going to care which one is deleted lol
    Blog.findOneAndDelete({ "url": url })
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/blogs/:url', (request, response, next) => {
    const url = request.params.url
    const content = request.body

    // 3rd Parameter with { new: true } is required to get modified Obj
    Blog.findOneAndUpdate({ "url": url }, content, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
