const URL = "mongodb://localhost:27017";

const mongoClient = require('mongodb').MongoClient
const express = require('express');

const app = express();
//const router = express.Router();

//------------------------------------------------------------------------------
// ROUTES
//------------------------------------------------------------------------------
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

    console.log('xxxxxxx');
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
