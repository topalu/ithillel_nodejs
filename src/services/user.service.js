

// {
//     "id": 1,
//     "firstName": "",
//     age: 20
// }
const users = []

export function getUsers() {
    return users
}

export function idExists(id) {
    return !!users.find(user => user.id === parseInt(id))
}

export function getUser(id) {
   return users.find(user => user.id === parseInt(id))
}

export function postUser(user) {
    users.push(user)
}