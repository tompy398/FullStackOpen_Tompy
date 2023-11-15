const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Example 1',
        author: 'John Doe',
        url: 'Site 1',
        likes: 10
    },
    {
        title: 'Example 2',
        author: 'John Doe',
        url: 'Site 2',
        likes: 15
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ url: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()
  
    return blog._id.toString()
}
  
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(note => note.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}