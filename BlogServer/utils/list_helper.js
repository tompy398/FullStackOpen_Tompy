const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sumLikes = blogs.reduce( (sum, blog) => {
        return blog.likes + sum
    }, 0)
    
    return sumLikes
}

const favoriteBlog = (blogs) => {
    const mostLikes = blogs.reduce( (most, blog) => {
        return blog.likes > most.likes ? blog : most
    }, {likes: -1})

    return mostLikes
}

const mostBlogs = (blogs) => {
    const authorsGrouped = lodash.groupBy(blogs, (blog) => blog.author)
    const authors = Object.keys(authorsGrouped)

    const getMostBlogs = authors.reduce( (most, iterAuthor) => {
        return authorsGrouped[iterAuthor].length > most.blogs ? {author: iterAuthor, blogs: authorsGrouped[iterAuthor].length} : most
    }, {author: '', blogs: -1})
    
    return getMostBlogs
}

const mostLikes = (blogs) => {
    const authorsGrouped = lodash.groupBy(blogs, (blog) => blog.author)
    const authors = Object.keys(authorsGrouped)
    const tallyLikes = authors.map( (authorName) => {
        const authorArr = authorsGrouped[authorName]
        const totalLikes = authorArr.reduce( (sum, obj) => {
            return sum + obj.likes
        }, 0)
        return { author: authorName, likes: totalLikes }
    })

    const getMostLikes = tallyLikes.reduce( (most, tally) => {
        return tally.likes > most.likes ? tally : most
    }, {author: '', likes: -1})

    return getMostLikes
}

module.exports = {
    dummy, 
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}