const config = require('dotenv').config().parsed;

const express = require('express');
const server = express();


server.use(express.static(__dirname + '/public'));
const port = config.WEBPORT;
server.listen(port);
console.log(`\x1b[36m WEB DASHBOARD \x1b[0m \n server listenting \n link: http://127.0.0.1:${port}`);