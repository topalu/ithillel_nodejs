console.log('a starting');
exports.adone = false;
const b = require('./b.js');
console.log('in a, b.done = %j', b.done);
exports.adone = true;
console.log('a done');

exports