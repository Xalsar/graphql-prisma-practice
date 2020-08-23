import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.exists.Comment({
//     id: "ck2brhumq00ff0731kprhko5u",
//     author: {
//         id: ""
//     }
// }).then(exists => {
//     console.log(exists)
// })

const createPostForUser = async (authorId, data) => {
    const userExists = await prisma.exists.User({ id: authorId })

    if (!userExists) {
        throw new Error('User not found')
    }

    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ id author { id name email posts { id title published } } }')

    return user.author
}

// createPostForUser('ck2af2bj800gz0a31xco7hfi4', {
//     title: "Legndarium sembla una excelent pagina web",
//     body: "la veritat es que esta repleta de coses molt interessants",
//     published: true
// })
// .then(user => console.log(JSON.stringify(user, undefined, 4)))
// .catch(error => console.log(error))

const updatePostForUser = async (postId, data) => {
    const postExists = await prisma.exists.Post({id: postId})

    if(!postExists) {
        throw new Error('Post does not exist')
    }

    const post = await prisma.mutation.updatePost(
        {
            data: { ...data },
            where: { id: postId }
        }
        , '{ id title body published author { id name email posts { id title } } }')

    return post.author
}

// updatePostForUser('ck2af2gkd00h90a313bfh4hlm', {
//     title: "Me encanta Aquelarre"
// })
// .then(data => console.log(data))
// .catch(e => console.log(e))

// prisma.query.users(null, '{ id name email posts { id title } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 4))
// }).catch(e => console.log(e))

// prisma.query.comments(null, '{id text author { id email } }').then(data => {
//     console.log(JSON.stringify(data, undefined, 4))
// }).catch(e => console.log(e))

// prisma.mutation.createPost({
//     data: {
//         title: "I like CoC but not its sanity system",
//         body: "I find it very ortopedic",
//         published: true,
//         author: {
//             connect: {
//                 id: "ck2af2bj800gz0a31xco7hfi4"
//             }
//         }
//     }
// }, '{ id title body published }').then(data => console.log(JSON.stringify(data, undefined, 4)))

// prisma.mutation.updatePost({
//     where: {
//         id: "ck2brxl6x00gl0731z1me54f8"
//     },
//     data: {
//         title: "I like D&D masters but I do not like the game",
//         body: "So much combat bothers me",
//         published: false
//     }
// }).then(data => {
//     return prisma.query.posts(null, '{id title body}')
// }).then(data => {
//     console.log(JSON.stringify(data, undefined, 4))
// })
