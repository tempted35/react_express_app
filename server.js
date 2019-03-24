//-----------------------------------------------------------------------------
// Express 
//-----------------------------------------------------------------------------
function randInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

function showStatus(websocket) {
	console.log("Number of connected clients:", websocket.clients.size);	
}

//-----------------------------------------------------------------------------
// Web Socket Server
//-----------------------------------------------------------------------------
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({port: 9090})
wss.on('connection', (conn) => {
  console.log('websocket connection open')
  conn.send('Hello from server') 
});

wss.on('close', (conn) => {
  conn.send('Good bye from server')
  console.log('websocket connection closed')
})

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function sendData(wss) {
  const customers = [
    {id: 1, name: {first: 'John', last: 'Hennessey'}, birth: randInt(10, 110), death: randInt(1930, 2999), contribs: ['abc,xx'], awards: ['turing', 'xxx'] },
    {id: 2, name: {first: 'David', last: 'Patternson'}, birth: randInt(10, 110), death: randInt(1930, 2999), contribs: ['abc,xx'], awards: ['turing', 'xxx'] },
    {id: 3, name: {first: 'Andrew', last: 'Yao'}, birth: randInt(10, 110), death: randInt(1930, 2999), contribs: ['abc,xx'], awards: ['turing', 'xxx'] }
  ];

  wss.clients.forEach(client => {
    const json = JSON.stringify(customers);
    // console.log(json);
    //client.send(json.replace(/\\/g, ''));
    // console.log(json.replace(/\\/g, ''));
    client.send(json);
  });  
}

const URL = "mongodb://localhost:27017";
const mongoClient = require('mongodb').MongoClient
const express = require('express');

const app = express();
//const router = express.Router();

//------------------------------------------------------------------------------
// ROUTES
//------------------------------------------------------------------------------
app.get('/', (req, res) => {
  res.send('You just hit the home page\n');
})

app.get('/api/recipients', (req, res) => {
  if(false)
  {
    mongoClient.connect(URL, (err, db) => {
      if(err) throw err;
      const dbo = db.db('bios');
      dbo.collection('bios').find({}).toArray((err, result) => {
        if(err) res.send(err)
        else if(result.length) {
          res.json(result); 
          console.log(result);
        }
        else {
          res.send('No data found');
        }
      })
    });
  }
  else
  {
    const customers = [
      {id: 1, name: {first: 'John', last: 'Hennessey'}, birth: 1950, death: 2999, contribs: ['abc,xx'], awards: ['turing', 'xxx']},
      {id: 2, name: {first: 'David', last: 'Patternson'}, birth: 1950, death: 2999, contribs: ['abc,yy'], awards: ['turing', 'xxx']},
      {id: 3, name: {first: 'Andrew', last: 'Yao'}, birth: 1940, death: 2999, contribs: ['abc,yy'], awards: ['turing', 'xxx']},
    ];

    res.json(customers);
  }
});

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

const port = 5000;
app.listen(port, () => `Server running on port ${port}`);

// setInterval(function() { sendData(wss); }, 100);
// setInterval(function() { showStatus(wss); }, 5000);
setInterval( () => sendData(wss), 500);
setInterval( () => showStatus(wss), 5000);

