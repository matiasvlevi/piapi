const config = require('dotenv').config().parsed;
const logger = require('../bin/logger/index.js').default;
const express = require('express');
const fs = require('fs');
const server = express();
const path = '/api';

const getData = () => JSON.parse(fs.readFileSync('./web/public/temp.json', 'utf8'));
console.log(getData())
server.get(`${path}`, (req, res) => {
  try {
    let content = getData();
    res.send({
      charts: content.data
    });
    return;
  } catch (e) {
    console.log(e);
  }
})

server.get(`${path}/:key`, (req, res) => {
  let key = req.params.key.toLocaleLowerCase();

  let content = getData();
  if (key === 'meta') {
    let d = {...content };
    delete d.data;
    res.send(d);
    return;
  }
  res.send(content.data[req.params.key].data);
  return;

});

server.get(`${path}/:key/:line`, (req, res) => {
  let key = req.params.key.toLocaleLowerCase();
  if (key === 'meta') {
    return;
  }
  let line = req.params.line;
  let content = getData();

  res.send(content.data[key].data[line]);
  return;
});

server.get(`${path}/:key/:line/latest`, (req, res) => {
  let key = req.params.key;
  if (key === 'meta') {
    return;
  }
  let line = req.params.line;
  let content = getData();
  let values = content.data[key].data[line];
  res.send({
    name: `${key} ${line}`,
    value: values[values.length - 1]
  });
  return;
});

server.use(express.static(__dirname + '/public'));
const port = config.WEBPORT;
server.listen(port, () => {
  console.log(`\x1b[36m WEB DASHBOARD \x1b[0m \n server listenting \n link: http://127.0.0.1:${port}`);
});