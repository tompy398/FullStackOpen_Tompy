const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []
    
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
})

describe('most likes', () => {
    const listWithSeveralBlogs = [
        {
            title: "Example 1",
            author: "Person 1",
            likes: 15
        },
        {
            title: "Example 2",
            author: "Person 2",
            likes: 20
        },
        {
            title: "Example 6",
            author: "Person 6",
            likes: 30
        },
        {
            title: "Example 3",
            author: "Person 3",
            likes: 35
        },
        {
            title: "Example 4",
            author: "Person 4",
            likes: 42
        },
        {
            title: "Example 5",
            author: "Person 5",
            likes: 46
        }
    ]

    test('checking which blog has the most likes', () => {
        const result = listHelper.favoriteBlog(listWithSeveralBlogs)
        expect(result).toEqual(
            {
                title: "Example 5",
                author: "Person 5",
                likes: 46
            }
        )
    })
})

describe('favorite author', () => {

    const listWithSeveralBlogs = [
        {
            title: "Example 1",
            author: "Person 1",
            likes: 15
        },
        {
            title: "Example 2",
            author: "Person 2",
            likes: 20
        },
        {
            title: "Example 3",
            author: "Person 3",
            likes: 30
        },
        {
            title: "Example 4",
            author: "Person 4",
            likes: 35
        },
        {
            title: "Example 5",
            author: "Person 5",
            likes: 42
        },
        {
            title: "Example 6",
            author: "Person 6",
            likes: 46
        },
        {
            title: "Example 7",
            author: "Person 1",
            likes: 60
        },
        {
            title: "Example 8",
            author: "Person 1",
            likes: 55
        },
        {
            title: "Example 9",
            author: "Person 1",
            likes: 43
        },
        {
            title: "Example 10",
            author: "Person 2",
            likes: 59
        },
        {
            title: "Example 11",
            author: "Person 2",
            likes: 45
        }
    ]

    test('seeing which author has the most blogs', () => {
        const result = listHelper.mostBlogs(listWithSeveralBlogs)
        expect(result).toEqual(
            {
                author: "Person 1", 
                blogs: 4
            }
        )
    })

    test('seeing which author has the most likes together', () => {
        const result = listHelper.mostLikes(listWithSeveralBlogs)
        expect(result).toEqual(
            {
                author: "Person 1",
                likes: 173
            }
        )
    })
})