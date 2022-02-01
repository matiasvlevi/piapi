const { readFileSync } = require('fs');
const config = require('dotenv').config().parsed;
const express = require('express');

function replaceAll(line, char) {
  let nline = line;
  while (nline.includes(char))
    nline = nline.replace(char, '');

  return nline;
}

function getLatest(content) {
  let responseData = {}
  for (let chart in content.data) {
    let nchart = replaceAll(chart, ' ');
    responseData[nchart] = {}
    for (let line in content.data[chart].data) {
      let values = content.data[chart].data[line];
      let nline = replaceAll(line, ' ');
      responseData[nchart][nline] = values[values.length - 1];
    }
  }
  return responseData;
}

// Get Logger Data
const getData = () =>
  JSON.parse(
    readFileSync('./web/public/temp.json', 'utf8')
  );

const server = express();

const path = '/api';
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
  let response = {};
  if (content === undefined) {
    res.send(`${key} is not a valid query`);
    return;
  } else if (key === 'meta') {
    let d = {...content };
    delete d.data;
    response = d;
    return;
  } else if (key === 'latest') {
    response = getLatest(content);
  } else {
    response = content.data[key].data;
  }
  res.send(response);
  return;
});

server.get(`${path}/:key/:line`, (req, res) => {
  let key = req.params.key.toLocaleLowerCase();
  let line = req.params.line.toLocaleLowerCase();
  if (content === undefined) {
    res.send(`${key}/${line} is not a valid query`);
    return;
  }
  if (key === 'meta') {
    res.send(`Could not get ${req.params.line}`);
    return;
  }
  let content = getData();

  res.send(content.data[key].data[line]);
  return;
});


server.get(`${path}/:key/:line/latest`, (req, res) => {
  let key = req.params.key.toLocaleLowerCase();
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