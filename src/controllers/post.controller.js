import {getPosts as getPostsService} from "../services/post.service.js"

export async function getPosts(req, res) {

    return res.json({
        item: await getPostsService()
    })
}