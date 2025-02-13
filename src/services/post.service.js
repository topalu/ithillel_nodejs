

// {
//     "id": 1,
//     "firstName": "",
//     age: 20
// }
const posts = [
    {
        id: 1,
        firstName: "John",
        age: 30
    }
]

export function getPost(id) {
   return posts.find(post => post.id === parseInt(id))
}

export function postPost(post) {
    posts.push(post)
}