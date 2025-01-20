import {increment, getCounter} from "./singleton.js?a=2"

console.log("moduleB, counter increment ", increment())
console.log("moduleB, getCounter", getCounter())