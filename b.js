console.log('b starting');
exports.done = false;
const a = require('./a.js');
console.log('in b, a.adone = %j', a.adone);
exports.done = true;
console.log('b done');