
var config = {};

// Method used to store and compare the passphrase.
// You can change it to any value supported by https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm
config.hashMethod = 'sha256';

// Hash of the passphrase that will be used to wake devices. 
config.hash_password = '';

config.asleep = '0';
config.awake = '1';

//Computers that will be available to wake. Add or remove as many as you want.
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
