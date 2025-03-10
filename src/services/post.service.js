import sequelize from "../models/index.js"
import Post from "../models/post.model.js"
import User from "../models/user.model.js"


const posts = [
    {
        id: 1,
        firstName: "John",
        age: 30
    }
]

export async function getPosts() {

const t = await sequelize.transaction();
    try {
        await Post.create({
            title: "Post new title 2",
            text: "Post new text 2",
            userId: 1
        }, { transaction: t })

        console.log("Post created")

        const post = await Post.findOne({
            order: [
                ["id", "DESC"]
            ]
        }, { transaction: t },)

        const user = await User.findOne({ transaction: t })

        await post.setUser(user, { transaction: t })

       await t.commit()

    }  catch (error) {

        console.log({ error })

        await t.rollback()
        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!
      }

    // await Post.create({
    //     title: "Post new title",
    //     text: "Post new text",
    //     userId: 1
    // })

    // const post  = await Post.findByPk(7)
    // post.title  = "new title"
    // await post.save()

   return Post.findAll({
        include: [User]
   })
}

export function postPost(post) {
    posts.push(post)
}