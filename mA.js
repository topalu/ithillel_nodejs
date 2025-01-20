import {increment, getCounter} from "./singleton.js?a=1"

console.log("moduleA, counter increment ", increment())
console.log("moduleA, getCounter", getCounter())