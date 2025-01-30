
class EventEmitter {

    constructor() {
        this.events = new Map()
    }

    on(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = []
        }

        this.events[eventName].push(listener)
    }

    emit(eventName, ...arg) {
        if (!this.events[eventName]) return false

        this.events[eventName].forEach(listener => {
            listener(...arg)
        })
    }

    off(eventName, listener) {
        if (!this.events[eventName]) return false

        this.events[eventName] = this.events[eventName].filter( itm => itm !== listener) 
    }
}

const emitter = new EventEmitter()

const onHello = async (name) => {
    
    console.log(`hello ${name}`)
}


const onQuestion = (name) => {
    console.log(`how are you, ${name}?`)
}

const HELLO_EVENT = 'event1'

emitter.on(HELLO_EVENT, onHello)
emitter.on(HELLO_EVENT, onQuestion)

emitter.emit(HELLO_EVENT, 'Anna')

emitter.off(HELLO_EVENT, onHello)

emitter.emit(HELLO_EVENT, 'John')


// emit("a", 1, true, 'ff')