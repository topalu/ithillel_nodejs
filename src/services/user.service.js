

// {
//     "id": 1,
//     "firstName": "",
//     age: 20
// }
const users = [
    {
        id: 1,
        firstName: "John",
        age: 30
    }
]

export function getUser(id) {
   return users.find(user => user.id === parseInt(id))
}

export function postUser(user) {
    users.push(user)
}