var crypto = require('crypto');
var tokenSecret = crypto.randomBytes(64).toString('hex');
console.log(tokenSecret);