const fs = require('fs');

var config = {};

// Method used to store and compare the passphrase.
// You can change it to any value supported by https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm
config.hashMethod = 'sha256';

// Hash of the passphrase that will be used to wake devices. 
config.hash_password = process.env.WAKE_PASSWORD_HASH;

config.asleep = 0;
config.awake = 1;

// Number of pings that will be executed
config.pingCounter = 15;

// Computers that will be available to wake. Add or remove as many as you want.
config.computers = JSON.parse(fs.readFileSync('computers.json'));

// Cors domains
config.corsOrigin = process.env.CORS_ORIGIN.split(',');

module.exports = config;
