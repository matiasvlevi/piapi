const { readFileSync } = require('fs');
const config = require('dotenv').config().parsed;
const d = require('dotenv').config({ path: './web/.env' }).parsed;
const VALIDTOKENS = Object.values(d);
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

function isTokenValid(token) {
  return VALIDTOKENS.includes(token);
}

// Get Logger Data
const getData = () =>
  JSON.parse(
    readFileSync('./web/public/temp.json', 'utf8')
  );

const server = express();

const path = '/api/:TOKEN';
server.get(`${path}`, (req, res) => {
  if (!isTokenValid(req.params.TOKEN)) {
    res.send("No valid token provided");
    return;
  }
  try {
    let content = getData();
    res.send({
      charts: content.data
    });
    console.log(`<${req.params.TOKEN}> recieved whole data`);
    return;
  } catch (e) {
    console.log(e);
  }
})

server.get(`${path}/:key`, (req, res) => {
  if (!isTokenValid(req.params.TOKEN)) {
    res.send("No valid token provided");
    return;
  }
  let key = req.params.key.toLocaleLowerCase();
  let content = getData();
  let response = {};
  if (content === undefined) {
    res.send(`${key} is not a valid query`);
    console.log(`<${req.params.TOKEN}> entered an unvalid query `);
    return;
  } else if (key === 'meta') {
    let d = {...content };
    delete d.data;
    response = d;
    console.log(`<${req.params.TOKEN}> recieved meta data `);
  } else if (key === 'latest') {
    response = getLatest(content);
    console.log(`<${req.params.TOKEN}> recieved latest chart data `);
  } else {
    response = content.data[key].data;
    console.log(`<${req.params.TOKEN}> recieved chart data ${key}/`);
  }
  res.send(response);
  return;
});

server.get(`${path}/:key/:line`, (req, res) => {
  if (!isTokenValid(req.params.TOKEN)) {
    res.send("No valid token provided");
    return;
  }
  let content = getData();
  let key = req.params.key.toLocaleLowerCase();
  let line = req.params.line.toLocaleLowerCase();
  if (content === undefined) {
    res.send(`${key}/${line} is not a valid query`);
    console.log(`<${req.params.TOKEN}> recieved line data ${key}/${line}`);
    return;
  }
  if (key === 'meta') {
    res.send(`Could not get ${req.params.line}`);
    console.log(`<${req.params.TOKEN}> entered an unvalid query `);
    return;
  }


  res.send(content.data[key].data[line]);
  return;
});


server.get(`${path}/:key/:line/latest`, (req, res) => {
  if (!isTokenValid(req.params.TOKEN)) {
    res.send("No valid token provided");
    return;
  }
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