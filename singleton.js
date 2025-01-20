console.log("singleton load")

let counter = 0

function increment() {
    counter++

    return counter
}

const getCounter = () => counter

export {
    increment,
    getCounter
}