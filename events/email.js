import { EventEmitter } from "node:events"

class EmailEvent extends EventEmitter {}

export const event = new EmailEvent()

export const AUTH_EVENT = 'authEvent'
export const ALERT_EVENT = 'Alert'

const fn = (name, email) => {
    console.log(`hello ${name}, your email is ${email}`)
}

console.log("1")

event.once(AUTH_EVENT, fn)

event.emit(AUTH_EVENT, 'john', 'john@gmail.com')

event.on("Alert", () => {
    console.log("Alert message")
})

console.log("2")

event.removeListener(AUTH_EVENT, fn )

// event.emit(ALERT_EVENT, 'Anna', 'ana@gmail.com')