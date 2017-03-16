const express = require('express');
const wol = require('wake_on_lan');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const config = require('./config');
const path = require("path");
const util = require("util");

var exec = require('child_process').exec;

var app = express();

var computerWoken;

app.use(bodyParser.json());

// set static directories
app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.get('/computers', function (req, res) {
    let computers = [];
    for (computer of config.computers) {
        computers.push({ name: computer.name });
    }
    res.contentType('application/json');
    res.send(computers);
});

app.post('/wake', function (req, res) {
    try {
        var computer = req.body.computer;
        var password = req.body.password;
        if (config.hash_password == crypto.createHash(config.hashMethod).update(password).digest('hex')) {
            var mac = config.computers[computer].mac;
            wol.wake(mac);
            computerWoken = computer;

            res.contentType('application/json');
            res.status(200).send({ 'message': 'Password ok' });
        } else {
            res.status(403).send({ 'message': 'Wrong password' });
        }
    } catch (err) {
        res.contentType('application/json');
        res.status(400).send({ 'message': 'Bad request' });
    }
});

app.get('/ping', function (req, res) {
    try {
        pingIp(config.computers[computerWoken].ip, res);
    } catch (err) {
        computerWoken = undefined;
        res.contentType('application/json');
        res.status(400).send({ 'message': 'Bad request' });
    }
});

function pingIp(ip, res) {
    exec('ping -c 1 ' + ip, function (error, stdout, stderr) {
        if (error !== null) {
            res.contentType('application/json');
            res.status(200).send({ "state": config.asleep });
        } else {
            res.contentType('application/json');
            res.status(200).send({ "state": config.awake });
            computerWoken = undefined;
        }
    });
}

app.listen(3000, function () {
    console.log('Listening on port 3000');
});
