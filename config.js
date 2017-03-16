
var config = {};

// Method used to store and compare the passphrase.
// You can change it to any value supported by https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm
config.hashMethod = 'sha256';

// Hash of the passphrase that will be used to wake devices. 
config.hash_password = 'b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79';

config.asleep = 0;
config.awake = 1;

// Number of pings that will be executed
config.pingCounter = 15;

// Computers that will be available to wake. Add or remove as many as you want.
config.computers = [
  {
    name : "PC1",
    ip : '0.0.0.0',
    mac : '00:00:00:00:00:00'
  },
  {
    name : "PC2",
    ip : '0.0.0.0',
    mac : '00:00:00:00:00:00'
  }
];

module.exports = config;
