import Post from "../models/post.model.js"


const posts = [
    {
        id: 1,
        firstName: "John",
        age: 30
    }
]

export async function getPosts() {

    // await Post.update({
    //     title: "Post new title",
    //     text: "Post new text"
    // })

    // const post  = await Post.findByPk(7)
    // post.title  = "new title"
    // await post.save()

   return Post.findAll({
    // where: {
    //     id: 1
    // }
   })
}

export function postPost(post) {
    posts.push(post)
}